"use client";

import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Zap, TrendingUp } from "lucide-react";

interface XPBarProps {
  currentXP: number;
  level: number;
  xpToNextLevel: number;
  levelTitle: string;
}

export function XPBar({ currentXP, level, xpToNextLevel, levelTitle }: XPBarProps) {
  const currentLevelXP = currentXP % (level * 100); // Simplified calculation
  const totalXPForLevel = level * 100;
  const progress = (currentLevelXP / totalXPForLevel) * 100;

  return (
    <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950 rounded-lg p-4 border-2 border-primary/20">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center font-bold text-white">
            {level}
          </div>
          <div>
            <div className="font-bold text-lg">Level {level}</div>
            <div className="text-xs text-muted-foreground">{levelTitle}</div>
          </div>
        </div>

        <div className="text-right">
          <div className="flex items-center gap-1 text-primary font-semibold">
            <Zap className="h-4 w-4 fill-primary" />
            {currentXP.toLocaleString()} XP
          </div>
          <div className="text-xs text-muted-foreground">
            {xpToNextLevel.toLocaleString()} to Level {level + 1}
          </div>
        </div>
      </div>

      <Progress value={progress} className="h-3" />

      <div className="flex items-center justify-between mt-2">
        <div className="text-xs text-muted-foreground">
          {currentLevelXP.toLocaleString()} / {totalXPForLevel.toLocaleString()} XP
        </div>
        <Badge variant="secondary" className="text-xs">
          <TrendingUp className="h-3 w-3 mr-1" />
          {Math.round(progress)}% Complete
        </Badge>
      </div>
    </div>
  );
}
