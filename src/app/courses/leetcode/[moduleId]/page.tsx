import Link from "next/link";
import { notFound } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import leetcodeCourse from "@/data/courses/leetcode-course";

interface ModulePageProps {
  params: Promise<{
    moduleId: string;
  }>;
}

export default async function LeetCodeModulePage({ params }: ModulePageProps) {
  const { moduleId } = await params;

  // Find the module
  const phase = leetcodeCourse.phases.find((p) =>
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
        <Link href="/courses/leetcode" className="hover:text-foreground">
          LeetCode Mastery
        </Link>
        {" / "}
        <span className="text-foreground">Module {foundModule.number}</span>
      </div>

      {/* Module Header */}
      <div className="mb-8">
        <div className="mb-2 flex items-center gap-3">
          <span className="text-sm font-semibold text-primary">
            Module {foundModule.number} • Phase {phase.number}: {phase.title}
          </span>
          <Badge variant="outline">{phase.level}</Badge>
        </div>
        <h1 className="text-4xl font-bold mb-3">{foundModule.title}</h1>
        <div className="text-xl text-primary italic mb-4 flex items-center gap-2">
          🎮 Quest: {foundModule.questName}
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
            <span className="text-sm font-medium">📋 Projects:</span>{" "}
            <span className="font-bold">{foundModule.projects.length}</span>
          </div>
          <div className="px-4 py-2 bg-muted rounded-lg">
            <span className="text-sm font-medium">⚔️ Challenges:</span>{" "}
            <span className="font-bold">{foundModule.challenges.length}</span>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Pattern Concepts */}
          <Card className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950 border-blue-200 dark:border-blue-800">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">🧩</span>
              <h2 className="text-2xl font-bold">Pattern Concepts</h2>
            </div>
            <ul className="space-y-2">
              {foundModule.learningObjectives.map((objective, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="text-primary mt-1 font-bold">✓</span>
                  <span className="text-muted-foreground">{objective}</span>
                </li>
              ))}
            </ul>
          </Card>

          {/* Projects (Problem Sets) */}
          <div>
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <span>📚</span> Problem Sets
            </h2>
            <div className="space-y-4">
              {foundModule.projects.map((project) => (
                <Card key={project.id} className="p-6 border-2 hover:border-primary/50 transition-all">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-xl font-bold">{project.name}</h3>
                    <span className="px-3 py-1 bg-primary/10 text-primary font-bold rounded-full text-sm whitespace-nowrap">
                      +{project.xp} XP
                    </span>
                  </div>
                  <p className="text-muted-foreground mb-4">
                    {project.description}
                  </p>
                  <div className="mb-4">
                    <div className="text-sm font-medium mb-2 flex items-center gap-2">
                      <span>🎯</span> Success Criteria:
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
                  <div className="flex items-center justify-between flex-wrap gap-3">
                    <span className="text-sm text-muted-foreground flex items-center gap-1">
                      ⏱️ Time Estimate: {project.timeEstimate}
                    </span>
                    <Button className="bg-green-600 hover:bg-green-700">
                      Solve Problems on LeetCode
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Challenges */}
          <div>
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <span>⚔️</span> Pattern Challenges
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {foundModule.challenges
                .filter((c) => c.type !== "boss")
                .map((challenge) => (
                  <Card
                    key={challenge.id}
                    className="p-4 hover:shadow-lg transition-all hover:scale-[1.02]"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-bold text-sm">{challenge.name}</h3>
                      <span className="px-2 py-1 bg-primary/10 text-primary font-bold rounded text-xs whitespace-nowrap">
                        +{challenge.xp} XP
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      {challenge.description}
                    </p>
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span
                          className={`text-xs px-2 py-1 rounded font-medium ${
                            challenge.difficulty === "beginner"
                              ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                              : challenge.difficulty === "intermediate"
                                ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                                : challenge.difficulty === "advanced"
                                  ? "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200"
                                  : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                          }`}
                        >
                          {challenge.difficulty}
                        </span>
                        <span
                          className={`text-xs px-2 py-1 rounded font-medium ${
                            challenge.type === "speed"
                              ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                              : challenge.type === "accuracy"
                                ? "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200"
                                : "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
                          }`}
                        >
                          {challenge.type}
                        </span>
                      </div>
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
            <Card className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950 border-2 border-purple-300 dark:border-purple-700 shadow-lg">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-3xl">👑</span>
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
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-4">
                  <span className="px-4 py-2 bg-purple-200 text-purple-900 dark:bg-purple-800 dark:text-purple-100 font-bold rounded-full text-lg">
                    +{bossChallenge.xp} XP
                  </span>
                  <Badge variant="destructive" className="uppercase">
                    {bossChallenge.difficulty}
                  </Badge>
                </div>
                <Button size="lg" className="bg-purple-600 hover:bg-purple-700">
                  Accept Boss Challenge
                </Button>
              </div>
            </Card>
          )}

          {/* Practice Strategy */}
          <Card className="p-6">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <span>📖</span> Practice Strategy
            </h2>
            <ol className="space-y-3">
              <li className="flex items-start gap-3">
                <span className="font-bold text-primary">1.</span>
                <span className="text-muted-foreground">
                  Solve each problem without looking at solutions (30 min max)
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="font-bold text-primary">2.</span>
                <span className="text-muted-foreground">
                  If stuck after 30 min, look at hints only (not full solution)
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="font-bold text-primary">3.</span>
                <span className="text-muted-foreground">
                  Review optimal solution and understand the pattern
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="font-bold text-primary">4.</span>
                <span className="text-muted-foreground">
                  Code the solution from scratch again without reference
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="font-bold text-primary">5.</span>
                <span className="text-muted-foreground">
                  Solve 3 similar problems to reinforce the pattern
                </span>
              </li>
            </ol>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Module Progress */}
          <Card className="p-6">
            <h3 className="font-bold mb-4 flex items-center gap-2">
              <span>📊</span> Your Progress
            </h3>
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
                  <span className="text-muted-foreground">Problem Sets</span>
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
                <div className="flex items-center justify-between pt-2 border-t">
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
                  href={`/courses/leetcode/${m.id}`}
                  className={`block p-3 rounded-lg transition-colors ${
                    m.id === foundModule.id
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-muted"
                  }`}
                >
                  <div className="text-xs font-medium opacity-80">
                    Module {m.number}
                  </div>
                  <div className="text-sm font-medium">{m.title}</div>
                </Link>
              ))}
            </div>
          </Card>

          {/* Quick Stats */}
          <Card className="p-6">
            <h3 className="font-bold mb-4">Module Stats</h3>
            <div className="space-y-4">
              <div>
                <div className="text-3xl font-bold text-primary">
                  {foundModule.projects.length}
                </div>
                <div className="text-sm text-muted-foreground">
                  Problem Sets
                </div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary">
                  {foundModule.challenges.length}
                </div>
                <div className="text-sm text-muted-foreground">
                  Pattern Challenges
                </div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary">
                  {foundModule.learningObjectives.length}
                </div>
                <div className="text-sm text-muted-foreground">
                  Pattern Concepts
                </div>
              </div>
              <div className="pt-3 border-t">
                <div className="text-3xl font-bold text-primary">
                  {moduleXP}
                </div>
                <div className="text-sm text-muted-foreground">
                  Total XP Available
                </div>
              </div>
            </div>
          </Card>

          {/* Resources */}
          <Card className="p-6 bg-gradient-to-br from-orange-50 to-yellow-50 dark:from-orange-950 dark:to-yellow-950">
            <h3 className="font-bold mb-4 flex items-center gap-2">
              <span>🎓</span> Resources
            </h3>
            <div className="space-y-2 text-sm">
              <Link
                href="https://neetcode.io"
                target="_blank"
                className="block p-2 hover:bg-background/50 rounded transition-colors"
              >
                <div className="font-medium">NeetCode Solutions</div>
                <div className="text-xs text-muted-foreground">
                  Video explanations & templates
                </div>
              </Link>
              <Link
                href="https://leetcode.com"
                target="_blank"
                className="block p-2 hover:bg-background/50 rounded transition-colors"
              >
                <div className="font-medium">LeetCode Platform</div>
                <div className="text-xs text-muted-foreground">
                  Practice problems
                </div>
              </Link>
              <div className="block p-2 hover:bg-background/50 rounded transition-colors cursor-pointer">
                <div className="font-medium">Pattern Templates</div>
                <div className="text-xs text-muted-foreground">
                  Code templates for this module
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
