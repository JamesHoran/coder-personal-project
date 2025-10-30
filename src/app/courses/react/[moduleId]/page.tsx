import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getModuleMetadata } from "@/data/courses/react-unified/course-metadata";
import { getLessonsByModule } from "@/data/courses/react-unified";
import { notFound } from "next/navigation";

export default async function ModuleDetailPage({
  params,
}: {
  params: Promise<{ moduleId: string }>;
}) {
  const { moduleId } = await params;
  const module = getModuleMetadata(moduleId);
  const lessons = getLessonsByModule(moduleId);

  if (!module) {
    notFound();
  }

  const totalModuleXP =
    module.projects.reduce((sum, p) => sum + p.xp, 0) +
    module.challenges.reduce((sum, c) => sum + c.xp, 0) +
    lessons.reduce((sum, l) => sum + l.xpReward, 0);

  return (
    <div className="container mx-auto py-8 px-4">
      {/* Breadcrumb */}
      <Link
        href="/courses/react"
        className="text-sm text-muted-foreground hover:text-foreground mb-4 inline-block"
      >
        ← Back to React Course
      </Link>

      {/* Module Header */}
      <div className="mb-8">
        <div className="text-sm text-primary font-semibold mb-2">
          Module {module.number}
        </div>
        <h1 className="text-4xl font-bold mb-2">{module.title}</h1>
        <p className="text-xl text-muted-foreground italic mb-4">
          Quest: {module.questName}
        </p>
        <p className="text-lg text-muted-foreground mb-6">
          {module.description}
        </p>

        {/* Module Stats */}
        <div className="flex gap-6 text-sm flex-wrap">
          <div className="flex items-center gap-2">
            <span className="font-medium">Lessons:</span>
            <span className="text-muted-foreground">{lessons.length}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-medium">Projects:</span>
            <span className="text-muted-foreground">
              {module.projects.length}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-medium">Challenges:</span>
            <span className="text-muted-foreground">
              {module.challenges.length}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-medium">Total XP:</span>
            <span className="font-bold text-primary">{totalModuleXP}</span>
          </div>
        </div>
      </div>

      {/* Learning Objectives */}
      <Card className="p-6 mb-8">
        <h2 className="text-2xl font-bold mb-4">Learning Objectives</h2>
        <ul className="list-disc list-inside space-y-2">
          {module.learningObjectives.map((objective, i) => (
            <li key={i} className="text-muted-foreground">
              {objective}
            </li>
          ))}
        </ul>
      </Card>

      {/* Interactive Lessons */}
      {lessons.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Interactive Lessons</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {lessons.map((lesson, index) => (
              <Card
                key={lesson.id}
                className="p-4 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="text-sm text-primary font-semibold">
                      Lesson {index + 1}
                    </div>
                    <h3 className="text-lg font-bold">{lesson.title}</h3>
                  </div>
                  <div className="text-sm font-bold text-primary">
                    {lesson.xpReward} XP
                  </div>
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                  <span className="capitalize">{lesson.difficulty}</span>
                  <span>•</span>
                  <span>{lesson.steps.length} steps</span>
                </div>
                <Link href={`/courses/react/lessons/${lesson.id}`}>
                  <Button className="w-full">Start Lesson</Button>
                </Link>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Projects */}
      {module.projects.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Projects</h2>
          <div className="grid gap-4">
            {module.projects.map((project) => (
              <Card
                key={project.id}
                className="p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-xl font-bold mb-2">{project.name}</h3>
                    <p className="text-muted-foreground mb-4">
                      {project.description}
                    </p>
                  </div>
                  <div className="text-lg font-bold text-primary">
                    {project.xp} XP
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="font-semibold mb-2 text-sm">
                    Success Criteria:
                  </h4>
                  <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                    {project.successCriteria.map((criteria, i) => (
                      <li key={i}>{criteria}</li>
                    ))}
                  </ul>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    Time estimate: {project.timeEstimate}
                  </span>
                  <Link href={`/courses/react/projects/${project.id}`}>
                    <Button>View Project</Button>
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Challenges */}
      {module.challenges.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Bonus Challenges</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {module.challenges.map((challenge) => (
              <Card
                key={challenge.id}
                className="p-4 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-lg font-bold">{challenge.name}</h3>
                  <div className="text-sm font-bold text-primary">
                    {challenge.xp} XP
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  {challenge.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs capitalize px-2 py-1 bg-muted rounded">
                    {challenge.difficulty}
                  </span>
                  <span className="text-xs capitalize px-2 py-1 bg-primary/10 text-primary rounded">
                    {challenge.type}
                  </span>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
