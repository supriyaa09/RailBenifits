export async function executeGroqCompletion(
  messages: { role: string; content: string }[],
  jsonResponse = false,
  customModel?: string
): Promise<string> {
  const apiKey = process.env.Railassist_Officer_api_key || process.env.GROQ_API_KEY;
  const model = customModel || process.env.GROQ_VISION_MODEL || process.env.GROQ_MODEL || "qwen/qwen3.6-27b";

  if (!apiKey) {
    throw new Error("GROQ_API_KEY or Railassist_Officer_api_key is not defined in the server environment variables.");
  }

  const payload: any = {
    model,
    messages,
    temperature: 0.1,
  };

  if (jsonResponse) {
    payload.response_format = { type: "json_object" };
  }

  try {
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      const data = await response.json();
      return data.choices?.[0]?.message?.content || "";
    }

    const errorText = await response.text();
    console.warn(`Groq API (${model}) returned status ${response.status}: ${errorText}. Attempting fallback models...`);

    // Fallback model sequence if primary vision model name differs on current API key
    const fallbackModels = ["qwen-3.6-27b", "llama-3.3-70b-versatile", "qwen-2.5-coder-32b"];
    for (const fbModel of fallbackModels) {
      if (fbModel === model) continue;
      try {
        const fbPayload = { ...payload, model: fbModel };
        const fbResponse = await fetch("https://api.groq.com/openai/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
          },
          body: JSON.stringify(fbPayload),
        });

        if (fbResponse.ok) {
          const fbData = await fbResponse.json();
          console.log(`[Groq Fallback] Successfully processed with fallback model: ${fbModel}`);
          return fbData.choices?.[0]?.message?.content || "";
        }
      } catch {
        // Try next fallback
      }
    }

    throw new Error(`Groq API returned status ${response.status}: ${errorText}`);
  } catch (err: any) {
    throw new Error(`Groq execution error: ${err.message}`);
  }
}
