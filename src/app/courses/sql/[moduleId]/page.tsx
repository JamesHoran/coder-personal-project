import Link from "next/link";
import { notFound } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import sqlCourse from "@/data/courses/sql-course";

interface ModulePageProps {
  params: Promise<{
    moduleId: string;
  }>;
}

export default async function SQLModulePage({ params }: ModulePageProps) {
  const { moduleId } = await params;
  // Find the module across all phases
  let courseModule;
  let phase;

  for (const p of sqlCourse.phases) {
    const foundModule = p.modules.find((m) => m.id === moduleId);
    if (foundModule) {
      courseModule = foundModule;
      phase = p;
      break;
    }
  }

  // If module not found, return 404
  if (!courseModule || !phase) {
    notFound();
  }

  const moduleXP =
    courseModule.projects.reduce((sum, p) => sum + p.xp, 0) +
    courseModule.challenges.reduce((sum, c) => sum + c.xp, 0);

  return (
    <div className="container mx-auto py-8 px-4">
      {/* Breadcrumb */}
      <div className="mb-6 text-sm text-muted-foreground">
        <Link href="/courses" className="hover:text-foreground">
          Courses
        </Link>
        {" / "}
        <Link href="/courses/sql" className="hover:text-foreground">
          SQL Essentials
        </Link>
        {" / "}
        <span className="text-foreground">{courseModule.title}</span>
      </div>

      {/* Module Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <Badge variant="outline">Module {courseModule.number}</Badge>
          <Badge>{phase.level}</Badge>
        </div>
        <h1 className="text-4xl font-bold mb-2">{courseModule.title}</h1>
        <p className="text-xl text-muted-foreground italic mb-4">
          Quest: {courseModule.questName}
        </p>
        <p className="text-lg text-muted-foreground mb-4">
          {courseModule.description}
        </p>
        <div className="flex gap-4 items-center flex-wrap">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Total XP:</span>
            <span className="text-sm font-bold text-primary">
              {moduleXP}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Projects:</span>
            <span className="text-sm text-muted-foreground">
              {courseModule.projects.length}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Challenges:</span>
            <span className="text-sm text-muted-foreground">
              {courseModule.challenges.length}
            </span>
          </div>
        </div>
      </div>

      {/* Learning Objectives */}
      <Card className="p-6 mb-8">
        <h2 className="text-2xl font-bold mb-4">Learning Objectives</h2>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {courseModule.learningObjectives.map((objective, index) => (
            <li key={index} className="flex items-start gap-2">
              <span className="text-primary mt-1">✓</span>
              <span className="text-muted-foreground">{objective}</span>
            </li>
          ))}
        </ul>
      </Card>

      {/* Projects */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold mb-4">Projects</h2>
        <div className="grid gap-6 md:grid-cols-2">
          {courseModule.projects.map((project) => (
            <Card key={project.id} className="p-6">
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-xl font-bold">{project.name}</h3>
                <Badge variant="secondary" className="ml-2">
                  {project.xp} XP
                </Badge>
              </div>
              <p className="text-muted-foreground mb-4">
                {project.description}
              </p>
              <div className="mb-4">
                <h4 className="text-sm font-semibold mb-2">Success Criteria:</h4>
                <ul className="space-y-1">
                  {project.successCriteria.map((criteria, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <span className="text-primary mt-0.5">•</span>
                      <span className="text-muted-foreground">{criteria}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">
                  Time Estimate: {project.timeEstimate}
                </span>
                <Button size="sm">Start Project</Button>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Challenges */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold mb-4">Challenges</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {courseModule.challenges.map((challenge) => (
            <Card
              key={challenge.id}
              className={`p-6 ${
                challenge.type === "boss"
                  ? "border-2 border-primary bg-primary/5"
                  : ""
              }`}
            >
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-lg font-bold">{challenge.name}</h3>
                <Badge
                  variant={challenge.type === "boss" ? "default" : "secondary"}
                >
                  {challenge.xp} XP
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground mb-3">
                {challenge.description}
              </p>
              <div className="flex items-center justify-between">
                <Badge
                  variant="outline"
                  className={
                    challenge.difficulty === "expert"
                      ? "border-red-500 text-red-500"
                      : challenge.difficulty === "advanced"
                      ? "border-orange-500 text-orange-500"
                      : challenge.difficulty === "intermediate"
                      ? "border-yellow-500 text-yellow-500"
                      : "border-green-500 text-green-500"
                  }
                >
                  {challenge.difficulty}
                </Badge>
                {challenge.type === "boss" && (
                  <Badge variant="default">Boss Challenge</Badge>
                )}
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between items-center mt-8">
        <Link href="/courses/sql">
          <Button variant="outline">← Back to Course</Button>
        </Link>
        <Button>Start Learning →</Button>
      </div>
    </div>
  );
}
