#!/usr/bin/env node

/**
 * Quick TypeScript Lesson Tester
 *
 * This script provides a simple way to test TypeScript lessons
 * without requiring full TypeScript compilation.
 *
 * Usage: node scripts/test-ts-lessons.js
 */

const fs = require('fs');
const path = require('path');

// Color codes for terminal output
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
 * Extract lessons from a TypeScript file
 */
function extractLessonsFromFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf-8');

    // Extract lesson objects from the file
    const lessonMatches = content.match(/\{[\s\S]*?id:\s*"[^"]+",[\s\S]*?\}/g);

    if (!lessonMatches) {
      return [];
    }

    const lessons = [];

    lessonMatches.forEach((lessonText) => {
      try {
        // Extract key fields
        const idMatch = lessonText.match(/id:\s*"([^"]+)"/);
        const titleMatch = lessonText.match(/title:\s*"([^"]+)"/);
        const difficultyMatch = lessonText.match(/difficulty:\s*"([^"]+)"/);

        if (idMatch && titleMatch) {
          lessons.push({
            id: idMatch[1],
            title: titleMatch[1],
            difficulty: difficultyMatch ? difficultyMatch[1] : 'unknown',
            filePath: filePath,
          });
        }
      } catch (e) {
        // Skip invalid lessons
      }
    });

    return lessons;
  } catch (error) {
    log(`Error reading file ${filePath}: ${error.message}`, 'red');
    return [];
  }
}

/**
 * Find all TypeScript lesson files
 */
function findLessonFiles(baseDir) {
  const lessonFiles = [];

  function traverse(dir) {
    try {
      const items = fs.readdirSync(dir);

      items.forEach((item) => {
        const fullPath = path.join(dir, item);
        const stat = fs.statSync(fullPath);

        if (stat.isDirectory()) {
          traverse(fullPath);
        } else if (item.endsWith('.ts') && !item.endsWith('.test.ts')) {
          lessonFiles.push(fullPath);
        }
      });
    } catch (error) {
      // Skip directories we can't read
    }
  }

  traverse(baseDir);
  return lessonFiles;
}

/**
 * Test a single lesson
 */
function testLesson(lesson) {
  const content = fs.readFileSync(lesson.filePath, 'utf-8');

  // Find the lesson block
  const lessonPattern = new RegExp(
    `\\{[\\s\\S]*?id:\\s*"${lesson.id}"[\\s\\S]*?steps:\\s*\\[[\\s\\S]*?\\]`
  );
  const lessonMatch = content.match(lessonPattern);

  if (!lessonMatch) {
    return {
      passed: false,
      error: 'Could not find lesson definition',
    };
  }

  const lessonBlock = lessonMatch[0];

  // Check for required fields
  const checks = {
    hasTitle: /title:\s*"[^"]+"/. test(lessonBlock),
    hasSteps: /steps:\s*\[/.test(lessonBlock),
    hasSolution: /solution:\s*`/. test(lessonBlock),
    hasTestCases: /testCases:\s*\[/.test(lessonBlock),
    hasInstruction: /instruction:\s*`/.test(lessonBlock),
  };

  // Count test cases
  const testCaseMatches = lessonBlock.match(/testFunction:\s*`/g);
  const testCaseCount = testCaseMatches ? testCaseMatches.length : 0;

  const allChecksPassed = Object.values(checks).every((v) => v);

  return {
    passed: allChecksPassed && testCaseCount > 0,
    checks,
    testCaseCount,
    error: !allChecksPassed ? 'Missing required fields' : null,
  };
}

/**
 * Main test runner
 */
function main() {
  log('\n🚀 TypeScript Lesson Test Runner', 'bright');
  log('=' .repeat(60), 'cyan');

  const baseDir = path.join(__dirname, '../src/data/courses/typescript-course-interactive');

  if (!fs.existsSync(baseDir)) {
    log('\n❌ TypeScript interactive course directory not found!', 'red');
    log(`Expected: ${baseDir}`, 'yellow');
    process.exit(1);
  }

  log(`\n📂 Scanning: ${baseDir}`, 'blue');

  const lessonFiles = findLessonFiles(baseDir);
  log(`\n📚 Found ${lessonFiles.length} lesson file(s)`, 'cyan');

  const allLessons = [];
  lessonFiles.forEach((file) => {
    const lessons = extractLessonsFromFile(file);
    allLessons.push(...lessons);
  });

  log(`📖 Total lessons: ${allLessons.length}\n`, 'cyan');

  if (allLessons.length === 0) {
    log('⚠️  No lessons found to test', 'yellow');
    process.exit(0);
  }

  // Test each lesson
  let passed = 0;
  let failed = 0;
  const failures = [];

  allLessons.forEach((lesson, index) => {
    process.stdout.write(`\n[${index + 1}/${allLessons.length}] Testing: ${lesson.title}`);

    const result = testLesson(lesson);

    if (result.passed) {
      log(' ✅', 'green');
      log(`   ID: ${lesson.id}`, 'reset');
      log(`   Difficulty: ${lesson.difficulty}`, 'reset');
      log(`   Test Cases: ${result.testCaseCount}`, 'reset');
      passed++;
    } else {
      log(' ❌', 'red');
      log(`   ID: ${lesson.id}`, 'reset');
      log(`   Error: ${result.error}`, 'red');
      if (result.checks) {
        log('   Checks:', 'yellow');
        Object.entries(result.checks).forEach(([check, status]) => {
          const icon = status ? '✓' : '✗';
          const color = status ? 'green' : 'red';
          log(`     ${icon} ${check}`, color);
        });
      }
      failed++;
      failures.push({ lesson, result });
    }
  });

  // Print summary
  log('\n' + '='.repeat(60), 'cyan');
  log('📊 TEST SUMMARY', 'bright');
  log('='.repeat(60), 'cyan');
  log(`Total Lessons: ${allLessons.length}`, 'reset');
  log(`Passed: ${passed}`, 'green');
  log(`Failed: ${failed}`, 'red');
  log(`Success Rate: ${((passed / allLessons.length) * 100).toFixed(2)}%`, 'cyan');
  log('='.repeat(60), 'cyan');

  if (failures.length > 0) {
    log('\n❌ FAILED LESSONS:', 'red');
    failures.forEach(({ lesson }) => {
      log(`  - ${lesson.title} (${lesson.id})`, 'red');
    });
  } else {
    log('\n🎉 All lessons are properly structured! 🎉', 'green');
  }

  log('\n💡 Next Steps:', 'cyan');
  log('  1. Run: npm test (to run actual test execution)', 'reset');
  log('  2. Check: Each lesson has valid solution code', 'reset');
  log('  3. Verify: Test cases actually validate the solutions\n', 'reset');

  process.exit(failed > 0 ? 1 : 0);
}

// Run if executed directly
if (require.main === module) {
  main();
}

module.exports = { testLesson, extractLessonsFromFile, findLessonFiles };
