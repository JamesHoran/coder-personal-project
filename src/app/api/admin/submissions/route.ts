import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@/generated/prisma';

const prisma = new PrismaClient();

/**
 * GET /api/admin/submissions
 * Get all lesson submissions (admin only)
 * Query params:
 * - lessonId: Filter by lesson
 * - userId: Filter by user
 * - passed: Filter by pass/fail status (true/false)
 * - limit: Number of results (default 50)
 * - offset: Pagination offset
 * - sortBy: Field to sort by (submittedAt, attempts)
 * - sortOrder: asc or desc
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;

    // Query filters
    const lessonId = searchParams.get('lessonId');
    const userId = searchParams.get('userId');
    const passedParam = searchParams.get('passed');
    const language = searchParams.get('language');
    const limit = parseInt(searchParams.get('limit') || '50');
    const offset = parseInt(searchParams.get('offset') || '0');
    const sortBy = searchParams.get('sortBy') || 'submittedAt';
    const sortOrder = searchParams.get('sortOrder') || 'desc';

    // Build where clause
    const where: any = {};
    if (lessonId) where.lessonId = lessonId;
    if (userId) where.userId = userId;
    if (passedParam !== null) where.passed = passedParam === 'true';
    if (language) where.language = language;

    // Get submissions with user data
    const submissions = await prisma.lessonSubmission.findMany({
      where,
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            totalXP: true,
            level: true,
          },
        },
      },
      orderBy: {
        [sortBy]: sortOrder,
      },
      skip: offset,
      take: limit,
    });

    // Get total count for pagination
    const totalCount = await prisma.lessonSubmission.count({ where });

    return NextResponse.json({
      success: true,
      data: {
        submissions: submissions.map((s) => ({
          id: s.id,
          user: s.user,
          lessonId: s.lessonId,
          stepId: s.stepId,
          code: s.code,
          passed: s.passed,
          testResults: s.testResults ? JSON.parse(s.testResults) : null,
          attempts: s.attempts,
          xpEarned: s.xpEarned,
          language: s.language,
          submittedAt: s.submittedAt,
        })),
        pagination: {
          total: totalCount,
          limit,
          offset,
          hasMore: offset + limit < totalCount,
        },
      },
    });
  } catch (error) {
    console.error('Error fetching submissions:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch submissions' },
      { status: 500 }
    );
  }
}

/**
 * GET /api/admin/submissions/stats
 * Get statistics about lesson submissions
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { lessonId } = body;

    const where = lessonId ? { lessonId } : {};

    // Get various statistics
    const [
      totalSubmissions,
      passedSubmissions,
      failedSubmissions,
      uniqueUsers,
      avgAttempts,
      submissionsByLanguage,
      recentSubmissions,
    ] = await Promise.all([
      // Total submissions
      prisma.lessonSubmission.count({ where }),

      // Passed submissions
      prisma.lessonSubmission.count({
        where: { ...where, passed: true },
      }),

      // Failed submissions
      prisma.lessonSubmission.count({
        where: { ...where, passed: false },
      }),

      // Unique users
      prisma.lessonSubmission.groupBy({
        by: ['userId'],
        where,
        _count: true,
      }),

      // Average attempts
      prisma.lessonSubmission.aggregate({
        where,
        _avg: {
          attempts: true,
        },
      }),

      // Submissions by language
      prisma.lessonSubmission.groupBy({
        by: ['language'],
        where,
        _count: true,
      }),

      // Recent submissions
      prisma.lessonSubmission.findMany({
        where,
        include: {
          user: {
            select: {
              name: true,
              email: true,
            },
          },
        },
        orderBy: {
          submittedAt: 'desc',
        },
        take: 10,
      }),
    ]);

    const passRate = totalSubmissions > 0
      ? (passedSubmissions / totalSubmissions) * 100
      : 0;

    return NextResponse.json({
      success: true,
      data: {
        overview: {
          totalSubmissions,
          passedSubmissions,
          failedSubmissions,
          passRate: passRate.toFixed(2),
          uniqueUsers: uniqueUsers.length,
          avgAttempts: avgAttempts._avg.attempts?.toFixed(2) || 0,
        },
        byLanguage: submissionsByLanguage.map((item) => ({
          language: item.language,
          count: item._count,
        })),
        recent: recentSubmissions.map((s) => ({
          id: s.id,
          userName: s.user.name,
          userEmail: s.user.email,
          lessonId: s.lessonId,
          stepId: s.stepId,
          passed: s.passed,
          attempts: s.attempts,
          submittedAt: s.submittedAt,
        })),
      },
    });
  } catch (error) {
    console.error('Error fetching submission stats:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch statistics' },
      { status: 500 }
    );
  }
}
