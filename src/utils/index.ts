import { Ollama } from 'ollama';

const ollama = new Ollama({ host: 'http://127.0.0.1:11434' });

export async function checkOllama(): Promise<boolean> {
  try {
    const list = await ollama.list();
    const hasQwen = list.models.some((m: any) => m.name.includes('qwen2.5-coder:3b'));
    const hasNomic = list.models.some((m: any) => m.name.includes('nomic-embed-text'));
    
    if (!hasQwen) {
      throw new Error("Model 'qwen2.5-coder:3b' is not installed. Run: ollama run qwen2.5-coder:3b");
    }
    if (!hasNomic) {
      throw new Error("Model 'nomic-embed-text' is not installed. Run: ollama run nomic-embed-text");
    }
    return true;
  } catch (err: any) {
    if (err.message && err.message.includes('fetch')) {
      throw new Error("Ollama is not running. Please start the Ollama application locally.");
    }
    console.error('Ollama check failed with:', err);
    throw err;
  }
}