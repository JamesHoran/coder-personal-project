import { GamifiedCourse, Phase, Module } from "@/types";

// Phase 1: SQL Fundamentals
const phase1Modules: Module[] = [
  {
    id: "sql-1.1",
    phaseId: "sql-phase-1",
    number: "1.1",
    title: "SELECT & Filtering Basics",
    questName: "The Query Apprentice",
    description:
      "Master the fundamentals of SQL queries including SELECT, WHERE, ORDER BY, and LIMIT. Learn to filter and retrieve exactly the data you need.",
    learningObjectives: [
      "Write basic SELECT statements",
      "Filter data with WHERE clause",
      "Use multiple conditions (AND, OR)",
      "Master LIKE pattern matching",
      "Use IN operator effectively",
      "Filter with BETWEEN",
      "Handle NULL values",
      "Sort results with ORDER BY",
      "Implement pagination with LIMIT/OFFSET",
    ],
    projects: [
      {
        id: "sql-1.1-p1",
        name: "User Analytics Dashboard",
        description:
          "Build queries to analyze user signup patterns, active users, and user demographics from a users table",
        xp: 100,
        successCriteria: [
          "Find users who signed up in the last 30 days",
          "Get top 10 most recently active users",
          "Filter users by email domain",
          "List users with missing profile information",
          "Create a paginated user list",
        ],
        timeEstimate: "2-3 hours",
      },
      {
        id: "sql-1.1-p2",
        name: "Product Catalog Filter",
        description:
          "Create queries to filter and sort products for an e-commerce site",
        xp: 100,
        successCriteria: [
          "Find products in specific price range",
          "Filter by multiple categories",
          "Search products by name pattern",
          "Sort by price and popularity",
          "Implement product pagination",
        ],
        timeEstimate: "2-3 hours",
      },
    ],
    challenges: [
      {
        id: "sql-1.1-c1",
        name: "Query Master",
        description: "Write 20 different SELECT queries",
        xp: 75,
        difficulty: "beginner",
        type: "completion",
      },
      {
        id: "sql-1.1-c2",
        name: "Filter Expert",
        description: "Use all WHERE clause operators",
        xp: 75,
        difficulty: "beginner",
        type: "completion",
      },
      {
        id: "sql-1.1-c3",
        name: "Pattern Matcher",
        description: "Master LIKE with 10 different patterns",
        xp: 50,
        difficulty: "beginner",
        type: "completion",
      },
    ],
  },
  {
    id: "sql-1.2",
    phaseId: "sql-phase-1",
    number: "1.2",
    title: "Aggregate Functions & GROUP BY",
    questName: "The Aggregation Alchemist",
    description:
      "Master SQL aggregate functions to calculate totals, averages, and counts. Learn to group data and filter aggregated results with HAVING.",
    learningObjectives: [
      "Use COUNT, SUM, AVG, MIN, MAX",
      "Understand DISTINCT in aggregations",
      "Master GROUP BY fundamentals",
      "Filter aggregated data with HAVING",
      "Group by multiple columns",
      "Combine aggregations with WHERE",
      "Calculate business metrics",
      "Handle NULL in aggregations",
    ],
    projects: [
      {
        id: "sql-1.2-p1",
        name: "Sales Analytics Report",
        description:
          "Build comprehensive sales reports with revenue calculations, order statistics, and customer metrics",
        xp: 150,
        successCriteria: [
          "Calculate total revenue by period",
          "Find average order value",
          "Count orders per customer",
          "Identify top spending customers",
          "Calculate monthly sales trends",
        ],
        timeEstimate: "3-4 hours",
      },
      {
        id: "sql-1.2-p2",
        name: "Employee Department Stats",
        description:
          "Analyze employee data to calculate department-level statistics and identify trends",
        xp: 150,
        successCriteria: [
          "Calculate average salary by department",
          "Count employees per department",
          "Find departments with high salaries",
          "Identify salary ranges by department",
          "Calculate department budgets",
        ],
        timeEstimate: "3-4 hours",
      },
    ],
    challenges: [
      {
        id: "sql-1.2-c1",
        name: "Aggregation Master",
        description: "Use all aggregate functions",
        xp: 100,
        difficulty: "intermediate",
        type: "completion",
      },
      {
        id: "sql-1.2-c2",
        name: "Grouping Expert",
        description: "Write 15 GROUP BY queries",
        xp: 125,
        difficulty: "intermediate",
        type: "completion",
      },
      {
        id: "sql-1.2-c3",
        name: "HAVING Specialist",
        description: "Filter aggregated results in 10 scenarios",
        xp: 100,
        difficulty: "intermediate",
        type: "completion",
      },
    ],
  },
  {
    id: "sql-1.3",
    phaseId: "sql-phase-1",
    number: "1.3",
    title: "JOINs - The Critical Skill",
    questName: "The Join Journeyman",
    description:
      "Master the art of combining data from multiple tables. Learn INNER JOIN, LEFT JOIN, RIGHT JOIN, and complex multi-table joins.",
    learningObjectives: [
      "Understand JOIN fundamentals",
      "Master INNER JOIN",
      "Use LEFT JOIN effectively",
      "Understand RIGHT JOIN",
      "Write multi-table joins",
      "Join tables with multiple conditions",
      "Use self-joins",
      "Combine JOINs with WHERE and GROUP BY",
    ],
    projects: [
      {
        id: "sql-1.3-p1",
        name: "Customer Order Analysis",
        description:
          "Join customers, orders, and products tables to analyze purchasing patterns and customer behavior",
        xp: 200,
        successCriteria: [
          "List customers with their order counts",
          "Find customers who never ordered",
          "Get customer order history with details",
          "Calculate customer lifetime value",
          "Identify top products per customer",
        ],
        timeEstimate: "4-5 hours",
      },
      {
        id: "sql-1.3-p2",
        name: "Employee Hierarchy Navigator",
        description:
          "Use self-joins to navigate employee-manager relationships and build organizational insights",
        xp: 200,
        successCriteria: [
          "List employees with their managers",
          "Find managers with most reports",
          "Identify employees without managers",
          "Calculate team sizes",
          "Build department hierarchies",
        ],
        timeEstimate: "4-5 hours",
      },
    ],
    challenges: [
      {
        id: "sql-1.3-c1",
        name: "JOIN Master",
        description: "Write 20 different JOIN queries",
        xp: 150,
        difficulty: "intermediate",
        type: "completion",
      },
      {
        id: "sql-1.3-c2",
        name: "LEFT JOIN Expert",
        description: "Find missing relationships in 10 scenarios",
        xp: 125,
        difficulty: "intermediate",
        type: "completion",
      },
      {
        id: "sql-1.3-c3",
        name: "Multi-Table Wizard",
        description: "Join 4+ tables successfully",
        xp: 175,
        difficulty: "advanced",
        type: "completion",
      },
      {
        id: "sql-1.3-c4",
        name: "Boss Challenge",
        description: "Complex e-commerce analytics with 5+ tables",
        xp: 250,
        difficulty: "advanced",
        type: "boss",
      },
    ],
  },
];

