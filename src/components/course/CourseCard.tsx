import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import Link from "next/link";
import { Clock, Users, Star, Trophy, CheckCircle } from "lucide-react";

interface CourseCardProps {
  course: {
    id: string;
    title: string;
    description?: string;
    instructor?: string;
    thumbnail?: string;
    rating?: number;
    students?: number | string;
    duration?: number | string;
    price?: number;
    level?: string;
  };
  progress?: number;
  showProgress?: boolean;
  enrolled?: boolean;
  className?: string;
}

export function CourseCard({
  course,
  progress = 0,
  showProgress = false,
  enrolled = false,
  className = "",
}: CourseCardProps) {
  const isCompleted = progress >= 100;

  return (
    <Card className={`hover:shadow-lg transition-all ${className}`}>
      <CardHeader>
        {/* Thumbnail */}
        <div className="aspect-video bg-muted rounded-md mb-4 overflow-hidden relative">
          {course.thumbnail ? (
            <img
              src={course.thumbnail}
              alt={course.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900">
              <Trophy className="h-12 w-12 text-muted-foreground" />
            </div>
          )}

          {/* Status Badge */}
          {enrolled && (
            <div className="absolute top-2 right-2">
              {isCompleted ? (
                <Badge className="bg-green-600 hover:bg-green-700">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  Completed
                </Badge>
              ) : (
                <Badge className="bg-blue-600 hover:bg-blue-700">
                  In Progress
                </Badge>
              )}
            </div>
          )}

          {/* Level Badge */}
          {course.level && (
            <div className="absolute top-2 left-2">
              <Badge variant="secondary">{course.level}</Badge>
            </div>
          )}
        </div>

        {/* Title & Instructor */}
        <CardTitle className="line-clamp-2 text-lg">{course.title}</CardTitle>
        {course.instructor && (
          <CardDescription className="text-sm">{course.instructor}</CardDescription>
        )}
      </CardHeader>

      <CardContent>
        {/* Description */}
        {course.description && (
          <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
            {course.description}
          </p>
        )}

        {/* Progress Bar */}
        {showProgress && enrolled && (
          <div className="mb-4">
            <div className="flex items-center justify-between text-sm mb-2">
              <span className="text-muted-foreground">Progress</span>
              <span className="font-medium">{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        )}

        {/* Course Stats */}
        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
          {course.rating !== undefined && (
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span>{course.rating}</span>
            </div>
          )}
          {course.students !== undefined && (
            <div className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              <span>{typeof course.students === 'number' ? course.students.toLocaleString() : course.students}</span>
            </div>
          )}
          {course.duration !== undefined && (
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{typeof course.duration === 'number' ? `${Math.floor(course.duration / 60)}h` : course.duration}</span>
            </div>
          )}
        </div>

        {/* Action Button & Price */}
        <div className="flex items-center justify-between">
          {course.price !== undefined && !enrolled && (
            <span className="text-2xl font-bold">${course.price}</span>
          )}
          <Link
            href={
              enrolled
                ? `/courses/${course.id}/learn`
                : `/courses/${course.id}`
            }
            className={course.price !== undefined && !enrolled ? "" : "w-full"}
          >
            <Button className={course.price !== undefined && !enrolled ? "" : "w-full"}>
              {enrolled
                ? isCompleted
                  ? "Review Course"
                  : "Continue Learning"
                : "View Details"}
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
