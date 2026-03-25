#!/usr/bin/env node
import { Command } from 'commander';
import ora from 'ora';
import chalk from 'chalk';
import path from 'path';

import { checkOllama } from '../utils';
import { scanCodebase, readPRD } from '../scanner';
import { chunkFile, CodeChunk } from '../chunker';
import { initRAG, upsertChunksToStore } from '../rag';
import { generateTests } from '../generator';

const program = new Command();

program
  .name('testpilot')
  .description('Local AI Test Generator powered by Ollama and RAG')
  .version('1.0.0');

program
  .command('init')
  .description('Initialize and generate tests for the entire project')
  .option('-p, --prd <path>', 'Path to PRD or function documentation file')
  .action(async (options) => {
    console.log(chalk.cyan.bold('\\n🚀 Starting TestPilot (Full Project Scan)...\\n'));
    await runPipeline(process.cwd(), options.prd);
  });

program
  .command('generate <file>')
  .description('Generate tests for a specific file')
  .option('-p, --prd <path>', 'Path to PRD or function documentation file')
  .action(async (file, options) => {
    console.log(chalk.cyan.bold(`\\n🚀 Starting TestPilot for specific file: ${file}\\n`));
    await runPipeline(process.cwd(), options.prd, file);
  });

async function runPipeline(baseDir: string, prdPath?: string, targetFile?: string) {
  const spinner = ora('Checking Ollama and Models...').start();
  
  try {
    await checkOllama();
    spinner.succeed(chalk.green('Ollama is running with required models.'));
  } catch (error: any) {
    spinner.fail(chalk.red(error.message));
    process.exit(1);
  }

  // Read PRD
  let prdContent: string | null = null;
  if (prdPath) {
    spinner.start('Reading PRD documentation...');
    prdContent = await readPRD(prdPath);
    if (prdContent) {
      spinner.succeed(chalk.green('PRD context loaded.'));
    } else {
      spinner.warn(chalk.yellow('PRD file not found or empty. Proceeding without PRD.'));
    }
  }

  // Scan Codebase
  spinner.start('Scanning codebase...');
  const files = await scanCodebase(baseDir);
  
  if (files.length === 0) {
    spinner.fail(chalk.red('No JS/TS files found in the current directory.'));
    process.exit(1);
  }
  spinner.succeed(chalk.green(`Found ${files.length} source files.`));

  // Chunking
  spinner.start('Parsing codebase and extracting chunks...');
  let allChunks: CodeChunk[] = [];
  for (const file of files) {
    const chunks = chunkFile(file.filePath, file.content);
    allChunks.push(...chunks);
  }
  spinner.succeed(chalk.green(`Extracted ${allChunks.length} logical chunks (functions/classes).`));

  // Initialize RAG / Memory Store
  spinner.start('Initializing Local Vector Engine...');
  const store = await initRAG();
  spinner.succeed(chalk.green('Vector engine initialized.'));

  // Embeddings
  spinner.start('Generating embeddings for context...\n');
  await upsertChunksToStore(store, allChunks, (msg) => {
    spinner.text = msg;
  });
  spinner.succeed(chalk.green('Codebase vectorized successfully.'));

  // Filter chunks if targetFile is provided
  let chunksToProcess = allChunks;
  if (targetFile) {
    const targetPath = path.normalize(targetFile).replace(/\\/g, '/');
    chunksToProcess = allChunks.filter(c => c.filePath.replace(/\\/g, '/').includes(targetPath));
    if (chunksToProcess.length === 0) {
      console.log(chalk.yellow(`\n⚠️ No code chunks found in the target file: ${targetFile}`));
      process.exit(0);
    }
  }

  // Generation
  console.log(chalk.magenta.bold('\n🧠 Generating Tests...'));
  await generateTests(chunksToProcess, store, prdContent, baseDir, (msg) => {
    spinner.start(chalk.blue(msg));
  });
  spinner.succeed(chalk.green('Test generation complete!'));

  console.log(chalk.green.bold('\\n🎉 All done! Check the /tests folder and README_TESTING.md.'));
  console.log(chalk.gray(`Try running: npm run test`));
}

program.parse(process.argv);