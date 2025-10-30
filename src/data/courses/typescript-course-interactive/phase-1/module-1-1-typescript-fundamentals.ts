/**
 * TypeScript Course - Phase 1: Foundations
 * Module 1.1: TypeScript Fundamentals (10 lessons)
 *
 * This module introduces the absolute basics of TypeScript including
 * type annotations, primitive types, and type inference.
 */

import { InteractiveLesson } from "@/types";

export const typescriptFundamentalsLessons: InteractiveLesson[] = [
  // Lesson 1: Your First TypeScript Variable
  {
    id: "ts-basics-01",
    moduleId: "typescript-1.1",
    title: "Your First TypeScript Variable",
    order: 1,
    xpReward: 50,
    difficulty: "beginner",
    steps: [
      {
        id: "ts-basics-01-step-1",
        order: 1,
        instruction: `
# Your First TypeScript Variable

Welcome to TypeScript! TypeScript is a **strongly typed** superset of JavaScript that adds **static type checking** to your code.

In JavaScript, you write:
\`\`\`javascript
let message = "Hello World";
\`\`\`

In TypeScript, you can add a **type annotation**:
\`\`\`typescript
let message: string = "Hello World";
\`\`\`

The \`: string\` part tells TypeScript that \`message\` can only hold string values. This helps catch errors before your code even runs!

## Your Task

Create a variable named \`greeting\` with a **string type annotation** and assign it the value \`"Hello TypeScript!"\`.
        `,
        hint: "Remember the syntax: let variableName: type = value;",
        starterCode: `// Create your greeting variable here with a type annotation
`,
        solution: `// Create your greeting variable here with a type annotation
let greeting: string = "Hello TypeScript!";`,
        testCases: [
          {
            id: "test-1",
            description: "Variable 'greeting' should be declared",
            testFunction: `return code.includes('greeting');`,
          },
          {
            id: "test-2",
            description: "Variable should have string type annotation",
            testFunction: `return code.includes('greeting: string') || code.includes('greeting :string');`,
          },
          {
            id: "test-3",
            description: "Variable should be assigned 'Hello TypeScript!'",
            testFunction: `return code.includes('"Hello TypeScript!"') || code.includes("'Hello TypeScript!'");`,
          },
          {
            id: "test-4",
            description: "Code should not have TypeScript errors",
            testFunction: `return !hasTypeErrors;`,
          },
        ],
        language: "typescript",
      },
    ],
  },

  // Lesson 2: Number Types
  {
    id: "ts-basics-02",
    moduleId: "typescript-1.1",
    title: "Working with Number Types",
    order: 2,
    xpReward: 50,
    difficulty: "beginner",
    steps: [
      {
        id: "ts-basics-02-step-1",
        order: 1,
        instruction: `
# Working with Number Types

TypeScript has a \`number\` type that represents both integers and floating-point numbers.

\`\`\`typescript
let age: number = 25;
let price: number = 19.99;
let temperature: number = -5;
\`\`\`

All of these are valid \`number\` types in TypeScript!

## Your Task

Create three variables:
1. \`age\` (number type) with value \`25\`
2. \`price\` (number type) with value \`19.99\`
3. \`count\` (number type) with value \`100\`
        `,
        hint: "Use the syntax: let variableName: number = value;",
        starterCode: `// Create your three number variables here


`,
        solution: `// Create your three number variables here
let age: number = 25;
let price: number = 19.99;
let count: number = 100;`,
        testCases: [
          {
            id: "test-1",
            description: "Variable 'age' should be declared with number type",
            testFunction: `return code.includes('age') && (code.includes('age: number') || code.includes('age :number'));`,
          },
          {
            id: "test-2",
            description: "Variable 'price' should be declared with number type",
            testFunction: `return code.includes('price') && (code.includes('price: number') || code.includes('price :number'));`,
          },
          {
            id: "test-3",
            description: "Variable 'count' should be declared with number type",
            testFunction: `return code.includes('count') && (code.includes('count: number') || code.includes('count :number'));`,
          },
          {
            id: "test-4",
            description: "All variables should have correct values",
            testFunction: `return code.includes('25') && code.includes('19.99') && code.includes('100');`,
          },
          {
            id: "test-5",
            description: "Code should not have TypeScript errors",
            testFunction: `return !hasTypeErrors;`,
          },
        ],
        language: "typescript",
      },
    ],
  },

  // Lesson 3: Boolean Types
  {
    id: "ts-basics-03",
    moduleId: "typescript-1.1",
    title: "Boolean Types",
    order: 3,
    xpReward: 50,
    difficulty: "beginner",
    steps: [
      {
        id: "ts-basics-03-step-1",
        order: 1,
        instruction: `
# Boolean Types

The \`boolean\` type represents true/false values:

\`\`\`typescript
let isActive: boolean = true;
let hasPermission: boolean = false;
\`\`\`

Booleans are essential for conditional logic in your programs!

## Your Task

Create two boolean variables:
1. \`isStudent\` with value \`true\`
2. \`isGraduated\` with value \`false\`
        `,
        hint: "Remember: boolean values are lowercase true and false (not True/False)",
        starterCode: `// Create your boolean variables here

`,
        solution: `// Create your boolean variables here
let isStudent: boolean = true;
let isGraduated: boolean = false;`,
        testCases: [
          {
            id: "test-1",
            description: "Variable 'isStudent' should be declared with boolean type",
            testFunction: `return code.includes('isStudent') && (code.includes('isStudent: boolean') || code.includes('isStudent :boolean'));`,
          },
          {
            id: "test-2",
            description: "Variable 'isGraduated' should be declared with boolean type",
            testFunction: `return code.includes('isGraduated') && (code.includes('isGraduated: boolean') || code.includes('isGraduated :boolean'));`,
          },
          {
            id: "test-3",
            description: "'isStudent' should be true",
            testFunction: `return code.includes('= true') || code.includes('=true');`,
          },
          {
            id: "test-4",
            description: "'isGraduated' should be false",
            testFunction: `return code.includes('= false') || code.includes('=false');`,
          },
          {
            id: "test-5",
            description: "Code should not have TypeScript errors",
            testFunction: `return !hasTypeErrors;`,
          },
        ],
        language: "typescript",
      },
    ],
  },

  // Lesson 4: Type Inference
  {
    id: "ts-basics-04",
    moduleId: "typescript-1.1",
    title: "Type Inference - Let TypeScript Work for You",
    order: 4,
    xpReward: 75,
    difficulty: "beginner",
    steps: [
      {
        id: "ts-basics-04-step-1",
        order: 1,
        instruction: `
# Type Inference

TypeScript is smart! It can often **infer** (figure out) the type without you writing it explicitly:

\`\`\`typescript
let name = "Alice";  // TypeScript infers: string
let age = 30;        // TypeScript infers: number
let active = true;   // TypeScript infers: boolean
\`\`\`

This is called **type inference**. The type is still checked, you just don't have to write it!

## Your Task

Create three variables **without** type annotations (let TypeScript infer them):
1. \`username\` with value \`"john_doe"\`
2. \`score\` with value \`95\`
3. \`isPremium\` with value \`true\`
        `,
        hint: "Don't include : type - just let variable = value;",
        starterCode: `// Create variables and let TypeScript infer their types



`,
        solution: `// Create variables and let TypeScript infer their types
let username = "john_doe";
let score = 95;
let isPremium = true;`,
        testCases: [
          {
            id: "test-1",
            description: "Variable 'username' should be declared",
            testFunction: `return code.includes('username') && code.includes('john_doe');`,
          },
          {
            id: "test-2",
            description: "Variable 'score' should be declared",
            testFunction: `return code.includes('score') && code.includes('95');`,
          },
          {
            id: "test-3",
            description: "Variable 'isPremium' should be declared",
            testFunction: `return code.includes('isPremium') && code.includes('true');`,
          },
          {
            id: "test-4",
            description: "Should NOT use explicit type annotations",
            testFunction: `return !code.includes(': string') && !code.includes(': number') && !code.includes(': boolean');`,
          },
          {
            id: "test-5",
            description: "Code should not have TypeScript errors",
            testFunction: `return !hasTypeErrors;`,
          },
        ],
        language: "typescript",
      },
    ],
  },

  // Lesson 5: Array Types
  {
    id: "ts-basics-05",
    moduleId: "typescript-1.1",
    title: "Typing Arrays",
    order: 5,
    xpReward: 75,
    difficulty: "beginner",
    steps: [
      {
        id: "ts-basics-05-step-1",
        order: 1,
        instruction: `
# Array Types

Arrays in TypeScript have types too! There are two ways to type arrays:

\`\`\`typescript
// Method 1: Type[]
let names: string[] = ["Alice", "Bob", "Charlie"];
let ages: number[] = [25, 30, 35];

// Method 2: Array<Type>
let scores: Array<number> = [100, 95, 87];
\`\`\`

Both methods work, but \`Type[]\` is more common.

## Your Task

Create two typed arrays:
1. \`colors\` - a string array containing "red", "green", and "blue"
2. \`temperatures\` - a number array containing 72, 68, and 75
        `,
        hint: "Use the syntax: let arrayName: type[] = [values];",
        starterCode: `// Create your typed arrays here

`,
        solution: `// Create your typed arrays here
let colors: string[] = ["red", "green", "blue"];
let temperatures: number[] = [72, 68, 75];`,
        testCases: [
          {
            id: "test-1",
            description: "Array 'colors' should be declared with string[] type",
            testFunction: `return code.includes('colors') && (code.includes('string[]') || code.includes('Array<string>'));`,
          },
          {
            id: "test-2",
            description: "Array 'temperatures' should be declared with number[] type",
            testFunction: `return code.includes('temperatures') && (code.includes('number[]') || code.includes('Array<number>'));`,
          },
          {
            id: "test-3",
            description: "'colors' should contain correct values",
            testFunction: `return code.includes('red') && code.includes('green') && code.includes('blue');`,
          },
          {
            id: "test-4",
            description: "'temperatures' should contain correct values",
            testFunction: `return code.includes('72') && code.includes('68') && code.includes('75');`,
          },
          {
            id: "test-5",
            description: "Code should not have TypeScript errors",
            testFunction: `return !hasTypeErrors;`,
          },
        ],
        language: "typescript",
      },
    ],
  },

  // Lesson 6: Union Types Introduction
  {
    id: "ts-basics-06",
    moduleId: "typescript-1.1",
    title: "Union Types - Multiple Possibilities",
    order: 6,
    xpReward: 100,
    difficulty: "beginner",
    steps: [
      {
        id: "ts-basics-06-step-1",
        order: 1,
        instruction: `
# Union Types

Sometimes a variable can be more than one type. Use the **pipe symbol** \`|\` to create a union type:

\`\`\`typescript
let id: number | string;
id = 123;       // OK
id = "ABC123";  // Also OK
id = true;      // Error! boolean is not in the union
\`\`\`

Union types give you flexibility while maintaining type safety!

## Your Task

Create a variable named \`userId\` that can be either a \`number\` OR a \`string\`, and assign it the value \`42\`.
        `,
        hint: "Use the syntax: let variable: type1 | type2 = value;",
        starterCode: `// Create a userId that can be number or string

`,
        solution: `// Create a userId that can be number or string
let userId: number | string = 42;`,
        testCases: [
          {
            id: "test-1",
            description: "Variable 'userId' should be declared",
            testFunction: `return code.includes('userId');`,
          },
          {
            id: "test-2",
            description: "Should use union type with number and string",
            testFunction: `
              const hasUnion = code.includes('number | string') || code.includes('string | number');
              return hasUnion;
            `,
          },
          {
            id: "test-3",
            description: "Should be assigned value 42",
            testFunction: `return code.includes('= 42') || code.includes('=42');`,
          },
          {
            id: "test-4",
            description: "Code should not have TypeScript errors",
            testFunction: `return !hasTypeErrors;`,
          },
        ],
        language: "typescript",
      },
    ],
  },

  // Lesson 7: Literal Types
  {
    id: "ts-basics-07",
    moduleId: "typescript-1.1",
    title: "Literal Types - Exact Values",
    order: 7,
    xpReward: 100,
    difficulty: "intermediate",
    steps: [
      {
        id: "ts-basics-07-step-1",
        order: 1,
        instruction: `
# Literal Types

TypeScript can use **exact values** as types:

\`\`\`typescript
let direction: "up" | "down" | "left" | "right";
direction = "up";    // OK
direction = "north"; // Error! Not one of the allowed values
\`\`\`

This is great for things like status codes, directions, or any fixed set of values!

## Your Task

Create a variable named \`status\` that can ONLY be one of three literal string values: "pending", "approved", or "rejected". Assign it the value "pending".
        `,
        hint: "Use quotes around each literal value and separate them with |",
        starterCode: `// Create a status variable with literal types

`,
        solution: `// Create a status variable with literal types
let status: "pending" | "approved" | "rejected" = "pending";`,
        testCases: [
          {
            id: "test-1",
            description: "Variable 'status' should be declared",
            testFunction: `return code.includes('status');`,
          },
          {
            id: "test-2",
            description: "Should include literal type 'pending'",
            testFunction: `return code.includes('"pending"') || code.includes("'pending'");`,
          },
          {
            id: "test-3",
            description: "Should include literal type 'approved'",
            testFunction: `return code.includes('"approved"') || code.includes("'approved'");`,
          },
          {
            id: "test-4",
            description: "Should include literal type 'rejected'",
            testFunction: `return code.includes('"rejected"') || code.includes("'rejected'");`,
          },
          {
            id: "test-5",
            description: "Code should not have TypeScript errors",
            testFunction: `return !hasTypeErrors;`,
          },
        ],
        language: "typescript",
      },
    ],
  },

  // Lesson 8: Type Aliases
  {
    id: "ts-basics-08",
    moduleId: "typescript-1.1",
    title: "Type Aliases - Naming Your Types",
    order: 8,
    xpReward: 100,
    difficulty: "intermediate",
    steps: [
      {
        id: "ts-basics-08-step-1",
        order: 1,
        instruction: `
# Type Aliases

You can give types a name using the \`type\` keyword:

\`\`\`typescript
type UserID = number | string;
type Status = "active" | "inactive" | "pending";

let id: UserID = 123;
let userStatus: Status = "active";
\`\`\`

This makes your code more readable and reusable!

## Your Task

1. Create a type alias named \`Color\` that can be "red", "green", or "blue"
2. Create a variable named \`favoriteColor\` of type \`Color\` with value "blue"
        `,
        hint: "Use: type AliasName = type definition; then use the alias as a type",
        starterCode: `// Create a Color type alias

// Create a favoriteColor variable using the Color type

`,
        solution: `// Create a Color type alias
type Color = "red" | "green" | "blue";

// Create a favoriteColor variable using the Color type
let favoriteColor: Color = "blue";`,
        testCases: [
          {
            id: "test-1",
            description: "Should define type alias 'Color'",
            testFunction: `return code.includes('type Color');`,
          },
          {
            id: "test-2",
            description: "Color type should include 'red', 'green', and 'blue'",
            testFunction: `
              const hasRed = code.includes('"red"') || code.includes("'red'");
              const hasGreen = code.includes('"green"') || code.includes("'green'");
              const hasBlue = code.includes('"blue"') || code.includes("'blue'");
              return hasRed && hasGreen && hasBlue;
            `,
          },
          {
            id: "test-3",
            description: "Variable 'favoriteColor' should use Color type",
            testFunction: `return code.includes('favoriteColor') && code.includes(': Color');`,
          },
          {
            id: "test-4",
            description: "favoriteColor should be assigned 'blue'",
            testFunction: `return code.includes('= "blue"') || code.includes("= 'blue'");`,
          },
          {
            id: "test-5",
            description: "Code should not have TypeScript errors",
            testFunction: `return !hasTypeErrors;`,
          },
        ],
        language: "typescript",
      },
    ],
  },

  // Lesson 9: Function Parameter Types
  {
    id: "ts-basics-09",
    moduleId: "typescript-1.1",
    title: "Typing Function Parameters",
    order: 9,
    xpReward: 100,
    difficulty: "intermediate",
    steps: [
      {
        id: "ts-basics-09-step-1",
        order: 1,
        instruction: `
# Function Parameter Types

Functions in TypeScript can have typed parameters:

\`\`\`typescript
function greet(name: string) {
  return "Hello, " + name;
}

greet("Alice");  // OK
greet(123);      // Error! Expected string
\`\`\`

## Your Task

Create a function named \`add\` that takes two number parameters (\`a\` and \`b\`) and returns their sum.
        `,
        hint: "function name(param1: type, param2: type) { return result; }",
        starterCode: `// Create an add function with typed parameters

`,
        solution: `// Create an add function with typed parameters
function add(a: number, b: number) {
  return a + b;
}`,
        testCases: [
          {
            id: "test-1",
            description: "Function 'add' should be declared",
            testFunction: `return code.includes('function add') || code.includes('const add') || code.includes('let add');`,
          },
          {
            id: "test-2",
            description: "Should have parameter 'a' with number type",
            testFunction: `return code.includes('a: number') || code.includes('a :number');`,
          },
          {
            id: "test-3",
            description: "Should have parameter 'b' with number type",
            testFunction: `return code.includes('b: number') || code.includes('b :number');`,
          },
          {
            id: "test-4",
            description: "Should return sum of a and b",
            testFunction: `return code.includes('a + b') || code.includes('a+b');`,
          },
          {
            id: "test-5",
            description: "Code should not have TypeScript errors",
            testFunction: `return !hasTypeErrors;`,
          },
        ],
        language: "typescript",
      },
    ],
  },

  // Lesson 10: Function Return Types
  {
    id: "ts-basics-10",
    moduleId: "typescript-1.1",
    title: "Function Return Types",
    order: 10,
    xpReward: 100,
    difficulty: "intermediate",
    steps: [
      {
        id: "ts-basics-10-step-1",
        order: 1,
        instruction: `
# Function Return Types

You can (and should) specify what type a function returns:

\`\`\`typescript
function getAge(): number {
  return 25;
}

function getMessage(): string {
  return "Hello!";
}
\`\`\`

The return type comes after the parameters, before the function body.

## Your Task

Create a function named \`multiply\` that:
- Takes two number parameters (\`x\` and \`y\`)
- Has an explicit return type of \`number\`
- Returns the product of x and y
        `,
        hint: "function name(params): returnType { return value; }",
        starterCode: `// Create multiply function with explicit return type

`,
        solution: `// Create multiply function with explicit return type
function multiply(x: number, y: number): number {
  return x * y;
}`,
        testCases: [
          {
            id: "test-1",
            description: "Function 'multiply' should be declared",
            testFunction: `return code.includes('function multiply') || code.includes('const multiply') || code.includes('let multiply');`,
          },
          {
            id: "test-2",
            description: "Should have parameters with number types",
            testFunction: `
              const hasFirstParam = code.includes('x: number') || code.includes('x :number');
              const hasSecondParam = code.includes('y: number') || code.includes('y :number');
              return hasFirstParam && hasSecondParam;
            `,
          },
          {
            id: "test-3",
            description: "Should have explicit return type of number",
            testFunction: `return code.includes('): number') || code.includes(') :number') || code.includes('):number');`,
          },
          {
            id: "test-4",
            description: "Should return product of x and y",
            testFunction: `return code.includes('x * y') || code.includes('x*y') || code.includes('y * x') || code.includes('y*x');`,
          },
          {
            id: "test-5",
            description: "Code should not have TypeScript errors",
            testFunction: `return !hasTypeErrors;`,
          },
        ],
        language: "typescript",
      },
    ],
  },
];
