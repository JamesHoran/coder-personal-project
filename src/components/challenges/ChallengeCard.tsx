"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Trophy, Zap, Target, CheckCircle2, Lock } from "lucide-react";
import type { Challenge } from "@/types";
import { useState } from "react";

interface ChallengeCardProps {
  challenge: Challenge;
  onComplete?: (challengeId: string) => void;
  isLocked?: boolean;
}

export function ChallengeCard({ challenge, onComplete, isLocked = false }: ChallengeCardProps) {
  const [isAttempting, setIsAttempting] = useState(false);

  const difficultyColors = {
    beginner: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
    intermediate: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
    advanced: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
    expert: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
  };

  const typeIcons = {
    speed: <Zap className="h-4 w-4" />,
    accuracy: <Target className="h-4 w-4" />,
    completion: <CheckCircle2 className="h-4 w-4" />,
    boss: <Trophy className="h-4 w-4" />,
  };

  const handleAttempt = () => {
    if (isLocked) return;
    setIsAttempting(true);
    // In a real implementation, this would open a challenge interface
    // For now, we'll just simulate completion
    setTimeout(() => {
      if (onComplete) {
        onComplete(challenge.id);
      }
      setIsAttempting(false);
    }, 2000);
  };

  return (
    <Card
      className={`transition-all hover:shadow-md ${
        challenge.type === "boss"
          ? "border-2 border-purple-500 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950"
          : ""
      } ${isLocked ? "opacity-60" : ""} ${challenge.completed ? "border-green-500" : ""}`}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              {challenge.completed && (
                <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />
              )}
              {isLocked && <Lock className="h-4 w-4 text-gray-500 flex-shrink-0" />}
              {challenge.type === "boss" && !isLocked && (
                <Trophy className="h-5 w-5 text-purple-600 flex-shrink-0" />
              )}
              <CardTitle className="text-lg">{challenge.name}</CardTitle>
            </div>
            <CardDescription>{challenge.description}</CardDescription>
          </div>

          <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white ml-2 flex-shrink-0">
            +{challenge.xp} XP
          </Badge>
        </div>
      </CardHeader>

      <CardContent>
        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            <Badge variant="outline" className={difficultyColors[challenge.difficulty]}>
              {challenge.difficulty}
            </Badge>
            <Badge variant="outline" className="flex items-center gap-1">
              {typeIcons[challenge.type]}
              {challenge.type}
            </Badge>
          </div>

          <Button
            onClick={handleAttempt}
            disabled={isLocked || challenge.completed || isAttempting}
            variant={challenge.completed ? "outline" : "default"}
            size="sm"
          >
            {isLocked
              ? "Locked"
              : challenge.completed
              ? "Completed"
              : isAttempting
              ? "Loading..."
              : "Attempt"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
