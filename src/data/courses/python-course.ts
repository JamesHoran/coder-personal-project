import type { GamifiedCourse, Phase, Module } from "@/types";

// Phase 1: Python Fundamentals
const phase1Modules: Module[] = [
  {
    id: "python-1.1",
    phaseId: "python-phase-1",
    number: "1.1",
    title: "Basic Syntax & Data Types",
    questName: "The Python Foundation",
    description:
      "Master Python's core syntax including variables, types, strings, and type conversion.",
    learningObjectives: [
      "Understand Python variables and naming conventions",
      "Master different data types (str, int, float, bool, None)",
      "Learn type checking and conversion",
      "Master string operations and formatting",
      "Understand string immutability",
      "Learn f-strings and format methods",
      "Master common string methods",
    ],
    projects: [
      {
        id: "python-1.1-p1",
        name: "Text Processing Utility",
        description:
          "Build a text analysis tool that processes strings and displays statistics",
        xp: 100,
        successCriteria: [
          "Count words, characters, and lines",
          "Convert case and format text",
          "Find and replace substrings",
          "Use multiple string methods",
        ],
        timeEstimate: "2-3 hours",
      },
    ],
    challenges: [
      {
        id: "python-1.1-c1",
        name: "Type Master",
        description: "Work with all basic Python types correctly",
        xp: 50,
        difficulty: "beginner",
        type: "completion",
      },
      {
        id: "python-1.1-c2",
        name: "String Manipulator",
        description: "Use 15 different string methods successfully",
        xp: 75,
        difficulty: "beginner",
        type: "completion",
      },
      {
        id: "python-1.1-c3",
        name: "Format Wizard",
        description: "Master f-strings, format(), and % formatting",
        xp: 75,
        difficulty: "intermediate",
        type: "completion",
      },
    ],
  },
  {
    id: "python-1.2",
    phaseId: "python-phase-1",
    number: "1.2",
    title: "Lists - Critical for Interviews",
    questName: "List Master's Journey",
    description:
      "Master Python lists including slicing, comprehensions, and common operations essential for coding interviews.",
    learningObjectives: [
      "Master list creation and accessing elements",
      "Learn list slicing techniques",
      "Understand list methods (append, extend, insert, remove, pop)",
      "Master list comprehensions",
      "Learn sorting and searching",
      "Understand list unpacking",
      "Use built-in functions (max, min, sum, any, all)",
    ],
    projects: [
      {
        id: "python-1.2-p1",
        name: "Data Analyzer",
        description:
          "Build a tool to analyze and manipulate lists of numbers and data",
        xp: 150,
        successCriteria: [
          "Sort and filter data",
          "Use list comprehensions",
          "Calculate statistics (mean, median, mode)",
          "Handle edge cases",
        ],
        timeEstimate: "3-4 hours",
      },
      {
        id: "python-1.2-p2",
        name: "List Operations Playground",
        description:
          "Interactive tool demonstrating all list operations",
        xp: 100,
        successCriteria: [
          "Demonstrate slicing operations",
          "Show list methods in action",
          "Implement list comprehensions",
          "Handle user input",
        ],
        timeEstimate: "2-3 hours",
      },
    ],
    challenges: [
      {
        id: "python-1.2-c1",
        name: "Slicing Expert",
        description: "Master 10 different slicing patterns",
        xp: 100,
        difficulty: "intermediate",
        type: "completion",
      },
      {
        id: "python-1.2-c2",
        name: "Comprehension King",
        description: "Write 15 complex list comprehensions",
        xp: 125,
        difficulty: "intermediate",
        type: "completion",
      },
      {
        id: "python-1.2-c3",
        name: "Boss Challenge",
        description: "Solve 20 list manipulation problems",
        xp: 200,
        difficulty: "advanced",
        type: "boss",
      },
    ],
  },
  {
    id: "python-1.3",
    phaseId: "python-phase-1",
    number: "1.3",
    title: "Dictionaries - Critical for Interviews",
    questName: "Dictionary Dynamo",
    description:
      "Master Python dictionaries, the most important data structure for interviews and real-world applications.",
    learningObjectives: [
      "Understand dictionary creation and access",
      "Master dictionary methods (keys, values, items, get, pop, update)",
      "Learn dictionary comprehensions",
      "Use defaultdict and Counter",
      "Handle missing keys safely",
      "Master frequency counting patterns",
      "Understand dictionary iteration",
    ],
    projects: [
      {
        id: "python-1.3-p1",
        name: "Frequency Counter",
        description:
          "Build a tool to analyze text and count word/character frequency",
        xp: 150,
        successCriteria: [
          "Count character frequency",
          "Count word frequency",
          "Use Counter from collections",
          "Display top N frequent items",
        ],
        timeEstimate: "3-4 hours",
      },
      {
        id: "python-1.3-p2",
        name: "JSON Data Processor",
        description:
          "Process and transform JSON data using dictionaries",
        xp: 175,
        successCriteria: [
          "Parse JSON data",
          "Transform nested dictionaries",
          "Merge and filter data",
          "Export processed data",
        ],
        timeEstimate: "4-5 hours",
      },
    ],
    challenges: [
      {
        id: "python-1.3-c1",
        name: "Dictionary Master",
        description: "Use all dictionary methods correctly",
        xp: 100,
        difficulty: "intermediate",
        type: "completion",
      },
      {
        id: "python-1.3-c2",
        name: "Comprehension Pro",
        description: "Write 10 complex dictionary comprehensions",
        xp: 125,
        difficulty: "intermediate",
        type: "completion",
      },
      {
        id: "python-1.3-c3",
        name: "Collections Expert",
        description: "Master defaultdict, Counter, and OrderedDict",
        xp: 150,
        difficulty: "advanced",
        type: "completion",
      },
      {
        id: "python-1.3-c4",
        name: "Boss Challenge",
        description: "Solve 25 dictionary-based coding problems",
        xp: 250,
        difficulty: "advanced",
        type: "boss",
      },
    ],
  },
  {
    id: "python-1.4",
    phaseId: "python-phase-1",
    number: "1.4",
    title: "Sets & Tuples",
    questName: "Data Structure Specialist",
    description:
      "Master sets for unique elements and set operations, and tuples for immutable data.",
    learningObjectives: [
      "Understand set operations (union, intersection, difference)",
      "Master set methods (add, remove, discard)",
      "Learn when to use sets vs lists",
      "Understand tuple immutability",
      "Master tuple unpacking",
      "Learn named tuples",
      "Use sets to remove duplicates",
    ],
    projects: [
      {
        id: "python-1.4-p1",
        name: "Set Operations Toolkit",
        description:
          "Build a tool to demonstrate set operations and use cases",
        xp: 125,
        successCriteria: [
          "Implement all set operations",
          "Remove duplicates from data",
          "Find common elements",
          "Visualize set relationships",
        ],
        timeEstimate: "2-3 hours",
      },
    ],
    challenges: [
      {
        id: "python-1.4-c1",
        name: "Set Master",
        description: "Solve 10 problems using set operations",
        xp: 100,
        difficulty: "intermediate",
        type: "completion",
      },
      {
        id: "python-1.4-c2",
        name: "Tuple Expert",
        description: "Use tuples and named tuples effectively",
        xp: 75,
        difficulty: "beginner",
        type: "completion",
      },
      {
        id: "python-1.4-c3",
        name: "Boss Challenge",
        description: "Build data deduplication system using sets",
        xp: 150,
        difficulty: "advanced",
        type: "boss",
      },
    ],
  },
];

