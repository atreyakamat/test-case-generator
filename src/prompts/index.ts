export const systemPrompts = {
  qaEngineer: `You are a senior QA engineer and expert software developer.
Your goal is to write robust, maintainable, and comprehensive unit tests for the provided code.`,

  generateTest: (
    filePath: string,
    functionName: string,
    codeContent: string,
    relatedContext: string,
    prdContent: string | null
  ) => `
Task: Write comprehensive unit tests for the specific function/class.

Target File: ${filePath}
Target Symbol: ${functionName}

Target Code:
\`\`\`typescript
${codeContent}
\`\`\`

${relatedContext ? `\nRelated Code Context from Codebase:\n\`\`\`typescript\n${relatedContext}\n\`\`\`\n` : ''}
${prdContent ? `\nProduct Requirements/Documentation Context:\n\`\`\`markdown\n${prdContent}\n\`\`\`\n` : ''}

Generate:
1. Happy path / Unit tests
2. Edge cases
3. Failure cases

Instructions:
- Use standard Jest format (describe, it, expect).
- Mock any external dependencies if necessary (you can infer from context).
- Focus strictly on the Target Code logic.
- Do NOT provide markdown explanations or wrapper blocks, ONLY valid TypeScript/JavaScript code for the test file.
- Make sure the test runs out-of-the-box (assume basic imports from the Target File).
`
};
