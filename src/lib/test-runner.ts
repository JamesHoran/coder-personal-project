import { TestCase, TestResult } from "@/types";

/**
 * Runs test cases against user code in a sandboxed environment
 * Returns test results indicating which tests passed/failed
 */
export async function runTests(
  userCode: string,
  testCases: TestCase[],
  stepId: string
): Promise<TestResult> {
  const results = await Promise.all(
    testCases.map(async (testCase) => {
      try {
        // Create a sandboxed function to evaluate the test
        const testFunction = new Function(
          "userCode",
          `
          try {
            ${userCode}

            // Run the test function
            const testFn = ${testCase.testFunction};
            return testFn();
          } catch (error) {
            throw new Error(error.message || "Runtime error in code");
          }
        `
        );

        const passed = testFunction(userCode);

        return {
          testId: testCase.id,
          description: testCase.description,
          passed: Boolean(passed),
          errorMessage: passed ? undefined : testCase.errorMessage,
        };
      } catch (error) {
        return {
          testId: testCase.id,
          description: testCase.description,
          passed: false,
          errorMessage:
            error instanceof Error
              ? error.message
              : testCase.errorMessage || "Test failed",
        };
      }
    })
  );

  const allPassed = results.every((r) => r.passed);

  return {
    stepId,
    passed: allPassed,
    results,
  };
}

/**
 * Validates JSX/TSX code for React components
 */
export function validateReactCode(code: string): {
  valid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  // Basic validation checks
  if (!code.trim()) {
    errors.push("Code cannot be empty");
  }

  // Check for basic React patterns
  if (code.includes("export") && !code.match(/export\s+(default\s+)?function/)) {
    if (!code.includes("export default") && !code.includes("export const")) {
      errors.push("Component must be exported");
    }
  }

  // Check for balanced JSX tags
  const openTags = code.match(/<([A-Z][a-zA-Z0-9]*)/g) || [];
  const closeTags = code.match(/<\/([A-Z][a-zA-Z0-9]*)/g) || [];

  if (openTags.length !== closeTags.length) {
    errors.push("JSX tags are not properly balanced");
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

/**
 * Creates a safe evaluation environment for user code
 */
export function createSafeEvaluator(code: string) {
  return {
    evaluate: () => {
      try {
        // eslint-disable-next-line no-new-func
        const fn = new Function(`
          "use strict";
          ${code}
        `);
        return { success: true, result: fn() };
      } catch (error) {
        return {
          success: false,
          error: error instanceof Error ? error.message : "Unknown error",
        };
      }
    },
  };
}
