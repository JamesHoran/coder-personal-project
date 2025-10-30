"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { gitCourse, gitCourseBadges } from "@/data/gitCourse";
import { Trophy, Star, Clock, Zap, Target, BookOpen, Award, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";
import { ProjectButton } from "@/components/course/ProjectButton";
import { ChallengeButton } from "@/components/course/ChallengeButton";
import { useEnrollment } from "@/hooks/useEnrollment";
import { EnrollmentModal } from "@/components/modals/EnrollmentModal";
import { useAuthStore } from "@/stores/authStore";
import { useRouter } from "next/navigation";

// This is the database course ID for the Git course (from seed data)
const GIT_COURSE_DB_ID = "a4663271-37d8-4ee9-8e82-6b195c87ccaa";

export default function GitCoursePage() {
  const [selectedPhase, setSelectedPhase] = useState(gitCourse.phases[0].id);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [showEnrollModal, setShowEnrollModal] = useState(false);
  const { enroll, checkEnrollment, isEnrolling, error: enrollmentError } = useEnrollment();
  const { isAuthenticated } = useAuthStore();
  const router = useRouter();

  const currentPhase = gitCourse.phases.find(p => p.id === selectedPhase);

  useEffect(() => {
    if (isAuthenticated) {
      checkEnrollmentStatus();
    }
  }, [isAuthenticated]);

  const checkEnrollmentStatus = async () => {
    const enrolled = await checkEnrollment(GIT_COURSE_DB_ID);
    setIsEnrolled(enrolled);
  };

  const handleEnrollClick = () => {
    if (!isAuthenticated) {
      router.push('/auth/login');
      return;
    }
    setShowEnrollModal(true);
  };

  const handleEnroll = async () => {
    const result = await enroll(GIT_COURSE_DB_ID);

    if (result.success) {
      setShowEnrollModal(false);
      setIsEnrolled(true);
      // Optionally navigate to course learning page
      router.push(`/courses/${GIT_COURSE_DB_ID}/learn`);
    }
  };

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="mb-12">
          <div className="flex items-start justify-between mb-6">
            <div className="flex-1">
              <h1 className="text-5xl font-bold mb-4">{gitCourse.title}</h1>
              <p className="text-xl text-muted-foreground mb-6">
                {gitCourse.description}
              </p>

              <div className="flex flex-wrap gap-4 mb-6">
                <div className="flex items-center gap-2">
                  <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold">{gitCourse.rating}</span>
                  <span className="text-muted-foreground">({gitCourse.enrollmentCount.toLocaleString()} students)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  <span>{Math.floor(gitCourse.duration / 60)}h total</span>
                </div>
                <div className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-yellow-500" />
                  <span className="font-semibold">{gitCourse.totalXP.toLocaleString()} Total XP</span>
                </div>
              </div>

              <div className="flex gap-4">
                {isEnrolled ? (
                  <Button
                    size="lg"
                    className="text-lg px-8"
                    onClick={() => router.push(`/courses/${GIT_COURSE_DB_ID}/learn`)}
                  >
                    Continue Learning
                  </Button>
                ) : (
                  <Button
                    size="lg"
                    className="text-lg px-8"
                    onClick={handleEnrollClick}
                  >
                    Enroll Now{gitCourse.price > 0 ? ` - $${gitCourse.price}` : ' - Free'}
                  </Button>
                )}
              </div>
            </div>

            <Card className="w-80 ml-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-yellow-500" />
                  Course Stats
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Phases:</span>
                  <span className="font-semibold">{gitCourse.phases.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Modules:</span>
                  <span className="font-semibold">
                    {gitCourse.phases.reduce((acc, p) => acc + p.modules.length, 0)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Projects:</span>
                  <span className="font-semibold">
                    {gitCourse.phases.reduce((acc, p) =>
                      acc + p.modules.reduce((m, mod) => m + mod.projects.length, 0), 0)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Challenges:</span>
                  <span className="font-semibold">
                    {gitCourse.phases.reduce((acc, p) =>
                      acc + p.modules.reduce((m, mod) => m + mod.challenges.length, 0), 0)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Badges:</span>
                  <span className="font-semibold">{gitCourseBadges.length}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Level System Overview */}
        <Card className="mb-8 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950 border-2">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-2">
              <Award className="h-6 w-6 text-purple-600" />
              Level Progression System
            </CardTitle>
            <CardDescription>
              Earn XP through challenges and projects to level up from Version Control Novice to Git Guru
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-6 gap-4">
              {[
                { levels: "1-3", title: "Version Control Novice", xp: "0-300" },
                { levels: "4-6", title: "Git Apprentice", xp: "301-800" },
                { levels: "7-10", title: "Team Collaborator", xp: "801-1,800" },
                { levels: "11-15", title: "Merge Master", xp: "1,801-3,500" },
                { levels: "16-20", title: "Git Expert", xp: "3,501-6,000" },
                { levels: "21+", title: "Git Guru", xp: "6,001+" },
              ].map((tier, idx) => (
                <div key={idx} className="text-center p-3 bg-white dark:bg-gray-800 rounded-lg border">
                  <div className="text-xs font-semibold text-muted-foreground mb-1">
                    Lv. {tier.levels}
                  </div>
                  <div className="font-bold text-sm mb-1">{tier.title}</div>
                  <div className="text-xs text-muted-foreground">{tier.xp} XP</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Phase Tabs */}
        <div className="mb-6">
          <div className="flex gap-2 border-b">
            {gitCourse.phases.map((phase) => (
              <button
                key={phase.id}
                onClick={() => setSelectedPhase(phase.id)}
                className={`px-6 py-3 font-semibold transition-colors ${
                  selectedPhase === phase.id
                    ? "border-b-2 border-primary text-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Phase {phase.number}: {phase.title}
              </button>
            ))}
          </div>
        </div>

        {/* Current Phase Content */}
        {currentPhase && (
          <div className="mb-12">
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="text-3xl">
                  Phase {currentPhase.number}: {currentPhase.title}
                </CardTitle>
                <CardDescription className="text-lg">
                  Level: {currentPhase.level} • Duration: {currentPhase.duration}
                </CardDescription>
              </CardHeader>
            </Card>

            {/* Modules */}
            <div className="space-y-6">
              {currentPhase.modules.map((module) => (
                <Card key={module.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <Badge variant="outline" className="text-sm">
                            Module {module.number}
                          </Badge>
                          <Badge variant="secondary" className="text-sm">
                            Quest: {module.questName}
                          </Badge>
                        </div>
                        <CardTitle className="text-2xl mb-2">{module.title}</CardTitle>
                        <CardDescription className="text-base">
                          {module.description}
                        </CardDescription>
                      </div>

                      <div className="ml-6 text-right">
                        <div className="text-3xl font-bold text-primary">
                          {module.projects.reduce((acc, p) => acc + p.xp, 0) +
                           module.challenges.reduce((acc, c) => acc + c.xp, 0)} XP
                        </div>
                        <div className="text-sm text-muted-foreground">Total Available</div>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent>
                    {/* Learning Objectives */}
                    <div className="mb-6">
                      <h4 className="font-semibold mb-3 flex items-center gap-2">
                        <Target className="h-4 w-4" />
                        Learning Objectives
                      </h4>
                      <ul className="grid grid-cols-2 gap-2">
                        {module.learningObjectives.map((obj, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm">
                            <ChevronRight className="h-4 w-4 mt-0.5 text-primary flex-shrink-0" />
                            <span>{obj}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Projects */}
                    <div className="mb-6">
                      <h4 className="font-semibold mb-3 flex items-center gap-2">
                        <BookOpen className="h-4 w-4" />
                        Hands-On Projects ({module.projects.length})
                      </h4>
                      <div className="space-y-3">
                        {module.projects.map((project) => (
                          <div
                            key={project.id}
                            className="border rounded-lg p-4 bg-muted/30 hover:bg-muted/50 transition-colors"
                          >
                            <div className="flex items-start justify-between mb-2">
                              <h5 className="font-semibold">{project.name}</h5>
                              <Badge className="bg-green-500">+{project.xp} XP</Badge>
                            </div>
                            <p className="text-sm text-muted-foreground mb-3">
                              {project.description}
                            </p>
                            <div className="flex items-center justify-between">
                              <div className="text-xs text-muted-foreground">
                                <Clock className="h-3 w-3 inline mr-1" />
                                {project.timeEstimate}
                              </div>
                              <ProjectButton project={{
                                ...project,
                                instructions: `Complete the ${project.name} project by following these steps:\n\n${project.successCriteria.map((c, i) => `${i + 1}. ${c}`).join('\n')}`,
                                deliverables: project.successCriteria,
                                estimatedTime: project.timeEstimate,
                              }} />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Challenges */}
                    <div>
                      <h4 className="font-semibold mb-3 flex items-center gap-2">
                        <Zap className="h-4 w-4 text-yellow-500" />
                        Challenges ({module.challenges.length})
                      </h4>
                      <div className="grid grid-cols-2 gap-3">
                        {module.challenges.map((challenge) => (
                          <div
                            key={challenge.id}
                            className={`border rounded-lg p-3 ${
                              challenge.type === "boss"
                                ? "border-2 border-purple-500 bg-purple-50 dark:bg-purple-950"
                                : "bg-muted/20"
                            }`}
                          >
                            <div className="flex items-start justify-between mb-2">
                              <div className="flex items-center gap-2">
                                <h5 className="font-semibold text-sm">{challenge.name}</h5>
                                {challenge.type === "boss" && (
                                  <Trophy className="h-4 w-4 text-purple-600" />
                                )}
                              </div>
                              <Badge variant="outline" className="text-xs">
                                +{challenge.xp} XP
                              </Badge>
                            </div>
                            <p className="text-xs text-muted-foreground mb-2">
                              {challenge.description}
                            </p>
                            <div className="flex items-center justify-between">
                              <Badge
                                variant="secondary"
                                className="text-xs"
                              >
                                {challenge.difficulty}
                              </Badge>
                              <ChallengeButton
                                challenge={{
                                  ...challenge,
                                  instructions: `${challenge.description}\n\nComplete this challenge to earn ${challenge.xp} XP.`,
                                  starterCode: `// ${challenge.name}\n// ${challenge.description}\n\n// Write your code here\n`,
                                  testCases: [
                                    {
                                      id: `${challenge.id}-test-1`,
                                      description: 'Basic functionality test',
                                      testFunction: '() => true', // Placeholder - would be actual tests
                                    }
                                  ],
                                  language: 'javascript',
                                  hints: [`This is a ${challenge.difficulty} challenge.`, 'Try to complete it to earn XP!'],
                                }}
                                isBoss={challenge.type === 'boss'}
                                size="sm"
                                variant="ghost"
                                className="h-7 text-xs"
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Commands Mastered */}
                    {module.commandsMastered && (
                      <div className="mt-6 pt-6 border-t">
                        <h4 className="font-semibold mb-3 text-sm">Commands Mastered</h4>
                        <div className="flex flex-wrap gap-2">
                          {module.commandsMastered.map((cmd, idx) => (
                            <code
                              key={idx}
                              className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-xs font-mono"
                            >
                              {cmd}
                            </code>
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

        {/* Badge Showcase */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-2">
              <Award className="h-6 w-6 text-yellow-500" />
              Achievement Badges
            </CardTitle>
            <CardDescription>
              Earn these badges by completing specific milestones throughout the course
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-4 gap-4">
              {Object.entries(
                gitCourseBadges.reduce((acc, badge) => {
                  if (!acc[badge.category]) acc[badge.category] = [];
                  acc[badge.category].push(badge);
                  return acc;
                }, {} as Record<string, typeof gitCourseBadges>)
              ).map(([category, badges]) => (
                <div key={category} className="col-span-1">
                  <h4 className="font-semibold mb-3 text-sm capitalize">{category}</h4>
                  <div className="space-y-2">
                    {badges.map((badge) => (
                      <div
                        key={badge.id}
                        className="border rounded-lg p-3 bg-muted/20 hover:bg-muted/40 transition-colors"
                      >
                        <div className="flex items-center gap-2 mb-1">
                          <div className="w-8 h-8 rounded-full bg-yellow-100 dark:bg-yellow-900 flex items-center justify-center">
                            <Trophy className="h-4 w-4 text-yellow-600" />
                          </div>
                          <h5 className="font-semibold text-sm">{badge.name}</h5>
                        </div>
                        <p className="text-xs text-muted-foreground">{badge.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Instructor Info */}
        <Card>
          <CardHeader>
            <CardTitle>About the Instructor</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-start gap-6">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-400 to-purple-600 flex items-center justify-center text-white text-3xl font-bold">
                {gitCourse.instructor.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold mb-2">{gitCourse.instructor.name}</h3>
                <p className="text-muted-foreground mb-4">{gitCourse.instructor.bio}</p>
                <div className="flex gap-6 text-sm">
                  <div>
                    <div className="font-semibold">{gitCourse.instructor.rating}</div>
                    <div className="text-muted-foreground">Instructor Rating</div>
                  </div>
                  <div>
                    <div className="font-semibold">{gitCourse.instructor.studentsCount.toLocaleString()}</div>
                    <div className="text-muted-foreground">Students</div>
                  </div>
                  <div>
                    <div className="font-semibold">{gitCourse.instructor.coursesCount}</div>
                    <div className="text-muted-foreground">Courses</div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Enrollment Modal */}
        <EnrollmentModal
          isOpen={showEnrollModal}
          onClose={() => setShowEnrollModal(false)}
          course={{
            id: GIT_COURSE_DB_ID,
            title: gitCourse.title,
            description: gitCourse.description,
            level: "Beginner to Advanced",
            duration: Math.floor(gitCourse.duration / 60),
            totalXP: gitCourse.totalXP,
            price: gitCourse.price,
            instructorName: gitCourse.instructor.name,
            rating: gitCourse.rating,
            studentCount: gitCourse.enrollmentCount,
          }}
          onEnroll={handleEnroll}
          isEnrolling={isEnrolling}
          error={enrollmentError}
        />
      </div>
    </div>
  );
}
