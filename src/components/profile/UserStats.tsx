import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trophy, Zap, Target, Calendar, Award, BookOpen } from "lucide-react";

interface UserStatsProps {
  stats: {
    totalXP: number;
    level: number;
    coursesCompleted: number;
    coursesInProgress: number;
    badgesEarned: number;
    totalBadges: number;
    currentStreak: number;
    longestStreak: number;
  };
}

export function UserStats({ stats }: UserStatsProps) {
  const statCards = [
    {
      title: "Total XP",
      value: stats.totalXP.toLocaleString(),
      icon: Zap,
      color: "text-yellow-500",
      bgColor: "bg-yellow-100 dark:bg-yellow-900",
    },
    {
      title: "Current Level",
      value: stats.level,
      icon: Trophy,
      color: "text-blue-500",
      bgColor: "bg-blue-100 dark:bg-blue-900",
    },
    {
      title: "Courses Completed",
      value: `${stats.coursesCompleted}`,
      icon: BookOpen,
      color: "text-green-500",
      bgColor: "bg-green-100 dark:bg-green-900",
    },
    {
      title: "In Progress",
      value: `${stats.coursesInProgress}`,
      icon: Target,
      color: "text-orange-500",
      bgColor: "bg-orange-100 dark:bg-orange-900",
    },
    {
      title: "Badges Earned",
      value: `${stats.badgesEarned}/${stats.totalBadges}`,
      icon: Award,
      color: "text-purple-500",
      bgColor: "bg-purple-100 dark:bg-purple-900",
    },
    {
      title: "Current Streak",
      value: `${stats.currentStreak} days`,
      icon: Calendar,
      color: "text-red-500",
      bgColor: "bg-red-100 dark:bg-red-900",
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {statCards.map((stat) => {
        const Icon = stat.icon;
        return (
          <Card key={stat.title}>
            <CardHeader className="pb-2">
              <div className={`w-10 h-10 rounded-full ${stat.bgColor} flex items-center justify-center mb-2`}>
                <Icon className={`h-5 w-5 ${stat.color}`} />
              </div>
              <CardTitle className="text-xs font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
