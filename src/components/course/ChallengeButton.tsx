'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { useProgress } from '@/contexts/ProgressContext'
import { Check } from 'lucide-react'
import { ChallengeEditorModal } from '@/components/modals/ChallengeEditorModal'
import { Challenge } from '@/types'

interface TestCase {
  id: string
  description: string
  testFunction: string
  errorMessage?: string
}

interface ChallengeButtonProps {
  challenge: Challenge & {
    instructions?: string
    starterCode?: string
    testCases?: TestCase[]
    language?: 'javascript' | 'typescript' | 'python' | 'sql'
    hints?: string[]
    solution?: string
  }
  isBoss?: boolean
  size?: 'default' | 'sm' | 'lg' | 'icon'
  variant?: 'default' | 'outline' | 'ghost' | 'link' | 'destructive' | 'secondary'
  className?: string
}

export function ChallengeButton({
  challenge,
  isBoss = false,
  size = 'sm',
  variant = 'outline',
  className = '',
}: ChallengeButtonProps) {
  const { completedChallenges, markChallengeComplete } = useProgress()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const isCompleted = completedChallenges.has(challenge.id)

  const handleClick = () => {
    if (!isCompleted) {
      setIsModalOpen(true)
    }
  }

  const handleComplete = async (code: string, xpEarned: number) => {
    // In a real app, you would submit the code to the server for validation
    // For now, we'll just mark the challenge as complete
    await markChallengeComplete(challenge.id, xpEarned)
  }

  return (
    <>
      <Button
        onClick={handleClick}
        disabled={isCompleted}
        size={size}
        variant={isCompleted ? 'default' : variant}
        className={`${isCompleted ? 'bg-green-600 hover:bg-green-600' : ''} ${className}`}
      >
        {isCompleted ? (
          <>
            <Check className="mr-2 h-4 w-4" />
            Completed
          </>
        ) : isBoss ? (
          'Take Challenge'
        ) : (
          'Start'
        )}
      </Button>

      <ChallengeEditorModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        challenge={challenge}
        onComplete={handleComplete}
        isCompleted={isCompleted}
      />
    </>
  )
}
