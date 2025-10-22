import type { GamifiedCourse, Phase, Module } from "@/types";

// ============================================================================
// PHASE 1: FOUNDATION PHASE (Weeks 1-4)
// Pattern Apprentice
// ============================================================================

// Module 1.1: Arrays & Hashing
const module1_1: Module = {
  id: "leetcode-1.1",
  phaseId: "leetcode-phase-1",
  number: "1.1",
  title: "Arrays & Hashing",
  questName: "Array Master",
  description:
    "Master hash tables for O(1) lookup, frequency counting, array manipulation techniques, and space-time tradeoffs.",
  learningObjectives: [
    "Hash tables for O(1) lookup",
    "Frequency counting patterns",
    "Array manipulation techniques",
    "Space-time tradeoff analysis",
    "Handle edge cases (empty array, single element)",
    "Master hash collision concepts",
  ],
  projects: [
    {
      id: "leetcode-1.1-p1",
      name: "Hash Table Fundamentals",
      description:
        "Solve Contains Duplicate, Valid Anagram, Two Sum, and Majority Element",
      xp: 100,
      successCriteria: [
        "All 4 easy problems solved",
        "O(n) time complexity achieved",
        "Edge cases handled",
      ],
      timeEstimate: "4-6 hours",
    },
    {
      id: "leetcode-1.1-p2",
      name: "Advanced Hashing Patterns",
      description:
        "Complete Group Anagrams, Top K Frequent Elements, Product of Array Except Self, Valid Sudoku",
      xp: 300,
      successCriteria: [
        "All medium problems solved",
        "Optimal solutions implemented",
        "Pattern recognition demonstrated",
      ],
      timeEstimate: "8-12 hours",
    },
    {
      id: "leetcode-1.1-p3",
      name: "Sequence & Prefix Mastery",
      description:
        "Master Longest Consecutive Sequence, Subarray Sum Equals K, Set Matrix Zeroes",
      xp: 150,
      successCriteria: [
        "Prefix sum technique mastered",
        "Hash set for sequences understood",
        "In-place algorithms implemented",
      ],
      timeEstimate: "6-8 hours",
    },
  ],
  challenges: [
    {
      id: "leetcode-1.1-c1",
      name: "Easy Sweep",
      description: "Complete all 4 easy problems in under 2 hours",
      xp: 50,
      difficulty: "beginner",
      type: "speed",
    },
    {
      id: "leetcode-1.1-c2",
      name: "Pattern Recognition",
      description: "Identify hashing pattern in 5 new problems within 1 minute each",
      xp: 75,
      difficulty: "intermediate",
      type: "accuracy",
    },
    {
      id: "leetcode-1.1-c3",
      name: "Boss Challenge: First Missing Positive",
      description: "Solve the hard problem using index as hash map technique",
      xp: 150,
      difficulty: "expert",
      type: "boss",
    },
  ],
};

// Module 1.2: Two Pointers
const module1_2: Module = {
  id: "leetcode-1.2",
  phaseId: "leetcode-phase-1",
  number: "1.2",
  title: "Two Pointers",
  questName: "Pointer Virtuoso",
  description:
    "Master left-right pointers, fast-slow pointers, sliding window variations, and in-place operations.",
  learningObjectives: [
    "Left-right pointer technique",
    "Fast-slow pointers (Floyd's algorithm)",
    "In-place operations",
    "Sorted array optimizations",
    "Cycle detection in linked lists",
  ],
  projects: [
    {
      id: "leetcode-1.2-p1",
      name: "Basic Two Pointers",
      description:
        "Solve Valid Palindrome, Move Zeroes, Remove Duplicates from Sorted Array",
      xp: 100,
      successCriteria: [
        "All easy problems completed",
        "In-place modifications mastered",
        "O(1) space complexity achieved",
      ],
      timeEstimate: "3-4 hours",
    },
    {
      id: "leetcode-1.2-p2",
      name: "Advanced Pointer Techniques",
      description:
        "Complete Two Sum II, 3Sum, Container With Most Water, Remove Nth Node, Linked List Cycle",
      xp: 300,
      successCriteria: [
        "All medium problems solved",
        "Fast-slow pointer mastered",
        "Greedy approach understood",
      ],
      timeEstimate: "10-12 hours",
    },
    {
      id: "leetcode-1.2-p3",
      name: "Complex Two Pointer Scenarios",
      description:
        "Master Sort Colors (Dutch National Flag) and Partition Labels",
      xp: 100,
      successCriteria: [
        "Three-way partitioning understood",
        "Greedy two pointers mastered",
      ],
      timeEstimate: "4-6 hours",
    },
  ],
  challenges: [
    {
      id: "leetcode-1.2-c1",
      name: "Pointer Speed Run",
      description: "Solve 5 two-pointer problems in 90 minutes",
      xp: 75,
      difficulty: "intermediate",
      type: "speed",
    },
    {
      id: "leetcode-1.2-c2",
      name: "Pattern Master",
      description: "Recognize when to use two pointers vs other patterns - 10/10 accuracy",
      xp: 100,
      difficulty: "intermediate",
      type: "accuracy",
    },
    {
      id: "leetcode-1.2-c3",
      name: "Boss Challenge: Trapping Rain Water",
      description: "Solve using optimal two-pointer approach",
      xp: 150,
      difficulty: "expert",
      type: "boss",
    },
  ],
};

