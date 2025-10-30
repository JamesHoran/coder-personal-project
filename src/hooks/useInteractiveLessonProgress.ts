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
    async (xpReward: number) => {
      setProgress((prev) => ({
        ...prev,
        completed: true,
        xpEarned: xpReward,
        completedAt: new Date().toISOString(),
      }));

      setTotalXP((prev) => prev + xpReward);

      // Call API to persist lesson completion
      try {
        const response = await fetch('/api/lessons/complete', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            userId,
            lessonId,
            xp: xpReward,
          }),
        });

        const data = await response.json();

        if (data.success) {
          console.log(`Lesson completed! +${xpReward} XP earned`);

          // Update total XP with actual value from server
          setTotalXP(data.data.totalXP);

          // Show level up notification if applicable
          if (data.data.leveledUp) {
            showLevelUpNotification(data.data.newLevel);
          }

          // Show achievement notifications
          if (data.data.achievements && data.data.achievements.length > 0) {
            data.data.achievements.forEach((achievement: any) => {
              showAchievementNotification(achievement);
            });
          }
        } else {
          console.error('Failed to save lesson progress:', data.error);
        }
      } catch (error) {
        console.error('Error completing lesson:', error);
      }

      // Trigger notification (if notification system is available)
      if (typeof window !== "undefined") {
        // Show a browser notification or custom toast
        showXPNotification(xpReward);
      }
    },
    [userId, lessonId]
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

/**
 * Show level up notification
 */
function showLevelUpNotification(level: number) {
  console.log(`🎊 Level Up! You are now level ${level}!`);

  const event = new CustomEvent("level-up", {
    detail: { level, message: `Level Up! You are now level ${level}!` },
  });
  window.dispatchEvent(event);
}

/**
 * Show achievement unlock notification
 */
function showAchievementNotification(achievement: { name: string; description: string }) {
  console.log(`🏆 Achievement Unlocked: ${achievement.name}`);

  const event = new CustomEvent("achievement-unlocked", {
    detail: { achievement, message: `Achievement Unlocked: ${achievement.name}` },
  });
  window.dispatchEvent(event);
}
