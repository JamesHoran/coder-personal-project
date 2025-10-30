'use client';

import { useState } from 'react';
import { InteractiveLessonPlayer } from '@/components/lessons/InteractiveLessonPlayer';
import { allReactLessons, getLessonById } from '@/data/courses/react-course-interactive';

export default function ReactLessonTestPage() {
  const [selectedLessonId, setSelectedLessonId] = useState('react-basics-01');
  const lesson = getLessonById(selectedLessonId);

  if (!lesson) {
    return (
      <div className="container mx-auto p-8">
        <h1 className="text-2xl font-bold mb-4">Lesson not found</h1>
        <p>Lesson ID: {selectedLessonId}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-white dark:bg-slate-950">
        <div className="container mx-auto p-4">
          <h1 className="text-2xl font-bold mb-4">React Course - Lesson Tester</h1>

          {/* Lesson Selector */}
          <div className="flex flex-col gap-4">
            <div className="flex gap-4 items-center">
              <label className="font-medium">Select Lesson:</label>
              <select
                value={selectedLessonId}
                onChange={(e) => setSelectedLessonId(e.target.value)}
                className="border rounded px-4 py-2 min-w-[300px]"
              >
                <optgroup label="Phase 1: Novice Foundations">
                  <optgroup label="Module 1.1: React Fundamentals">
                    {allReactLessons
                      .filter((l: { moduleId: string }) => l.moduleId === 'module-1-1')
                      .map((l: { id: string; title: string; xpReward: number }) => (
                        <option key={l.id} value={l.id}>
                          {l.title} ({l.xpReward} XP)
                        </option>
                      ))}
                  </optgroup>
                  <optgroup label="Module 1.2: State Basics">
                    {allReactLessons
                      .filter((l: { moduleId: string }) => l.moduleId === 'module-1-2')
                      .map((l: { id: string; title: string; xpReward: number }) => (
                        <option key={l.id} value={l.id}>
                          {l.title} ({l.xpReward} XP)
                        </option>
                      ))}
                  </optgroup>
                  <optgroup label="Module 1.3: Event Handling">
                    {allReactLessons
                      .filter((l: { moduleId: string }) => l.moduleId === 'module-1-3')
                      .map((l: { id: string; title: string; xpReward: number }) => (
                        <option key={l.id} value={l.id}>
                          {l.title} ({l.xpReward} XP)
                        </option>
                      ))}
                  </optgroup>
                  <optgroup label="Module 1.4: Conditional Rendering">
                    {allReactLessons
                      .filter((l: { moduleId: string }) => l.moduleId === 'module-1-4')
                      .map((l: { id: string; title: string; xpReward: number }) => (
                        <option key={l.id} value={l.id}>
                          {l.title} ({l.xpReward} XP)
                        </option>
                      ))}
                  </optgroup>
                  <optgroup label="Module 1.5: Lists and Keys">
                    {allReactLessons
                      .filter((l: { moduleId: string }) => l.moduleId === 'module-1-5')
                      .map((l: { id: string; title: string; xpReward: number }) => (
                        <option key={l.id} value={l.id}>
                          {l.title} ({l.xpReward} XP)
                        </option>
                      ))}
                  </optgroup>
                </optgroup>
                <optgroup label="Phase 2: Practitioner Skills">
                  <optgroup label="Module 2.1: Advanced Hooks">
                    {allReactLessons
                      .filter((l: { moduleId: string }) => l.moduleId === 'module-2-1')
                      .slice(0, 5)
                      .map((l: { id: string; title: string; xpReward: number }) => (
                        <option key={l.id} value={l.id}>
                          {l.title} ({l.xpReward} XP)
                        </option>
                      ))}
                  </optgroup>
                </optgroup>
              </select>
            </div>

            <div className="text-sm text-muted-foreground">
              <p><strong>Lesson ID:</strong> {lesson.id}</p>
              <p><strong>Module:</strong> {lesson.moduleId}</p>
              <p><strong>Difficulty:</strong> {lesson.difficulty}</p>
              <p><strong>XP Reward:</strong> {lesson.xpReward}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Lesson Player */}
      <div className="container mx-auto p-6">
        <InteractiveLessonPlayer
          lesson={lesson}
          onComplete={(xpEarned) => {
            alert(`🎉 Lesson Complete! You earned ${xpEarned} XP!`);
            console.log('Lesson completed:', lesson.id, 'XP:', xpEarned);
          }}
          onStepComplete={(stepId) => {
            console.log('Step completed:', stepId);
          }}
        />
      </div>
    </div>
  );
}
