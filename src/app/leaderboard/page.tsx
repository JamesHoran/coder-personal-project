"use client";

import { useEffect, useState } from "react";
import { Leaderboard } from "@/components/gamification/Leaderboard";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Trophy, RefreshCw, Filter } from "lucide-react";
import type { LeaderboardEntry } from "@/types";
import { useAuthStore } from "@/stores/authStore";

export default function LeaderboardPage() {
  const { user } = useAuthStore();
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState<"global" | "weekly">("global");

  const fetchLeaderboard = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/leaderboard?type=${filter}&limit=50`);
      const data = await response.json();

      if (data.success) {
        // Map the API response to LeaderboardEntry format
        const entries: LeaderboardEntry[] = data.data.map((entry: any) => ({
          userId: entry.id,
          displayName: entry.name || "Anonymous",
          avatarUrl: entry.avatar,
          xp: entry.totalXP || 0,
          level: entry.level || 1,
          rank: entry.rank,
        }));
        setLeaderboardData(entries);
      }
    } catch (error) {
      console.error("Error fetching leaderboard:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLeaderboard();
  }, [filter]);

  // Find current user's position
  const userPosition = leaderboardData.find(
    (entry) => entry.userId === user?.id
  );

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Trophy className="h-10 w-10 text-yellow-500" />
            <h1 className="text-4xl font-bold">Leaderboard</h1>
          </div>
          <p className="text-muted-foreground text-lg">
            See how you rank against other learners in the community
          </p>
        </div>

        {/* Stats Row */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Total Competitors</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{leaderboardData.length}</div>
              <p className="text-xs text-muted-foreground mt-1">
                Active learners
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Your Rank</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {userPosition ? `#${userPosition.rank}` : "-"}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                {userPosition ? `${userPosition.xp.toLocaleString()} XP` : "Not ranked"}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Top Score</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {leaderboardData[0]?.xp.toLocaleString() || "0"}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                XP by {leaderboardData[0]?.displayName || "No leader yet"}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Filter and Refresh */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium">Filter:</span>
            <Button
              variant={filter === "global" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter("global")}
            >
              All Time
            </Button>
            <Button
              variant={filter === "weekly" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter("weekly")}
            >
              This Week
            </Button>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={fetchLeaderboard}
            disabled={isLoading}
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? "animate-spin" : ""}`} />
            Refresh
          </Button>
        </div>

        {/* Leaderboard */}
        {isLoading ? (
          <Card>
            <CardContent className="p-12 text-center">
              <div className="flex items-center justify-center gap-2">
                <RefreshCw className="h-5 w-5 animate-spin" />
                <span>Loading leaderboard...</span>
              </div>
            </CardContent>
          </Card>
        ) : leaderboardData.length > 0 ? (
          <Leaderboard entries={leaderboardData} currentUserId={user?.id} />
        ) : (
          <Card>
            <CardContent className="p-12 text-center">
              <Trophy className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No Leaderboard Data Yet</h3>
              <p className="text-muted-foreground">
                Be the first to earn XP and claim the top spot!
              </p>
            </CardContent>
          </Card>
        )}

        {/* Motivation Section */}
        <Card className="mt-8 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-950 dark:to-orange-950">
          <CardHeader>
            <CardTitle>Climb the Ranks!</CardTitle>
            <CardDescription>
              Complete courses, challenges, and projects to earn XP and climb the leaderboard
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="flex items-start gap-3">
                <Badge className="bg-yellow-500 shrink-0">
                  <Trophy className="h-3 w-3" />
                </Badge>
                <div>
                  <div className="font-semibold text-sm">Complete Courses</div>
                  <div className="text-xs text-muted-foreground">
                    Finish modules and earn up to 10,000 XP per course
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Badge className="bg-orange-500 shrink-0">
                  <Trophy className="h-3 w-3" />
                </Badge>
                <div>
                  <div className="font-semibold text-sm">Win Challenges</div>
                  <div className="text-xs text-muted-foreground">
                    Complete coding challenges for bonus XP
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Badge className="bg-red-500 shrink-0">
                  <Trophy className="h-3 w-3" />
                </Badge>
                <div>
                  <div className="font-semibold text-sm">Build Projects</div>
                  <div className="text-xs text-muted-foreground">
                    Finish real-world projects for massive XP rewards
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
