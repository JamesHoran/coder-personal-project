/**
 * React Course - Phase 2: Practitioner Proficiency
 * Module 2.1: Advanced Hooks (16 lessons)
 *
 * This module covers advanced React hooks including useEffect, useContext,
 * and useReducer. Students learn side effects, context API, complex state management,
 * and critical cleanup patterns to prevent memory leaks and race conditions.
 */

import { InteractiveLesson } from "@/types";

export const advancedHooksLessons: InteractiveLesson[] = [
  // Lesson 1: useEffect Basics
  {
    id: "advanced-hooks-01",
    moduleId: "module-2-1",
    title: "useEffect Basics",
    order: 1,
    xpReward: 150,
    difficulty: "intermediate",
    steps: [
      {
        id: "advanced-hooks-01-step-1",
        order: 1,
        instruction: `
# useEffect Basics

The \`useEffect\` hook lets you perform **side effects** in function components. Side effects include data fetching, subscriptions, manually changing the DOM, timers, and logging.

\`\`\`jsx
import { useState, useEffect } from 'react';

function Example() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = \`You clicked \${count} times\`;
  });

  return <button onClick={() => setCount(count + 1)}>Click me</button>;
}
\`\`\`

**Key Concepts:**
- \`useEffect\` runs after every render by default
- It takes a function that contains your side effect code
- Effects run after React updates the DOM
- Effects replace lifecycle methods like \`componentDidMount\` and \`componentDidUpdate\`

## Your Task

Create a component named \`PageTitle\` that updates the document title:

1. Import \`useState\` and \`useEffect\` from React
2. Destructure a prop called \`title\`
3. Use \`useEffect\` to set \`document.title\` to the title prop
4. Return a \`<div>\` with className "page-title"
5. Display an \`<h1>\` with text "Current Title: {title}"
        `,
        hint: "useEffect takes a callback function. Inside it, set document.title = title. Don't forget to import useEffect from 'react'.",
        starterCode: `import React, { useState, useEffect } from 'react';

function PageTitle({ title }) {
  // Add useEffect here


  return (
    <div className="page-title">
      <h1>Current Title: {title}</h1>
    </div>
  );
}

export default PageTitle;`,
        solution: `import React, { useState, useEffect } from 'react';

function PageTitle({ title }) {
  useEffect(() => {
    document.title = title;
  });

  return (
    <div className="page-title">
      <h1>Current Title: {title}</h1>
    </div>
  );
}

export default PageTitle;`,
        testCases: [
          {
            id: "test-1",
            description: "Should import useEffect from React",
            testFunction: `code.includes('useEffect') && code.includes("from 'react'")`,
          },
          {
            id: "test-2",
            description: "Should use useEffect hook",
            testFunction: `code.includes('useEffect(')`,
          },
          {
            id: "test-3",
            description: "Should set document.title inside useEffect",
            testFunction: `code.includes('document.title') && code.includes('useEffect')`,
          },
          {
            id: "test-4",
            description: "Should display the title in an h1",
            testFunction: `
              const { getByText } = render(<PageTitle title="Test Page" />);
              getByText('Current Title: Test Page') !== null
            `,
          },
          {
            id: "test-5",
            description: "Should have className 'page-title' on the div",
            testFunction: `
              const { container } = render(<PageTitle title="Test" />);
              container.querySelector('div.page-title') !== null
            `,
          },
        ],
        language: "jsx",
      },
    ],
  },

  // Lesson 2: Effect Dependencies
  {
    id: "advanced-hooks-02",
    moduleId: "module-2-1",
    title: "Effect Dependencies",
    order: 2,
    xpReward: 200,
    difficulty: "intermediate",
    steps: [
      {
        id: "advanced-hooks-02-step-1",
        order: 1,
        instruction: `
# Effect Dependencies

By default, \`useEffect\` runs after **every** render. To control when it runs, pass a **dependency array** as the second argument.

\`\`\`jsx
useEffect(() => {
  console.log('Runs after every render');
});

useEffect(() => {
  console.log('Runs only once on mount');
}, []);

useEffect(() => {
  console.log('Runs only when count changes');
}, [count]);
\`\`\`

**Dependency Array Patterns:**
- **No array:** Effect runs after every render
- **Empty array \`[]\`:** Effect runs only once (on mount)
- **\`[dep1, dep2]\`:** Effect runs when dep1 or dep2 changes

## Your Task

Create a component named \`UserGreeting\` that shows a greeting message:

1. Import \`useState\` and \`useEffect\`
2. Destructure props: \`userName\` and \`isOnline\`
3. Create state \`greeting\` with initial value "Welcome"
4. Use \`useEffect\` with dependency array \`[userName, isOnline]\`
5. Inside the effect, update greeting based on the props:
   - If isOnline is true: "Welcome back, {userName}!"
   - If isOnline is false: "{userName} is offline"
6. Return a \`<div>\` with className "user-greeting"
7. Display an \`<h2>\` showing the greeting
8. Display a \`<p>\` showing "Status: {isOnline ? 'Online' : 'Offline'}"
        `,
        hint: "Use setGreeting inside useEffect. The effect should only run when userName or isOnline changes. Use template literals for the greeting strings.",
        starterCode: `import React, { useState, useEffect } from 'react';

function UserGreeting({ userName, isOnline }) {
  const [greeting, setGreeting] = useState('Welcome');

  // Add useEffect with dependencies here


  return (
    <div className="user-greeting">
      <h2>{greeting}</h2>
      {/* Add status paragraph here */}
    </div>
  );
}

export default UserGreeting;`,
        solution: `import React, { useState, useEffect } from 'react';

function UserGreeting({ userName, isOnline }) {
  const [greeting, setGreeting] = useState('Welcome');

  useEffect(() => {
    if (isOnline) {
      setGreeting(\`Welcome back, \${userName}!\`);
    } else {
      setGreeting(\`\${userName} is offline\`);
    }
  }, [userName, isOnline]);

  return (
    <div className="user-greeting">
      <h2>{greeting}</h2>
      <p>Status: {isOnline ? 'Online' : 'Offline'}</p>
    </div>
  );
}

export default UserGreeting;`,
        testCases: [
          {
            id: "test-1",
            description: "Should use useState for greeting",
            testFunction: `code.includes('useState') && code.includes('greeting')`,
          },
          {
            id: "test-2",
            description: "Should use useEffect with dependency array",
            testFunction: `code.includes('useEffect') && code.includes('[userName, isOnline]')`,
          },
          {
            id: "test-3",
            description: "Should display 'Welcome back' when user is online",
            testFunction: `
              const { getByText } = render(<UserGreeting userName="Alice" isOnline={true} />);
              getByText('Welcome back, Alice!') !== null
            `,
          },
          {
            id: "test-4",
            description: "Should display 'is offline' when user is offline",
            testFunction: `
              const { getByText } = render(<UserGreeting userName="Bob" isOnline={false} />);
              getByText('Bob is offline') !== null
            `,
          },
          {
            id: "test-5",
            description: "Should display status as 'Online' when isOnline is true",
            testFunction: `
              const { getByText } = render(<UserGreeting userName="Alice" isOnline={true} />);
              getByText('Status: Online') !== null
            `,
          },
          {
            id: "test-6",
            description: "Should display status as 'Offline' when isOnline is false",
            testFunction: `
              const { getByText } = render(<UserGreeting userName="Bob" isOnline={false} />);
              getByText('Status: Offline') !== null
            `,
          },
        ],
        language: "jsx",
      },
    ],
  },

  // Lesson 3: Cleanup Functions
  {
    id: "advanced-hooks-03",
    moduleId: "module-2-1",
    title: "Cleanup Functions",
    order: 3,
    xpReward: 200,
    difficulty: "intermediate",
    steps: [
      {
        id: "advanced-hooks-03-step-1",
        order: 1,
        instruction: `
# Cleanup Functions

Some effects require **cleanup** to prevent memory leaks. Examples include timers, subscriptions, and event listeners.

\`\`\`jsx
useEffect(() => {
  const timer = setInterval(() => {
    console.log('Tick');
  }, 1000);

  // Cleanup function runs before component unmounts
  return () => {
    clearInterval(timer);
  };
}, []);
\`\`\`

**When Cleanup Runs:**
- Before the effect runs again (if dependencies changed)
- When the component unmounts

**Common cleanup scenarios:**
- Clear timers (\`clearInterval\`, \`clearTimeout\`)
- Remove event listeners
- Cancel network requests
- Unsubscribe from subscriptions

## Warning: Stale Closures

When using state in setInterval, you might encounter stale closures:

\`\`\`jsx
// WRONG - Stale closure bug
const [seconds, setSeconds] = useState(0);

useEffect(() => {
  const interval = setInterval(() => {
    setSeconds(seconds + 1);  // 'seconds' is always 0!
  }, 1000);

  return () => clearInterval(interval);
}, []);
\`\`\`

**Why it breaks:**
- \`seconds\` is captured from initial render (0)
- setInterval keeps referencing that old value
- Timer increments 0 + 1 = 1 forever

**Solution: Functional Updates**

\`\`\`jsx
// CORRECT - Use functional update
useEffect(() => {
  const interval = setInterval(() => {
    setSeconds(prev => prev + 1);  // Uses current value!
  }, 1000);

  return () => clearInterval(interval);
}, []);
\`\`\`

Now \`prev\` is always the current state value.

**Rule of thumb:**
- Timers/intervals: Use functional updates (\`prev => prev + 1\`)
- Event handlers: Either works (handlers re-create each render)
- Effects with dependencies: Add to dependency array OR use functional updates

## Your Task

Create a component named \`Timer\` that counts seconds:

1. Import \`useState\` and \`useEffect\`
2. Create state \`seconds\` with initial value 0
3. Use \`useEffect\` with empty dependency array \`[]\`
4. Inside the effect, create an interval that increments seconds every 1000ms
5. Return a cleanup function that clears the interval
6. Return a \`<div>\` with className "timer"
7. Display an \`<h2>\` showing "Timer: {seconds}s"
        `,
        hint: "Use setInterval to increment seconds. Store the interval ID in a variable. Return a function that calls clearInterval with that ID.",
        starterCode: `import React, { useState, useEffect } from 'react';

function Timer() {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    // Create interval here


    // Return cleanup function

  }, []);

  return (
    <div className="timer">
      <h2>Timer: {seconds}s</h2>
    </div>
  );
}

export default Timer;`,
        solution: `import React, { useState, useEffect } from 'react';

function Timer() {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(prev => prev + 1);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="timer">
      <h2>Timer: {seconds}s</h2>
    </div>
  );
}

export default Timer;`,
        testCases: [
          {
            id: "test-1",
            description: "Should create seconds state with initial value 0",
            testFunction: `code.includes('useState(0)') && code.includes('seconds')`,
          },
          {
            id: "test-2",
            description: "Should use useEffect with empty dependency array",
            testFunction: `code.includes('useEffect') && code.includes('[]')`,
          },
          {
            id: "test-3",
            description: "Should use setInterval",
            testFunction: `code.includes('setInterval')`,
          },
          {
            id: "test-4",
            description: "Should return a cleanup function that calls clearInterval",
            testFunction: `code.includes('return') && code.includes('clearInterval')`,
          },
          {
            id: "test-5",
            description: "Should display 'Timer: 0s' initially",
            testFunction: `
              const { getByText } = render(<Timer />);
              getByText('Timer: 0s') !== null
            `,
          },
          {
            id: "test-6",
            description: "Should store interval ID in a variable and cleanup properly",
            testFunction: `
              // Check that setInterval is assigned to a variable
              const hasSetInterval = code.includes('setInterval');
              const hasClearInterval = code.includes('clearInterval');
              // Check that cleanup function exists with clearInterval
              const hasCleanup = code.match(/return\\s*\\(\\s*\\)\\s*=>\\s*\\{[\\s\\S]*?clearInterval/) ||
                                 code.match(/return\\s*function\\s*\\(\\s*\\)[\\s\\S]*?clearInterval/);
              return hasSetInterval && hasClearInterval && hasCleanup !== null;
            `,
          },
        ],
        language: "jsx",
      },
    ],
  },

  // Lesson 4: Data Fetching with useEffect
  {
    id: "advanced-hooks-04",
    moduleId: "module-2-1",
    title: "Data Fetching with useEffect",
    order: 4,
    xpReward: 250,
    difficulty: "intermediate",
    steps: [
      {
        id: "advanced-hooks-04-step-1",
        order: 1,
        instruction: `
# Data Fetching with useEffect

One of the most common uses of \`useEffect\` is fetching data from APIs. This replaces the \`componentDidMount\` lifecycle method.

\`\`\`jsx
function UserData({ userId }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(\`/api/users/\${userId}\`)
      .then(response => response.json())
      .then(data => {
        setUser(data);
        setLoading(false);
      });
  }, [userId]);

  if (loading) return <p>Loading...</p>;
  return <h1>{user.name}</h1>;
}
\`\`\`

### Why Cleanup Matters

Without cleanup, if \`userId\` changes before the timeout completes:
1. Old timeout still runs (memory leak)
2. Sets state for wrong user (race condition)
3. May set state after component unmounts (React warning)

The cleanup function prevents these bugs by cancelling the pending operation.

**Best Practices:**
- Show loading state while fetching
- Handle errors gracefully
- Include fetch dependencies in the dependency array
- **ALWAYS include cleanup for async operations**

## Your Task

Create a component named \`UserProfile\` that fetches and displays user data WITH proper cleanup:

1. Import \`useState\` and \`useEffect\`
2. Destructure prop \`userId\`
3. Create state \`user\` with initial value \`null\`
4. Create state \`loading\` with initial value \`true\`
5. Use \`useEffect\` with \`[userId]\` as dependencies
6. Inside the effect:
   - Create a \`cancelled\` flag set to false
   - Set loading to true
   - Create a mock fetch by using setTimeout (500ms) to simulate API delay
   - Inside the timeout callback, check if \`!cancelled\` before setting state
   - Set user to an object: \`{ id: userId, name: \\\`User \${userId}\\\`, email: \\\`user\${userId}@example.com\\\` }\`
   - Set loading to false
   - Return a cleanup function that sets \`cancelled = true\`
7. If loading is true, return \`<div className="loading">Loading...</div>\`
8. Otherwise, return a \`<div>\` with className "user-profile" containing:
   - \`<h2>\` with user.name
   - \`<p>\` with user.email
        `,
        hint: "Use setTimeout to simulate async behavior. Remember to call setLoading(true) at the start of the effect. Use conditional rendering for the loading state.",
        starterCode: `import React, { useState, useEffect } from 'react';

function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Add data fetching logic here


  }, [userId]);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="user-profile">
      {/* Display user data here */}
    </div>
  );
}

export default UserProfile;`,
        solution: `import React, { useState, useEffect } from 'react';

function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);

    setTimeout(() => {
      if (!cancelled) {
        setUser({
          id: userId,
          name: \`User \${userId}\`,
          email: \`user\${userId}@example.com\`
        });
        setLoading(false);
      }
    }, 500);

    return () => {
      cancelled = true;
    };
  }, [userId]);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="user-profile">
      <h2>{user.name}</h2>
      <p>{user.email}</p>
    </div>
  );
}

export default UserProfile;`,
        testCases: [
          {
            id: "test-1",
            description: "Should create user state initialized to null",
            testFunction: `code.includes('useState(null)') && code.includes('user')`,
          },
          {
            id: "test-2",
            description: "Should create loading state initialized to true",
            testFunction: `code.includes('useState(true)') && code.includes('loading')`,
          },
          {
            id: "test-3",
            description: "Should use useEffect with userId dependency",
            testFunction: `code.includes('useEffect') && code.includes('[userId]')`,
          },
          {
            id: "test-4",
            description: "Should show loading message initially",
            testFunction: `
              const { container } = render(<UserProfile userId={1} />);
              container.querySelector('div.loading') !== null
            `,
          },
          {
            id: "test-5",
            description: "Should use setTimeout to simulate async behavior",
            testFunction: `code.includes('setTimeout')`,
          },
          {
            id: "test-6",
            description: "Should set loading to true at start of effect",
            testFunction: `
              const effectMatch = code.match(/useEffect\\(\\(\\)\\s*=>\\s*\\{([\\s\\S]*?)\\}/);
              effectMatch && effectMatch[1].indexOf('setLoading(true)') < effectMatch[1].indexOf('setTimeout')
            `,
          },
          {
            id: "test-7",
            description: "Should create user object with id, name, and email",
            testFunction: `code.includes('id: userId') && code.includes('name:') && code.includes('email:')`,
          },
          {
            id: "test-8",
            description: "Should use cancelled flag for cleanup",
            testFunction: `code.includes('let cancelled = false') || code.includes('let cancelled=false')`,
          },
          {
            id: "test-9",
            description: "Should check cancelled flag before setting state",
            testFunction: `code.includes('if (!cancelled)') || code.includes('if(!cancelled)')`,
          },
          {
            id: "test-10",
            description: "Should return cleanup function that sets cancelled to true",
            testFunction: `code.includes('return') && code.includes('cancelled = true')`,
          },
        ],
        language: "jsx",
      },
    ],
  },

  // Lesson 5: Preventing Race Conditions
  {
    id: "advanced-hooks-05",
    moduleId: "module-2-1",
    title: "Preventing Race Conditions",
    order: 5,
    xpReward: 200,
    difficulty: "intermediate",
    steps: [
      {
        id: "advanced-hooks-05-step-1",
        order: 1,
        instruction: `
# Race Conditions in useEffect

A **race condition** occurs when the order of async operations affects the final result incorrectly.

## The Problem

\`\`\`jsx
function SearchResults({ query }) {
  const [results, setResults] = useState([]);

  useEffect(() => {
    // Simulate API call
    fetch(\`/api/search?q=\${query}\`)
      .then(res => res.json())
      .then(data => setResults(data));
  }, [query]);

  return <div>{results.map(r => <p key={r.id}>{r.title}</p>)}</div>;
}
\`\`\`

**What goes wrong:**
1. User types "react" → Request A starts
2. User types "redux" → Request B starts
3. Request B completes → Shows Redux results ✅
4. Request A completes → Shows React results ❌

**Result:** UI shows results for "react" but search box says "redux"!

## The Solution

Use a cleanup function to ignore outdated results:

\`\`\`jsx
useEffect(() => {
  let cancelled = false;

  fetch(\`/api/search?q=\${query}\`)
    .then(res => res.json())
    .then(data => {
      if (!cancelled) {  // Only update if still relevant
        setResults(data);
      }
    });

  return () => {
    cancelled = true;  // Mark as cancelled
  };
}, [query]);
\`\`\`

Now old requests are ignored!

## Your Task

Fix the \`ProductFetcher\` component to prevent race conditions when \`productId\` changes rapidly.

**Requirements:**
1. Add a \`cancelled\` flag
2. Only set state if not cancelled
3. Return cleanup function that sets \`cancelled = true\`
        `,
        hint: "Add a let cancelled = false before the timeout",
        starterCode: `import React, { useState, useEffect } from 'react';

function ProductFetcher({ productId }) {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    // Simulate API call (500ms delay)
    setTimeout(() => {
      setProduct({
        id: productId,
        name: \`Product \${productId}\`,
        price: productId * 10
      });
      setLoading(false);
    }, 500);
  }, [productId]);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h2>{product.name}</h2>
      <p>Price: \${product.price}</p>
    </div>
  );
}

export default ProductFetcher;`,
        solution: `import React, { useState, useEffect } from 'react';

function ProductFetcher({ productId }) {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;  // Cleanup flag
    setLoading(true);

    setTimeout(() => {
      if (!cancelled) {  // Only update if not cancelled
        setProduct({
          id: productId,
          name: \`Product \${productId}\`,
          price: productId * 10
        });
        setLoading(false);
      }
    }, 500);

    return () => {
      cancelled = true;  // Cancel on cleanup
    };
  }, [productId]);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h2>{product.name}</h2>
      <p>Price: \${product.price}</p>
    </div>
  );
}

export default ProductFetcher;`,
        testCases: [
          {
            id: "test-1",
            description: "Should use cancelled flag for cleanup",
            testFunction: `code.includes('let cancelled = false') || code.includes('let cancelled=false')`,
          },
          {
            id: "test-2",
            description: "Should check cancelled flag before setting state",
            testFunction: `code.includes('if (!cancelled)') || code.includes('if(!cancelled)')`,
          },
          {
            id: "test-3",
            description: "Should return cleanup function that sets cancelled to true",
            testFunction: `code.includes('return') && code.includes('cancelled = true')`,
          },
          {
            id: "test-4",
            description: "Should wrap both setProduct and setLoading in cancelled check",
            testFunction: `
              const match = code.match(/if\s*\(\s*!cancelled\s*\)\s*\{[\s\S]*?setProduct[\s\S]*?setLoading[\s\S]*?\}/);
              match !== null
            `,
          },
          {
            id: "test-5",
            description: "Should use useEffect with productId dependency",
            testFunction: `code.includes('useEffect') && code.includes('[productId]')`,
          },
        ],
        language: "jsx",
      },
    ],
  },

  // Lesson 6: useEffect Best Practices
  {
    id: "advanced-hooks-06",
    moduleId: "module-2-1",
    title: "useEffect Best Practices",
    order: 6,
    xpReward: 200,
    difficulty: "intermediate",
    steps: [
      {
        id: "advanced-hooks-06-step-1",
        order: 1,
        instruction: `
# useEffect Best Practices

Follow these patterns to write clean, efficient, and bug-free effects:

**1. Always include dependencies**
\`\`\`jsx
// ❌ Bad: Missing dependencies
useEffect(() => {
  console.log(count);
}, []);

// ✅ Good: All dependencies included
useEffect(() => {
  console.log(count);
}, [count]);
\`\`\`

**2. One effect per concern**
\`\`\`jsx
// ❌ Bad: Multiple concerns in one effect
useEffect(() => {
  fetchUser();
  subscribeToNotifications();
  updateTitle();
}, []);

// ✅ Good: Separate effects
useEffect(() => fetchUser(), [userId]);
useEffect(() => subscribeToNotifications(), []);
useEffect(() => updateTitle(), [title]);
\`\`\`

**3. Clean up side effects**
\`\`\`jsx
// ✅ Always clean up subscriptions, timers, listeners
useEffect(() => {
  const subscription = subscribe();
  return () => subscription.unsubscribe();
}, []);
\`\`\`

## Your Task

Create a component named \`SearchBox\` with proper effect practices:

1. Import \`useState\` and \`useEffect\`
2. Create state \`searchTerm\` with initial value ""
3. Create state \`results\` with initial value \`[]\`
4. Create state \`isSearching\` with initial value false
5. Use useEffect with \`[searchTerm]\` as dependencies
6. Inside the effect:
   - If searchTerm is empty, set results to \`[]\` and return early
   - Set isSearching to true
   - Create a timeout (300ms debounce) that:
     - Sets results to \`[\\\`Result for "\${searchTerm}"\\\`]\`
     - Sets isSearching to false
   - Return a cleanup function that clears the timeout
7. Return a \`<div>\` with className "search-box" containing:
   - An \`<input>\` that updates searchTerm on change
   - A \`<p>\` showing "Searching..." if isSearching is true
   - A \`<ul>\` mapping results to \`<li>\` elements
        `,
        hint: "Use setTimeout for debouncing. Store the timeout ID and clear it in the cleanup function. Check if searchTerm is empty at the start of the effect.",
        starterCode: `import React, { useState, useEffect } from 'react';

function SearchBox() {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    // Add effect logic here



  }, [searchTerm]);

  return (
    <div className="search-box">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {/* Add conditional rendering and results list here */}
    </div>
  );
}

export default SearchBox;`,
        solution: `import React, { useState, useEffect } from 'react';

function SearchBox() {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    if (!searchTerm) {
      setResults([]);
      return;
    }

    setIsSearching(true);
    const timeout = setTimeout(() => {
      setResults([\`Result for "\${searchTerm}"\`]);
      setIsSearching(false);
    }, 300);

    return () => clearTimeout(timeout);
  }, [searchTerm]);

  return (
    <div className="search-box">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {isSearching && <p>Searching...</p>}
      <ul>
        {results.map((result) => (
          <li key={result}>{result}</li>
        ))}
      </ul>
    </div>
  );
}

export default SearchBox;`,
        testCases: [
          {
            id: "test-1",
            description: "Should create all required state variables",
            testFunction: `code.includes('searchTerm') && code.includes('results') && code.includes('isSearching')`,
          },
          {
            id: "test-2",
            description: "Should use useEffect with searchTerm dependency",
            testFunction: `code.includes('useEffect') && code.includes('[searchTerm]')`,
          },
          {
            id: "test-3",
            description: "Should return early if searchTerm is empty",
            testFunction: `code.includes('if (!searchTerm)') || code.includes('if (searchTerm === \\'\\')')`,
          },
          {
            id: "test-4",
            description: "Should use setTimeout for debouncing",
            testFunction: `code.includes('setTimeout')`,
          },
          {
            id: "test-5",
            description: "Should return cleanup function with clearTimeout",
            testFunction: `code.includes('return') && code.includes('clearTimeout')`,
          },
          {
            id: "test-6",
            description: "Should set isSearching to true before timeout",
            testFunction: `code.includes('setIsSearching(true)')`,
          },
          {
            id: "test-7",
            description: "Should have controlled input with value and onChange",
            testFunction: `code.includes('value={searchTerm}') && code.includes('onChange')`,
          },
        ],
        language: "jsx",
      },
    ],
  },

  // Lesson 7: useContext Introduction
  {
    id: "advanced-hooks-07",
    moduleId: "module-2-1",
    title: "useContext Introduction",
    order: 7,
    xpReward: 150,
    difficulty: "intermediate",
    steps: [
      {
        id: "advanced-hooks-07-step-1",
        order: 1,
        instruction: `
# useContext Introduction

**Context** provides a way to pass data through the component tree without having to pass props down manually at every level. This solves "prop drilling" - passing props through many layers.

**Without Context (Prop Drilling):**
\`\`\`jsx
<App theme="dark">
  <Header theme="dark">
    <Navigation theme="dark">
      <Button theme="dark" />  // Props passed through 3 levels!
    </Navigation>
  </Header>
</App>
\`\`\`

**With Context:**
\`\`\`jsx
const ThemeContext = createContext('light');

function Button() {
  const theme = useContext(ThemeContext);  // Direct access!
  return <button className={theme}>Click</button>;
}
\`\`\`

**Benefits:**
- Avoid prop drilling
- Share global state (theme, auth, language)
- Cleaner component interfaces
- Better separation of concerns

## Your Task

Create a simple component that consumes a theme context:

1. Import \`useContext\` from React
2. A ThemeContext is already created and provided for you
3. Create a component named \`ThemedButton\`
4. Inside the component, use \`useContext(ThemeContext)\` to get the theme value
5. Return a \`<button>\` with className set to the theme value
6. The button text should be "Themed Button"
        `,
        hint: "Call useContext(ThemeContext) and store the result in a variable. Use that variable in the className.",
        starterCode: `import React, { useContext, createContext } from 'react';

// ThemeContext is provided for you
const ThemeContext = createContext('light');

function ThemedButton() {
  // Use useContext to get the theme


  return (
    // Add button here
  );
}

// This wrapper is for testing - you don't need to modify it
function TestWrapper() {
  return (
    <ThemeContext.Provider value="dark">
      <ThemedButton />
    </ThemeContext.Provider>
  );
}

export { ThemeContext };
export default ThemedButton;`,
        solution: `import React, { useContext, createContext } from 'react';

const ThemeContext = createContext('light');

function ThemedButton() {
  const theme = useContext(ThemeContext);

  return <button className={theme}>Themed Button</button>;
}

function TestWrapper() {
  return (
    <ThemeContext.Provider value="dark">
      <ThemedButton />
    </ThemeContext.Provider>
  );
}

export { ThemeContext };
export default ThemedButton;`,
        testCases: [
          {
            id: "test-1",
            description: "Should import useContext from React",
            testFunction: `code.includes('useContext')`,
          },
          {
            id: "test-2",
            description: "Should call useContext with ThemeContext",
            testFunction: `code.includes('useContext(ThemeContext)')`,
          },
          {
            id: "test-3",
            description: "Should store context value in a variable",
            testFunction: `code.match(/const\\s+\\w+\\s*=\\s*useContext/)`,
          },
          {
            id: "test-4",
            description: "Should render a button",
            testFunction: `
              const { container } = render(<ThemedButton />);
              container.querySelector('button') !== null
            `,
          },
          {
            id: "test-5",
            description: "Should use theme value as className",
            testFunction: `code.includes('className={') && code.includes('theme')`,
          },
          {
            id: "test-6",
            description: "Button should have text 'Themed Button'",
            testFunction: `
              const { getByText } = render(<ThemedButton />);
              getByText('Themed Button') !== null
            `,
          },
        ],
        language: "jsx",
      },
    ],
  },

  // Lesson 8: Creating Context
  {
    id: "advanced-hooks-08",
    moduleId: "module-2-1",
    title: "Creating Context",
    order: 8,
    xpReward: 200,
    difficulty: "intermediate",
    steps: [
      {
        id: "advanced-hooks-08-step-1",
        order: 1,
        instruction: `
# Creating Context

To create a context, use \`createContext\`. This creates a Context object that components can subscribe to.

\`\`\`jsx
import { createContext } from 'react';

// Create context with default value
const UserContext = createContext(null);

// Or with a more complex default
const ThemeContext = createContext({
  color: 'blue',
  mode: 'light'
});
\`\`\`

**Context Structure:**
- \`createContext(defaultValue)\` creates the context
- Returns an object with \`Provider\` and \`Consumer\` properties
- Default value is used when no Provider is found
- Context can hold any type: objects, arrays, strings, numbers, functions

**Naming Convention:**
- Name contexts with "Context" suffix: \`UserContext\`, \`ThemeContext\`
- Export contexts so other components can consume them

## Your Task

Create a user authentication context:

1. Import \`createContext\` from React
2. Create a context named \`AuthContext\` with default value: \`{ user: null, isAuthenticated: false }\`
3. Create a component named \`AuthDisplay\` that:
   - Uses \`useContext(AuthContext)\`
   - Destructures \`user\` and \`isAuthenticated\` from the context
   - Returns a \`<div>\` with className "auth-display"
   - Shows \`<p>Status: {isAuthenticated ? 'Logged In' : 'Logged Out'}</p>\`
   - Shows \`<p>User: {user ? user : 'None'}</p>\`
4. Export both AuthContext and AuthDisplay
        `,
        hint: "Use createContext with an object containing user and isAuthenticated. In AuthDisplay, destructure the context value.",
        starterCode: `import React, { createContext, useContext } from 'react';

// Create AuthContext here


function AuthDisplay() {
  // Use context here


  return (
    <div className="auth-display">
      {/* Add your JSX here */}
    </div>
  );
}

export { AuthContext };
export default AuthDisplay;`,
        solution: `import React, { createContext, useContext } from 'react';

const AuthContext = createContext({
  user: null,
  isAuthenticated: false
});

function AuthDisplay() {
  const { user, isAuthenticated } = useContext(AuthContext);

  return (
    <div className="auth-display">
      <p>Status: {isAuthenticated ? 'Logged In' : 'Logged Out'}</p>
      <p>User: {user ? user : 'None'}</p>
    </div>
  );
}

export { AuthContext };
export default AuthDisplay;`,
        testCases: [
          {
            id: "test-1",
            description: "Should import createContext from React",
            testFunction: `code.includes('createContext')`,
          },
          {
            id: "test-2",
            description: "Should create AuthContext",
            testFunction: `code.includes('AuthContext') && code.includes('createContext')`,
          },
          {
            id: "test-3",
            description: "AuthContext should have default value with user and isAuthenticated",
            testFunction: `code.includes('user:') && code.includes('isAuthenticated:')`,
          },
          {
            id: "test-4",
            description: "Should use useContext with AuthContext",
            testFunction: `code.includes('useContext(AuthContext)')`,
          },
          {
            id: "test-5",
            description: "Should destructure user and isAuthenticated from context",
            testFunction: `code.includes('user') && code.includes('isAuthenticated') && code.includes('{')`,
          },
          {
            id: "test-6",
            description: "Should show 'Logged Out' when not authenticated",
            testFunction: `
              const { getByText } = render(<AuthDisplay />);
              getByText('Status: Logged Out') !== null
            `,
          },
          {
            id: "test-7",
            description: "Should show 'None' when no user",
            testFunction: `
              const { getByText } = render(<AuthDisplay />);
              getByText('User: None') !== null
            `,
          },
        ],
        language: "jsx",
      },
    ],
  },

  // Lesson 9: Context Provider
  {
    id: "advanced-hooks-09",
    moduleId: "module-2-1",
    title: "Context Provider",
    order: 9,
    xpReward: 200,
    difficulty: "intermediate",
    steps: [
      {
        id: "advanced-hooks-09-step-1",
        order: 1,
        instruction: `
# Context Provider

The **Provider** component allows consuming components to subscribe to context changes. It accepts a \`value\` prop to be passed to consuming components.

\`\`\`jsx
const ThemeContext = createContext('light');

function App() {
  const [theme, setTheme] = useState('dark');

  return (
    <ThemeContext.Provider value={theme}>
      <Header />
      <Main />
    </ThemeContext.Provider>
  );
}

function Header() {
  const theme = useContext(ThemeContext);  // Gets 'dark'
  return <header className={theme}>Header</header>;
}
\`\`\`

**Key Points:**
- Wrap components that need access to the context
- All descendants can consume the context
- Value prop can be any type
- Provider can be nested for different scopes
- When value changes, all consumers re-render

## Your Task

Create a settings context provider:

1. Import \`createContext\`, \`useContext\`, and \`useState\`
2. Create \`SettingsContext\` with default value \`{ fontSize: 16, darkMode: false }\`
3. Create a component named \`SettingsProvider\` that:
   - Accepts a \`children\` prop
   - Creates state \`settings\` with initial value \`{ fontSize: 16, darkMode: false }\`
   - Returns \`<SettingsContext.Provider value={settings}>{children}</SettingsContext.Provider>\`
4. Create a component named \`SettingsDisplay\` that:
   - Uses \`useContext(SettingsContext)\`
   - Returns a \`<div>\` with className "settings-display"
   - Shows \`<p>Font Size: {fontSize}px</p>\`
   - Shows \`<p>Dark Mode: {darkMode ? 'On' : 'Off'}</p>\`
5. Export SettingsContext, SettingsProvider, and SettingsDisplay
        `,
        hint: "SettingsProvider wraps children with the Provider. Destructure fontSize and darkMode in SettingsDisplay.",
        starterCode: `import React, { createContext, useContext, useState } from 'react';

// Create SettingsContext


function SettingsProvider({ children }) {
  // Create settings state


  return (
    // Add Provider here
  );
}

function SettingsDisplay() {
  // Use context


  return (
    <div className="settings-display">
      {/* Display settings */}
    </div>
  );
}

export { SettingsContext, SettingsProvider };
export default SettingsDisplay;`,
        solution: `import React, { createContext, useContext, useState } from 'react';

const SettingsContext = createContext({
  fontSize: 16,
  darkMode: false
});

function SettingsProvider({ children }) {
  const [settings] = useState({
    fontSize: 16,
    darkMode: false
  });

  return (
    <SettingsContext.Provider value={settings}>
      {children}
    </SettingsContext.Provider>
  );
}

function SettingsDisplay() {
  const { fontSize, darkMode } = useContext(SettingsContext);

  return (
    <div className="settings-display">
      <p>Font Size: {fontSize}px</p>
      <p>Dark Mode: {darkMode ? 'On' : 'Off'}</p>
    </div>
  );
}

export { SettingsContext, SettingsProvider };
export default SettingsDisplay;`,
        testCases: [
          {
            id: "test-1",
            description: "Should create SettingsContext with default values",
            testFunction: `code.includes('SettingsContext') && code.includes('fontSize') && code.includes('darkMode')`,
          },
          {
            id: "test-2",
            description: "SettingsProvider should accept children prop",
            testFunction: `code.includes('function SettingsProvider({ children })')`,
          },
          {
            id: "test-3",
            description: "SettingsProvider should use useState for settings",
            testFunction: `code.includes('useState') && code.includes('settings')`,
          },
          {
            id: "test-4",
            description: "SettingsProvider should render Context.Provider",
            testFunction: `code.includes('SettingsContext.Provider')`,
          },
          {
            id: "test-5",
            description: "Provider should have value prop with settings",
            testFunction: `code.includes('value={settings}')`,
          },
          {
            id: "test-6",
            description: "Provider should render children",
            testFunction: `code.includes('{children}')`,
          },
          {
            id: "test-7",
            description: "SettingsDisplay should use useContext",
            testFunction: `code.includes('useContext(SettingsContext)')`,
          },
        ],
        language: "jsx",
      },
    ],
  },

  // Lesson 10: useContext Hook
  {
    id: "advanced-hooks-10",
    moduleId: "module-2-1",
    title: "useContext Hook",
    order: 10,
    xpReward: 200,
    difficulty: "intermediate",
    steps: [
      {
        id: "advanced-hooks-10-step-1",
        order: 1,
        instruction: `
# useContext Hook

\`useContext\` is the modern way to consume context in function components. It's cleaner and easier than the old Context.Consumer pattern.

**Old Way (Consumer):**
\`\`\`jsx
<ThemeContext.Consumer>
  {theme => <div className={theme}>Content</div>}
</ThemeContext.Consumer>
\`\`\`

**New Way (useContext):**
\`\`\`jsx
function MyComponent() {
  const theme = useContext(ThemeContext);
  return <div className={theme}>Content</div>;
}
\`\`\`

**useContext Features:**
- Cleaner syntax than Consumer
- Can use context values in logic, not just JSX
- Can consume multiple contexts easily
- Must be used at the top level of the component

## Your Task

Create a multi-context consuming component:

1. Two contexts are provided: \`UserContext\` and \`ThemeContext\`
2. Create a component named \`ProfileCard\` that:
   - Uses \`useContext\` to get the user from UserContext
   - Uses \`useContext\` to get the theme from ThemeContext
   - Returns a \`<div>\` with className equal to the theme value
   - Inside the div, show:
     - An \`<h2>\` with the user.name
     - A \`<p>\` with the user.role
     - A \`<p>\` with text "Theme: {theme}"
        `,
        hint: "Call useContext twice - once for each context. Use the theme as the className.",
        starterCode: `import React, { useContext, createContext } from 'react';

// Contexts provided for you
const UserContext = createContext({ name: 'Guest', role: 'Visitor' });
const ThemeContext = createContext('light');

function ProfileCard() {
  // Use both contexts here



  return (
    // Add your JSX here
  );
}

// Test wrapper (don't modify)
function TestWrapper() {
  return (
    <UserContext.Provider value={{ name: 'Alice', role: 'Developer' }}>
      <ThemeContext.Provider value="dark">
        <ProfileCard />
      </ThemeContext.Provider>
    </UserContext.Provider>
  );
}

export { UserContext, ThemeContext };
export default ProfileCard;`,
        solution: `import React, { useContext, createContext } from 'react';

const UserContext = createContext({ name: 'Guest', role: 'Visitor' });
const ThemeContext = createContext('light');

function ProfileCard() {
  const user = useContext(UserContext);
  const theme = useContext(ThemeContext);

  return (
    <div className={theme}>
      <h2>{user.name}</h2>
      <p>{user.role}</p>
      <p>Theme: {theme}</p>
    </div>
  );
}

function TestWrapper() {
  return (
    <UserContext.Provider value={{ name: 'Alice', role: 'Developer' }}>
      <ThemeContext.Provider value="dark">
        <ProfileCard />
      </ThemeContext.Provider>
    </UserContext.Provider>
  );
}

export { UserContext, ThemeContext };
export default ProfileCard;`,
        testCases: [
          {
            id: "test-1",
            description: "Should use useContext for UserContext",
            testFunction: `code.includes('useContext(UserContext)')`,
          },
          {
            id: "test-2",
            description: "Should use useContext for ThemeContext",
            testFunction: `code.includes('useContext(ThemeContext)')`,
          },
          {
            id: "test-3",
            description: "Should render div with theme as className",
            testFunction: `code.includes('className={theme}')`,
          },
          {
            id: "test-4",
            description: "Should display user name in h2",
            testFunction: `code.includes('<h2>{user.name}</h2>')`,
          },
          {
            id: "test-5",
            description: "Should display user role in p",
            testFunction: `code.includes('<p>{user.role}</p>')`,
          },
          {
            id: "test-6",
            description: "Should display theme text",
            testFunction: `code.includes('Theme: {theme}')`,
          },
        ],
        language: "jsx",
      },
    ],
  },

  // Lesson 11: Context Best Practices
  {
    id: "advanced-hooks-11",
    moduleId: "module-2-1",
    title: "Context Best Practices",
    order: 11,
    xpReward: 250,
    difficulty: "intermediate",
    steps: [
      {
        id: "advanced-hooks-11-step-1",
        order: 1,
        instruction: `
# Context Best Practices

Follow these patterns for maintainable and performant context usage:

**1. Create Custom Hooks for Context**
\`\`\`jsx
function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
\`\`\`

**2. Separate Context by Concern**
\`\`\`jsx
// ❌ Bad: One context for everything
const AppContext = { user, theme, notifications, settings };

// ✅ Good: Separate contexts
const UserContext = { user };
const ThemeContext = { theme };
\`\`\`

**3. Combine Context with State Management**
\`\`\`jsx
function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const login = (userData) => setUser(userData);
  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
\`\`\`

## Your Task

Create a complete context implementation with best practices:

1. Create \`CountContext\` with default value \`null\`
2. Create a \`CountProvider\` component that:
   - Accepts \`children\` prop
   - Uses \`useState\` for \`count\` (initial value 0)
   - Creates functions: \`increment\` and \`decrement\`
   - Provides an object: \`{ count, increment, decrement }\`
3. Create a custom hook \`useCount\` that:
   - Uses \`useContext(CountContext)\`
   - Throws an error if context is null: "useCount must be used within CountProvider"
   - Returns the context value
4. Create a component \`Counter\` that:
   - Uses the \`useCount\` hook
   - Returns a \`<div>\` with className "counter"
   - Shows \`<p>Count: {count}</p>\`
   - Has a button "+" that calls increment
   - Has a button "-" that calls decrement
        `,
        hint: "CountProvider should return <CountContext.Provider value={{count, increment, decrement}}>{children}</CountContext.Provider>. useCount checks if context exists.",
        starterCode: `import React, { createContext, useContext, useState } from 'react';

// Create CountContext


function CountProvider({ children }) {
  // Create count state and functions



  return (
    // Add Provider
  );
}

function useCount() {
  // Implement custom hook



}

function Counter() {
  // Use custom hook


  return (
    <div className="counter">
      {/* Add UI */}
    </div>
  );
}

export { CountContext, CountProvider, useCount };
export default Counter;`,
        solution: `import React, { createContext, useContext, useState } from 'react';

const CountContext = createContext(null);

function CountProvider({ children }) {
  const [count, setCount] = useState(0);

  const increment = () => setCount(prev => prev + 1);
  const decrement = () => setCount(prev => prev - 1);

  return (
    <CountContext.Provider value={{ count, increment, decrement }}>
      {children}
    </CountContext.Provider>
  );
}

function useCount() {
  const context = useContext(CountContext);
  if (!context) {
    throw new Error('useCount must be used within CountProvider');
  }
  return context;
}

function Counter() {
  const { count, increment, decrement } = useCount();

  return (
    <div className="counter">
      <p>Count: {count}</p>
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
    </div>
  );
}

export { CountContext, CountProvider, useCount };
export default Counter;`,
        testCases: [
          {
            id: "test-1",
            description: "Should create CountContext with null default",
            testFunction: `code.includes('CountContext') && code.includes('createContext(null)')`,
          },
          {
            id: "test-2",
            description: "CountProvider should use useState for count",
            testFunction: `code.includes('useState(0)') && code.includes('count')`,
          },
          {
            id: "test-3",
            description: "CountProvider should create increment function",
            testFunction: `code.includes('increment') && (code.includes('setCount') || code.includes('count + 1'))`,
          },
          {
            id: "test-4",
            description: "CountProvider should create decrement function",
            testFunction: `code.includes('decrement') && (code.includes('setCount') || code.includes('count - 1'))`,
          },
          {
            id: "test-5",
            description: "useCount should check if context exists",
            testFunction: `code.includes('if (!context)') || code.includes('if (context === null)')`,
          },
          {
            id: "test-6",
            description: "useCount should throw error with specific message",
            testFunction: `code.includes('throw new Error') && code.includes('useCount must be used within CountProvider')`,
          },
          {
            id: "test-7",
            description: "Counter should use useCount hook",
            testFunction: `code.includes('useCount()')`,
          },
        ],
        language: "jsx",
      },
    ],
  },

  // Lesson 12: useReducer Introduction
  {
    id: "advanced-hooks-12",
    moduleId: "module-2-1",
    title: "useReducer Introduction",
    order: 12,
    xpReward: 200,
    difficulty: "intermediate",
    steps: [
      {
        id: "advanced-hooks-12-step-1",
        order: 1,
        instruction: `
# useReducer Introduction

\`useReducer\` is an alternative to \`useState\` for managing complex state logic. It's similar to Redux reducers and follows the same pattern.

\`\`\`jsx
import { useReducer } from 'react';

function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    case 'decrement':
      return { count: state.count - 1 };
    default:
      return state;
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, { count: 0 });

  return (
    <>
      <p>Count: {state.count}</p>
      <button onClick={() => dispatch({ type: 'increment' })}>+</button>
    </>
  );
}
\`\`\`

**Key Concepts:**
- **State:** Current state value
- **Action:** Object describing what happened (usually has a \`type\` property)
- **Dispatch:** Function to send actions to the reducer
- **Reducer:** Pure function that returns new state based on action

## Your Task

Create a basic counter using useReducer:

1. Import \`useReducer\` from React
2. Create a reducer function that:
   - Takes \`state\` and \`action\` parameters
   - If action.type is "increment", returns \`{ count: state.count + 1 }\`
   - If action.type is "decrement", returns \`{ count: state.count - 1 }\`
   - Otherwise, returns the state unchanged
3. Create a component named \`CounterWithReducer\` that:
   - Uses \`useReducer(reducer, { count: 0 })\`
   - Returns a \`<div>\` with className "counter"
   - Shows \`<p>Count: {state.count}</p>\`
   - Has button "Increment" that dispatches \`{ type: 'increment' }\`
   - Has button "Decrement" that dispatches \`{ type: 'decrement' }\`
        `,
        hint: "The reducer function should be defined outside the component. Use dispatch to send actions: dispatch({ type: 'increment' }).",
        starterCode: `import React, { useReducer } from 'react';

// Create reducer function here


function CounterWithReducer() {
  // Use useReducer here


  return (
    <div className="counter">
      {/* Add UI here */}
    </div>
  );
}

export default CounterWithReducer;`,
        solution: `import React, { useReducer } from 'react';

function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    case 'decrement':
      return { count: state.count - 1 };
    default:
      return state;
  }
}

function CounterWithReducer() {
  const [state, dispatch] = useReducer(reducer, { count: 0 });

  return (
    <div className="counter">
      <p>Count: {state.count}</p>
      <button onClick={() => dispatch({ type: 'increment' })}>Increment</button>
      <button onClick={() => dispatch({ type: 'decrement' })}>Decrement</button>
    </div>
  );
}

export default CounterWithReducer;`,
        testCases: [
          {
            id: "test-1",
            description: "Should import useReducer from React",
            testFunction: `code.includes('useReducer')`,
          },
          {
            id: "test-2",
            description: "Should define a reducer function",
            testFunction: `code.includes('function reducer') && code.includes('state') && code.includes('action')`,
          },
          {
            id: "test-3",
            description: "Reducer should handle 'increment' action",
            testFunction: `code.includes("'increment'") && code.includes('state.count + 1')`,
          },
          {
            id: "test-4",
            description: "Reducer should handle 'decrement' action",
            testFunction: `code.includes("'decrement'") && code.includes('state.count - 1')`,
          },
          {
            id: "test-5",
            description: "Should use useReducer with reducer and initial state",
            testFunction: `code.includes('useReducer(reducer') && code.includes('{ count: 0 }')`,
          },
          {
            id: "test-6",
            description: "Should destructure state and dispatch from useReducer",
            testFunction: `code.includes('[state, dispatch]')`,
          },
          {
            id: "test-7",
            description: "Buttons should dispatch actions",
            testFunction: `code.includes("dispatch({ type: 'increment' })") && code.includes("dispatch({ type: 'decrement' })")`,
          },
        ],
        language: "jsx",
      },
    ],
  },

  // Lesson 13: Reducer Functions
  {
    id: "advanced-hooks-13",
    moduleId: "module-2-1",
    title: "Reducer Functions",
    order: 13,
    xpReward: 200,
    difficulty: "intermediate",
    steps: [
      {
        id: "advanced-hooks-13-step-1",
        order: 1,
        instruction: `
# Reducer Functions

Reducers are **pure functions** that calculate a new state based on the previous state and an action. They follow specific rules and patterns.

**Reducer Rules:**
1. **Pure:** Same inputs always produce same output
2. **No side effects:** No API calls, no mutations, no randomness
3. **Immutable:** Return new state, don't modify existing state
4. **Synchronous:** No async operations

**Best Practices:**
\`\`\`jsx
// ❌ Bad: Mutating state
function reducer(state, action) {
  state.count++;  // Mutation!
  return state;
}

// ✅ Good: Returning new state
function reducer(state, action) {
  return { ...state, count: state.count + 1 };
}

// ✅ Good: Using action payload
function reducer(state, action) {
  switch (action.type) {
    case 'set_name':
      return { ...state, name: action.payload };
    case 'set_age':
      return { ...state, age: action.payload };
    default:
      return state;
  }
}
\`\`\`

## Your Task

Create a form state reducer with multiple actions:

1. Create a reducer function that manages form state
2. Initial state: \`{ name: '', email: '', submitted: false }\`
3. Handle these actions:
   - \`'set_name'\`: Update name with action.payload
   - \`'set_email'\`: Update email with action.payload
   - \`'submit'\`: Set submitted to true
   - \`'reset'\`: Return initial state
4. Create a component \`FormWithReducer\` that:
   - Uses useReducer with your reducer and initial state
   - Returns a \`<div>\` with className "form"
   - Has input for name (dispatches set_name on change)
   - Has input for email (dispatches set_email on change)
   - Has button "Submit" (dispatches submit)
   - Shows \`<p>Submitted: {submitted ? 'Yes' : 'No'}</p>\`
        `,
        hint: "Use the spread operator to create new state objects: { ...state, name: action.payload }. Make sure to keep all existing state properties.",
        starterCode: `import React, { useReducer } from 'react';

const initialState = {
  name: '',
  email: '',
  submitted: false
};

function formReducer(state, action) {
  switch (action.type) {
    // Add cases here



    default:
      return state;
  }
}

function FormWithReducer() {
  const [state, dispatch] = useReducer(formReducer, initialState);

  return (
    <div className="form">
      <input
        type="text"
        value={state.name}
        onChange={(e) => {/* dispatch set_name */}}
      />
      <input
        type="email"
        value={state.email}
        onChange={(e) => {/* dispatch set_email */}}
      />
      <button onClick={() => {/* dispatch submit */}}>Submit</button>
      {/* Add submitted status */}
    </div>
  );
}

export default FormWithReducer;`,
        solution: `import React, { useReducer } from 'react';

const initialState = {
  name: '',
  email: '',
  submitted: false
};

function formReducer(state, action) {
  switch (action.type) {
    case 'set_name':
      return { ...state, name: action.payload };
    case 'set_email':
      return { ...state, email: action.payload };
    case 'submit':
      return { ...state, submitted: true };
    case 'reset':
      return initialState;
    default:
      return state;
  }
}

function FormWithReducer() {
  const [state, dispatch] = useReducer(formReducer, initialState);

  return (
    <div className="form">
      <input
        type="text"
        value={state.name}
        onChange={(e) => dispatch({ type: 'set_name', payload: e.target.value })}
      />
      <input
        type="email"
        value={state.email}
        onChange={(e) => dispatch({ type: 'set_email', payload: e.target.value })}
      />
      <button onClick={() => dispatch({ type: 'submit' })}>Submit</button>
      <p>Submitted: {state.submitted ? 'Yes' : 'No'}</p>
    </div>
  );
}

export default FormWithReducer;`,
        testCases: [
          {
            id: "test-1",
            description: "Should define initialState with name, email, and submitted",
            testFunction: `code.includes('initialState') && code.includes("name:") && code.includes("email:") && code.includes("submitted:")`,
          },
          {
            id: "test-2",
            description: "Reducer should handle 'set_name' action",
            testFunction: `code.includes("'set_name'") && code.includes('action.payload')`,
          },
          {
            id: "test-3",
            description: "Reducer should handle 'set_email' action",
            testFunction: `code.includes("'set_email'") && code.includes('action.payload')`,
          },
          {
            id: "test-4",
            description: "Reducer should handle 'submit' action",
            testFunction: `code.includes("'submit'") && code.includes('submitted: true')`,
          },
          {
            id: "test-5",
            description: "Reducer should use spread operator for immutability",
            testFunction: `code.includes('...state')`,
          },
          {
            id: "test-6",
            description: "Name input should dispatch set_name with payload",
            testFunction: `code.includes("type: 'set_name'") && code.includes('payload:')`,
          },
          {
            id: "test-7",
            description: "Email input should dispatch set_email with payload",
            testFunction: `code.includes("type: 'set_email'") && code.includes('payload:')`,
          },
        ],
        language: "jsx",
      },
    ],
  },

  // Lesson 14: useReducer vs useState
  {
    id: "advanced-hooks-14",
    moduleId: "module-2-1",
    title: "useReducer vs useState",
    order: 14,
    xpReward: 200,
    difficulty: "intermediate",
    steps: [
      {
        id: "advanced-hooks-14-step-1",
        order: 1,
        instruction: `
# useReducer vs useState

Both hooks manage state, but they're suited for different scenarios. Understanding when to use each is crucial for writing clean React code.

**Use useState when:**
- State is simple (string, number, boolean)
- State updates are independent
- Few state variables (1-3)
- Logic is straightforward

**Use useReducer when:**
- Complex state object with multiple sub-values
- State transitions are related
- Next state depends on previous state
- Complex update logic
- Many state variables that change together

**Example Comparison:**

\`\`\`jsx
// useState - Good for simple state
function Counter() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(count + 1)}>{count}</button>;
}

// useReducer - Good for complex state
function ShoppingCart() {
  const [state, dispatch] = useReducer(reducer, {
    items: [],
    total: 0,
    discount: 0,
    tax: 0
  });
  // Multiple related state changes can be handled in one action
}
\`\`\`

## Your Task

Refactor a useState implementation to useReducer:

Below is a component using multiple useState calls. Your task is to refactor it to use useReducer instead.

Create a component \`TodoList\` that:
1. Uses useReducer (not useState) with initial state: \`{ todos: [], filter: 'all' }\`
2. Creates a reducer that handles:
   - \`'add_todo'\`: Adds new todo from action.payload to todos array
   - \`'toggle_todo'\`: Toggles todo.completed by action.payload (todo id)
   - \`'set_filter'\`: Sets filter to action.payload
3. Returns a \`<div>\` with className "todo-list"
4. Shows \`<p>Filter: {state.filter}</p>\`
5. Shows \`<p>Total: {state.todos.length}</p>\`
6. Has button "Add Todo" that dispatches add_todo with \`{ id: Date.now(), text: 'New Todo', completed: false }\`
        `,
        hint: "When adding todos, use [...state.todos, action.payload]. When toggling, use map to create a new array.",
        starterCode: `import React, { useReducer } from 'react';

const initialState = {
  todos: [],
  filter: 'all'
};

function todoReducer(state, action) {
  switch (action.type) {
    // Add cases here




    default:
      return state;
  }
}

function TodoList() {
  const [state, dispatch] = useReducer(todoReducer, initialState);

  const handleAddTodo = () => {
    // Dispatch add_todo with new todo object
  };

  return (
    <div className="todo-list">
      {/* Add UI here */}
    </div>
  );
}

export default TodoList;`,
        solution: `import React, { useReducer } from 'react';

const initialState = {
  todos: [],
  filter: 'all'
};

function todoReducer(state, action) {
  switch (action.type) {
    case 'add_todo':
      return {
        ...state,
        todos: [...state.todos, action.payload]
      };
    case 'toggle_todo':
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.payload
            ? { ...todo, completed: !todo.completed }
            : todo
        )
      };
    case 'set_filter':
      return {
        ...state,
        filter: action.payload
      };
    default:
      return state;
  }
}

function TodoList() {
  const [state, dispatch] = useReducer(todoReducer, initialState);

  const handleAddTodo = () => {
    dispatch({
      type: 'add_todo',
      payload: { id: Date.now(), text: 'New Todo', completed: false }
    });
  };

  return (
    <div className="todo-list">
      <p>Filter: {state.filter}</p>
      <p>Total: {state.todos.length}</p>
      <button onClick={handleAddTodo}>Add Todo</button>
    </div>
  );
}

export default TodoList;`,
        testCases: [
          {
            id: "test-1",
            description: "Should use useReducer with initialState",
            testFunction: `code.includes('useReducer(todoReducer, initialState)')`,
          },
          {
            id: "test-2",
            description: "Reducer should handle 'add_todo' action",
            testFunction: `code.includes("'add_todo'") && code.includes('[...state.todos')`,
          },
          {
            id: "test-3",
            description: "Reducer should handle 'toggle_todo' action",
            testFunction: `code.includes("'toggle_todo'") && code.includes('.map(')`,
          },
          {
            id: "test-4",
            description: "Reducer should handle 'set_filter' action",
            testFunction: `code.includes("'set_filter'") && code.includes('filter: action.payload')`,
          },
          {
            id: "test-5",
            description: "Should display filter value",
            testFunction: `code.includes('Filter: {state.filter}')`,
          },
          {
            id: "test-6",
            description: "Should display todos length",
            testFunction: `code.includes('Total: {state.todos.length}')`,
          },
          {
            id: "test-7",
            description: "Add Todo button should dispatch add_todo action",
            testFunction: `code.includes("type: 'add_todo'") && code.includes('payload:')`,
          },
        ],
        language: "jsx",
      },
    ],
  },

  // Lesson 15: Complex State with useReducer
  {
    id: "advanced-hooks-15",
    moduleId: "module-2-1",
    title: "Complex State with useReducer",
    order: 15,
    xpReward: 250,
    difficulty: "intermediate",
    steps: [
      {
        id: "advanced-hooks-15-step-1",
        order: 1,
        instruction: `
# Complex State with useReducer

When state has multiple levels of nesting or requires coordinated updates, useReducer shines. It helps maintain consistency and makes state transitions predictable.

**Example: Shopping Cart**
\`\`\`jsx
function cartReducer(state, action) {
  switch (action.type) {
    case 'add_item':
      return {
        ...state,
        items: [...state.items, action.payload],
        total: state.total + action.payload.price
      };
    case 'remove_item':
      const item = state.items.find(i => i.id === action.payload);
      return {
        ...state,
        items: state.items.filter(i => i.id !== action.payload),
        total: state.total - item.price
      };
    case 'apply_discount':
      return {
        ...state,
        discount: action.payload,
        total: state.total * (1 - action.payload)
      };
  }
}
\`\`\`

**Benefits:**
- Single source of truth for related state
- Coordinated updates (total changes when items change)
- Easier to test (pure reducer functions)
- Predictable state transitions

## Your Task

Create a user profile editor with complex state:

1. Create initial state with:
   - \`profile\`: \`{ name: '', email: '', bio: '' }\`
   - \`errors\`: \`{ name: '', email: '', bio: '' }\`
   - \`isSaving\`: false
   - \`isDirty\`: false
2. Create reducer that handles:
   - \`'update_field'\`: Updates profile[action.field] with action.value, sets isDirty to true
   - \`'set_error'\`: Updates errors[action.field] with action.message
   - \`'start_save'\`: Sets isSaving to true
   - \`'save_success'\`: Sets isSaving to false, isDirty to false
   - \`'reset'\`: Returns initialState
3. Create component \`ProfileEditor\` with:
   - Input for name, email, and bio (dispatch update_field on change)
   - Button "Save" (disabled if !isDirty or isSaving)
   - Shows \`<p>Status: {isSaving ? 'Saving...' : 'Ready'}</p>\`
   - Shows \`<p>Changes: {isDirty ? 'Unsaved' : 'Saved'}</p>\`
        `,
        hint: "For update_field action, use computed property names: { ...state.profile, [action.field]: action.value }. This allows dynamic field updates.",
        starterCode: `import React, { useReducer } from 'react';

const initialState = {
  profile: { name: '', email: '', bio: '' },
  errors: { name: '', email: '', bio: '' },
  isSaving: false,
  isDirty: false
};

function profileReducer(state, action) {
  switch (action.type) {
    // Add cases here






    default:
      return state;
  }
}

function ProfileEditor() {
  const [state, dispatch] = useReducer(profileReducer, initialState);

  return (
    <div className="profile-editor">
      {/* Add inputs and UI */}
    </div>
  );
}

export default ProfileEditor;`,
        solution: `import React, { useReducer } from 'react';

const initialState = {
  profile: { name: '', email: '', bio: '' },
  errors: { name: '', email: '', bio: '' },
  isSaving: false,
  isDirty: false
};

function profileReducer(state, action) {
  switch (action.type) {
    case 'update_field':
      return {
        ...state,
        profile: {
          ...state.profile,
          [action.field]: action.value
        },
        isDirty: true
      };
    case 'set_error':
      return {
        ...state,
        errors: {
          ...state.errors,
          [action.field]: action.message
        }
      };
    case 'start_save':
      return {
        ...state,
        isSaving: true
      };
    case 'save_success':
      return {
        ...state,
        isSaving: false,
        isDirty: false
      };
    case 'reset':
      return initialState;
    default:
      return state;
  }
}

function ProfileEditor() {
  const [state, dispatch] = useReducer(profileReducer, initialState);

  return (
    <div className="profile-editor">
      <input
        type="text"
        value={state.profile.name}
        onChange={(e) => dispatch({ type: 'update_field', field: 'name', value: e.target.value })}
      />
      <input
        type="email"
        value={state.profile.email}
        onChange={(e) => dispatch({ type: 'update_field', field: 'email', value: e.target.value })}
      />
      <input
        type="text"
        value={state.profile.bio}
        onChange={(e) => dispatch({ type: 'update_field', field: 'bio', value: e.target.value })}
      />
      <button
        onClick={() => dispatch({ type: 'start_save' })}
        disabled={!state.isDirty || state.isSaving}
      >
        Save
      </button>
      <p>Status: {state.isSaving ? 'Saving...' : 'Ready'}</p>
      <p>Changes: {state.isDirty ? 'Unsaved' : 'Saved'}</p>
    </div>
  );
}

export default ProfileEditor;`,
        testCases: [
          {
            id: "test-1",
            description: "Should define initialState with all required fields",
            testFunction: `code.includes('profile:') && code.includes('errors:') && code.includes('isSaving:') && code.includes('isDirty:')`,
          },
          {
            id: "test-2",
            description: "Reducer should handle 'update_field' with dynamic field name",
            testFunction: `code.includes("'update_field'") && code.includes('[action.field]')`,
          },
          {
            id: "test-3",
            description: "update_field should set isDirty to true",
            testFunction: `code.includes("'update_field'") && code.includes('isDirty: true')`,
          },
          {
            id: "test-4",
            description: "Reducer should handle 'set_error' action",
            testFunction: `code.includes("'set_error'") && code.includes('errors:')`,
          },
          {
            id: "test-5",
            description: "Reducer should handle 'start_save' action",
            testFunction: `code.includes("'start_save'") && code.includes('isSaving: true')`,
          },
          {
            id: "test-6",
            description: "Reducer should handle 'save_success' action",
            testFunction: `code.includes("'save_success'") && code.includes('isSaving: false') && code.includes('isDirty: false')`,
          },
          {
            id: "test-7",
            description: "Save button should be disabled when not dirty or saving",
            testFunction: `code.includes('disabled={!state.isDirty || state.isSaving}')`,
          },
        ],
        language: "jsx",
      },
    ],
  },

  // Lesson 16: useReducer Patterns
  {
    id: "advanced-hooks-16",
    moduleId: "module-2-1",
    title: "useReducer Patterns",
    order: 16,
    xpReward: 250,
    difficulty: "intermediate",
    steps: [
      {
        id: "advanced-hooks-16-step-1",
        order: 1,
        instruction: `
# useReducer Patterns

Advanced patterns and techniques for using useReducer effectively in production applications.

**Pattern 1: Action Creators**
\`\`\`jsx
// Instead of dispatching objects directly
dispatch({ type: 'add_item', payload: item });

// Use action creators
const addItem = (item) => ({ type: 'add_item', payload: item });
dispatch(addItem(item));
\`\`\`

**Pattern 2: Lazy Initialization**
\`\`\`jsx
function init(initialCount) {
  return { count: initialCount };
}

const [state, dispatch] = useReducer(reducer, initialArg, init);
\`\`\`

**Pattern 3: Combining with Context**
\`\`\`jsx
const StateContext = createContext();
const DispatchContext = createContext();

function Provider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        {children}
      </DispatchContext.Provider>
    </StateContext.Provider>
  );
}
\`\`\`

**Pattern 4: Middleware-like Logic**
\`\`\`jsx
function useReducerWithLogger(reducer, initialState) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const dispatchWithLogger = (action) => {
    console.log('Action:', action);
    dispatch(action);
  };

  return [state, dispatchWithLogger];
}
\`\`\`

## Your Task

Implement a complete data fetching pattern with useReducer:

1. Create initial state: \`{ data: null, loading: false, error: null }\`
2. Create reducer with actions:
   - \`'fetch_start'\`: Set loading to true, error to null
   - \`'fetch_success'\`: Set data to action.payload, loading to false, error to null
   - \`'fetch_error'\`: Set error to action.payload, loading to false
3. Create a component \`DataFetcher\` that:
   - Accepts prop \`userId\`
   - Uses useReducer for state management
   - Uses useEffect to simulate data fetching:
     - Dispatch fetch_start
     - Use setTimeout (1000ms) to simulate API
     - Dispatch fetch_success with \`{ id: userId, name: \\\`User \${userId}\\\` }\`
   - Returns \`<div>\` with className "data-fetcher"
   - If loading: show \`<p>Loading...</p>\`
   - If error: show \`<p>Error: {error}</p>\`
   - If data: show \`<p>Name: {data.name}</p>\`
        `,
        hint: "The useEffect should depend on userId. Clean up by checking if component is still mounted before dispatching success.",
        starterCode: `import React, { useReducer, useEffect } from 'react';

const initialState = {
  data: null,
  loading: false,
  error: null
};

function dataReducer(state, action) {
  switch (action.type) {
    // Add cases here




    default:
      return state;
  }
}

function DataFetcher({ userId }) {
  const [state, dispatch] = useReducer(dataReducer, initialState);

  useEffect(() => {
    // Implement data fetching


  }, [userId]);

  return (
    <div className="data-fetcher">
      {/* Add conditional rendering */}
    </div>
  );
}

export default DataFetcher;`,
        solution: `import React, { useReducer, useEffect } from 'react';

const initialState = {
  data: null,
  loading: false,
  error: null
};

function dataReducer(state, action) {
  switch (action.type) {
    case 'fetch_start':
      return {
        ...state,
        loading: true,
        error: null
      };
    case 'fetch_success':
      return {
        ...state,
        data: action.payload,
        loading: false,
        error: null
      };
    case 'fetch_error':
      return {
        ...state,
        error: action.payload,
        loading: false
      };
    default:
      return state;
  }
}

function DataFetcher({ userId }) {
  const [state, dispatch] = useReducer(dataReducer, initialState);

  useEffect(() => {
    dispatch({ type: 'fetch_start' });

    setTimeout(() => {
      dispatch({
        type: 'fetch_success',
        payload: { id: userId, name: \`User \${userId}\` }
      });
    }, 1000);
  }, [userId]);

  return (
    <div className="data-fetcher">
      {state.loading && <p>Loading...</p>}
      {state.error && <p>Error: {state.error}</p>}
      {state.data && <p>Name: {state.data.name}</p>}
    </div>
  );
}

export default DataFetcher;`,
        testCases: [
          {
            id: "test-1",
            description: "Should define initialState with data, loading, and error",
            testFunction: `code.includes('data:') && code.includes('loading:') && code.includes('error:')`,
          },
          {
            id: "test-2",
            description: "Reducer should handle 'fetch_start' action",
            testFunction: `code.includes("'fetch_start'") && code.includes('loading: true')`,
          },
          {
            id: "test-3",
            description: "Reducer should handle 'fetch_success' action",
            testFunction: `code.includes("'fetch_success'") && code.includes('data: action.payload')`,
          },
          {
            id: "test-4",
            description: "Reducer should handle 'fetch_error' action",
            testFunction: `code.includes("'fetch_error'") && code.includes('error: action.payload')`,
          },
          {
            id: "test-5",
            description: "useEffect should dispatch fetch_start",
            testFunction: `code.includes("dispatch({ type: 'fetch_start' })")`,
          },
          {
            id: "test-6",
            description: "Should use setTimeout to simulate async fetch",
            testFunction: `code.includes('setTimeout')`,
          },
          {
            id: "test-7",
            description: "Should show loading message when loading",
            testFunction: `code.includes('state.loading') && code.includes('Loading...')`,
          },
          {
            id: "test-8",
            description: "Should show data when loaded",
            testFunction: `code.includes('state.data') && code.includes('data.name')`,
          },
        ],
        language: "jsx",
      },
    ],
  },
];
