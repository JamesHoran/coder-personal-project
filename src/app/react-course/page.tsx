'use client';

import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { allReactLessons, reactCourseStats } from '@/data/courses/react-course-interactive';
import { BookOpen, Trophy, Zap, Target } from 'lucide-react';

export default function ReactCoursePage() {
  // Group lessons by module
  const lessonsByModule = allReactLessons.reduce((acc: Record<string, typeof allReactLessons>, lesson) => {
    if (!acc[lesson.moduleId]) {
      acc[lesson.moduleId] = [];
    }
    acc[lesson.moduleId].push(lesson);
    return acc;
  }, {} as Record<string, typeof allReactLessons>);

  const modules = [
    { id: 'module-1-1', phase: 1, title: 'React Fundamentals', description: 'Components, JSX, Props' },
    { id: 'module-1-2', phase: 1, title: 'State Basics', description: 'useState, State Management' },
    { id: 'module-1-3', phase: 1, title: 'Event Handling', description: 'Events, Forms, User Input' },
    { id: 'module-1-4', phase: 1, title: 'Conditional Rendering', description: 'If/Else, Ternary, Loading States' },
    { id: 'module-1-5', phase: 1, title: 'Lists and Keys', description: 'map(), Filtering, Sorting' },
    { id: 'module-2-1', phase: 2, title: 'Advanced Hooks', description: 'useEffect, useContext, useReducer' },
    { id: 'module-2-2', phase: 2, title: 'Component Patterns', description: 'HOCs, Render Props, Custom Hooks' },
    { id: 'module-2-3', phase: 2, title: 'Performance Optimization', description: 'memo, useMemo, Code Splitting' },
    { id: 'module-2-4', phase: 2, title: 'Routing', description: 'React Router, Navigation' },
    { id: 'module-3-1', phase: 3, title: 'State Management', description: 'Redux Toolkit, Zustand' },
    { id: 'module-3-2', phase: 3, title: 'TypeScript with React', description: 'Typing, Generics, Best Practices' },
    { id: 'module-3-3', phase: 3, title: 'Testing', description: 'React Testing Library, Jest' },
    { id: 'module-3-4', phase: 3, title: 'Production Patterns', description: 'Auth, API, Error Handling, A11y' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900">
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-4">
            <Zap className="h-4 w-4" />
            <span className="text-sm font-semibold">Interactive Learning</span>
          </div>
          <h1 className="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
            React Mastery Course
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Master React from fundamentals to advanced patterns through 150+ interactive coding challenges
          </p>

          {/* Stats */}
          <div className="flex justify-center gap-8 flex-wrap">
            <div className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-primary" />
              <div className="text-left">
                <div className="text-2xl font-bold">{reactCourseStats.totalLessons}</div>
                <div className="text-sm text-muted-foreground">Lessons</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Trophy className="h-5 w-5 text-yellow-500" />
              <div className="text-left">
                <div className="text-2xl font-bold">{reactCourseStats.totalXP.toLocaleString()}</div>
                <div className="text-sm text-muted-foreground">Total XP</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Target className="h-5 w-5 text-green-500" />
              <div className="text-left">
                <div className="text-2xl font-bold">60-75h</div>
                <div className="text-sm text-muted-foreground">Duration</div>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-8 flex gap-4 justify-center">
            <Link href="/react-course/lesson">
              <Button size="lg" className="text-lg px-8">
                Start Learning
              </Button>
            </Link>
            <Link href="#modules">
              <Button size="lg" variant="outline" className="text-lg px-8">
                View Modules
              </Button>
            </Link>
          </div>
        </div>

        {/* Phase Overview */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 border-blue-200 dark:border-blue-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Badge className="bg-blue-600">Phase 1</Badge>
                Novice Foundations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Build a solid foundation in React fundamentals
              </p>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Lessons:</span>
                  <span className="font-bold">50</span>
                </div>
                <div className="flex justify-between">
                  <span>XP:</span>
                  <span className="font-bold">~5,000</span>
                </div>
                <div className="flex justify-between">
                  <span>Duration:</span>
                  <span className="font-bold">15-20h</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950 dark:to-purple-900 border-purple-200 dark:border-purple-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Badge className="bg-purple-600">Phase 2</Badge>
                Practitioner Skills
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Master advanced patterns and optimization
              </p>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Lessons:</span>
                  <span className="font-bold">60</span>
                </div>
                <div className="flex justify-between">
                  <span>XP:</span>
                  <span className="font-bold">~15,200</span>
                </div>
                <div className="flex justify-between">
                  <span>Duration:</span>
                  <span className="font-bold">25-30h</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900 border-green-200 dark:border-green-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Badge className="bg-green-600">Phase 3</Badge>
                Expert Mastery
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Production-ready patterns and testing
              </p>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Lessons:</span>
                  <span className="font-bold">40</span>
                </div>
                <div className="flex justify-between">
                  <span>XP:</span>
                  <span className="font-bold">~14,400</span>
                </div>
                <div className="flex justify-between">
                  <span>Duration:</span>
                  <span className="font-bold">20-25h</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Modules Grid */}
        <div id="modules">
          <h2 className="text-3xl font-bold mb-8 text-center">Course Modules</h2>

          {/* Phase 1 */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <Badge variant="outline" className="bg-blue-50 dark:bg-blue-950 border-blue-200">
                Phase 1
              </Badge>
              Novice Foundations
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {modules.filter(m => m.phase === 1).map((module) => {
                const moduleLessons = lessonsByModule[module.id] || [];
                const moduleXP = moduleLessons.reduce((sum: number, l) => sum + l.xpReward, 0);

                return (
                  <Card key={module.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <CardTitle className="text-lg">{module.title}</CardTitle>
                      <p className="text-sm text-muted-foreground">{module.description}</p>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2 mb-4">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Lessons:</span>
                          <span className="font-semibold">{moduleLessons.length}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Total XP:</span>
                          <span className="font-bold text-primary">{moduleXP}</span>
                        </div>
                      </div>
                      <Link href={`/react-course/lesson?module=${module.id}`}>
                        <Button className="w-full" size="sm">
                          Start Module
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Phase 2 */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <Badge variant="outline" className="bg-purple-50 dark:bg-purple-950 border-purple-200">
                Phase 2
              </Badge>
              Practitioner Skills
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {modules.filter(m => m.phase === 2).map((module) => {
                const moduleLessons = lessonsByModule[module.id] || [];
                const moduleXP = moduleLessons.reduce((sum: number, l) => sum + l.xpReward, 0);

                return (
                  <Card key={module.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <CardTitle className="text-lg">{module.title}</CardTitle>
                      <p className="text-sm text-muted-foreground">{module.description}</p>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2 mb-4">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Lessons:</span>
                          <span className="font-semibold">{moduleLessons.length}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Total XP:</span>
                          <span className="font-bold text-primary">{moduleXP}</span>
                        </div>
                      </div>
                      <Link href={`/react-course/lesson?module=${module.id}`}>
                        <Button className="w-full" size="sm">
                          Start Module
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Phase 3 */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <Badge variant="outline" className="bg-green-50 dark:bg-green-950 border-green-200">
                Phase 3
              </Badge>
              Expert Mastery
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {modules.filter(m => m.phase === 3).map((module) => {
                const moduleLessons = lessonsByModule[module.id] || [];
                const moduleXP = moduleLessons.reduce((sum: number, l) => sum + l.xpReward, 0);

                return (
                  <Card key={module.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <CardTitle className="text-lg">{module.title}</CardTitle>
                      <p className="text-sm text-muted-foreground">{module.description}</p>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2 mb-4">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Lessons:</span>
                          <span className="font-semibold">{moduleLessons.length}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Total XP:</span>
                          <span className="font-bold text-primary">{moduleXP}</span>
                        </div>
                      </div>
                      <Link href={`/react-course/lesson?module=${module.id}`}>
                        <Button className="w-full" size="sm">
                          Start Module
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer CTA */}
        <div className="text-center mt-16 p-8 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950 rounded-lg">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Your React Journey?</h2>
          <p className="text-muted-foreground mb-6">
            Join thousands of developers mastering React through interactive lessons
          </p>
          <Link href="/react-course/lesson">
            <Button size="lg" className="text-lg px-8">
              Begin Lesson 1
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