// Phase 2: Control Flow & Functions
const phase2Modules: Module[] = [
  {
    id: "python-2.1",
    phaseId: "python-phase-2",
    number: "2.1",
    title: "Control Flow",
    questName: "Flow Control Master",
    description:
      "Master Python's control flow including conditionals, loops, and iteration patterns.",
    learningObjectives: [
      "Master if/elif/else statements",
      "Learn ternary operators",
      "Understand for loops and range()",
      "Master enumerate and zip",
      "Learn while loops",
      "Understand break, continue, and else with loops",
      "Master iteration patterns",
    ],
    projects: [
      {
        id: "python-2.1-p1",
        name: "Number Pattern Generator",
        description:
          "Generate various number patterns using loops and conditionals",
        xp: 125,
        successCriteria: [
          "Generate multiplication tables",
          "Create pyramid patterns",
          "Generate Fibonacci sequence",
          "Use nested loops effectively",
        ],
        timeEstimate: "3-4 hours",
      },
      {
        id: "python-2.1-p2",
        name: "Data Validator",
        description:
          "Validate and process user input with comprehensive error checking",
        xp: 150,
        successCriteria: [
          "Validate multiple input types",
          "Use complex conditionals",
          "Handle edge cases",
          "Provide clear error messages",
        ],
        timeEstimate: "3-4 hours",
      },
    ],
    challenges: [
      {
        id: "python-2.1-c1",
        name: "Loop Master",
        description: "Write 20 different loop patterns",
        xp: 100,
        difficulty: "intermediate",
        type: "completion",
      },
      {
        id: "python-2.1-c2",
        name: "Iteration Expert",
        description: "Master enumerate, zip, and iteration tools",
        xp: 125,
        difficulty: "intermediate",
        type: "completion",
      },
      {
        id: "python-2.1-c3",
        name: "Boss Challenge",
        description: "Solve 30 control flow problems",
        xp: 200,
        difficulty: "advanced",
        type: "boss",
      },
    ],
  },
  {
    id: "python-2.2",
    phaseId: "python-phase-2",
    number: "2.2",
    title: "Functions - Critical for Interviews",
    questName: "Function Architect",
    description:
      "Master Python functions including parameters, lambda functions, decorators, and closures.",
    learningObjectives: [
      "Create functions with various parameter types",
      "Master *args and **kwargs",
      "Learn lambda functions",
      "Understand higher-order functions (map, filter, reduce)",
      "Master decorators",
      "Understand closures",
      "Learn type hints",
      "Handle function scope",
    ],
    projects: [
      {
        id: "python-2.2-p1",
        name: "Function Library",
        description:
          "Build a library of 20 reusable utility functions",
        xp: 200,
        successCriteria: [
          "20 well-documented functions",
          "Use various parameter types",
          "Include type hints",
          "Handle edge cases",
        ],
        timeEstimate: "5-6 hours",
      },
      {
        id: "python-2.2-p2",
        name: "Decorator Collection",
        description:
          "Create practical decorators for timing, logging, and caching",
        xp: 250,
        successCriteria: [
          "Timing decorator implemented",
          "Logging decorator implemented",
          "Caching decorator implemented",
          "Apply to real functions",
        ],
        timeEstimate: "6-8 hours",
      },
    ],
    challenges: [
      {
        id: "python-2.2-c1",
        name: "Parameter Master",
        description: "Use all parameter types correctly",
        xp: 100,
        difficulty: "intermediate",
        type: "completion",
      },
      {
        id: "python-2.2-c2",
        name: "Lambda Expert",
        description: "Write 15 lambda functions for real scenarios",
        xp: 125,
        difficulty: "intermediate",
        type: "completion",
      },
      {
        id: "python-2.2-c3",
        name: "Decorator Wizard",
        description: "Create 10 custom decorators",
        xp: 150,
        difficulty: "advanced",
        type: "completion",
      },
      {
        id: "python-2.2-c4",
        name: "Boss Challenge",
        description: "Build functional programming toolkit",
        xp: 300,
        difficulty: "expert",
        type: "boss",
      },
    ],
  },
];

