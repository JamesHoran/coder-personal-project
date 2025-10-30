/**
 * React Course - Phase 1: Novice Foundations
 * Module 1.1: React Fundamentals (10 lessons)
 *
 * This module introduces the absolute basics of React including
 * components, JSX, rendering, and composition.
 */

import { InteractiveLesson } from "@/types";

export const reactFundamentalsLessons: InteractiveLesson[] = [
  // Lesson 1: Create Your First Component
  {
    id: "react-basics-01",
    moduleId: "module-1-1",
    title: "Create Your First React Component",
    order: 1,
    xpReward: 50,
    difficulty: "beginner",
    steps: [
      {
        id: "react-basics-01-step-1",
        order: 1,
        instruction: `
# Create Your First React Component

In React, **components** are the building blocks of your application. A component is a JavaScript function that returns **JSX** (JavaScript XML), which describes what should appear on the screen.

The simplest React component is a function that returns JSX:

\`\`\`jsx
function Welcome() {
  return <h1>Hello, World!</h1>;
}
\`\`\`

This creates a component named \`Welcome\` that displays "Hello, World!" in an h1 heading.

**Important Rules:**
- Component names must start with a capital letter
- Components must return JSX
- JSX looks like HTML but it's actually JavaScript

## Your Task

Create a functional component named \`Greeting\` that returns an \`<h1>\` element containing the text **"Welcome to React!"**.
        `,
        hint: "Remember that function names in React must start with a capital letter. Your function should return JSX wrapped in parentheses.",
        starterCode: `import React from 'react';

// Create your Greeting component here


export default Greeting;`,
        solution: `import React from 'react';

function Greeting() {
  return <h1>Welcome to React!</h1>;
}

export default Greeting;`,
        testCases: [
          {
            id: "test-1",
            description: "The Greeting component should exist",
            testFunction: `typeof Greeting === 'function'`,
          },
          {
            id: "test-2",
            description: "The Greeting component should return an h1 element",
            testFunction: `
              const { container } = render(<Greeting />);
              container.querySelector('h1') !== null
            `,
          },
          {
            id: "test-3",
            description: "The h1 element should contain the text 'Welcome to React!'",
            testFunction: `
              const { getByText } = render(<Greeting />);
              getByText('Welcome to React!') !== null
            `,
          },
          {
            id: "test-4",
            description: "You should export the Greeting component as default",
            testFunction: `code.includes('export default Greeting')`,
          },
        ],
        language: "jsx",
      },
    ],
  },

  // Lesson 2: Using JSX Expressions
  {
    id: "react-basics-02",
    moduleId: "module-1-1",
    title: "Using JSX Expressions",
    order: 2,
    xpReward: 75,
    difficulty: "beginner",
    steps: [
      {
        id: "react-basics-02-step-1",
        order: 1,
        instruction: `
# Using JSX Expressions

JSX allows you to embed JavaScript expressions inside curly braces \`{}\`. This is one of the most powerful features of React.

\`\`\`jsx
function Greeting() {
  const name = "Alice";
  return <h1>Hello, {name}!</h1>;
}
\`\`\`

You can put any valid JavaScript expression inside the curly braces:
- Variables: \`{name}\`
- Function calls: \`{getName()}\`
- Mathematical operations: \`{2 + 2}\`
- Template literals: \`{\`Hello \${name}\`}\`

## Your Task

Create a component named \`UserGreeting\` that:
1. Declares a constant variable \`userName\` with the value \`"Developer"\`
2. Declares a constant variable \`year\` with the value \`2025\`
3. Returns a \`<div>\` containing:
   - An \`<h1>\` with the text "Hello, {userName}!"
   - A \`<p>\` with the text "Welcome to React in {year}"
        `,
        hint: "Use curly braces {} to embed JavaScript variables inside your JSX. Remember to wrap multiple elements in a single parent <div>.",
        starterCode: `import React from 'react';

function UserGreeting() {
  // Declare your variables here


  // Return your JSX here

}

export default UserGreeting;`,
        solution: `import React from 'react';

function UserGreeting() {
  const userName = "Developer";
  const year = 2025;

  return (
    <div>
      <h1>Hello, {userName}!</h1>
      <p>Welcome to React in {year}</p>
    </div>
  );
}

export default UserGreeting;`,
        testCases: [
          {
            id: "test-1",
            description: "The component should declare a userName variable",
            testFunction: `code.includes('userName') && code.includes('"Developer"')`,
          },
          {
            id: "test-2",
            description: "The component should declare a year variable with value 2025",
            testFunction: `code.includes('year') && code.includes('2025')`,
          },
          {
            id: "test-3",
            description: "The h1 should display 'Hello, Developer!'",
            testFunction: `
              const { getByText } = render(<UserGreeting />);
              getByText('Hello, Developer!') !== null
            `,
          },
          {
            id: "test-4",
            description: "The paragraph should display 'Welcome to React in 2025'",
            testFunction: `
              const { getByText } = render(<UserGreeting />);
              getByText('Welcome to React in 2025') !== null
            `,
          },
          {
            id: "test-5",
            description: "You should use JSX expressions with curly braces",
            testFunction: `code.includes('{userName}') && code.includes('{year}')`,
          },
        ],
        language: "jsx",
      },
    ],
  },

  // Lesson 3: Component Props Basics
  {
    id: "react-basics-03",
    moduleId: "module-1-1",
    title: "Understanding Component Props",
    order: 3,
    xpReward: 100,
    difficulty: "beginner",
    steps: [
      {
        id: "react-basics-03-step-1",
        order: 1,
        instruction: `
# Understanding Component Props

**Props** (short for properties) allow you to pass data from a parent component to a child component. They make components reusable and dynamic.

\`\`\`jsx
function Welcome(props) {
  return <h1>Hello, {props.name}!</h1>;
}

// Using the component
<Welcome name="Alice" />
\`\`\`

Think of props like function parameters. The parent component passes data as attributes, and the child component receives them as an object called \`props\`.

**Key Points:**
- Props are read-only (you cannot modify them)
- Props are passed as attributes in JSX
- Props are received as an object in the component function

## Your Task

Create a component named \`UserCard\` that accepts props and displays user information:
1. The component should accept a \`props\` parameter
2. It should display the \`props.name\` in an \`<h2>\` element
3. It should display the \`props.role\` in a \`<p>\` element
4. Wrap everything in a \`<div>\` with className "user-card"
        `,
        hint: "Access props using props.propertyName. For example: props.name or props.role.",
        starterCode: `import React from 'react';

function UserCard(props) {
  // Return JSX that uses props.name and props.role

}

export default UserCard;`,
        solution: `import React from 'react';

function UserCard(props) {
  return (
    <div className="user-card">
      <h2>{props.name}</h2>
      <p>{props.role}</p>
    </div>
  );
}

export default UserCard;`,
        testCases: [
          {
            id: "test-1",
            description: "The component should accept props parameter",
            testFunction: `code.includes('function UserCard(props)')`,
          },
          {
            id: "test-2",
            description: "The component should render the name prop in an h2",
            testFunction: `
              const { container } = render(<UserCard name="John Doe" role="Developer" />);
              const h2 = container.querySelector('h2');
              h2 !== null && h2.textContent === 'John Doe'
            `,
          },
          {
            id: "test-3",
            description: "The component should render the role prop in a p element",
            testFunction: `
              const { container } = render(<UserCard name="John Doe" role="Developer" />);
              const p = container.querySelector('p');
              p !== null && p.textContent === 'Developer'
            `,
          },
          {
            id: "test-4",
            description: "Everything should be wrapped in a div with className 'user-card'",
            testFunction: `
              const { container } = render(<UserCard name="John Doe" role="Developer" />);
              container.querySelector('div.user-card') !== null
            `,
          },
          {
            id: "test-5",
            description: "You should use props.name and props.role",
            testFunction: `code.includes('props.name') && code.includes('props.role')`,
          },
        ],
        language: "jsx",
      },
    ],
  },

  // Lesson 4: Props Destructuring
  {
    id: "react-basics-04",
    moduleId: "module-1-1",
    title: "Props Destructuring",
    order: 4,
    xpReward: 100,
    difficulty: "beginner",
    steps: [
      {
        id: "react-basics-04-step-1",
        order: 1,
        instruction: `
# Props Destructuring

Instead of writing \`props.name\` and \`props.email\` repeatedly, you can **destructure** props directly in the function parameter. This is a cleaner and more common pattern.

**Before (without destructuring):**
\`\`\`jsx
function Welcome(props) {
  return <h1>Hello, {props.name}!</h1>;
}
\`\`\`

**After (with destructuring):**
\`\`\`jsx
function Welcome({ name }) {
  return <h1>Hello, {name}!</h1>;
}
\`\`\`

You can destructure multiple props at once:
\`\`\`jsx
function UserInfo({ name, email, age }) {
  return (
    <div>
      <h1>{name}</h1>
      <p>{email}</p>
      <p>Age: {age}</p>
    </div>
  );
}
\`\`\`

## Your Task

Create a component named \`PokemonCard\` that uses **props destructuring**:
1. Destructure \`name\`, \`power\`, and \`legendary\` from props
2. Display the name in an \`<h3>\`
3. Display the power in a \`<p>\` with the text "Power Level: " followed by the power value
4. Display legendary status in a \`<p>\` with the text "Legendary: {legendary ? '⭐ Yes!' : 'No'}"
5. Wrap everything in a \`<div>\` with className "pokemon-card"
        `,
        hint: "Use destructuring in the function parameter: function PokemonCard({ name, power, legendary }). Use a ternary operator with emojis for the legendary status!",
        starterCode: `import React from 'react';

function PokemonCard(/* destructure props here */) {
  return (
    // Your JSX here
  );
}

export default PokemonCard;`,
        solution: `import React from 'react';

function PokemonCard({ name, power, legendary }) {
  return (
    <div className="pokemon-card">
      <h3>{name}</h3>
      <p>Power Level: {power}</p>
      <p>Legendary: {legendary ? '⭐ Yes!' : 'No'}</p>
    </div>
  );
}

export default PokemonCard;`,
        testCases: [
          {
            id: "test-1",
            description: "The component should use props destructuring",
            testFunction: `code.includes('function PokemonCard({') && code.includes('name') && code.includes('power') && code.includes('legendary')`,
          },
          {
            id: "test-2",
            description: "The name should be displayed in an h3 element",
            testFunction: `
              const { container } = render(<PokemonCard name="Pikachu" power={320} legendary={false} />);
              const h3 = container.querySelector('h3');
              h3 !== null && h3.textContent === 'Pikachu'
            `,
          },
          {
            id: "test-3",
            description: "The power should be displayed with 'Power Level: ' prefix",
            testFunction: `
              const { getByText } = render(<PokemonCard name="Pikachu" power={320} legendary={false} />);
              getByText('Power Level: 320') !== null
            `,
          },
          {
            id: "test-4",
            description: "Should show 'Legendary: ⭐ Yes!' when legendary is true",
            testFunction: `
              const { getByText } = render(<PokemonCard name="Mewtwo" power={850} legendary={true} />);
              getByText(/Legendary:.*Yes/) !== null
            `,
          },
          {
            id: "test-5",
            description: "Should show 'Legendary: No' when legendary is false",
            testFunction: `
              const { getByText } = render(<PokemonCard name="Pikachu" power={320} legendary={false} />);
              getByText('Legendary: No') !== null
            `,
          },
          {
            id: "test-6",
            description: "Should use a ternary operator for conditional rendering",
            testFunction: `code.includes('?') && code.includes("'Yes'") && code.includes("'No'")`,
          },
        ],
        language: "jsx",
      },
    ],
  },

  // Lesson 5: The Children Prop
  {
    id: "react-basics-05",
    moduleId: "module-1-1",
    title: "Understanding the Children Prop",
    order: 5,
    xpReward: 125,
    difficulty: "beginner",
    steps: [
      {
        id: "react-basics-05-step-1",
        order: 1,
        instruction: `
# Understanding the Children Prop

The \`children\` prop is a special prop that allows you to pass elements or components between the opening and closing tags of a component.

\`\`\`jsx
function Card({ children }) {
  return (
    <div className="card">
      {children}
    </div>
  );
}

// Using the component
<Card>
  <h1>Title</h1>
  <p>This is the content inside the card.</p>
</Card>
\`\`\`

Everything between \`<Card>\` and \`</Card>\` becomes the \`children\` prop. This pattern is perfect for creating wrapper or container components.

**Common use cases:**
- Layout components (Card, Container, Modal)
- Buttons with icons
- Wrappers that add styling or behavior

## Your Task

Create a component named \`Alert\` that acts as a wrapper:
1. Destructure \`children\` and \`type\` from props
2. Return a \`<div>\` with className "alert"
3. Add another className based on the type prop: "alert-{type}" (e.g., "alert-success")
4. Display the children inside the div
5. Set the style to have padding of "16px" and borderRadius of "8px"
        `,
        hint: "You can combine multiple classNames using template literals: className={\\`alert alert-\\${type}\\`}. Don't forget to render {children} inside the div.",
        starterCode: `import React from 'react';

function Alert({ children, type }) {
  return (
    // Your JSX here
  );
}

export default Alert;`,
        solution: `import React from 'react';

function Alert({ children, type }) {
  return (
    <div
      className={\`alert alert-\${type}\`}
      style={{ padding: '16px', borderRadius: '8px' }}
    >
      {children}
    </div>
  );
}

export default Alert;`,
        testCases: [
          {
            id: "test-1",
            description: "The component should accept children and type props",
            testFunction: `code.includes('children') && code.includes('type')`,
          },
          {
            id: "test-2",
            description: "The component should render children content",
            testFunction: `
              const { getByText } = render(<Alert type="success">Success message</Alert>);
              getByText('Success message') !== null
            `,
          },
          {
            id: "test-3",
            description: "The div should have className 'alert'",
            testFunction: `
              const { container } = render(<Alert type="success">Test</Alert>);
              const div = container.querySelector('div.alert');
              div !== null
            `,
          },
          {
            id: "test-4",
            description: "The div should have className based on type prop",
            testFunction: `
              const { container } = render(<Alert type="warning">Test</Alert>);
              const div = container.querySelector('div.alert-warning');
              div !== null
            `,
          },
          {
            id: "test-5",
            description: "The div should have padding and borderRadius styles",
            testFunction: `
              const { container } = render(<Alert type="success">Test</Alert>);
              const div = container.querySelector('div');
              div.style.padding === '16px' && div.style.borderRadius === '8px'
            `,
          },
        ],
        language: "jsx",
      },
    ],
  },

  // Continue with remaining lessons 6-10...
  // For brevity, I'll create placeholders that follow the same pattern

  // Lesson 6: Multiple JSX Elements
  {
    id: "react-basics-06",
    moduleId: "module-1-1",
    title: "Rendering Multiple Elements with Fragments",
    order: 6,
    xpReward: 100,
    difficulty: "beginner",
    steps: [
      {
        id: "react-basics-06-step-1",
        order: 1,
        instruction: `
# Rendering Multiple Elements with Fragments

React components must return a single parent element. But what if you want to return multiple elements without adding an extra \`<div>\`?

**The Problem:**
\`\`\`jsx
function MyComponent() {
  return (
    <h1>Title</h1>
    <p>Paragraph</p>  // ❌ Error: Adjacent JSX elements must be wrapped
  );
}
\`\`\`

**Solution 1: Wrap in a div**
\`\`\`jsx
return (
  <div>
    <h1>Title</h1>
    <p>Paragraph</p>
  </div>
);
\`\`\`

**Solution 2: Use React Fragment**
\`\`\`jsx
return (
  <>
    <h1>Title</h1>
    <p>Paragraph</p>
  </>
);
\`\`\`

Fragments let you group elements without adding extra nodes to the DOM. The short syntax \`<> </>\` is equivalent to \`<React.Fragment> </React.Fragment>\`.

## Your Task

Create a component named \`UserProfile\` that uses a **Fragment**:
1. Destructure \`name\`, \`email\`, and \`bio\` from props
2. Return multiple elements wrapped in a Fragment (\`<> </>\`)
3. Include an \`<h2>\` with the name
4. Include a \`<p>\` with className "email" containing the email
5. Include a \`<p>\` with className "bio" containing the bio
        `,
        hint: "Use the short fragment syntax: <>...</>. Don't add a wrapping div.",
        starterCode: `import React from 'react';

function UserProfile({ name, email, bio }) {
  return (
    // Use fragment here
  );
}

export default UserProfile;`,
        solution: `import React from 'react';

function UserProfile({ name, email, bio }) {
  return (
    <>
      <h2>{name}</h2>
      <p className="email">{email}</p>
      <p className="bio">{bio}</p>
    </>
  );
}

export default UserProfile;`,
        testCases: [
          {
            id: "test-1",
            description: "The component should use a Fragment",
            testFunction: `code.includes('<>') && code.includes('</>')`,
          },
          {
            id: "test-2",
            description: "Should render the name in an h2",
            testFunction: `
              const { container } = render(<UserProfile name="John" email="john@example.com" bio="Developer" />);
              const h2 = container.querySelector('h2');
              h2 !== null && h2.textContent === 'John'
            `,
          },
          {
            id: "test-3",
            description: "Should render email with className 'email'",
            testFunction: `
              const { container } = render(<UserProfile name="John" email="john@example.com" bio="Developer" />);
              const email = container.querySelector('p.email');
              email !== null && email.textContent === 'john@example.com'
            `,
          },
          {
            id: "test-4",
            description: "Should render bio with className 'bio'",
            testFunction: `
              const { container } = render(<UserProfile name="John" email="john@example.com" bio="Developer" />);
              const bio = container.querySelector('p.bio');
              bio !== null && bio.textContent === 'Developer'
            `,
          },
          {
            id: "test-5",
            description: "Should not wrap elements in an extra div",
            testFunction: `!code.includes('<div>') || !code.match(/<div[^>]*>\\s*<h2>/)`,
          },
        ],
        language: "jsx",
      },
    ],
  },

  // Lessons 7-10 would continue here with topics like:
  // 7. Component Composition
  // 8. Conditional Rendering with &&
  // 9. Rendering Lists with map()
  // 10. Handling Events

  // Lesson 7: Component Composition
  {
    id: "react-basics-07",
    moduleId: "module-1-1",
    title: "Component Composition",
    order: 7,
    xpReward: 150,
    difficulty: "beginner",
    steps: [
      {
        id: "react-basics-07-step-1",
        order: 1,
        instruction: `
# Component Composition

One of React's most powerful features is **composition**: building complex components by combining simpler ones. Instead of inheriting from parent classes, React uses composition to create component hierarchies.

\`\`\`jsx
function Avatar({ src, alt }) {
  return <img src={src} alt={alt} className="avatar" />;
}

function UserCard({ name, avatarSrc }) {
  return (
    <div className="user-card">
      <Avatar src={avatarSrc} alt={name} />
      <h2>{name}</h2>
    </div>
  );
}
\`\`\`

This creates modular, reusable components that are easy to understand and maintain.

## Your Task

Create two components that work together:

**1. Component \`Badge\`:**
- Accepts props: \`text\` and \`color\`
- Returns a \`<span>\` with className "badge"
- Displays the text
- Has inline style with backgroundColor set to the color prop

**2. Component \`UserHeader\`:**
- Accepts props: \`name\`, \`badgeText\`, and \`badgeColor\`
- Returns a \`<div>\` with className "user-header"
- Contains an \`<h1>\` with the name
- Uses the Badge component, passing badgeText and badgeColor to it

Export both components (Badge first, then UserHeader as default).
        `,
        hint: "Create Badge first, then use <Badge text={badgeText} color={badgeColor} /> inside UserHeader. Export Badge with 'export', and UserHeader with 'export default'.",
        starterCode: `import React from 'react';

// Create Badge component here


// Create UserHeader component here


export { Badge };
export default UserHeader;`,
        solution: `import React from 'react';

function Badge({ text, color }) {
  return (
    <span className="badge" style={{ backgroundColor: color }}>
      {text}
    </span>
  );
}

function UserHeader({ name, badgeText, badgeColor }) {
  return (
    <div className="user-header">
      <h1>{name}</h1>
      <Badge text={badgeText} color={badgeColor} />
    </div>
  );
}

export { Badge };
export default UserHeader;`,
        testCases: [
          {
            id: "test-1",
            description: "Badge component should exist",
            testFunction: `typeof Badge === 'function'`,
          },
          {
            id: "test-2",
            description: "Badge should render a span with className 'badge'",
            testFunction: `
              const { container } = render(<Badge text="Admin" color="red" />);
              container.querySelector('span.badge') !== null
            `,
          },
          {
            id: "test-3",
            description: "Badge should display the text prop",
            testFunction: `
              const { getByText } = render(<Badge text="Admin" color="red" />);
              getByText('Admin') !== null
            `,
          },
          {
            id: "test-4",
            description: "Badge should have backgroundColor from color prop",
            testFunction: `
              const { container } = render(<Badge text="Admin" color="blue" />);
              const span = container.querySelector('span');
              span.style.backgroundColor === 'blue'
            `,
          },
          {
            id: "test-5",
            description: "UserHeader should use Badge component",
            testFunction: `
              const { container } = render(<UserHeader name="John" badgeText="Pro" badgeColor="gold" />);
              container.querySelector('span.badge') !== null
            `,
          },
          {
            id: "test-6",
            description: "UserHeader should render name in h1 and pass props to Badge",
            testFunction: `
              const { getByText, container } = render(<UserHeader name="John" badgeText="Pro" badgeColor="gold" />);
              const h1 = container.querySelector('h1');
              const badge = container.querySelector('span.badge');
              h1.textContent === 'John' && badge.textContent === 'Pro'
            `,
          },
        ],
        language: "jsx",
      },
    ],
  },

  // Lesson 8: Conditional Rendering
  {
    id: "react-basics-08",
    moduleId: "module-1-1",
    title: "Conditional Rendering with Logical AND",
    order: 8,
    xpReward: 125,
    difficulty: "beginner",
    steps: [
      {
        id: "react-basics-08-step-1",
        order: 1,
        instruction: `
# Conditional Rendering with Logical AND

Sometimes you want to render an element **only if a condition is true**. React uses JavaScript's logical AND (\`&&\`) operator for this pattern.

\`\`\`jsx
function Notification({ hasNewMessages, count }) {
  return (
    <div>
      <h1>Inbox</h1>
      {hasNewMessages && <p>You have {count} new messages!</p>}
    </div>
  );
}
\`\`\`

**How it works:**
- If \`hasNewMessages\` is \`true\`, React renders the \`<p>\` element
- If \`hasNewMessages\` is \`false\`, React renders nothing

This is shorter than using an if statement or ternary operator when you only want to render something conditionally (no "else" case).

## Your Task

Create a component named \`Dashboard\` that conditionally renders elements:

1. Destructure \`userName\`, \`isLoggedIn\`, and \`notificationCount\` from props
2. Return a \`<div>\` with className "dashboard"
3. Always show an \`<h1>\` with text "Dashboard"
4. **Only if** \`isLoggedIn\` is true, show a \`<p>\` with text "Welcome back, {userName}!"
5. **Only if** \`notificationCount > 0\`, show a \`<p>\` with text "You have {notificationCount} notifications"
        `,
        hint: "Use the && operator: {condition && <element>}. Check both isLoggedIn and notificationCount > 0.",
        starterCode: `import React from 'react';

function Dashboard({ userName, isLoggedIn, notificationCount }) {
  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      {/* Add conditional rendering here */}
    </div>
  );
}

export default Dashboard;`,
        solution: `import React from 'react';

function Dashboard({ userName, isLoggedIn, notificationCount }) {
  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      {isLoggedIn && <p>Welcome back, {userName}!</p>}
      {notificationCount > 0 && <p>You have {notificationCount} notifications</p>}
    </div>
  );
}

export default Dashboard;`,
        testCases: [
          {
            id: "test-1",
            description: "Should always render the h1 with 'Dashboard'",
            testFunction: `
              const { getByText } = render(<Dashboard userName="John" isLoggedIn={false} notificationCount={0} />);
              getByText('Dashboard') !== null
            `,
          },
          {
            id: "test-2",
            description: "Should show welcome message when isLoggedIn is true",
            testFunction: `
              const { getByText } = render(<Dashboard userName="Alice" isLoggedIn={true} notificationCount={0} />);
              getByText('Welcome back, Alice!') !== null
            `,
          },
          {
            id: "test-3",
            description: "Should NOT show welcome message when isLoggedIn is false",
            testFunction: `
              const { queryByText } = render(<Dashboard userName="Alice" isLoggedIn={false} notificationCount={0} />);
              queryByText(/Welcome back/) === null
            `,
          },
          {
            id: "test-4",
            description: "Should show notifications when count > 0",
            testFunction: `
              const { getByText } = render(<Dashboard userName="John" isLoggedIn={false} notificationCount={5} />);
              getByText('You have 5 notifications') !== null
            `,
          },
          {
            id: "test-5",
            description: "Should NOT show notifications when count is 0",
            testFunction: `
              const { queryByText } = render(<Dashboard userName="John" isLoggedIn={true} notificationCount={0} />);
              queryByText(/notifications/) === null
            `,
          },
          {
            id: "test-6",
            description: "Should use the && operator for conditional rendering",
            testFunction: `code.includes('&&')`,
          },
        ],
        language: "jsx",
      },
    ],
  },

  // Lesson 9: Rendering Lists
  {
    id: "react-basics-09",
    moduleId: "module-1-1",
    title: "Rendering Lists with map()",
    order: 9,
    xpReward: 150,
    difficulty: "beginner",
    steps: [
      {
        id: "react-basics-09-step-1",
        order: 1,
        instruction: `
# Rendering Lists with map()

To display a list of items in React, use JavaScript's \`.map()\` method to transform an array of data into an array of JSX elements.

\`\`\`jsx
function FruitList() {
  const fruits = ['Apple', 'Banana', 'Orange'];

  return (
    <ul>
      {fruits.map((fruit) => (
        <li key={fruit}>{fruit}</li>
      ))}
    </ul>
  );
}
\`\`\`

**Important:** Each element needs a unique \`key\` prop. Keys help React identify which items have changed, been added, or been removed.

⚠️ **Warning about keys:** When items are unique strings or have IDs, use those as keys. For simple static lists of unique strings, the string itself makes a good key. We'll learn more about proper key usage in the "Lists and Keys" module.

## Your Task

Create a component named \`FruitList\` that renders a list:

1. Destructure \`fruits\` from props (an array of strings)
2. Return a \`<div>\` with className "fruit-list"
3. Inside, include an \`<h2>\` with text "Available Fruits"
4. Use \`.map()\` to create a \`<ul>\` containing an \`<li>\` for each fruit
5. Each \`<li>\` should have a \`key\` prop set to the fruit string itself
6. Display the fruit name in each \`<li>\`
        `,
        hint: "Use fruits.map((fruit) => <li key={fruit}>{fruit}</li>). Wrap the map result with <ul> tags. Use the fruit string itself as the key.",
        starterCode: `import React from 'react';

function FruitList({ fruits }) {
  return (
    <div className="fruit-list">
      <h2>Available Fruits</h2>
      {/* Add your list here */}
    </div>
  );
}

export default FruitList;`,
        solution: `import React from 'react';

function FruitList({ fruits }) {
  return (
    <div className="fruit-list">
      <h2>Available Fruits</h2>
      <ul>
        {fruits.map((fruit) => (
          <li key={fruit}>{fruit}</li>
        ))}
      </ul>
    </div>
  );
}

export default FruitList;`,
        testCases: [
          {
            id: "test-1",
            description: "Should render a div with className 'fruit-list'",
            testFunction: `
              const { container } = render(<FruitList fruits={['Apple', 'Banana']} />);
              container.querySelector('div.fruit-list') !== null
            `,
          },
          {
            id: "test-2",
            description: "Should render an h2 with 'Available Fruits'",
            testFunction: `
              const { getByText } = render(<FruitList fruits={['Apple']} />);
              getByText('Available Fruits') !== null
            `,
          },
          {
            id: "test-3",
            description: "Should render a ul element",
            testFunction: `
              const { container } = render(<FruitList fruits={['Apple']} />);
              container.querySelector('ul') !== null
            `,
          },
          {
            id: "test-4",
            description: "Should render an li for each fruit",
            testFunction: `
              const { container } = render(<FruitList fruits={['Apple', 'Banana', 'Cherry']} />);
              const items = container.querySelectorAll('li');
              items.length === 3
            `,
          },
          {
            id: "test-5",
            description: "Each li should display the fruit name",
            testFunction: `
              const { getByText } = render(<FruitList fruits={['Apple', 'Banana']} />);
              getByText('Apple') !== null && getByText('Banana') !== null
            `,
          },
          {
            id: "test-6",
            description: "Should use .map() and key prop",
            testFunction: `code.includes('.map(') && code.includes('key=')`,
          },
        ],
        language: "jsx",
      },
    ],
  },

  // Lesson 10: Event Handling Basics
  {
    id: "react-basics-10",
    moduleId: "module-1-1",
    title: "Handling Click Events",
    order: 10,
    xpReward: 150,
    difficulty: "beginner",
    steps: [
      {
        id: "react-basics-10-step-1",
        order: 1,
        instruction: `
# Handling Click Events

React handles events using camelCase event handlers like \`onClick\`, \`onChange\`, etc. You pass a function to the event handler.

\`\`\`jsx
function Button() {
  const handleClick = () => {
    alert('Button clicked!');
  };

  return <button onClick={handleClick}>Click me</button>;
}
\`\`\`

**Key points:**
- Use \`onClick\` (not \`onclick\`)
- Pass a function reference, not a function call: \`onClick={handleClick}\` not \`onClick={handleClick()}\`
- You can use arrow functions inline: \`onClick={() => alert('Clicked')}\`

## Your Task

Create a component named \`ClickCounter\` that displays and counts clicks:

1. Inside the component, declare a variable \`count\` with value 0
2. Create a function \`handleClick\` that shows an alert with text "Button clicked!"
3. Return a \`<div>\` with className "click-counter"
4. Include a \`<p>\` showing "Clicks: {count}"
5. Include a \`<button>\` with text "Click Me"
6. The button should call \`handleClick\` when clicked

**Note:** This lesson focuses on event handling. We'll learn how to actually update the count with state in the next module!
        `,
        hint: "Create a function handleClick and pass it to onClick: <button onClick={handleClick}>. Use curly braces to call the function.",
        starterCode: `import React from 'react';

function ClickCounter() {
  const count = 0;

  // Create handleClick function here


  return (
    <div className="click-counter">
      {/* Add your JSX here */}
    </div>
  );
}

export default ClickCounter;`,
        solution: `import React from 'react';

function ClickCounter() {
  const count = 0;

  const handleClick = () => {
    alert('Button clicked!');
  };

  return (
    <div className="click-counter">
      <p>Clicks: {count}</p>
      <button onClick={handleClick}>Click Me</button>
    </div>
  );
}

export default ClickCounter;`,
        testCases: [
          {
            id: "test-1",
            description: "Should declare a count variable with value 0",
            testFunction: `code.includes('count') && code.includes('= 0')`,
          },
          {
            id: "test-2",
            description: "Should create a handleClick function",
            testFunction: `code.includes('handleClick') && (code.includes('function handleClick') || code.includes('const handleClick'))`,
          },
          {
            id: "test-3",
            description: "Should display the count in a paragraph",
            testFunction: `
              const { getByText } = render(<ClickCounter />);
              getByText('Clicks: 0') !== null
            `,
          },
          {
            id: "test-4",
            description: "Should render a button with text 'Click Me'",
            testFunction: `
              const { getByText } = render(<ClickCounter />);
              const button = getByText('Click Me');
              button !== null && button.tagName === 'BUTTON'
            `,
          },
          {
            id: "test-5",
            description: "Button should have onClick handler",
            testFunction: `code.includes('onClick={handleClick}')`,
          },
          {
            id: "test-6",
            description: "handleClick should show an alert",
            testFunction: `code.includes('alert') && code.includes('Button clicked!')`,
          },
        ],
        language: "jsx",
      },
    ],
  },
];
