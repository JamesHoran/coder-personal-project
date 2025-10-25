import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Clock, Users, Star, Zap, Trophy } from "lucide-react";
import { gitCourse } from "@/data/gitCourse";
import reactCourse from "@/data/courses/react-course";
import asyncCourse from "@/data/courses/async-course";
import leetcodeCourse from "@/data/courses/leetcode-course";
import sqlCourse from "@/data/courses/sql-course";
import cliSearchCourse from "@/data/courses/cli-search-course";
import pythonCourse from "@/data/courses/python-course";
import jestCourse from "@/data/courses/jest-course";
import { typescriptCourse } from "@/data/courses/typescript-course";

export default function CoursesPage() {
  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">Browse Courses</h1>
          <p className="text-muted-foreground text-lg">
            Explore our comprehensive library of courses across various topics
          </p>
        </div>

        {/* Filters */}
        <div className="mb-8 flex flex-wrap gap-2">
          <Button variant="outline" size="sm">All Categories</Button>
          <Button variant="ghost" size="sm">Web Development</Button>
          <Button variant="ghost" size="sm">Data Science</Button>
          <Button variant="ghost" size="sm">Design</Button>
          <Button variant="ghost" size="sm">Business</Button>
          <Button variant="ghost" size="sm">Marketing</Button>
        </div>

        {/* Featured Course - Git Course */}
        <Card className="mb-8 border-2 border-primary bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950">
          <CardHeader>
            <div className="flex items-center gap-2 mb-2">
              <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500">
                <Trophy className="h-3 w-3 mr-1" />
                Gamified Course
              </Badge>
              <Badge variant="secondary">New</Badge>
            </div>
            <CardTitle className="text-3xl">{gitCourse.title}</CardTitle>
            <CardDescription className="text-base">{gitCourse.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3">Course Features</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <Zap className="h-4 w-4 text-yellow-500" />
                    Earn {gitCourse.totalXP.toLocaleString()} XP through gamified learning
                  </li>
                  <li className="flex items-center gap-2">
                    <Trophy className="h-4 w-4 text-yellow-500" />
                    Unlock 16 achievement badges
                  </li>
                  <li className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-yellow-500" />
                    Progress from Novice to Git Guru (21+ levels)
                  </li>
                </ul>
              </div>
              <div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span>{gitCourse.rating}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    <span>{gitCourse.enrollmentCount.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{Math.floor(gitCourse.duration / 60)}h</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-3xl font-bold">${gitCourse.price}</span>
                  <Link href="/courses/git">
                    <Button size="lg">Start Learning</Button>
                  </Link>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* React Course - Featured */}
        <Card className="mb-8 border-2 border-primary bg-gradient-to-r from-cyan-50 to-blue-50 dark:from-cyan-950 dark:to-blue-950">
          <CardHeader>
            <div className="flex items-center gap-2 mb-2">
              <Badge className="bg-gradient-to-r from-cyan-500 to-blue-500">
                <Trophy className="h-3 w-3 mr-1" />
                Gamified Course
              </Badge>
              <Badge variant="secondary">New</Badge>
            </div>
            <CardTitle className="text-3xl">{reactCourse.title}</CardTitle>
            <CardDescription className="text-base">{reactCourse.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3">Course Features</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <Zap className="h-4 w-4 text-cyan-500" />
                    Earn {reactCourse.totalXP.toLocaleString()} XP through gamified learning
                  </li>
                  <li className="flex items-center gap-2">
                    <Trophy className="h-4 w-4 text-cyan-500" />
                    Progress through {reactCourse.phases.length} phases
                  </li>
                  <li className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-cyan-500" />
                    Master 15 modules from beginner to expert
                  </li>
                </ul>
              </div>
              <div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-cyan-400 text-cyan-400" />
                    <span>{reactCourse.rating}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    <span>{reactCourse.enrollmentCount.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{Math.floor(reactCourse.duration / 60)}h</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-3xl font-bold">${reactCourse.price}</span>
                  <Link href="/courses/react">
                    <Button size="lg" className="bg-cyan-600 hover:bg-cyan-700">Start Learning</Button>
                  </Link>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Async Programming Course - Featured */}
        <Card className="mb-8 border-2 border-primary bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950">
          <CardHeader>
            <div className="flex items-center gap-2 mb-2">
              <Badge className="bg-gradient-to-r from-purple-500 to-pink-500">
                <Trophy className="h-3 w-3 mr-1" />
                Gamified Course
              </Badge>
              <Badge variant="secondary">New</Badge>
            </div>
            <CardTitle className="text-3xl">{asyncCourse.title}</CardTitle>
            <CardDescription className="text-base">{asyncCourse.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3">Course Features</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <Zap className="h-4 w-4 text-purple-500" />
                    Earn {asyncCourse.totalXP.toLocaleString()} XP through gamified learning
                  </li>
                  <li className="flex items-center gap-2">
                    <Trophy className="h-4 w-4 text-purple-500" />
                    Progress through {asyncCourse.phases.length} phases
                  </li>
                  <li className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-purple-500" />
                    Master 12 modules from callbacks to production patterns
                  </li>
                </ul>
              </div>
              <div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-purple-400 text-purple-400" />
                    <span>{asyncCourse.rating}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    <span>{asyncCourse.enrollmentCount.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{Math.floor(asyncCourse.duration / 60)}h</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-3xl font-bold">${asyncCourse.price}</span>
                  <Link href="/courses/async">
                    <Button size="lg" className="bg-purple-600 hover:bg-purple-700">Start Learning</Button>
                  </Link>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* LeetCode Mastery Course - Featured */}
        <Card className="mb-8 border-2 border-primary bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950">
          <CardHeader>
            <div className="flex items-center gap-2 mb-2">
              <Badge className="bg-gradient-to-r from-green-500 to-emerald-500">
                <Trophy className="h-3 w-3 mr-1" />
                Gamified Course
              </Badge>
              <Badge variant="secondary">Featured</Badge>
              <Badge variant="outline">Interview Prep</Badge>
            </div>
            <CardTitle className="text-3xl">{leetcodeCourse.title}</CardTitle>
            <CardDescription className="text-base">{leetcodeCourse.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3">Course Features</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <Zap className="h-4 w-4 text-green-500" />
                    Earn {leetcodeCourse.totalXP.toLocaleString()} XP through pattern-based learning
                  </li>
                  <li className="flex items-center gap-2">
                    <Trophy className="h-4 w-4 text-green-500" />
                    Master 10-12 core patterns for FAANG interviews
                  </li>
                  <li className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-green-500" />
                    Progress through {leetcodeCourse.phases.length} phases - {leetcodeCourse.phases.reduce((sum, p) => sum + p.modules.length, 0)} modules
                  </li>
                </ul>
              </div>
              <div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-green-400 text-green-400" />
                    <span>{leetcodeCourse.rating}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    <span>{leetcodeCourse.instructor.studentsCount.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{Math.floor(leetcodeCourse.duration / 60)}h</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-3xl font-bold">${leetcodeCourse.price}</span>
                  <Link href="/courses/leetcode">
                    <Button size="lg" className="bg-green-600 hover:bg-green-700">Start Learning</Button>
                  </Link>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* SQL Essentials Course - Featured */}
        <Card className="mb-8 border-2 border-primary bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-950 dark:to-red-950">
          <CardHeader>
            <div className="flex items-center gap-2 mb-2">
              <Badge className="bg-gradient-to-r from-orange-500 to-red-500">
                <Trophy className="h-3 w-3 mr-1" />
                Gamified Course
              </Badge>
              <Badge variant="secondary">New</Badge>
              <Badge variant="outline">Interview Prep</Badge>
            </div>
            <CardTitle className="text-3xl">{sqlCourse.title}</CardTitle>
            <CardDescription className="text-base">{sqlCourse.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3">Course Features</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <Zap className="h-4 w-4 text-orange-500" />
                    Earn {sqlCourse.totalXP.toLocaleString()} XP through practical SQL challenges
                  </li>
                  <li className="flex items-center gap-2">
                    <Trophy className="h-4 w-4 text-orange-500" />
                    Progress through {sqlCourse.phases.length} phases - from basics to optimization
                  </li>
                  <li className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-orange-500" />
                    Master {sqlCourse.phases.reduce((sum, p) => sum + p.modules.length, 0)} modules covering all SQL essentials
                  </li>
                </ul>
              </div>
              <div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-orange-400 text-orange-400" />
                    <span>{sqlCourse.rating}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    <span>{sqlCourse.instructor.studentsCount.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{Math.floor(sqlCourse.duration / 60)}h</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-3xl font-bold">${sqlCourse.price}</span>
                  <Link href="/courses/sql">
                    <Button size="lg" className="bg-orange-600 hover:bg-orange-700">Start Learning</Button>
                  </Link>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Python Essentials Course - Featured */}
        <Card className="mb-8 border-2 border-primary bg-gradient-to-r from-yellow-50 to-amber-50 dark:from-yellow-950 dark:to-amber-950">
          <CardHeader>
            <div className="flex items-center gap-2 mb-2">
              <Badge className="bg-gradient-to-r from-yellow-500 to-amber-500">
                <Trophy className="h-3 w-3 mr-1" />
                Gamified Course
              </Badge>
              <Badge variant="secondary">New</Badge>
              <Badge variant="outline">Interview Prep</Badge>
            </div>
            <CardTitle className="text-3xl">{pythonCourse.title}</CardTitle>
            <CardDescription className="text-base">{pythonCourse.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3">Course Features</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <Zap className="h-4 w-4 text-yellow-500" />
                    Earn {pythonCourse.totalXP.toLocaleString()} XP through hands-on Python challenges
                  </li>
                  <li className="flex items-center gap-2">
                    <Trophy className="h-4 w-4 text-yellow-500" />
                    Progress through {pythonCourse.phases.length} phases - fundamentals to interview patterns
                  </li>
                  <li className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-yellow-500" />
                    Master {pythonCourse.phases.reduce((sum, p) => sum + p.modules.length, 0)} modules covering Python essentials
                  </li>
                </ul>
              </div>
              <div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span>{pythonCourse.rating}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    <span>{pythonCourse.instructor.studentsCount.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{Math.floor(pythonCourse.duration / 60)}h</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-3xl font-bold">${pythonCourse.price}</span>
                  <Link href="/courses/python">
                    <Button size="lg" className="bg-yellow-600 hover:bg-yellow-700">Start Learning</Button>
                  </Link>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* CLI Search Course - Featured */}
        <Card className="mb-8 border-2 border-primary bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-950 dark:to-teal-950">
          <CardHeader>
            <div className="flex items-center gap-2 mb-2">
              <Badge className="bg-gradient-to-r from-emerald-500 to-teal-500">
                <Trophy className="h-3 w-3 mr-1" />
                Gamified Course
              </Badge>
              <Badge variant="secondary">New</Badge>
            </div>
            <CardTitle className="text-3xl">{cliSearchCourse.title}</CardTitle>
            <CardDescription className="text-base">{cliSearchCourse.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3">Course Features</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <Zap className="h-4 w-4 text-emerald-500" />
                    Earn {cliSearchCourse.totalXP.toLocaleString()} XP through gamified learning
                  </li>
                  <li className="flex items-center gap-2">
                    <Trophy className="h-4 w-4 text-emerald-500" />
                    Progress through {cliSearchCourse.phases.length} phases
                  </li>
                  <li className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-emerald-500" />
                    Master {cliSearchCourse.phases.reduce((sum, p) => sum + p.modules.length, 0)} modules from grep to production debugging
                  </li>
                </ul>
              </div>
              <div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-emerald-400 text-emerald-400" />
                    <span>{cliSearchCourse.rating}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    <span>{cliSearchCourse.enrollmentCount.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{Math.floor(cliSearchCourse.duration / 60)}h</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-3xl font-bold">${cliSearchCourse.price}</span>
                  <Link href="/courses/cli-search">
                    <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700">Start Learning</Button>
                  </Link>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Jest Testing Essentials Course - Featured */}
        <Card className="mb-8 border-2 border-primary bg-gradient-to-r from-rose-50 to-pink-50 dark:from-rose-950 dark:to-pink-950">
          <CardHeader>
            <div className="flex items-center gap-2 mb-2">
              <Badge className="bg-gradient-to-r from-rose-500 to-pink-500">
                <Trophy className="h-3 w-3 mr-1" />
                Gamified Course
              </Badge>
              <Badge variant="secondary">New</Badge>
              <Badge variant="outline">Interview Prep</Badge>
            </div>
            <CardTitle className="text-3xl">{jestCourse.title}</CardTitle>
            <CardDescription className="text-base">{jestCourse.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3">Course Features</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <Zap className="h-4 w-4 text-rose-500" />
                    Earn {jestCourse.totalXP.toLocaleString()} XP through practical testing challenges
                  </li>
                  <li className="flex items-center gap-2">
                    <Trophy className="h-4 w-4 text-rose-500" />
                    Progress through {jestCourse.phases.length} phases - fundamentals to advanced
                  </li>
                  <li className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-rose-500" />
                    Master {jestCourse.phases.reduce((sum, p) => sum + p.modules.length, 0)} modules covering Jest and React Testing
                  </li>
                </ul>
              </div>
              <div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-rose-400 text-rose-400" />
                    <span>{jestCourse.rating}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    <span>{jestCourse.instructor.studentsCount.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{Math.floor(jestCourse.duration / 60)}h</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-3xl font-bold">${jestCourse.price}</span>
                  <Link href="/courses/jest">
                    <Button size="lg" className="bg-rose-600 hover:bg-rose-700">Start Learning</Button>
                  </Link>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* TypeScript Complete Course - Featured */}
        <Card className="mb-8 border-2 border-primary bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-indigo-950 dark:to-blue-950">
          <CardHeader>
            <div className="flex items-center gap-2 mb-2">
              <Badge className="bg-gradient-to-r from-indigo-500 to-blue-500">
                <Trophy className="h-3 w-3 mr-1" />
                Gamified Course
              </Badge>
              <Badge variant="secondary">New</Badge>
              <Badge variant="outline">Interview Prep</Badge>
            </div>
            <CardTitle className="text-3xl">{typescriptCourse.title}</CardTitle>
            <CardDescription className="text-base">{typescriptCourse.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3">Course Features</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <Zap className="h-4 w-4 text-indigo-500" />
                    Earn {typescriptCourse.totalXP.toLocaleString()} XP through gamified learning
                  </li>
                  <li className="flex items-center gap-2">
                    <Trophy className="h-4 w-4 text-indigo-500" />
                    Progress through {typescriptCourse.phases.length} phases - fundamentals to production patterns
                  </li>
                  <li className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-indigo-500" />
                    Master {typescriptCourse.phases.reduce((sum, p) => sum + p.modules.length, 0)} modules covering all TypeScript essentials
                  </li>
                </ul>
              </div>
              <div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-indigo-400 text-indigo-400" />
                    <span>{typescriptCourse.rating}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    <span>{typescriptCourse.enrollmentCount.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{Math.floor(typescriptCourse.duration / 60)}h</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-3xl font-bold">${typescriptCourse.price}</span>
                  <Link href={`/courses/${typescriptCourse.id}`}>
                    <Button size="lg" className="bg-indigo-600 hover:bg-indigo-700">Start Learning</Button>
                  </Link>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Course Grid */}
        <h2 className="text-2xl font-bold mb-6">More Courses</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockCourses.map((course) => (
            <Card key={course.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="aspect-video bg-muted rounded-md mb-4"></div>
                <CardTitle className="line-clamp-2">{course.title}</CardTitle>
                <CardDescription>{course.instructor}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                  {course.description}
                </p>

                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span>{course.rating}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    <span>{course.students}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{course.duration}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold">${course.price}</span>
                  <Link href={`/courses/${course.id}`}>
                    <Button>View Details</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

const mockCourses = [
  {
    id: "1",
    title: "Complete Web Development Bootcamp",
    instructor: "Dr. Angela Yu",
    description: "Become a full-stack web developer with HTML, CSS, JavaScript, React, and Node.js",
    rating: 4.8,
    students: "50,234",
    duration: "65h",
    price: 89.99,
  },
  {
    id: "2",
    title: "Python for Data Science",
    instructor: "Jose Portilla",
    description: "Master Python programming and data analysis with pandas, NumPy, and Matplotlib",
    rating: 4.7,
    students: "35,621",
    duration: "42h",
    price: 79.99,
  },
  {
    id: "3",
    title: "Machine Learning A-Z",
    instructor: "Kirill Eremenko",
    description: "Learn to create Machine Learning Algorithms in Python and R from industry experts",
    rating: 4.9,
    students: "40,892",
    duration: "44h",
    price: 94.99,
  },
  {
    id: "4",
    title: "React - The Complete Guide",
    instructor: "Maximilian Schwarzmüller",
    description: "Dive deep into React and build amazing projects with hooks, context, and more",
    rating: 4.8,
    students: "28,543",
    duration: "48h",
    price: 84.99,
  },
  {
    id: "5",
    title: "UI/UX Design Masterclass",
    instructor: "Daniel Walter Scott",
    description: "Learn user interface and user experience design with Figma and Adobe XD",
    rating: 4.6,
    students: "22,156",
    duration: "38h",
    price: 74.99,
  },
  {
    id: "6",
    title: "AWS Certified Solutions Architect",
    instructor: "Stephane Maarek",
    description: "Pass the AWS certification exam and master cloud architecture",
    rating: 4.9,
    students: "32,987",
    duration: "52h",
    price: 99.99,
  },
];
