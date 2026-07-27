import { createFileRoute } from "@tanstack/react-router";
import { allSql } from "../database/sqliteDb";

export const Route = createFileRoute("/api/assistant")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const { messages } = (await request.json()) as { messages: any[] };
          const geminiApiKey = process.env.GEMINI_API_KEY;
          const groqApiKey = process.env.GROQ_API_KEY;

          if (!geminiApiKey && !groqApiKey) {
            return new Response(
              JSON.stringify({ error: "Neither GEMINI_API_KEY nor GROQ_API_KEY is set in the server environment." }),
              {
                status: 400,
                headers: { "Content-Type": "application/json" },
              },
            );
          }

          // Build rules context from the database to index policy dynamically
          let rulesContext = "";
          try {
            const rules = allSql("SELECT * FROM rules WHERE status = 'Active'");
            const versions = allSql("SELECT * FROM rule_versions WHERE status = 'Approved'");

            rulesContext = "CURRENT ACTIVE RAILWAY RULES & FORMULAS (FROM DATABASE):\n\n";
            for (const r of rules) {
              rulesContext += `Rule: ${r.name} (Code: ${r.id})\n`;
              rulesContext += `- Category: ${r.category}, Scheme: ${r.scheme}, Type: ${r.benefit_type}\n`;
              rulesContext += `- Description: ${r.description}\n`;

              const activeVer = versions
                .filter((v) => v.rule_id === r.id)
                .sort((a, b) => b.version - a.version)[0];

              if (activeVer) {
                rulesContext += `- Current Formula: \`${activeVer.formula}\`\n`;
                rulesContext += `- Limits: Min: ${activeVer.minimum_limit !== null ? "₹" + activeVer.minimum_limit : "None"}, Max: ${activeVer.maximum_limit !== null ? "₹" + activeVer.maximum_limit : "None"}\n`;
                rulesContext += `- Reference Circular: ${activeVer.rule_number} (Effective: ${activeVer.effective_date})\n`;
              }
              rulesContext += "\n";
            }
          } catch (dbErr) {
            console.error("Failed to build DB context for assistant:", dbErr);
            rulesContext = "[Database rules database not loaded]";
          }

          const systemPrompt = `You are the RailAssist AI Knowledge Assistant for South Central Railway. Answer employee queries regarding retirement benefits, pension calculations, circulars, gratuity rules, and family pension options. Answer professionally and cite official rules where possible (e.g. Railway Pension Rules 2026). Keep formatting clean and readable using lists or bullet points.
          
          Refer to this single source of truth database rules when answering questions:
          ${rulesContext}`;

          // If Gemini API Key is available, use Gemini 2.5 Flash
          if (geminiApiKey) {
            try {
              // Convert chat format to Gemini API format
              const contents = [];
              
              // Gemini expects role: 'user' | 'model'. 
              // We inject the system prompt as part of the first user instruction or as system instruction
              const formattedMessages = messages.map((m) => ({
                role: m.role === "assistant" ? "model" : "user",
                parts: [{ text: m.content }]
              }));

              // Prepend system prompt
              const contentsPayload = [
                {
                  role: "user",
                  parts: [{ text: `System Instruction: ${systemPrompt}\n\nPlease proceed to answer my queries below.` }]
                },
                ...formattedMessages
              ];

              const response = await fetch(
                `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${geminiApiKey}`,
                {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({
                    contents: contentsPayload,
                    generationConfig: {
                      temperature: 0.4,
                      maxOutputTokens: 1024
                    }
                  })
                }
              );

              if (response.ok) {
                const data = await response.json();
                const botReply = data.candidates?.[0]?.content?.parts?.[0]?.text || "";
                
                // Format response to match openAI shape expected by the frontend
                const openAiShape = {
                  choices: [
                    {
                      message: {
                        role: "assistant",
                        content: botReply
                      }
                    }
                  ]
                };

                return new Response(JSON.stringify(openAiShape), {
                  status: 200,
                  headers: { "Content-Type": "application/json" }
                });
              } else {
                console.warn(`Gemini API error (status ${response.status}), falling back to Groq...`);
              }
            } catch (geminiErr) {
              console.error("Gemini API call exception:", geminiErr);
            }
          }

          // Fallback to Groq API (llama-3.3-70b-versatile)
          if (groqApiKey) {
            const systemMessage = {
              role: "system",
              content: systemPrompt
            };
            const fullMessages = [systemMessage, ...messages];

            const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${groqApiKey}`,
              },
              body: JSON.stringify({
                model: "llama-3.3-70b-versatile",
                messages: fullMessages,
                temperature: 0.4,
                max_tokens: 1024,
              }),
            });

            if (response.ok) {
              const data = await response.json();
              return new Response(JSON.stringify(data), {
                status: 200,
                headers: { "Content-Type": "application/json" },
              });
            }

            const errText = await response.text();
            return new Response(JSON.stringify({ error: `Groq API returned an error: ${errText}` }), {
              status: response.status,
              headers: { "Content-Type": "application/json" },
            });
          }

          throw new Error("API keys not set or connections failed");
        } catch (error: any) {
          console.error("Assistant API handler error:", error);
          return new Response(JSON.stringify({ error: error.message || "Server Error" }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
          });
        }
      },
    },
  },
});
