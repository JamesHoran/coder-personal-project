import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Clock, Users, Star, Zap, Trophy } from "lucide-react";

interface FeaturedCourseCardProps {
  course: {
    id?: string;
    title: string;
    description: string;
    totalXP: number;
    rating: number;
    enrollmentCount?: number;
    duration: number;
    price: number;
    phases?: any[];
    instructor?: { studentsCount?: number };
  };
  colorScheme?: {
    gradient: string;
    badge: string;
    button: string;
    icon: string;
  };
  badges?: string[];
}

export function FeaturedCourseCard({
  course,
  colorScheme = {
    gradient: "from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950",
    badge: "from-yellow-500 to-orange-500",
    button: "bg-primary hover:bg-primary/90",
    icon: "text-yellow-500",
  },
  badges = ["New"],
}: FeaturedCourseCardProps) {
  const courseId = course.id || course.title.toLowerCase().replace(/\s+/g, "-");
  const studentCount =
    course.enrollmentCount || course.instructor?.studentsCount || 0;

  return (
    <Card
      className={`mb-8 border-2 border-primary bg-gradient-to-r ${colorScheme.gradient}`}
    >
      <CardHeader>
        <div className="flex items-center gap-2 mb-2">
          <Badge className={`bg-gradient-to-r ${colorScheme.badge}`}>
            <Trophy className="h-3 w-3 mr-1" />
            Gamified Course
          </Badge>
          {badges.map((badge) => (
            <Badge key={badge} variant={badge === "New" ? "secondary" : "outline"}>
              {badge}
            </Badge>
          ))}
        </div>
        <CardTitle className="text-3xl">{course.title}</CardTitle>
        <CardDescription className="text-base">{course.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold mb-3">Course Features</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <Zap className={`h-4 w-4 ${colorScheme.icon}`} />
                Earn {course.totalXP.toLocaleString()} XP through gamified learning
              </li>
              {course.phases && (
                <li className="flex items-center gap-2">
                  <Trophy className={`h-4 w-4 ${colorScheme.icon}`} />
                  Progress through {course.phases.length} phases
                </li>
              )}
              {course.phases && (
                <li className="flex items-center gap-2">
                  <Star className={`h-4 w-4 ${colorScheme.icon}`} />
                  Master{" "}
                  {course.phases.reduce((sum: number, p: any) => sum + (p.modules?.length || 0), 0)}{" "}
                  modules
                </li>
              )}
            </ul>
          </div>
          <div>
            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
              <div className="flex items-center gap-1">
                <Star className={`h-4 w-4 fill-current ${colorScheme.icon}`} />
                <span>{course.rating}</span>
              </div>
              <div className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                <span>{studentCount.toLocaleString()}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>{Math.floor(course.duration / 60)}h</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-3xl font-bold">${course.price}</span>
              <Link href={`/courses/${courseId}`}>
                <Button size="lg" className={colorScheme.button}>
                  Start Learning
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
