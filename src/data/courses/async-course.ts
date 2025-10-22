import { GamifiedCourse, Phase, Module } from "@/types";

// Phase 1: Async Foundations
const phase1Modules: Module[] = [
  {
    id: "async-1.1",
    phaseId: "async-phase-1",
    number: "1.1",
    title: "Understanding Asynchronous JavaScript",
    questName: "The Event Loop Awakening",
    description:
      "Master the fundamentals of asynchronous JavaScript, the event loop, and understand how JavaScript runtime works under the hood.",
    learningObjectives: [
      "Understand synchronous vs asynchronous code",
      "Learn how JavaScript runtime works",
      "Master the event loop concept",
      "Understand call stack, callback queue, and microtask queue",
      "Learn about blocking vs non-blocking operations",
      "Understand task prioritization",
      "Master setTimeout and setInterval",
      "Learn about Web APIs",
    ],
    projects: [
      {
        id: "async-1.1-p1",
        name: "Event Loop Visualizer",
        description:
          "Build an interactive event loop diagram that demonstrates execution order and queue management",
        xp: 100,
        successCriteria: [
          "Working visualizer that teaches event loop",
          "Demonstrate execution order",
          "Show call stack operations",
          "Visualize queue management",
        ],
        timeEstimate: "4-6 hours",
      },
      {
        id: "async-1.1-p2",
        name: "Execution Order Predictor",
        description:
          "Build a quiz system to predict code execution order with various async patterns",
        xp: 75,
        successCriteria: [
          "Predict code execution order",
          "Test with various async patterns",
          "Build quiz system",
        ],
        timeEstimate: "2-3 hours",
      },
    ],
    challenges: [
      {
        id: "async-1.1-c1",
        name: "Prediction Master",
        description: "Correctly predict 20 execution orders",
        xp: 75,
        difficulty: "intermediate",
        type: "completion",
      },
      {
        id: "async-1.1-c2",
        name: "Event Loop Explorer",
        description: "Explain event loop in own words",
        xp: 50,
        difficulty: "beginner",
        type: "completion",
      },
      {
        id: "async-1.1-c3",
        name: "Timing Master",
        description: "Master setTimeout edge cases",
        xp: 100,
        difficulty: "intermediate",
        type: "completion",
      },
      {
        id: "async-1.1-c4",
        name: "Boss Challenge",
        description: "Debug 15 event loop-related bugs",
        xp: 200,
        difficulty: "advanced",
        type: "boss",
      },
    ],
  },
  {
    id: "async-1.2",
    phaseId: "async-phase-1",
    number: "1.2",
    title: "Callbacks - The Foundation",
    questName: "Callback Basics",
    description:
      "Master callback functions, callback patterns, error handling, and learn to overcome callback hell.",
    learningObjectives: [
      "Understand callback functions",
      "Learn callback patterns",
      "Handle errors in callbacks",
      "Understand callback hell problem",
      "Master Node.js callback conventions",
      "Learn callback timing issues",
      "Understand this binding in callbacks",
      "Learn callback best practices",
    ],
    projects: [
      {
        id: "async-1.2-p1",
        name: "File Processing System",
        description:
          "Build a file processing system with callbacks, handling multiple operations sequentially with proper error handling",
        xp: 150,
        successCriteria: [
          "Read and process files with callbacks",
          "Handle multiple operations sequentially",
          "Implement error handling",
          "Build operation pipeline",
        ],
        timeEstimate: "5-7 hours",
      },
      {
        id: "async-1.2-p2",
        name: "Custom Event Emitter",
        description:
          "Build a complete event system with callbacks, multiple listeners, and error events",
        xp: 175,
        successCriteria: [
          "Build event system with callbacks",
          "Handle multiple listeners",
          "Implement error events",
          "Add once() functionality",
        ],
        timeEstimate: "6-8 hours",
      },
    ],
    challenges: [
      {
        id: "async-1.2-c1",
        name: "Callback Master",
        description: "Write 15 callback functions",
        xp: 75,
        difficulty: "intermediate",
        type: "completion",
      },
      {
        id: "async-1.2-c2",
        name: "Error Handler",
        description: "Implement proper error handling in 10 scenarios",
        xp: 100,
        difficulty: "intermediate",
        type: "completion",
      },
      {
        id: "async-1.2-c3",
        name: "Hell Escape",
        description: "Refactor callback hell code",
        xp: 125,
        difficulty: "advanced",
        type: "completion",
      },
      {
        id: "async-1.2-c4",
        name: "Boss Challenge",
        description: "Build complex async flow with callbacks",
        xp: 250,
        difficulty: "expert",
        type: "boss",
      },
    ],
  },
  {
    id: "async-1.3",
    phaseId: "async-phase-1",
    number: "1.3",
    title: "Promises - The Game Changer",
    questName: "Promise Land",
    description:
      "Master promises from the ground up, including promise chaining, error handling, and all promise combinators.",
    learningObjectives: [
      "Understand Promise fundamentals",
      "Create and consume promises",
      "Master then/catch/finally",
      "Learn promise chaining",
      "Understand promise states (pending, fulfilled, rejected)",
      "Handle errors in promise chains",
      "Learn Promise.all, Promise.race, Promise.allSettled, Promise.any",
      "Convert callbacks to promises",
    ],
    projects: [
      {
        id: "async-1.3-p1",
        name: "HTTP Request Manager",
        description:
          "Build a robust HTTP client with promises, retry logic, timeouts, and request queue",
        xp: 200,
        successCriteria: [
          "Build fetch wrapper with promises",
          "Implement retry logic",
          "Add timeout handling",
          "Create request queue",
        ],
        timeEstimate: "8-10 hours",
      },
      {
        id: "async-1.3-p2",
        name: "Async Validator Library",
        description:
          "Create a reusable async validation library with chained validations",
        xp: 225,
        successCriteria: [
          "Build validation system with promises",
          "Chain multiple validations",
          "Handle validation errors",
          "Support custom validators",
        ],
        timeEstimate: "8-10 hours",
      },
    ],
    challenges: [
      {
        id: "async-1.3-c1",
        name: "Promise Creator",
        description: "Create 20 different promises",
        xp: 100,
        difficulty: "intermediate",
        type: "completion",
      },
      {
        id: "async-1.3-c2",
        name: "Chain Master",
        description: "Build 10 complex promise chains",
        xp: 125,
        difficulty: "intermediate",
        type: "completion",
      },
      {
        id: "async-1.3-c3",
        name: "Error Guardian",
        description: "Handle errors in 15 scenarios",
        xp: 150,
        difficulty: "advanced",
        type: "completion",
      },
      {
        id: "async-1.3-c4",
        name: "Combinator",
        description: "Master all Promise combinators",
        xp: 175,
        difficulty: "advanced",
        type: "completion",
      },
      {
        id: "async-1.3-c5",
        name: "Boss Challenge",
        description: "Build promise-based state machine",
        xp: 350,
        difficulty: "expert",
        type: "boss",
      },
    ],
  },
];

