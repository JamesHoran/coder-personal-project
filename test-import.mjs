// Test script to check for import errors
console.log('Testing imports...');

try {
  // Use dynamic import since we're in Node
  const module = await import('./src/data/courses/react-course/index.ts');
  console.log('✅ Import successful!');
  console.log('Exported keys:', Object.keys(module));
  console.log('Total lessons:', module.allReactLessons?.length);
  console.log('Total XP:', module.reactCourseStats?.totalXP);
} catch (error) {
  console.error('❌ Import failed:');
  console.error(error.message);
  console.error('\nStack trace:');
  console.error(error.stack);
  process.exit(1);
}
