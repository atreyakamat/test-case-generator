# TestPilot 🧪✨

**Local AI Test Generator powered by Ollama and RAG**

TestPilot is a CLI tool that automatically generates comprehensive unit tests for your JavaScript/TypeScript codebase using local AI models. It leverages Retrieval Augmented Generation (RAG) with ChromaDB to understand your codebase context and produce high-quality, contextually-aware test cases.

## Features

- 🤖 **Local AI-Powered**: Uses Ollama for completely local test generation (no external API calls)
- 🧠 **Context-Aware**: Employs RAG to understand your entire codebase before generating tests
- 📦 **Zero Config**: Works out of the box with sensible defaults
- 🎯 **Flexible**: Generate tests for entire projects or specific files
- 📝 **PRD Support**: Optionally provide product requirements documents for more context-aware tests
- ⚡ **Fast**: Efficient chunking and vectorization for quick test generation

## Prerequisites

Before using TestPilot, you need to have Ollama installed and running locally with the required models:

### 1. Install Ollama

Download and install Ollama from [https://ollama.ai](https://ollama.ai)

### 2. Pull Required Models

```bash
# Code generation model (3B parameters, fast and efficient)
ollama pull qwen2.5-coder:3b

# Embedding model for semantic search
ollama pull nomic-embed-text
```

### 3. Start Ollama

Make sure Ollama is running in the background:

```bash
ollama serve
```

## Installation

### Global Installation (Recommended)

```bash
npm install -g testpilot
```

### Local Development

```bash
git clone https://github.com/atreyakamat/test-case-generator.git
cd test-case-generator
npm install
npm run build
npm link
```

## Usage

### Generate Tests for Entire Project

```bash
# Navigate to your project directory
cd /path/to/your/project

# Generate tests for all source files
testpilot init
```

### Generate Tests for a Specific File

```bash
testpilot generate src/utils/helper.ts
```

### Using with Product Requirements Document (PRD)

```bash
# Provide additional context from a PRD or documentation file
testpilot init --prd ./docs/requirements.md

# Or for a specific file
testpilot generate src/api/users.ts --prd ./docs/api-spec.md
```

## How It Works

1. **Ollama Check**: Verifies that Ollama is running and required models are installed
2. **Codebase Scanning**: Scans your project for JS/TS files (excluding node_modules, dist, tests)
3. **Code Chunking**: Parses files and extracts logical chunks (functions, classes, methods)
4. **Vectorization**: Generates embeddings and stores them in a local ChromaDB instance
5. **Context Retrieval**: For each chunk, retrieves relevant related code using RAG
6. **Test Generation**: Uses the local AI model to generate comprehensive unit tests
7. **Test Writing**: Creates organized test files in a `/tests` directory

## Generated Output

TestPilot creates the following in your project:

```
your-project/
├── tests/
│   ├── src/
│   │   ├── utils/
│   │   │   └── helper.test.ts
│   │   └── api/
│   │       └── users.test.ts
│   └── ...
├── jest.config.js          # Jest configuration (if not exists)
└── README_TESTING.md       # Testing guide and documentation
```

## What Gets Tested

TestPilot generates tests for:

- ✅ **Happy path scenarios**: Normal expected behavior
- ✅ **Edge cases**: Boundary conditions, empty inputs, special values
- ✅ **Error cases**: Exception handling, invalid inputs, failure scenarios
- ✅ **Mock integration**: Automatic mocking of external dependencies

## Configuration

### Files Excluded from Scanning

By default, TestPilot ignores:
- `node_modules/`
- `dist/`, `build/`
- `tests/`
- `**/*.test.*`, `**/*.spec.*`
- `.git/`

### Supported File Types

- JavaScript (`.js`, `.jsx`)
- TypeScript (`.ts`, `.tsx`)

## Development

### Build from Source

```bash
npm run build
```

### Run Locally Without Installing

```bash
npm start -- init
npm start -- generate src/example.ts
```

## Architecture

- **CLI**: Commander.js for command-line interface
- **Parsing**: AST-based code chunking for accurate function/class extraction
- **Embeddings**: Ollama's nomic-embed-text for semantic understanding
- **Vector DB**: ChromaDB for efficient similarity search
- **Generation**: Qwen 2.5 Coder for test code generation
- **RAG**: Retrieves top-3 most relevant code chunks for context

## Requirements

- Node.js 16+
- Ollama running locally
- At least 4GB RAM (for running the AI models)
- 8GB disk space (for models and embeddings)

## Troubleshooting

### "Ollama is not running"

Make sure Ollama is started:
```bash
ollama serve
```

### "Model not installed"

Pull the required models:
```bash
ollama pull qwen2.5-coder:3b
ollama pull nomic-embed-text
```

### Tests Don't Run

Make sure Jest is installed:
```bash
npm install --save-dev jest @types/jest ts-jest
```

Run the generated tests:
```bash
npm test
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

ISC

## Author

Created with ❤️ for developers who want comprehensive test coverage without the manual effort.

## Acknowledgments

- [Ollama](https://ollama.ai) - Local LLM inference
- [ChromaDB](https://www.trychroma.com/) - Vector database
- [Qwen2.5-Coder](https://github.com/QwenLM/Qwen2.5-Coder) - Code generation model