// Module 1.3: Sliding Window
const module1_3: Module = {
  id: "leetcode-1.3",
  phaseId: "leetcode-phase-1",
  number: "1.3",
  title: "Sliding Window",
  questName: "Window Wizard",
  description:
    "Master fixed-size and dynamic windows, window optimization, and substring problems.",
  learningObjectives: [
    "Fixed-size window technique",
    "Dynamic window expansion/contraction",
    "Window with frequency counting",
    "At most K distinct patterns",
    "Substring matching strategies",
  ],
  projects: [
    {
      id: "leetcode-1.3-p1",
      name: "Window Fundamentals",
      description:
        "Solve Best Time to Buy and Sell Stock and Maximum Average Subarray I",
      xp: 75,
      successCriteria: [
        "Fixed window mastered",
        "Simple sliding window understood",
      ],
      timeEstimate: "2-3 hours",
    },
    {
      id: "leetcode-1.3-p2",
      name: "Dynamic Window Mastery",
      description:
        "Complete Longest Substring Without Repeating Characters, Longest Repeating Character Replacement, Permutation in String, Minimum Window Substring",
      xp: 400,
      successCriteria: [
        "Dynamic window technique mastered",
        "Frequency map patterns understood",
        "Minimum Window Substring solved",
      ],
      timeEstimate: "12-15 hours",
    },
    {
      id: "leetcode-1.3-p3",
      name: "Advanced Window Patterns",
      description:
        "Master Sliding Window Maximum, Find All Anagrams, Fruit Into Baskets, Max Consecutive Ones III",
      xp: 275,
      successCriteria: [
        "Deque technique learned",
        "At most K distinct mastered",
        "All patterns completed",
      ],
      timeEstimate: "8-10 hours",
    },
  ],
  challenges: [
    {
      id: "leetcode-1.3-c1",
      name: "Window Template Master",
      description: "Apply sliding window template to 8 different problems",
      xp: 100,
      difficulty: "intermediate",
      type: "completion",
    },
    {
      id: "leetcode-1.3-c2",
      name: "Speed Slider",
      description: "Solve 5 sliding window problems in under 2 hours",
      xp: 125,
      difficulty: "intermediate",
      type: "speed",
    },
    {
      id: "leetcode-1.3-c3",
      name: "Boss Challenge: Minimum Window Mastery",
      description: "Solve Minimum Window Substring under 30 minutes",
      xp: 200,
      difficulty: "expert",
      type: "boss",
    },
  ],
};

