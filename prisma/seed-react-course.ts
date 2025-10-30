/**
 * Seed Script for React Course
 *
 * This script populates the database with all 150+ React course lessons
 * organized into phases and modules.
 */

import { PrismaClient } from '../src/generated/prisma';
import { allReactLessons, reactCourseStats } from '../src/data/courses/react-course-interactive';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting React Course seed...\n');

  // Create or find the React course
  console.log('📚 Creating React course...');
  const reactCourse = await prisma.course.upsert({
    where: { slug: 'react-mastery' },
    update: {},
    create: {
      title: 'React Mastery',
      slug: 'react-mastery',
      description:
        'Master React from fundamentals to advanced patterns. Learn components, hooks, state management, TypeScript, testing, and production-ready patterns through 150+ interactive coding challenges.',
      level: 'beginner', // Starts at beginner, goes to advanced
      category: 'Web Development',
      thumbnail: '/images/courses/react-mastery.jpg',
      duration: 60, // 60 hours total
      totalXP: reactCourseStats.totalXP,
      price: 0, // Free course
      isPublished: true,
      instructorId: 'system',
      instructorName: 'React Academy',
      rating: 4.9,
      studentCount: 0,
    },
  });

  console.log(`✅ Course created: ${reactCourse.title} (ID: ${reactCourse.id})\n`);

  // Create Phase 1: Novice Foundations
  console.log('📖 Creating Phase 1: Novice Foundations...');
  const phase1 = await prisma.phase.create({
    data: {
      courseId: reactCourse.id,
      title: 'Phase 1: Novice Foundations',
      description:
        'Build a solid foundation in React. Learn components, JSX, props, state, events, conditional rendering, and lists.',
      order: 1,
      level: 'Beginner',
      duration: '15-20 hours',
      totalXP: 5000,
    },
  });

  // Create Phase 1 Modules
  const modules1_1 = await createModule(phase1.id, 'React Fundamentals', 'module-1-1', 1, 500);
  const modules1_2 = await createModule(phase1.id, 'State Basics', 'module-1-2', 2, 1000);
  const modules1_3 = await createModule(phase1.id, 'Event Handling', 'module-1-3', 3, 1175);
  const modules1_4 = await createModule(
    phase1.id,
    'Conditional Rendering',
    'module-1-4',
    4,
    1175
  );
  const modules1_5 = await createModule(phase1.id, 'Lists and Keys', 'module-1-5', 5, 1575);

  console.log('✅ Phase 1 modules created\n');

  // Create Phase 2: Practitioner Skills
  console.log('📖 Creating Phase 2: Practitioner Skills...');
  const phase2 = await prisma.phase.create({
    data: {
      courseId: reactCourse.id,
      title: 'Phase 2: Practitioner Skills',
      description:
        'Master advanced React patterns. Learn hooks, component patterns, performance optimization, and routing.',
      order: 2,
      level: 'Intermediate',
      duration: '25-30 hours',
      totalXP: 15200,
    },
  });

  // Create Phase 2 Modules
  const modules2_1 = await createModule(phase2.id, 'Advanced Hooks', 'module-2-1', 1, 3100);
  const modules2_2 = await createModule(phase2.id, 'Component Patterns', 'module-2-2', 2, 3800);
  const modules2_3 = await createModule(
    phase2.id,
    'Performance Optimization',
    'module-2-3',
    3,
    4550
  );
  const modules2_4 = await createModule(phase2.id, 'Routing', 'module-2-4', 4, 3750);

  console.log('✅ Phase 2 modules created\n');

  // Create Phase 3: Expert Mastery
  console.log('📖 Creating Phase 3: Expert Mastery...');
  const phase3 = await prisma.phase.create({
    data: {
      courseId: reactCourse.id,
      title: 'Phase 3: Expert Mastery',
      description:
        'Become a React expert. Master state management, TypeScript, testing, and production patterns.',
      order: 3,
      level: 'Advanced',
      duration: '20-25 hours',
      totalXP: 14400,
    },
  });

  // Create Phase 3 Modules
  const modules3_1 = await createModule(
    phase3.id,
    'Advanced State Management',
    'module-3-1',
    1,
    3950
  );
  const modules3_2 = await createModule(phase3.id, 'TypeScript with React', 'module-3-2', 2, 4150);
  const modules3_3 = await createModule(phase3.id, 'Testing', 'module-3-3', 3, 3600);
  const modules3_4 = await createModule(phase3.id, 'Production Patterns', 'module-3-4', 4, 2700);

  console.log('✅ Phase 3 modules created\n');

  // Map module IDs
  const moduleMap = {
    'module-1-1': modules1_1.id,
    'module-1-2': modules1_2.id,
    'module-1-3': modules1_3.id,
    'module-1-4': modules1_4.id,
    'module-1-5': modules1_5.id,
    'module-2-1': modules2_1.id,
    'module-2-2': modules2_2.id,
    'module-2-3': modules2_3.id,
    'module-2-4': modules2_4.id,
    'module-3-1': modules3_1.id,
    'module-3-2': modules3_2.id,
    'module-3-3': modules3_3.id,
    'module-3-4': modules3_4.id,
  };

  // Create interactive lessons as Challenges in the database
  console.log('📝 Creating lessons...');
  let lessonsCreated = 0;

  for (const lesson of allReactLessons) {
    const dbModuleId = moduleMap[lesson.moduleId as keyof typeof moduleMap];

    if (!dbModuleId) {
      console.warn(`⚠️  Warning: Module ID ${lesson.moduleId} not found in map`);
      continue;
    }

    // Each lesson can have multiple steps, but we'll create one challenge per lesson
    // The steps are handled by the InteractiveLessonPlayer component
    const step = lesson.steps[0]; // Use the first step for the challenge

    await prisma.challenge.create({
      data: {
        id: lesson.id,
        moduleId: dbModuleId,
        title: lesson.title,
        description: step.instruction,
        type: 'interactive', // Custom type for freeCodeCamp-style lessons
        xpReward: lesson.xpReward,
        difficulty: lesson.difficulty,
        starterCode: step.starterCode,
        testCases: JSON.stringify(step.testCases),
        solution: step.solution,
        order: lesson.order,
      },
    });

    lessonsCreated++;

    if (lessonsCreated % 10 === 0) {
      console.log(`   Created ${lessonsCreated}/${allReactLessons.length} lessons...`);
    }
  }

  console.log(`✅ All ${lessonsCreated} lessons created!\n`);

  // Create achievement badges for React course
  console.log('🏆 Creating achievements...');

  const achievements = [
    {
      name: 'React Beginner',
      description: 'Complete Phase 1: Novice Foundations',
      icon: '🌱',
      category: 'foundational',
      xpReward: 500,
    },
    {
      name: 'React Practitioner',
      description: 'Complete Phase 2: Practitioner Skills',
      icon: '⚡',
      category: 'advanced',
      xpReward: 1000,
    },
    {
      name: 'React Expert',
      description: 'Complete Phase 3: Expert Mastery',
      icon: '🚀',
      category: 'mastery',
      xpReward: 2000,
    },
    {
      name: 'React Master',
      description: 'Complete all 150+ React lessons',
      icon: '👑',
      category: 'mastery',
      xpReward: 5000,
    },
    {
      name: 'State Master',
      description: 'Complete all state management lessons',
      icon: '🎯',
      category: 'mastery',
      xpReward: 1500,
    },
    {
      name: 'Hook Hero',
      description: 'Complete all hook-related lessons',
      icon: '🪝',
      category: 'advanced',
      xpReward: 1000,
    },
    {
      name: 'TypeScript Pro',
      description: 'Complete TypeScript with React module',
      icon: '💙',
      category: 'advanced',
      xpReward: 1500,
    },
    {
      name: 'Test Champion',
      description: 'Complete Testing module',
      icon: '✅',
      category: 'advanced',
      xpReward: 1000,
    },
  ];

  for (const achievement of achievements) {
    await prisma.achievement.upsert({
      where: { name: achievement.name },
      update: {},
      create: achievement,
    });
  }

  console.log(`✅ Created ${achievements.length} achievements\n`);

  // Create badges
  console.log('🎖️  Creating badges...');

  const badges = [
    {
      name: 'Component Creator',
      description: 'Create your first React component',
      icon: '⚛️',
      requirement: 'Complete the first lesson',
      xpReward: 50,
    },
    {
      name: 'State Wizard',
      description: 'Master useState hook',
      icon: '🧙',
      requirement: 'Complete State Basics module',
      xpReward: 100,
    },
    {
      name: 'Event Handler',
      description: 'Handle events like a pro',
      icon: '🎪',
      requirement: 'Complete Event Handling module',
      xpReward: 100,
    },
    {
      name: 'Performance Guru',
      description: 'Optimize React applications',
      icon: '⚡',
      requirement: 'Complete Performance Optimization module',
      xpReward: 200,
    },
    {
      name: 'Router Expert',
      description: 'Master React Router',
      icon: '🛣️',
      requirement: 'Complete Routing module',
      xpReward: 150,
    },
    {
      name: 'Production Ready',
      description: 'Learn production patterns',
      icon: '🚀',
      requirement: 'Complete Production Patterns module',
      xpReward: 300,
    },
  ];

  for (const badge of badges) {
    await prisma.badge.upsert({
      where: { name: badge.name },
      update: {},
      create: badge,
    });
  }

  console.log(`✅ Created ${badges.length} badges\n`);

  console.log('🎉 React course seed completed successfully!\n');
  console.log('📊 Summary:');
  console.log(`   - Course: ${reactCourse.title}`);
  console.log(`   - Phases: 3`);
  console.log(`   - Modules: 13`);
  console.log(`   - Lessons: ${lessonsCreated}`);
  console.log(`   - Total XP: ${reactCourseStats.totalXP.toLocaleString()}`);
  console.log(`   - Achievements: ${achievements.length}`);
  console.log(`   - Badges: ${badges.length}`);
}

/**
 * Helper function to create a module
 */
async function createModule(
  phaseId: string,
  title: string,
  questName: string,
  order: number,
  totalXP: number
) {
  return prisma.module.create({
    data: {
      phaseId,
      title,
      quest: questName,
      description: `Learn ${title} through interactive coding challenges`,
      order,
      totalXP,
    },
  });
}

// Execute the seed
main()
  .catch(e => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
