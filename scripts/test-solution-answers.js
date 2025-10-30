#!/usr/bin/env node

/**
 * Solution Answer Validator
 *
 * This script validates that each lesson's solution actually passes
 * all of its test cases by executing the test logic.
 *
 * Usage: node scripts/test-solution-answers.js
 */

const fs = require('fs');
const path = require('path');

// Color codes
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
};

function log(message, color = 'reset') {
  console.log(colors[color] + message + colors.reset);
}

/**
 * Parse a lesson file and extract all lessons with their solutions and tests
 */
function parseLessonFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    const lessons = [];

    // Find all lesson objects
    const lessonRegex = /\{[\s\S]*?id:\s*"([^"]+)"[\s\S]*?title:\s*"([^"]+)"[\s\S]*?steps:\s*\[([\s\S]*?)\]\s*,?\s*\}/g;

    let match;
    while ((match = lessonRegex.exec(content)) !== null) {
      const lessonId = match[1];
      const lessonTitle = match[2];
      const stepsContent = match[3];

      // Extract solution and test cases from steps
      const solutionMatch = stepsContent.match(/solution:\s*`([\s\S]*?)`/);
      const solution = solutionMatch ? solutionMatch[1] : null;

      // Extract test cases
      const testCases = [];
      const testCaseRegex = /\{\s*id:\s*"([^"]+)",\s*description:\s*"([^"]+)",\s*testFunction:\s*`([\s\S]*?)`/g;

      let testMatch;
      while ((testMatch = testCaseRegex.exec(stepsContent)) !== null) {
        testCases.push({
          id: testMatch[1],
          description: testMatch[2],
          testFunction: testMatch[3],
        });
      }

      if (solution && testCases.length > 0) {
        lessons.push({
          id: lessonId,
          title: lessonTitle,
          solution,
          testCases,
          filePath,
        });
      }
    }

    return lessons;
  } catch (error) {
    log(`Error parsing ${filePath}: ${error.message}`, 'red');
    return [];
  }
}

/**
 * Execute a test case against solution code
 */
function executeTest(solution, testCase) {
  try {
    // Create a safe execution context
    const code = solution;
    const hasTypeErrors = false; // Assume no type errors for now

    // Create test function
    const testFn = new Function('code', 'hasTypeErrors', `
      try {
        // Helper functions
        const includes = (str, substr) => str.includes(substr);
        const matches = (str, regex) => regex.test(str);

        // Execute test
        ${testCase.testFunction}
      } catch (error) {
        console.error('Test execution error:', error.message);
        return false;
      }
    `);

    const result = testFn(code, hasTypeErrors);
    return {
      passed: Boolean(result),
      error: null,
    };
  } catch (error) {
    return {
      passed: false,
      error: error.message,
    };
  }
}

/**
 * Validate a single lesson
 */
function validateLesson(lesson) {
  const results = {
    lessonId: lesson.id,
    lessonTitle: lesson.title,
    totalTests: lesson.testCases.length,
    passedTests: 0,
    failedTests: 0,
    failures: [],
  };

  lesson.testCases.forEach((testCase) => {
    const result = executeTest(lesson.solution, testCase);

    if (result.passed) {
      results.passedTests++;
    } else {
      results.failedTests++;
      results.failures.push({
        testId: testCase.id,
        description: testCase.description,
        error: result.error,
      });
    }
  });

  return results;
}

/**
 * Main validation function
 */