// Module 1.4: Stack & Queue
const module1_4: Module = {
  id: "leetcode-1.4",
  phaseId: "leetcode-phase-1",
  number: "1.4",
  title: "Stack & Queue",
  questName: "Stack Surgeon",
  description:
    "Master monotonic stacks, stack for parsing, queues for BFS, and deque techniques.",
  learningObjectives: [
    "Stack basics and applications",
    "Monotonic stack patterns",
    "Stack for expression parsing",
    "Queue and deque usage",
    "Data structure design",
  ],
  projects: [
    {
      id: "leetcode-1.4-p1",
      name: "Stack Fundamentals",
      description:
        "Solve Valid Parentheses, Implement Queue using Stacks, Min Stack",
      xp: 100,
      successCriteria: [
        "Stack basics mastered",
        "Data structure design understood",
        "O(1) operations achieved",
      ],
      timeEstimate: "3-4 hours",
    },
    {
      id: "leetcode-1.4-p2",
      name: "Monotonic Stack Mastery",
      description:
        "Complete Daily Temperatures, Evaluate RPN, Generate Parentheses, Decode String",
      xp: 250,
      successCriteria: [
        "Monotonic stack pattern mastered",
        "Nested pattern parsing learned",
        "Backtracking with stack understood",
      ],
      timeEstimate: "8-10 hours",
    },
    {
      id: "leetcode-1.4-p3",
      name: "Advanced Stack Patterns",
      description:
        "Master Asteroid Collision and Online Stock Span",
      xp: 100,
      successCriteria: [
        "Stack simulation mastered",
        "All patterns completed",
      ],
      timeEstimate: "4-5 hours",
    },
  ],
  challenges: [
    {
      id: "leetcode-1.4-c1",
      name: "Stack Speed Run",
      description: "Complete all easy problems in 45 minutes",
      xp: 50,
      difficulty: "beginner",
      type: "speed",
    },
    {
      id: "leetcode-1.4-c2",
      name: "Monotonic Master",
      description: "Recognize and solve 6 monotonic stack problems",
      xp: 100,
      difficulty: "intermediate",
      type: "completion",
    },
    {
      id: "leetcode-1.4-c3",
      name: "Boss Challenge: Largest Rectangle in Histogram",
      description: "Solve using optimal monotonic stack approach",
      xp: 150,
      difficulty: "expert",
      type: "boss",
    },
  ],
};

// ============================================================================
// PHASE 2: INTERMEDIATE PHASE (Weeks 5-10)
// Pattern Expert
// ============================================================================

// Module 2.1: Binary Search
const module2_1: Module = {
  id: "leetcode-2.1",
  phaseId: "leetcode-phase-2",
  number: "2.1",
  title: "Binary Search",
  questName: "Search Specialist",
  description:
    "Master classic binary search, search in rotated arrays, 2D matrix search, and binary search on answer.",
  learningObjectives: [
    "Binary search template mastery",
    "Search in rotated sorted arrays",
    "2D matrix binary search",
    "Binary search on answer space",
    "Lower and upper bound techniques",
  ],
  projects: [
    {
      id: "leetcode-2.1-p1",
      name: "Binary Search Basics",
      description:
        "Solve Binary Search and First Bad Version",
      xp: 75,
      successCriteria: [
        "Binary search template understood",
        "Modified search mastered",
      ],
      timeEstimate: "2-3 hours",
    },
    {
      id: "leetcode-2.1-p2",
      name: "Advanced Binary Search",
      description:
        "Complete Search in Rotated Sorted Array, Find Minimum in Rotated Sorted Array, Search a 2D Matrix, Koko Eating Bananas",
      xp: 350,
      successCriteria: [
        "Rotated array search mastered",
        "Binary search on answer learned",
        "2D search understood",
      ],
      timeEstimate: "10-12 hours",
    },
    {
      id: "leetcode-2.1-p3",
      name: "Binary Search Optimization",
      description:
        "Master Find Peak Element, Search Insert Position, Capacity To Ship Packages, Time Based Key-Value Store",
      xp: 225,
      successCriteria: [
        "All optimization problems solved",
        "Binary search variations mastered",
      ],
      timeEstimate: "6-8 hours",
    },
  ],
  challenges: [
    {
      id: "leetcode-2.1-c1",
      name: "Template Master",
      description: "Apply binary search template to 10 different problems",
      xp: 100,
      difficulty: "intermediate",
      type: "completion",
    },
    {
      id: "leetcode-2.1-c2",
      name: "Pattern Recognition",
      description: "Identify when to use binary search - 10/10 accuracy",
      xp: 75,
      difficulty: "intermediate",
      type: "accuracy",
    },
    {
      id: "leetcode-2.1-c3",
      name: "Boss Challenge: Median of Two Sorted Arrays",
      description: "Solve using advanced binary search in under 45 minutes",
      xp: 200,
      difficulty: "expert",
      type: "boss",
    },
  ],
};

