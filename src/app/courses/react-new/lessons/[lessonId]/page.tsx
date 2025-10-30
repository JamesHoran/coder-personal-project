'use client';

import { use } from 'react';
import { notFound, useRouter } from 'next/navigation';
import Link from 'next/link';
import { InteractiveLessonPlayer } from '@/components/lessons/InteractiveLessonPlayer';
import { getLessonById, getModuleById, allModules } from '@/data/courses/react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ChevronLeft, ChevronRight, Home, BookOpen } from 'lucide-react';

interface LessonPageProps {
  params: Promise<{
    lessonId: string;
  }>;
}

export default function ReactLessonPage({ params }: LessonPageProps) {
  const { lessonId } = use(params);
  const router = useRouter();

  // Get the lesson
  const lesson = getLessonById(lessonId);

  if (!lesson) {
    notFound();
  }

  // Get the module this lesson belongs to
  const module = getModuleById(lesson.moduleId);

  if (!module) {
    notFound();
  }

  // Find current lesson index and adjacent lessons
  const lessonIndex = module.lessons.findIndex((l) => l.id === lessonId);
  const previousLesson = lessonIndex > 0 ? module.lessons[lessonIndex - 1] : null;
  const nextLesson = lessonIndex < module.lessons.length - 1 ? module.lessons[lessonIndex + 1] : null;

  // Handle lesson completion
  const handleComplete = async (xp: number) => {
    console.log(`Lesson completed! Earned ${xp} XP`);

    // TODO: Update user progress in database
    // TODO: Show XP earned animation
    // TODO: Check for level ups and badges

    // Auto-navigate to next lesson if available
    if (nextLesson) {
      setTimeout(() => {
        router.push(`/courses/react-new/lessons/${nextLesson.id}`);
      }, 2000);
    }
  };

  // Handle navigation
  const handleNext = () => {
    if (nextLesson) {
      router.push(`/courses/react-new/lessons/${nextLesson.id}`);
    }
  };

  const handlePrevious = () => {
    if (previousLesson) {
      router.push(`/courses/react-new/lessons/${previousLesson.id}`);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Top Navigation Bar */}
      <div className="border-b bg-white dark:bg-slate-950 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Left: Breadcrumbs */}
            <div className="flex items-center gap-3 text-sm">
              <Link href="/courses">
                <Button variant="ghost" size="sm">
                  <Home className="h-4 w-4" />
                </Button>
              </Link>
              <span className="text-muted-foreground">/</span>
              <Link href="/courses/react-new">
                <Button variant="ghost" size="sm">
                  React Course
                </Button>
              </Link>
              <span className="text-muted-foreground">/</span>
              <Badge variant="outline">{module.title}</Badge>
            </div>

            {/* Right: Progress */}
            <div className="flex items-center gap-4">
              <div className="text-sm text-muted-foreground">
                Lesson {lessonIndex + 1} of {module.lessons.length}
              </div>
              <div className="flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-primary" />
                <span className="font-semibold">{lesson.xpReward} XP</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Lesson Content */}
      <div className="container mx-auto px-4 py-6">
        {/* Module Context */}
        <div className="mb-6">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
            <span>Module {module.number}:</span>
            <span className="font-semibold text-foreground">{module.title}</span>
            <span>-</span>
            <span className="italic">{module.questName}</span>
          </div>
          <h1 className="text-3xl font-bold">{lesson.title}</h1>
        </div>

        {/* Interactive Lesson Player */}
        <InteractiveLessonPlayer
          lesson={lesson}
          onComplete={handleComplete}
          onNext={nextLesson ? handleNext : undefined}
          onPrevious={previousLesson ? handlePrevious : undefined}
        />

        {/* Bottom Navigation */}
        <div className="mt-8 flex items-center justify-between">
          <div>
            {previousLesson ? (
              <Button variant="outline" onClick={handlePrevious}>
                <ChevronLeft className="h-4 w-4 mr-2" />
                Previous: {previousLesson.title}
              </Button>
            ) : (
              <Link href="/courses/react-new">
                <Button variant="outline">
                  <ChevronLeft className="h-4 w-4 mr-2" />
                  Back to Course
                </Button>
              </Link>
            )}
          </div>

          <div>
            {nextLesson ? (
              <Button onClick={handleNext}>
                Next: {nextLesson.title}
                <ChevronRight className="h-4 w-4 ml-2" />
              </Button>
            ) : (
              <Link href={`/courses/react-new/projects/${module.capstoneProject.id}`}>
                <Button>
                  Start Capstone Project
                  <ChevronRight className="h-4 w-4 ml-2" />
                </Button>
              </Link>
            )}
          </div>
        </div>

        {/* Module Progress */}
        <div className="mt-8 p-6 bg-muted rounded-lg">
          <h3 className="font-semibold mb-4">Module Progress</h3>
          <div className="grid grid-cols-10 gap-2">
            {module.lessons.map((l, idx) => {
              const isCompleted = false; // TODO: Check user progress
              const isCurrent = l.id === lessonId;

              return (
                <Link key={l.id} href={`/courses/react-new/lessons/${l.id}`}>
                  <div
                    className={`h-10 flex items-center justify-center rounded border-2 transition-all ${
                      isCurrent
                        ? 'border-primary bg-primary text-primary-foreground'
                        : isCompleted
                          ? 'border-green-500 bg-green-500 text-white'
                          : 'border-muted-foreground/20 hover:border-primary'
                    }`}
                    title={l.title}
                  >
                    {idx + 1}
                  </div>
                </Link>
              );
            })}
          </div>
          <div className="mt-4 text-sm text-muted-foreground">
            <p>
              Click any lesson number to jump to it. Complete all {module.lessons.length} lessons to unlock the
              capstone project!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
