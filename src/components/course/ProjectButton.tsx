'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { useProgress } from '@/contexts/ProgressContext'
import { Check } from 'lucide-react'
import { ProjectModal } from '@/components/modals/ProjectModal'
import { Project } from '@/types'

interface ProjectButtonProps {
  project: Project & {
    instructions?: string
    deliverables?: string[]
    resources?: { title: string; url: string }[]
    estimatedTime?: string
  }
}

export function ProjectButton({ project }: ProjectButtonProps) {
  const { completedProjects, markProjectComplete } = useProgress()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const isCompleted = completedProjects.has(project.id)

  const handleClick = () => {
    if (!isCompleted) {
      setIsModalOpen(true)
    }
  }

  const handleSubmit = async (deliverables: Record<string, string>) => {
    // In a real app, you would validate and store the deliverables
    // For now, we'll just mark the project as complete
    await markProjectComplete(project.id, project.xp)
  }

  return (
    <>
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

      <ProjectModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        project={project}
        onSubmit={handleSubmit}
        isCompleted={isCompleted}
      />
    </>
  )
}
