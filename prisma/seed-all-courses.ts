import { PrismaClient } from '../src/generated/prisma'
import { gitCourse } from '../src/data/gitCourse'
import { reactCourse } from '../src/data/courses/react-course'
import { asyncCourse } from '../src/data/courses/async-course'
import { pythonCourse } from '../src/data/courses/python-course'
import { sqlCourse } from '../src/data/courses/sql-course'
import { leetcodeCourse } from '../src/data/courses/leetcode-course'
import { jestCourse } from '../src/data/courses/jest-course'
import { cliSearchCourse } from '../src/data/courses/cli-search-course'
import { typescriptCourse } from '../src/data/courses/typescript-course'
import type { GamifiedCourse, Phase as CoursePhase, Module as CourseModule } from '../src/types'

const prisma = new PrismaClient()

// Helper function to calculate total XP for a module
function calculateModuleXP(module: CourseModule): number {
  const projectsXP = module.projects?.reduce((sum, p) => sum + p.xp, 0) || 0
  const challengesXP = module.challenges?.reduce((sum, c) => sum + c.xp, 0) || 0
  return projectsXP + challengesXP + 100 // Base lesson XP
}

// Helper function to calculate total XP for a phase
function calculatePhaseXP(phase: CoursePhase): number {
  return phase.modules.reduce((sum, m) => sum + calculateModuleXP(m), 0)
}

// Helper function to seed a course
async function seedCourse(courseData: GamifiedCourse) {
  console.log(`\n📚 Seeding course: ${courseData.title}`)

  // Create slug if not provided
  const slug = courseData.slug || courseData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')

  // Create the course
  const course = await prisma.course.create({
    data: {
      title: courseData.title,
      slug: slug,
      description: courseData.description,
      level: courseData.level,
      category: courseData.category,
      thumbnail: courseData.thumbnail || `/courses/${slug}.jpg`,
      duration: courseData.duration,
      totalXP: courseData.totalXP,
      price: 0, // Per user requirement: no pricing
      isPublished: true,
      instructorId: 'instructor-1',
      instructorName: courseData.instructorName || 'Expert Instructor',
      rating: courseData.rating || 4.8,
      studentCount: courseData.studentCount || 0,
    },
  })

  console.log(`  ✅ Created course: ${course.title}`)

  // Seed phases
  for (let i = 0; i < courseData.phases.length; i++) {
    const phaseData = courseData.phases[i]
    const phase = await prisma.phase.create({
      data: {
        courseId: course.id,
        title: phaseData.title,
        description: phaseData.description || `Phase ${i + 1} of ${courseData.title}`,
        order: phaseData.order || i + 1,
        level: phaseData.level,
        duration: phaseData.duration,
        totalXP: calculatePhaseXP(phaseData),
      },
    })

    console.log(`    ✅ Created phase: ${phase.title}`)

    // Seed modules
    for (const moduleData of phaseData.modules) {
      const module = await prisma.module.create({
        data: {
          phaseId: phase.id,
          title: moduleData.title,
          quest: moduleData.questName || moduleData.title,
          description: moduleData.description,
          order: parseInt(moduleData.number.split('.')[1]) || 1,
          totalXP: calculateModuleXP(moduleData),
        },
      })

      console.log(`      ✅ Created module: ${module.title}`)

      // Create lessons for this module
      if (moduleData.learningObjectives && moduleData.learningObjectives.length > 0) {
        const lessonsData = moduleData.learningObjectives.map((objective, index) => ({
          moduleId: module.id,
          title: objective,
          content: `# ${objective}\n\nThis lesson covers: ${objective}\n\n## Key Concepts\n\n${moduleData.description}\n\n## Learning Objectives\n\n${moduleData.learningObjectives.join('\n- ')}`,
          duration: 15 + (index * 5), // Varying duration
          order: index + 1,
          xpReward: 10 + (index * 5),
          type: 'lesson',
        }))

        await prisma.lesson.createMany({
          data: lessonsData,
        })

        console.log(`        ✅ Created ${lessonsData.length} lessons`)
      }

      // Create projects
      if (moduleData.projects && moduleData.projects.length > 0) {
        for (const projectData of moduleData.projects) {
          await prisma.project.create({
            data: {
              moduleId: module.id,
              title: projectData.name,
              description: projectData.description,
              xpReward: projectData.xp,
              requirements: JSON.stringify(projectData.successCriteria || []),
              starterCode: `// ${projectData.name}\n// ${projectData.description}\n\n// TODO: Implement your solution here`,
              solution: `// Solution for ${projectData.name}\n// This is a placeholder solution`,
              order: moduleData.projects.indexOf(projectData) + 1,
            },
          })
        }

        console.log(`        ✅ Created ${moduleData.projects.length} projects`)
      }

      // Create challenges
      if (moduleData.challenges && moduleData.challenges.length > 0) {
        for (const challengeData of moduleData.challenges) {
          await prisma.challenge.create({
            data: {
              moduleId: module.id,
              title: challengeData.name,
              description: challengeData.description,
              type: challengeData.type,
              xpReward: challengeData.xp,
              difficulty: challengeData.difficulty,
              starterCode: `// ${challengeData.name}\n// ${challengeData.description}\n\n// TODO: Complete this challenge`,
              testCases: JSON.stringify([
                { input: [], expected: 'success', description: 'Basic test case' },
              ]),
              timeLimit: challengeData.type === 'speed' ? 15 : undefined,
              order: moduleData.challenges.indexOf(challengeData) + 1,
            },
          })
        }

        console.log(`        ✅ Created ${moduleData.challenges.length} challenges`)
      }
    }
  }

  return course
}

