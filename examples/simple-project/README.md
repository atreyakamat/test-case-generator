# TestPilot Example Project

This is a simple example project to demonstrate TestPilot's capabilities.

## Files

- `math.js` - Contains various functions and a class for testing
  - Regular functions (add, isValidEmail)
  - Arrow functions (factorial)
  - Classes (User)
  - Async functions (fetchUserData)

## How to Use

1. Make sure you have Ollama running with the required models:

```bash
ollama pull qwen2.5-coder:3b
ollama pull nomic-embed-text
```

2. Install TestPilot globally (if not already installed):

```bash
npm install -g testpilot
```

3. Navigate to this directory:

```bash
cd examples/simple-project
```

4. Generate tests for the entire project:

```bash
testpilot init
```

Or generate tests for just the math.js file:

```bash
testpilot generate math.js
```

5. Install Jest and dependencies (if prompted):

```bash
npm install
npm install -D jest @types/jest ts-jest babel-jest @babel/preset-env
```

6. Run the generated tests:

```bash
npm test
```

## What TestPilot Will Generate

TestPilot will create:
- `/tests/unit/` directory with test files
- `jest.config.js` for Jest configuration
- `README_TESTING.md` with testing instructions

Each function and class in `math.js` will have comprehensive tests covering:
- Happy path scenarios
- Edge cases
- Error conditions
- Async behavior (for async functions)

## Expected Output

After running TestPilot, you should see tests for:
- `add()` - Testing addition with various numbers
- `isValidEmail()` - Testing email validation with valid/invalid inputs
- `User` class - Testing constructor and methods
- `factorial()` - Testing recursive calculation and error handling
- `fetchUserData()` - Testing async function behavior

Enjoy using TestPilot! 🚀
