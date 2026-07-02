type ChatMessage = {
  role: "user" | "assistant"
  content: string
}

export async function callGemini(system: string, messages: ChatMessage[]) {
  const apiKey = process.env.GEMINI_API_KEY

  if (!apiKey) {
    return null
  }

  const contents = messages.map((m) => ({
    role: m.role === "assistant" ? "model" : "user",
    parts: [{ text: m.content }],
  }))

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
    {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        systemInstruction: {
          parts: [{ text: system }],
        },
        contents,
        generationConfig: {
          maxOutputTokens: 800,
        },
      }),
    }
  )

  if (!response.ok) {
    return null
  }

  const data = await response.json()
  const text = data?.candidates?.[0]?.content?.parts?.[0]?.text

  return typeof text === "string" ? text : null
}