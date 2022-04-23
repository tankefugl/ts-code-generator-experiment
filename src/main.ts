import ts from 'typescript';

function makeFactorialFunction() {
  const functionName = ts.factory.createIdentifier('factorial');
  const paramName = ts.factory.createIdentifier('n');
  const parameter = ts.factory.createParameterDeclaration(
    /*decorators*/ undefined,
    /*modifiers*/ undefined,
    /*dotDotDotToken*/ undefined,
    paramName,
  );

  const condition = ts.factory.createBinaryExpression(
    paramName,
    ts.SyntaxKind.LessThanEqualsToken,
    ts.factory.createNumericLiteral(1),
  );
  const ifBody = ts.factory.createBlock(
    [ts.factory.createReturnStatement(ts.factory.createNumericLiteral(1))],
    /*multiline*/ true,
  );

  const decrementedArg = ts.factory.createBinaryExpression(
    paramName,
    ts.SyntaxKind.MinusToken,
    ts.factory.createNumericLiteral(1),
  );
  const recurse = ts.factory.createBinaryExpression(
    paramName,
    ts.SyntaxKind.AsteriskToken,
    ts.factory.createCallExpression(functionName, /*typeArgs*/ undefined, [
      decrementedArg,
    ]),
  );
  const statements = [
    ts.factory.createIfStatement(condition, ifBody),
    ts.factory.createReturnStatement(recurse),
  ];

  return ts.factory.createFunctionDeclaration(
    /*decorators*/ undefined,
    /*modifiers*/ [ts.factory.createToken(ts.SyntaxKind.ExportKeyword)],
    /*asteriskToken*/ undefined,
    functionName,
    /*typeParameters*/ undefined,
    [parameter],
    /*returnType*/ ts.factory.createKeywordTypeNode(
      ts.SyntaxKind.NumberKeyword,
    ),
    ts.factory.createBlock(statements, /*multiline*/ true),
  );
}

const rootNode = makeFactorialFunction();

const file = ts.createSourceFile(
  'out.ts',
  '',
  ts.ScriptTarget.ESNext,
  false,
  ts.ScriptKind.TS,
);
const printer = ts.createPrinter({
  newLine: ts.NewLineKind.LineFeed,
});
const result = printer.printNode(ts.EmitHint.Unspecified, rootNode, file);
console.log(result);