// Phase 3: Advanced Python
const phase3Modules: Module[] = [
  {
    id: "python-3.1",
    phaseId: "python-phase-3",
    number: "3.1",
    title: "Object-Oriented Programming",
    questName: "OOP Architect",
    description:
      "Master Python OOP including classes, inheritance, properties, and magic methods.",
    learningObjectives: [
      "Create classes with __init__",
      "Understand instance vs class variables",
      "Master inheritance and polymorphism",
      "Learn @property decorator",
      "Understand magic methods (__str__, __repr__, __add__, etc.)",
      "Master @staticmethod and @classmethod",
      "Learn composition vs inheritance",
    ],
    projects: [
      {
        id: "python-3.1-p1",
        name: "Library Management System",
        description:
          "Build a complete library system using OOP principles",
        xp: 300,
        successCriteria: [
          "Multiple classes with inheritance",
          "Use properties and validation",
          "Implement magic methods",
          "Handle complex relationships",
        ],
        timeEstimate: "8-10 hours",
      },
      {
        id: "python-3.1-p2",
        name: "Custom Data Structures",
        description:
          "Implement Stack, Queue, and LinkedList using classes",
        xp: 350,
        successCriteria: [
          "Stack implementation",
          "Queue implementation",
          "LinkedList implementation",
          "Use magic methods for operations",
        ],
        timeEstimate: "10-12 hours",
      },
    ],
    challenges: [
      {
        id: "python-3.1-c1",
        name: "Class Creator",
        description: "Create 15 well-designed classes",
        xp: 200,
        difficulty: "intermediate",
        type: "completion",
      },
      {
        id: "python-3.1-c2",
        name: "Inheritance Expert",
        description: "Use inheritance in 10 scenarios",
        xp: 175,
        difficulty: "intermediate",
        type: "completion",
      },
      {
        id: "python-3.1-c3",
        name: "Magic Method Master",
        description: "Implement 15 different magic methods",
        xp: 225,
        difficulty: "advanced",
        type: "completion",
      },
      {
        id: "python-3.1-c4",
        name: "Boss Challenge",
        description: "Build complete game using OOP",
        xp: 400,
        difficulty: "expert",
        type: "boss",
      },
    ],
  },
  {
    id: "python-3.2",
    phaseId: "python-phase-3",
    number: "3.2",
    title: "Important Libraries & Tools",
    questName: "Library Master",
    description:
      "Master essential Python libraries including collections, itertools, and file I/O.",
    learningObjectives: [
      "Master collections (Counter, defaultdict, deque, namedtuple)",
      "Learn itertools (combinations, permutations, chain, groupby)",
      "Understand file I/O with context managers",
      "Work with JSON and CSV files",
      "Master error handling (try/except/finally)",
      "Create custom exceptions",
      "Build custom context managers",
    ],
    projects: [
      {
        id: "python-3.2-p1",
        name: "CSV Data Processor",
        description:
          "Build a tool to read, process, and analyze CSV files",
        xp: 275,
        successCriteria: [
          "Read and write CSV files",
          "Process large datasets",
          "Use collections module",
          "Handle errors gracefully",
        ],
        timeEstimate: "6-8 hours",
      },
      {
        id: "python-3.2-p2",
        name: "Log Analyzer",
        description:
          "Analyze log files and generate statistics using itertools and collections",
        xp: 300,
        successCriteria: [
          "Parse log files",
          "Use Counter for statistics",
          "Group data with groupby",
          "Generate reports",
        ],
        timeEstimate: "8-10 hours",
      },
    ],
    challenges: [
      {
        id: "python-3.2-c1",
        name: "Collections Expert",
        description: "Use all collections module tools",
        xp: 200,
        difficulty: "intermediate",
        type: "completion",
      },
      {
        id: "python-3.2-c2",
        name: "Itertools Master",
        description: "Solve 15 problems using itertools",
        xp: 225,
        difficulty: "advanced",
        type: "completion",
      },
      {
        id: "python-3.2-c3",
        name: "File I/O Pro",
        description: "Work with 5 different file formats",
        xp: 175,
        difficulty: "intermediate",
        type: "completion",
      },
      {
        id: "python-3.2-c4",
        name: "Boss Challenge",
        description: "Build ETL pipeline with error handling",
        xp: 500,
        difficulty: "expert",
        type: "boss",
      },
    ],
  },
  {
    id: "python-3.3",
    phaseId: "python-phase-3",
    number: "3.3",
    title: "Interview Patterns",
    questName: "Interview Champion",
    description:
      "Master common Python interview patterns including two pointers, sliding window, and more.",
    learningObjectives: [
      "Master two pointer technique",
      "Learn sliding window pattern",
      "Use hash maps for O(1) lookup",
      "Implement stack for parentheses problems",
      "Master BFS and DFS",
      "Learn dynamic programming with memoization",
      "Understand recursion patterns",
      "Use built-in functions effectively",
    ],
    projects: [
      {
        id: "python-3.3-p1",
        name: "LeetCode Problem Solver",
        description:
          "Solve 50 LeetCode problems using various patterns",
        xp: 500,
        successCriteria: [
          "Solve 50 problems",
          "Use 10 different patterns",
          "Optimize time complexity",
          "Document solutions",
        ],
        timeEstimate: "15-20 hours",
      },
      {
        id: "python-3.3-p2",
        name: "Pattern Recognition Tool",
        description:
          "Build a tool that identifies which pattern to use for problems",
        xp: 400,
        successCriteria: [
          "Categorize problem types",
          "Suggest appropriate patterns",
          "Provide examples",
          "Include time complexity",
        ],
        timeEstimate: "10-12 hours",
      },
    ],
    challenges: [
      {
        id: "python-3.3-c1",
        name: "Two Pointer Pro",
        description: "Solve 20 two-pointer problems",
        xp: 300,
        difficulty: "advanced",
        type: "completion",
      },
      {
        id: "python-3.3-c2",
        name: "Hash Map Expert",
        description: "Solve 25 hash map problems",
        xp: 325,
        difficulty: "advanced",
        type: "completion",
      },
      {
        id: "python-3.3-c3",
        name: "DP Wizard",
        description: "Solve 15 dynamic programming problems",
        xp: 400,
        difficulty: "expert",
        type: "completion",
      },
      {
        id: "python-3.3-c4",
        name: "Boss Challenge",
        description: "Pass mock Python interview",
        xp: 600,
        difficulty: "expert",
        type: "boss",
      },
    ],
  },
];