// Helper function to seed badges
async function seedBadges(courseSlug: string, badges: any[]) {
  if (!badges || badges.length === 0) return

  const badgesData = badges.map((badge) => ({
    name: `${badge.name}`,
    description: badge.description,
    icon: badge.icon || '🏆',
    requirement: `Complete requirements for ${badge.name}`,
    xpReward: 50,
  }))

  await prisma.badge.createMany({
    data: badgesData,
  })

  console.log(`  ✅ Created ${badgesData.length} badges for ${courseSlug}`)
}

async function main() {
  console.log('🌱 Starting comprehensive database seeding...\n')

  // Clear existing data (optional - comment out if you want to preserve data)
  console.log('🗑️  Clearing existing data...')
  await prisma.challengeSubmission.deleteMany({})
  await prisma.lessonProgress.deleteMany({})
  await prisma.userBadge.deleteMany({})
  await prisma.userAchievement.deleteMany({})
  await prisma.enrollment.deleteMany({})
  await prisma.user.deleteMany({})
  await prisma.challenge.deleteMany({})
  await prisma.project.deleteMany({})
  await prisma.lesson.deleteMany({})
  await prisma.module.deleteMany({})
  await prisma.phase.deleteMany({})
  await prisma.course.deleteMany({})
  await prisma.badge.deleteMany({})
  await prisma.achievement.deleteMany({})
  console.log('  ✅ Cleared existing data\n')

  // Seed all courses
  const courses = [
    gitCourse,
    reactCourse,
    asyncCourse,
    pythonCourse,
    sqlCourse,
    leetcodeCourse,
    jestCourse,
    cliSearchCourse,
    typescriptCourse,
  ]

  for (const courseData of courses) {
    try {
      await seedCourse(courseData)

      // Seed badges if they exist
      if ('badges' in courseData && courseData.badges) {
        await seedBadges(courseData.slug, courseData.badges)
      }
    } catch (error) {
      console.error(`  ❌ Error seeding ${courseData.title}:`, error)
    }
  }

  // Create global achievements
  console.log('\n🏆 Creating global achievements...')
  await prisma.achievement.createMany({
    data: [
      {
        name: 'First Steps',
        description: 'Complete your first lesson',
        icon: '👶',
        category: 'foundational',
        xpReward: 25,
      },
      {
        name: 'Course Completer',
        description: 'Complete your first course',
        icon: '🎓',
        category: 'foundational',
        xpReward: 500,
      },
      {
        name: 'Challenge Master',
        description: 'Complete 50 challenges',
        icon: '⚔️',
        category: 'mastery',
        xpReward: 1000,
      },
      {
        name: 'Project Hero',
        description: 'Complete 25 projects',
        icon: '🦸',
        category: 'mastery',
        xpReward: 750,
      },
      {
        name: 'Polyglot',
        description: 'Complete courses in 3 different technologies',
        icon: '🌍',
        category: 'special',
        xpReward: 1500,
      },
      {
        name: 'Speed Demon',
        description: 'Complete 10 speed challenges',
        icon: '⚡',
        category: 'special',
        xpReward: 500,
      },
      {
        name: '7-Day Streak',
        description: 'Learn for 7 consecutive days',
        icon: '🔥',
        category: 'special',
        xpReward: 300,
      },
      {
        name: '30-Day Streak',
        description: 'Learn for 30 consecutive days',
        icon: '🔥🔥',
        category: 'special',
        xpReward: 1000,
      },
      {
        name: 'Night Owl',
        description: 'Complete 10 lessons after 10 PM',
        icon: '🦉',
        category: 'special',
        xpReward: 200,
      },
      {
        name: 'Early Bird',
        description: 'Complete 10 lessons before 8 AM',
        icon: '🐦',
        category: 'special',
        xpReward: 200,
      },
      {
        name: 'Boss Slayer',
        description: 'Complete 10 boss challenges',
        icon: '🐉',
        category: 'mastery',
        xpReward: 1500,
      },
      {
        name: 'Perfect Score',
        description: 'Get 100% on 5 different challenges',
        icon: '💯',
        category: 'mastery',
        xpReward: 500,
      },
    ],
  })
  console.log('  ✅ Created global achievements')

  // Create demo users
  console.log('\n👥 Creating demo users...')

  const users = [
    {
      email: 'demo@example.com',
      name: 'Demo User',
      password: 'demo123',
      role: 'student',
      totalXP: 2450,
      level: 25,
    },
    {
      email: 'student@example.com',
      name: 'Alex Student',
      password: 'password123',
      role: 'student',
      totalXP: 5600,
      level: 56,
    },
    {
      email: 'learner@example.com',
      name: 'Jamie Learner',
      password: 'password123',
      role: 'student',
      totalXP: 8900,
      level: 89,
    },
  ]

  for (const userData of users) {
    const user = await prisma.user.create({
      data: userData,
    })

    // Enroll demo user in a few courses
    if (userData.email === 'demo@example.com') {
      const allCourses = await prisma.course.findMany({ take: 3 })
      for (const course of allCourses) {
        await prisma.enrollment.create({
          data: {
            userId: user.id,
            courseId: course.id,
            status: 'active',
            progress: Math.floor(Math.random() * 40) + 10, // 10-50% progress
          },
        })
      }
    }

    console.log(`  ✅ Created user: ${user.name} (${user.email})`)
  }

  console.log('\n🎉 Database seeding completed successfully!')
  console.log('\n📊 Summary:')

  const courseCount = await prisma.course.count()
  const phaseCount = await prisma.phase.count()
  const moduleCount = await prisma.module.count()
  const lessonCount = await prisma.lesson.count()
  const projectCount = await prisma.project.count()
  const challengeCount = await prisma.challenge.count()
  const badgeCount = await prisma.badge.count()
  const achievementCount = await prisma.achievement.count()
  const userCount = await prisma.user.count()

  console.log(`  📚 Courses: ${courseCount}`)
  console.log(`  📖 Phases: ${phaseCount}`)
  console.log(`  📝 Modules: ${moduleCount}`)
  console.log(`  📄 Lessons: ${lessonCount}`)
  console.log(`  🚀 Projects: ${projectCount}`)
  console.log(`  ⚔️  Challenges: ${challengeCount}`)
  console.log(`  🏆 Badges: ${badgeCount}`)
  console.log(`  🎖️  Achievements: ${achievementCount}`)
  console.log(`  👥 Users: ${userCount}`)
  console.log('\n✨ Ready to launch!')
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
