import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@/generated/prisma';

const prisma = new PrismaClient();

/**
 * POST /api/lessons/submit
 * Submit a student's answer for an interactive lesson step
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      userId,
      lessonId,
      stepId,
      code,
      passed,
      testResults,
      xpEarned,
      language,
    } = body;

    // Validate required fields
    if (!lessonId || !stepId || code === undefined) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    let actualUserId = userId;

    // If no userId provided or user is anonymous, create/get anonymous user
    if (!actualUserId || actualUserId === 'anonymous' || actualUserId === 'demo-user') {
      // Check if anonymous user exists
      let anonymousUser = await prisma.user.findFirst({
        where: { email: 'anonymous@example.com' },
      });

      // Create anonymous user if doesn't exist
      if (!anonymousUser) {
        anonymousUser = await prisma.user.create({
          data: {
            id: 'anonymous-user',
            email: 'anonymous@example.com',
            name: 'Anonymous User',
            password: 'no-password',
            role: 'student',
          },
        });
      }

      actualUserId = anonymousUser.id;
    } else {
      // Check if user exists
      const user = await prisma.user.findUnique({
        where: { id: actualUserId },
      });

      if (!user) {
        return NextResponse.json(
          { success: false, error: 'User not found' },
          { status: 404 }
        );
      }
    }

    // Check if there's a previous submission for this user/lesson/step
    const previousSubmission = await prisma.lessonSubmission.findFirst({
      where: {
        userId: actualUserId,
        lessonId,
        stepId,
      },
      orderBy: {
        submittedAt: 'desc',
      },
    });

    const attempts = previousSubmission ? previousSubmission.attempts + 1 : 1;

    // Create new submission
    const submission = await prisma.lessonSubmission.create({
      data: {
        userId: actualUserId,
        lessonId,
        stepId,
        code,
        passed: passed ?? false,
        testResults: testResults ? JSON.stringify(testResults) : null,
        attempts,
        xpEarned: xpEarned ?? 0,
        language: language ?? 'typescript',
      },
    });

    // If passed and XP earned, update user's total XP (but not for anonymous users)
    if (passed && xpEarned > 0 && actualUserId !== 'anonymous-user') {
      await prisma.user.update({
        where: { id: actualUserId },
        data: {
          totalXP: {
            increment: xpEarned,
          },
          lastActivity: new Date(),
        },
      });
    }

    return NextResponse.json({
      success: true,
      data: {
        submissionId: submission.id,
        attempts,
        passed: submission.passed,
        xpEarned: submission.xpEarned,
      },
    });
  } catch (error) {
    console.error('Error submitting lesson answer:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to submit answer' },
      { status: 500 }
    );
  }
}

/**
 * GET /api/lessons/submit?userId=xxx&lessonId=xxx&stepId=xxx
 * Get submission history for a specific lesson step
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const userId = searchParams.get('userId');
    const lessonId = searchParams.get('lessonId');
    const stepId = searchParams.get('stepId');
    const limit = parseInt(searchParams.get('limit') || '10');

    if (!userId || !lessonId || !stepId) {
      return NextResponse.json(
        { success: false, error: 'Missing required parameters' },
        { status: 400 }
      );
    }

    const submissions = await prisma.lessonSubmission.findMany({
      where: {
        userId,
        lessonId,
        stepId,
      },
      orderBy: {
        submittedAt: 'desc',
      },
      take: limit,
    });

    return NextResponse.json({
      success: true,
      data: {
        submissions: submissions.map((s) => ({
          id: s.id,
          code: s.code,
          passed: s.passed,
          testResults: s.testResults ? JSON.parse(s.testResults) : null,
          attempts: s.attempts,
          xpEarned: s.xpEarned,
          language: s.language,
          submittedAt: s.submittedAt,
        })),
        totalSubmissions: submissions.length,
      },
    });
  } catch (error) {
    console.error('Error fetching submission history:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch submissions' },
      { status: 500 }
    );
  }
}
