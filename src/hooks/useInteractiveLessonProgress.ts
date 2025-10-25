import { useState, useCallback } from "react";
import { InteractiveLessonProgress } from "@/types";

/**
 * Hook to manage interactive lesson progress and integrate with gamification
 */
export function useInteractiveLessonProgress(
  lessonId: string,
  userId: string
) {
  const [progress, setProgress] = useState<InteractiveLessonProgress>({
    userId,
    lessonId,
    currentStepIndex: 0,
    completedSteps: [],
    code: {},
    completed: false,
    xpEarned: 0,
    startedAt: new Date().toISOString(),
  });

  const [totalXP, setTotalXP] = useState(0);

  const completeStep = useCallback(
    (stepId: string) => {
      setProgress((prev) => {
        if (prev.completedSteps.includes(stepId)) {
          return prev;
        }
        return {
          ...prev,
          completedSteps: [...prev.completedSteps, stepId],
        };
      });
    },
    []
  );

  const completeLesson = useCallback(
    (xpReward: number) => {
      setProgress((prev) => ({
        ...prev,
        completed: true,
        xpEarned: xpReward,
        completedAt: new Date().toISOString(),
      }));

      setTotalXP((prev) => prev + xpReward);

      // In a real app, you would call an API here to:
      // 1. Update user's total XP in database
      // 2. Check for level ups
      // 3. Check for badge/achievement unlocks
      // 4. Update leaderboard
      console.log(`Lesson completed! +${xpReward} XP earned`);

      // Trigger notification (if notification system is available)
      if (typeof window !== "undefined") {
        // Show a browser notification or custom toast
        showXPNotification(xpReward);
      }
    },
    []
  );

  const saveCode = useCallback((stepId: string, code: string) => {
    setProgress((prev) => ({
      ...prev,
      code: {
        ...prev.code,
        [stepId]: code,
      },
    }));
  }, []);

  const updateCurrentStep = useCallback((stepIndex: number) => {
    setProgress((prev) => ({
      ...prev,
      currentStepIndex: stepIndex,
    }));
  }, []);

  return {
    progress,
    totalXP,
    completeStep,
    completeLesson,
    saveCode,
    updateCurrentStep,
  };
}

/**
 * Show XP gain notification
 */
function showXPNotification(xp: number) {
  // This would integrate with your existing notification system
  // For now, we'll just log it
  console.log(`🎉 +${xp} XP!`);

  // You could also dispatch a custom event that your NotificationSystem listens to
  const event = new CustomEvent("xp-earned", {
    detail: { xp, message: `You earned ${xp} XP!` },
  });
  window.dispatchEvent(event);
}
