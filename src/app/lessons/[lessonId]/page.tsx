"use client";

import { InteractiveLessonPlayer } from "@/components/lessons/InteractiveLessonPlayer";
import { reactBasicsLessons } from "@/data/interactive-lessons/react-basics";
import { useInteractiveLessonProgress } from "@/hooks/useInteractiveLessonProgress";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import { useAuthStore } from "@/stores/authStore";

export default function InteractiveLessonPage() {
  const params = useParams<{ lessonId: string }>();

  // Find the lesson by ID
  const lesson = reactBasicsLessons.find((l) => l.id === params.lessonId);

  // Get user from auth context
  const { user } = useAuthStore();
  const userId = user?.id || "";

  const { progress, totalXP, completeStep, completeLesson } =
    useInteractiveLessonProgress(params.lessonId, userId);

  if (!lesson) {
    notFound();
  }

  const handleLessonComplete = (xpEarned: number) => {
    completeLesson(xpEarned);
    // Show success message or redirect
    console.log(
      `Lesson "${lesson.title}" completed! Total XP this session: ${
        totalXP + xpEarned
      }`
    );
  };

  const handleStepComplete = (stepId: string) => {
    completeStep(stepId);
    console.log(`Step ${stepId} completed!`);
  };

  return (
    <div className="container mx-auto py-8 px-4">
      {/* Header */}
      <div className="mb-6">
        <Link href="/lessons">
          <Button variant="ghost" size="sm" className="mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Lessons
          </Button>
        </Link>

        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">{lesson.title}</h1>
            <p className="text-muted-foreground mt-1">
              Interactive coding lesson • {lesson.steps.length} steps
            </p>
          </div>
          {totalXP > 0 && (
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Session XP</p>
              <p className="text-2xl font-bold text-primary">+{totalXP}</p>
            </div>
          )}
        </div>
      </div>

      {/* Lesson Player */}
      <InteractiveLessonPlayer
        lesson={lesson}
        onComplete={handleLessonComplete}
        onStepComplete={handleStepComplete}
      />

      {/* Progress Summary */}
      <div className="mt-8 text-center text-sm text-muted-foreground">
        <p>
          Progress: {progress.completedSteps.length} / {lesson.steps.length}{" "}
          steps completed
        </p>
      </div>
    </div>
  );
}
