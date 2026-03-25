import { glob } from 'glob';
import fs from 'fs/promises';
import path from 'path';

export interface FileData {
  filePath: string;
  content: string;
}

export async function scanCodebase(directory: string): Promise<FileData[]> {
  const pattern = '**/*.{js,ts,jsx,tsx}';
  try {
    const files = await glob(pattern, {
      cwd: directory,
      ignore: ['node_modules/**', 'dist/**', 'build/**', 'tests/**', '**/*.test.*', '**/*.spec.*', '.git/**']
    });

    const fileDataList: FileData[] = [];
    for (const file of files) {
      const filePathStr = file.toString();
      const fullPath = path.join(directory, filePathStr);
      try {
        const content = await fs.readFile(fullPath, 'utf8');
        fileDataList.push({
          filePath: filePathStr,
          content
        });
      } catch (readErr) {
        // Ignore read errors for inaccessible files
      }
    }
    return fileDataList;
  } catch (err) {
    throw err;
  }
}

export async function readPRD(prdPath?: string): Promise<string | null> {
  if (!prdPath) return null;
  try {
    const fullPath = path.resolve(process.cwd(), prdPath);
    return await fs.readFile(fullPath, 'utf8');
  } catch (e) {
    console.warn(`\nWarning: Could not read PRD at ${prdPath}`);
    return null;
  }
}