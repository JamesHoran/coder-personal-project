import { NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'
import { successResponse, errorResponse } from '@/lib/api-response'

// GET /api/dashboard/stats - Get user dashboard statistics
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const userId = searchParams.get('userId')

    if (!userId) {
      return errorResponse('userId is required', 400)
    }

    // Fetch user with enrollments and progress
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        enrollments: {
          include: {
            course: {
              include: {
                phases: {
                  include: {
                    modules: {
                      include: {
                        lessons: true,
                      },
                    },
                  },
                },
              },
            },
          },
        },
        progress: {
          include: {
            lesson: true,
          },
        },
        badges: {
          include: {
            badge: true,
          },
        },
      },
    })

    if (!user) {
      return errorResponse('User not found', 404)
    }

    // Calculate statistics
    const enrolledCoursesCount = user.enrollments.length

    // Calculate total hours learned (assuming each completed lesson = duration in minutes)
    const totalMinutesLearned = user.progress
      .filter((prog) => prog.completed)
      .reduce((sum, prog) => sum + (prog.lesson.duration || 0), 0)
    const hoursLearned = Math.round((totalMinutesLearned / 60) * 10) / 10 // Round to 1 decimal

    // Calculate completion rate across all enrolled courses
    let totalLessons = 0
    let completedLessons = 0

    user.enrollments.forEach((enrollment) => {
      enrollment.course.phases.forEach((phase) => {
        phase.modules.forEach((module) => {
          totalLessons += module.lessons.length
          module.lessons.forEach((lesson) => {
            if (user.progress.some((prog) => prog.lessonId === lesson.id && prog.completed)) {
              completedLessons++
            }
          })
        })
      })
    })

    const completionRate = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0

    // Count certificates (badges with type 'certificate' or similar)
    const certificatesCount = user.badges.length

    // Get courses in progress (enrolled but not 100% complete)
    const coursesInProgress = user.enrollments
      .map((enrollment) => {
        const course = enrollment.course
        let courseLessons = 0
        let courseCompleted = 0

        course.phases.forEach((phase) => {
          phase.modules.forEach((module) => {
            courseLessons += module.lessons.length
            module.lessons.forEach((lesson) => {
              if (user.progress.some((prog) => prog.lessonId === lesson.id && prog.completed)) {
                courseCompleted++
              }
            })
          })
        })

        const progress = courseLessons > 0 ? Math.round((courseCompleted / courseLessons) * 100) : 0

        return {
          id: course.id,
          title: course.title,
          description: course.description,
          instructor: course.instructorName,
          progress,
          totalLessons: courseLessons,
          completedLessons: courseCompleted,
        }
      })
      .filter((course) => course.progress > 0 && course.progress < 100)
      .sort((a, b) => b.progress - a.progress) // Sort by progress descending
      .slice(0, 3) // Get top 3

    // Get recommended courses (courses not enrolled in)
    const allCourses = await prisma.course.findMany({
      take: 10,
      orderBy: {
        studentCount: 'desc',
      },
    })

    const enrolledCourseIds = new Set(user.enrollments.map((e) => e.courseId))
    const recommendedCourses = allCourses
      .filter((course) => !enrolledCourseIds.has(course.id))
      .slice(0, 3)
      .map((course) => ({
        id: course.id,
        title: course.title,
        description: course.description,
        instructor: course.instructorName,
        studentCount: course.studentCount,
      }))

    return successResponse({
      stats: {
        enrolledCourses: enrolledCoursesCount,
        hoursLearned,
        completionRate,
        certificates: certificatesCount,
      },
      coursesInProgress,
      recommendedCourses,
    })
  } catch (error) {
    console.error('Error fetching dashboard stats:', error)
    return errorResponse('Failed to fetch dashboard stats')
  }
}
