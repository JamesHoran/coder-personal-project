import type { InteractiveLesson } from "@/types";

/**
 * React 19 Features Lessons
 * Module 3.4 - Production Patterns (Lessons 7-9)
 *
 * These lessons cover cutting-edge React 19 features:
 * - Server Components
 * - Form Actions & useActionState
 * - Optimistic Updates with useOptimistic
 *
 * Total: 3 lessons, 1,100 XP
 */

export const react19Lessons: InteractiveLesson[] = [
  // Lesson 7: Server Components Introduction
  {
    id: "production-patterns-07",
    moduleId: "module-3-4",
    title: "Server Components Introduction",
    order: 7,
    xpReward: 300,
    difficulty: "advanced",
    steps: [
      {
        id: "production-patterns-07-step-1",
        order: 1,
        instruction: `# Server Components in React 19

React 19 introduces **Server Components** - components that run ONLY on the server and send HTML to the client with zero JavaScript overhead.

## Why Server Components?

Traditional React components are "Client Components":
- ❌ All code ships to the browser
- ❌ Large JavaScript bundles
- ❌ Hydration required
- ❌ Slower initial load

Server Components solve this:
- ✅ Zero client JavaScript
- ✅ Direct database/API access
- ✅ Smaller bundles
- ✅ Faster page loads
- ✅ Better SEO

## Server Components Can Be Async

One of the most powerful features - Server Components can be **async functions**:

\`\`\`tsx
// Server Component - runs on server only
async function UserProfile({ userId }: { userId: number }) {
  // Direct API/database access (no useState/useEffect needed!)
  const response = await fetch(\`https://api.example.com/users/\${userId}\`);
  const user = await response.json();

  return (
    <div>
      <h1>{user.name}</h1>
      <p>Email: {user.email}</p>
    </div>
  );
}
\`\`\`

**Key Benefits:**
- No loading states needed
- No useEffect for data fetching
- Data fetched before rendering
- Automatic error handling with ErrorBoundary

## Your Task

Create a **Server Component** that fetches and displays user data.

**Requirements:**
1. Make it an async function
2. Fetch user data from: \`https://jsonplaceholder.typicode.com/users/1\`
3. Parse the JSON response
4. Display the user's name and email in JSX

**Note:** Server Components are perfect for data fetching that happens before user interaction.`,
        hint: "Server Components can be async functions. Use await fetch() to get data, then await response.json() to parse it.",
        starterCode: `// Create an async Server Component that fetches user data
// API: https://jsonplaceholder.typicode.com/users/1

async function UserProfile() {
  // TODO: Fetch user data using await fetch()

  // TODO: Parse the JSON response

  // TODO: Return JSX that displays user.name and user.email
}

export default UserProfile;`,
        solution: `async function UserProfile() {
  // Fetch user data from API
  const response = await fetch('https://jsonplaceholder.typicode.com/users/1');
  const user = await response.json();

  return (
    <div>
      <h1>{user.name}</h1>
      <p>Email: {user.email}</p>
    </div>
  );
}

export default UserProfile;`,
        testCases: [
          {
            id: "test-1",
            description: "Should be an async function",
            testFunction: `return /async\\s+function\\s+UserProfile/.test(code);`,
            errorMessage: "UserProfile should be declared as an async function"
          },
          {
            id: "test-2",
            description: "Should fetch data using await",
            testFunction: `return code.includes('await fetch(') && code.includes('jsonplaceholder');`,
            errorMessage: "Should use await fetch() to get data from jsonplaceholder API"
          },
          {
            id: "test-3",
            description: "Should parse JSON response",
            testFunction: `return code.includes('.json()') && code.includes('await');`,
            errorMessage: "Should use await response.json() to parse the data"
          },
          {
            id: "test-4",
            description: "Should display user name and email",
            testFunction: `return code.includes('user.name') && code.includes('user.email');`,
            errorMessage: "Should display both user.name and user.email in the JSX"
          }
        ],
        language: "tsx"
      },
      {
        id: "production-patterns-07-step-2",
        order: 2,
        instruction: `# Client Components with 'use client'

Not all components can be Server Components. When you need **interactivity** (state, effects, event handlers), you need a **Client Component**.

## The 'use client' Directive

Mark a component as a Client Component:

\`\`\`tsx
'use client';  // This directive makes it a Client Component

import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <button onClick={() => setCount(count + 1)}>
      Count: {count}
    </button>
  );
}
\`\`\`

## When to Use Client Components

Use **Client Components** when you need:
- ✅ React hooks (useState, useEffect, useContext, etc.)
- ✅ Event handlers (onClick, onChange, etc.)
- ✅ Browser APIs (window, document, localStorage, etc.)
- ✅ Interactivity or dynamic behavior

Use **Server Components** when you:
- ✅ Only fetch and display data
- ✅ Don't need user interaction
- ✅ Want to reduce bundle size
- ✅ Need direct database/API access

## Common Mistakes

\`\`\`tsx
// ❌ WRONG: Using hooks in Server Component
async function ServerComponent() {
  const [data, setData] = useState(null); // ERROR! Can't use hooks
  // ...
}

// ✅ CORRECT: Using hooks in Client Component
'use client';
function ClientComponent() {
  const [data, setData] = useState(null); // ✅ Works!
  // ...
}
\`\`\`

## Your Task

Create a **Client Component** with a like button.

**Requirements:**
1. Add 'use client' directive at the top
2. Import useState from 'react'
3. Create state: \`likes\` starting at 0
4. Create a button that increments likes when clicked
5. Display current like count in the button text`,
        hint: "Don't forget the 'use client' directive at the very top! Then use useState to track the number of likes.",
        starterCode: `// Create a Client Component with a like button
// Start with 'use client' directive

import { useState } from 'react';

function LikeButton() {
  // TODO: Create likes state starting at 0

  // TODO: Create button that increments likes onClick
  // Button text should show: "❤️ Likes: {count}"
}

export default LikeButton;`,
        solution: `'use client';

import { useState } from 'react';

function LikeButton() {
  const [likes, setLikes] = useState(0);

  return (
    <button onClick={() => setLikes(likes + 1)}>
      ❤️ Likes: {likes}
    </button>
  );
}

export default LikeButton;`,
        testCases: [
          {
            id: "test-1",
            description: "Should have 'use client' directive",
            testFunction: `return code.includes("'use client'") || code.includes('"use client"');`,
            errorMessage: "Must include 'use client' directive at the top of the file"
          },
          {
            id: "test-2",
            description: "Should import useState",
            testFunction: `return code.includes('useState') && code.includes('import');`,
            errorMessage: "Should import useState from 'react'"
          },
          {
            id: "test-3",
            description: "Should use useState for likes",
            testFunction: `return /useState\\s*\\(\\s*0\\s*\\)/.test(code) && (code.includes('likes') || code.includes('count'));`,
            errorMessage: "Should use useState(0) to create a state variable"
          },
          {
            id: "test-4",
            description: "Should have onClick handler",
            testFunction: `return code.includes('onClick') && (code.includes('setLikes') || code.includes('setCount'));`,
            errorMessage: "Button should have an onClick handler that updates the likes state"
          }
        ],
        language: "tsx"
      },
      {
        id: "production-patterns-07-step-3",
        order: 3,
        instruction: `# Composing Server and Client Components

The real power comes from **composing** Server and Client Components together!

## Best Practice Pattern

\`\`\`tsx
// app/page.tsx (Server Component - no directive needed)
async function UserPage({ userId }: { userId: number }) {
  // Fetch data on server
  const user = await fetchUser(userId);

  return (
    <div>
      <h1>{user.name}</h1>

      {/* Pass data to Client Component */}
      <LikeButton initialLikes={user.likes} />
    </div>
  );
}

// components/LikeButton.tsx (Client Component)
'use client';
import { useState } from 'react';

function LikeButton({ initialLikes }: { initialLikes: number }) {
  const [likes, setLikes] = useState(initialLikes);
  // Interactive component with state
}
\`\`\`

## The Pattern

1. **Server Component** (page/layout):
   - Fetches data
   - No 'use client' directive
   - Async function
   - Renders static content

2. **Client Component** (interactive parts):
   - Has 'use client' directive
   - Receives data as props
   - Manages interactivity
   - Uses hooks

## Your Task

Create a **UserDashboard** Server Component that fetches data and passes it to a Client Component.

**Requirements:**

1. **UserDashboard** (Server Component):
   - Async function
   - Fetch from: \`https://jsonplaceholder.typicode.com/users/1\`
   - Pass \`user.name\` to WelcomeMessage component

2. **WelcomeMessage** (Client Component):
   - Has 'use client' directive
   - Accepts \`userName\` prop
   - Has a "Show greeting" button
   - Uses useState to toggle showing greeting
   - When visible, shows: "Welcome back, {userName}!"

**Interview Tip:** This pattern (Server fetches, Client handles interactivity) is the most common pattern in React 19 apps.`,
        hint: "UserDashboard should be async and fetch data (no 'use client'). WelcomeMessage should have 'use client' and use useState for the toggle.",
        starterCode: `// UserDashboard: Server Component (async, fetches data)
async function UserDashboard() {
  // TODO: Fetch user from https://jsonplaceholder.typicode.com/users/1

  // TODO: Render WelcomeMessage component, pass user.name as userName prop
}

// WelcomeMessage: Client Component (interactive, uses hooks)
function WelcomeMessage({ userName }: { userName: string }) {
  // TODO: Add 'use client' directive
  // TODO: Create showGreeting state (boolean, starts false)
  // TODO: Create button to toggle showGreeting
  // TODO: When showGreeting is true, show: "Welcome back, {userName}!"
}

export default UserDashboard;`,
        solution: `// Server Component - fetches data
async function UserDashboard() {
  const response = await fetch('https://jsonplaceholder.typicode.com/users/1');
  const user = await response.json();

  return (
    <div>
      <WelcomeMessage userName={user.name} />
    </div>
  );
}

// Client Component - handles interactivity
'use client';
import { useState } from 'react';

function WelcomeMessage({ userName }: { userName: string }) {
  const [showGreeting, setShowGreeting] = useState(false);

  return (
    <div>
      <button onClick={() => setShowGreeting(!showGreeting)}>
        {showGreeting ? 'Hide' : 'Show'} greeting
      </button>
      {showGreeting && <p>Welcome back, {userName}!</p>}
    </div>
  );
}

export default UserDashboard;`,
        testCases: [
          {
            id: "test-1",
            description: "UserDashboard should be async and fetch data",
            testFunction: `return /async\\s+function\\s+UserDashboard/.test(code) && code.includes('await fetch(');`,
            errorMessage: "UserDashboard should be an async function that fetches data"
          },
          {
            id: "test-2",
            description: "WelcomeMessage should have 'use client' directive",
            testFunction: `
              const hasUseClient = code.includes("'use client'") || code.includes('"use client"');
              const hasWelcomeMessage = code.includes('function WelcomeMessage');
              return hasUseClient && hasWelcomeMessage;
            `,
            errorMessage: "WelcomeMessage must have 'use client' directive"
          },
          {
            id: "test-3",
            description: "Should pass userName prop to WelcomeMessage",
            testFunction: `return code.includes('WelcomeMessage') && code.includes('userName') && code.includes('user.name');`,
            errorMessage: "Should pass user.name as userName prop to WelcomeMessage component"
          },
          {
            id: "test-4",
            description: "WelcomeMessage should use useState for toggle",
            testFunction: `
              const hasState = code.includes('useState(false)') || code.includes('useState(true)');
              const hasToggle = code.includes('showGreeting') || code.includes('show');
              return hasState && hasToggle;
            `,
            errorMessage: "WelcomeMessage should use useState to toggle the greeting visibility"
          }
        ],
        language: "tsx"
      }
    ]
  },

  // Lesson 8: Form Actions & useActionState
  {
    id: "production-patterns-08",
    moduleId: "module-3-4",
    title: "Form Actions and useActionState",
    order: 8,
    xpReward: 400,
    difficulty: "advanced",
    steps: [
      {
        id: "production-patterns-08-step-1",
        order: 1,
        instruction: `# Form Actions in React 19

React 19 introduces **Actions** - a revolutionary new pattern for handling forms and mutations.

## The Old Way (React 18) 😫

\`\`\`tsx
function OldForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await submitForm({ name, email });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={name} onChange={e => setName(e.target.value)} />
      <input value={email} onChange={e => setEmail(e.target.value)} />
      <button disabled={loading}>
        {loading ? 'Submitting...' : 'Submit'}
      </button>
      {error && <p>{error}</p>}
    </form>
  );
}
\`\`\`

**Problems:**
- ❌ So much boilerplate!
- ❌ Manual state management for loading/error
- ❌ Controlled inputs (extra re-renders)
- ❌ Need to prevent default
- ❌ Complex error handling

## The New Way (React 19) 🚀

\`\`\`tsx
'use client';
import { useActionState } from 'react';

function NewForm() {
  const [state, submitAction, isPending] = useActionState(
    async (prevState, formData) => {
      const name = formData.get('name');
      const email = formData.get('email');

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      return { success: true, message: 'Submitted!' };
    },
    { success: false, message: '' }
  );

  return (
    <form action={submitAction}>
      <input name="name" required />
      <input name="email" type="email" required />
      <button disabled={isPending}>
        {isPending ? 'Submitting...' : 'Submit'}
      </button>
      {state.message && <p>{state.message}</p>}
    </form>
  );
}
\`\`\`

**Benefits:**
- ✅ Automatic pending state (isPending)
- ✅ No controlled inputs (better performance)
- ✅ FormData API (native browser behavior)
- ✅ Less boilerplate
- ✅ Progressive enhancement (works without JS!)

## useActionState Hook

\`\`\`tsx
const [state, action, isPending] = useActionState(actionFn, initialState);
\`\`\`

**Returns:**
- \`state\` - Current state (success, error, etc.)
- \`action\` - Function to pass to form's action prop
- \`isPending\` - Boolean indicating if action is running

## Your Task

Create a simple **ContactForm** using useActionState.

**Requirements:**
1. Use 'use client' directive
2. Import useActionState from 'react'
3. Create form with name and email inputs
4. Use useActionState with initial state: \`{ submitted: false }\`
5. Action should return: \`{ submitted: true }\` after 500ms delay
6. Show "Submitting..." when isPending is true
7. Show "Form submitted!" when state.submitted is true`,
        hint: "Use formData.get('name') and formData.get('email') to access values. Use setTimeout wrapped in a Promise for the delay.",
        starterCode: `'use client';
import { useActionState } from 'react';

function ContactForm() {
  // TODO: Use useActionState
  // Initial state: { submitted: false }
  // Action: Wait 500ms, return { submitted: true }

  return (
    <form>
      <input name="name" placeholder="Name" required />
      <input name="email" type="email" placeholder="Email" required />

      {/* TODO: Show "Submitting..." when pending, "Submit" otherwise */}
      <button>Submit</button>

      {/* TODO: Show "Form submitted!" when state.submitted is true */}
    </form>
  );
}

export default ContactForm;`,
        solution: `'use client';
import { useActionState } from 'react';

function ContactForm() {
  const [state, submitAction, isPending] = useActionState(
    async (prevState, formData) => {
      // Get form values
      const name = formData.get('name');
      const email = formData.get('email');

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));

      return { submitted: true };
    },
    { submitted: false }
  );

  return (
    <form action={submitAction}>
      <input name="name" placeholder="Name" required />
      <input name="email" type="email" placeholder="Email" required />

      <button disabled={isPending}>
        {isPending ? 'Submitting...' : 'Submit'}
      </button>

      {state.submitted && <p>Form submitted!</p>}
    </form>
  );
}

export default ContactForm;`,
        testCases: [
          {
            id: "test-1",
            description: "Should use useActionState hook",
            testFunction: `return code.includes('useActionState') && code.includes('import');`,
            errorMessage: "Should import and use useActionState from 'react'"
          },
          {
            id: "test-2",
            description: "Should have form with action prop",
            testFunction: `return code.includes('<form') && code.includes('action=');`,
            errorMessage: "Form should have action prop connected to useActionState"
          },
          {
            id: "test-3",
            description: "Should show different text when pending",
            testFunction: `return code.includes('isPending') && /isPending\\s*\\?/.test(code) && code.includes('Submitting');`,
            errorMessage: "Should show 'Submitting...' when isPending is true"
          },
          {
            id: "test-4",
            description: "Should show success message",
            testFunction: `return code.includes('state.submitted') && code.includes('Form submitted');`,
            errorMessage: "Should show success message when form is submitted"
          }
        ],
        language: "tsx"
      },
      {
        id: "production-patterns-08-step-2",
        order: 2,
        instruction: `# Advanced Form Actions with Validation

Real forms need **validation** and **error handling**. Let's build a production-quality login form.

## Validation in Actions

\`\`\`tsx
const [state, loginAction] = useActionState(
  async (prevState, formData) => {
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    // Validation
    if (!email || !email.includes('@')) {
      return {
        success: false,
        error: 'Please enter a valid email'
      };
    }

    if (!password || password.length < 6) {
      return {
        success: false,
        error: 'Password must be at least 6 characters'
      };
    }

    // Simulate API call
    try {
      await loginUser(email, password);
      return { success: true, error: null };
    } catch (err) {
      return {
        success: false,
        error: 'Invalid credentials'
      };
    }
  },
  { success: false, error: null }
);
\`\`\`

## Displaying Errors

\`\`\`tsx
<form action={loginAction}>
  <input name="email" type="email" required />
  <input name="password" type="password" required />
  <button disabled={isPending}>Login</button>

  {state.error && (
    <p style={{ color: 'red' }}>{state.error}</p>
  )}

  {state.success && (
    <p style={{ color: 'green' }}>Login successful!</p>
  )}
</form>
\`\`\`

## Your Task

Create a **SignupForm** with validation.

**Requirements:**
1. Form fields: username, email, password
2. Validation rules:
   - Username: Must be at least 3 characters
   - Email: Must contain '@'
   - Password: Must be at least 8 characters
3. Return error message if validation fails
4. Return success message if all valid
5. Show errors in red, success in green
6. Disable button when pending

**Validation Messages:**
- "Username must be at least 3 characters"
- "Please enter a valid email"
- "Password must be at least 8 characters"
- "Account created successfully!" (success)`,
        hint: "Check each field and return an error object if validation fails. Only return success if all fields pass validation.",
        starterCode: `'use client';
import { useActionState } from 'react';

function SignupForm() {
  const [state, signupAction, isPending] = useActionState(
    async (prevState, formData) => {
      const username = formData.get('username') as string;
      const email = formData.get('email') as string;
      const password = formData.get('password') as string;

      // TODO: Validate username (at least 3 characters)

      // TODO: Validate email (contains '@')

      // TODO: Validate password (at least 8 characters)

      // TODO: If all valid, return success
    },
    { success: false, error: null }
  );

  return (
    <form action={signupAction}>
      <input name="username" placeholder="Username" required />
      <input name="email" type="email" placeholder="Email" required />
      <input name="password" type="password" placeholder="Password" required />

      <button disabled={isPending}>
        {isPending ? 'Creating account...' : 'Sign Up'}
      </button>

      {/* TODO: Show error in red if state.error */}
      {/* TODO: Show success in green if state.success */}
    </form>
  );
}

export default SignupForm;`,
        solution: `'use client';
import { useActionState } from 'react';

function SignupForm() {
  const [state, signupAction, isPending] = useActionState(
    async (prevState, formData) => {
      const username = formData.get('username') as string;
      const email = formData.get('email') as string;
      const password = formData.get('password') as string;

      // Validate username
      if (!username || username.length < 3) {
        return {
          success: false,
          error: 'Username must be at least 3 characters'
        };
      }

      // Validate email
      if (!email || !email.includes('@')) {
        return {
          success: false,
          error: 'Please enter a valid email'
        };
      }

      // Validate password
      if (!password || password.length < 8) {
        return {
          success: false,
          error: 'Password must be at least 8 characters'
        };
      }

      // Simulate account creation
      await new Promise(resolve => setTimeout(resolve, 500));

      return {
        success: true,
        error: null
      };
    },
    { success: false, error: null }
  );

  return (
    <form action={signupAction}>
      <input name="username" placeholder="Username" required />
      <input name="email" type="email" placeholder="Email" required />
      <input name="password" type="password" placeholder="Password" required />

      <button disabled={isPending}>
        {isPending ? 'Creating account...' : 'Sign Up'}
      </button>

      {state.error && (
        <p style={{ color: 'red' }}>{state.error}</p>
      )}

      {state.success && (
        <p style={{ color: 'green' }}>Account created successfully!</p>
      )}
    </form>
  );
}

export default SignupForm;`,
        testCases: [
          {
            id: "test-1",
            description: "Should validate username length",
            testFunction: `return code.includes('username.length') && code.includes('3');`,
            errorMessage: "Should check that username is at least 3 characters"
          },
          {
            id: "test-2",
            description: "Should validate email format",
            testFunction: `return code.includes("email.includes('@')") || code.includes('email.includes("@")');`,
            errorMessage: "Should check that email contains '@'"
          },
          {
            id: "test-3",
            description: "Should validate password length",
            testFunction: `return code.includes('password.length') && code.includes('8');`,
            errorMessage: "Should check that password is at least 8 characters"
          },
          {
            id: "test-4",
            description: "Should show error messages",
            testFunction: `return code.includes('state.error') && code.includes('color') && code.includes('red');`,
            errorMessage: "Should display error messages in red"
          },
          {
            id: "test-5",
            description: "Should show success message",
            testFunction: `return code.includes('state.success') && code.includes('Account created');`,
            errorMessage: "Should show success message when form is valid"
          }
        ],
        language: "tsx"
      },
      {
        id: "production-patterns-08-step-3",
        order: 3,
        instruction: `# Server Actions Pattern

In production React 19 apps with frameworks like Next.js, you can create **Server Actions** that run securely on the server.

## Server Action Example

\`\`\`tsx
// app/actions.ts (Server-side)
'use server';

export async function createUser(prevState: any, formData: FormData) {
  const email = formData.get('email') as string;

  // This runs on the SERVER
  // Direct database access
  const user = await db.users.create({ email });

  // Send emails, process payments, etc.
  await sendWelcomeEmail(email);

  return { success: true, userId: user.id };
}

// app/SignupForm.tsx (Client-side)
'use client';
import { useActionState } from 'react';
import { createUser } from './actions';

function SignupForm() {
  const [state, action, isPending] = useActionState(createUser, null);

  return <form action={action}>...</form>;
}
\`\`\`

**Benefits:**
- 🔒 Secure (API keys, database credentials safe)
- ⚡ Fast (no API roundtrip)
- 🎯 Simple (direct database access)
- ✅ Type-safe (TypeScript end-to-end)

## Your Task

Simulate a server action pattern for a **FeedbackForm**.

**Requirements:**
1. Create a simulated server action function
2. Accepts: name (string), rating (number 1-5), comment (string)
3. Validation:
   - Name must not be empty
   - Rating must be 1-5
   - Comment must be at least 10 characters
4. Return success with a feedback ID (use timestamp)
5. Display the feedback ID when successful

**State Structure:**
\`\`\`tsx
{
  success: boolean;
  error: string | null;
  feedbackId: number | null;
}
\`\`\``,
        hint: "Validate all three fields. If valid, use Date.now() as the feedbackId. Return appropriate error messages for each validation failure.",
        starterCode: `'use client';
import { useActionState } from 'react';

function FeedbackForm() {
  const [state, submitFeedback, isPending] = useActionState(
    async (prevState: any, formData: FormData) => {
      const name = formData.get('name') as string;
      const rating = parseInt(formData.get('rating') as string);
      const comment = formData.get('comment') as string;

      // TODO: Validate name (not empty)

      // TODO: Validate rating (1-5)

      // TODO: Validate comment (at least 10 characters)

      // TODO: If valid, simulate saving and return feedbackId (use Date.now())
    },
    { success: false, error: null, feedbackId: null }
  );

  return (
    <form action={submitFeedback}>
      <input name="name" placeholder="Your name" required />

      <select name="rating" required>
        <option value="">Select rating</option>
        <option value="1">1 - Poor</option>
        <option value="2">2 - Fair</option>
        <option value="3">3 - Good</option>
        <option value="4">4 - Very Good</option>
        <option value="5">5 - Excellent</option>
      </select>

      <textarea name="comment" placeholder="Your feedback" required />

      <button disabled={isPending}>
        {isPending ? 'Submitting...' : 'Submit Feedback'}
      </button>

      {/* TODO: Show error if state.error */}
      {/* TODO: Show success with feedbackId if state.success */}
    </form>
  );
}

export default FeedbackForm;`,
        solution: `'use client';
import { useActionState } from 'react';

function FeedbackForm() {
  const [state, submitFeedback, isPending] = useActionState(
    async (prevState: any, formData: FormData) => {
      const name = formData.get('name') as string;
      const rating = parseInt(formData.get('rating') as string);
      const comment = formData.get('comment') as string;

      // Validate name
      if (!name || name.trim().length === 0) {
        return {
          success: false,
          error: 'Name is required',
          feedbackId: null
        };
      }

      // Validate rating
      if (!rating || rating < 1 || rating > 5) {
        return {
          success: false,
          error: 'Rating must be between 1 and 5',
          feedbackId: null
        };
      }

      // Validate comment
      if (!comment || comment.length < 10) {
        return {
          success: false,
          error: 'Comment must be at least 10 characters',
          feedbackId: null
        };
      }

      // Simulate saving to database
      await new Promise(resolve => setTimeout(resolve, 500));
      const feedbackId = Date.now();

      return {
        success: true,
        error: null,
        feedbackId
      };
    },
    { success: false, error: null, feedbackId: null }
  );

  return (
    <form action={submitFeedback}>
      <input name="name" placeholder="Your name" required />

      <select name="rating" required>
        <option value="">Select rating</option>
        <option value="1">1 - Poor</option>
        <option value="2">2 - Fair</option>
        <option value="3">3 - Good</option>
        <option value="4">4 - Very Good</option>
        <option value="5">5 - Excellent</option>
      </select>

      <textarea name="comment" placeholder="Your feedback" required />

      <button disabled={isPending}>
        {isPending ? 'Submitting...' : 'Submit Feedback'}
      </button>

      {state.error && (
        <p style={{ color: 'red' }}>{state.error}</p>
      )}

      {state.success && (
        <p style={{ color: 'green' }}>
          Feedback submitted! ID: {state.feedbackId}
        </p>
      )}
    </form>
  );
}

export default FeedbackForm;`,
        testCases: [
          {
            id: "test-1",
            description: "Should validate name is not empty",
            testFunction: `return code.includes('name') && (code.includes('trim()') || code.includes('length'));`,
            errorMessage: "Should validate that name is not empty"
          },
          {
            id: "test-2",
            description: "Should validate rating is 1-5",
            testFunction: `return code.includes('rating') && (code.includes('< 1') || code.includes('> 5'));`,
            errorMessage: "Should validate that rating is between 1 and 5"
          },
          {
            id: "test-3",
            description: "Should validate comment length",
            testFunction: `return code.includes('comment.length') && code.includes('10');`,
            errorMessage: "Should validate that comment is at least 10 characters"
          },
          {
            id: "test-4",
            description: "Should generate feedbackId",
            testFunction: `return code.includes('Date.now()') && code.includes('feedbackId');`,
            errorMessage: "Should use Date.now() to generate a feedbackId"
          },
          {
            id: "test-5",
            description: "Should display feedbackId on success",
            testFunction: `return code.includes('state.feedbackId') && code.includes('state.success');`,
            errorMessage: "Should display the feedbackId when submission is successful"
          }
        ],
        language: "tsx"
      }
    ]
  },

  // Lesson 9: Optimistic Updates with useOptimistic
  {
    id: "production-patterns-09",
    moduleId: "module-3-4",
    title: "Optimistic Updates with useOptimistic",
    order: 9,
    xpReward: 400,
    difficulty: "advanced",
    steps: [
      {
        id: "production-patterns-09-step-1",
        order: 1,
        instruction: `# Optimistic Updates in React 19

**Optimistic Updates** = Update UI instantly, then sync with server

## The Problem

Traditional approach shows loading state:

\`\`\`tsx
function LikeButton() {
  const [likes, setLikes] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleLike = async () => {
    setLoading(true);
    await updateLikes(likes + 1);
    setLikes(likes + 1);
    setLoading(false);
  };

  return (
    <button onClick={handleLike} disabled={loading}>
      {loading ? 'Loading...' : \`❤️ \${likes}\`}
    </button>
  );
}
\`\`\`

**User Experience:** Click → See "Loading..." → Wait → See result 😴

## The Solution: useOptimistic

\`\`\`tsx
'use client';
import { useOptimistic } from 'react';

function LikeButton({ initialLikes }: { initialLikes: number }) {
  const [optimisticLikes, setOptimisticLikes] = useOptimistic(
    initialLikes,
    (currentLikes, newLikes) => newLikes
  );

  const handleLike = async () => {
    // Update UI IMMEDIATELY
    setOptimisticLikes(optimisticLikes + 1);

    // Then update server
    await updateLikes(optimisticLikes + 1);
  };

  return (
    <button onClick={handleLike}>
      ❤️ {optimisticLikes}
    </button>
  );
}
\`\`\`

**User Experience:** Click → See result instantly → Background sync ⚡

## useOptimistic Hook

\`\`\`tsx
const [optimisticState, setOptimisticState] = useOptimistic(
  currentState,
  (state, optimisticValue) => optimisticValue
);
\`\`\`

**How it works:**
1. Shows \`currentState\` normally
2. When \`setOptimisticState\` called, shows optimistic value immediately
3. When server responds, reverts to actual state
4. Automatic rollback on error

## Your Task

Create a **LikeButton** with optimistic updates.

**Requirements:**
1. Use 'use client' directive
2. Import useOptimistic from 'react'
3. Accept initialLikes prop
4. Use useOptimistic with initialLikes
5. Create handleLike function that:
   - Immediately increments optimisticLikes
   - Waits 500ms (simulated API call)
6. Display ❤️ with like count`,
        hint: "useOptimistic takes two arguments: current value and updater function. Call setOptimisticLikes before the await to update instantly.",
        starterCode: `'use client';
import { useOptimistic } from 'react';

function LikeButton({ initialLikes }: { initialLikes: number }) {
  // TODO: Use useOptimistic hook with initialLikes
  // Updater: (current, newValue) => newValue

  const handleLike = async () => {
    // TODO: Set optimistic likes to current + 1 (instant update)

    // TODO: Simulate API call (500ms delay)
  };

  return (
    <button onClick={handleLike}>
      {/* TODO: Display ❤️ with optimistic like count */}
    </button>
  );
}

export default LikeButton;`,
        solution: `'use client';
import { useOptimistic } from 'react';

function LikeButton({ initialLikes }: { initialLikes: number }) {
  const [optimisticLikes, setOptimisticLikes] = useOptimistic(
    initialLikes,
    (state, newValue) => newValue
  );

  const handleLike = async () => {
    // Update UI immediately
    setOptimisticLikes(optimisticLikes + 1);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
  };

  return (
    <button onClick={handleLike}>
      ❤️ {optimisticLikes}
    </button>
  );
}

export default LikeButton;`,
        testCases: [
          {
            id: "test-1",
            description: "Should import useOptimistic",
            testFunction: `return code.includes('useOptimistic') && code.includes('import');`,
            errorMessage: "Should import useOptimistic from 'react'"
          },
          {
            id: "test-2",
            description: "Should use useOptimistic hook",
            testFunction: `return /useOptimistic\\s*\\(/.test(code) && code.includes('initialLikes');`,
            errorMessage: "Should use useOptimistic with initialLikes as first argument"
          },
          {
            id: "test-3",
            description: "Should set optimistic state immediately",
            testFunction: `
              const hasSetOptimistic = code.includes('setOptimistic');
              const beforeAwait = /setOptimistic[^;]*;[\\s\\S]*await/.test(code);
              return hasSetOptimistic && beforeAwait;
            `,
            errorMessage: "Should call setOptimistic BEFORE the await (for instant update)"
          },
          {
            id: "test-4",
            description: "Should display optimistic likes",
            testFunction: `return code.includes('optimisticLikes') && code.includes('❤️');`,
            errorMessage: "Should display the optimistic like count with ❤️"
          }
        ],
        language: "tsx"
      },
      {
        id: "production-patterns-09-step-2",
        order: 2,
        instruction: `# Error Handling with Optimistic Updates

What happens when the server rejects the update? **useOptimistic automatically rolls back!**

## Automatic Rollback

\`\`\`tsx
const handleLike = async () => {
  // Show optimistic state
  setOptimisticLikes(optimisticLikes + 1);

  try {
    // Try to update server
    await updateLikes(optimisticLikes + 1);
    // ✅ Success: optimistic state becomes real state
  } catch (error) {
    // ❌ Error: useOptimistic automatically reverts!
    setError('Failed to like. Please try again.');
  }
};
\`\`\`

**Behavior:**
- Success → Optimistic update becomes permanent
- Error → UI automatically reverts to original value
- No manual rollback code needed!

## Complete Error Handling Pattern

\`\`\`tsx
'use client';
import { useOptimistic, useState } from 'react';

function LikeButton({ initialLikes }: { initialLikes: number }) {
  const [optimisticLikes, setOptimisticLikes] = useOptimistic(
    initialLikes,
    (_, newLikes) => newLikes
  );
  const [error, setError] = useState<string | null>(null);

  const handleLike = async () => {
    setError(null);
    setOptimisticLikes(optimisticLikes + 1);

    try {
      const success = Math.random() > 0.3; // 70% success rate
      if (!success) throw new Error('Failed');
      await updateLikes(optimisticLikes + 1);
    } catch (err) {
      setError('Failed to update. Reverted.');
      // useOptimistic automatically reverts!
    }
  };

  return (
    <div>
      <button onClick={handleLike}>❤️ {optimisticLikes}</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}
\`\`\`

## Your Task

Create a **FollowButton** with error handling.

**Requirements:**
1. Accept \`initialFollowing\` prop (boolean)
2. Use useOptimistic to track following state
3. Updater function: \`(_, newState) => newState\`
4. Use useState for error messages
5. On click:
   - Clear error
   - Toggle optimistic state immediately
   - Simulate API (500ms delay)
   - 50% chance of failure (Math.random() > 0.5)
   - If fails, set error: "Failed to update. Please try again."
6. Button text: "Following" or "Follow"
7. Show error message below button in red`,
        hint: "Use Math.random() > 0.5 to simulate 50% failure rate. throw new Error() to trigger the catch block and automatic rollback.",
        starterCode: `'use client';
import { useOptimistic, useState } from 'react';

function FollowButton({ initialFollowing }: { initialFollowing: boolean }) {
  // TODO: Use useOptimistic for following state

  // TODO: Use useState for error message

  const handleFollow = async () => {
    // TODO: Clear error

    // TODO: Toggle optimistic state immediately

    try {
      // TODO: Simulate API call (500ms)
      // TODO: 50% chance of failure (Math.random() > 0.5)
      // TODO: If fails, throw error
    } catch (err) {
      // TODO: Set error message
    }
  };

  return (
    <div>
      <button onClick={handleFollow}>
        {/* TODO: Show "Following" or "Follow" based on state */}
      </button>

      {/* TODO: Show error message if error exists */}
    </div>
  );
}

export default FollowButton;`,
        solution: `'use client';
import { useOptimistic, useState } from 'react';

function FollowButton({ initialFollowing }: { initialFollowing: boolean }) {
  const [optimisticFollowing, setOptimisticFollowing] = useOptimistic(
    initialFollowing,
    (_, newState) => newState
  );
  const [error, setError] = useState<string | null>(null);

  const handleFollow = async () => {
    setError(null);
    setOptimisticFollowing(!optimisticFollowing);

    try {
      await new Promise(resolve => setTimeout(resolve, 500));

      // Simulate 50% failure rate
      if (Math.random() > 0.5) {
        throw new Error('Failed to update');
      }
    } catch (err) {
      setError('Failed to update. Please try again.');
    }
  };

  return (
    <div>
      <button onClick={handleFollow}>
        {optimisticFollowing ? 'Following' : 'Follow'}
      </button>

      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}

export default FollowButton;`,
        testCases: [
          {
            id: "test-1",
            description: "Should use useOptimistic for following state",
            testFunction: `return code.includes('useOptimistic') && code.includes('initialFollowing');`,
            errorMessage: "Should use useOptimistic with initialFollowing"
          },
          {
            id: "test-2",
            description: "Should have error state",
            testFunction: `return code.includes('useState') && /error|Error/.test(code);`,
            errorMessage: "Should use useState to track error messages"
          },
          {
            id: "test-3",
            description: "Should toggle state optimistically",
            testFunction: `
              const hasToggle = code.includes('!optimistic') || code.includes('!following');
              const beforeAwait = /setOptimistic[^;]*;[\\s\\S]*await/.test(code);
              return hasToggle && beforeAwait;
            `,
            errorMessage: "Should toggle optimistic state BEFORE the await"
          },
          {
            id: "test-4",
            description: "Should simulate failure",
            testFunction: `return code.includes('Math.random()') && code.includes('0.5') && code.includes('throw');`,
            errorMessage: "Should use Math.random() > 0.5 to simulate 50% failure rate"
          },
          {
            id: "test-5",
            description: "Should show error message",
            testFunction: `return code.includes('error') && code.includes('color') && code.includes('red');`,
            errorMessage: "Should display error message in red when error occurs"
          }
        ],
        language: "tsx"
      },
      {
        id: "production-patterns-09-step-3",
        order: 3,
        instruction: `# Complex Optimistic Updates: Shopping Cart

Let's build a real-world example: **optimistic shopping cart** with add/remove operations.

## List Management Pattern

\`\`\`tsx
'use client';
import { useOptimistic } from 'react';

type CartItem = { id: number; name: string; quantity: number };

function ShoppingCart({ initialItems }: { initialItems: CartItem[] }) {
  const [optimisticItems, updateItems] = useOptimistic(
    initialItems,
    (currentItems, action: { type: 'add' | 'remove'; item: CartItem }) => {
      if (action.type === 'add') {
        return [...currentItems, action.item];
      } else {
        return currentItems.filter(item => item.id !== action.item.id);
      }
    }
  );

  const addItem = async (item: CartItem) => {
    // Update UI immediately
    updateItems({ type: 'add', item });

    // Sync with server
    await saveToCart(item);
  };

  const removeItem = async (id: number) => {
    const item = optimisticItems.find(i => i.id === id)!;

    // Update UI immediately
    updateItems({ type: 'remove', item });

    // Sync with server
    await removeFromCart(id);
  };

  return (
    <div>
      {optimisticItems.map(item => (
        <div key={item.id}>
          {item.name} (x{item.quantity})
          <button onClick={() => removeItem(item.id)}>Remove</button>
        </div>
      ))}
    </div>
  );
}
\`\`\`

## Your Task

Create a **TodoList** with optimistic add/remove operations.

**Requirements:**

1. **Types:**
   \`\`\`tsx
   type Todo = { id: number; text: string };
   type Action =
     | { type: 'add'; todo: Todo }
     | { type: 'remove'; id: number };
   \`\`\`

2. **useOptimistic setup:**
   - Initial state: initialTodos prop
   - Updater handles 'add' and 'remove' actions
   - Add: append new todo to array
   - Remove: filter out todo by id

3. **addTodo function:**
   - Create todo with id = Date.now(), text from input
   - Update optimistic state immediately
   - Simulate API (300ms delay)

4. **removeTodo function:**
   - Update optimistic state immediately
   - Simulate API (300ms delay)

5. **UI:**
   - Input for new todo text
   - "Add Todo" button
   - List of todos with "Done" button to remove
   - Each todo shows its text`,
        hint: "Use the updater function to handle both add and remove actions. For add, return [...currentItems, action.todo]. For remove, return currentItems.filter(item => item.id !== action.id).",
        starterCode: `'use client';
import { useOptimistic, useState } from 'react';

type Todo = { id: number; text: string };
type Action =
  | { type: 'add'; todo: Todo }
  | { type: 'remove'; id: number };

function TodoList({ initialTodos }: { initialTodos: Todo[] }) {
  const [input, setInput] = useState('');

  // TODO: Set up useOptimistic
  // Updater should handle 'add' and 'remove' actions

  const addTodo = async () => {
    if (!input.trim()) return;

    const newTodo = { id: Date.now(), text: input };

    // TODO: Update optimistic state immediately

    setInput('');

    // TODO: Simulate API call (300ms)
  };

  const removeTodo = async (id: number) => {
    // TODO: Update optimistic state immediately

    // TODO: Simulate API call (300ms)
  };

  return (
    <div>
      <input
        value={input}
        onChange={e => setInput(e.target.value)}
        placeholder="New todo"
      />
      <button onClick={addTodo}>Add Todo</button>

      <ul>
        {/* TODO: Map over optimistic todos and display */}
        {/* Each todo should have a "Done" button that calls removeTodo */}
      </ul>
    </div>
  );
}

export default TodoList;`,
        solution: `'use client';
import { useOptimistic, useState } from 'react';

type Todo = { id: number; text: string };
type Action =
  | { type: 'add'; todo: Todo }
  | { type: 'remove'; id: number };

function TodoList({ initialTodos }: { initialTodos: Todo[] }) {
  const [input, setInput] = useState('');

  const [optimisticTodos, updateTodos] = useOptimistic(
    initialTodos,
    (currentTodos, action: Action) => {
      if (action.type === 'add') {
        return [...currentTodos, action.todo];
      } else {
        return currentTodos.filter(todo => todo.id !== action.id);
      }
    }
  );

  const addTodo = async () => {
    if (!input.trim()) return;

    const newTodo = { id: Date.now(), text: input };

    // Update UI immediately
    updateTodos({ type: 'add', todo: newTodo });

    setInput('');

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 300));
  };

  const removeTodo = async (id: number) => {
    // Update UI immediately
    updateTodos({ type: 'remove', id });

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 300));
  };

  return (
    <div>
      <input
        value={input}
        onChange={e => setInput(e.target.value)}
        placeholder="New todo"
      />
      <button onClick={addTodo}>Add Todo</button>

      <ul>
        {optimisticTodos.map(todo => (
          <li key={todo.id}>
            {todo.text}
            <button onClick={() => removeTodo(todo.id)}>Done</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;`,
        testCases: [
          {
            id: "test-1",
            description: "Should use useOptimistic with updater function",
            testFunction: `
              const hasUseOptimistic = code.includes('useOptimistic');
              const hasUpdater = /useOptimistic\\s*\\([^,]+,\\s*\\([^)]*\\)\\s*=>/.test(code);
              return hasUseOptimistic && hasUpdater;
            `,
            errorMessage: "Should use useOptimistic with an updater function"
          },
          {
            id: "test-2",
            description: "Should handle 'add' action",
            testFunction: `
              const hasAddCase = /type.*===.*['"]add['"]/.test(code) || /action\\.type\\s*===\\s*['"]add['"]/.test(code);
              const spreadsArray = code.includes('...') && code.includes('currentTodos');
              return hasAddCase && spreadsArray;
            `,
            errorMessage: "Updater should handle 'add' action by spreading array and adding new todo"
          },
          {
            id: "test-3",
            description: "Should handle 'remove' action",
            testFunction: `
              const hasRemoveCase = /type.*===.*['"]remove['"]/.test(code) || /action\\.type\\s*===\\s*['"]remove['"]/.test(code);
              const hasFilter = code.includes('.filter(');
              return hasRemoveCase && hasFilter;
            `,
            errorMessage: "Updater should handle 'remove' action by filtering out the todo"
          },
          {
            id: "test-4",
            description: "Should update optimistically before API call",
            testFunction: `
              const hasUpdateTodos = code.includes('updateTodos');
              const beforeAwait = /updateTodos[^;]*;[\\s\\S]*await/.test(code);
              return hasUpdateTodos && beforeAwait;
            `,
            errorMessage: "Should call updateTodos BEFORE the await for instant updates"
          },
          {
            id: "test-5",
            description: "Should render optimistic todos",
            testFunction: `
              const mapsOptimistic = code.includes('optimisticTodos.map') || code.includes('optimisticTodos?.map');
              const hasRemoveButton = code.includes('removeTodo');
              return mapsOptimistic && hasRemoveButton;
            `,
            errorMessage: "Should map over optimisticTodos and render with remove buttons"
          }
        ],
        language: "tsx"
      }
    ]
  }
];
