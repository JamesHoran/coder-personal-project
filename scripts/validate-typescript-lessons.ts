/**
 * TypeScript Lesson Validation Script
 *
 * This script validates all TypeScript interactive lessons by:
 * 1. Loading all lessons
 * 2. Running each test case with the solution code
 * 3. Verifying that all tests pass when the correct answer is given
 * 4. Generating a comprehensive validation report
 *
 * Usage: npx tsx scripts/validate-typescript-lessons.ts
 */

import { allTypeScriptLessons } from "../src/data/courses/typescript-course-interactive";
import {
  runTypeScriptTests,
  validateTypeScriptCode,
  formatTypeScriptTestResults,
} from "../src/lib/typescript-lesson-test-runner";
import { InteractiveLesson, LessonStep, TestResult } from "../src/types";

interface ValidationResult {
  lessonId: string;
  lessonTitle: string;
  stepId: string;
  stepOrder: number;
  passed: boolean;
  testResult?: TestResult;
  error?: string;
  codeValidation?: {
    valid: boolean;
    errors: string[];
    warnings: string[];
  };
}

interface Summary {
  totalLessons: number;
  totalSteps: number;
  passedSteps: number;
  failedSteps: number;
  successRate: number;
  failedLessons: ValidationResult[];
}

/**
 * Validate a single lesson step
 */
async function validateStep(
  lesson: InteractiveLesson,
  step: LessonStep
): Promise<ValidationResult> {
  try {
    // First, validate the solution code
    const codeValidation = validateTypeScriptCode(step.solution);

    // Run the tests with the solution code
    const testResult = await runTypeScriptTests(step.solution, step.testCases);

    return {
      lessonId: lesson.id,
      lessonTitle: lesson.title,
      stepId: step.id,
      stepOrder: step.order,
      passed: testResult.passed && codeValidation.valid,
      testResult,
      codeValidation,
    };
  } catch (error) {
    return {
      lessonId: lesson.id,
      lessonTitle: lesson.title,
      stepId: step.id,
      stepOrder: step.order,
      passed: false,
      error: error instanceof Error ? error.message : String(error),
    };
  }
}

/**
 * Validate all steps in a lesson
 */
async function validateLesson(lesson: InteractiveLesson): Promise<ValidationResult[]> {
  console.log(`\n📚 Validating Lesson: ${lesson.title} (${lesson.id})`);
  console.log(`   Difficulty: ${lesson.difficulty} | XP: ${lesson.xpReward} | Steps: ${lesson.steps.length}`);

  const results: ValidationResult[] = [];

  for (const step of lesson.steps) {
    console.log(`   🔍 Testing Step ${step.order}...`);
    const result = await validateStep(lesson, step);
    results.push(result);

    if (result.passed) {
      console.log(`   ✅ Step ${step.order} passed all tests`);
    } else {
      console.log(`   ❌ Step ${step.order} FAILED`);
      if (result.error) {
        console.log(`      Error: ${result.error}`);
      }
      if (result.testResult && !result.testResult.passed) {
        result.testResult.results.forEach((tr) => {
          if (!tr.passed) {
            console.log(`      ❌ ${tr.description}: ${tr.errorMessage || "Failed"}`);
          }
        });
      }
      if (result.codeValidation && !result.codeValidation.valid) {
        result.codeValidation.errors.forEach((err) => {
          console.log(`      ❌ Code Error: ${err}`);
        });
      }
    }
  }

  return results;
}

/**
 * Main validation function
 */
