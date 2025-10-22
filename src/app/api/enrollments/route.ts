import { NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'
import { successResponse, errorResponse } from '@/lib/api-response'

// POST /api/enrollments - Enroll in a course
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { userId, courseId } = body

    if (!userId || !courseId) {
      return errorResponse('userId and courseId are required', 400)
    }

    // Check if already enrolled
    const existing = await prisma.enrollment.findUnique({
      where: {
        userId_courseId: {
          userId,
          courseId,
        },
      },
    })

    if (existing) {
      return errorResponse('Already enrolled in this course', 400)
    }

    // Create enrollment
    const enrollment = await prisma.enrollment.create({
      data: {
        userId,
        courseId,
      },
      include: {
        course: true,
      },
    })

    // Update course student count
    await prisma.course.update({
      where: { id: courseId },
      data: {
        studentCount: {
          increment: 1,
        },
      },
    })

    return successResponse(enrollment, 201)
  } catch (error) {
    console.error('Error creating enrollment:', error)
    return errorResponse('Failed to enroll in course')
  }
}

// GET /api/enrollments - Get user enrollments
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const userId = searchParams.get('userId')

    if (!userId) {
      return errorResponse('userId is required', 400)
    }

    const enrollments = await prisma.enrollment.findMany({
      where: { userId },
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
      orderBy: {
        enrolledAt: 'desc',
      },
    })

    return successResponse(enrollments)
  } catch (error) {
    console.error('Error fetching enrollments:', error)
    return errorResponse('Failed to fetch enrollments')
  }
}