// Module 2.2: Trees (BFS & DFS)
const module2_2: Module = {
  id: "leetcode-2.2",
  phaseId: "leetcode-phase-2",
  number: "2.2",
  title: "Trees (BFS & DFS)",
  questName: "Tree Traverser",
  description:
    "Master DFS (preorder, inorder, postorder), BFS (level-order), tree construction, and path problems.",
  learningObjectives: [
    "DFS traversal techniques",
    "BFS level-order traversal",
    "Tree construction patterns",
    "BST properties and validation",
    "Path and ancestor problems",
  ],
  projects: [
    {
      id: "leetcode-2.2-p1",
      name: "Tree Traversal Fundamentals",
      description:
        "Solve Maximum Depth, Same Tree, Invert Binary Tree, Diameter of Binary Tree",
      xp: 150,
      successCriteria: [
        "All easy problems completed",
        "DFS basics mastered",
        "Tree modification understood",
      ],
      timeEstimate: "4-6 hours",
    },
    {
      id: "leetcode-2.2-p2",
      name: "BFS and BST Mastery",
      description:
        "Complete Binary Tree Level Order Traversal, Validate BST, Kth Smallest in BST, Construct Tree from Preorder/Inorder",
      xp: 400,
      successCriteria: [
        "BFS template mastered",
        "BST properties understood",
        "Tree construction completed",
      ],
      timeEstimate: "12-15 hours",
    },
    {
      id: "leetcode-2.2-p3",
      name: "Advanced Tree Patterns",
      description:
        "Master Binary Tree Right Side View, Count Good Nodes, Lowest Common Ancestor, Path Sum II, Zigzag Level Order",
      xp: 350,
      successCriteria: [
        "DFS with state mastered",
        "Backtracking on trees learned",
        "Modified BFS patterns understood",
      ],
      timeEstimate: "10-12 hours",
    },
  ],
  challenges: [
    {
      id: "leetcode-2.2-c1",
      name: "Traversal Master",
      description: "Implement all 4 traversal types (preorder, inorder, postorder, level-order)",
      xp: 100,
      difficulty: "intermediate",
      type: "completion",
    },
    {
      id: "leetcode-2.2-c2",
      name: "Speed Demon",
      description: "Solve 8 tree problems in under 3 hours",
      xp: 150,
      difficulty: "intermediate",
      type: "speed",
    },
    {
      id: "leetcode-2.2-c3",
      name: "Boss Challenge: Binary Tree Maximum Path Sum",
      description: "Solve advanced DFS problem in under 40 minutes",
      xp: 200,
      difficulty: "expert",
      type: "boss",
    },
  ],
};

// Module 2.3: Graphs
const module2_3: Module = {
  id: "leetcode-2.3",
  phaseId: "leetcode-phase-2",
  number: "2.3",
  title: "Graphs",
  questName: "Graph Navigator",
  description:
    "Master graph representation, DFS/BFS on graphs, connected components, topological sort, and union-find.",
  learningObjectives: [
    "Graph representation (adjacency list/matrix)",
    "DFS and BFS on graphs",
    "Connected components",
    "Cycle detection",
    "Topological sort",
    "Union-find data structure",
  ],
  projects: [
    {
      id: "leetcode-2.3-p1",
      name: "Graph Fundamentals",
      description:
        "Solve Number of Islands, Clone Graph, Pacific Atlantic Water Flow",
      xp: 200,
      successCriteria: [
        "Graph DFS/BFS mastered",
        "Multi-source search understood",
      ],
      timeEstimate: "6-8 hours",
    },
    {
      id: "leetcode-2.3-p2",
      name: "Cycle Detection & Topological Sort",
      description:
        "Complete Course Schedule, Course Schedule II, Graph Valid Tree, Number of Connected Components",
      xp: 300,
      successCriteria: [
        "Cycle detection mastered",
        "Topological sort implemented",
        "Union-find understood",
      ],
      timeEstimate: "10-12 hours",
    },
    {
      id: "leetcode-2.3-p3",
      name: "Advanced Graph Patterns",
      description:
        "Master Redundant Connection, Word Ladder, Surrounded Regions, Rotting Oranges, Walls and Gates",
      xp: 300,
      successCriteria: [
        "Union-find patterns mastered",
        "BFS shortest path learned",
        "Multi-source BFS completed",
      ],
      timeEstimate: "10-12 hours",
    },
  ],
  challenges: [
    {
      id: "leetcode-2.3-c1",
      name: "Graph Builder",
      description: "Build and traverse 10 different graph structures",
      xp: 125,
      difficulty: "intermediate",
      type: "completion",
    },
    {
      id: "leetcode-2.3-c2",
      name: "Algorithm Expert",
      description: "Implement both DFS and BFS solutions for 5 problems",
      xp: 150,
      difficulty: "intermediate",
      type: "completion",
    },
    {
      id: "leetcode-2.3-c3",
      name: "Boss Challenge: Word Ladder II",
      description: "Solve with BFS + backtracking optimization",
      xp: 250,
      difficulty: "expert",
      type: "boss",
    },
  ],
};

