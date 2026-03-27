# TestPilot

A local AI-powered test generator that uses Ollama and RAG (Retrieval-Augmented Generation) to automatically generate comprehensive test cases for your JavaScript/TypeScript projects.

## Features

- 🤖 **Local AI**: Powered by Ollama - no external API calls or data sharing
- 🧠 **Context-Aware**: Uses RAG to understand your codebase and generate relevant tests
- 📦 **Zero Config**: Works out of the box with automatic codebase scanning
- 🎯 **Smart Generation**: Generates tests for functions, classes, and modules
- 📝 **PRD Support**: Optionally provide product requirements for context-aware testing
- ⚡ **Fast**: Processes entire codebases efficiently with chunking and vectorization

## Prerequisites

1. **Ollama** must be installed and running locally
   - Download from [ollama.ai](https://ollama.ai)
   - Start the Ollama application

2. **Required Ollama Models**:
   ```bash
   ollama run qwen2.5-coder:3b
   ollama run nomic-embed-text
   ```

## Installation

```bash
npm install -g testpilot
```

Or use locally in your project:

```bash
npm install testpilot --save-dev
```

## Usage

### Initialize and Generate Tests for Entire Project

```bash
testpilot init
```

This will:
1. Scan your codebase for JS/TS files
2. Parse and chunk functions/classes
3. Generate embeddings for context
4. Create comprehensive test files in the `/tests` directory
5. Generate a Jest configuration and testing README

### Generate Tests for a Specific File

```bash
testpilot generate <file-path>
```

Example:
```bash
testpilot generate src/utils/helpers.ts
```

### Use with PRD Documentation

Provide product requirements or function documentation for more context-aware tests:

```bash
testpilot init --prd ./docs/requirements.md
testpilot generate src/auth.ts --prd ./docs/auth-spec.md
```

## How It Works

1. **Scanning**: TestPilot scans your codebase for JavaScript/TypeScript files (excluding node_modules, dist, tests)
2. **Chunking**: Code is parsed into logical chunks (functions, classes, methods)
3. **Vectorization**: Each chunk is embedded using `nomic-embed-text` for semantic search
4. **Context Retrieval**: For each chunk, relevant context is retrieved from the vector store
5. **Test Generation**: `qwen2.5-coder:3b` generates comprehensive tests using the code and context
6. **Output**: Tests are written to the `/tests` directory with proper structure

## Generated Files

After running TestPilot, you'll find:

- `/tests/**/*.test.js` - Generated test files mirroring your source structure
- `jest.config.js` - Jest configuration (if not already present)
- `README_TESTING.md` - Guide for running and understanding the tests

## Running Generated Tests

```bash
npm run test
```

Or with Jest directly:

```bash
npx jest
```

## Configuration

TestPilot uses sensible defaults and requires no configuration. It automatically:

- Ignores `node_modules`, `dist`, `build`, existing test files
- Detects JS/TS/JSX/TSX files
- Generates Jest-compatible tests
- Creates organized test directory structure

## Architecture

- **Scanner**: Discovers source files using glob patterns
- **Chunker**: Parses code into testable units
- **Embedder**: Creates semantic embeddings via Ollama
- **RAG Engine**: Vector store for context retrieval
- **Generator**: AI-powered test generation
- **Writer**: Creates test files and configuration

## Requirements

- Node.js >= 14
- Ollama running locally
- Available models: `qwen2.5-coder:3b`, `nomic-embed-text`

## Development

```bash
# Clone the repository
git clone https://github.com/atreyakamat/test-case-generator.git
cd test-case-generator

# Install dependencies
npm install

# Build
npm run build

# Run locally
npm start
```

## License

ISC

## Contributing

Issues and pull requests are welcome at [GitHub](https://github.com/atreyakamat/test-case-generator).