// Phase 2: Intermediate SQL
const phase2Modules: Module[] = [
  {
    id: "sql-2.1",
    phaseId: "sql-phase-2",
    number: "2.1",
    title: "Subqueries",
    questName: "The Subquery Sage",
    description:
      "Master subqueries to write powerful nested queries. Learn to use subqueries in WHERE, SELECT, and FROM clauses.",
    learningObjectives: [
      "Write subqueries in WHERE clause",
      "Use subqueries with IN operator",
      "Create subqueries in SELECT",
      "Use subqueries in FROM (derived tables)",
      "Write correlated subqueries",
      "Understand subquery performance",
      "Compare values with subqueries",
      "Use EXISTS with subqueries",
    ],
    projects: [
      {
        id: "sql-2.1-p1",
        name: "Performance Comparison Engine",
        description:
          "Build queries to compare individual performance against averages and identify outliers",
        xp: 200,
        successCriteria: [
          "Find employees earning above department average",
          "Identify products with above-average prices",
          "Get users with more than average orders",
          "Find departments with highest average salary",
          "Identify second highest values by category",
        ],
        timeEstimate: "4-5 hours",
      },
      {
        id: "sql-2.1-p2",
        name: "Advanced Filter System",
        description:
          "Use subqueries to implement complex filtering logic for business reports",
        xp: 200,
        successCriteria: [
          "Filter based on aggregate calculations",
          "Find records matching complex criteria",
          "Use correlated subqueries effectively",
          "Implement dynamic filtering",
          "Optimize subquery performance",
        ],
        timeEstimate: "4-5 hours",
      },
    ],
    challenges: [
      {
        id: "sql-2.1-c1",
        name: "Subquery Apprentice",
        description: "Write 15 basic subqueries",
        xp: 150,
        difficulty: "intermediate",
        type: "completion",
      },
      {
        id: "sql-2.1-c2",
        name: "Correlated Query Master",
        description: "Write 10 correlated subqueries",
        xp: 200,
        difficulty: "advanced",
        type: "completion",
      },
      {
        id: "sql-2.1-c3",
        name: "Performance Hunter",
        description: "Optimize 5 slow subqueries",
        xp: 175,
        difficulty: "advanced",
        type: "completion",
      },
    ],
  },
  {
    id: "sql-2.2",
    phaseId: "sql-phase-2",
    number: "2.2",
    title: "Common Table Expressions (CTEs)",
    questName: "The CTE Craftsman",
    description:
      "Master CTEs for writing clean, maintainable queries. Learn to chain multiple CTEs and use recursive CTEs.",
    learningObjectives: [
      "Write basic CTEs",
      "Chain multiple CTEs",
      "Reuse CTE results",
      "Improve query readability",
      "Use CTEs for complex calculations",
      "Understand recursive CTEs",
      "Compare CTEs vs subqueries",
      "Optimize CTE performance",
    ],
    projects: [
      {
        id: "sql-2.2-p1",
        name: "Revenue Growth Analyzer",
        description:
          "Build a comprehensive revenue analysis system using CTEs to calculate growth rates and trends",
        xp: 250,
        successCriteria: [
          "Calculate month-over-month growth",
          "Identify customers in top 10% spending",
          "Build multi-step revenue calculations",
          "Compare periods with CTEs",
          "Create reusable metric calculations",
        ],
        timeEstimate: "5-6 hours",
      },
      {
        id: "sql-2.2-p2",
        name: "Organizational Chart Builder",
        description:
          "Use recursive CTEs to build employee hierarchies and organizational structures",
        xp: 250,
        successCriteria: [
          "Build complete org chart",
          "Calculate hierarchy levels",
          "Find all subordinates",
          "Identify reporting chains",
          "Calculate team sizes recursively",
        ],
        timeEstimate: "5-6 hours",
      },
    ],
    challenges: [
      {
        id: "sql-2.2-c1",
        name: "CTE Master",
        description: "Write 20 queries using CTEs",
        xp: 175,
        difficulty: "intermediate",
        type: "completion",
      },
      {
        id: "sql-2.2-c2",
        name: "Chain Builder",
        description: "Chain 5+ CTEs in a single query",
        xp: 200,
        difficulty: "advanced",
        type: "completion",
      },
      {
        id: "sql-2.2-c3",
        name: "Recursive Expert",
        description: "Master recursive CTEs in 5 scenarios",
        xp: 225,
        difficulty: "advanced",
        type: "completion",
      },
      {
        id: "sql-2.2-c4",
        name: "Boss Challenge",
        description: "Build complex analytics dashboard with CTEs",
        xp: 350,
        difficulty: "expert",
        type: "boss",
      },
    ],
  },
  {
    id: "sql-2.3",
    phaseId: "sql-phase-2",
    number: "2.3",
    title: "Window Functions",
    questName: "The Window Wizard",
    description:
      "Master window functions for advanced analytics. Learn ROW_NUMBER, RANK, LAG, LEAD, and running calculations.",
    learningObjectives: [
      "Understand window function basics",
      "Use ROW_NUMBER for ranking",
      "Master RANK and DENSE_RANK",
      "Calculate running totals",
      "Use LAG and LEAD for comparisons",
      "Implement moving averages",
      "Use NTILE for percentiles",
      "Combine window functions with partitions",
    ],
    projects: [
      {
        id: "sql-2.3-p1",
        name: "Top Performers Dashboard",
        description:
          "Build a ranking system to identify top performers across different categories and time periods",
        xp: 300,
        successCriteria: [
          "Rank top earners per department",
          "Find top 3 products each month",
          "Identify top customers by segment",
          "Calculate percentile rankings",
          "Build leaderboards with window functions",
        ],
        timeEstimate: "6-7 hours",
      },
      {
        id: "sql-2.3-p2",
        name: "Growth Metrics Calculator",
        description:
          "Use window functions to calculate period-over-period growth and trends",
        xp: 300,
        successCriteria: [
          "Calculate month-over-month growth",
          "Build running total reports",
          "Implement moving averages",
          "Compare with previous periods",
          "Identify growth trends",
        ],
        timeEstimate: "6-7 hours",
      },
    ],
    challenges: [
      {
        id: "sql-2.3-c1",
        name: "Window Function Initiate",
        description: "Use all window functions",
        xp: 200,
        difficulty: "intermediate",
        type: "completion",
      },
      {
        id: "sql-2.3-c2",
        name: "Ranking Master",
        description: "Solve 15 ranking problems",
        xp: 225,
        difficulty: "advanced",
        type: "completion",
      },
      {
        id: "sql-2.3-c3",
        name: "Analytics Expert",
        description: "Build 10 analytical reports",
        xp: 250,
        difficulty: "advanced",
        type: "completion",
      },
      {
        id: "sql-2.3-c4",
        name: "Boss Challenge",
        description: "Build complete analytics suite with window functions",
        xp: 400,
        difficulty: "expert",
        type: "boss",
      },
    ],
  },
];