// Module 2.4: Dynamic Programming (1D)
const module2_4: Module = {
  id: "leetcode-2.4",
  phaseId: "leetcode-phase-2",
  number: "2.4",
  title: "Dynamic Programming (1D)",
  questName: "DP Novice",
  description:
    "Master memoization, tabulation, state transition, and optimization in 1D DP problems.",
  learningObjectives: [
    "Memoization vs tabulation",
    "State definition and transition",
    "1D DP patterns",
    "Space optimization techniques",
    "Bottom-up and top-down approaches",
  ],
  projects: [
    {
      id: "leetcode-2.4-p1",
      name: "DP Fundamentals",
      description:
        "Solve Climbing Stairs and Min Cost Climbing Stairs",
      xp: 75,
      successCriteria: [
        "DP introduction understood",
        "Basic recurrence relations mastered",
      ],
      timeEstimate: "2-3 hours",
    },
    {
      id: "leetcode-2.4-p2",
      name: "Classic DP Patterns",
      description:
        "Complete House Robber, House Robber II, Longest Palindromic Substring, Palindromic Substrings, Decode Ways",
      xp: 400,
      successCriteria: [
        "Circular array DP mastered",
        "String DP understood",
        "Multiple DP patterns learned",
      ],
      timeEstimate: "12-15 hours",
    },
    {
      id: "leetcode-2.4-p3",
      name: "Advanced 1D DP",
      description:
        "Master Coin Change, Maximum Product Subarray, Word Break, Longest Increasing Subsequence",
      xp: 300,
      successCriteria: [
        "Unbounded knapsack mastered",
        "DP with state variations understood",
        "LIS pattern completed",
      ],
      timeEstimate: "10-12 hours",
    },
  ],
  challenges: [
    {
      id: "leetcode-2.4-c1",
      name: "DP Template Master",
      description: "Apply DP template to 10 different problems",
      xp: 150,
      difficulty: "intermediate",
      type: "completion",
    },
    {
      id: "leetcode-2.4-c2",
      name: "Optimization Expert",
      description: "Space optimize 5 DP solutions from O(n) to O(1)",
      xp: 125,
      difficulty: "intermediate",
      type: "completion",
    },
    {
      id: "leetcode-2.4-c3",
      name: "Both Approaches",
      description: "Solve 5 problems with both memoization and tabulation",
      xp: 100,
      difficulty: "intermediate",
      type: "completion",
    },
  ],
};

// ============================================================================
// PHASE 3: ADVANCED PHASE (Weeks 11-16)
// Pattern Master
// ============================================================================

