import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getAllModules } from "@/data/courses/react-unified/course-metadata";
import { notFound } from "next/navigation";

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) {
  const { projectId } = await params;

  // Find the project across all modules
  const allModules = getAllModules();
  let projectData = null;
  let moduleData = null;

  for (const module of allModules) {
    const project = module.projects.find((p) => p.id === projectId);
    if (project) {
      projectData = project;
      moduleData = module;
      break;
    }
  }

  if (!projectData || !moduleData) {
    notFound();
  }

  const isCapstonProject = projectId.includes('capstone');

  return (
    <div className="container mx-auto py-8 px-4 max-w-4xl">
      {/* Breadcrumb */}
      <div className="mb-6 flex items-center gap-2 text-sm">
        <Link
          href="/courses/react"
          className="text-muted-foreground hover:text-foreground"
        >
          React Course
        </Link>
        <span className="text-muted-foreground">→</span>
        <Link
          href={`/courses/react/${moduleData.id}`}
          className="text-muted-foreground hover:text-foreground"
        >
          {moduleData.title}
        </Link>
        <span className="text-muted-foreground">→</span>
        <span>Project</span>
      </div>

      {/* Project Header */}
      <div className="mb-8">
        {isCapstonProject && (
          <div className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-4">
            ⭐ Capstone Project
          </div>
        )}
        <h1 className="text-4xl font-bold mb-4">{projectData.name}</h1>
        <p className="text-xl text-muted-foreground mb-6">
          {projectData.description}
        </p>

        {/* Project Stats */}
        <div className="flex gap-6 flex-wrap">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">XP Reward:</span>
            <span className="text-2xl font-bold text-primary">
              {projectData.xp}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Time Estimate:</span>
            <span className="text-sm text-muted-foreground">
              {projectData.timeEstimate}
            </span>
          </div>
        </div>
      </div>

      {/* Success Criteria */}
      <Card className="p-6 mb-8">
        <h2 className="text-2xl font-bold mb-4">Success Criteria</h2>
        <p className="text-muted-foreground mb-4">
          Your project will be considered complete when it meets all of the
          following criteria:
        </p>
        <ul className="space-y-3">
          {projectData.successCriteria.map((criteria, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-bold mt-0.5">
                {i + 1}
              </span>
              <span className="text-muted-foreground">{criteria}</span>
            </li>
          ))}
        </ul>
      </Card>

      {/* Getting Started */}
      <Card className="p-6 mb-8">
        <h2 className="text-2xl font-bold mb-4">Getting Started</h2>
        <ol className="space-y-4 text-muted-foreground">
          <li className="flex gap-3">
            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-muted text-foreground flex items-center justify-center text-sm font-bold">
              1
            </span>
            <div>
              <p className="font-semibold text-foreground mb-1">
                Set up your project
              </p>
              <p>
                Create a new React project or use an existing one. You can use
                Create React App, Vite, or Next.js.
              </p>
            </div>
          </li>
          <li className="flex gap-3">
            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-muted text-foreground flex items-center justify-center text-sm font-bold">
              2
            </span>
            <div>
              <p className="font-semibold text-foreground mb-1">
                Plan your implementation
              </p>
              <p>
                Review the success criteria and break down the project into
                smaller tasks. Consider component structure and data flow.
              </p>
            </div>
          </li>
          <li className="flex gap-3">
            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-muted text-foreground flex items-center justify-center text-sm font-bold">
              3
            </span>
            <div>
              <p className="font-semibold text-foreground mb-1">Build and test</p>
              <p>
                Implement the features one by one, testing as you go. Make sure
                all success criteria are met.
              </p>
            </div>
          </li>
          <li className="flex gap-3">
            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-muted text-foreground flex items-center justify-center text-sm font-bold">
              4
            </span>
            <div>
              <p className="font-semibold text-foreground mb-1">
                Submit your project
              </p>
              <p>
                Once complete, submit your project using the button below. You
                'll receive {projectData.xp} XP upon successful submission.
              </p>
            </div>
          </li>
        </ol>
      </Card>

      {/* Tips and Best Practices */}
      {isCapstonProject && (
        <Card className="p-6 mb-8 bg-primary/5 border-primary/20">
          <h2 className="text-2xl font-bold mb-4">💡 Tips for Success</h2>
          <ul className="space-y-2 text-muted-foreground">
            <li className="flex items-start gap-2">
              <span>•</span>
              <span>
                This is a capstone project - take your time and make it
                portfolio-worthy
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span>•</span>
              <span>
                Review all the concepts from previous lessons in this module
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span>•</span>
              <span>
                Focus on code quality, proper component structure, and user
                experience
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span>•</span>
              <span>
                Consider deploying your project to Vercel, Netlify, or GitHub
                Pages
              </span>
            </li>
          </ul>
        </Card>
      )}

      {/* Action Buttons */}
      <div className="flex gap-4 flex-wrap">
        <Button size="lg" className="flex-1 min-w-[200px]">
          Submit Project
        </Button>
        <Link href={`/courses/react/${moduleData.id}`} className="flex-1 min-w-[200px]">
          <Button variant="outline" size="lg" className="w-full">
            Back to Module
          </Button>
        </Link>
      </div>

      {/* Placeholder for submission */}
      <div className="mt-8 p-4 bg-muted rounded-lg text-center text-sm text-muted-foreground">
        Project submission system coming soon. For now, build the project and
        keep it in your portfolio!
      </div>
    </div>
  );
}