// Phase 2: Async/Await Mastery
const phase2Modules: Module[] = [
  {
    id: "async-2.1",
    phaseId: "async-phase-2",
    number: "2.1",
    title: "Async/Await Fundamentals",
    questName: "Syntactic Sugar Paradise",
    description:
      "Master async/await syntax for writing clean, readable asynchronous code that looks synchronous.",
    learningObjectives: [
      "Understand async/await syntax",
      "Learn how async functions work",
      "Master await keyword",
      "Handle errors with try/catch",
      "Understand return values from async functions",
      "Learn await timing and execution",
      "Master async function patterns",
      "Understand async/await vs promises",
    ],
    projects: [
      {
        id: "async-2.1-p1",
        name: "API Integration Layer",
        description:
          "Build a production-ready API client with async/await, CRUD operations, and authentication",
        xp: 250,
        successCriteria: [
          "Build clean API client with async/await",
          "Implement CRUD operations",
          "Add authentication",
          "Handle various error scenarios",
        ],
        timeEstimate: "10-12 hours",
      },
      {
        id: "async-2.1-p2",
        name: "Data Pipeline Processor",
        description:
          "Process data through multiple stages with async transformations and progress tracking",
        xp: 275,
        successCriteria: [
          "Process data through multiple stages",
          "Handle async transformations",
          "Implement parallel processing",
          "Add progress tracking",
        ],
        timeEstimate: "10-12 hours",
      },
    ],
    challenges: [
      {
        id: "async-2.1-c1",
        name: "Async Master",
        description: "Write 25 async functions",
        xp: 125,
        difficulty: "intermediate",
        type: "completion",
      },
      {
        id: "async-2.1-c2",
        name: "Error Catcher",
        description: "Handle errors in 20 scenarios",
        xp: 150,
        difficulty: "intermediate",
        type: "completion",
      },
      {
        id: "async-2.1-c3",
        name: "Conversion Expert",
        description: "Convert 15 promises to async/await",
        xp: 125,
        difficulty: "intermediate",
        type: "completion",
      },
      {
        id: "async-2.1-c4",
        name: "Boss Challenge",
        description: "Build complex async workflow system",
        xp: 400,
        difficulty: "expert",
        type: "boss",
      },
    ],
  },
  {
    id: "async-2.2",
    phaseId: "async-phase-2",
    number: "2.2",
    title: "Parallel & Sequential Execution",
    questName: "Concurrency Controller",
    description:
      "Master the art of controlling concurrent execution, optimizing performance, and implementing rate limiting.",
    learningObjectives: [
      "Understand sequential vs parallel execution",
      "Master Promise.all with async/await",
      "Learn parallel request patterns",
      "Implement rate limiting",
      "Handle partial failures",
      "Master concurrent execution control",
      "Learn batching strategies",
      "Optimize async performance",
    ],
    projects: [
      {
        id: "async-2.2-p1",
        name: "Concurrent Download Manager",
        description:
          "Build an efficient download manager with max concurrency limits and progress tracking",
        xp: 300,
        successCriteria: [
          "Download multiple files in parallel",
          "Implement max concurrency limit",
          "Add progress tracking",
          "Handle individual failures",
        ],
        timeEstimate: "12-15 hours",
      },
      {
        id: "async-2.2-p2",
        name: "Web Scraper",
        description:
          "Create a robust, respectful web scraper with rate limits and retry logic",
        xp: 350,
        successCriteria: [
          "Scrape multiple pages concurrently",
          "Respect rate limits",
          "Handle retries",
          "Process results as they arrive",
        ],
        timeEstimate: "15-18 hours",
      },
    ],
    challenges: [
      {
        id: "async-2.2-c1",
        name: "Parallel Master",
        description: "Execute 20 parallel operations",
        xp: 175,
        difficulty: "intermediate",
        type: "completion",
      },
      {
        id: "async-2.2-c2",
        name: "Sequential Expert",
        description: "Chain 15 dependent operations",
        xp: 150,
        difficulty: "intermediate",
        type: "completion",
      },
      {
        id: "async-2.2-c3",
        name: "Optimization Guru",
        description: "Improve execution time by 50%",
        xp: 250,
        difficulty: "advanced",
        type: "completion",
      },
      {
        id: "async-2.2-c4",
        name: "Rate Limiter",
        description: "Implement 10 rate limiting patterns",
        xp: 225,
        difficulty: "advanced",
        type: "completion",
      },
      {
        id: "async-2.2-c5",
        name: "Boss Challenge",
        description: "Build smart task scheduler",
        xp: 500,
        difficulty: "expert",
        type: "boss",
      },
    ],
  },
  {
    id: "async-2.3",
    phaseId: "async-phase-2",
    number: "2.3",
    title: "Error Handling & Recovery",
    questName: "The Error Whisperer",
    description:
      "Master error handling patterns, retry logic, and build resilient async systems that gracefully handle failures.",
    learningObjectives: [
      "Master try/catch patterns",
      "Learn error propagation",
      "Implement retry logic",
      "Handle timeout errors",
      "Learn fallback strategies",
      "Master error recovery patterns",
      "Implement circuit breaker pattern",
      "Build resilient async systems",
    ],
    projects: [
      {
        id: "async-2.3-p1",
        name: "Resilient HTTP Client",
        description:
          "Build a bulletproof HTTP client with automatic retry, timeouts, and circuit breaker",
        xp: 325,
        successCriteria: [
          "Automatic retry with backoff",
          "Timeout handling",
          "Fallback responses",
          "Circuit breaker implementation",
        ],
        timeEstimate: "12-15 hours",
      },
      {
        id: "async-2.3-p2",
        name: "Error Recovery System",
        description:
          "Create a comprehensive error handling system with recovery strategies and logging",
        xp: 300,
        successCriteria: [
          "Catch and handle various error types",
          "Implement recovery strategies",
          "Log errors appropriately",
          "Build error dashboard",
        ],
        timeEstimate: "10-12 hours",
      },
    ],
    challenges: [
      {
        id: "async-2.3-c1",
        name: "Error Master",
        description: "Handle 30 error scenarios",
        xp: 200,
        difficulty: "advanced",
        type: "completion",
      },
      {
        id: "async-2.3-c2",
        name: "Retry Expert",
        description: "Implement 10 retry strategies",
        xp: 175,
        difficulty: "intermediate",
        type: "completion",
      },
      {
        id: "async-2.3-c3",
        name: "Recovery Specialist",
        description: "Build 15 recovery patterns",
        xp: 225,
        difficulty: "advanced",
        type: "completion",
      },
      {
        id: "async-2.3-c4",
        name: "Boss Challenge",
        description: "Build self-healing system",
        xp: 600,
        difficulty: "expert",
        type: "boss",
      },
    ],
  },
  {
    id: "async-2.4",
    phaseId: "async-phase-2",
    number: "2.4",
    title: "Async Iterators & Generators",
    questName: "The Generator Master",
    description:
      "Master async generators and iterators for efficient data streaming and memory-conscious processing.",
    learningObjectives: [
      "Understand generators fundamentals",
      "Master async generators",
      "Learn for await...of loop",
      "Implement async iterables",
      "Create custom async iterators",
      "Handle backpressure",
      "Stream data processing",
      "Build pagination systems",
    ],
    projects: [
      {
        id: "async-2.4-p1",
        name: "Async Data Stream Processor",
        description:
          "Build a memory-efficient stream processor for large datasets with lazy loading",
        xp: 350,
        successCriteria: [
          "Build async iterator for large datasets",
          "Implement lazy loading",
          "Add filtering and mapping",
          "Handle errors in streams",
        ],
        timeEstimate: "12-15 hours",
      },
      {
        id: "async-2.4-p2",
        name: "Paginated API Consumer",
        description:
          "Create a seamless pagination system with async iterators and caching",
        xp: 325,
        successCriteria: [
          "Create async iterator for paginated data",
          "Implement automatic page loading",
          "Add caching",
          "Handle rate limits",
        ],
        timeEstimate: "10-12 hours",
      },
    ],
    challenges: [
      {
        id: "async-2.4-c1",
        name: "Generator Creator",
        description: "Build 15 generators",
        xp: 175,
        difficulty: "intermediate",
        type: "completion",
      },
      {
        id: "async-2.4-c2",
        name: "Async Iterator",
        description: "Create 10 async iterators",
        xp: 200,
        difficulty: "advanced",
        type: "completion",
      },
      {
        id: "async-2.4-c3",
        name: "Stream Master",
        description: "Process 5 large data streams",
        xp: 225,
        difficulty: "advanced",
        type: "completion",
      },
      {
        id: "async-2.4-c4",
        name: "Boss Challenge",
        description: "Build reactive stream library",
        xp: 700,
        difficulty: "expert",
        type: "boss",
      },
    ],
  },
];

