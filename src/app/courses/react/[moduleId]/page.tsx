import Link from "next/link";
import { notFound } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import reactCourse from "@/data/courses/react-course";

interface ModulePageProps {
  params: Promise<{
    moduleId: string;
  }>;
}

export default async function ModulePage({ params }: ModulePageProps) {
  const { moduleId } = await params;

  // Find the module
  const phase = reactCourse.phases.find((p) =>
    p.modules.some((m) => m.id === moduleId)
  );
  const foundModule = phase?.modules.find((m) => m.id === moduleId);

  if (!foundModule || !phase) {
    notFound();
  }

  const moduleXP =
    foundModule.projects.reduce((sum, p) => sum + p.xp, 0) +
    foundModule.challenges.reduce((sum, c) => sum + c.xp, 0);

  // Get boss challenge
  const bossChallenge = foundModule.challenges.find((c) => c.type === "boss");

  return (
    <div className="container mx-auto py-8 px-4">
      {/* Breadcrumb */}
      <div className="mb-6 text-sm text-muted-foreground">
        <Link href="/courses" className="hover:text-foreground">
          Courses
        </Link>
        {" / "}
        <Link href="/courses/react" className="hover:text-foreground">
          React Course
        </Link>
        {" / "}
        <span className="text-foreground">Module {foundModule.number}</span>
      </div>

      {/* Module Header */}
      <div className="mb-8">
        <div className="mb-2">
          <span className="text-sm font-semibold text-primary">
            Module {foundModule.number} • Phase {phase.number}: {phase.title}
          </span>
        </div>
        <h1 className="text-4xl font-bold mb-3">{foundModule.title}</h1>
        <div className="text-xl text-primary italic mb-4">
          Quest: {foundModule.questName}
        </div>
        <p className="text-lg text-muted-foreground mb-4">
          {foundModule.description}
        </p>
        <div className="flex gap-4 items-center flex-wrap">
          <div className="px-4 py-2 bg-primary/10 rounded-lg">
            <span className="text-sm font-medium">Total XP:</span>{" "}
            <span className="text-lg font-bold text-primary">{moduleXP}</span>
          </div>
          <div className="px-4 py-2 bg-muted rounded-lg">
            <span className="text-sm font-medium">Projects:</span>{" "}
            <span className="font-bold">{foundModule.projects.length}</span>
          </div>
          <div className="px-4 py-2 bg-muted rounded-lg">
            <span className="text-sm font-medium">Challenges:</span>{" "}
            <span className="font-bold">{foundModule.challenges.length}</span>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Learning Objectives */}
          <Card className="p-6">
            <h2 className="text-2xl font-bold mb-4">Learning Objectives</h2>
            <ul className="space-y-2">
              {foundModule.learningObjectives.map((objective, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="text-primary mt-1">✓</span>
                  <span className="text-muted-foreground">{objective}</span>
                </li>
              ))}
            </ul>
          </Card>

          {/* Projects */}
          <div>
            <h2 className="text-2xl font-bold mb-4">Hands-On Projects</h2>
            <div className="space-y-4">
              {foundModule.projects.map((project) => (
                <Card key={project.id} className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-xl font-bold">{project.name}</h3>
                    <span className="px-3 py-1 bg-primary/10 text-primary font-bold rounded-full text-sm">
                      {project.xp} XP
                    </span>
                  </div>
                  <p className="text-muted-foreground mb-4">
                    {project.description}
                  </p>
                  <div className="mb-4">
                    <div className="text-sm font-medium mb-2">
                      Success Criteria:
                    </div>
                    <ul className="space-y-1">
                      {project.successCriteria.map((criteria, index) => (
                        <li
                          key={index}
                          className="text-sm text-muted-foreground flex items-start gap-2"
                        >
                          <span className="text-primary">•</span>
                          <span>{criteria}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      Time Estimate: {project.timeEstimate}
                    </span>
                    <Button>Start Project</Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Challenges */}
          <div>
            <h2 className="text-2xl font-bold mb-4">Challenges</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {foundModule.challenges
                .filter((c) => c.type !== "boss")
                .map((challenge) => (
                  <Card
                    key={challenge.id}
                    className="p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-bold">{challenge.name}</h3>
                      <span className="px-2 py-1 bg-primary/10 text-primary font-bold rounded text-xs">
                        {challenge.xp} XP
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      {challenge.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span
                        className={`text-xs px-2 py-1 rounded ${
                          challenge.difficulty === "beginner"
                            ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                            : challenge.difficulty === "intermediate"
                              ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                              : challenge.difficulty === "advanced"
                                ? "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200"
                                : "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200"
                        }`}
                      >
                        {challenge.difficulty}
                      </span>
                      <Button size="sm" variant="outline">
                        Start
                      </Button>
                    </div>
                  </Card>
                ))}
            </div>
          </div>

          {/* Boss Challenge */}
          {bossChallenge && (
            <Card className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950 border-2 border-purple-300 dark:border-purple-700">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-2xl">👑</span>
                <h2 className="text-2xl font-bold">Boss Challenge</h2>
              </div>
              <div className="mb-4">
                <h3 className="text-xl font-bold mb-2">
                  {bossChallenge.name}
                </h3>
                <p className="text-muted-foreground">
                  {bossChallenge.description}
                </p>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <span className="px-3 py-1 bg-purple-200 text-purple-900 dark:bg-purple-800 dark:text-purple-100 font-bold rounded-full">
                    {bossChallenge.xp} XP
                  </span>
                  <span className="text-sm text-muted-foreground uppercase font-semibold">
                    {bossChallenge.difficulty}
                  </span>
                </div>
                <Button size="lg" className="bg-purple-600 hover:bg-purple-700">
                  Take Challenge
                </Button>
              </div>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Module Progress */}
          <Card className="p-6">
            <h3 className="font-bold mb-4">Your Progress</h3>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">
                    Completion
                  </span>
                  <span className="font-bold">0%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-primary h-2 rounded-full w-0"></div>
                </div>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Projects</span>
                  <span className="font-medium">
                    0 / {foundModule.projects.length}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Challenges</span>
                  <span className="font-medium">
                    0 / {foundModule.challenges.length}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">XP Earned</span>
                  <span className="font-bold text-primary">0 / {moduleXP}</span>
                </div>
              </div>
            </div>
          </Card>

          {/* Module Navigation */}
          <Card className="p-6">
            <h3 className="font-bold mb-4">Module Navigation</h3>
            <div className="space-y-2">
              {phase.modules.map((m) => (
                <Link
                  key={m.id}
                  href={`/courses/react/${m.id}`}
                  className={`block p-3 rounded-lg transition-colors ${
                    m.id === foundModule.id
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-muted"
                  }`}
                >
                  <div className="text-sm font-medium">Module {m.number}</div>
                  <div className="text-sm">{m.title}</div>
                </Link>
              ))}
            </div>
          </Card>

          {/* Quick Stats */}
          <Card className="p-6">
            <h3 className="font-bold mb-4">Quick Stats</h3>
            <div className="space-y-3">
              <div>
                <div className="text-2xl font-bold text-primary">
                  {foundModule.projects.length}
                </div>
                <div className="text-sm text-muted-foreground">
                  Hands-On Projects
                </div>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary">
                  {foundModule.challenges.length}
                </div>
                <div className="text-sm text-muted-foreground">
                  Coding Challenges
                </div>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary">
                  {foundModule.learningObjectives.length}
                </div>
                <div className="text-sm text-muted-foreground">
                  Learning Objectives
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
