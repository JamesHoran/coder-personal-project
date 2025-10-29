'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { X, CheckCircle2, Clock, Award, FileText, Link as LinkIcon } from 'lucide-react'
import { Project } from '@/types'

interface ProjectModalProps {
  isOpen: boolean
  onClose: () => void
  project: Project & {
    instructions?: string
    deliverables?: string[]
    resources?: { title: string; url: string }[]
    estimatedTime?: string
  }
  onSubmit: (deliverables: Record<string, string>) => Promise<void>
  isCompleted?: boolean
}

export function ProjectModal({
  isOpen,
  onClose,
  project,
  onSubmit,
  isCompleted = false
}: ProjectModalProps) {
  const [deliverableInputs, setDeliverableInputs] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  if (!isOpen) return null

  const handleSubmit = async () => {
    setIsSubmitting(true)
    setError(null)

    try {
      // Validate that all deliverables are filled
      const requiredDeliverables = project.deliverables || project.successCriteria || []
      const missingDeliverables = requiredDeliverables.filter(
        (_, index) => !deliverableInputs[index]?.trim()
      )

      if (missingDeliverables.length > 0) {
        setError('Please complete all deliverables before submitting')
        setIsSubmitting(false)
        return
      }

      await onSubmit(deliverableInputs)
      onClose()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to submit project')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-background rounded-lg shadow-lg">
        {/* Header */}
        <div className="sticky top-0 bg-background border-b p-6 flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h2 className="text-3xl font-bold">{project.name}</h2>
              {isCompleted && (
                <Badge className="bg-green-600">
                  <CheckCircle2 className="h-3 w-3 mr-1" />
                  Completed
                </Badge>
              )}
            </div>
            <p className="text-muted-foreground">{project.description}</p>
            <div className="flex items-center gap-4 mt-3">
              <div className="flex items-center gap-2">
                <Award className="h-4 w-4 text-yellow-500" />
                <span className="font-semibold">{project.xp} XP</span>
              </div>
              {(project.estimatedTime || project.timeEstimate) && (
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-blue-500" />
                  <span>{project.estimatedTime || project.timeEstimate}</span>
                </div>
              )}
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="shrink-0"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Instructions */}
          {project.instructions && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Project Instructions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose dark:prose-invert max-w-none">
                  {project.instructions.split('\n').map((line, i) => (
                    <p key={i}>{line}</p>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Success Criteria / Deliverables */}
          <Card>
            <CardHeader>
              <CardTitle>Success Criteria & Deliverables</CardTitle>
              <CardDescription>
                Complete all requirements below to finish this project
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {(project.deliverables || project.successCriteria || []).map((deliverable, index) => (
                <div key={index} className="space-y-2">
                  <label className="text-sm font-medium flex items-start gap-2">
                    <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-xs shrink-0 mt-0.5">
                      {index + 1}
                    </span>
                    <span>{deliverable}</span>
                  </label>
                  <textarea
                    value={deliverableInputs[index] || ''}
                    onChange={(e) => setDeliverableInputs({
                      ...deliverableInputs,
                      [index]: e.target.value
                    })}
                    placeholder="Describe how you completed this requirement or provide a link to your work..."
                    className="w-full min-h-[80px] p-3 border rounded-md bg-background resize-y"
                    disabled={isCompleted}
                  />
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Resources */}
          {project.resources && project.resources.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <LinkIcon className="h-5 w-5" />
                  Helpful Resources
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {project.resources.map((resource, index) => (
                    <a
                      key={index}
                      href={resource.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block p-3 rounded-md border hover:bg-accent transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <LinkIcon className="h-4 w-4" />
                        <span className="font-medium">{resource.title}</span>
                      </div>
                    </a>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Error Message */}
          {error && (
            <div className="p-4 bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 rounded-md">
              <p className="text-red-600 dark:text-red-400">{error}</p>
            </div>
          )}
        </div>

        {/* Footer */}
        {!isCompleted && (
          <div className="sticky bottom-0 bg-background border-t p-6 flex items-center justify-between">
            <Button
              variant="outline"
              onClick={onClose}
            >
              Save for Later
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={isSubmitting}
              size="lg"
              className="px-8"
            >
              {isSubmitting ? 'Submitting...' : `Submit Project & Earn ${project.xp} XP`}
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
