import { InteractiveLesson } from "@/types";

export const reactBasicsLessons: InteractiveLesson[] = [
  {
    id: "react-intro-1",
    moduleId: "react-module-1",
    title: "Introduction to JSX",
    order: 1,
    xpReward: 50,
    difficulty: "beginner",
    steps: [
      {
        id: "jsx-step-1",
        order: 1,
        instruction: `# Your First JSX Element

JSX is a syntax extension for JavaScript that lets you write HTML-like markup inside a JavaScript file. JSX looks like HTML, but under the hood it's JavaScript.

**Your Task:** Create a \`<h1>\` element with the text "Hello, React!"

**Example:**
\`\`\`jsx
const element = <h1>Hello, World!</h1>;
\`\`\``,
        hint: "JSX elements look just like HTML tags. Don't forget the quotes around the text!",
        starterCode: `// Create an h1 element with the text "Hello, React!"
const element = `,
        solution: `// Create an h1 element with the text "Hello, React!"
const element = <h1>Hello, React!</h1>;`,
        testCases: [
          {
            id: "test-1",
            description: "Element should be an h1 tag",
            testFunction: `() => {
              const match = userCode.match(/<h1>.*<\\/h1>/);
              return match !== null;
            }`,
            errorMessage: "Make sure you're using an <h1> tag",
          },
          {
            id: "test-2",
            description: 'Text content should be "Hello, React!"',
            testFunction: `() => {
              return userCode.includes("Hello, React!");
            }`,
            errorMessage: 'The text should be exactly "Hello, React!"',
          },
        ],
        language: "jsx",
      },
      {
        id: "jsx-step-2",
        order: 2,
        instruction: `# JSX with Multiple Elements

JSX must return a single parent element. If you want to return multiple elements, wrap them in a parent tag like \`<div>\` or use a React Fragment \`<></>\`.

**Your Task:** Create a div that contains an \`<h1>\` with "Welcome" and a \`<p>\` with "Learn React step by step"

**Example:**
\`\`\`jsx
const content = (
  <div>
    <h1>Title</h1>
    <p>Description</p>
  </div>
);
\`\`\``,
        hint: "Remember to wrap both elements in a <div> tag",
        starterCode: `// Create a div with h1 and p tags
const content = `,
        solution: `// Create a div with h1 and p tags
const content = (
  <div>
    <h1>Welcome</h1>
    <p>Learn React step by step</p>
  </div>
);`,
        testCases: [
          {
            id: "test-1",
            description: "Should have a parent div element",
            testFunction: `() => {
              return userCode.includes("<div>") && userCode.includes("</div>");
            }`,
            errorMessage: "Wrap your elements in a <div> tag",
          },
          {
            id: "test-2",
            description: "Should contain an h1 with 'Welcome'",
            testFunction: `() => {
              const match = userCode.match(/<h1>Welcome<\\/h1>/);
              return match !== null;
            }`,
            errorMessage: "Add an <h1> tag with the text 'Welcome'",
          },
          {
            id: "test-3",
            description: "Should contain a p with 'Learn React step by step'",
            testFunction: `() => {
              const match = userCode.match(/<p>Learn React step by step<\\/p>/);
              return match !== null;
            }`,
            errorMessage:
              "Add a <p> tag with the text 'Learn React step by step'",
          },
        ],
        language: "jsx",
      },
      {
        id: "jsx-step-3",
        order: 3,
        instruction: `# JavaScript in JSX

You can embed JavaScript expressions in JSX by wrapping them in curly braces \`{}\`.

**Your Task:** Create a variable \`name\` with your name, then use it inside an \`<h1>\` tag to display "Hello, [your name]!"

**Example:**
\`\`\`jsx
const greeting = "World";
const element = <h1>Hello, {greeting}!</h1>;
\`\`\``,
        hint: "Use curly braces {} to insert the variable inside the JSX",
        starterCode: `// Create a variable and use it in JSX
const name = "Student";
const greeting = `,
        solution: `// Create a variable and use it in JSX
const name = "Student";
const greeting = <h1>Hello, {name}!</h1>;`,
        testCases: [
          {
            id: "test-1",
            description: "Should use the name variable with curly braces",
            testFunction: `() => {
              return userCode.includes("{name}");
            }`,
            errorMessage: "Use {name} to insert the variable in JSX",
          },
          {
            id: "test-2",
            description: "Should have an h1 element",
            testFunction: `() => {
              return userCode.match(/<h1>.*<\\/h1>/) !== null;
            }`,
            errorMessage: "Create an <h1> element",
          },
          {
            id: "test-3",
            description: "Should contain 'Hello,'",
            testFunction: `() => {
              return userCode.includes("Hello,");
            }`,
            errorMessage: "Include 'Hello,' in the greeting",
          },
        ],
        language: "jsx",
      },
    ],
  },
  {
    id: "react-components-1",
    moduleId: "react-module-1",
    title: "Creating React Components",
    order: 2,
    xpReward: 75,
    difficulty: "beginner",
    steps: [
      {
        id: "component-step-1",
        order: 1,
        instruction: `# Your First React Component

A React component is a JavaScript function that returns JSX. Component names must start with a capital letter.

**Your Task:** Create a component called \`Welcome\` that returns an \`<h1>\` with the text "Welcome to React!"

**Example:**
\`\`\`jsx
function Greeting() {
  return <h1>Hello!</h1>;
}
\`\`\``,
        hint: "Component names start with a capital letter. Use the function keyword and return JSX.",
        starterCode: `// Create a Welcome component
`,
        solution: `// Create a Welcome component
function Welcome() {
  return <h1>Welcome to React!</h1>;
}`,
        testCases: [
          {
            id: "test-1",
            description: "Should have a function named Welcome",
            testFunction: `() => {
              return userCode.includes("function Welcome");
            }`,
            errorMessage:
              "Create a function called Welcome (with capital W)",
          },
          {
            id: "test-2",
            description: "Should return JSX",
            testFunction: `() => {
              return userCode.includes("return") && userCode.includes("<h1>");
            }`,
            errorMessage: "Your component should return an <h1> element",
          },
          {
            id: "test-3",
            description: "Should contain the text 'Welcome to React!'",
            testFunction: `() => {
              return userCode.includes("Welcome to React!");
            }`,
            errorMessage: "The h1 should contain 'Welcome to React!'",
          },
        ],
        language: "jsx",
      },
      {
        id: "component-step-2",
        order: 2,
        instruction: `# Arrow Function Components

You can also write components using arrow functions. This is a more modern and concise syntax.

**Your Task:** Create a component called \`Button\` using an arrow function that returns a \`<button>\` with the text "Click me"

**Example:**
\`\`\`jsx
const Card = () => {
  return <div>Card content</div>;
};
\`\`\``,
        hint: "Use const ComponentName = () => { return <button>...</button>; };",
        starterCode: `// Create a Button component using arrow function
`,
        solution: `// Create a Button component using arrow function
const Button = () => {
  return <button>Click me</button>;
};`,
        testCases: [
          {
            id: "test-1",
            description: "Should have a const named Button",
            testFunction: `() => {
              return userCode.includes("const Button");
            }`,
            errorMessage: "Create a const called Button",
          },
          {
            id: "test-2",
            description: "Should use arrow function syntax",
            testFunction: `() => {
              return userCode.includes("=>");
            }`,
            errorMessage: "Use arrow function syntax (=>)",
          },
          {
            id: "test-3",
            description: "Should return a button element",
            testFunction: `() => {
              return (
                userCode.includes("<button>") && userCode.includes("</button>")
              );
            }`,
            errorMessage: "Return a <button> element",
          },
          {
            id: "test-4",
            description: "Button should contain 'Click me'",
            testFunction: `() => {
              return userCode.includes("Click me");
            }`,
            errorMessage: "The button text should be 'Click me'",
          },
        ],
        language: "jsx",
      },
      {
        id: "component-step-3",
        order: 3,
        instruction: `# Composing Components

Components can use other components. This is how you build complex UIs from simple building blocks.

**Your Task:** Create an \`App\` component that returns a \`<div>\` containing an \`<h1>\` with "My App" and a \`<p>\` with "Building with components"

**Example:**
\`\`\`jsx
const Layout = () => {
  return (
    <div>
      <Header />
      <Content />
    </div>
  );
};
\`\`\``,
        hint: "Create a component that returns JSX with both an h1 and p inside a div",
        starterCode: `// Create an App component
const App = () => {
  return (

  );
};`,
        solution: `// Create an App component
const App = () => {
  return (
    <div>
      <h1>My App</h1>
      <p>Building with components</p>
    </div>
  );
};`,
        testCases: [
          {
            id: "test-1",
            description: "Should return a div element",
            testFunction: `() => {
              return userCode.includes("<div>") && userCode.includes("</div>");
            }`,
            errorMessage: "Return a <div> wrapper",
          },
          {
            id: "test-2",
            description: "Should have an h1 with 'My App'",
            testFunction: `() => {
              return userCode.match(/<h1>My App<\\/h1>/) !== null;
            }`,
            errorMessage: "Add an <h1> with the text 'My App'",
          },
          {
            id: "test-3",
            description: "Should have a p with 'Building with components'",
            testFunction: `() => {
              return (
                userCode.match(/<p>Building with components<\\/p>/) !== null
              );
            }`,
            errorMessage: "Add a <p> with the text 'Building with components'",
          },
        ],
        language: "jsx",
      },
    ],
  },
  {
    id: "react-props-1",
    moduleId: "react-module-1",
    title: "Working with Props",
    order: 3,
    xpReward: 100,
    difficulty: "beginner",
    steps: [
      {
        id: "props-step-1",
        order: 1,
        instruction: `# Passing Props to Components

Props are like function parameters. They let you pass data from a parent component to a child component.

**Your Task:** Create a \`Greeting\` component that accepts a \`name\` prop and displays "Hello, [name]!" in an \`<h1>\`

**Example:**
\`\`\`jsx
const Card = (props) => {
  return <div>{props.title}</div>;
};
\`\`\``,
        hint: "Use props.name to access the name property",
        starterCode: `// Create a Greeting component that uses props
const Greeting = (props) => {
  return (

  );
};`,
        solution: `// Create a Greeting component that uses props
const Greeting = (props) => {
  return (
    <h1>Hello, {props.name}!</h1>
  );
};`,
        testCases: [
          {
            id: "test-1",
            description: "Should accept props parameter",
            testFunction: `() => {
              return userCode.includes("(props)");
            }`,
            errorMessage: "Add props as a parameter",
          },
          {
            id: "test-2",
            description: "Should use props.name",
            testFunction: `() => {
              return userCode.includes("props.name");
            }`,
            errorMessage: "Use {props.name} to display the name",
          },
          {
            id: "test-3",
            description: "Should have an h1 element",
            testFunction: `() => {
              return userCode.match(/<h1>.*<\\/h1>/) !== null;
            }`,
            errorMessage: "Return an <h1> element",
          },
          {
            id: "test-4",
            description: "Should include 'Hello,'",
            testFunction: `() => {
              return userCode.includes("Hello,");
            }`,
            errorMessage: "Include 'Hello,' in the greeting",
          },
        ],
        language: "jsx",
      },
      {
        id: "props-step-2",
        order: 2,
        instruction: `# Destructuring Props

Instead of using \`props.name\`, you can destructure props in the function parameter for cleaner code.

**Your Task:** Create a \`UserCard\` component that destructures \`name\` and \`age\` props, then displays them in a div with an h2 for name and a p for age

**Example:**
\`\`\`jsx
const Profile = ({ username, email }) => {
  return (
    <div>
      <p>{username}</p>
      <p>{email}</p>
    </div>
  );
};
\`\`\``,
        hint: "Use { name, age } in the function parameters",
        starterCode: `// Create a UserCard component with destructured props
const UserCard = () => {
  return (

  );
};`,
        solution: `// Create a UserCard component with destructured props
const UserCard = ({ name, age }) => {
  return (
    <div>
      <h2>{name}</h2>
      <p>Age: {age}</p>
    </div>
  );
};`,
        testCases: [
          {
            id: "test-1",
            description: "Should destructure name and age",
            testFunction: `() => {
              return (
                userCode.includes("{ name") && userCode.includes("age }")
              );
            }`,
            errorMessage:
              "Destructure { name, age } in the function parameters",
          },
          {
            id: "test-2",
            description: "Should use {name} variable directly",
            testFunction: `() => {
              return userCode.includes("{name}") && !userCode.includes("props");
            }`,
            errorMessage: "Use {name} directly (not props.name)",
          },
          {
            id: "test-3",
            description: "Should use {age} variable",
            testFunction: `() => {
              return userCode.includes("{age}");
            }`,
            errorMessage: "Display the age using {age}",
          },
          {
            id: "test-4",
            description: "Should have h2 and p elements",
            testFunction: `() => {
              return (
                userCode.includes("<h2>") &&
                userCode.includes("</h2>") &&
                userCode.includes("<p>")
              );
            }`,
            errorMessage: "Use an <h2> for name and <p> for age",
          },
        ],
        language: "jsx",
      },
      {
        id: "props-step-3",
        order: 3,
        instruction: `# Props with Default Values

You can provide default values for props using default parameters in case a prop is not passed.

**Your Task:** Create a \`Button\` component that accepts \`text\` and \`color\` props. Set default values: text="Click me" and color="blue". Display a button with style attribute.

**Example:**
\`\`\`jsx
const Alert = ({ message = "Warning!", type = "info" }) => {
  return <div className={type}>{message}</div>;
};
\`\`\``,
        hint: "Use { text = 'Click me', color = 'blue' } for default values",
        starterCode: `// Create a Button with default props
const Button = () => {
  return (

  );
};`,
        solution: `// Create a Button with default props
const Button = ({ text = "Click me", color = "blue" }) => {
  return (
    <button style={{ backgroundColor: color }}>
      {text}
    </button>
  );
};`,
        testCases: [
          {
            id: "test-1",
            description: "Should have default values for text and color",
            testFunction: `() => {
              return (
                userCode.includes('= "Click me"') &&
                userCode.includes('= "blue"')
              );
            }`,
            errorMessage: "Add default values for text and color props",
          },
          {
            id: "test-2",
            description: "Should use {text} in button",
            testFunction: `() => {
              return userCode.includes("{text}");
            }`,
            errorMessage: "Display {text} inside the button",
          },
          {
            id: "test-3",
            description: "Should use style with backgroundColor",
            testFunction: `() => {
              return (
                userCode.includes("style") &&
                userCode.includes("backgroundColor")
              );
            }`,
            errorMessage: "Add a style prop with backgroundColor: color",
          },
          {
            id: "test-4",
            description: "Should return a button element",
            testFunction: `() => {
              return (
                userCode.includes("<button") && userCode.includes("</button>")
              );
            }`,
            errorMessage: "Return a <button> element",
          },
        ],
        language: "jsx",
      },
    ],
  },
  {
    id: "react-state-1",
    moduleId: "react-module-2",
    title: "Introduction to State with useState",
    order: 4,
    xpReward: 150,
    difficulty: "intermediate",
    steps: [
      {
        id: "state-step-1",
        order: 1,
        instruction: `# Your First useState Hook

State lets a component "remember" information and update the UI when that information changes. The \`useState\` hook is how you add state to functional components.

**Your Task:** Create a \`Counter\` component that uses useState to manage a count. Initialize count to 0.

**Example:**
\`\`\`jsx
import { useState } from 'react';

const Toggle = () => {
  const [isOn, setIsOn] = useState(false);
  return <div>{isOn ? 'ON' : 'OFF'}</div>;
};
\`\`\``,
        hint: "Use const [count, setCount] = useState(0);",
        starterCode: `import { useState } from 'react';

// Create a Counter component with state
const Counter = () => {


  return (
    <div>
      <p>Count: {count}</p>
    </div>
  );
};`,
        solution: `import { useState } from 'react';

// Create a Counter component with state
const Counter = () => {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Count: {count}</p>
    </div>
  );
};`,
        testCases: [
          {
            id: "test-1",
            description: "Should import useState",
            testFunction: `() => {
              return userCode.includes("import") && userCode.includes("useState");
            }`,
            errorMessage: "Import useState from 'react'",
          },
          {
            id: "test-2",
            description: "Should call useState(0)",
            testFunction: `() => {
              return userCode.includes("useState(0)");
            }`,
            errorMessage: "Call useState with initial value 0",
          },
          {
            id: "test-3",
            description: "Should destructure [count, setCount]",
            testFunction: `() => {
              return (
                userCode.includes("[count") && userCode.includes("setCount]")
              );
            }`,
            errorMessage: "Destructure [count, setCount] from useState",
          },
          {
            id: "test-4",
            description: "Should display {count} in JSX",
            testFunction: `() => {
              return userCode.includes("{count}");
            }`,
            errorMessage: "Display {count} in your JSX",
          },
        ],
        language: "jsx",
      },
      {
        id: "state-step-2",
        order: 2,
        instruction: `# Updating State

To update state, you call the setter function returned by useState. Never modify state directly!

**Your Task:** Add a button that calls \`setCount\` to increment the count by 1 when clicked.

**Example:**
\`\`\`jsx
<button onClick={() => setValue(value + 1)}>
  Increment
</button>
\`\`\``,
        hint: "Use onClick={() => setCount(count + 1)}",
        starterCode: `import { useState } from 'react';

const Counter = () => {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Count: {count}</p>
      {/* Add a button here */}
    </div>
  );
};`,
        solution: `import { useState } from 'react';

const Counter = () => {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  );
};`,
        testCases: [
          {
            id: "test-1",
            description: "Should have a button element",
            testFunction: `() => {
              return (
                userCode.includes("<button") && userCode.includes("</button>")
              );
            }`,
            errorMessage: "Add a <button> element",
          },
          {
            id: "test-2",
            description: "Button should have onClick handler",
            testFunction: `() => {
              return userCode.includes("onClick");
            }`,
            errorMessage: "Add an onClick handler to the button",
          },
          {
            id: "test-3",
            description: "Should call setCount in onClick",
            testFunction: `() => {
              return userCode.includes("setCount");
            }`,
            errorMessage: "Call setCount in the onClick handler",
          },
          {
            id: "test-4",
            description: "Should increment count by 1",
            testFunction: `() => {
              return (
                userCode.includes("count + 1") ||
                userCode.includes("count+1") ||
                userCode.includes("count++")
              );
            }`,
            errorMessage: "Increment count by 1 (count + 1)",
          },
        ],
        language: "jsx",
      },
      {
        id: "state-step-3",
        order: 3,
        instruction: `# Multiple State Variables

You can use useState multiple times in a component to track different pieces of state.

**Your Task:** Create a \`Form\` component with two state variables: \`name\` (string) and \`age\` (number). Display both values.

**Example:**
\`\`\`jsx
const [firstName, setFirstName] = useState('');
const [lastName, setLastName] = useState('');
\`\`\``,
        hint: "Call useState twice with different variable names",
        starterCode: `import { useState } from 'react';

const Form = () => {
  // Add two useState hooks here


  return (
    <div>
      <p>Name: {name}</p>
      <p>Age: {age}</p>
    </div>
  );
};`,
        solution: `import { useState } from 'react';

const Form = () => {
  const [name, setName] = useState('');
  const [age, setAge] = useState(0);

  return (
    <div>
      <p>Name: {name}</p>
      <p>Age: {age}</p>
    </div>
  );
};`,
        testCases: [
          {
            id: "test-1",
            description: "Should have name state variable",
            testFunction: `() => {
              return (
                userCode.includes("[name") && userCode.includes("setName]")
              );
            }`,
            errorMessage: "Create a [name, setName] state variable",
          },
          {
            id: "test-2",
            description: "Should have age state variable",
            testFunction: `() => {
              return userCode.includes("[age") && userCode.includes("setAge]");
            }`,
            errorMessage: "Create an [age, setAge] state variable",
          },
          {
            id: "test-3",
            description: "Name should be initialized to empty string",
            testFunction: `() => {
              return (
                userCode.includes("useState('')") ||
                userCode.includes('useState("")')
              );
            }`,
            errorMessage: "Initialize name with an empty string",
          },
          {
            id: "test-4",
            description: "Age should be initialized to 0",
            testFunction: `() => {
              const matches = userCode.match(/useState\(0\)/g);
              return matches && matches.length >= 1;
            }`,
            errorMessage: "Initialize age with 0",
          },
        ],
        language: "jsx",
      },
    ],
  },
];
