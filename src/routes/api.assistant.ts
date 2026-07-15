import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/api/assistant")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const { messages } = (await request.json()) as { messages: any[] };
          const apiKey = process.env.GROQ_API_KEY;
          if (!apiKey) {
            return new Response(
              JSON.stringify({ error: "GROQ_API_KEY is not set in the server environment." }),
              {
                status: 400,
                headers: { "Content-Type": "application/json" },
              },
            );
          }

          const primaryModel = process.env.GROQ_PRIMARY_MODEL || "llama-3.3-70b-versatile";
          const fallbackModel = process.env.GROQ_FALLBACK_MODEL || "qwen-2.5-coder-32b";

          const systemMessage = {
            role: "system",
            content:
              "You are the RailAssist AI Knowledge Assistant for South Central Railway. Answer employee queries regarding retirement benefits, pension calculations, circulars, gratuity rules, and family pension options. Answer professionally and cite official rules where possible (e.g. Railway Pension Rules 2026). Keep formatting clean and readable using lists or bullet points.",
          };

          const fullMessages = [systemMessage, ...messages];

          // Try primary model
          try {
            const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${apiKey}`,
              },
              body: JSON.stringify({
                model: primaryModel,
                messages: fullMessages,
                temperature: 0.7,
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

            console.warn(`Primary model ${primaryModel} failed with status ${response.status}. Trying fallback...`);
          } catch (err) {
            console.error("Primary model call error:", err);
          }

          // Try fallback model
          const fallbackResponse = await fetch("https://api.groq.com/openai/v1/chat/completions", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${apiKey}`,
            },
            body: JSON.stringify({
              model: fallbackModel,
              messages: fullMessages,
              temperature: 0.7,
              max_tokens: 1024,
            }),
          });

          if (fallbackResponse.ok) {
            const data = await fallbackResponse.json();
            return new Response(JSON.stringify(data), {
              status: 200,
              headers: { "Content-Type": "application/json" },
            });
          }

          const errText = await fallbackResponse.text();
          return new Response(
            JSON.stringify({ error: `Groq API returned an error: ${errText}` }),
            {
              status: fallbackResponse.status,
              headers: { "Content-Type": "application/json" },
            },
          );
        } catch (error: any) {
          return new Response(
            JSON.stringify({ error: error.message || "Server Error" }),
            {
              status: 500,
              headers: { "Content-Type": "application/json" },
            },
          );
        }
      },
    },
  },
});
