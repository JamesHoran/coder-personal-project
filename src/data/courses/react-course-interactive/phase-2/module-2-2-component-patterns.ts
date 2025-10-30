/**
 * React Course - Phase 2: Practitioner Patterns
 * Module 2.2: Component Patterns (15 lessons)
 *
 * This module covers advanced React component patterns including composition,
 * compound components, render props, HOCs, custom hooks, and architectural patterns.
 */

import { InteractiveLesson } from "@/types";

export const componentPatternsLessons: InteractiveLesson[] = [
  // Lesson 1: Component Composition
  {
    id: "component-patterns-01",
    moduleId: "module-2-2",
    title: "Component Composition",
    order: 1,
    xpReward: 200,
    difficulty: "intermediate",
    steps: [
      {
        id: "component-patterns-01-step-1",
        order: 1,
        instruction: `
# Component Composition

Component composition is React's most powerful pattern for building complex UIs from smaller, reusable pieces. Instead of using inheritance (like traditional OOP), React favors **composition** - combining simple components to create more complex ones.

**Why Composition?**
- Maximum reusability
- Better separation of concerns
- More flexible than inheritance
- Easier to understand and test

\`\`\`jsx
// Small, focused components
function Avatar({ src, size = 40 }) {
  return <img src={src} width={size} height={size} alt="avatar" />;
}

function UserName({ name, isOnline }) {
  return (
    <div>
      <h3>{name}</h3>
      {isOnline && <span className="status">Online</span>}
    </div>
  );
}

// Composed component
function UserProfile({ user }) {
  return (
    <div className="profile">
      <Avatar src={user.avatar} size={60} />
      <UserName name={user.name} isOnline={user.isOnline} />
    </div>
  );
}
\`\`\`

## Your Task

Build a card system using composition:

**Create 3 components:**

1. **CardImage**:
   - Props: \`src\`, \`alt\`
   - Returns an \`<img>\` with className "card-image"

2. **CardContent**:
   - Props: \`title\`, \`description\`
   - Returns a \`<div>\` with className "card-content"
   - Contains an \`<h3>\` for title and \`<p>\` for description

3. **Card** (main component):
   - Props: \`imageSrc\`, \`imageAlt\`, \`title\`, \`description\`
   - Returns a \`<div>\` with className "card"
   - Composes CardImage and CardContent, passing appropriate props

Export all three components (Card as default).
        `,
        hint: "Create small, focused components first, then compose them in the Card component. Pass props down to child components.",
        starterCode: `import React from 'react';

// Create CardImage component


// Create CardContent component


// Create Card component (compose the above)


export { CardImage, CardContent };
export default Card;`,
        solution: `import React from 'react';

function CardImage({ src, alt }) {
  return <img src={src} alt={alt} className="card-image" />;
}

function CardContent({ title, description }) {
  return (
    <div className="card-content">
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}

function Card({ imageSrc, imageAlt, title, description }) {
  return (
    <div className="card">
      <CardImage src={imageSrc} alt={imageAlt} />
      <CardContent title={title} description={description} />
    </div>
  );
}

export { CardImage, CardContent };
export default Card;`,
        testCases: [
          {
            id: "test-1",
            description: "CardImage should render an img with className 'card-image'",
            testFunction: `
              const { container } = render(<CardImage src="test.jpg" alt="test" />);
              const img = container.querySelector('img.card-image');
              img !== null && img.src.includes('test.jpg')
            `,
          },
          {
            id: "test-2",
            description: "CardContent should render title in h3 and description in p",
            testFunction: `
              const { getByText } = render(<CardContent title="Test Title" description="Test Description" />);
              getByText('Test Title') !== null && getByText('Test Description') !== null
            `,
          },
          {
            id: "test-3",
            description: "Card should compose CardImage and CardContent",
            testFunction: `
              const { container } = render(
                <Card imageSrc="photo.jpg" imageAlt="photo" title="Product" description="Great product" />
              );
              container.querySelector('img.card-image') !== null &&
              container.querySelector('.card-content') !== null
            `,
          },
          {
            id: "test-4",
            description: "Card should have className 'card'",
            testFunction: `
              const { container } = render(
                <Card imageSrc="photo.jpg" imageAlt="photo" title="Product" description="Great product" />
              );
              container.querySelector('div.card') !== null
            `,
          },
          {
            id: "test-5",
            description: "Card should pass props correctly to child components",
            testFunction: `
              const { getByText, container } = render(
                <Card imageSrc="test.jpg" imageAlt="Test" title="My Title" description="My Description" />
              );
              const img = container.querySelector('img');
              img.alt === 'Test' && getByText('My Title') !== null && getByText('My Description') !== null
            `,
          },
        ],
        language: "jsx",
      },
    ],
  },

  // Lesson 2: Compound Components
  {
    id: "component-patterns-02",
    moduleId: "module-2-2",
    title: "Compound Components",
    order: 2,
    xpReward: 250,
    difficulty: "intermediate",
    steps: [
      {
        id: "component-patterns-02-step-1",
        order: 1,
        instruction: `
# Compound Components

Compound components are a pattern where multiple components work together to form a complete UI element. They share implicit state and provide a flexible, expressive API.

**Think of HTML's \`<select>\` and \`<option>\`:**
\`\`\`html
<select>
  <option value="1">Option 1</option>
  <option value="2">Option 2</option>
</select>
\`\`\`

**React equivalent using Context:**
\`\`\`jsx
import { createContext, useContext, useState } from 'react';

const TabContext = createContext();

function Tabs({ children }) {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <TabContext.Provider value={{ activeTab, setActiveTab }}>
      <div className="tabs">{children}</div>
    </TabContext.Provider>
  );
}

function TabList({ children }) {
  return <div className="tab-list">{children}</div>;
}

function Tab({ index, children }) {
  const { activeTab, setActiveTab } = useContext(TabContext);
  const isActive = activeTab === index;

  return (
    <button
      className={\`tab \${isActive ? 'active' : ''}\`}
      onClick={() => setActiveTab(index)}
    >
      {children}
    </button>
  );
}

function TabPanel({ index, children }) {
  const { activeTab } = useContext(TabContext);
  return activeTab === index ? <div className="panel">{children}</div> : null;
}

// Usage:
<Tabs>
  <TabList>
    <Tab index={0}>Home</Tab>
    <Tab index={1}>Profile</Tab>
  </TabList>
  <TabPanel index={0}>Home content</TabPanel>
  <TabPanel index={1}>Profile content</TabPanel>
</Tabs>
\`\`\`

## Your Task

Create a compound Accordion component:

1. **AccordionContext**: Create a context with createContext()
2. **Accordion**: Main wrapper component
   - Manages \`openIndex\` state (which item is open)
   - Provides state via AccordionContext.Provider
   - Props: \`children\`
3. **AccordionItem**: Individual accordion item
   - Props: \`index\`, \`title\`, \`children\`
   - Uses context to check if it's open
   - Toggles when title is clicked
   - Shows children only when open

The test will mount an Accordion with multiple AccordionItems.
        `,
        hint: "Use createContext() and useContext(). AccordionItem should get state from context and toggle on click. Only render children when index === openIndex.",
        starterCode: `import React, { createContext, useContext, useState } from 'react';

// Create context
const AccordionContext = createContext();

// Accordion wrapper component
function Accordion({ children }) {
  // Add state for openIndex

  return (
    // Provide context value
  );
}

// AccordionItem component
function AccordionItem({ index, title, children }) {
  // Get context

  // Check if this item is open

  return (
    <div className="accordion-item">
      {/* Add clickable title */}
      {/* Conditionally render children */}
    </div>
  );
}

export { AccordionItem };
export default Accordion;`,
        solution: `import React, { createContext, useContext, useState } from 'react';

const AccordionContext = createContext();

function Accordion({ children }) {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <AccordionContext.Provider value={{ openIndex, setOpenIndex }}>
      <div className="accordion">{children}</div>
    </AccordionContext.Provider>
  );
}

function AccordionItem({ index, title, children }) {
  const { openIndex, setOpenIndex } = useContext(AccordionContext);
  const isOpen = openIndex === index;

  return (
    <div className="accordion-item">
      <button
        className="accordion-title"
        onClick={() => setOpenIndex(isOpen ? null : index)}
      >
        {title}
      </button>
      {isOpen && <div className="accordion-content">{children}</div>}
    </div>
  );
}

export { AccordionItem };
export default Accordion;`,
        testCases: [
          {
            id: "test-1",
            description: "Accordion should render children",
            testFunction: `
              const { container } = render(
                <Accordion>
                  <AccordionItem index={0} title="Item 1">Content 1</AccordionItem>
                </Accordion>
              );
              container.querySelector('.accordion-item') !== null
            `,
          },
          {
            id: "test-2",
            description: "AccordionItem should show title in a button",
            testFunction: `
              const { getByText } = render(
                <Accordion>
                  <AccordionItem index={0} title="Test Title">Content</AccordionItem>
                </Accordion>
              );
              const button = getByText('Test Title');
              button !== null && button.tagName === 'BUTTON'
            `,
          },
          {
            id: "test-3",
            description: "Content should be hidden by default",
            testFunction: `
              const { queryByText } = render(
                <Accordion>
                  <AccordionItem index={0} title="Title">Hidden Content</AccordionItem>
                </Accordion>
              );
              queryByText('Hidden Content') === null
            `,
          },
          {
            id: "test-4",
            description: "Should use createContext and useContext",
            testFunction: `code.includes('createContext') && code.includes('useContext')`,
          },
          {
            id: "test-5",
            description: "Should manage openIndex state",
            testFunction: `code.includes('openIndex') && code.includes('setOpenIndex')`,
          },
        ],
        language: "jsx",
      },
    ],
  },

  // Lesson 3: Render Props
  {
    id: "component-patterns-03",
    moduleId: "module-2-2",
    title: "Render Props",
    order: 3,
    xpReward: 250,
    difficulty: "intermediate",
    steps: [
      {
        id: "component-patterns-03-step-1",
        order: 1,
        instruction: `
# Render Props Pattern

A **render prop** is a function prop that a component uses to know what to render. This pattern allows you to share code between components using a prop whose value is a function.

**Example: Mouse Position Tracker**
\`\`\`jsx
function MouseTracker({ render }) {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  return render(position);
}

// Usage:
<MouseTracker
  render={({ x, y }) => (
    <div>Mouse is at ({x}, {y})</div>
  )}
/>
\`\`\`

**Benefits:**
- Share stateful logic without changing component hierarchy
- More flexible than HOCs for some use cases
- Explicit data flow

## Your Task

Create a **DataFetcher** component using the render props pattern:

1. Component accepts props: \`url\` and \`render\`
2. Uses \`useState\` to track: \`data\`, \`loading\`, \`error\`
3. Uses \`useEffect\` to simulate fetching (don't actually fetch):
   - Set loading to true initially
   - After a timeout, set data to \`{ message: "Data from " + url }\`
   - Set loading to false
4. Call the \`render\` prop function with \`{ data, loading, error }\`
5. Return the result of calling render()

Don't forget to import useState and useEffect!
        `,
        hint: "The render prop is a function that you call: render({ data, loading, error }). Use setTimeout to simulate async data fetching.",
        starterCode: `import React, { useState, useEffect } from 'react';

function DataFetcher({ url, render }) {
  // Add state for data, loading, error

  // Add useEffect to simulate data fetching

  // Call and return render prop
}

export default DataFetcher;`,
        solution: `import React, { useState, useEffect } from 'react';

function DataFetcher({ url, render }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);

    // Simulate API call
    const timer = setTimeout(() => {
      setData({ message: "Data from " + url });
      setLoading(false);
    }, 100);

    return () => clearTimeout(timer);
  }, [url]);

  return render({ data, loading, error });
}

export default DataFetcher;`,
        testCases: [
          {
            id: "test-1",
            description: "Should accept url and render props",
            testFunction: `code.includes('url') && code.includes('render')`,
          },
          {
            id: "test-2",
            description: "Should use useState for data, loading, and error",
            testFunction: `
              code.includes('useState') &&
              code.includes('loading') &&
              code.includes('data')
            `,
          },
          {
            id: "test-3",
            description: "Should call render prop with loading state",
            testFunction: `
              let renderCalls = [];
              const { container } = render(
                <DataFetcher
                  url="/api/test"
                  render={(state) => {
                    renderCalls.push(state);
                    return <div>{state.loading ? 'Loading' : 'Done'}</div>;
                  }}
                />
              );
              renderCalls.some(call => call.loading === true)
            `,
          },
          {
            id: "test-4",
            description: "Should use useEffect",
            testFunction: `code.includes('useEffect')`,
          },
          {
            id: "test-5",
            description: "Should return the result of calling render()",
            testFunction: `code.includes('return render(')`,
          },
        ],
        language: "jsx",
      },
    ],
  },

  // Lesson 4: Higher-Order Components (HOC)
  {
    id: "component-patterns-04",
    moduleId: "module-2-2",
    title: "Higher-Order Components (HOC)",
    order: 4,
    xpReward: 250,
    difficulty: "intermediate",
    steps: [
      {
        id: "component-patterns-04-step-1",
        order: 1,
        instruction: `
# Higher-Order Components (HOC)

A **Higher-Order Component** is a function that takes a component and returns a new component with additional props or behavior. Think of it as a component wrapper.

**Naming Convention:** Start with "with" - \`withAuth\`, \`withLoading\`, etc.

**Example:**
\`\`\`jsx
// HOC that adds a loading prop
function withLoading(Component) {
  return function WithLoadingComponent({ isLoading, ...props }) {
    if (isLoading) {
      return <div className="loading">Loading...</div>;
    }
    return <Component {...props} />;
  };
}

// Original component
function UserProfile({ user }) {
  return <div>{user.name}</div>;
}

// Enhanced component
const UserProfileWithLoading = withLoading(UserProfile);

// Usage:
<UserProfileWithLoading isLoading={true} user={currentUser} />
\`\`\`

**Benefits:**
- Reuse component logic
- Add behavior without modifying original component
- Compose multiple HOCs together

**Note:** Modern React often uses hooks instead, but HOCs are still common in existing codebases.

## Your Task

Create a HOC called **withTimestamp** that adds a timestamp prop:

1. Create function \`withTimestamp(Component)\`
2. Return a new component that:
   - Uses \`useState\` to store current timestamp
   - Uses \`useEffect\` to update timestamp on mount
   - Passes all original props plus a new \`timestamp\` prop to Component
   - Spreads props: \`{...props}\`

Also create a simple **DisplayInfo** component:
- Props: \`message\`, \`timestamp\`
- Renders a div with className "info"
- Shows message in \`<p>\` and timestamp in \`<small>\`

Export both withTimestamp and DisplayInfo (default).
        `,
        hint: "HOC pattern: withTimestamp returns a function component. Use {...props, timestamp} to pass all props plus the new one.",
        starterCode: `import React, { useState, useEffect } from 'react';

// Create the HOC
function withTimestamp(Component) {
  return function WithTimestamp(props) {
    // Add state and effect for timestamp

    // Return Component with all props plus timestamp
  };
}

// Create DisplayInfo component
function DisplayInfo({ message, timestamp }) {
  return (
    // Render the info
  );
}

export { withTimestamp };
export default DisplayInfo;`,
        solution: `import React, { useState, useEffect } from 'react';

function withTimestamp(Component) {
  return function WithTimestamp(props) {
    const [timestamp, setTimestamp] = useState(null);

    useEffect(() => {
      setTimestamp(new Date().toISOString());
    }, []);

    return <Component {...props} timestamp={timestamp} />;
  };
}

function DisplayInfo({ message, timestamp }) {
  return (
    <div className="info">
      <p>{message}</p>
      <small>{timestamp}</small>
    </div>
  );
}

export { withTimestamp };
export default DisplayInfo;`,
        testCases: [
          {
            id: "test-1",
            description: "withTimestamp should be a function",
            testFunction: `typeof withTimestamp === 'function'`,
          },
          {
            id: "test-2",
            description: "withTimestamp should return a component",
            testFunction: `typeof withTimestamp(() => null) === 'function'`,
          },
          {
            id: "test-3",
            description: "DisplayInfo should render message and timestamp",
            testFunction: `
              const { getByText, container } = render(
                <DisplayInfo message="Test message" timestamp="2025-01-01" />
              );
              getByText('Test message') !== null &&
              container.querySelector('small').textContent === '2025-01-01'
            `,
          },
          {
            id: "test-4",
            description: "HOC should pass props and add timestamp",
            testFunction: `
              const Enhanced = withTimestamp(DisplayInfo);
              const { container } = render(<Enhanced message="Hello" />);
              container.querySelector('.info') !== null
            `,
          },
          {
            id: "test-5",
            description: "Should use useState and useEffect in HOC",
            testFunction: `code.includes('useState') && code.includes('useEffect')`,
          },
        ],
        language: "jsx",
      },
    ],
  },

  // Lesson 5: Custom Hooks Introduction
  {
    id: "component-patterns-05",
    moduleId: "module-2-2",
    title: "Custom Hooks Introduction",
    order: 5,
    xpReward: 200,
    difficulty: "intermediate",
    steps: [
      {
        id: "component-patterns-05-step-1",
        order: 1,
        instruction: `
# Custom Hooks Introduction

Custom hooks let you extract component logic into reusable functions. They're the modern, preferred way to share stateful logic in React.

**Rules of Custom Hooks:**
1. Must start with "use" (useCustomHook)
2. Can call other hooks inside
3. Must be called at the top level (like regular hooks)

**Simple Example:**
\`\`\`jsx
function useCounter(initialValue = 0) {
  const [count, setCount] = useState(initialValue);

  const increment = () => setCount(c => c + 1);
  const decrement = () => setCount(c => c - 1);
  const reset = () => setCount(initialValue);

  return { count, increment, decrement, reset };
}

// Usage in component:
function Counter() {
  const { count, increment, decrement, reset } = useCounter(0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
}
\`\`\`

**Benefits:**
- Extract and reuse stateful logic
- Share logic across components
- Easier to test than HOCs or render props
- Better code organization

## Your Task

Create a custom hook called **useInput** for form inputs:

1. Hook accepts \`initialValue\` parameter
2. Uses \`useState\` to track the input value
3. Creates a \`handleChange\` function that updates state from \`event.target.value\`
4. Creates a \`reset\` function that sets value back to initialValue
5. Returns an object: \`{ value, onChange: handleChange, reset }\`

Also create a component **NameForm** that uses this hook:
- Uses \`useInput\` with initial value ""
- Returns a \`<div>\` with className "form"
- Contains an \`<input>\` that spreads \`{...nameInput}\` (value and onChange)
- Contains a \`<button>\` that calls reset when clicked
- Shows the current value in a \`<p>\`: "Hello, {value}"
        `,
        hint: "Custom hooks are just functions that use other hooks. Return an object with value, onChange, and reset. Spread the returned object into the input.",
        starterCode: `import React, { useState } from 'react';

// Create useInput hook
function useInput(initialValue) {
  // Add state

  // Create handleChange and reset functions

  // Return object with value, onChange, reset
}

// Create NameForm component
function NameForm() {
  const nameInput = useInput('');

  return (
    // Render form with input using nameInput
  );
}

export { useInput };
export default NameForm;`,
        solution: `import React, { useState } from 'react';

function useInput(initialValue) {
  const [value, setValue] = useState(initialValue);

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const reset = () => {
    setValue(initialValue);
  };

  return { value, onChange: handleChange, reset };
}

function NameForm() {
  const nameInput = useInput('');

  return (
    <div className="form">
      <input {...nameInput} />
      <button onClick={nameInput.reset}>Reset</button>
      <p>Hello, {nameInput.value}</p>
    </div>
  );
}

export { useInput };
export default NameForm;`,
        testCases: [
          {
            id: "test-1",
            description: "useInput should be a function starting with 'use'",
            testFunction: `typeof useInput === 'function' && code.includes('function useInput')`,
          },
          {
            id: "test-2",
            description: "useInput should use useState",
            testFunction: `code.includes('useState')`,
          },
          {
            id: "test-3",
            description: "useInput should return object with value, onChange, reset",
            testFunction: `
              code.includes('return') &&
              code.includes('value') &&
              code.includes('onChange')
            `,
          },
          {
            id: "test-4",
            description: "NameForm should render an input",
            testFunction: `
              const { container } = render(<NameForm />);
              container.querySelector('input') !== null
            `,
          },
          {
            id: "test-5",
            description: "NameForm should use the useInput hook",
            testFunction: `code.includes('useInput(')`,
          },
        ],
        language: "jsx",
      },
    ],
  },

  // Lesson 6: Creating Custom Hooks
  {
    id: "component-patterns-06",
    moduleId: "module-2-2",
    title: "Creating Custom Hooks",
    order: 6,
    xpReward: 250,
    difficulty: "intermediate",
    steps: [
      {
        id: "component-patterns-06-step-1",
        order: 1,
        instruction: `
# Creating Custom Hooks

Let's practice building a more complex custom hook that uses multiple React hooks together.

**Example: useWindowSize**
\`\`\`jsx
function useWindowSize() {
  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });

  useEffect(() => {
    const handleResize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return size;
}

// Usage:
function MyComponent() {
  const { width, height } = useWindowSize();
  return <div>Window: {width} x {height}</div>;
}
\`\`\`

## Your Task

Create a **useOnlineStatus** hook that tracks whether the user is online:

1. Hook takes no parameters
2. Uses \`useState\` with initial value \`true\` (assume online)
3. Uses \`useEffect\` to:
   - Create handlers for 'online' and 'offline' events
   - Set online to true when 'online' event fires
   - Set online to false when 'offline' event fires
   - Add event listeners to window
   - Return cleanup function that removes listeners
4. Return the \`isOnline\` boolean

Also create **StatusDisplay** component:
- Uses the \`useOnlineStatus\` hook
- Returns a \`<div>\` with className "status"
- Shows "You are online" or "You are offline" in a \`<p>\`
- Has className "online" or "offline" based on status
        `,
        hint: "Use window.addEventListener('online', handler) and window.addEventListener('offline', handler). Don't forget cleanup!",
        starterCode: `import React, { useState, useEffect } from 'react';

// Create useOnlineStatus hook
function useOnlineStatus() {
  // Add state

  // Add effect with event listeners

  // Return isOnline
}

// Create StatusDisplay component
function StatusDisplay() {
  const isOnline = useOnlineStatus();

  return (
    // Render status
  );
}

export { useOnlineStatus };
export default StatusDisplay;`,
        solution: `import React, { useState, useEffect } from 'react';

function useOnlineStatus() {
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return isOnline;
}

function StatusDisplay() {
  const isOnline = useOnlineStatus();

  return (
    <div className={\`status \${isOnline ? 'online' : 'offline'}\`}>
      <p>{isOnline ? 'You are online' : 'You are offline'}</p>
    </div>
  );
}

export { useOnlineStatus };
export default StatusDisplay;`,
        testCases: [
          {
            id: "test-1",
            description: "useOnlineStatus should use useState",
            testFunction: `code.includes('useState')`,
          },
          {
            id: "test-2",
            description: "useOnlineStatus should use useEffect",
            testFunction: `code.includes('useEffect')`,
          },
          {
            id: "test-3",
            description: "Should add event listeners for online/offline",
            testFunction: `
              code.includes("addEventListener('online'") &&
              code.includes("addEventListener('offline'")
            `,
          },
          {
            id: "test-4",
            description: "Should return cleanup function",
            testFunction: `
              code.includes('removeEventListener') ||
              code.includes('return () =>')
            `,
          },
          {
            id: "test-5",
            description: "StatusDisplay should use the hook and render status",
            testFunction: `
              const { container } = render(<StatusDisplay />);
              container.querySelector('.status') !== null
            `,
          },
        ],
        language: "jsx",
      },
    ],
  },

  // Lesson 7: useToggle Hook
  {
    id: "component-patterns-07",
    moduleId: "module-2-2",
    title: "useToggle Hook",
    order: 7,
    xpReward: 200,
    difficulty: "intermediate",
    steps: [
      {
        id: "component-patterns-07-step-1",
        order: 1,
        instruction: `
# useToggle Hook

One of the most useful utility hooks is \`useToggle\`, which manages a boolean state that can be toggled on/off.

**Example Implementation:**
\`\`\`jsx
function useToggle(initialValue = false) {
  const [value, setValue] = useState(initialValue);

  const toggle = () => setValue(v => !v);
  const setTrue = () => setValue(true);
  const setFalse = () => setValue(false);

  return [value, toggle, setTrue, setFalse];
}

// Usage:
function Modal() {
  const [isOpen, toggleOpen, openModal, closeModal] = useToggle(false);

  return (
    <>
      <button onClick={openModal}>Open</button>
      {isOpen && (
        <div className="modal">
          <p>Modal content</p>
          <button onClick={closeModal}>Close</button>
        </div>
      )}
    </>
  );
}
\`\`\`

**Alternative API (object return):**
\`\`\`jsx
function useToggle(initialValue = false) {
  const [value, setValue] = useState(initialValue);

  return {
    value,
    toggle: () => setValue(v => !v),
    setTrue: () => setValue(true),
    setFalse: () => setValue(false)
  };
}
\`\`\`

## Your Task

Create a **useToggle** hook and a component that uses it:

**useToggle hook:**
- Parameter: \`initialValue\` (default: false)
- Uses \`useState\`
- Returns array: \`[value, toggle]\` where toggle is a function that flips the boolean

**ToggleDemo component:**
- Uses \`useToggle(false)\`
- Returns a \`<div>\` with className "toggle-demo"
- Shows a \`<p>\` with text "Status: ON" or "Status: OFF" based on value
- Has a \`<button>\` with text "Toggle" that calls toggle function
        `,
        hint: "In toggle function, use setValue(v => !v) to flip the boolean. Return an array [value, toggle].",
        starterCode: `import React, { useState } from 'react';

// Create useToggle hook
function useToggle(initialValue = false) {
  // Add state

  // Create toggle function

  // Return array
}

// Create ToggleDemo component
function ToggleDemo() {
  const [value, toggle] = useToggle(false);

  return (
    // Render toggle UI
  );
}

export { useToggle };
export default ToggleDemo;`,
        solution: `import React, { useState } from 'react';

function useToggle(initialValue = false) {
  const [value, setValue] = useState(initialValue);

  const toggle = () => setValue(v => !v);

  return [value, toggle];
}

function ToggleDemo() {
  const [value, toggle] = useToggle(false);

  return (
    <div className="toggle-demo">
      <p>Status: {value ? 'ON' : 'OFF'}</p>
      <button onClick={toggle}>Toggle</button>
    </div>
  );
}

export { useToggle };
export default ToggleDemo;`,
        testCases: [
          {
            id: "test-1",
            description: "useToggle should use useState",
            testFunction: `code.includes('useState')`,
          },
          {
            id: "test-2",
            description: "useToggle should return an array with value and toggle",
            testFunction: `code.includes('return [')`,
          },
          {
            id: "test-3",
            description: "ToggleDemo should render with initial OFF status",
            testFunction: `
              const { getByText } = render(<ToggleDemo />);
              getByText('Status: OFF') !== null
            `,
          },
          {
            id: "test-4",
            description: "ToggleDemo should have a toggle button",
            testFunction: `
              const { getByText } = render(<ToggleDemo />);
              const button = getByText('Toggle');
              button !== null && button.tagName === 'BUTTON'
            `,
          },
          {
            id: "test-5",
            description: "Toggle function should flip boolean state",
            testFunction: `code.includes('!v') || code.includes('!value')`,
          },
        ],
        language: "jsx",
      },
    ],
  },

  // Lesson 8: useLocalStorage Hook
  {
    id: "component-patterns-08",
    moduleId: "module-2-2",
    title: "useLocalStorage Hook",
    order: 8,
    xpReward: 300,
    difficulty: "intermediate",
    steps: [
      {
        id: "component-patterns-08-step-1",
        order: 1,
        instruction: `
# useLocalStorage Hook

A \`useLocalStorage\` hook syncs state with browser's localStorage, persisting data across page refreshes.

**Example:**
\`\`\`jsx
function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      setStoredValue(value);
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue];
}

// Usage:
function Settings() {
  const [theme, setTheme] = useLocalStorage('theme', 'light');

  return (
    <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
      Current theme: {theme}
    </button>
  );
}
\`\`\`

## Your Task

Create a **useLocalStorage** hook:

1. Parameters: \`key\`, \`initialValue\`
2. Use \`useState\` with lazy initialization (function):
   - Try to get item from localStorage.getItem(key)
   - Parse it with JSON.parse if it exists
   - Return initialValue if not found or error occurs
3. Create \`setValue\` function:
   - Updates state
   - Saves to localStorage with JSON.stringify
4. Return \`[storedValue, setValue]\`

Also create **ThemeSwitcher** component:
- Uses \`useLocalStorage('theme', 'light')\`
- Returns \`<div>\` with className "theme-switcher"
- Shows \`<p>\`: "Current theme: {theme}"
- Has \`<button>\` that toggles between 'light' and 'dark'

**Note:** For testing, we'll mock localStorage.
        `,
        hint: "Use useState(() => { /* initialization logic */ }) for lazy initial state. Wrap localStorage calls in try-catch.",
        starterCode: `import React, { useState } from 'react';

// Create useLocalStorage hook
function useLocalStorage(key, initialValue) {
  // Use lazy initialization
  const [storedValue, setStoredValue] = useState(() => {
    // Try to get from localStorage
  });

  // Create setValue function
  const setValue = (value) => {
    // Update state and localStorage
  };

  return [storedValue, setValue];
}

// Create ThemeSwitcher component
function ThemeSwitcher() {
  const [theme, setTheme] = useLocalStorage('theme', 'light');

  return (
    // Render theme UI
  );
}

export { useLocalStorage };
export default ThemeSwitcher;`,
        solution: `import React, { useState } from 'react';

function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      setStoredValue(value);
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue];
}

function ThemeSwitcher() {
  const [theme, setTheme] = useLocalStorage('theme', 'light');

  return (
    <div className="theme-switcher">
      <p>Current theme: {theme}</p>
      <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
        Toggle Theme
      </button>
    </div>
  );
}

export { useLocalStorage };
export default ThemeSwitcher;`,
        testCases: [
          {
            id: "test-1",
            description: "useLocalStorage should use useState with lazy initialization",
            testFunction: `code.includes('useState(()') || code.includes('useState(()')`,
          },
          {
            id: "test-2",
            description: "Should try to get item from localStorage",
            testFunction: `code.includes('localStorage.getItem')`,
          },
          {
            id: "test-3",
            description: "Should parse stored value with JSON.parse",
            testFunction: `code.includes('JSON.parse')`,
          },
          {
            id: "test-4",
            description: "setValue should save to localStorage",
            testFunction: `code.includes('localStorage.setItem') && code.includes('JSON.stringify')`,
          },
          {
            id: "test-5",
            description: "ThemeSwitcher should use the hook and render theme",
            testFunction: `
              // Mock localStorage
              const mockStorage = {};
              global.localStorage = {
                getItem: (key) => mockStorage[key],
                setItem: (key, value) => { mockStorage[key] = value; }
              };

              const { getByText } = render(<ThemeSwitcher />);
              getByText(/Current theme:/) !== null
            `,
          },
        ],
        language: "jsx",
      },
    ],
  },

  // Lesson 9: useFetch Hook
  {
    id: "component-patterns-09",
    moduleId: "module-2-2",
    title: "useFetch Hook",
    order: 9,
    xpReward: 300,
    difficulty: "intermediate",
    steps: [
      {
        id: "component-patterns-09-step-1",
        order: 1,
        instruction: `
# useFetch Hook

A \`useFetch\` hook handles data fetching with loading and error states, making API calls much cleaner.

**Example:**
\`\`\`jsx
function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch(url)
      .then(res => res.json())
      .then(data => {
        setData(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [url]);

  return { data, loading, error };
}

// Usage:
function UserProfile({ userId }) {
  const { data, loading, error } = useFetch(\`/api/users/\${userId}\`);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  return <div>{data.name}</div>;
}
\`\`\`

## Your Task

Create a **useFetch** hook (simplified for testing):

1. Parameter: \`url\`
2. State: \`data\`, \`loading\`, \`error\`
3. \`useEffect\` that:
   - Sets loading to true
   - Simulates fetch with setTimeout (100ms)
   - Sets data to \`{ url, message: "Data from " + url }\`
   - Sets loading to false
   - Includes cleanup (clearTimeout)
   - Depends on [url]
4. Return object: \`{ data, loading, error }\`

**DataDisplay** component:
- Props: \`url\`
- Uses \`useFetch(url)\`
- Returns \`<div>\` with className "data-display"
- Shows "Loading..." if loading
- Shows error message if error
- Shows data.message if data exists
        `,
        hint: "Use setTimeout to simulate async. Return cleanup function. Check loading state first, then error, then data.",
        starterCode: `import React, { useState, useEffect } from 'react';

// Create useFetch hook
function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Simulate fetching
  }, [url]);

  return { data, loading, error };
}

// Create DataDisplay component
function DataDisplay({ url }) {
  const { data, loading, error } = useFetch(url);

  return (
    // Render based on state
  );
}

export { useFetch };
export default DataDisplay;`,
        solution: `import React, { useState, useEffect } from 'react';

function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);

    const timer = setTimeout(() => {
      setData({ url, message: "Data from " + url });
      setLoading(false);
    }, 100);

    return () => clearTimeout(timer);
  }, [url]);

  return { data, loading, error };
}

function DataDisplay({ url }) {
  const { data, loading, error } = useFetch(url);

  return (
    <div className="data-display">
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {data && <p>{data.message}</p>}
    </div>
  );
}

export { useFetch };
export default DataDisplay;`,
        testCases: [
          {
            id: "test-1",
            description: "useFetch should use useState for data, loading, error",
            testFunction: `
              code.includes('useState') &&
              code.includes('loading') &&
              code.includes('data') &&
              code.includes('error')
            `,
          },
          {
            id: "test-2",
            description: "useFetch should use useEffect with url dependency",
            testFunction: `code.includes('useEffect') && code.includes('[url]')`,
          },
          {
            id: "test-3",
            description: "Should return object with data, loading, error",
            testFunction: `
              code.includes('return {') &&
              code.includes('data') &&
              code.includes('loading')
            `,
          },
          {
            id: "test-4",
            description: "DataDisplay should show loading state",
            testFunction: `
              const { getByText } = render(<DataDisplay url="/test" />);
              getByText('Loading...') !== null
            `,
          },
          {
            id: "test-5",
            description: "Should use setTimeout for simulation",
            testFunction: `code.includes('setTimeout')`,
          },
        ],
        language: "jsx",
      },
    ],
  },

  // Lesson 10: useDebounce Hook
  {
    id: "component-patterns-10",
    moduleId: "module-2-2",
    title: "useDebounce Hook",
    order: 10,
    xpReward: 300,
    difficulty: "intermediate",
    steps: [
      {
        id: "component-patterns-10-step-1",
        order: 1,
        instruction: `
# useDebounce Hook

Debouncing delays executing a function until after a user has stopped performing an action. This is essential for search inputs and performance optimization.

**Example:**
\`\`\`jsx
function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

// Usage:
function SearchBox() {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearch = useDebounce(searchTerm, 500);

  useEffect(() => {
    if (debouncedSearch) {
      // Make API call with debouncedSearch
      console.log('Searching for:', debouncedSearch);
    }
  }, [debouncedSearch]);

  return <input value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />;
}
\`\`\`

**Why debounce?**
- Prevents excessive API calls
- Improves performance
- Better user experience

## Your Task

Create a **useDebounce** hook:

1. Parameters: \`value\`, \`delay\`
2. State: \`debouncedValue\` initialized with \`value\`
3. \`useEffect\`:
   - Create setTimeout to update debouncedValue after delay
   - Return cleanup that clears timeout
   - Dependencies: [value, delay]
4. Return \`debouncedValue\`

**SearchInput** component:
- Uses \`useState\` for searchTerm
- Uses \`useDebounce(searchTerm, 300)\`
- Returns \`<div>\` with className "search"
- Has \`<input>\` controlled by searchTerm
- Shows \`<p>\`: "Searching for: {debouncedValue}" (only if debouncedValue exists)
        `,
        hint: "useEffect should set a timeout that updates debouncedValue. Clean up the timeout on each re-render.",
        starterCode: `import React, { useState, useEffect } from 'react';

// Create useDebounce hook
function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // Set timeout to update debounced value

    // Return cleanup
  }, [value, delay]);

  return debouncedValue;
}

// Create SearchInput component
function SearchInput() {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedValue = useDebounce(searchTerm, 300);

  return (
    // Render search UI
  );
}

export { useDebounce };
export default SearchInput;`,
        solution: `import React, { useState, useEffect } from 'react';

function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

function SearchInput() {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedValue = useDebounce(searchTerm, 300);

  return (
    <div className="search">
      <input
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {debouncedValue && <p>Searching for: {debouncedValue}</p>}
    </div>
  );
}

export { useDebounce };
export default SearchInput;`,
        testCases: [
          {
            id: "test-1",
            description: "useDebounce should use useState",
            testFunction: `code.includes('useState')`,
          },
          {
            id: "test-2",
            description: "useDebounce should use useEffect with dependencies",
            testFunction: `code.includes('useEffect') && code.includes('[value, delay]')`,
          },
          {
            id: "test-3",
            description: "Should use setTimeout in useEffect",
            testFunction: `code.includes('setTimeout')`,
          },
          {
            id: "test-4",
            description: "Should return cleanup function with clearTimeout",
            testFunction: `code.includes('clearTimeout')`,
          },
          {
            id: "test-5",
            description: "SearchInput should render input and use debounce",
            testFunction: `
              const { container } = render(<SearchInput />);
              container.querySelector('input') !== null && code.includes('useDebounce')
            `,
          },
        ],
        language: "jsx",
      },
    ],
  },

  // Lesson 11: Container/Presentational Pattern
  {
    id: "component-patterns-11",
    moduleId: "module-2-2",
    title: "Container/Presentational Pattern",
    order: 11,
    xpReward: 250,
    difficulty: "intermediate",
    steps: [
      {
        id: "component-patterns-11-step-1",
        order: 1,
        instruction: `
# Container/Presentational Pattern

This pattern separates **logic** (Container) from **UI** (Presentational). While less common with hooks, it's still valuable for understanding component architecture.

**Presentational Components:**
- Focus on how things look
- Receive data via props
- No state management (or minimal)
- Reusable and pure

**Container Components:**
- Focus on how things work
- Manage state and logic
- Fetch data, handle events
- Pass data to presentational components

**Example:**
\`\`\`jsx
// Presentational: Just UI
function UserList({ users, onUserClick }) {
  return (
    <ul>
      {users.map(user => (
        <li key={user.id} onClick={() => onUserClick(user)}>
          {user.name}
        </li>
      ))}
    </ul>
  );
}

// Container: Logic and data
function UserListContainer() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers().then(data => {
      setUsers(data);
      setLoading(false);
    });
  }, []);

  const handleUserClick = (user) => {
    console.log('Clicked:', user.name);
  };

  if (loading) return <div>Loading...</div>;

  return <UserList users={users} onUserClick={handleUserClick} />;
}
\`\`\`

## Your Task

Create a todo list using this pattern:

**TodoList** (Presentational):
- Props: \`todos\`, \`onToggle\`
- Returns \`<ul>\` with className "todo-list"
- Maps todos to \`<li>\` elements
- Each li shows todo.text
- Each li has onClick that calls \`onToggle(todo.id)\`
- Completed todos have className "completed"

**TodoListContainer** (Container):
- Uses \`useState\` with initial todos: \`[{ id: 1, text: 'Learn React', completed: false }]\`
- Creates \`handleToggle\` function that toggles todo.completed by id
- Returns \`<TodoList>\` passing todos and handleToggle

Export TodoList and TodoListContainer (default).
        `,
        hint: "Keep TodoList pure - just map and render. Put all logic in TodoListContainer. Use map to update the completed status.",
        starterCode: `import React, { useState } from 'react';

// Presentational: TodoList
function TodoList({ todos, onToggle }) {
  return (
    // Render list
  );
}

// Container: TodoListContainer
function TodoListContainer() {
  const [todos, setTodos] = useState([
    { id: 1, text: 'Learn React', completed: false }
  ]);

  const handleToggle = (id) => {
    // Toggle logic
  };

  return <TodoList todos={todos} onToggle={handleToggle} />;
}

export { TodoList };
export default TodoListContainer;`,
        solution: `import React, { useState } from 'react';

function TodoList({ todos, onToggle }) {
  return (
    <ul className="todo-list">
      {todos.map(todo => (
        <li
          key={todo.id}
          className={todo.completed ? 'completed' : ''}
          onClick={() => onToggle(todo.id)}
        >
          {todo.text}
        </li>
      ))}
    </ul>
  );
}

function TodoListContainer() {
  const [todos, setTodos] = useState([
    { id: 1, text: 'Learn React', completed: false }
  ]);

  const handleToggle = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  return <TodoList todos={todos} onToggle={handleToggle} />;
}

export { TodoList };
export default TodoListContainer;`,
        testCases: [
          {
            id: "test-1",
            description: "TodoList should be a presentational component accepting props",
            testFunction: `code.includes('function TodoList({ todos, onToggle })')`,
          },
          {
            id: "test-2",
            description: "TodoList should render ul with className 'todo-list'",
            testFunction: `
              const mockTodos = [{ id: 1, text: 'Test', completed: false }];
              const { container } = render(<TodoList todos={mockTodos} onToggle={() => {}} />);
              container.querySelector('ul.todo-list') !== null
            `,
          },
          {
            id: "test-3",
            description: "TodoListContainer should manage state",
            testFunction: `code.includes('useState') && code.includes('setTodos')`,
          },
          {
            id: "test-4",
            description: "TodoListContainer should render TodoList",
            testFunction: `
              const { getByText } = render(<TodoListContainer />);
              getByText('Learn React') !== null
            `,
          },
          {
            id: "test-5",
            description: "Should use map to render todos",
            testFunction: `code.includes('.map(')`,
          },
        ],
        language: "jsx",
      },
    ],
  },

  // Lesson 12: Controlled vs Uncontrolled
  {
    id: "component-patterns-12",
    moduleId: "module-2-2",
    title: "Controlled vs Uncontrolled Components",
    order: 12,
    xpReward: 250,
    difficulty: "intermediate",
    steps: [
      {
        id: "component-patterns-12-step-1",
        order: 1,
        instruction: `
# Controlled vs Uncontrolled Components

Understanding the difference between controlled and uncontrolled components is crucial for forms and user input.

**Controlled Component:**
- React state is the "single source of truth"
- Value is controlled by React
- Changes handled via onChange

\`\`\`jsx
function ControlledInput() {
  const [value, setValue] = useState('');

  return (
    <input
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
}
\`\`\`

**Uncontrolled Component:**
- DOM is the source of truth
- Access value via ref
- Useful for simple forms or file inputs

\`\`\`jsx
function UncontrolledInput() {
  const inputRef = useRef();

  const handleSubmit = () => {
    console.log(inputRef.current.value);
  };

  return (
    <>
      <input ref={inputRef} defaultValue="initial" />
      <button onClick={handleSubmit}>Submit</button>
    </>
  );
}
\`\`\`

**When to use each:**
- **Controlled**: Most cases, especially when you need validation or conditional rendering
- **Uncontrolled**: File inputs, integrating with non-React code, simple forms

## Your Task

Create both types of input components:

**ControlledForm**:
- Uses \`useState\` for name and email
- Returns \`<div>\` with className "controlled-form"
- Has two \`<input>\` elements (controlled by state)
- Has \`<p>\` showing "Name: {name}, Email: {email}"

**UncontrolledForm**:
- Uses \`useRef\` for nameRef
- Returns \`<div>\` with className "uncontrolled-form"
- Has \`<input>\` with ref={nameRef} and defaultValue=""
- Has \`<button>\` that alerts the input value when clicked

Export both (ControlledForm as default).
        `,
        hint: "Controlled: use value and onChange. Uncontrolled: use ref and defaultValue. Access ref with inputRef.current.value.",
        starterCode: `import React, { useState, useRef } from 'react';

// Controlled Form
function ControlledForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  return (
    // Render controlled inputs
  );
}

// Uncontrolled Form
function UncontrolledForm() {
  const nameRef = useRef();

  const handleClick = () => {
    // Alert the ref value
  };

  return (
    // Render uncontrolled input
  );
}

export { UncontrolledForm };
export default ControlledForm;`,
        solution: `import React, { useState, useRef } from 'react';

function ControlledForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  return (
    <div className="controlled-form">
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
      />
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <p>Name: {name}, Email: {email}</p>
    </div>
  );
}

function UncontrolledForm() {
  const nameRef = useRef();

  const handleClick = () => {
    alert(nameRef.current.value);
  };

  return (
    <div className="uncontrolled-form">
      <input ref={nameRef} defaultValue="" />
      <button onClick={handleClick}>Show Value</button>
    </div>
  );
}

export { UncontrolledForm };
export default ControlledForm;`,
        testCases: [
          {
            id: "test-1",
            description: "ControlledForm should use useState",
            testFunction: `code.includes('useState')`,
          },
          {
            id: "test-2",
            description: "ControlledForm should have controlled inputs with value and onChange",
            testFunction: `
              const { container } = render(<ControlledForm />);
              const inputs = container.querySelectorAll('input');
              inputs.length >= 2
            `,
          },
          {
            id: "test-3",
            description: "ControlledForm should display current values",
            testFunction: `
              const { getByText } = render(<ControlledForm />);
              getByText(/Name:.*Email:/) !== null
            `,
          },
          {
            id: "test-4",
            description: "UncontrolledForm should use useRef",
            testFunction: `code.includes('useRef')`,
          },
          {
            id: "test-5",
            description: "UncontrolledForm should use ref and defaultValue",
            testFunction: `code.includes('ref={') && code.includes('defaultValue')`,
          },
        ],
        language: "jsx",
      },
    ],
  },

  // Lesson 13: Form Libraries Integration
  {
    id: "component-patterns-13",
    moduleId: "module-2-2",
    title: "Form Libraries Integration",
    order: 13,
    xpReward: 250,
    difficulty: "intermediate",
    steps: [
      {
        id: "component-patterns-13-step-1",
        order: 1,
        instruction: `
# Form Libraries Integration

For complex forms, libraries like **React Hook Form** and **Formik** simplify validation, error handling, and submission.

**React Hook Form Example:**
\`\`\`jsx
import { useForm } from 'react-hook-form';

function RegistrationForm() {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        {...register('email', {
          required: 'Email is required',
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\\.[A-Z]{2,}$/i,
            message: 'Invalid email'
          }
        })}
      />
      {errors.email && <span>{errors.email.message}</span>}

      <input
        {...register('password', {
          required: true,
          minLength: { value: 8, message: 'Min 8 characters' }
        })}
      />
      {errors.password && <span>{errors.password.message}</span>}

      <button type="submit">Register</button>
    </form>
  );
}
\`\`\`

**Key benefits:**
- Less boilerplate
- Built-in validation
- Performance optimization
- Better error handling

## Your Task

Create a form using a custom validation hook (simulating a library pattern):

**useFormValidation** hook:
- Parameter: \`initialValues\` object
- State: \`values\`, \`errors\`
- Function \`handleChange(name, value)\` updates values[name]
- Function \`validate()\` checks if values.email exists and returns boolean
- Returns: \`{ values, errors, handleChange, validate }\`

**LoginForm** component:
- Uses \`useFormValidation({ email: '', password: '' })\`
- Returns \`<form>\` with className "login-form"
- Two \`<input>\` elements for email and password
- Inputs use value from hook and call handleChange on change
- \`<button>\` with type="submit"
- onSubmit calls validate() and prevents default

Export both.
        `,
        hint: "handleChange should update values object. Use event.preventDefault() in form onSubmit.",
        starterCode: `import React, { useState } from 'react';

// Custom validation hook
function useFormValidation(initialValues) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});

  const handleChange = (name, value) => {
    // Update values
  };

  const validate = () => {
    // Simple validation
    return values.email !== '';
  };

  return { values, errors, handleChange, validate };
}

// Login Form component
function LoginForm() {
  const { values, errors, handleChange, validate } = useFormValidation({
    email: '',
    password: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    validate();
  };

  return (
    // Render form
  );
}

export { useFormValidation };
export default LoginForm;`,
        solution: `import React, { useState } from 'react';

function useFormValidation(initialValues) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});

  const handleChange = (name, value) => {
    setValues({ ...values, [name]: value });
  };

  const validate = () => {
    return values.email !== '';
  };

  return { values, errors, handleChange, validate };
}

function LoginForm() {
  const { values, errors, handleChange, validate } = useFormValidation({
    email: '',
    password: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    validate();
  };

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <input
        type="email"
        value={values.email}
        onChange={(e) => handleChange('email', e.target.value)}
      />
      <input
        type="password"
        value={values.password}
        onChange={(e) => handleChange('password', e.target.value)}
      />
      <button type="submit">Login</button>
    </form>
  );
}

export { useFormValidation };
export default LoginForm;`,
        testCases: [
          {
            id: "test-1",
            description: "useFormValidation should use useState",
            testFunction: `code.includes('useState')`,
          },
          {
            id: "test-2",
            description: "useFormValidation should return values, errors, handleChange, validate",
            testFunction: `
              code.includes('return {') &&
              code.includes('values') &&
              code.includes('handleChange')
            `,
          },
          {
            id: "test-3",
            description: "LoginForm should render a form",
            testFunction: `
              const { container } = render(<LoginForm />);
              container.querySelector('form.login-form') !== null
            `,
          },
          {
            id: "test-4",
            description: "Form should have email and password inputs",
            testFunction: `
              const { container } = render(<LoginForm />);
              const inputs = container.querySelectorAll('input');
              inputs.length >= 2
            `,
          },
          {
            id: "test-5",
            description: "Form should have submit button",
            testFunction: `
              const { container } = render(<LoginForm />);
              const button = container.querySelector('button[type="submit"]');
              button !== null
            `,
          },
        ],
        language: "jsx",
      },
    ],
  },

  // Lesson 14: Component Lifecycle
  {
    id: "component-patterns-14",
    moduleId: "module-2-2",
    title: "Component Lifecycle with Hooks",
    order: 14,
    xpReward: 250,
    difficulty: "intermediate",
    steps: [
      {
        id: "component-patterns-14-step-1",
        order: 1,
        instruction: `
# Component Lifecycle with Hooks

In function components, **useEffect** handles all lifecycle events that class components handled with componentDidMount, componentDidUpdate, and componentWillUnmount.

**Lifecycle Phases:**

**1. Mount (component appears):**
\`\`\`jsx
useEffect(() => {
  console.log('Component mounted');
}, []); // Empty dependency array = run once on mount
\`\`\`

**2. Update (dependencies change):**
\`\`\`jsx
useEffect(() => {
  console.log('Count updated:', count);
}, [count]); // Runs when count changes
\`\`\`

**3. Unmount (component removed):**
\`\`\`jsx
useEffect(() => {
  const timer = setInterval(() => console.log('tick'), 1000);

  return () => {
    console.log('Cleanup before unmount');
    clearInterval(timer);
  };
}, []);
\`\`\`

**Complete Example:**
\`\`\`jsx
function UserData({ userId }) {
  const [user, setUser] = useState(null);

  // On mount and when userId changes
  useEffect(() => {
    console.log('Fetching user:', userId);
    fetchUser(userId).then(setUser);

    // Cleanup function
    return () => {
      console.log('Cleaning up user:', userId);
    };
  }, [userId]);

  return <div>{user?.name}</div>;
}
\`\`\`

## Your Task

Create a **Timer** component that demonstrates all lifecycle phases:

1. Uses \`useState\` for \`seconds\` (initial: 0)
2. Uses three \`useEffect\` hooks:
   - **Mount**: Logs "Timer mounted" (empty dependencies)
   - **Update**: Logs "Seconds: {seconds}" when seconds changes
   - **Interval**: Increments seconds every 1000ms, with cleanup
3. Returns \`<div>\` with className "timer"
4. Shows \`<p>\`: "Elapsed: {seconds}s"

The interval effect should:
- Create setInterval to increment seconds
- Return cleanup that calls clearInterval
- Have empty dependencies []
        `,
        hint: "Use three separate useEffect calls. The interval effect needs setSeconds(s => s + 1) and return () => clearInterval(timer).",
        starterCode: `import React, { useState, useEffect } from 'react';

function Timer() {
  const [seconds, setSeconds] = useState(0);

  // Effect 1: On mount
  useEffect(() => {
    console.log('Timer mounted');
  }, []);

  // Effect 2: On seconds change
  useEffect(() => {
    // Log seconds
  }, [seconds]);

  // Effect 3: Interval with cleanup
  useEffect(() => {
    // Set interval

    // Return cleanup
  }, []);

  return (
    // Render timer
  );
}

export default Timer;`,
        solution: `import React, { useState, useEffect } from 'react';

function Timer() {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    console.log('Timer mounted');
  }, []);

  useEffect(() => {
    console.log('Seconds:', seconds);
  }, [seconds]);

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds(s => s + 1);
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div className="timer">
      <p>Elapsed: {seconds}s</p>
    </div>
  );
}

export default Timer;`,
        testCases: [
          {
            id: "test-1",
            description: "Should use useState for seconds",
            testFunction: `code.includes('useState')`,
          },
          {
            id: "test-2",
            description: "Should have multiple useEffect calls",
            testFunction: `(code.match(/useEffect/g) || []).length >= 3`,
          },
          {
            id: "test-3",
            description: "Should render elapsed time",
            testFunction: `
              const { getByText } = render(<Timer />);
              getByText(/Elapsed:.*s/) !== null
            `,
          },
          {
            id: "test-4",
            description: "Should use setInterval",
            testFunction: `code.includes('setInterval')`,
          },
          {
            id: "test-5",
            description: "Should have cleanup function with clearInterval",
            testFunction: `code.includes('clearInterval') && code.includes('return () =>')`,
          },
        ],
        language: "jsx",
      },
    ],
  },

  // Lesson 15: Error Boundaries
  {
    id: "component-patterns-15",
    moduleId: "module-2-2",
    title: "Error Boundaries",
    order: 15,
    xpReward: 300,
    difficulty: "intermediate",
    steps: [
      {
        id: "component-patterns-15-step-1",
        order: 1,
        instruction: `
# Error Boundaries

Error Boundaries catch JavaScript errors in child components, log errors, and display a fallback UI instead of crashing the entire app.

**Important:** Error Boundaries must be **class components** (for now). Hooks can't catch errors yet.

**Class Component Example:**
\`\`\`jsx
import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary">
          <h2>Something went wrong</h2>
          <p>{this.state.error?.message}</p>
        </div>
      );
    }

    return this.props.children;
  }
}

// Usage:
<ErrorBoundary>
  <MyComponent />
</ErrorBoundary>
\`\`\`

**What Error Boundaries catch:**
- ✅ Rendering errors
- ✅ Lifecycle method errors
- ✅ Constructor errors in child components

**What they DON'T catch (Important Limitations):**
- ❌ **Event handlers** - Errors in onClick, onChange, etc. Use try-catch instead
- ❌ **Async code** - Errors in setTimeout, promises, async/await. Use try-catch
- ❌ **Server-side rendering** - SSR errors need separate handling
- ❌ **Errors in the boundary itself** - Use a parent boundary to catch these

**Why these limitations?**
- Event handlers run outside the React rendering cycle
- Async code executes after render completes
- Error Boundaries only catch errors during render and lifecycle methods

**Pro Tip:** For production apps, consider using libraries like \`react-error-boundary\` which provide hooks-based error boundaries and better DX.

## Your Task

Create an **ErrorBoundary** class component:

1. Extend React.Component
2. Constructor: Initialize state with \`hasError: false\` and \`error: null\`
3. Implement \`static getDerivedStateFromError(error)\`:
   - Return \`{ hasError: true, error }\`
4. Implement \`componentDidCatch(error, errorInfo)\`:
   - Call \`console.error('Error:', error)\`
5. Implement \`render()\`:
   - If hasError, return \`<div className="error-boundary">\` with error message
   - Otherwise, return \`this.props.children\`

Also create **BuggyComponent** (functional):
- Props: \`shouldThrow\`
- If shouldThrow is true, throw new Error('Crash!')
- Otherwise, return \`<div>All good!</div>\`

Export both.
        `,
        hint: "Use class ErrorBoundary extends React.Component. Remember getDerivedStateFromError is static. Return children when no error.",
        starterCode: `import React from 'react';

// ErrorBoundary class component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    // Initialize state
  }

  static getDerivedStateFromError(error) {
    // Return new state
  }

  componentDidCatch(error, errorInfo) {
    // Log error
  }

  render() {
    // Render fallback or children
  }
}

// Buggy component for testing
function BuggyComponent({ shouldThrow }) {
  if (shouldThrow) {
    throw new Error('Crash!');
  }
  return <div>All good!</div>;
}

export { BuggyComponent };
export default ErrorBoundary;`,
        solution: `import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error:', error);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary">
          <h2>Something went wrong</h2>
          <p>{this.state.error?.message}</p>
        </div>
      );
    }

    return this.props.children;
  }
}

function BuggyComponent({ shouldThrow }) {
  if (shouldThrow) {
    throw new Error('Crash!');
  }
  return <div>All good!</div>;
}

export { BuggyComponent };
export default ErrorBoundary;`,
        testCases: [
          {
            id: "test-1",
            description: "ErrorBoundary should be a class component",
            testFunction: `code.includes('class ErrorBoundary') && code.includes('extends React.Component')`,
          },
          {
            id: "test-2",
            description: "Should initialize state with hasError and error",
            testFunction: `code.includes('this.state') && code.includes('hasError')`,
          },
          {
            id: "test-3",
            description: "Should implement getDerivedStateFromError",
            testFunction: `code.includes('getDerivedStateFromError')`,
          },
          {
            id: "test-4",
            description: "Should implement componentDidCatch",
            testFunction: `code.includes('componentDidCatch')`,
          },
          {
            id: "test-5",
            description: "Should render children when no error",
            testFunction: `code.includes('this.props.children')`,
          },
        ],
        language: "jsx",
      },
    ],
  },
];
