import Link from "next/link";
import { notFound } from "next/navigation";
import reactCourse from "@/data/courses/react-course";
import { ProgressProvider } from "@/contexts/ProgressContext";
import { ModuleContent } from "@/components/course/ModuleContent";

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

  return (
    <ProgressProvider>
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

        <ModuleContent module={foundModule} phase={phase} moduleXP={moduleXP} />
      </div>
    </ProgressProvider>
  );
}
