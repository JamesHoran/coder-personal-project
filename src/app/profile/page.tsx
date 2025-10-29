"use client";

import { useEffect, useState } from "react";
import { useAuthStore } from "@/stores/authStore";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BadgeShowcase } from "@/components/gamification/BadgeShowcase";
import { UserStats } from "@/components/profile/UserStats";
import { User, Settings, Share2, Award } from "lucide-react";
import type { Badge as BadgeType } from "@/types";

export default function ProfilePage() {
  const { user, isAuthenticated } = useAuthStore();
  const router = useRouter();
  const [badges, setBadges] = useState<BadgeType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/auth/login");
    }
  }, [isAuthenticated, router]);

  useEffect(() => {
    // Fetch user badges
    const fetchBadges = async () => {
      try {
        // Mock badges data - in real app, fetch from API
        const mockBadges: BadgeType[] = [
          {
            id: "badge-1",
            name: "First Steps",
            description: "Completed your first lesson",
            category: "foundational",
            earned: true,
            earnedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
          },
          {
            id: "badge-2",
            name: "Quick Learner",
            description: "Completed 5 lessons in one day",
            category: "special",
            earned: true,
            earnedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
          },
          {
            id: "badge-3",
            name: "Code Master",
            description: "Completed a coding challenge with 100% accuracy",
            category: "mastery",
            earned: true,
            earnedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
          },
          {
            id: "badge-4",
            name: "Team Player",
            description: "Collaborated on a group project",
            category: "collaboration",
            earned: false,
          },
          {
            id: "badge-5",
            name: "Marathon Runner",
            description: "Maintained a 30-day learning streak",
            category: "special",
            earned: false,
          },
          {
            id: "badge-6",
            name: "Bug Hunter",
            description: "Fixed 10 code bugs",
            category: "mastery",
            earned: false,
          },
          {
            id: "badge-7",
            name: "Course Completer",
            description: "Completed your first course",
            category: "foundational",
            earned: false,
          },
          {
            id: "badge-8",
            name: "Knowledge Sharer",
            description: "Helped 5 other learners",
            category: "collaboration",
            earned: false,
          },
        ];
        setBadges(mockBadges);
      } catch (error) {
        console.error("Error fetching badges:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (isAuthenticated) {
      fetchBadges();
    }
  }, [isAuthenticated]);

  if (!isAuthenticated || !user) {
    return null;
  }

  // Mock user stats - in real app, fetch from API
  const userStats = {
    totalXP: 5420,
    level: 8,
    coursesCompleted: 2,
    coursesInProgress: 3,
    badgesEarned: badges.filter((b) => b.earned).length,
    totalBadges: badges.length,
    currentStreak: 7,
    longestStreak: 14,
  };

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        {/* Profile Header */}
        <Card className="mb-8 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-4">
                {user.avatarUrl ? (
                  <img
                    src={user.avatarUrl}
                    alt={user.displayName}
                    className="w-20 h-20 rounded-full border-4 border-border"
                  />
                ) : (
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-400 to-purple-600 flex items-center justify-center text-white font-bold text-3xl border-4 border-border">
                    {user.displayName.charAt(0).toUpperCase()}
                  </div>
                )}
                <div>
                  <CardTitle className="text-3xl mb-1">{user.displayName}</CardTitle>
                  <CardDescription className="text-base">{user.email}</CardDescription>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge variant="secondary">Level {userStats.level}</Badge>
                    <Badge variant="outline">{userStats.totalXP.toLocaleString()} XP</Badge>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share Profile
                </Button>
                <Button variant="outline" size="sm">
                  <Settings className="h-4 w-4 mr-2" />
                  Settings
                </Button>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Stats Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <User className="h-6 w-6" />
            Your Statistics
          </h2>
          <UserStats stats={userStats} />
        </div>

        {/* Badges Section */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <Award className="h-6 w-6" />
              Achievements & Badges
            </h2>
            <Badge variant="secondary">
              {userStats.badgesEarned} / {userStats.totalBadges} Earned
            </Badge>
          </div>

          {isLoading ? (
            <Card>
              <CardContent className="p-12 text-center">
                <p className="text-muted-foreground">Loading badges...</p>
              </CardContent>
            </Card>
          ) : (
            <BadgeShowcase badges={badges} showLocked={true} />
          )}
        </div>

        {/* Progress Summary */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Learning Journey</CardTitle>
            <CardDescription>Your progress summary</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Overall Progress</span>
                  <span className="text-sm text-muted-foreground">
                    {Math.round((userStats.coursesCompleted / (userStats.coursesCompleted + userStats.coursesInProgress)) * 100)}%
                  </span>
                </div>
                <div className="w-full bg-secondary rounded-full h-2">
                  <div
                    className="bg-primary rounded-full h-2"
                    style={{
                      width: `${Math.round((userStats.coursesCompleted / (userStats.coursesCompleted + userStats.coursesInProgress)) * 100)}%`,
                    }}
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4 pt-4">
                <div>
                  <h4 className="font-semibold mb-2">Next Milestone</h4>
                  <p className="text-sm text-muted-foreground">
                    Earn 580 more XP to reach Level {userStats.level + 1}
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Next Badge</h4>
                  <p className="text-sm text-muted-foreground">
                    Maintain your streak for 23 more days to earn &quot;Marathon Runner&quot;
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
