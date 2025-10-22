import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import leetcodeCourse from "@/data/courses/leetcode-course";

export default function LeetCodeCoursePage() {
  return (
    <div className="container mx-auto py-8 px-4">
      {/* Course Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <h1 className="text-4xl font-bold">{leetcodeCourse.title}</h1>
          <Badge variant="default" className="text-sm">
            {leetcodeCourse.rating} ⭐
          </Badge>
        </div>
        <p className="text-lg text-muted-foreground mb-4">
          {leetcodeCourse.description}
        </p>
        <div className="flex gap-4 items-center flex-wrap">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Duration:</span>
            <span className="text-sm text-muted-foreground">
              {leetcodeCourse.duration / 60} hours
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Level:</span>
            <span className="text-sm text-muted-foreground capitalize">
              {leetcodeCourse.level}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Total XP:</span>
            <span className="text-sm text-muted-foreground font-bold text-primary">
              {leetcodeCourse.totalXP}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Students:</span>
            <span className="text-sm text-muted-foreground">
              {leetcodeCourse.instructor.studentsCount.toLocaleString()}+
            </span>
          </div>
        </div>
      </div>

      {/* Course Philosophy */}
      <Card className="p-6 mb-8 bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20">
        <h2 className="text-2xl font-bold mb-3">Why Pattern-Based Learning?</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <h3 className="font-semibold mb-2 text-primary">✅ Pattern-Based Advantage</h3>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Master 10 patterns → Handle hundreds of problems</li>
              <li>• Build mental frameworks</li>
              <li>• Recognize patterns instantly</li>
              <li>• Apply to unseen problems</li>
              <li>• Interview confidence</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-2 text-destructive">❌ Random Grinding Problems</h3>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Leads to burnout</li>
              <li>• Poor recall under pressure</li>
              <li>• Can&apos;t handle new problems</li>
              <li>• Time inefficient</li>
              <li>• Pattern blindness</li>
            </ul>
          </div>
        </div>
        <div className="mt-4 p-3 bg-background rounded-lg border">
          <p className="text-sm font-medium">
            📊 Research Shows: 75-150 well-chosen problems with pattern-based approach =
            <span className="text-primary font-bold"> 3x higher success rate</span> than 500 random problems
          </p>
        </div>
      </Card>

      {/* Level Progression Overview */}
      <Card className="p-6 mb-8">
        <h2 className="text-2xl font-bold mb-4">Level Progression</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {leetcodeCourse.levelThresholds
            .filter((_, index) => index % 5 === 0)
            .map((threshold) => (
              <div
                key={threshold.level}
                className="text-center p-3 bg-muted rounded-lg hover:bg-primary/10 transition-colors"
              >
                <div className="text-2xl font-bold">Lv {threshold.level}</div>
                <div className="text-xs text-muted-foreground">
                  {threshold.minXP} XP
                </div>
                <div className="text-xs font-medium mt-1">
                  {threshold.title}
                </div>
              </div>
            ))}
        </div>
      </Card>

      {/* Success Metrics */}
      <Card className="p-6 mb-8">
        <h2 className="text-2xl font-bold mb-4">Success Metrics</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 bg-green-50 dark:bg-green-950 rounded-lg">
            <div className="text-3xl font-bold text-green-600 dark:text-green-400">75%</div>
            <div className="text-sm text-muted-foreground">
              Solve new problems within 30 minutes
            </div>
          </div>
          <div className="p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
            <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">87%</div>
            <div className="text-sm text-muted-foreground">
              FAANG questions use these 10-12 patterns
            </div>
          </div>
          <div className="p-4 bg-purple-50 dark:bg-purple-950 rounded-lg">
            <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">3x</div>
            <div className="text-sm text-muted-foreground">
              Higher success rate vs random grinding
            </div>
          </div>
          <div className="p-4 bg-orange-50 dark:bg-orange-950 rounded-lg">
            <div className="text-3xl font-bold text-orange-600 dark:text-orange-400">Instant</div>
            <div className="text-sm text-muted-foreground">
              Pattern identification speed
            </div>
          </div>
        </div>
      </Card>

      {/* Phases */}
      <div className="space-y-8">
        {leetcodeCourse.phases.map((phase) => {
          const phaseXP = phase.modules.reduce((sum, module) => {
            const projectXP = module.projects.reduce(
              (pSum, p) => pSum + p.xp,
              0
            );
            const challengeXP = module.challenges.reduce(
              (cSum, c) => cSum + c.xp,
              0
            );
            return sum + projectXP + challengeXP;
          }, 0);

          return (
            <div key={phase.id}>
              <div className="mb-4">
                <div className="flex items-center gap-3 mb-2">
                  <h2 className="text-3xl font-bold">
                    Phase {phase.number}: {phase.title}
                  </h2>
                  <Badge variant="outline" className="text-sm">
                    {phase.level}
                  </Badge>
                </div>
                <div className="flex gap-4 text-sm text-muted-foreground flex-wrap">
                  <span>⏱️ Duration: {phase.duration}</span>
                  <span>🎯 Total XP: {phaseXP}</span>
                  <span>📚 {phase.modules.length} Modules</span>
                  <span>
                    🧩{" "}
                    {phase.modules.reduce(
                      (sum, m) => sum + m.projects.length + m.challenges.length,
                      0
                    )}{" "}
                    Challenges & Projects
                  </span>
                </div>
              </div>

              {/* Modules Grid */}
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {phase.modules.map((module) => {
                  const moduleXP =
                    module.projects.reduce((sum, p) => sum + p.xp, 0) +
                    module.challenges.reduce((sum, c) => sum + c.xp, 0);

                  return (
                    <Card
                      key={module.id}
                      className="p-6 hover:shadow-lg transition-all hover:scale-[1.02] border-2 hover:border-primary/50"
                    >
                      <div className="mb-3">
                        <div className="text-sm text-primary font-semibold mb-1">
                          Module {module.number}
                        </div>
                        <h3 className="text-xl font-bold mb-2">
                          {module.title}
                        </h3>
                        <div className="text-sm text-muted-foreground italic mb-3 flex items-center gap-1">
                          🎮 Quest: {module.questName}
                        </div>
                      </div>

                      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                        {module.description}
                      </p>

                      <div className="space-y-2 mb-4">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">
                            📋 Projects:
                          </span>
                          <span className="font-medium">
                            {module.projects.length}
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">
                            ⚔️ Challenges:
                          </span>
                          <span className="font-medium">
                            {module.challenges.length}
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-sm pt-2 border-t">
                          <span className="text-muted-foreground">
                            💎 Total XP:
                          </span>
                          <span className="font-bold text-primary text-lg">
                            {moduleXP}
                          </span>
                        </div>
                      </div>

                      <Link href={`/courses/leetcode/${module.id}`}>
                        <Button className="w-full">Start Quest</Button>
                      </Link>
                    </Card>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Study Tracks */}
      <Card className="p-6 mt-8">
        <h2 className="text-2xl font-bold mb-4">Choose Your Track</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="p-6 bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-950 dark:to-yellow-900 rounded-lg border-2 border-yellow-200 dark:border-yellow-800">
            <h3 className="text-xl font-bold mb-2">⚡ Fast Track</h3>
            <div className="text-sm text-muted-foreground mb-3">
              Interview-ready in 2-3 months
            </div>
            <ul className="text-sm space-y-1 mb-4">
              <li>• 8-12 weeks</li>
              <li>• 3-4 hours/day</li>
              <li>• 100 problems</li>
              <li>• 6,000+ XP</li>
              <li>• Bronze Certificate</li>
            </ul>
            <Badge className="bg-yellow-600">Blind 75 + Essentials</Badge>
          </div>

          <div className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 rounded-lg border-2 border-blue-200 dark:border-blue-800">
            <h3 className="text-xl font-bold mb-2">🎯 Standard Track</h3>
            <div className="text-sm text-muted-foreground mb-3">
              Comprehensive preparation
            </div>
            <ul className="text-sm space-y-1 mb-4">
              <li>• 12-16 weeks</li>
              <li>• 2-3 hours/day</li>
              <li>• 150 problems</li>
              <li>• 10,000+ XP</li>
              <li>• Silver Certificate</li>
            </ul>
            <Badge className="bg-blue-600">NeetCode 150</Badge>
          </div>

          <div className="p-6 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950 dark:to-purple-900 rounded-lg border-2 border-purple-200 dark:border-purple-800">
            <h3 className="text-xl font-bold mb-2">🏆 Extended Track</h3>
            <div className="text-sm text-muted-foreground mb-3">
              FAANG Senior/Staff level
            </div>
            <ul className="text-sm space-y-1 mb-4">
              <li>• 20-24 weeks</li>
              <li>• 1-2 hours/day</li>
              <li>• 250+ problems</li>
              <li>• 18,000+ XP</li>
              <li>• Gold Certificate</li>
            </ul>
            <Badge className="bg-purple-600">Complete Mastery</Badge>
          </div>
        </div>
      </Card>

      {/* Course Statistics */}
      <Card className="p-6 mt-8">
        <h2 className="text-2xl font-bold mb-4">Course Statistics</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div className="text-center">
            <div className="text-3xl font-bold text-primary">
              {leetcodeCourse.phases.length}
            </div>
            <div className="text-sm text-muted-foreground">Phases</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary">
              {leetcodeCourse.phases.reduce(
                (sum, phase) => sum + phase.modules.length,
                0
              )}
            </div>
            <div className="text-sm text-muted-foreground">Modules</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary">
              {leetcodeCourse.phases.reduce(
                (sum, phase) =>
                  sum +
                  phase.modules.reduce(
                    (mSum, m) => mSum + m.projects.length,
                    0
                  ),
                0
              )}
            </div>
            <div className="text-sm text-muted-foreground">Projects</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary">
              {leetcodeCourse.phases.reduce(
                (sum, phase) =>
                  sum +
                  phase.modules.reduce(
                    (mSum, m) => mSum + m.challenges.length,
                    0
                  ),
                0
              )}
            </div>
            <div className="text-sm text-muted-foreground">Challenges</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary">
              {leetcodeCourse.totalXP.toLocaleString()}
            </div>
            <div className="text-sm text-muted-foreground">Total XP</div>
          </div>
        </div>
      </Card>

      {/* Call to Action */}
      <Card className="p-8 mt-8 bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20 text-center">
        <h2 className="text-3xl font-bold mb-3">
          Ready to Master LeetCode?
        </h2>
        <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
          Master the patterns. Pass the interviews. Land your dream job at FAANG and beyond.
          Every senior engineer struggled with these problems once. The difference? They kept going.
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <Link href={`/courses/leetcode/${leetcodeCourse.phases[0].modules[0].id}`}>
            <Button size="lg" className="text-lg px-8">
              Start Phase 1 Now
            </Button>
          </Link>
          <Button size="lg" variant="outline" className="text-lg px-8">
            View Roadmap
          </Button>
        </div>
        <p className="text-sm text-muted-foreground mt-4">
          ⭐ Rated {leetcodeCourse.rating}/5 by {leetcodeCourse.instructor.studentsCount.toLocaleString()}+ students
        </p>
      </Card>
    </div>
  );
}