// Phase 3: Advanced Async Patterns
const phase3Modules: Module[] = [
  {
    id: "async-3.1",
    phaseId: "async-phase-3",
    number: "3.1",
    title: "Advanced Async Patterns",
    questName: "Pattern Architect",
    description:
      "Master advanced async patterns including queues, pub/sub, worker pools, and async middleware.",
    learningObjectives: [
      "Master async queue pattern",
      "Learn pub/sub with async",
      "Implement worker pool pattern",
      "Master async middleware",
      "Learn async pipeline pattern",
      "Implement async composition",
      "Master async state machines",
      "Build reactive systems",
    ],
    projects: [
      {
        id: "async-3.1-p1",
        name: "Task Queue System",
        description:
          "Build a production-ready task queue with priorities, worker pool, and retry logic",
        xp: 450,
        successCriteria: [
          "Build priority queue for async tasks",
          "Implement worker pool",
          "Add task dependencies",
          "Handle task failures and retries",
        ],
        timeEstimate: "18-20 hours",
      },
      {
        id: "async-3.1-p2",
        name: "Async Middleware Framework",
        description:
          "Create an Express-like async middleware framework with error handling",
        xp: 400,
        successCriteria: [
          "Build middleware pipeline",
          "Support async middleware",
          "Add error handling",
          "Implement route matching",
        ],
        timeEstimate: "15-18 hours",
      },
    ],
    challenges: [
      {
        id: "async-3.1-c1",
        name: "Pattern Master",
        description: "Implement 15 async patterns",
        xp: 300,
        difficulty: "expert",
        type: "completion",
      },
      {
        id: "async-3.1-c2",
        name: "Queue Architect",
        description: "Build 5 queue variants",
        xp: 275,
        difficulty: "advanced",
        type: "completion",
      },
      {
        id: "async-3.1-c3",
        name: "Pipeline Builder",
        description: "Create 10 async pipelines",
        xp: 250,
        difficulty: "advanced",
        type: "completion",
      },
      {
        id: "async-3.1-c4",
        name: "Boss Challenge",
        description: "Build complete async framework",
        xp: 900,
        difficulty: "expert",
        type: "boss",
      },
    ],
  },
  {
    id: "async-3.2",
    phaseId: "async-phase-3",
    number: "3.2",
    title: "Real-Time & Event-Driven Programming",
    questName: "Real-Time Master",
    description:
      "Master real-time programming with WebSockets, SSE, and build collaborative features.",
    learningObjectives: [
      "Master WebSocket programming",
      "Learn Server-Sent Events (SSE)",
      "Implement real-time updates",
      "Handle connection management",
      "Master reconnection strategies",
      "Learn message queuing",
      "Implement presence systems",
      "Build collaborative features",
    ],
    projects: [
      {
        id: "async-3.2-p1",
        name: "Real-Time Chat Application",
        description:
          "Build a fully functional real-time chat with WebSockets, rooms, and typing indicators",
        xp: 500,
        successCriteria: [
          "WebSocket-based chat",
          "Multiple rooms",
          "Typing indicators",
          "Message persistence",
        ],
        timeEstimate: "20-25 hours",
      },
      {
        id: "async-3.2-p2",
        name: "Live Dashboard",
        description:
          "Create a production-grade live dashboard with real-time data updates and auto-reconnection",
        xp: 450,
        successCriteria: [
          "Real-time data updates",
          "Multiple data sources",
          "Connection handling",
          "Auto-reconnection",
        ],
        timeEstimate: "18-20 hours",
      },
    ],
    challenges: [
      {
        id: "async-3.2-c1",
        name: "WebSocket Master",
        description: "Build 10 WebSocket features",
        xp: 275,
        difficulty: "advanced",
        type: "completion",
      },
      {
        id: "async-3.2-c2",
        name: "Real-Time Expert",
        description: "Implement 15 real-time patterns",
        xp: 325,
        difficulty: "expert",
        type: "completion",
      },
      {
        id: "async-3.2-c3",
        name: "Connection Manager",
        description: "Handle all edge cases",
        xp: 300,
        difficulty: "advanced",
        type: "completion",
      },
      {
        id: "async-3.2-c4",
        name: "Boss Challenge",
        description: "Build multiplayer game system",
        xp: 1000,
        difficulty: "expert",
        type: "boss",
      },
    ],
  },
  {
    id: "async-3.3",
    phaseId: "async-phase-3",
    number: "3.3",
    title: "Performance & Optimization",
    questName: "Speed Optimizer",
    description:
      "Master async performance optimization including caching, memoization, and profiling.",
    learningObjectives: [
      "Understand async performance characteristics",
      "Master caching strategies",
      "Learn memoization of async functions",
      "Implement debouncing and throttling",
      "Master request deduplication",
      "Learn async profiling techniques",
      "Optimize promise chains",
      "Handle memory leaks",
    ],
    projects: [
      {
        id: "async-3.3-p1",
        name: "High-Performance API Client",
        description:
          "Build an API client with 10x performance improvement through caching and optimization",
        xp: 425,
        successCriteria: [
          "Implement smart caching",
          "Add request deduplication",
          "Optimize concurrent requests",
          "Measure and improve performance",
        ],
        timeEstimate: "15-18 hours",
      },
      {
        id: "async-3.3-p2",
        name: "Async Profiler Tool",
        description:
          "Create a useful profiling tool for tracking and optimizing async operations",
        xp: 400,
        successCriteria: [
          "Track async operation timing",
          "Identify bottlenecks",
          "Visualize async flows",
          "Generate performance reports",
        ],
        timeEstimate: "15-18 hours",
      },
    ],
    challenges: [
      {
        id: "async-3.3-c1",
        name: "Cache Master",
        description: "Implement 10 caching strategies",
        xp: 250,
        difficulty: "advanced",
        type: "completion",
      },
      {
        id: "async-3.3-c2",
        name: "Performance Guru",
        description: "Optimize 20 slow operations",
        xp: 300,
        difficulty: "expert",
        type: "completion",
      },
      {
        id: "async-3.3-c3",
        name: "Memory Guardian",
        description: "Fix 15 memory leaks",
        xp: 275,
        difficulty: "advanced",
        type: "completion",
      },
      {
        id: "async-3.3-c4",
        name: "Boss Challenge",
        description: "Build async performance monitoring system",
        xp: 800,
        difficulty: "expert",
        type: "boss",
      },
    ],
  },
  {
    id: "async-3.4",
    phaseId: "async-phase-3",
    number: "3.4",
    title: "Testing Async Code",
    questName: "Test Master",
    description:
      "Master testing async functions, mocking async operations, and achieving perfect test coverage.",
    learningObjectives: [
      "Test async functions effectively",
      "Mock async operations",
      "Test error scenarios",
      "Handle timing in tests",
      "Test concurrent operations",
      "Master test utilities",
      "Learn integration testing async code",
      "Understand async test patterns",
    ],
    projects: [
      {
        id: "async-3.4-p1",
        name: "Async Test Suite",
        description:
          "Create a comprehensive test suite with 100% coverage for all async patterns",
        xp: 375,
        successCriteria: [
          "Write tests for all async patterns",
          "Test error scenarios",
          "Test concurrent operations",
          "Achieve 100% coverage",
        ],
        timeEstimate: "15-18 hours",
      },
      {
        id: "async-3.4-p2",
        name: "Async Testing Utilities",
        description:
          "Build a reusable testing toolkit for async code with helpers and assertions",
        xp: 350,
        successCriteria: [
          "Build test helpers for async code",
          "Create mock utilities",
          "Add timing helpers",
          "Build assertion library",
        ],
        timeEstimate: "12-15 hours",
      },
    ],
    challenges: [
      {
        id: "async-3.4-c1",
        name: "Test Writer",
        description: "Write 50 async tests",
        xp: 225,
        difficulty: "advanced",
        type: "completion",
      },
      {
        id: "async-3.4-c2",
        name: "Mock Master",
        description: "Create 20 async mocks",
        xp: 200,
        difficulty: "intermediate",
        type: "completion",
      },
      {
        id: "async-3.4-c3",
        name: "Coverage Champion",
        description: "Achieve 100% coverage",
        xp: 250,
        difficulty: "expert",
        type: "completion",
      },
      {
        id: "async-3.4-c4",
        name: "Boss Challenge",
        description: "Build async test framework",
        xp: 700,
        difficulty: "expert",
        type: "boss",
      },
    ],
  },
  {
    id: "async-3.5",
    phaseId: "async-phase-3",
    number: "3.5",
    title: "Production Patterns & Best Practices",
    questName: "Production Ready",
    description:
      "Master production-ready async patterns, monitoring, and build observable systems.",
    learningObjectives: [
      "Learn production async patterns",
      "Master logging and monitoring",
      "Implement health checks",
      "Handle graceful shutdowns",
      "Learn about async in Node.js",
      "Master async debugging techniques",
      "Understand memory management",
      "Build production-ready systems",
    ],
    projects: [
      {
        id: "async-3.5-p1",
        name: "Production Async Service",
        description:
          "Build and deploy a complete production microservice with all best practices",
        xp: 550,
        successCriteria: [
          "Build complete microservice",
          "Implement all best practices",
          "Add monitoring and logging",
          "Handle graceful shutdown",
        ],
        timeEstimate: "20-25 hours",
      },
      {
        id: "async-3.5-p2",
        name: "Async Debugging Tool",
        description:
          "Create a useful debugging tool for tracing and identifying async bottlenecks",
        xp: 450,
        successCriteria: [
          "Build async operation tracer",
          "Track promise chains",
          "Identify async bottlenecks",
          "Generate debug reports",
        ],
        timeEstimate: "18-20 hours",
      },
    ],
    challenges: [
      {
        id: "async-3.5-c1",
        name: "Best Practice Master",
        description: "Apply 25 best practices",
        xp: 300,
        difficulty: "expert",
        type: "completion",
      },
      {
        id: "async-3.5-c2",
        name: "Production Expert",
        description: "Deploy 5 production services",
        xp: 350,
        difficulty: "expert",
        type: "completion",
      },
      {
        id: "async-3.5-c3",
        name: "Debug Wizard",
        description: "Solve 30 async bugs",
        xp: 325,
        difficulty: "advanced",
        type: "completion",
      },
      {
        id: "async-3.5-c4",
        name: "Boss Challenge",
        description: "Build observable async system",
        xp: 1000,
        difficulty: "expert",
        type: "boss",
      },
    ],
  },
];

