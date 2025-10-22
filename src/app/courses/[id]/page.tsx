'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
  BookOpen,
  Clock,
  Award,
  Users,
  Star,
  Trophy,
  Target,
  Zap,
  CheckCircle2,
  Play,
} from 'lucide-react'

interface Lesson {
  id: string
  title: string
  duration: number
  xpReward: number
  type: string
  order: number
}

interface Project {
  id: string
  title: string
  xpReward: number
  order: number
}

interface Challenge {
  id: string
  title: string
  type: string
  xpReward: number
  difficulty: string
  order: number
}

interface Module {
  id: string
  title: string
  quest: string
  description: string
  order: number
  totalXP: number
  lessons: Lesson[]
  projects: Project[]
  challenges: Challenge[]
}

interface Phase {
  id: string
  title: string
  description: string
  level: string
  duration: string
  totalXP: number
  order: number
  modules: Module[]
}

interface Course {
  id: string
  title: string
  description: string
  level: string
  category: string
  thumbnail: string
  duration: number
  totalXP: number
  instructorName: string
  rating: number
  studentCount: number
  phases: Phase[]
}

export default function CourseDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [course, setCourse] = useState<Course | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedPhase, setSelectedPhase] = useState<number>(0)

  useEffect(() => {
    fetchCourse()
  }, [params.id])

  const fetchCourse = async () => {
    try {
      const response = await fetch(`/api/courses/${params.id}`)
      const data = await response.json()
      if (data.success) {
        setCourse(data.data)
      }
    } catch (error) {
      console.error('Error fetching course:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleEnroll = async () => {
    // For now, just navigate to first lesson
    // In production, create enrollment first
    if (course && course.phases.length > 0) {
      const firstModule = course.phases[0].modules[0]
      const firstLesson = firstModule?.lessons[0]
      if (firstLesson) {
        router.push(`/courses/${course.id}/learn?lesson=${firstLesson.id}`)
      }
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading course...</p>
        </div>
      </div>
    )
  }

  if (!course) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Course not found</h2>
          <Button onClick={() => router.push('/courses')}>Back to Courses</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="inline-block bg-white/20 px-3 py-1 rounded-full text-sm mb-4">
                {course.category} • {course.level}
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">{course.title}</h1>
              <p className="text-xl text-blue-100 mb-6">{course.description}</p>

              <div className="flex flex-wrap gap-6 mb-6">
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-yellow-300 fill-yellow-300" />
                  <span className="font-semibold">{course.rating}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  <span>{course.studentCount.toLocaleString()} students</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  <span>{course.duration} hours</span>
                </div>
                <div className="flex items-center gap-2">
                  <Trophy className="w-5 h-5" />
                  <span>{course.totalXP.toLocaleString()} XP</span>
                </div>
              </div>

              <Button onClick={handleEnroll} size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                <Play className="w-5 h-5 mr-2" />
                Start Learning
              </Button>
            </div>

            <div className="lg:col-span-1">
              <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                <CardHeader>
                  <CardTitle className="text-white">Gamification Features</CardTitle>
                </CardHeader>
                <CardContent className="text-white">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Zap className="w-5 h-5 text-yellow-300" />
                      <span>Earn {course.totalXP.toLocaleString()} XP</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Award className="w-5 h-5 text-purple-300" />
                      <span>Unlock achievements</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Trophy className="w-5 h-5 text-yellow-300" />
                      <span>Compete on leaderboard</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Target className="w-5 h-5 text-green-300" />
                      <span>Complete challenges</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Course Content */}
      <div className="container mx-auto px-4 max-w-6xl py-12">
        {/* Phase Tabs */}
        <div className="flex gap-4 mb-8 overflow-x-auto pb-2">
          {course.phases.map((phase, index) => (
            <button
              key={phase.id}
              onClick={() => setSelectedPhase(index)}
              className={`px-6 py-3 rounded-lg font-semibold whitespace-nowrap transition-all ${
                selectedPhase === index
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              {phase.title}
            </button>
          ))}
        </div>

        {/* Selected Phase Content */}
        {course.phases[selectedPhase] && (
          <div>
            <Card className="mb-6">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-2xl">{course.phases[selectedPhase].title}</CardTitle>
                    <CardDescription className="text-lg mt-2">
                      {course.phases[selectedPhase].description}
                    </CardDescription>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-600">Level</div>
                    <div className="font-bold text-blue-600">{course.phases[selectedPhase].level}</div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex gap-6 text-sm">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-gray-500" />
                    <span>{course.phases[selectedPhase].duration}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Trophy className="w-4 h-4 text-gray-500" />
                    <span>{course.phases[selectedPhase].totalXP} XP</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-gray-500" />
                    <span>{course.phases[selectedPhase].modules.length} modules</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Modules */}
            <div className="space-y-6">
              {course.phases[selectedPhase].modules.map((module, moduleIndex) => (
                <Card key={module.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="text-sm font-semibold text-blue-600 mb-1">
                          Module {selectedPhase + 1}.{moduleIndex + 1}
                        </div>
                        <CardTitle className="text-xl">{module.title}</CardTitle>
                        <div className="text-purple-600 font-medium mt-1">Quest: {module.quest}</div>
                        <CardDescription className="mt-2">{module.description}</CardDescription>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-yellow-600">{module.totalXP}</div>
                        <div className="text-xs text-gray-600">XP</div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {/* Lessons */}
                    {module.lessons.length > 0 && (
                      <div className="mb-4">
                        <h4 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
                          <BookOpen className="w-4 h-4" />
                          Lessons ({module.lessons.length})
                        </h4>
                        <div className="space-y-2">
                          {module.lessons.map((lesson) => (
                            <div
                              key={lesson.id}
                              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                              onClick={() => router.push(`/courses/${course.id}/learn?lesson=${lesson.id}`)}
                            >
                              <div className="flex items-center gap-3">
                                <CheckCircle2 className="w-5 h-5 text-gray-400" />
                                <span className="font-medium">{lesson.title}</span>
                              </div>
                              <div className="flex items-center gap-4 text-sm text-gray-600">
                                <div className="flex items-center gap-1">
                                  <Clock className="w-4 h-4" />
                                  <span>{lesson.duration}min</span>
                                </div>
                                <div className="flex items-center gap-1 text-yellow-600">
                                  <Trophy className="w-4 h-4" />
                                  <span>+{lesson.xpReward}</span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Projects */}
                    {module.projects.length > 0 && (
                      <div className="mb-4">
                        <h4 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
                          <Target className="w-4 h-4" />
                          Projects ({module.projects.length})
                        </h4>
                        <div className="space-y-2">
                          {module.projects.map((project) => (
                            <div
                              key={project.id}
                              className="flex items-center justify-between p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
                            >
                              <span className="font-medium text-blue-900">{project.title}</span>
                              <div className="flex items-center gap-1 text-blue-600 font-semibold">
                                <Trophy className="w-4 h-4" />
                                <span>+{project.xpReward}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Challenges */}
                    {module.challenges.length > 0 && (
                      <div>
                        <h4 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
                          <Zap className="w-4 h-4" />
                          Challenges ({module.challenges.length})
                        </h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {module.challenges.map((challenge) => (
                            <div
                              key={challenge.id}
                              className={`p-3 rounded-lg border-2 ${
                                challenge.difficulty === 'green'
                                  ? 'border-green-300 bg-green-50'
                                  : challenge.difficulty === 'yellow'
                                    ? 'border-yellow-300 bg-yellow-50'
                                    : challenge.difficulty === 'red'
                                      ? 'border-red-300 bg-red-50'
                                      : 'border-purple-300 bg-purple-50'
                              }`}
                            >
                              <div className="flex items-center justify-between">
                                <div className="flex-1">
                                  <span className="text-xs font-semibold uppercase text-gray-600">
                                    {challenge.type}
                                  </span>
                                  <div className="font-medium text-sm">{challenge.title}</div>
                                </div>
                                <div className="text-sm font-semibold">+{challenge.xpReward}</div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
