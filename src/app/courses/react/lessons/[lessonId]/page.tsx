'use client';

import { InteractiveLessonPlayer } from '@/components/lessons/InteractiveLessonPlayer';
import { getLessonById } from '@/data/courses/react-unified';
import { useParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function ReactLessonPage() {
  const params = useParams();
  const router = useRouter();
  const lessonId = params.lessonId as string;
  const lesson = getLessonById(lessonId);

  if (!lesson) {
    return (
      <div className="container mx-auto p-8">
        <h1 className="text-2xl font-bold mb-4">Lesson not found</h1>
        <p className="text-muted-foreground mb-4">
          Lesson ID: {lessonId}
        </p>
        <Link href="/courses/react">
          <Button>Back to Course</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-white dark:bg-slate-950">
        <div className="container mx-auto p-4 flex items-center justify-between">
          <div>
            <Link
              href="/courses/react"
              className="text-sm text-muted-foreground hover:text-foreground mb-1 block"
            >
              ← Back to React Course
            </Link>
            <h1 className="text-2xl font-bold">{lesson.title}</h1>
            <p className="text-sm text-muted-foreground">
              {lesson.xpReward} XP • {lesson.difficulty} • {lesson.steps.length} steps
            </p>
          </div>
        </div>
      </div>

      {/* Lesson Player */}
      <InteractiveLessonPlayer
        lesson={lesson}
        onComplete={() => {
          // TODO: Track completion in database
          router.push('/courses/react');
        }}
      />
    </div>
  );
}
