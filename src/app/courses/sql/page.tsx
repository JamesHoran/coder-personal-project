import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import sqlCourse from "@/data/courses/sql-course";

export default function SQLCoursePage() {
  return (
    <div className="container mx-auto py-8 px-4">
      {/* Course Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">{sqlCourse.title}</h1>
        <p className="text-lg text-muted-foreground mb-4">
          {sqlCourse.description}
        </p>
        <div className="flex gap-4 items-center flex-wrap">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Duration:</span>
            <span className="text-sm text-muted-foreground">
              {sqlCourse.duration / 60} hours
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Level:</span>
            <span className="text-sm text-muted-foreground capitalize">
              {sqlCourse.level}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Total XP:</span>
            <span className="text-sm text-muted-foreground font-bold">
              {sqlCourse.totalXP.toLocaleString()}
            </span>
          </div>
        </div>
      </div>

      {/* Level Progression Overview */}
      <Card className="p-6 mb-8">
        <h2 className="text-2xl font-bold mb-4">Level Progression</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {sqlCourse.levelThresholds
            .filter((_, index) => index % 5 === 0)
            .map((threshold) => (
              <div
                key={threshold.level}
                className="text-center p-3 bg-muted rounded-lg"
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

      {/* Phases */}
      <div className="space-y-8">
        {sqlCourse.phases.map((phase) => {
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
                <h2 className="text-3xl font-bold mb-2">
                  Phase {phase.number}: {phase.title}
                </h2>
                <div className="flex gap-4 text-sm text-muted-foreground">
                  <span>Level: {phase.level}</span>
                  <span>Duration: {phase.duration}</span>
                  <span>Total XP: {phaseXP}</span>
                  <span>{phase.modules.length} Modules</span>
                </div>
              </div>

              {/* Modules Grid */}
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {phase.modules.map((module) => {
                  const moduleXP =
                    module.projects.reduce((sum, p) => sum + p.xp, 0) +
                    module.challenges.reduce((sum, c) => sum + c.xp, 0);

                  return (
                    <Card key={module.id} className="p-6 hover:shadow-lg transition-shadow">
                      <div className="mb-3">
                        <div className="text-sm text-primary font-semibold mb-1">
                          Module {module.number}
                        </div>
                        <h3 className="text-xl font-bold mb-2">
                          {module.title}
                        </h3>
                        <div className="text-sm text-muted-foreground italic mb-3">
                          Quest: {module.questName}
                        </div>
                      </div>

                      <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                        {module.description}
                      </p>

                      <div className="space-y-2 mb-4">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">
                            Projects:
                          </span>
                          <span className="font-medium">
                            {module.projects.length}
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">
                            Challenges:
                          </span>
                          <span className="font-medium">
                            {module.challenges.length}
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">
                            Total XP:
                          </span>
                          <span className="font-bold text-primary">
                            {moduleXP}
                          </span>
                        </div>
                      </div>

                      <Link href={`/courses/sql/${module.id}`}>
                        <Button className="w-full">Start Module</Button>
                      </Link>
                    </Card>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Course Statistics */}
      <Card className="p-6 mt-8">
        <h2 className="text-2xl font-bold mb-4">Course Statistics</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-3xl font-bold text-primary">
              {sqlCourse.phases.length}
            </div>
            <div className="text-sm text-muted-foreground">Phases</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary">
              {sqlCourse.phases.reduce(
                (sum, phase) => sum + phase.modules.length,
                0
              )}
            </div>
            <div className="text-sm text-muted-foreground">Modules</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary">
              {sqlCourse.phases.reduce(
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
              {sqlCourse.phases.reduce(
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
        </div>
      </Card>
    </div>
  );
}