// Module 3.1: Dynamic Programming (2D)
const module3_1: Module = {
  id: "leetcode-3.1",
  phaseId: "leetcode-phase-3",
  number: "3.1",
  title: "Dynamic Programming (2D)",
  questName: "DP Master",
  description:
    "Master 2D state definition, state compression, path problems, and subsequence problems.",
  learningObjectives: [
    "2D DP state definition",
    "State compression techniques",
    "Grid DP patterns",
    "Subsequence DP problems",
    "String matching DP",
  ],
  projects: [
    {
      id: "leetcode-3.1-p1",
      name: "2D DP Introduction",
      description:
        "Solve Unique Paths and Minimum Path Sum",
      xp: 100,
      successCriteria: [
        "2D DP basics mastered",
        "Grid traversal understood",
      ],
      timeEstimate: "3-4 hours",
    },
    {
      id: "leetcode-3.1-p2",
      name: "Classic 2D DP",
      description:
        "Complete Longest Common Subsequence, Best Time to Buy/Sell with Cooldown, Coin Change II, Target Sum",
      xp: 450,
      successCriteria: [
        "LCS pattern mastered",
        "State machine DP understood",
        "2D unbounded knapsack learned",
      ],
      timeEstimate: "14-16 hours",
    },
    {
      id: "leetcode-3.1-p3",
      name: "Advanced 2D DP",
      description:
        "Master Interleaving String, Edit Distance, Distinct Subsequences, Maximal Square",
      xp: 400,
      successCriteria: [
        "String DP mastered",
        "Edit distance understood",
        "2D optimization completed",
      ],
      timeEstimate: "12-15 hours",
    },
  ],
  challenges: [
    {
      id: "leetcode-3.1-c1",
      name: "2D Master",
      description: "Solve 12 different 2D DP problems",
      xp: 200,
      difficulty: "advanced",
      type: "completion",
    },
    {
      id: "leetcode-3.1-c2",
      name: "Space Optimizer",
      description: "Optimize 2D DP to 1D for 5 problems",
      xp: 150,
      difficulty: "advanced",
      type: "completion",
    },
    {
      id: "leetcode-3.1-c3",
      name: "Boss Challenge: Regular Expression Matching",
      description: "Solve advanced pattern matching DP",
      xp: 300,
      difficulty: "expert",
      type: "boss",
    },
  ],
};

// Module 3.2: Backtracking
const module3_2: Module = {
  id: "leetcode-3.2",
  phaseId: "leetcode-phase-3",
  number: "3.2",
  title: "Backtracking",
  questName: "Backtracking Expert",
  description:
    "Master decision tree exploration, pruning, state restoration, and combinatorial problems.",
  learningObjectives: [
    "Backtracking template",
    "Pruning strategies",
    "State restoration",
    "Combinatorial generation",
    "Constraint satisfaction",
  ],
  projects: [
    {
      id: "leetcode-3.2-p1",
      name: "Backtracking Fundamentals",
      description:
        "Solve Subsets, Combination Sum, Permutations, Combination Sum II",
      xp: 300,
      successCriteria: [
        "Basic backtracking mastered",
        "Duplicate handling learned",
        "Permutation generation understood",
      ],
      timeEstimate: "10-12 hours",
    },
    {
      id: "leetcode-3.2-p2",
      name: "Advanced Backtracking",
      description:
        "Complete Word Search, Palindrome Partitioning, Letter Combinations of Phone Number",
      xp: 250,
      successCriteria: [
        "2D backtracking mastered",
        "String backtracking learned",
      ],
      timeEstimate: "8-10 hours",
    },
    {
      id: "leetcode-3.2-p3",
      name: "Complex Constraint Problems",
      description:
        "Master N-Queens and Sudoku Solver",
      xp: 300,
      successCriteria: [
        "Complex constraints handled",
        "Optimization techniques applied",
      ],
      timeEstimate: "10-12 hours",
    },
  ],
  challenges: [
    {
      id: "leetcode-3.2-c1",
      name: "Backtracking Template Master",
      description: "Apply backtracking template to 10 problems",
      xp: 150,
      difficulty: "advanced",
      type: "completion",
    },
    {
      id: "leetcode-3.2-c2",
      name: "Pruning Expert",
      description: "Optimize 5 solutions with effective pruning",
      xp: 175,
      difficulty: "advanced",
      type: "completion",
    },
    {
      id: "leetcode-3.2-c3",
      name: "Speed Master",
      description: "Solve 6 backtracking problems in under 3 hours",
      xp: 125,
      difficulty: "advanced",
      type: "speed",
    },
  ],
};

