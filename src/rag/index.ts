import { getEmbedding } from '../embedding';
import { CodeChunk } from '../chunker';

export interface VectorNode {
  id: string;
  embedding: number[];
  metadata: any;
  document: string;
}

// Memory-based vector store to avoid external service dependencies
export class MemoryVectorStore {
  private nodes: VectorNode[] = [];

  async addChunks(chunks: CodeChunk[], onProgress?: (msg: string) => void) {
    for (let i = 0; i < chunks.length; i++) {
      const chunk = chunks[i];
      if (onProgress) {
        onProgress(`Embedding chunk ${i + 1}/${chunks.length} from ${chunk.filePath}...`);
      }
      
      const embedding = await getEmbedding(chunk.content);
      this.nodes.push({
        id: chunk.id,
        embedding,
        metadata: { filePath: chunk.filePath, symbolName: chunk.symbolName },
        document: chunk.content
      });
    }
  }

  async query(targetCode: string, k: number = 3): Promise<string> {
    const queryEmbedding = await getEmbedding(targetCode);
    
    // Simple cosine similarity
    const scores = this.nodes.map(node => {
      const similarity = this.cosineSimilarity(queryEmbedding, node.embedding);
      return { node, similarity };
    });

    // Sort by similarity descending
    scores.sort((a, b) => b.similarity - a.similarity);

    return scores.slice(0, k)
      .map(s => s.node.document)
      .join('\n\n--- RELATED CHUNK ---\n\n');
  }

  private cosineSimilarity(vecA: number[], vecB: number[]): number {
    let dotProduct = 0;
    let normA = 0;
    let normB = 0;
    for (let i = 0; i < vecA.length; i++) {
      dotProduct += vecA[i] * vecB[i];
      normA += vecA[i] * vecA[i];
      normB += vecB[i] * vecB[i];
    }
    return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
  }
}

let store: MemoryVectorStore | null = null;

export async function initRAG(): Promise<MemoryVectorStore> {
  store = new MemoryVectorStore();
  return store;
}

export async function upsertChunksToStore(store: MemoryVectorStore, chunks: CodeChunk[], onProgress?: (msg: string) => void) {
  await store.addChunks(chunks, onProgress);
}

export async function retrieveRelevantContext(store: MemoryVectorStore, targetCode: string, k: number = 3): Promise<string> {
  return await store.query(targetCode, k);
}