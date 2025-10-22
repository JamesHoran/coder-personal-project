"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Clock, CheckCircle, Target, Lock } from "lucide-react";
import type { Project } from "@/types";

interface ProjectCardProps {
  project: Project;
  onStart?: (projectId: string) => void;
  isLocked?: boolean;
}

export function ProjectCard({ project, onStart, isLocked = false }: ProjectCardProps) {
  return (
    <Card
      className={`transition-all hover:shadow-md ${
        project.completed ? "border-green-500 bg-green-50 dark:bg-green-950" : ""
      } ${isLocked ? "opacity-60" : ""}`}
    >
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              {project.completed && <CheckCircle className="h-5 w-5 text-green-500" />}
              {isLocked && <Lock className="h-4 w-4 text-gray-500" />}
              <BookOpen className="h-5 w-5 text-blue-500" />
              <CardTitle className="text-xl">{project.name}</CardTitle>
            </div>
            <CardDescription className="text-base">{project.description}</CardDescription>
          </div>

          <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white ml-2 flex-shrink-0">
            +{project.xp} XP
          </Badge>
        </div>
      </CardHeader>

      <CardContent>
        {/* Success Criteria */}
        <div className="mb-4">
          <h4 className="font-semibold mb-2 flex items-center gap-2 text-sm">
            <Target className="h-4 w-4" />
            Success Criteria
          </h4>
          <ul className="space-y-1">
            {project.successCriteria.map((criteria, idx) => (
              <li key={idx} className="flex items-start gap-2 text-sm">
                <CheckCircle className="h-4 w-4 mt-0.5 text-muted-foreground flex-shrink-0" />
                <span>{criteria}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-3 border-t">
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span>{project.timeEstimate}</span>
          </div>

          <Button
            onClick={() => onStart?.(project.id)}
            disabled={isLocked || project.completed}
            variant={project.completed ? "outline" : "default"}
          >
            {isLocked
              ? "Locked"
              : project.completed
              ? "Completed"
              : "Start Project"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
