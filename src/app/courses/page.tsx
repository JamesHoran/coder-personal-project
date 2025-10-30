"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Clock, Users, Star } from "lucide-react";
import { gitCourse } from "@/data/gitCourse";
import reactCourse from "@/data/courses/react-course";
import asyncCourse from "@/data/courses/async-course";
import leetcodeCourse from "@/data/courses/leetcode-course";
import sqlCourse from "@/data/courses/sql-course";
import cliSearchCourse from "@/data/courses/cli-search-course";
import pythonCourse from "@/data/courses/python-course";
import jestCourse from "@/data/courses/jest-course";
import { typescriptCourse } from "@/data/courses/typescript-course";
import { FeaturedCourseCard } from "@/components/course/FeaturedCourseCard";
import { useState, useMemo } from "react";

// Define course categories and metadata
const coursesData = [
  {
    ...gitCourse,
    id: "git",
    category: "DevOps & Tools",
    colorScheme: {
      gradient: "from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950",
      badge: "from-yellow-500 to-orange-500",
      button: "bg-primary hover:bg-primary/90",
      icon: "text-yellow-500",
    },
  },
  {
    ...reactCourse,
    id: "react",
    category: "Web Development",
    colorScheme: {
      gradient: "from-cyan-50 to-blue-50 dark:from-cyan-950 dark:to-blue-950",
      badge: "from-cyan-500 to-blue-500",
      button: "bg-cyan-600 hover:bg-cyan-700",
      icon: "text-cyan-500",
    },
  },
  {
    ...asyncCourse,
    id: "async",
    category: "Programming",
    colorScheme: {
      gradient: "from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950",
      badge: "from-purple-500 to-pink-500",
      button: "bg-purple-600 hover:bg-purple-700",
      icon: "text-purple-500",
    },
  },
  {
    ...leetcodeCourse,
    id: "leetcode",
    category: "Interview Prep",
    colorScheme: {
      gradient: "from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950",
      badge: "from-green-500 to-emerald-500",
      button: "bg-green-600 hover:bg-green-700",
      icon: "text-green-500",
    },
    badges: ["Featured", "Interview Prep"],
  },
  {
    ...sqlCourse,
    id: "sql",
    category: "Data & Databases",
    colorScheme: {
      gradient: "from-orange-50 to-red-50 dark:from-orange-950 dark:to-red-950",
      badge: "from-orange-500 to-red-500",
      button: "bg-orange-600 hover:bg-orange-700",
      icon: "text-orange-500",
    },
    badges: ["New", "Interview Prep"],
  },
  {
    ...pythonCourse,
    id: "python",
    category: "Programming",
    colorScheme: {
      gradient: "from-yellow-50 to-amber-50 dark:from-yellow-950 dark:to-amber-950",
      badge: "from-yellow-500 to-amber-500",
      button: "bg-yellow-600 hover:bg-yellow-700",
      icon: "text-yellow-500",
    },
    badges: ["New", "Interview Prep"],
  },
  {
    ...cliSearchCourse,
    id: "cli-search",
    category: "DevOps & Tools",
    colorScheme: {
      gradient: "from-emerald-50 to-teal-50 dark:from-emerald-950 dark:to-teal-950",
      badge: "from-emerald-500 to-teal-500",
      button: "bg-emerald-600 hover:bg-emerald-700",
      icon: "text-emerald-500",
    },
  },
  {
    ...jestCourse,
    id: "jest",
    category: "Web Development",
    colorScheme: {
      gradient: "from-rose-50 to-pink-50 dark:from-rose-950 dark:to-pink-950",
      badge: "from-rose-500 to-pink-500",
      button: "bg-rose-600 hover:bg-rose-700",
      icon: "text-rose-500",
    },
    badges: ["New", "Interview Prep"],
  },
  {
    ...typescriptCourse,
    category: "Web Development",
    colorScheme: {
      gradient: "from-indigo-50 to-blue-50 dark:from-indigo-950 dark:to-blue-950",
      badge: "from-indigo-500 to-blue-500",
      button: "bg-indigo-600 hover:bg-indigo-700",
      icon: "text-indigo-500",
    },
    badges: ["New", "Interview Prep"],
  },
];

export default function CoursesPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  // Get unique categories
  const categories = ["All", "Web Development", "Programming", "DevOps & Tools", "Data & Databases", "Interview Prep"];

  // Filter courses based on selected category
  const filteredCourses = useMemo(() => {
    if (selectedCategory === "All") {
      return coursesData;
    }
    return coursesData.filter((course) => course.category === selectedCategory);
  }, [selectedCategory]);

  // Count courses per category
  const getCategoryCount = (category: string) => {
    if (category === "All") return coursesData.length;
    return coursesData.filter((c) => c.category === category).length;
  };

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">Browse Courses</h1>
          <p className="text-muted-foreground text-lg">
            Explore our comprehensive library of courses across various topics
          </p>
        </div>

        {/* Filters */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-sm font-medium text-muted-foreground">
              Filter by category:
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
              >
                {category}
                <Badge
                  variant={selectedCategory === category ? "secondary" : "outline"}
                  className="ml-2"
                >
                  {getCategoryCount(category)}
                </Badge>
              </Button>
            ))}
          </div>
          {selectedCategory !== "All" && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSelectedCategory("All")}
              className="mt-2"
            >
              Clear filter
            </Button>
          )}
        </div>

        {/* Filtered Courses */}
        {filteredCourses.length > 0 ? (
          <div className="space-y-8">
            {filteredCourses.map((course: any) => (
              <FeaturedCourseCard
                key={course.id}
                course={course}
                colorScheme={course.colorScheme}
                badges={course.badges}
              />
            ))}
          </div>
        ) : (
          <Card className="p-12 text-center">
            <p className="text-muted-foreground">
              No courses found in this category.
            </p>
          </Card>
        )}

        {/* Course Grid - Mock Courses */}
        {selectedCategory === "All" && (
          <>
            <h2 className="text-2xl font-bold mb-6 mt-12">More Courses</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockCourses.map((course) => (
                <Card key={course.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="aspect-video bg-muted rounded-md mb-4"></div>
                    <CardTitle className="line-clamp-2">{course.title}</CardTitle>
                    <CardDescription>{course.instructor}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                      {course.description}
                    </p>

                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span>{course.rating}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        <span>{course.students}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>{course.duration}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold">${course.price}</span>
                      <Link href={`/courses/${course.id}`}>
                        <Button>View Details</Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

const mockCourses = [
  {
    id: "1",
    title: "Complete Web Development Bootcamp",
    instructor: "Dr. Angela Yu",
    description:
      "Become a full-stack web developer with HTML, CSS, JavaScript, React, and Node.js",
    rating: 4.8,
    students: "50,234",
    duration: "65h",
    price: 89.99,
  },
  {
    id: "2",
    title: "Python for Data Science",
    instructor: "Jose Portilla",
    description:
      "Master Python programming and data analysis with pandas, NumPy, and Matplotlib",
    rating: 4.7,
    students: "35,621",
    duration: "42h",
    price: 79.99,
  },
  {
    id: "3",
    title: "Machine Learning A-Z",
    instructor: "Kirill Eremenko",
    description:
      "Learn to create Machine Learning Algorithms in Python and R from industry experts",
    rating: 4.9,
    students: "40,892",
    duration: "44h",
    price: 94.99,
  },
];
