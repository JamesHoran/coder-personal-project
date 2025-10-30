import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, GraduationCap, Users, TrendingUp } from "lucide-react";
import { prisma } from "@/lib/prisma";

export default async function HomePage() {
  // Fetch real courses from database
  const courses = await prisma.course.findMany({
    where: {
      isPublished: true,
    },
    orderBy: {
      studentCount: 'desc',
    },
    take: 3,
  });
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-primary/10 to-background py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl font-bold tracking-tight mb-6">
              Learn Anything, Anytime
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Access world-class courses from top instructors. Build skills that matter.
            </p>
            <div className="flex gap-4 justify-center">
              <Link href="/courses">
                <Button size="lg">Browse Courses</Button>
              </Link>
              <Link href="/auth/signup">
                <Button size="lg" variant="outline">Sign Up Free</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Learn With Us?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader>
                <BookOpen className="h-10 w-10 mb-2 text-primary" />
                <CardTitle>1000+ Courses</CardTitle>
                <CardDescription>
                  Comprehensive library covering all topics
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <GraduationCap className="h-10 w-10 mb-2 text-primary" />
                <CardTitle>Expert Instructors</CardTitle>
                <CardDescription>
                  Learn from industry professionals
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <Users className="h-10 w-10 mb-2 text-primary" />
                <CardTitle>100k+ Students</CardTitle>
                <CardDescription>
                  Join our thriving learning community
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <TrendingUp className="h-10 w-10 mb-2 text-primary" />
                <CardTitle>Track Progress</CardTitle>
                <CardDescription>
                  Monitor your learning journey
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Popular Courses Section */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Popular Courses</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <Card key={course.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle>{course.title}</CardTitle>
                  <CardDescription>{course.instructorName}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">{course.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{course.studentCount.toLocaleString()} students</span>
                    <Link href={`/courses/${course.id}`}>
                      <Button variant="outline" size="sm">View Course</Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
