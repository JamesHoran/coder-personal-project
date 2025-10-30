'use client';

import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { reactCourse, allModules } from '@/data/courses/react';
import { BookOpen, Trophy, Zap, Target, Code2, Rocket, CheckCircle2, Lock } from 'lucide-react';

export default function ReactCoursePage() {
  // TODO: Get user progress from database
  const userProgress = {
    completedLessons: [],
    completedProjects: [],
    totalXP: 0,
    currentLevel: 1,
  };

  const { stats } = reactCourse;

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900">
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-4">
            <Zap className="h-4 w-4" />
            <span className="text-sm font-semibold">Interactive Learning + Gamification</span>
          </div>

          <h1 className="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
            {reactCourse.title}
          </h1>

          <p className="text-xl text-muted-foreground mb-2">{reactCourse.tagline}</p>

          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            {reactCourse.description}
          </p>

          {/* Stats */}
          <div className="flex justify-center gap-8 flex-wrap mb-8">
            <div className="flex items-center gap-2">
              <Code2 className="h-5 w-5 text-primary" />
              <div className="text-left">
                <div className="text-2xl font-bold">{stats.totalLessons}</div>
                <div className="text-sm text-muted-foreground">Interactive Lessons</div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Rocket className="h-5 w-5 text-orange-500" />
              <div className="text-left">
                <div className="text-2xl font-bold">{stats.totalProjects}</div>
                <div className="text-sm text-muted-foreground">Capstone Projects</div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Trophy className="h-5 w-5 text-yellow-500" />
              <div className="text-left">
                <div className="text-2xl font-bold">{stats.totalXP.toLocaleString()}</div>
                <div className="text-sm text-muted-foreground">Total XP</div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Target className="h-5 w-5 text-green-500" />
              <div className="text-left">
                <div className="text-2xl font-bold">
                  {stats.estimatedHoursMin}-{stats.estimatedHoursMax}h
                </div>
                <div className="text-sm text-muted-foreground">Duration</div>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="flex gap-4 justify-center">
            <Link href="/courses/react-new/lessons/react-basics-01">
              <Button size="lg" className="text-lg px-8">
                Start Learning
              </Button>
            </Link>
            <Link href="#curriculum">
              <Button size="lg" variant="outline" className="text-lg px-8">
                View Curriculum
              </Button>
            </Link>
          </div>
        </div>

        {/* What Makes This Course Special */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">What Makes This Course Special?</h2>

          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <Code2 className="h-10 w-10 text-blue-500 mb-2" />
                <CardTitle>Interactive Code Editor</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Write real React code in your browser with instant feedback. Every lesson has automated tests that
                  verify your solution.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Rocket className="h-10 w-10 text-orange-500 mb-2" />
                <CardTitle>Real-World Projects</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Build 13 portfolio-worthy capstone projects from Todo apps to production SaaS applications with
                  authentication and payments.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Trophy className="h-10 w-10 text-yellow-500 mb-2" />
                <CardTitle>Gamified Learning</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Earn XP, unlock badges, level up, and compete on leaderboards. Stay motivated with achievements and
                  progress tracking.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Phase Overview */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {reactCourse.phases.map((phase) => {
            const phaseProgress = 0; // TODO: Calculate from user progress

            return (
              <Card
                key={phase.id}
                className={`${
                  phase.number === 1
                    ? 'bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 border-blue-200 dark:border-blue-800'
                    : phase.number === 2
                      ? 'bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950 dark:to-purple-900 border-purple-200 dark:border-purple-800'
                      : 'bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900 border-green-200 dark:border-green-800'
                }`}
              >
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Badge
                      className={`${
                        phase.number === 1
                          ? 'bg-blue-600'
                          : phase.number === 2
                            ? 'bg-purple-600'
                            : 'bg-green-600'
                      }`}
                    >
                      Phase {phase.number}
                    </Badge>
                    {phase.title}
                  </CardTitle>
                  <CardDescription className="text-foreground/80">{phase.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm mb-4">
                    <div className="flex justify-between">
                      <span>Lessons:</span>
                      <span className="font-bold">{phase.totalLessons}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Projects:</span>
                      <span className="font-bold">{phase.totalProjects}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>XP:</span>
                      <span className="font-bold">{phase.totalXP.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Duration:</span>
                      <span className="font-bold">{phase.estimatedHours}</span>
                    </div>
                  </div>

                  {phaseProgress > 0 && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progress</span>
                        <span>{phaseProgress}%</span>
                      </div>
                      <Progress value={phaseProgress} />
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Curriculum */}
        <div id="curriculum">
          <h2 className="text-3xl font-bold mb-8 text-center">Complete Curriculum</h2>

          {reactCourse.phases.map((phase) => (
            <div key={phase.id} className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <Badge
                  variant="outline"
                  className={`${
                    phase.number === 1
                      ? 'bg-blue-50 dark:bg-blue-950 border-blue-200'
                      : phase.number === 2
                        ? 'bg-purple-50 dark:bg-purple-950 border-purple-200'
                        : 'bg-green-50 dark:bg-green-950 border-green-200'
                  }`}
                >
                  Phase {phase.number}
                </Badge>
                <h3 className="text-2xl font-bold">{phase.title}</h3>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {phase.modules.map((module) => {
                  const isLocked = false; // TODO: Check prerequisites
                  const isCompleted = false; // TODO: Check user progress

                  return (
                    <Card
                      key={module.id}
                      className={`hover:shadow-lg transition-shadow ${isLocked ? 'opacity-60' : ''}`}
                    >
                      <CardHeader>
                        <div className="flex items-start justify-between mb-2">
                          <Badge variant="secondary">Module {module.number}</Badge>
                          {isCompleted && <CheckCircle2 className="h-5 w-5 text-green-500" />}
                          {isLocked && <Lock className="h-5 w-5 text-muted-foreground" />}
                        </div>
                        <CardTitle className="text-lg">{module.title}</CardTitle>
                        <p className="text-sm text-primary italic">{module.questName}</p>
                        <CardDescription className="text-sm mt-2">{module.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2 mb-4">
                          <div className="flex justify-between text-sm items-center">
                            <span className="text-muted-foreground flex items-center gap-1">
                              <Code2 className="h-4 w-4" /> Lessons:
                            </span>
                            <span className="font-semibold">{module.lessons.length}</span>
                          </div>
                          <div className="flex justify-between text-sm items-center">
                            <span className="text-muted-foreground flex items-center gap-1">
                              <Rocket className="h-4 w-4" /> Project:
                            </span>
                            <span className="font-semibold">{module.capstoneProject.name}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Total XP:</span>
                            <span className="font-bold text-primary">{module.totalXP.toLocaleString()}</span>
                          </div>
                        </div>

                        {isLocked ? (
                          <Button className="w-full" size="sm" disabled>
                            <Lock className="h-4 w-4 mr-2" />
                            Locked
                          </Button>
                        ) : (
                          <Link href={`/courses/react-new/lessons/${module.lessons[0].id}`}>
                            <Button className="w-full" size="sm">
                              {isCompleted ? 'Review Module' : 'Start Module'}
                            </Button>
                          </Link>
                        )}
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Footer CTA */}
        <div className="text-center mt-16 p-8 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950 rounded-lg">
          <h2 className="text-3xl font-bold mb-4">Ready to Become a React Master?</h2>
          <p className="text-muted-foreground mb-6">
            Join thousands of developers mastering React through interactive lessons and real-world projects
          </p>
          <Link href="/courses/react-new/lessons/react-basics-01">
            <Button size="lg" className="text-lg px-8">
              Start Your Journey
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
