'use client'

import { Button } from '@/components/ui/button'
import { useProgress } from '@/contexts/ProgressContext'
import { Check } from 'lucide-react'

interface ProjectButtonProps {
  projectId: string
  projectXP: number
}

export function ProjectButton({ projectId, projectXP }: ProjectButtonProps) {
  const { completedProjects, markProjectComplete } = useProgress()
  const isCompleted = completedProjects.has(projectId)

  const handleClick = async () => {
    if (!isCompleted) {
      await markProjectComplete(projectId, projectXP)
    }
  }

  return (
    <Button
      onClick={handleClick}
      disabled={isCompleted}
      className={isCompleted ? 'bg-green-600 hover:bg-green-600' : ''}
    >
      {isCompleted ? (
        <>
          <Check className="mr-2 h-4 w-4" />
          Completed
        </>
      ) : (
        'Start Project'
      )}
    </Button>
  )
}
