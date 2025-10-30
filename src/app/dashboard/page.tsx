"use client";

import { useAuthStore } from "@/stores/authStore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CourseCard } from "@/components/course/CourseCard";
import { BookOpen, TrendingUp, Award, Zap, Trophy } from "lucide-react";
import Link from "next/link";

interface EnrolledCourse {
  id: string;
  courseId: string;
  progress: number;
  lastAccessedAt: string;
  course: {
    id: string;
    title: string;
    instructorName: string;
  };
}

interface CourseProgress {
  completedLessons: string[];
  completedProjects: string[];
  completedChallenges: string[];
  totalXPEarned: number;
  user: {
    totalXP: number;
    level: number;
    streak: number;
  };
}

export default function DashboardPage() {
  const { user, isAuthenticated, logout } = useAuthStore();
  const router = useRouter();
  const [enrolledCourses, setEnrolledCourses] = useState<EnrolledCourse[]>([]);
  const [progressData, setProgressData] = useState<CourseProgress | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/auth/login");
    }
  }, [isAuthenticated, router]);

  useEffect(() => {
    if (isAuthenticated && user) {
      fetchEnrollments();
      fetchProgressData();
    }
  }, [isAuthenticated, user]);

  const fetchEnrollments = async () => {
    if (!user) return;

    try {
      const response = await fetch(`/api/enrollments?userId=${user.id}`);
      const data = await response.json();

      if (data.success) {
        // Sort by lastAccessedAt to show most recently accessed courses first
        const sorted = data.data.sort((a: EnrolledCourse, b: EnrolledCourse) => {
          return new Date(b.lastAccessedAt).getTime() - new Date(a.lastAccessedAt).getTime();
        });
        setEnrolledCourses(sorted);
      }
    } catch (error) {
      console.error("Error fetching enrollments:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchProgressData = async () => {
    if (!user) return;

    try {
      // Fetch progress for Git course as an example
      const response = await fetch(`/api/progress/course/git?userId=${user.id}`);
      const data = await response.json();

      if (data.success) {
        setProgressData(data.data);
      }
    } catch (error) {
      console.error("Error fetching progress data:", error);
    }
  };

  if (!isAuthenticated || !user) {
    return null;
  }

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">
              Welcome back, {user.displayName}!
            </h1>
            <p className="text-muted-foreground">
              Continue your learning journey
            </p>
          </div>
          <Button variant="outline" onClick={logout}>
            Sign Out
          </Button>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-5 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total XP</CardTitle>
              <Zap className="h-4 w-4 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {progressData?.user?.totalXP?.toLocaleString() || "0"}
              </div>
              <p className="text-xs text-muted-foreground">
                Level {progressData?.user?.level || 1}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Enrolled Courses
              </CardTitle>
              <BookOpen className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{enrolledCourses.length}</div>
              <p className="text-xs text-muted-foreground">
                Active enrollments
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Completed
              </CardTitle>
              <Trophy className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {progressData?.completedLessons?.length || 0}
              </div>
              <p className="text-xs text-muted-foreground">
                Lessons finished
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Challenges
              </CardTitle>
              <Award className="h-4 w-4 text-orange-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {(progressData?.completedProjects?.length || 0) + (progressData?.completedChallenges?.length || 0)}
              </div>
              <p className="text-xs text-muted-foreground">
                Projects & challenges
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Current Streak
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {progressData?.user?.streak || 0} days
              </div>
              <p className="text-xs text-muted-foreground">
                Keep it going!
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Continue Learning */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold">Continue Learning</h2>
            <Link href="/courses">
              <Button variant="outline">Browse All Courses</Button>
            </Link>
          </div>
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
                <p className="mt-4 text-muted-foreground">Loading your courses...</p>
              </div>
            </div>
          ) : enrolledCourses.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {enrolledCourses.map((enrollment) => (
                <CourseCard
                  key={enrollment.id}
                  course={{
                    id: enrollment.courseId,
                    title: enrollment.course.title,
                    instructor: enrollment.course.instructorName,
                  }}
                  progress={enrollment.progress}
                  showProgress={true}
                  enrolled={true}
                />
              ))}
            </div>
          ) : (
            <Card className="p-12">
              <div className="text-center">
                <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">No enrolled courses yet</h3>
                <p className="text-muted-foreground mb-6">
                  Start your learning journey by enrolling in a course
                </p>
                <Link href="/courses">
                  <Button>Browse Courses</Button>
                </Link>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