// Define phases
const phases: Phase[] = [
  {
    id: "python-phase-1",
    courseId: "python-course",
    number: 1,
    title: "Python Fundamentals",
    level: "Python Novice",
    duration: "10-12 hours",
    modules: phase1Modules,
  },
  {
    id: "python-phase-2",
    courseId: "python-course",
    number: 2,
    title: "Control Flow & Functions",
    level: "Python Practitioner",
    duration: "10-12 hours",
    modules: phase2Modules,
  },
  {
    id: "python-phase-3",
    courseId: "python-course",
    number: 3,
    title: "Advanced Python & Interview Prep",
    level: "Python Professional",
    duration: "15-18 hours",
    modules: phase3Modules,
  },
];

// Level thresholds
const levelThresholds = [
  { level: 1, minXP: 0, title: "Python Novice" },
  { level: 2, minXP: 200, title: "Python Novice" },
  { level: 3, minXP: 400, title: "Python Novice" },
  { level: 4, minXP: 650, title: "Python Novice" },
  { level: 5, minXP: 1000, title: "Python Novice" },
  { level: 6, minXP: 1400, title: "Data Structure Master" },
  { level: 7, minXP: 1800, title: "Data Structure Master" },
  { level: 8, minXP: 2200, title: "Data Structure Master" },
  { level: 9, minXP: 2600, title: "Data Structure Master" },
  { level: 10, minXP: 3000, title: "Data Structure Master" },
  { level: 11, minXP: 3500, title: "Function Master" },
  { level: 12, minXP: 4000, title: "Function Master" },
  { level: 13, minXP: 4500, title: "Function Master" },
  { level: 14, minXP: 5000, title: "Function Master" },
  { level: 15, minXP: 5500, title: "Function Master" },
  { level: 16, minXP: 6000, title: "OOP Master" },
  { level: 17, minXP: 6500, title: "OOP Master" },
  { level: 18, minXP: 7000, title: "OOP Master" },
  { level: 19, minXP: 7500, title: "OOP Master" },
  { level: 20, minXP: 8000, title: "OOP Master" },
  { level: 21, minXP: 8500, title: "Tools Master" },
  { level: 22, minXP: 9000, title: "Tools Master" },
  { level: 23, minXP: 9500, title: "Tools Master" },
  { level: 24, minXP: 10000, title: "Tools Master" },
  { level: 25, minXP: 10500, title: "Interview Ready" },
  { level: 26, minXP: 11000, title: "Interview Ready" },
  { level: 27, minXP: 11500, title: "Interview Ready" },
  { level: 28, minXP: 12000, title: "Interview Ready" },
  { level: 29, minXP: 12500, title: "Interview Ready" },
  { level: 30, minXP: 13000, title: "Python Expert" },
];

