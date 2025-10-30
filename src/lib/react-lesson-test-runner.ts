/**
 * React Lesson Test Runner
 *
 * This module provides a comprehensive test runner for React interactive lessons
 * using React Testing Library and custom test execution.
 */

import { render, screen, fireEvent, waitFor, RenderResult } from '@testing-library/react';
import { TestCase, TestResult } from '@/types';
import React from 'react';

/**
 * Test execution context that provides access to testing utilities
 */
interface TestContext {
  code: string;
  component: React.ComponentType<any>;
  render: typeof render;
  screen: typeof screen;
  fireEvent: typeof fireEvent;
  waitFor: typeof waitFor;
  React: typeof React;
}

/**
 * Transpile JSX code to JavaScript using server-side API
 */
async function transpileJSX(code: string): Promise<string> {
  const response = await fetch('/api/transpile-jsx', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ code }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(`Transpilation failed: ${error.details || error.error}`);
  }

  const result = await response.json();

  // Validate transpilation success
  if (!result.success) {
    throw new Error(`Transpilation failed: ${result.details || result.error || 'Unknown error'}`);
  }

  return result.data.code;
}

/**
 * Compile user code into a React component
 * This function transpiles JSX and safely evaluates the user's code
 */
export async function compileUserCode(code: string): Promise<React.ComponentType<any> | null> {
  try {
    // Step 1: Transpile JSX to JavaScript
    // SWC will handle: import statements → require(), export default → module.exports, JSX → React.createElement()
    const transpiledCode = await transpileJSX(code);

    // Step 2: Create safe evaluation context
    const wrappedCode = `
      ${transpiledCode}

      // Return the default export or the last declared component
      if (typeof module !== 'undefined' && module.exports) {
        return module.exports.default || module.exports;
      }
    `;

    // Step 3: Execute transpiled code with React context
    const compiledFunction = new Function('React', 'require', 'exports', 'module', wrappedCode);

    // Mock module system
    const mockModule = { exports: {} };
    const mockExports = mockModule.exports;
    const mockRequire = (name: string) => {
      if (name === 'react') return React;
      throw new Error(`Cannot require '${name}' in sandbox`);
    };

    // Execute the compiled code
    const result = compiledFunction(React, mockRequire, mockExports, mockModule);

    // Extract the component
    const component = result || (mockModule.exports as any).default || mockExports;

    if (typeof component === 'function') {
      return component;
    }

    return null;
  } catch (error) {
    console.error('Code compilation error:', error);
    // Re-throw the error so it can be shown to the user
    throw error;
  }
}

/**
 * Execute a single test case against user code
 */
