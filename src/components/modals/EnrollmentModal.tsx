'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { X, CheckCircle2, Clock, Trophy, Star, Users, Zap } from 'lucide-react'

interface EnrollmentModalProps {
  isOpen: boolean
  onClose: () => void
  course: {
    id: string
    title: string
    description: string
    level: string
    duration: number
    totalXP: number
    price: number
    instructorName: string
    rating?: number
    studentCount?: number
  }
  onEnroll: () => Promise<void>
  isEnrolling?: boolean
  error?: string | null
}

export function EnrollmentModal({
  isOpen,
  onClose,
  course,
  onEnroll,
  isEnrolling = false,
  error = null,
}: EnrollmentModalProps) {
  if (!isOpen) return null

  const handleEnroll = async () => {
    await onEnroll()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-background rounded-lg shadow-lg">
        {/* Header */}
        <div className="sticky top-0 bg-background border-b p-6 flex items-start justify-between">
          <div className="flex-1">
            <h2 className="text-3xl font-bold mb-2">Enroll in Course</h2>
            <p className="text-muted-foreground">
              Confirm your enrollment to start learning
            </p>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose} className="shrink-0">
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Course Info Card */}
          <Card className="border-2 border-primary/20">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-2xl mb-2">{course.title}</CardTitle>
                  <CardDescription className="text-base">
                    {course.description}
                  </CardDescription>
                </div>
                <Badge variant="outline" className="shrink-0 ml-4">
                  {course.level}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-yellow-500" />
                  <div>
                    <div className="text-sm text-muted-foreground">Total XP</div>
                    <div className="font-semibold">{course.totalXP.toLocaleString()}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-blue-500" />
                  <div>
                    <div className="text-sm text-muted-foreground">Duration</div>
                    <div className="font-semibold">{course.duration} hours</div>
                  </div>
                </div>
                {course.rating && (
                  <div className="flex items-center gap-2">
                    <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                    <div>
                      <div className="text-sm text-muted-foreground">Rating</div>
                      <div className="font-semibold">{course.rating}</div>
                    </div>
                  </div>
                )}
                {course.studentCount !== undefined && (
                  <div className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-green-500" />
                    <div>
                      <div className="text-sm text-muted-foreground">Students</div>
                      <div className="font-semibold">{course.studentCount.toLocaleString()}</div>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* What You'll Get */}
          <Card>
            <CardHeader>
              <CardTitle>What You&apos;ll Get</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-medium">Full Course Access</div>
                    <div className="text-sm text-muted-foreground">
                      Access all lessons, projects, and challenges
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-medium">Earn XP & Achievements</div>
                    <div className="text-sm text-muted-foreground">
                      Complete challenges to earn {course.totalXP.toLocaleString()} XP and unlock badges
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-medium">Track Your Progress</div>
                    <div className="text-sm text-muted-foreground">
                      Monitor completion and compete on leaderboards
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-medium">Certificate of Completion</div>
                    <div className="text-sm text-muted-foreground">
                      Earn a certificate when you complete the course
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Price */}
          {course.price > 0 && (
            <Card className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950 border-2">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">Course Price</div>
                    <div className="text-3xl font-bold">${course.price}</div>
                  </div>
                  <Zap className="h-12 w-12 text-yellow-500" />
                </div>
              </CardContent>
            </Card>
          )}

          {course.price === 0 && (
            <Card className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950 border-2 border-green-500">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-bold text-green-700 dark:text-green-400">
                      Free Course!
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Enroll now and start learning immediately
                    </div>
                  </div>
                  <CheckCircle2 className="h-12 w-12 text-green-500" />
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
        <div className="sticky bottom-0 bg-background border-t p-6 flex items-center justify-between">
          <Button variant="outline" onClick={onClose} disabled={isEnrolling}>
            Cancel
          </Button>
          <Button
            onClick={handleEnroll}
            disabled={isEnrolling}
            size="lg"
            className="px-8"
          >
            {isEnrolling ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Enrolling...
              </>
            ) : (
              <>
                {course.price > 0 ? `Enroll Now - $${course.price}` : 'Enroll for Free'}
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}
