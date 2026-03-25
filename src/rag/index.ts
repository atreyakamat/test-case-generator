import { ChromaClient, Collection } from 'chromadb';
import { getEmbedding } from '../embedding';
import { CodeChunk } from '../chunker';

const client = new ChromaClient();
const COLLECTION_NAME = 'testpilot_codebase';

export async function initRAG(): Promise<Collection> {
  // Ensure the collection exists, recreate it if it does
  try {
    await client.deleteCollection({ name: COLLECTION_NAME });
  } catch (e) {
    // Doesn't exist, fine
  }
  const collection = await client.createCollection({ name: COLLECTION_NAME });
  return collection;
}

export async function upsertChunksToChroma(collection: Collection, chunks: CodeChunk[], onProgress?: (msg: string) => void) {
  const ids: string[] = [];
  const embeddings: number[][] = [];
  const metadatas: Record<string, any>[] = [];
  const documents: string[] = [];

  for (let i = 0; i < chunks.length; i++) {
    const chunk = chunks[i];
    if (onProgress) {
       onProgress(`Embedding chunk ${i + 1}/${chunks.length} from ${chunk.filePath}...`);
    }
    
    // Generate embedding for the chunk content
    const embedding = await getEmbedding(chunk.content);
    
    ids.push(chunk.id);
    embeddings.push(embedding);
    metadatas.push({ filePath: chunk.filePath, symbolName: chunk.symbolName });
    documents.push(chunk.content);
  }

  if (ids.length > 0) {
    await collection.add({
      ids,
      embeddings,
      metadatas,
      documents
    });
  }
}

export async function retrieveRelevantContext(collection: Collection, targetCode: string, k: number = 3): Promise<string> {
  const queryEmbedding = await getEmbedding(targetCode);
  
  const results = await collection.query({
    queryEmbeddings: [queryEmbedding],
    nResults: k,
  });

  if (results.documents && results.documents[0] && results.documents[0].length > 0) {
    return results.documents[0].join('\\n\\n--- RELATED CHUNK ---\\n\\n');
  }
  return '';
}