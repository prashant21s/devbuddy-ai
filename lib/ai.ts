type ClaudeMessage = {
  role: "user" | "assistant"
  content: string
}

export async function callClaude(system: string, messages: ClaudeMessage[]) {
  const apiKey = process.env.ANTHROPIC_API_KEY
  const model = process.env.ANTHROPIC_MODEL

  if (!apiKey || !model) {
    return null
  }

  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model,
      max_tokens: 800,
      system,
      messages,
    }),
  })

  if (!response.ok) {
    return null
  }

  const data = await response.json()
  const textBlock = data.content?.find((item: { type?: string }) => item.type === "text")

  return typeof textBlock?.text === "string" ? textBlock.text : null
}