async function validateAllLessons(): Promise<Summary> {
  console.log("🚀 TypeScript Lesson Validation Framework");
  console.log("==========================================\n");
  console.log(`Total Lessons to Validate: ${allTypeScriptLessons.length}\n`);

  const allResults: ValidationResult[] = [];

  // Validate each lesson
  for (const lesson of allTypeScriptLessons) {
    const lessonResults = await validateLesson(lesson);
    allResults.push(...lessonResults);
  }

  // Generate summary
  const totalSteps = allResults.length;
  const passedSteps = allResults.filter((r) => r.passed).length;
  const failedSteps = totalSteps - passedSteps;
  const successRate = totalSteps > 0 ? (passedSteps / totalSteps) * 100 : 0;

  const summary: Summary = {
    totalLessons: allTypeScriptLessons.length,
    totalSteps,
    passedSteps,
    failedSteps,
    successRate,
    failedLessons: allResults.filter((r) => !r.passed),
  };

  return summary;
}

/**
 * Print validation summary
 */
function printSummary(summary: Summary): void {
  console.log("\n\n" + "=".repeat(60));
  console.log("📊 VALIDATION SUMMARY");
  console.log("=".repeat(60));
  console.log(`Total Lessons:    ${summary.totalLessons}`);
  console.log(`Total Steps:      ${summary.totalSteps}`);
  console.log(`Passed Steps:     ${summary.passedSteps} ✅`);
  console.log(`Failed Steps:     ${summary.failedSteps} ❌`);
  console.log(`Success Rate:     ${summary.successRate.toFixed(2)}%`);
  console.log("=".repeat(60));

  if (summary.failedLessons.length > 0) {
    console.log("\n❌ FAILED STEPS:");
    console.log("-".repeat(60));
    summary.failedLessons.forEach((failure) => {
      console.log(`\nLesson: ${failure.lessonTitle} (${failure.lessonId})`);
      console.log(`Step: ${failure.stepId} (Order: ${failure.stepOrder})`);
      if (failure.error) {
        console.log(`Error: ${failure.error}`);
      }
      if (failure.testResult) {
        console.log(formatTypeScriptTestResults(failure.testResult));
      }
      if (failure.codeValidation && !failure.codeValidation.valid) {
        console.log("Code Validation Errors:");
        failure.codeValidation.errors.forEach((err) => console.log(`  - ${err}`));
        if (failure.codeValidation.warnings.length > 0) {
          console.log("Warnings:");
          failure.codeValidation.warnings.forEach((warn) => console.log(`  - ${warn}`));
        }
      }
    });
  } else {
    console.log("\n🎉 ALL TESTS PASSED! 🎉");
    console.log("All TypeScript lessons are working correctly!");
  }

  console.log("\n" + "=".repeat(60));
}

/**
 * Export validation report to JSON
 */
function exportReport(summary: Summary, outputPath: string): void {
  const fs = require("fs");
  const report = {
    timestamp: new Date().toISOString(),
    summary: {
      totalLessons: summary.totalLessons,
      totalSteps: summary.totalSteps,
      passedSteps: summary.passedSteps,
      failedSteps: summary.failedSteps,
      successRate: summary.successRate,
    },
    failures: summary.failedLessons.map((f) => ({
      lessonId: f.lessonId,
      lessonTitle: f.lessonTitle,
      stepId: f.stepId,
      stepOrder: f.stepOrder,
      error: f.error,
      testResults: f.testResult?.results,
      codeValidation: f.codeValidation,
    })),
  };

  fs.writeFileSync(outputPath, JSON.stringify(report, null, 2));
  console.log(`\n📄 Validation report exported to: ${outputPath}`);
}

// Run validation
async function main() {
  try {
    const summary = await validateAllLessons();
    printSummary(summary);

    // Export report
    const reportPath = "./typescript-lesson-validation-report.json";
    exportReport(summary, reportPath);

    // Exit with error code if tests failed
    if (summary.failedSteps > 0) {
      process.exit(1);
    } else {
      process.exit(0);
    }
  } catch (error) {
    console.error("❌ Fatal error during validation:", error);
    process.exit(1);
  }
}

// Run if executed directly
if (require.main === module) {
  main();
}

export { validateAllLessons, validateLesson, validateStep, printSummary };
