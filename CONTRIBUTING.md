# Contributing to TestPilot

Thank you for your interest in contributing to TestPilot! This document provides guidelines and instructions for contributing.

## Getting Started

### Prerequisites

- Node.js 16 or higher
- npm or yarn
- Ollama installed locally
- Git

### Setup Development Environment

1. **Fork and Clone**

```bash
git clone https://github.com/YOUR_USERNAME/test-case-generator.git
cd test-case-generator
```

2. **Install Dependencies**

```bash
npm install
```

3. **Install Ollama Models**

```bash
ollama pull qwen2.5-coder:3b
ollama pull nomic-embed-text
```

4. **Build the Project**

```bash
npm run build
```

5. **Link for Local Testing**

```bash
npm link
```

Now you can use `testpilot` command locally to test your changes.

## Development Workflow

### Project Structure

```
test-case-generator/
├── src/
│   ├── bin/           # CLI entry point
│   ├── scanner/       # Code scanning logic
│   ├── chunker/       # AST parsing and chunking
│   ├── embedding/     # Ollama embedding generation
│   ├── rag/           # ChromaDB and RAG logic
│   ├── generator/     # Test generation orchestration
│   ├── prompts/       # AI prompt templates
│   ├── writer/        # Test file writing
│   └── utils/         # Utility functions
├── dist/              # Compiled JavaScript (generated)
├── package.json
└── tsconfig.json
```

### Making Changes

1. **Create a Branch**

```bash
git checkout -b feature/your-feature-name
```

2. **Make Your Changes**

Edit the TypeScript files in the `src/` directory.

3. **Build**

```bash
npm run build
```

4. **Test Your Changes**

Test the CLI locally:

```bash
# Create a test project
mkdir test-project
cd test-project
npm init -y

# Create a simple file to test
echo "export function add(a, b) { return a + b; }" > math.js

# Run TestPilot
testpilot init
```

5. **Commit Your Changes**

```bash
git add .
git commit -m "feat: description of your feature"
```

Follow [Conventional Commits](https://www.conventionalcommits.org/) format:
- `feat:` for new features
- `fix:` for bug fixes
- `docs:` for documentation changes
- `refactor:` for code refactoring
- `test:` for adding tests
- `chore:` for maintenance tasks

6. **Push and Create PR**

```bash
git push origin feature/your-feature-name
```

Then create a Pull Request on GitHub.

## Areas for Contribution

### High Priority

- [ ] Add support for more testing frameworks (Mocha, Vitest, etc.)
- [ ] Improve error handling and user feedback
- [ ] Add configuration file support (.testpilotrc)
- [ ] Support for different AI models/providers
- [ ] Add test result validation

### Features

- [ ] Support for other languages (Python, Go, Java)
- [ ] Integration with CI/CD pipelines
- [ ] Watch mode for continuous test generation
- [ ] Test coverage analysis
- [ ] Custom prompt templates
- [ ] Plugin system for extensibility

### Documentation

- [ ] Video tutorials
- [ ] More examples and use cases
- [ ] Blog posts about architecture
- [ ] API documentation

### Code Quality

- [ ] Add unit tests for TestPilot itself
- [ ] Improve TypeScript types
- [ ] Add linting (ESLint)
- [ ] Add code formatting (Prettier)
- [ ] Performance optimizations

## Code Style

- Use TypeScript for all source files
- Use async/await instead of promises
- Add JSDoc comments for public functions
- Keep functions small and focused
- Use meaningful variable names

## Testing

Currently, TestPilot doesn't have its own test suite (ironic, we know! 😄). We'd love contributions to add:

- Unit tests for core modules
- Integration tests for the CLI
- E2E tests with real Ollama models

## Reporting Bugs

When reporting bugs, please include:

1. TestPilot version (`testpilot --version`)
2. Node.js version (`node --version`)
3. Ollama version (`ollama --version`)
4. Operating system
5. Steps to reproduce
6. Expected vs actual behavior
7. Error messages or logs

## Feature Requests

We welcome feature requests! Please:

1. Check existing issues first
2. Describe the use case
3. Explain why it would be useful
4. Consider if it could be a plugin instead

## Questions?

- Open an issue for questions
- Tag with `question` label
- Be specific and provide context

## License

By contributing, you agree that your contributions will be licensed under the ISC License.

## Recognition

All contributors will be recognized in the README. Thank you for helping make TestPilot better! 🎉
