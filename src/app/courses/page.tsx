import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Clock, Users, Star } from "lucide-react";

export default function CoursesPage() {
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
        <div className="mb-8 flex flex-wrap gap-2">
          <Button variant="outline" size="sm">All Categories</Button>
          <Button variant="ghost" size="sm">Web Development</Button>
          <Button variant="ghost" size="sm">Data Science</Button>
          <Button variant="ghost" size="sm">Design</Button>
          <Button variant="ghost" size="sm">Business</Button>
          <Button variant="ghost" size="sm">Marketing</Button>
        </div>

        {/* Course Grid */}
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
      </div>
    </div>
  );
}

const mockCourses = [
  {
    id: "1",
    title: "Complete Web Development Bootcamp",
    instructor: "Dr. Angela Yu",
    description: "Become a full-stack web developer with HTML, CSS, JavaScript, React, and Node.js",
    rating: 4.8,
    students: "50,234",
    duration: "65h",
    price: 89.99,
  },
  {
    id: "2",
    title: "Python for Data Science",
    instructor: "Jose Portilla",
    description: "Master Python programming and data analysis with pandas, NumPy, and Matplotlib",
    rating: 4.7,
    students: "35,621",
    duration: "42h",
    price: 79.99,
  },
  {
    id: "3",
    title: "Machine Learning A-Z",
    instructor: "Kirill Eremenko",
    description: "Learn to create Machine Learning Algorithms in Python and R from industry experts",
    rating: 4.9,
    students: "40,892",
    duration: "44h",
    price: 94.99,
  },
  {
    id: "4",
    title: "React - The Complete Guide",
    instructor: "Maximilian Schwarzmüller",
    description: "Dive deep into React and build amazing projects with hooks, context, and more",
    rating: 4.8,
    students: "28,543",
    duration: "48h",
    price: 84.99,
  },
  {
    id: "5",
    title: "UI/UX Design Masterclass",
    instructor: "Daniel Walter Scott",
    description: "Learn user interface and user experience design with Figma and Adobe XD",
    rating: 4.6,
    students: "22,156",
    duration: "38h",
    price: 74.99,
  },
  {
    id: "6",
    title: "AWS Certified Solutions Architect",
    instructor: "Stephane Maarek",
    description: "Pass the AWS certification exam and master cloud architecture",
    rating: 4.9,
    students: "32,987",
    duration: "52h",
    price: 99.99,
  },
];