export async function executeTestCase(
  userCode: string,
  testCase: TestCase,
  component: React.ComponentType<any> | null
): Promise<{
  testId: string;
  description: string;
  passed: boolean;
  errorMessage?: string;
}> {
  try {
    // If component is not compiled, try to compile it
    if (!component) {
      component = await compileUserCode(userCode);
    }

    // Create test context
    const context: TestContext = {
      code: userCode,
      component: component as React.ComponentType<any>,
      render,
      screen,
      fireEvent,
      waitFor,
      React,
    };

    // Execute the test function
    const testFunction = createTestFunction(testCase.testFunction, context);
    const result = await testFunction();

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
 * Create a test function from a test string with proper context
 */
function createTestFunction(testString: string, context: TestContext): () => Promise<boolean> {
  // Extract variables from context for use in test
  const { code, component: Component, render, screen, fireEvent, waitFor, React } = context;

  // Create the test function
  // The test string should return a boolean or throw an error
  const testFunc = new Function(
    'code',
    'Component',
    'render',
    'screen',
    'fireEvent',
    'waitFor',
    'React',
    'getByText',
    'queryByText',
    'getByRole',
    'queryByRole',
    'container',
    `
    return (async () => {
      try {
        // Common test utilities
        const assert = (condition) => {
          if (!condition) throw new Error('Assertion failed');
          return true;
        };

        // Execute the test
        ${testString}
      } catch (error) {
        throw error;
      }
    })();
  `
  );

  // Helper to create render wrappers
  const createRenderHelpers = () => {
    let renderResult: RenderResult | null = null;

    const customRender = (component: React.ReactElement) => {
      renderResult = render(component);
      return renderResult;
    };

    const getContainer = () => renderResult?.container || null;

    return {
      render: customRender,
      getByText: (...args: Parameters<typeof screen.getByText>) => renderResult ? renderResult.getByText(...args) : null,
      queryByText: (...args: Parameters<typeof screen.queryByText>) => renderResult ? renderResult.queryByText(...args) : null,
      getByRole: (...args: Parameters<typeof screen.getByRole>) => renderResult ? renderResult.getByRole(...args) : null,
      queryByRole: (...args: Parameters<typeof screen.queryByRole>) => renderResult ? renderResult.queryByRole(...args) : null,
      container: getContainer(),
    };
  };

  const helpers = createRenderHelpers();

  return () =>
    testFunc(
      code,
      Component,
      helpers.render,
      screen,
      fireEvent,
      waitFor,
      React,
      helpers.getByText,
      helpers.queryByText,
      helpers.getByRole,
      helpers.queryByRole,
      helpers.container
    );
}

/**
 * Run all tests for a lesson step
 */
export async function runAllTests(
  userCode: string,
  testCases: TestCase[],
  stepId: string
): Promise<TestResult> {
  // Compile the code once (now async with JSX transpilation)
  let component: React.ComponentType<any> | null = null;
  let compilationError: string | null = null;

  try {
    component = await compileUserCode(userCode);
  } catch (error) {
    compilationError = error instanceof Error ? error.message : String(error);
  }

  if (!component && testCases.some(tc => tc.testFunction.includes('render'))) {
    return {
      stepId,
      passed: false,
      results: [
        {
          testId: 'compilation',
          description: 'Code compilation',
          passed: false,
          errorMessage: compilationError || 'Failed to compile the code. Make sure you export a valid React component.',
        },
      ],
    };
  }

  // Run all test cases
  const results = await Promise.all(
    testCases.map(testCase => executeTestCase(userCode, testCase, component))
  );

  // Check if all tests passed
  const allPassed = results.every(result => result.passed);

  return {
    stepId,
    passed: allPassed,
    results,
  };
}

/**
 * Validate user code for common issues
 */
export function validateCode(code: string): {
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

  // Check for export statement
  if (!code.includes('export')) {
    warnings.push('No export statement found. Make sure to export your component.');
  }

  // Check for React import
  if (!code.includes('import') && !code.includes('React')) {
    warnings.push('React import not found. This may cause issues.');
  }

  // Check for common mistakes
  if (code.includes('class ') && !code.includes('extends')) {
    warnings.push('Class component detected without extends. Make sure to extend React.Component.');
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
 * Get helpful error messages based on test failures
 */
export function getHelpfulErrorMessage(
  testResult: TestResult,
  testCase: TestCase
): string {
  const failedResult = testResult.results.find(r => r.testId === testCase.id);

  if (!failedResult || failedResult.passed) {
    return '';
  }

  const baseMessage = failedResult.errorMessage || 'Test failed';

  // Add contextual help based on the test description
  const helpfulTips: Record<string, string> = {
    'should exist': 'Make sure you have declared the component with the correct name.',
    'should render': 'Check that your component returns valid JSX.',
    'should display': 'Verify that you are rendering the correct text or elements.',
    'should have': 'Ensure the element has the required attribute or property.',
    'onClick': 'Make sure you have added an onClick handler to the button.',
    'useState': 'Remember to import and use the useState hook.',
    'props': 'Check that you are correctly accessing and using props.',
    'className': 'Verify that the className attribute is set correctly.',
  };

  for (const [keyword, tip] of Object.entries(helpfulTips)) {
    if (testCase.description.toLowerCase().includes(keyword.toLowerCase())) {
      return `${baseMessage}\n\nHint: ${tip}`;
    }
  }

  return baseMessage;
}

/**
 * Format test results for display
 */
export function formatTestResults(testResult: TestResult): string {
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