// Module 3.3: Heaps & Priority Queues
const module3_3: Module = {
  id: "leetcode-3.3",
  phaseId: "leetcode-phase-3",
  number: "3.3",
  title: "Heaps & Priority Queues",
  questName: "Heap Hero",
  description:
    "Master min/max heaps, K elements problems, merge K sorted, and top K frequent patterns.",
  learningObjectives: [
    "Min heap and max heap operations",
    "K elements problems",
    "Two heap technique",
    "Heap for greedy algorithms",
    "Custom comparator usage",
  ],
  projects: [
    {
      id: "leetcode-3.3-p1",
      name: "Heap Fundamentals",
      description:
        "Solve Kth Largest Element in a Stream",
      xp: 50,
      successCriteria: [
        "Min heap basics mastered",
      ],
      timeEstimate: "1-2 hours",
    },
    {
      id: "leetcode-3.3-p2",
      name: "K Elements Mastery",
      description:
        "Complete Kth Largest Element in Array, Task Scheduler, K Closest Points to Origin, Reorganize String",
      xp: 300,
      successCriteria: [
        "Quickselect or heap mastered",
        "Greedy with heap understood",
        "Top K patterns learned",
      ],
      timeEstimate: "10-12 hours",
    },
    {
      id: "leetcode-3.3-p3",
      name: "Advanced Heap Patterns",
      description:
        "Master Find Median from Data Stream and Top K Frequent Words",
      xp: 200,
      successCriteria: [
        "Two heaps technique mastered",
        "Custom comparator used",
      ],
      timeEstimate: "6-8 hours",
    },
  ],
  challenges: [
    {
      id: "leetcode-3.3-c1",
      name: "Heap Master",
      description: "Solve 8 different heap problems",
      xp: 100,
      difficulty: "advanced",
      type: "completion",
    },
    {
      id: "leetcode-3.3-c2",
      name: "Two Heap Expert",
      description: "Implement two heap technique for 3 problems",
      xp: 125,
      difficulty: "advanced",
      type: "completion",
    },
    {
      id: "leetcode-3.3-c3",
      name: "Boss Challenge: Merge K Sorted Lists",
      description: "Solve using heap efficiently",
      xp: 175,
      difficulty: "expert",
      type: "boss",
    },
  ],
};

// Module 3.4: Advanced Patterns
const module3_4: Module = {
  id: "leetcode-3.4",
  phaseId: "leetcode-phase-3",
  number: "3.4",
  title: "Advanced Patterns",
  questName: "Pattern Virtuoso",
  description:
    "Master greedy algorithms, interval problems, and bit manipulation techniques.",
  learningObjectives: [
    "Greedy algorithm strategies",
    "Interval merging and scheduling",
    "Bit manipulation tricks",
    "XOR properties",
    "Greedy proof techniques",
  ],
  projects: [
    {
      id: "leetcode-3.4-p1",
      name: "Greedy Algorithms",
      description:
        "Solve Jump Game, Jump Game II, Gas Station, Hand of Straights",
      xp: 250,
      successCriteria: [
        "Greedy approach mastered",
        "Greedy proof understood",
      ],
      timeEstimate: "8-10 hours",
    },
    {
      id: "leetcode-3.4-p2",
      name: "Interval Mastery",
      description:
        "Complete Merge Intervals, Insert Interval, Non-overlapping Intervals, Meeting Rooms, Meeting Rooms II",
      xp: 350,
      successCriteria: [
        "Interval merging mastered",
        "Greedy intervals understood",
        "Scheduling problems solved",
      ],
      timeEstimate: "10-12 hours",
    },
    {
      id: "leetcode-3.4-p3",
      name: "Bit Manipulation",
      description:
        "Master Number of 1 Bits, Counting Bits, Reverse Bits, Missing Number",
      xp: 150,
      successCriteria: [
        "Bit operations mastered",
        "XOR trick understood",
      ],
      timeEstimate: "4-6 hours",
    },
  ],
  challenges: [
    {
      id: "leetcode-3.4-c1",
      name: "Greedy Master",
      description: "Solve 10 greedy problems with proof",
      xp: 175,
      difficulty: "advanced",
      type: "completion",
    },
    {
      id: "leetcode-3.4-c2",
      name: "Interval Expert",
      description: "Complete all interval problems perfectly",
      xp: 150,
      difficulty: "advanced",
      type: "accuracy",
    },
    {
      id: "leetcode-3.4-c3",
      name: "Bit Wizard",
      description: "Solve 10 bit manipulation problems",
      xp: 100,
      difficulty: "intermediate",
      type: "completion",
    },
    {
      id: "leetcode-3.4-c4",
      name: "Boss Challenge: Minimum Interval to Include Each Query",
      description: "Solve advanced interval problem",
      xp: 225,
      difficulty: "expert",
      type: "boss",
    },
  ],
};

// ============================================================================
// PHASES DEFINITION
// ============================================================================

