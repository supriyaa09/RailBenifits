export async function executeGroqCompletion(
  messages: { role: string; content: string }[],
  jsonResponse = false
): Promise<string> {
  const apiKey = process.env.Railassist_Officer_api_key || process.env.GROQ_API_KEY;
  const model = process.env.GROQ_MODEL || "llama-3.3-70b-versatile";

  if (!apiKey) {
    throw new Error("GROQ_API_KEY is not defined in the server environment variables.");
  }

  const payload: any = {
    model,
    messages,
    temperature: 0.1,
  };

  if (jsonResponse) {
    payload.response_format = { type: "json_object" };
  }

  const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Groq API returned status ${response.status}: ${errorText}`);
  }

  const data = await response.json();
  return data.choices?.[0]?.message?.content || "";
}
