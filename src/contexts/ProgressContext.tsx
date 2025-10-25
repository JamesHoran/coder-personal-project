'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'

interface ProgressContextType {
  completedProjects: Set<string>
  completedChallenges: Set<string>
  completedLessons: Set<string>
  userXP: number
  userLevel: number
  markProjectComplete: (projectId: string, xp: number) => Promise<void>
  markChallengeComplete: (challengeId: string, xp: number) => Promise<void>
  loadProgress: (courseId: string) => Promise<void>
  isLoading: boolean
}

const ProgressContext = createContext<ProgressContextType | undefined>(undefined)

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [completedProjects, setCompletedProjects] = useState<Set<string>>(new Set())
  const [completedChallenges, setCompletedChallenges] = useState<Set<string>>(new Set())
  const [completedLessons, setCompletedLessons] = useState<Set<string>>(new Set())
  const [userXP, setUserXP] = useState(0)
  const [userLevel, setUserLevel] = useState(1)
  const [isLoading, setIsLoading] = useState(true)

  // Hardcoded user ID for now - in production, get from auth
  const userId = 'e944cde4-af3a-4133-833c-fdbc3846af81'

  const loadProgress = async (courseId: string) => {
    setIsLoading(true)
    try {
      const response = await fetch(`/api/progress/course/${courseId}?userId=${userId}`)
      const data = await response.json()

      if (data.success) {
        setCompletedProjects(new Set(data.data.completedProjects))
        setCompletedChallenges(new Set(data.data.completedChallenges))
        setCompletedLessons(new Set(data.data.completedLessons))
        setUserXP(data.data.user.totalXP)
        setUserLevel(data.data.user.level)
      }
    } catch (error) {
      console.error('Error loading progress:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const markProjectComplete = async (projectId: string, xp: number) => {
    try {
      const response = await fetch('/api/projects/complete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, projectId, xp }),
      })

      const data = await response.json()

      if (data.success) {
        setCompletedProjects(prev => new Set(prev).add(projectId))
        setUserXP(data.data.totalXP)
        setUserLevel(data.data.newLevel)
      }
    } catch (error) {
      console.error('Error marking project complete:', error)
    }
  }

  const markChallengeComplete = async (challengeId: string, xp: number) => {
    try {
      const response = await fetch('/api/challenges/complete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, challengeId, xp }),
      })

      const data = await response.json()

      if (data.success && !data.data.alreadyCompleted) {
        setCompletedChallenges(prev => new Set(prev).add(challengeId))
        setUserXP(data.data.totalXP)
        setUserLevel(data.data.newLevel)
      }
    } catch (error) {
      console.error('Error marking challenge complete:', error)
    }
  }

  return (
    <ProgressContext.Provider
      value={{
        completedProjects,
        completedChallenges,
        completedLessons,
        userXP,
        userLevel,
        markProjectComplete,
        markChallengeComplete,
        loadProgress,
        isLoading,
      }}
    >
      {children}
    </ProgressContext.Provider>
  )
}

export function useProgress() {
  const context = useContext(ProgressContext)
  if (context === undefined) {
    throw new Error('useProgress must be used within a ProgressProvider')
  }
  return context
}