// Define phases
const phases: Phase[] = [
  {
    id: "async-phase-1",
    courseId: "async-course",
    number: 1,
    title: "Async Foundations",
    level: "Async Novice",
    duration: "8-10 hours",
    modules: phase1Modules,
  },
  {
    id: "async-phase-2",
    courseId: "async-course",
    number: 2,
    title: "Async/Await Mastery",
    level: "Async Developer",
    duration: "8-10 hours",
    modules: phase2Modules,
  },
  {
    id: "async-phase-3",
    courseId: "async-course",
    number: 3,
    title: "Advanced Async Patterns",
    level: "Async Expert",
    duration: "9-12 hours",
    modules: phase3Modules,
  },
];

// Level thresholds
const levelThresholds = [
  { level: 1, minXP: 0, title: "Async Novice" },
  { level: 2, minXP: 200, title: "Async Novice" },
  { level: 3, minXP: 400, title: "Async Novice" },
  { level: 4, minXP: 650, title: "Promise Practitioner" },
  { level: 5, minXP: 1000, title: "Promise Practitioner" },
  { level: 6, minXP: 1500, title: "Promise Practitioner" },
  { level: 7, minXP: 2000, title: "Promise Practitioner" },
  { level: 8, minXP: 2500, title: "Async Developer" },
  { level: 9, minXP: 3000, title: "Async Developer" },
  { level: 10, minXP: 3500, title: "Async Developer" },
  { level: 11, minXP: 4000, title: "Async Developer" },
  { level: 12, minXP: 4500, title: "Async Developer" },
  { level: 13, minXP: 5000, title: "Async Expert" },
  { level: 14, minXP: 5500, title: "Async Expert" },
  { level: 15, minXP: 6000, title: "Async Expert" },
  { level: 16, minXP: 6500, title: "Async Expert" },
  { level: 17, minXP: 7000, title: "Async Expert" },
  { level: 18, minXP: 8000, title: "Async Master" },
  { level: 19, minXP: 9000, title: "Async Master" },
  { level: 20, minXP: 10000, title: "Async Master" },
  { level: 21, minXP: 11000, title: "Async Guru" },
  { level: 22, minXP: 12000, title: "Async Guru" },
  { level: 23, minXP: 13500, title: "Async Guru" },
  { level: 24, minXP: 15000, title: "Async Guru" },
  { level: 25, minXP: 16500, title: "Async Guru" },
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

// Async Programming course definition
export const asyncCourse: GamifiedCourse = {
  id: "async-course",
  title: "Async Programming Complete Course",
  description:
    "Master Asynchronous JavaScript for Modern Development. From callback confusion to async mastery - learn to write clean, efficient async code.",
  instructor: {
    id: "instructor-2",
    userId: "user-2",
    name: "Async Expert Team",
    bio: "Expert JavaScript developers specializing in asynchronous programming and Node.js",
    expertise: [
      "JavaScript",
      "Async Programming",
      "Node.js",
      "Performance Optimization",
    ],
    coursesCount: 2,
    studentsCount: 8000,
    rating: 4.9,
  },
  thumbnail: "/images/courses/async-course.jpg",
  price: 0,
  enrollmentCount: 0,
  rating: 4.9,
  duration: 2100, // 35 hours in minutes
  level: "beginner",
  category: "JavaScript",
  lessons: [],
  type: "gamified",
  phases,
  totalXP,
  levelThresholds,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

export default asyncCourse;
