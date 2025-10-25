'use client'

import { Button } from '@/components/ui/button'
import { useProgress } from '@/contexts/ProgressContext'
import { Check } from 'lucide-react'

interface ChallengeButtonProps {
  challengeId: string
  challengeXP: number
  isBoss?: boolean
  size?: 'default' | 'sm' | 'lg' | 'icon'
  variant?: 'default' | 'outline' | 'ghost' | 'link' | 'destructive' | 'secondary'
  className?: string
}

export function ChallengeButton({
  challengeId,
  challengeXP,
  isBoss = false,
  size = 'sm',
  variant = 'outline',
  className = '',
}: ChallengeButtonProps) {
  const { completedChallenges, markChallengeComplete } = useProgress()
  const isCompleted = completedChallenges.has(challengeId)

  const handleClick = async () => {
    if (!isCompleted) {
      await markChallengeComplete(challengeId, challengeXP)
    }
  }

  return (
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
  )
}