const phases: Phase[] = [
  {
    id: "leetcode-phase-1",
    courseId: "leetcode-course",
    number: 1,
    title: "Foundation Phase - Core Patterns",
    level: "Pattern Apprentice",
    duration: "4 weeks (3-4 hours/day)",
    modules: [module1_1, module1_2, module1_3, module1_4],
  },
  {
    id: "leetcode-phase-2",
    courseId: "leetcode-course",
    number: 2,
    title: "Intermediate Phase - Complex Patterns",
    level: "Pattern Expert",
    duration: "6 weeks (2-3 hours/day)",
    modules: [module2_1, module2_2, module2_3, module2_4],
  },
  {
    id: "leetcode-phase-3",
    courseId: "leetcode-course",
    number: 3,
    title: "Advanced Phase - Mastery",
    level: "Pattern Master",
    duration: "6 weeks (2-3 hours/day)",
    modules: [module3_1, module3_2, module3_3, module3_4],
  },
];

// ============================================================================
// LEVEL THRESHOLDS
// ============================================================================

const levelThresholds = [
  { level: 1, minXP: 0, title: "Newbie" },
  { level: 2, minXP: 200, title: "Newbie" },
  { level: 3, minXP: 400, title: "Newbie" },
  { level: 4, minXP: 650, title: "Newbie" },
  { level: 5, minXP: 1000, title: "Newbie" },
  { level: 6, minXP: 1500, title: "Problem Solver" },
  { level: 7, minXP: 2000, title: "Problem Solver" },
  { level: 8, minXP: 2500, title: "Problem Solver" },
  { level: 9, minXP: 3000, title: "Problem Solver" },
  { level: 10, minXP: 3500, title: "Problem Solver" },
  { level: 11, minXP: 4000, title: "Pattern Recognizer" },
  { level: 12, minXP: 4500, title: "Pattern Recognizer" },
  { level: 13, minXP: 5000, title: "Pattern Recognizer" },
  { level: 14, minXP: 5750, title: "Pattern Recognizer" },
  { level: 15, minXP: 6500, title: "Pattern Recognizer" },
  { level: 16, minXP: 7500, title: "Interview Ready" },
  { level: 17, minXP: 8500, title: "Interview Ready" },
  { level: 18, minXP: 9500, title: "Interview Ready" },
  { level: 19, minXP: 10500, title: "Interview Ready" },
  { level: 20, minXP: 11500, title: "Interview Ready" },
  { level: 21, minXP: 12500, title: "FAANG Caliber" },
  { level: 22, minXP: 13500, title: "FAANG Caliber" },
  { level: 23, minXP: 15000, title: "FAANG Caliber" },
  { level: 24, minXP: 16500, title: "FAANG Caliber" },
  { level: 25, minXP: 17500, title: "FAANG Caliber" },
  { level: 26, minXP: 19000, title: "LeetCode Master" },
  { level: 27, minXP: 21000, title: "LeetCode Master" },
  { level: 28, minXP: 23000, title: "LeetCode Master" },
  { level: 29, minXP: 25000, title: "LeetCode Master" },
  { level: 30, minXP: 27000, title: "LeetCode Master" },
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

// ============================================================================
// COURSE DEFINITION
// ============================================================================

export const leetcodeCourse: GamifiedCourse = {
  id: "leetcode-course",
  title: "LeetCode Mastery",
  description:
    "Pattern-Based Interview Preparation for FAANG & Beyond. Master 10-12 core patterns through 75-150 carefully selected problems and build the problem-solving framework needed to tackle any interview question with confidence.",
  instructor: {
    id: "instructor-leetcode",
    userId: "user-leetcode",
    name: "FAANG Interview Experts",
    bio: "Senior engineers from Google, Meta, Amazon with 500+ successful interviews conducted",
    expertise: [
      "Algorithms",
      "Data Structures",
      "System Design",
      "Technical Interviews",
    ],
    coursesCount: 4,
    studentsCount: 25000,
    rating: 4.95,
  },
  thumbnail: "/images/courses/leetcode-course.jpg",
  price: 0,
  enrollmentCount: 0,
  rating: 4.95,
  duration: 9600, // 160 hours total (16 weeks * 10 hours/week average)
  level: "intermediate",
  category: "Interview Preparation",
  lessons: [],
  type: "gamified",
  phases,
  totalXP,
  levelThresholds,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

export default leetcodeCourse;