function main() {
  log('\n🧪 TypeScript Solution Answer Validator', 'bright');
  log('=' .repeat(60), 'cyan');
  log('This validates that each solution passes its own tests', 'cyan');
  log('=' .repeat(60), 'cyan');

  const baseDir = path.join(__dirname, '../src/data/courses/typescript-course-interactive');

  if (!fs.existsSync(baseDir)) {
    log('\n❌ TypeScript course directory not found!', 'red');
    process.exit(1);
  }

  // Find all lesson files
  const lessonFiles = [];
  function traverse(dir) {
    try {
      const items = fs.readdirSync(dir);
      items.forEach((item) => {
        const fullPath = path.join(dir, item);
        const stat = fs.statSync(fullPath);
        if (stat.isDirectory()) {
          traverse(fullPath);
        } else if (item.endsWith('.ts') && !item.endsWith('.test.ts') && item !== 'index.ts') {
          lessonFiles.push(fullPath);
        }
      });
    } catch (error) {
      // Skip
    }
  }
  traverse(baseDir);

  log(`\n📚 Found ${lessonFiles.length} lesson file(s)`, 'blue');

  // Parse all lessons
  const allLessons = [];
  lessonFiles.forEach((file) => {
    const lessons = parseLessonFile(file);
    allLessons.push(...lessons);
  });

  log(`📖 Extracted ${allLessons.length} lessons with solutions\n`, 'blue');

  if (allLessons.length === 0) {
    log('⚠️  No lessons found to validate', 'yellow');
    process.exit(0);
  }

  // Validate each lesson
  const summary = {
    totalLessons: allLessons.length,
    totalTests: 0,
    passedLessons: 0,
    failedLessons: 0,
    allFailures: [],
  };

  allLessons.forEach((lesson, index) => {
    log(`[${index + 1}/${allLessons.length}] ${lesson.title}`, 'bright');
    log(`    ID: ${lesson.id}`, 'reset');

    const result = validateLesson(lesson);
    summary.totalTests += result.totalTests;

    if (result.failedTests === 0) {
      log(`    ✅ All ${result.totalTests} tests passed`, 'green');
      summary.passedLessons++;
    } else {
      log(`    ❌ ${result.failedTests}/${result.totalTests} tests failed`, 'red');
      summary.failedLessons++;
      summary.allFailures.push(result);

      // Show failures
      result.failures.forEach((failure) => {
        log(`       ❌ ${failure.description}`, 'red');
        if (failure.error) {
          log(`          Error: ${failure.error}`, 'yellow');
        }
      });
    }
    console.log('');
  });

  // Print summary
  log('='.repeat(60), 'cyan');
  log('📊 VALIDATION SUMMARY', 'bright');
  log('='.repeat(60), 'cyan');
  log(`Total Lessons:    ${summary.totalLessons}`, 'reset');
  log(`Total Tests:      ${summary.totalTests}`, 'reset');
  log(`Passed Lessons:   ${summary.passedLessons}`, 'green');
  log(`Failed Lessons:   ${summary.failedLessons}`, summary.failedLessons > 0 ? 'red' : 'green');

  const successRate = (summary.passedLessons / summary.totalLessons) * 100;
  log(`Success Rate:     ${successRate.toFixed(2)}%`, successRate === 100 ? 'green' : 'yellow');
  log('='.repeat(60), 'cyan');

  if (summary.failedLessons > 0) {
    log('\n❌ FAILED LESSONS:', 'red');
    summary.allFailures.forEach((failure) => {
      log(`\n  Lesson: ${failure.lessonTitle} (${failure.lessonId})`, 'red');
      log(`  Failed Tests: ${failure.failedTests}/${failure.totalTests}`, 'red');
      failure.failures.forEach((f) => {
        log(`    - ${f.description}`, 'yellow');
      });
    });

    log('\n⚠️  IMPORTANT: These solutions will NOT work when students submit them!', 'yellow');
    log('Fix the solutions or test cases before deploying.', 'yellow');
  } else {
    log('\n🎉 EXCELLENT! All solutions pass their tests! 🎉', 'green');
    log('Students will be able to complete lessons successfully.', 'green');
  }

  log('\n');
  process.exit(summary.failedLessons > 0 ? 1 : 0);
}

// Run
if (require.main === module) {
  main();
}

module.exports = { validateLesson, parseLessonFile, executeTest };