// Phase 3: Advanced Topics
const phase3Modules: Module[] = [
  {
    id: "sql-3.1",
    phaseId: "sql-phase-3",
    number: "3.1",
    title: "Query Optimization",
    questName: "The Performance Optimizer",
    description:
      "Master query optimization, indexing strategies, and EXPLAIN plans. Learn to write fast, efficient SQL.",
    learningObjectives: [
      "Understand query execution plans",
      "Read EXPLAIN output",
      "Create effective indexes",
      "Optimize JOIN performance",
      "Avoid N+1 query problems",
      "Use EXPLAIN ANALYZE",
      "Identify slow queries",
      "Optimize subqueries",
    ],
    projects: [
      {
        id: "sql-3.1-p1",
        name: "Query Performance Audit",
        description:
          "Analyze and optimize a set of slow queries, improving performance by 10x or more",
        xp: 300,
        successCriteria: [
          "Identify slow queries",
          "Read and analyze EXPLAIN plans",
          "Add appropriate indexes",
          "Rewrite inefficient queries",
          "Measure performance improvements",
        ],
        timeEstimate: "6-7 hours",
      },
      {
        id: "sql-3.1-p2",
        name: "Index Strategy Designer",
        description:
          "Design an optimal indexing strategy for a complex database schema",
        xp: 300,
        successCriteria: [
          "Analyze query patterns",
          "Design composite indexes",
          "Balance read/write performance",
          "Avoid over-indexing",
          "Document index strategy",
        ],
        timeEstimate: "6-7 hours",
      },
    ],
    challenges: [
      {
        id: "sql-3.1-c1",
        name: "EXPLAIN Master",
        description: "Read 20 EXPLAIN plans",
        xp: 200,
        difficulty: "advanced",
        type: "completion",
      },
      {
        id: "sql-3.1-c2",
        name: "Index Expert",
        description: "Create optimal indexes for 15 queries",
        xp: 225,
        difficulty: "advanced",
        type: "completion",
      },
      {
        id: "sql-3.1-c3",
        name: "Optimization Guru",
        description: "Achieve 10x improvement on 5 queries",
        xp: 275,
        difficulty: "expert",
        type: "completion",
      },
    ],
  },
  {
    id: "sql-3.2",
    phaseId: "sql-phase-3",
    number: "3.2",
    title: "Real-World Scenarios",
    questName: "The SQL Architect",
    description:
      "Master common interview patterns and real-world SQL scenarios including Nth highest, duplicates, pivots, and cohort analysis.",
    learningObjectives: [
      "Find Nth highest values",
      "Identify and remove duplicates",
      "Handle date calculations",
      "Pivot data with CASE",
      "Implement cohort analysis",
      "Find gaps in sequences",
      "Handle consecutive events",
      "Solve complex business problems",
    ],
    projects: [
      {
        id: "sql-3.2-p1",
        name: "Customer Retention Analyzer",
        description:
          "Build a cohort analysis system to track customer retention over time",
        xp: 400,
        successCriteria: [
          "Build cohort tables",
          "Calculate retention rates",
          "Track customer lifecycle",
          "Identify churn patterns",
          "Generate retention reports",
        ],
        timeEstimate: "8-10 hours",
      },
      {
        id: "sql-3.2-p2",
        name: "Data Quality Auditor",
        description:
          "Create a comprehensive system to find duplicates, gaps, and data quality issues",
        xp: 400,
        successCriteria: [
          "Detect duplicate records",
          "Find gaps in sequences",
          "Identify orphaned records",
          "Validate data integrity",
          "Generate quality reports",
        ],
        timeEstimate: "8-10 hours",
      },
    ],
    challenges: [
      {
        id: "sql-3.2-c1",
        name: "Pattern Master",
        description: "Solve 20 common SQL patterns",
        xp: 300,
        difficulty: "expert",
        type: "completion",
      },
      {
        id: "sql-3.2-c2",
        name: "Date Wizard",
        description: "Master 15 date calculation scenarios",
        xp: 250,
        difficulty: "advanced",
        type: "completion",
      },
      {
        id: "sql-3.2-c3",
        name: "Pivot Expert",
        description: "Create 10 pivot transformations",
        xp: 275,
        difficulty: "advanced",
        type: "completion",
      },
      {
        id: "sql-3.2-c4",
        name: "Boss Challenge",
        description: "Build complete business intelligence system",
        xp: 500,
        difficulty: "expert",
        type: "boss",
      },
    ],
  },
];

