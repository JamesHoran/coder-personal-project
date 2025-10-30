"use client";

import { reactBasicsLessons } from "@/data/interactive-lessons/react-basics";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Trophy, Clock, ArrowRight } from "lucide-react";

export default function LessonsPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Interactive React Lessons</h1>
        <p className="text-muted-foreground text-lg">
          Learn React by doing. Complete hands-on coding challenges and earn XP!
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Trophy className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{reactBasicsLessons.length}</p>
                <p className="text-sm text-muted-foreground">
                  Lessons Available
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-500/10 rounded-lg">
                <Clock className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  {reactBasicsLessons.reduce(
                    (acc, lesson) => acc + lesson.steps.length,
                    0
                  )}
                </p>
                <p className="text-sm text-muted-foreground">Total Steps</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-500/10 rounded-lg">
                <Trophy className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  {reactBasicsLessons.reduce(
                    (acc, lesson) => acc + lesson.xpReward,
                    0
                  )}
                </p>
                <p className="text-sm text-muted-foreground">Total XP</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Lesson Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {reactBasicsLessons.map((lesson, index) => (
          <Card
            key={lesson.id}
            className="hover:shadow-lg transition-shadow duration-200"
          >
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="outline">Lesson {index + 1}</Badge>
                    <Badge
                      variant={
                        lesson.difficulty === "beginner"
                          ? "secondary"
                          : lesson.difficulty === "intermediate"
                          ? "default"
                          : "destructive"
                      }
                    >
                      {lesson.difficulty}
                    </Badge>
                  </div>
                  <CardTitle className="text-xl mb-2">{lesson.title}</CardTitle>
                </div>
                <div className="text-right">
                  <Badge className="bg-yellow-500 text-white">
                    {lesson.xpReward} XP
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Lesson Info */}
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {lesson.steps.length} steps
                  </span>
                </div>

                {/* Steps Preview */}
                <div className="text-sm">
                  <p className="font-medium mb-2">What you&apos;ll learn:</p>
                  <ul className="space-y-1 text-muted-foreground">
                    {lesson.steps.slice(0, 3).map((step) => (
                      <li key={step.id} className="flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>
                        <span className="line-clamp-1">{step.instruction.split('\n')[0].replace(/^#+ /, '')}</span>
                      </li>
                    ))}
                    {lesson.steps.length > 3 && (
                      <li className="text-xs italic">
                        +{lesson.steps.length - 3} more steps...
                      </li>
                    )}
                  </ul>
                </div>

                {/* CTA Button */}
                <Link href={`/lessons/${lesson.id}`} className="block">
                  <Button className="w-full">
                    Start Lesson
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Call to Action */}
      <div className="mt-12 text-center">
        <Card className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950">
          <CardContent className="pt-6 pb-6">
            <h2 className="text-2xl font-bold mb-2">
              Ready to Master React?
            </h2>
            <p className="text-muted-foreground mb-4">
              Complete all lessons to unlock advanced concepts and earn badges!
            </p>
            <Link href={`/lessons/${reactBasicsLessons[0].id}`}>
              <Button size="lg">
                Start First Lesson
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
