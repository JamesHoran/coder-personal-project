"use client";

import { Badge as BadgeUI } from "@/components/ui/badge";
import { Trophy, Lock } from "lucide-react";
import type { Badge } from "@/types";

interface BadgeShowcaseProps {
  badges: Badge[];
  showLocked?: boolean;
}

export function BadgeShowcase({ badges, showLocked = true }: BadgeShowcaseProps) {
  const earnedBadges = badges.filter(b => b.earned);
  const lockedBadges = badges.filter(b => !b.earned);

  const categoryColors = {
    foundational: "from-blue-400 to-blue-600",
    collaboration: "from-green-400 to-green-600",
    mastery: "from-purple-400 to-purple-600",
    special: "from-yellow-400 to-orange-600",
  };

  const renderBadge = (badge: Badge, isLocked: boolean) => (
    <div
      key={badge.id}
      className={`relative p-4 rounded-lg border-2 transition-all hover:scale-105 ${
        isLocked
          ? "bg-gray-50 dark:bg-gray-900 border-gray-300 dark:border-gray-700 opacity-60"
          : "bg-white dark:bg-gray-800 border-primary shadow-lg"
      }`}
    >
      <div className="flex flex-col items-center text-center">
        <div
          className={`w-16 h-16 rounded-full bg-gradient-to-br ${
            categoryColors[badge.category]
          } flex items-center justify-center mb-3 relative`}
        >
          {isLocked ? (
            <Lock className="h-8 w-8 text-white" />
          ) : (
            <Trophy className="h-8 w-8 text-white" />
          )}
        </div>
        <h4 className="font-bold text-sm mb-1">{badge.name}</h4>
        <p className="text-xs text-muted-foreground mb-2">{badge.description}</p>
        <BadgeUI variant={isLocked ? "outline" : "secondary"} className="text-xs">
          {badge.category}
        </BadgeUI>
        {badge.earned && badge.earnedAt && (
          <div className="text-xs text-muted-foreground mt-2">
            Earned {new Date(badge.earnedAt).toLocaleDateString()}
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {earnedBadges.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Trophy className="h-5 w-5 text-yellow-500" />
            <h3 className="text-xl font-bold">Earned Badges ({earnedBadges.length})</h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {earnedBadges.map(badge => renderBadge(badge, false))}
          </div>
        </div>
      )}

      {showLocked && lockedBadges.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Lock className="h-5 w-5 text-gray-500" />
            <h3 className="text-xl font-bold">Locked Badges ({lockedBadges.length})</h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {lockedBadges.map(badge => renderBadge(badge, true))}
          </div>
        </div>
      )}
    </div>
  );
}
