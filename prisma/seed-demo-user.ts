import { PrismaClient } from '../src/generated/prisma'

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding demo user...')

  // Check if demo user exists
  const existing = await prisma.user.findUnique({
    where: { email: 'demo@example.com' },
  })

  if (existing) {
    console.log('✅ Demo user already exists:', existing.email)
    return
  }

  // Create demo user
  const demoUser = await prisma.user.create({
    data: {
      id: 'demo-user-1',
      email: 'demo@example.com',
      name: 'Demo User',
      password: 'demo-password-hash', // In production, this would be hashed
      role: 'student',
      totalXP: 0,
      level: 1,
      streak: 0,
      longestStreak: 0,
    },
  })

  console.log('✅ Demo user created:', demoUser.email)
}

main()
  .catch((e) => {
    console.error('Error seeding demo user:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
