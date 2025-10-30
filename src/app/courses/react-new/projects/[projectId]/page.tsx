'use client';

import { use, useState } from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getProjectById, getModuleById } from '@/data/courses/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  Trophy,
  Clock,
  CheckCircle2,
  Github,
  Globe,
  Download,
  ChevronLeft,
  Rocket,
  Target,
} from 'lucide-react';

interface ProjectPageProps {
  params: Promise<{
    projectId: string;
  }>;
}

export default function ProjectPage({ params }: ProjectPageProps) {
  const { projectId } = use(params);
  const [githubUrl, setGithubUrl] = useState('');
  const [demoUrl, setDemoUrl] = useState('');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Get the project
  const project = getProjectById(projectId);

  if (!project) {
    notFound();
  }

  // Get the module this project belongs to
  const module = getModuleById(project.moduleId);

  if (!module) {
    notFound();
  }

  // Handle project submission
  const handleSubmit = async () => {
    setIsSubmitting(true);

    try {
      // TODO: Submit to API
      const response = await fetch('/api/courses/react/projects/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          projectId: project.id,
          githubUrl,
          demoUrl,
          notes,
        }),
      });

      if (response.ok) {
        setIsSubmitted(true);
        // TODO: Award XP and check for badges
      }
    } catch (error) {
      console.error('Error submitting project:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-white dark:bg-slate-950">
        <div className="container mx-auto px-4 py-6">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
            <Link href="/courses/react-new">React Course</Link>
            <span>/</span>
            <Link href={`/courses/react-new#${module.id}`}>{module.title}</Link>
            <span>/</span>
            <span className="text-foreground">Capstone Project</span>
          </div>

          {/* Project Header */}
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <Badge variant="outline" className="bg-orange-50 dark:bg-orange-950 border-orange-200">
                  <Rocket className="h-3 w-3 mr-1" />
                  Capstone Project
                </Badge>
                <Badge variant="secondary">{project.difficulty}</Badge>
              </div>
              <h1 className="text-4xl font-bold mb-2">{project.name}</h1>
              <p className="text-xl text-muted-foreground">{module.title} - Module {module.number}</p>
            </div>

            <div className="text-right">
              <div className="flex items-center gap-2 justify-end mb-2">
                <Trophy className="h-6 w-6 text-yellow-500" />
                <span className="text-3xl font-bold text-primary">{project.xp}</span>
                <span className="text-muted-foreground">XP</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span>{project.timeEstimate}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Project Description */}
            <Card>
              <CardHeader>
                <CardTitle>Project Overview</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-slate dark:prose-invert max-w-none">
                <p className="text-lg whitespace-pre-line">{project.description}</p>
              </CardContent>
            </Card>

            {/* Success Criteria */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Success Criteria
                </CardTitle>
                <CardDescription>Your project must meet all of these requirements</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {project.successCriteria.map((criterion, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                      <span>{criterion}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Submission Section */}
            <Card>
              <CardHeader>
                <CardTitle>Submit Your Project</CardTitle>
                <CardDescription>
                  Share your completed project to earn {project.xp} XP and unlock the next module
                </CardDescription>
              </CardHeader>
              <CardContent>
                {isSubmitted ? (
                  <Alert className="bg-green-50 dark:bg-green-950 border-green-200">
                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                    <AlertDescription className="text-green-900 dark:text-green-100">
                      <div className="font-semibold mb-2">Project Submitted Successfully!</div>
                      <p>
                        You've earned {project.xp} XP! Your submission is under review. You'll be notified when it's
                        approved.
                      </p>
                    </AlertDescription>
                  </Alert>
                ) : (
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium mb-2 flex items-center gap-2">
                        <Github className="h-4 w-4" />
                        GitHub Repository URL *
                      </label>
                      <Input
                        placeholder="https://github.com/your-username/project-name"
                        value={githubUrl}
                        onChange={(e) => setGithubUrl(e.target.value)}
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-2 flex items-center gap-2">
                        <Globe className="h-4 w-4" />
                        Live Demo URL (optional)
                      </label>
                      <Input
                        placeholder="https://your-project.vercel.app"
                        value={demoUrl}
                        onChange={(e) => setDemoUrl(e.target.value)}
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-2 block">
                        Additional Notes (optional)
                      </label>
                      <Textarea
                        placeholder="Share any challenges you faced, what you learned, or special features you added..."
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        rows={4}
                      />
                    </div>

                    <Button
                      onClick={handleSubmit}
                      disabled={!githubUrl || isSubmitting}
                      size="lg"
                      className="w-full"
                    >
                      {isSubmitting ? 'Submitting...' : `Submit Project & Earn ${project.xp} XP`}
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Starter Code */}
            {project.starterRepoUrl && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Starter Code</CardTitle>
                  <CardDescription>Download the starter template to begin</CardDescription>
                </CardHeader>
                <CardContent>
                  <a href={project.starterRepoUrl} target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" className="w-full">
                      <Download className="h-4 w-4 mr-2" />
                      Download Starter
                    </Button>
                  </a>
                </CardContent>
              </Card>
            )}

            {/* Module Info */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">About This Module</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <div className="text-sm text-muted-foreground mb-1">Module</div>
                  <div className="font-semibold">{module.title}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground mb-1">Quest</div>
                  <div className="font-semibold italic">{module.questName}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground mb-1">Lessons Completed</div>
                  <div className="font-semibold">
                    0 / {module.lessons.length}
                    {/* TODO: Get from user progress */}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Tips Card */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Pro Tips</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <p>✅ Review the success criteria before starting</p>
                <p>✅ Break the project into smaller tasks</p>
                <p>✅ Test your code frequently</p>
                <p>✅ Use Git to commit your progress</p>
                <p>✅ Deploy your project to showcase it</p>
              </CardContent>
            </Card>

            {/* Navigation */}
            <div className="space-y-3">
              <Link href={`/courses/react-new/lessons/${module.lessons[0].id}`}>
                <Button variant="outline" className="w-full">
                  <ChevronLeft className="h-4 w-4 mr-2" />
                  Back to Lessons
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
