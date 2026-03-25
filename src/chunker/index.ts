import ts from 'typescript';

export interface CodeChunk {
  id: string;
  filePath: string;
  symbolName: string;
  content: string;
}

export function chunkFile(filePath: string, sourceCode: string): CodeChunk[] {
  const sourceFile = ts.createSourceFile(
    filePath,
    sourceCode,
    ts.ScriptTarget.Latest,
    true
  );

  const chunks: CodeChunk[] = [];
  let chunkCounter = 0;

  function extractNode(node: ts.Node, name: string) {
    const start = node.getStart(sourceFile);
    const end = node.getEnd();
    const content = sourceCode.slice(start, end);
    
    chunks.push({
      id: `${filePath}-${name}-${chunkCounter++}`,
      filePath,
      symbolName: name,
      content,
    });
  }

  function visit(node: ts.Node) {
    if (ts.isFunctionDeclaration(node) && node.name) {
      extractNode(node, node.name.text);
    } else if (ts.isClassDeclaration(node) && node.name) {
      extractNode(node, node.name.text);
    } else if (ts.isVariableStatement(node)) {
      for (const declaration of node.declarationList.declarations) {
        if (declaration.initializer && (ts.isArrowFunction(declaration.initializer) || ts.isFunctionExpression(declaration.initializer))) {
          if (ts.isIdentifier(declaration.name)) {
            extractNode(node, declaration.name.text);
          }
        }
      }
    } else if (ts.isMethodDeclaration(node) && ts.isIdentifier(node.name)) {
       extractNode(node, node.name.text);
    }
    ts.forEachChild(node, visit);
  }

  visit(sourceFile);
  
  // If no chunks were extracted, treat the whole file as a chunk
  if (chunks.length === 0 && sourceCode.trim() !== '') {
    chunks.push({
      id: `${filePath}-entire-file`,
      filePath,
      symbolName: 'entire-file',
      content: sourceCode
    });
  }

  return chunks;
}