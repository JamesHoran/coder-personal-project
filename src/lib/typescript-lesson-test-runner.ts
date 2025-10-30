/**
 * TypeScript Lesson Test Runner
 *
 * This module provides a comprehensive test runner for TypeScript interactive lessons.
 * It compiles and validates TypeScript code, runs type checks, and executes runtime tests.
 */

import { TestCase, TestResult } from '@/types';
import * as ts from 'typescript';

/**
 * Test execution context for TypeScript lessons
 */
interface TypeScriptTestContext {
  code: string;
  compiledJS: string;
  diagnostics: ts.Diagnostic[];
  hasTypeErrors: boolean;
}

/**
 * Compile TypeScript code and return compilation result
 */
export function compileTypeScriptCode(code: string): TypeScriptTestContext {
  try {
    // TypeScript compiler options
    const compilerOptions: ts.CompilerOptions = {
      target: ts.ScriptTarget.ES2020,
      module: ts.ModuleKind.ESNext,
      strict: true,
      esModuleInterop: true,
      skipLibCheck: true,
      forceConsistentCasingInFileNames: true,
      noEmit: false,
      noImplicitAny: true,
      strictNullChecks: true,
      strictFunctionTypes: true,
      strictBindCallApply: true,
      strictPropertyInitialization: true,
      noImplicitThis: true,
      alwaysStrict: true,
      noUnusedLocals: false, // Allow unused in lessons
      noUnusedParameters: false,
      noImplicitReturns: true,
      noFallthroughCasesInSwitch: true,
    };

    // Transpile the TypeScript code
    const result = ts.transpileModule(code, {
      compilerOptions,
      reportDiagnostics: true,
    });

    // Get diagnostics
    const diagnostics = result.diagnostics || [];
    const hasTypeErrors = diagnostics.some(
      (d) => d.category === ts.DiagnosticCategory.Error
    );

    return {
      code,
      compiledJS: result.outputText,
      diagnostics,
      hasTypeErrors,
    };
  } catch (error) {
    return {
      code,
      compiledJS: '',
      diagnostics: [],
      hasTypeErrors: true,
    };
  }
}

/**
 * Execute a single test case against TypeScript code
 */
export async function executeTypeScriptTestCase(
  userCode: string,
  testCase: TestCase,
  context: TypeScriptTestContext
): Promise<{
  testId: string;
  description: string;
  passed: boolean;
  errorMessage?: string;
}> {
  try {
    // Create test function with full context
    const testFunction = new Function(
      'code',
      'compiledJS',
      'diagnostics',
      'hasTypeErrors',
      'ts',
      `
      return (async () => {
        try {
          // Test helper functions
          const assert = (condition, message) => {
            if (!condition) throw new Error(message || 'Assertion failed');
            return true;
          };

          const includes = (str, substr) => str.includes(substr);
          const matches = (str, regex) => regex.test(str);
          const hasType = (code, typeName) => {
            return code.includes(\`: \${typeName}\`) ||
                   code.includes(\`<\${typeName}>\`) ||
                   code.includes(\`: \${typeName}[\`) ||
                   code.includes(\`: \${typeName}{\`);
          };

          // Execute the actual test
          ${testCase.testFunction}
        } catch (error) {
          throw error;
        }
      })();
    `
    );

    // Execute with timeout
    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error('Test timeout')), 5000)
    );

    const resultPromise = testFunction(
      context.code,
      context.compiledJS,
      context.diagnostics,
      context.hasTypeErrors,
      ts
    );

    const result = await Promise.race([resultPromise, timeoutPromise]);

    return {
      testId: testCase.id,
      description: testCase.description,
      passed: Boolean(result),
      errorMessage: result ? undefined : (testCase.errorMessage || 'Test assertion failed'),
    };
  } catch (error) {
    return {
      testId: testCase.id,
      description: testCase.description,
      passed: false,
      errorMessage: error instanceof Error ? error.message : String(error),
    };
  }
}

/**
 * Run all tests for a TypeScript lesson step
 */
export async function runTypeScriptTests(
  userCode: string,
  testCases: TestCase[]
): Promise<TestResult> {
  // Compile the code once
  const context = compileTypeScriptCode(userCode);

  // Run all test cases
  const results = await Promise.all(
    testCases.map((testCase) => executeTypeScriptTestCase(userCode, testCase, context))
  );

  // Check if all tests passed
  const allPassed = results.every((result) => result.passed);

  return {
    stepId: 'current-step',
    passed: allPassed,
    results,
  };
}

/**
 * Validate TypeScript code for common issues
 */
export function validateTypeScriptCode(code: string): {
  valid: boolean;
  errors: string[];
  warnings: string[];
} {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Check for basic syntax issues
  if (!code.trim()) {
    errors.push('Code cannot be empty');
  }

  // Compile and check for type errors
  const context = compileTypeScriptCode(code);

  // Add compilation errors
  context.diagnostics.forEach((diagnostic) => {
    if (diagnostic.category === ts.DiagnosticCategory.Error) {
      const message = ts.flattenDiagnosticMessageText(diagnostic.messageText, '\n');
      errors.push(message);
    } else if (diagnostic.category === ts.DiagnosticCategory.Warning) {
      const message = ts.flattenDiagnosticMessageText(diagnostic.messageText, '\n');
      warnings.push(message);
    }
  });

  // Check for common mistakes
  if (code.includes('any') && !code.includes('// @ts-')) {
    warnings.push('Use of "any" type detected. Try to use more specific types.');
  }

  // Check for dangerous patterns
  if (code.includes('eval(') || code.includes('Function(')) {
    errors.push('Use of eval() or Function() is not allowed for security reasons.');
  }

  return {
    valid: errors.length === 0,
    errors,
    warnings,
  };
}

/**
 * Format test results for display
 */
export function formatTypeScriptTestResults(testResult: TestResult): string {
  const { passed, results } = testResult;

  let output = passed ? '✅ All tests passed!\n\n' : '❌ Some tests failed\n\n';

  results.forEach((result, index) => {
    const icon = result.passed ? '✅' : '❌';
    output += `${icon} Test ${index + 1}: ${result.description}\n`;

    if (!result.passed && result.errorMessage) {
      output += `   Error: ${result.errorMessage}\n`;
    }

    output += '\n';
  });

  return output;
}

/**
 * Get helpful error messages for TypeScript-specific issues
 */
export function getTypeScriptErrorHelp(error: string): string {
  const helpMap: Record<string, string> = {
    "Property '.+' does not exist": "Make sure you've defined all properties in your interface or type.",
    "Type '.+' is not assignable": "Check that your types match correctly. You may need to use type assertions or fix your type definitions.",
    "Cannot find name": "This variable or type is not defined. Make sure you've declared it or imported it.",
    "Expected .+ arguments, but got": "Check the number of parameters in your function call.",
    "Object is possibly 'undefined'": "Add a null check or use optional chaining (?.) to handle undefined values.",
    "Object is possibly 'null'": "Add a null check before accessing this property.",
    "'const' declarations must be initialized": "You need to provide an initial value when using const.",
    "Type annotation needed": "TypeScript can't infer the type here. Add an explicit type annotation.",
  };

  for (const [pattern, help] of Object.entries(helpMap)) {
    if (new RegExp(pattern).test(error)) {
      return help;
    }
  }

  return "Check the TypeScript error message above and review your type definitions.";
}