// Calculate total XP
const totalXP = phases.reduce((phaseSum, phase) => {
  return (
    phaseSum +
    phase.modules.reduce((moduleSum, module) => {
      const projectXP = module.projects.reduce((sum, p) => sum + p.xp, 0);
      const challengeXP = module.challenges.reduce((sum, c) => sum + c.xp, 0);
      return moduleSum + projectXP + challengeXP;
    }, 0)
  );
}, 0);

// Python course definition
export const pythonCourse: GamifiedCourse = {
  id: "python-course",
  title: "Python Essentials for Interviews & Work",
  description:
    "Master Python for Professional Development & Data Roles. From fundamentals to interview patterns in 20-30 hours.",
  instructor: {
    id: "instructor-2",
    userId: "user-2",
    name: "Python Expert Team",
    bio: "Expert Python developers specializing in interviews and production code",
    expertise: [
      "Python",
      "Data Structures",
      "Algorithms",
      "Interview Preparation",
    ],
    coursesCount: 3,
    studentsCount: 8500,
    rating: 4.9,
  },
  thumbnail: "/images/courses/python-course.jpg",
  price: 0,
  enrollmentCount: 0,
  rating: 4.9,
  duration: 1800, // 30 hours in minutes
  level: "beginner",
  category: "Programming Fundamentals",
  lessons: [],
  type: "gamified",
  phases,
  totalXP,
  levelThresholds,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

export default pythonCourse;
