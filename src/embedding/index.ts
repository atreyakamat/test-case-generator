import { Ollama } from 'ollama';

const ollama = new Ollama();

export async function getEmbedding(text: string): Promise<number[]> {
  try {
    const response = await ollama.embeddings({
      model: 'nomic-embed-text',
      prompt: text,
    });
    return response.embedding;
  } catch (error) {
    throw new Error(`Failed to generate embeddings: ${error}`);
  }
}

export async function generateText(prompt: string, systemPrompt?: string): Promise<string> {
  try {
    const response = await ollama.generate({
      model: 'qwen2.5-coder:3b',
      prompt: prompt,
      system: systemPrompt,
    });
    
    // Clean up markdown wrapping if present
    let result = response.response.trim();
    if (result.startsWith('\`\`\`')) {
      const lines = result.split('\\n');
      lines.shift(); // Remove starting ```<lang>
      if (lines[lines.length - 1].startsWith('\`\`\`')) {
        lines.pop(); // Remove ending ```
      }
      result = lines.join('\\n').trim();
    }
    return result;
  } catch (error) {
    throw new Error(`Failed to generate text with LLM: ${error}`);
  }
}