// Phase 4: Interview Prep
const phase4Modules: Module[] = [
  {
    id: "sql-4.1",
    phaseId: "sql-phase-4",
    number: "4.1",
    title: "SQL Interview Mastery",
    questName: "The Interview Champion",
    description:
      "Master SQL interview questions from easy to hard. Practice common patterns and learn to explain your solutions.",
    learningObjectives: [
      "Solve basic interview questions",
      "Master medium difficulty problems",
      "Tackle hard interview questions",
      "Explain query logic clearly",
      "Discuss performance tradeoffs",
      "Handle edge cases",
      "Write clean, readable SQL",
      "Think out loud during interviews",
    ],
    projects: [
      {
        id: "sql-4.1-p1",
        name: "LeetCode SQL Marathon",
        description:
          "Solve 50 SQL problems from LeetCode covering all difficulty levels and patterns",
        xp: 400,
        successCriteria: [
          "Solve 20 easy problems",
          "Solve 20 medium problems",
          "Solve 10 hard problems",
          "Achieve 90%+ accuracy",
          "Complete within time limits",
        ],
        timeEstimate: "10-12 hours",
      },
      {
        id: "sql-4.1-p2",
        name: "Mock Interview Practice",
        description:
          "Complete 10 timed mock SQL interviews simulating real interview conditions",
        xp: 400,
        successCriteria: [
          "Complete 10 mock interviews",
          "Pass 80% of questions",
          "Explain solutions clearly",
          "Discuss optimizations",
          "Handle follow-up questions",
        ],
        timeEstimate: "8-10 hours",
      },
    ],
    challenges: [
      {
        id: "sql-4.1-c1",
        name: "Easy Dominator",
        description: "Solve 30 easy problems",
        xp: 200,
        difficulty: "intermediate",
        type: "completion",
      },
      {
        id: "sql-4.1-c2",
        name: "Medium Master",
        description: "Solve 30 medium problems",
        xp: 300,
        difficulty: "advanced",
        type: "completion",
      },
      {
        id: "sql-4.1-c3",
        name: "Hard Conqueror",
        description: "Solve 20 hard problems",
        xp: 400,
        difficulty: "expert",
        type: "completion",
      },
      {
        id: "sql-4.1-c4",
        name: "Boss Challenge",
        description: "Pass 3 consecutive mock interviews with 100% score",
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
    id: "sql-phase-1",
    courseId: "sql-course",
    number: 1,
    title: "SQL Fundamentals",
    level: "SQL Novice",
    duration: "4-5 hours",
    modules: phase1Modules,
  },
  {
    id: "sql-phase-2",
    courseId: "sql-course",
    number: 2,
    title: "Intermediate SQL",
    level: "SQL Practitioner",
    duration: "5-6 hours",
    modules: phase2Modules,
  },
  {
    id: "sql-phase-3",
    courseId: "sql-course",
    number: 3,
    title: "Advanced Topics",
    level: "SQL Expert",
    duration: "5-6 hours",
    modules: phase3Modules,
  },
  {
    id: "sql-phase-4",
    courseId: "sql-course",
    number: 4,
    title: "Interview Preparation",
    level: "Interview Ready",
    duration: "3-4 hours",
    modules: phase4Modules,
  },
];

// Level thresholds
const levelThresholds = [
  { level: 1, minXP: 0, title: "SQL Novice" },
  { level: 2, minXP: 300, title: "SQL Novice" },
  { level: 3, minXP: 600, title: "SQL Novice" },
  { level: 4, minXP: 1000, title: "Query Apprentice" },
  { level: 5, minXP: 1500, title: "Query Apprentice" },
  { level: 6, minXP: 2000, title: "SQL Practitioner" },
  { level: 7, minXP: 2600, title: "SQL Practitioner" },
  { level: 8, minXP: 3200, title: "SQL Practitioner" },
  { level: 9, minXP: 3800, title: "JOIN Master" },
  { level: 10, minXP: 4500, title: "JOIN Master" },
  { level: 11, minXP: 5200, title: "SQL Expert" },
  { level: 12, minXP: 6000, title: "SQL Expert" },
  { level: 13, minXP: 6800, title: "SQL Expert" },
  { level: 14, minXP: 7600, title: "SQL Expert" },
  { level: 15, minXP: 8500, title: "Query Optimizer" },
  { level: 16, minXP: 9500, title: "Query Optimizer" },
  { level: 17, minXP: 10500, title: "SQL Architect" },
  { level: 18, minXP: 11500, title: "SQL Architect" },
  { level: 19, minXP: 12500, title: "Interview Ready" },
  { level: 20, minXP: 14000, title: "SQL Master" },
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

// SQL Essentials course definition
export const sqlCourse: GamifiedCourse = {
  id: "sql-course",
  title: "SQL Essentials for Interviews & Work",
  description:
    "Master SQL for Professional Development Success. Learn exactly what you need to pass technical interviews and excel in professional development roles.",
  instructor: {
    id: "instructor-3",
    userId: "user-3",
    name: "SQL Expert Team",
    bio: "Database professionals with years of experience in SQL optimization and data engineering",
    expertise: [
      "SQL",
      "Database Design",
      "Query Optimization",
      "Data Analysis",
    ],
    coursesCount: 2,
    studentsCount: 12000,
    rating: 4.9,
  },
  thumbnail: "/images/courses/sql-course.jpg",
  price: 0,
  enrollmentCount: 0,
  rating: 4.9,
  duration: 1080, // 18 hours in minutes (15-20 hour range)
  level: "beginner",
  category: "Database",
  lessons: [],
  type: "gamified",
  phases,
  totalXP,
  levelThresholds,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

export default sqlCourse;
