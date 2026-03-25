import { CodeChunk } from '../chunker';
import { Collection } from 'chromadb';
import { retrieveRelevantContext } from '../rag';
import { generateText } from '../embedding';
import { systemPrompts } from '../prompts';
import { writeTestFile, writeJestSetup, writeReadme } from '../writer';

export async function generateTests(
  chunks: CodeChunk[],
  collection: Collection,
  prdContent: string | null,
  baseDir: string,
  onProgress?: (msg: string) => void
) {
  
  if (onProgress) onProgress('Setting up Jest config and testing README...');
  await writeJestSetup(baseDir);
  await writeReadme(baseDir);

  for (let i = 0; i < chunks.length; i++) {
    const chunk = chunks[i];
    if (onProgress) {
      onProgress(`Generating tests for ${chunk.symbolName} in ${chunk.filePath} (${i + 1}/${chunks.length})...`);
    }

    try {
      // 1. Retrieve Context
      const context = await retrieveRelevantContext(collection, chunk.content, 3);
      
      // 2. Build Prompt
      const prompt = systemPrompts.generateTest(
        chunk.filePath,
        chunk.symbolName,
        chunk.content,
        context,
        prdContent
      );

      // 3. Generate Test Code
      const testCode = await generateText(prompt, systemPrompts.qaEngineer);
      
      // 4. Write to File
      await writeTestFile(baseDir, chunk.filePath, chunk.symbolName, testCode);
      
    } catch (e) {
      console.error(`\\n❌ Failed to generate test for ${chunk.symbolName}:`, e);
    }
  }
}