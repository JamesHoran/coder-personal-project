/**
 * React Course - Phase 3: Expert Mastery
 * Module 3.2: TypeScript with React (12 lessons)
 *
 * This module covers TypeScript integration with React including typing props,
 * state, events, refs, context, hooks, and advanced TypeScript patterns.
 */

import { InteractiveLesson } from "@/types";

export const typescriptReactLessons: InteractiveLesson[] = [
  // Lesson 1: TypeScript Basics in React
  {
    id: "typescript-react-01",
    moduleId: "module-3-2",
    title: "TypeScript Basics in React",
    order: 123,
    xpReward: 250,
    difficulty: "advanced",
    steps: [
      {
        id: "typescript-react-01-step-1",
        order: 1,
        instruction: `
# TypeScript Basics in React

TypeScript adds static typing to React, providing better autocomplete, error detection, and documentation. With TypeScript, you can catch errors at compile-time rather than runtime.

**Basic TypeScript React Component:**
\`\`\`tsx
import React from 'react';

function Greeting(): JSX.Element {
  const name: string = "Alice";
  const age: number = 30;

  return (
    <div>
      <h1>Hello, {name}</h1>
      <p>Age: {age}</p>
    </div>
  );
}

export default Greeting;
\`\`\`

**Key Concepts:**
- Use \`.tsx\` extension for TypeScript React files (not \`.ts\`)
- Function components can specify return type \`JSX.Element\` or \`React.ReactElement\`
- TypeScript infers types, but you can be explicit: \`const name: string = "Alice"\`
- Modern React doesn't require importing React in every file, but typing does

## Your Task

Create a TypeScript React component named \`UserProfile\` that:
1. Has explicit return type annotation \`JSX.Element\`
2. Declares a typed constant \`userName: string\` with value "John Doe"
3. Declares a typed constant \`userAge: number\` with value 28
4. Declares a typed constant \`isActive: boolean\` with value true
5. Returns a \`<div>\` containing:
   - An \`<h2>\` with the userName
   - A \`<p>\` with text "Age: {userAge}"
   - A \`<p>\` with text "Status: {isActive ? 'Active' : 'Inactive'}"
        `,
        hint: "Use explicit type annotations for all constants: const name: type = value. Don't forget the return type JSX.Element for the function.",
        starterCode: `import React from 'react';

function UserProfile() {
  // Declare typed constants here


  return (
    // Your JSX here
  );
}

export default UserProfile;`,
        solution: `import React from 'react';

function UserProfile(): JSX.Element {
  const userName: string = "John Doe";
  const userAge: number = 28;
  const isActive: boolean = true;

  return (
    <div>
      <h2>{userName}</h2>
      <p>Age: {userAge}</p>
      <p>Status: {isActive ? 'Active' : 'Inactive'}</p>
    </div>
  );
}

export default UserProfile;`,
        testCases: [
          {
            id: "test-1",
            description: "Function should have explicit return type JSX.Element",
            testFunction: `code.includes('): JSX.Element')`,
          },
          {
            id: "test-2",
            description: "Should declare userName with string type",
            testFunction: `code.includes('userName: string') && code.includes('"John Doe"')`,
          },
          {
            id: "test-3",
            description: "Should declare userAge with number type",
            testFunction: `code.includes('userAge: number') && code.includes('28')`,
          },
          {
            id: "test-4",
            description: "Should declare isActive with boolean type",
            testFunction: `code.includes('isActive: boolean') && code.includes('true')`,
          },
          {
            id: "test-5",
            description: "Should render the user information correctly",
            testFunction: `
              const { getByText } = render(<UserProfile />);
              getByText('John Doe') !== null &&
              getByText('Age: 28') !== null &&
              getByText('Status: Active') !== null
            `,
          },
        ],
        language: "tsx",
      },
    ],
  },

  // Lesson 2: Typing Props
  {
    id: "typescript-react-02",
    moduleId: "module-3-2",
    title: "Typing Props",
    order: 124,
    xpReward: 300,
    difficulty: "advanced",
    steps: [
      {
        id: "typescript-react-02-step-1",
        order: 1,
        instruction: `
# Typing Props

Props typing is fundamental to TypeScript React. It ensures components receive the correct data types and provides excellent IntelliSense support.

**Basic Props Typing:**
\`\`\`tsx
interface GreetingProps {
  name: string;
  age: number;
  email?: string; // Optional prop
}

function Greeting({ name, age, email }: GreetingProps): JSX.Element {
  return (
    <div>
      <h1>Hello, {name}</h1>
      <p>Age: {age}</p>
      {email && <p>Email: {email}</p>}
    </div>
  );
}
\`\`\`

**Type vs Interface:**
Both work for props, but interfaces are more conventional:
\`\`\`tsx
// Interface (recommended for props)
interface ButtonProps {
  label: string;
  onClick: () => void;
}

// Type (also valid)
type ButtonProps = {
  label: string;
  onClick: () => void;
}
\`\`\`

**Key Points:**
- Use \`interface\` or \`type\` to define props shape
- Optional props use \`?\` after the property name
- Destructure props with type annotation: \`({ name, age }: PropsType)\`
- Default values can be provided: \`{ name = "Guest" }: Props\`

## Your Task

Create a component \`ProductCard\` with properly typed props:

1. Define an interface \`ProductCardProps\` with:
   - \`title: string\`
   - \`price: number\`
   - \`inStock: boolean\`
   - \`description?: string\` (optional)
2. Component should destructure typed props
3. Return a \`<div>\` with className "product-card" containing:
   - \`<h3>\` with title
   - \`<p>\` with "Price: $" followed by price
   - \`<p>\` with "Status: " followed by "In Stock" or "Out of Stock"
   - Conditionally render description in \`<p>\` if provided
        `,
        hint: "Define the interface above the component. Use { prop1, prop2 }: InterfaceName in the function parameter.",
        starterCode: `import React from 'react';

// Define ProductCardProps interface here


function ProductCard(/* Add typed props here */) {
  return (
    // Your JSX here
  );
}

export default ProductCard;`,
        solution: `import React from 'react';

interface ProductCardProps {
  title: string;
  price: number;
  inStock: boolean;
  description?: string;
}

function ProductCard({ title, price, inStock, description }: ProductCardProps): JSX.Element {
  return (
    <div className="product-card">
      <h3>{title}</h3>
      <p>Price: {price}</p>
      <p>Status: {inStock ? 'In Stock' : 'Out of Stock'}</p>
      {description && <p>{description}</p>}
    </div>
  );
}

export default ProductCard;`,
        testCases: [
          {
            id: "test-1",
            description: "Should define ProductCardProps interface",
            testFunction: `code.includes('interface ProductCardProps')`,
          },
          {
            id: "test-2",
            description: "Interface should have required properties",
            testFunction: `code.includes('title: string') && code.includes('price: number') && code.includes('inStock: boolean')`,
          },
          {
            id: "test-3",
            description: "Interface should have optional description",
            testFunction: `code.includes('description?: string')`,
          },
          {
            id: "test-4",
            description: "Component should use typed props",
            testFunction: `code.includes('}: ProductCardProps')`,
          },
          {
            id: "test-5",
            description: "Should render product information correctly",
            testFunction: `
              const { getByText } = render(
                <ProductCard title="Laptop" price={999} inStock={true} />
              );
              getByText('Laptop') !== null &&
              getByText('Price: $999') !== null &&
              getByText('Status: In Stock') !== null
            `,
          },
          {
            id: "test-6",
            description: "Should conditionally render optional description",
            testFunction: `
              const { getByText, queryByText } = render(
                <ProductCard title="Phone" price={599} inStock={true} description="Great phone!" />
              );
              getByText('Great phone!') !== null
            `,
          },
        ],
        language: "tsx",
      },
    ],
  },

  // Lesson 3: Typing State
  {
    id: "typescript-react-03",
    moduleId: "module-3-2",
    title: "Typing State",
    order: 125,
    xpReward: 300,
    difficulty: "advanced",
    steps: [
      {
        id: "typescript-react-03-step-1",
        order: 1,
        instruction: `
# Typing State

TypeScript can usually infer state types, but explicit typing is important for complex state or when the initial value is null/undefined.

**Simple State (Type Inference):**
\`\`\`tsx
function Counter() {
  // TypeScript infers count is number
  const [count, setCount] = useState(0);

  return <button onClick={() => setCount(count + 1)}>{count}</button>;
}
\`\`\`

**Explicit State Typing:**
\`\`\`tsx
function UserForm() {
  // Explicit type when starting with empty string
  const [name, setName] = useState<string>("");

  // Union type for status
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  // Object state with interface
  interface User {
    name: string;
    email: string;
  }
  const [user, setUser] = useState<User | null>(null);

  return <div>{name}</div>;
}
\`\`\`

**When to Use Explicit Types:**
- Initial value is \`null\` or \`undefined\`
- Union types (multiple possible types)
- Complex objects or arrays
- When TypeScript can't infer correctly

## Your Task

Create a \`TodoManager\` component with typed state:

1. Define an interface \`Todo\` with:
   - \`id: number\`
   - \`text: string\`
   - \`completed: boolean\`
2. Use \`useState\` with explicit type \`Todo[]\` for todos (initialize with empty array)
3. Use \`useState\` for \`inputValue: string\` (initialize with empty string)
4. Return a \`<div>\` containing:
   - \`<input>\` with value bound to inputValue
   - \`<p>\` showing "Total todos: {todos.length}"
   - \`<p>\` showing "Input length: {inputValue.length}"
        `,
        hint: "Use useState<Type> for explicit typing. For arrays: useState<Todo[]>([]), for strings: useState<string>('').",
        starterCode: `import React, { useState } from 'react';

// Define Todo interface here


function TodoManager(): JSX.Element {
  // Add typed state here


  return (
    <div>
      {/* Your JSX here */}
    </div>
  );
}

export default TodoManager;`,
        solution: `import React, { useState } from 'react';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

function TodoManager(): JSX.Element {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputValue, setInputValue] = useState<string>("");

  return (
    <div>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <p>Total todos: {todos.length}</p>
      <p>Input length: {inputValue.length}</p>
    </div>
  );
}

export default TodoManager;`,
        testCases: [
          {
            id: "test-1",
            description: "Should define Todo interface with correct properties",
            testFunction: `code.includes('interface Todo') && code.includes('id: number') && code.includes('text: string') && code.includes('completed: boolean')`,
          },
          {
            id: "test-2",
            description: "Should use typed state for todos array",
            testFunction: `code.includes('useState<Todo[]>([])') || code.includes('useState<Todo[]>([ ])') || code.includes('useState<Array<Todo>>')`,
          },
          {
            id: "test-3",
            description: "Should use typed state for inputValue",
            testFunction: `code.includes('useState<string>("")') || code.includes("useState<string>('')")`,
          },
          {
            id: "test-4",
            description: "Should render input with bound value",
            testFunction: `
              const { container } = render(<TodoManager />);
              const input = container.querySelector('input');
              input !== null && input.value === ''
            `,
          },
          {
            id: "test-5",
            description: "Should display total todos count",
            testFunction: `
              const { getByText } = render(<TodoManager />);
              getByText('Total todos: 0') !== null
            `,
          },
          {
            id: "test-6",
            description: "Should display input length",
            testFunction: `
              const { getByText } = render(<TodoManager />);
              getByText('Input length: 0') !== null
            `,
          },
        ],
        language: "tsx",
      },
    ],
  },

  // Lesson 4: Typing Events
  {
    id: "typescript-react-04",
    moduleId: "module-3-2",
    title: "Typing Events",
    order: 126,
    xpReward: 350,
    difficulty: "advanced",
    steps: [
      {
        id: "typescript-react-04-step-1",
        order: 1,
        instruction: `
# Typing Events

Event handlers in TypeScript React require specific event types. Using the correct types gives you access to event properties and methods.

**Common Event Types:**
\`\`\`tsx
import React, { ChangeEvent, MouseEvent, FormEvent } from 'react';

function EventExample() {
  // Click events
  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    console.log('Button clicked', e.currentTarget);
  };

  // Input change events
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log('Input value:', e.target.value);
  };

  // Form submit events
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Form submitted');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input onChange={handleChange} />
      <button onClick={handleClick}>Submit</button>
    </form>
  );
}
\`\`\`

**Generic Event Types:**
- \`MouseEvent<HTMLElement>\` - Click events (button, div, etc.)
- \`ChangeEvent<HTMLInputElement>\` - Input/textarea change
- \`ChangeEvent<HTMLSelectElement>\` - Select change
- \`FormEvent<HTMLFormElement>\` - Form submission
- \`KeyboardEvent<HTMLInputElement>\` - Keyboard events
- \`FocusEvent<HTMLInputElement>\` - Focus/blur events

**Inline vs Named Handlers:**
\`\`\`tsx
// Inline (type inferred)
<button onClick={(e) => console.log(e)}>Click</button>

// Named (explicit type)
const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
  console.log(e);
};
<button onClick={handleClick}>Click</button>
\`\`\`

## Your Task

Create a \`FormComponent\` with properly typed event handlers:

1. Import necessary event types from React
2. Use \`useState\` for \`name: string\` and \`email: string\`
3. Create \`handleNameChange\` with type \`ChangeEvent<HTMLInputElement>\`
4. Create \`handleEmailChange\` with type \`ChangeEvent<HTMLInputElement>\`
5. Create \`handleSubmit\` with type \`FormEvent<HTMLFormElement>\` that prevents default
6. Return a \`<form>\` with onSubmit handler containing:
   - Input for name with onChange handler
   - Input for email with onChange handler
   - Button with text "Submit"
   - \`<p>\` showing "Name: {name}, Email: {email}"
        `,
        hint: "Import { ChangeEvent, FormEvent } from 'react'. Type handlers as: (e: EventType) => void",
        starterCode: `import React, { useState } from 'react';
// Import event types here

function FormComponent(): JSX.Element {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  // Create typed event handlers here




  return (
    <form>
      {/* Your form JSX here */}
    </form>
  );
}

export default FormComponent;`,
        solution: `import React, { useState, ChangeEvent, FormEvent } from 'react';

function FormComponent(): JSX.Element {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setName(e.target.value);
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={name}
        onChange={handleNameChange}
        placeholder="Name"
      />
      <input
        type="email"
        value={email}
        onChange={handleEmailChange}
        placeholder="Email"
      />
      <button type="submit">Submit</button>
      <p>Name: {name}, Email: {email}</p>
    </form>
  );
}

export default FormComponent;`,
        testCases: [
          {
            id: "test-1",
            description: "Should import ChangeEvent and FormEvent",
            testFunction: `code.includes('ChangeEvent') && code.includes('FormEvent')`,
          },
          {
            id: "test-2",
            description: "handleNameChange should have correct event type",
            testFunction: `code.includes('ChangeEvent<HTMLInputElement>') && code.includes('handleNameChange')`,
          },
          {
            id: "test-3",
            description: "handleEmailChange should have correct event type",
            testFunction: `code.includes('ChangeEvent<HTMLInputElement>') && code.includes('handleEmailChange')`,
          },
          {
            id: "test-4",
            description: "handleSubmit should have correct event type",
            testFunction: `code.includes('FormEvent<HTMLFormElement>') && code.includes('handleSubmit')`,
          },
          {
            id: "test-5",
            description: "handleSubmit should prevent default",
            testFunction: `code.includes('e.preventDefault()') || code.includes('event.preventDefault()')`,
          },
          {
            id: "test-6",
            description: "Should render form with inputs and display values",
            testFunction: `
              const { container, getByText } = render(<FormComponent />);
              const inputs = container.querySelectorAll('input');
              const button = container.querySelector('button');
              inputs.length === 2 && button !== null && getByText(/Name:.*Email:/) !== null
            `,
          },
        ],
        language: "tsx",
      },
    ],
  },

  // Lesson 5: Typing Refs
  {
    id: "typescript-react-05",
    moduleId: "module-3-2",
    title: "Typing Refs",
    order: 127,
    xpReward: 350,
    difficulty: "advanced",
    steps: [
      {
        id: "typescript-react-05-step-1",
        order: 1,
        instruction: `
# Typing Refs

Refs in TypeScript need explicit types to access DOM element properties and methods safely.

**Basic Ref Typing:**
\`\`\`tsx
import React, { useRef } from 'react';

function InputFocus() {
  // Type the ref with the HTML element type
  const inputRef = useRef<HTMLInputElement>(null);

  const focusInput = () => {
    // TypeScript knows inputRef.current could be null
    inputRef.current?.focus();
  };

  return (
    <div>
      <input ref={inputRef} />
      <button onClick={focusInput}>Focus Input</button>
    </div>
  );
}
\`\`\`

**Common Ref Types:**
\`\`\`tsx
const inputRef = useRef<HTMLInputElement>(null);
const buttonRef = useRef<HTMLButtonElement>(null);
const divRef = useRef<HTMLDivElement>(null);
const videoRef = useRef<HTMLVideoElement>(null);
const canvasRef = useRef<HTMLCanvasElement>(null);
\`\`\`

**Non-null Ref (when you know it exists):**
\`\`\`tsx
// Use ! to assert non-null (be careful!)
inputRef.current!.focus();

// Better: Use optional chaining
inputRef.current?.focus();
\`\`\`

**Refs for Custom Values:**
\`\`\`tsx
// Ref to store a mutable value (not DOM)
const countRef = useRef<number>(0);
const timerRef = useRef<NodeJS.Timeout | null>(null);
\`\`\`

**Key Points:**
- Always initialize with \`null\`: \`useRef<Type>(null)\`
- Use optional chaining: \`ref.current?.method()\`
- Type matches the HTML element: \`HTMLInputElement\`, \`HTMLDivElement\`, etc.
- Non-DOM refs use the value type: \`useRef<number>(0)\`

## Your Task

Create a \`VideoPlayer\` component with typed refs:

1. Import \`useRef\` from React
2. Create \`videoRef\` typed as \`HTMLVideoElement\` (initialize with null)
3. Create \`playCount\` ref typed as \`number\` (initialize with 0)
4. Create \`handlePlay\` function that:
   - Uses optional chaining to call \`videoRef.current?.play()\`
   - Increments playCount.current
5. Create \`handlePause\` function that calls \`videoRef.current?.pause()\`
6. Return a \`<div>\` containing:
   - \`<video>\` element with ref={videoRef} and src="/video.mp4"
   - Button "Play" with onClick={handlePlay}
   - Button "Pause" with onClick={handlePause}
   - \`<p>\` showing "Play count: {playCount.current}"
        `,
        hint: "Use useRef<HTMLVideoElement>(null) and useRef<number>(0). Access ref with ref.current and use optional chaining ?. for DOM methods.",
        starterCode: `import React, { useRef } from 'react';

function VideoPlayer(): JSX.Element {
  // Create typed refs here



  // Create handler functions here




  return (
    <div>
      {/* Your JSX here */}
    </div>
  );
}

export default VideoPlayer;`,
        solution: `import React, { useRef } from 'react';

function VideoPlayer(): JSX.Element {
  const videoRef = useRef<HTMLVideoElement>(null);
  const playCount = useRef<number>(0);

  const handlePlay = (): void => {
    videoRef.current?.play();
    playCount.current += 1;
  };

  const handlePause = (): void => {
    videoRef.current?.pause();
  };

  return (
    <div>
      <video ref={videoRef} src="/video.mp4" />
      <button onClick={handlePlay}>Play</button>
      <button onClick={handlePause}>Pause</button>
      <p>Play count: {playCount.current}</p>
    </div>
  );
}

export default VideoPlayer;`,
        testCases: [
          {
            id: "test-1",
            description: "Should create videoRef with HTMLVideoElement type",
            testFunction: `code.includes('useRef<HTMLVideoElement>(null)')`,
          },
          {
            id: "test-2",
            description: "Should create playCount ref with number type",
            testFunction: `code.includes('useRef<number>(0)')`,
          },
          {
            id: "test-3",
            description: "handlePlay should use optional chaining for play()",
            testFunction: `code.includes('videoRef.current?.play()') || code.includes('videoRef.current && videoRef.current.play()')`,
          },
          {
            id: "test-4",
            description: "handlePlay should increment playCount",
            testFunction: `code.includes('playCount.current') && (code.includes('+=') || code.includes('++') || code.includes('= playCount.current + 1'))`,
          },
          {
            id: "test-5",
            description: "handlePause should use optional chaining for pause()",
            testFunction: `code.includes('videoRef.current?.pause()') || code.includes('videoRef.current && videoRef.current.pause()')`,
          },
          {
            id: "test-6",
            description: "Should render video element with ref",
            testFunction: `
              const { container } = render(<VideoPlayer />);
              const video = container.querySelector('video');
              video !== null && code.includes('ref={videoRef}')
            `,
          },
          {
            id: "test-7",
            description: "Should render Play and Pause buttons",
            testFunction: `
              const { getByText } = render(<VideoPlayer />);
              getByText('Play') !== null && getByText('Pause') !== null
            `,
          },
        ],
        language: "tsx",
      },
    ],
  },

  // Lesson 6: Generic Components
  {
    id: "typescript-react-06",
    moduleId: "module-3-2",
    title: "Generic Components",
    order: 128,
    xpReward: 400,
    difficulty: "advanced",
    steps: [
      {
        id: "typescript-react-06-step-1",
        order: 1,
        instruction: `
# Generic Components

Generic components allow you to create reusable components that work with different data types while maintaining type safety.

**Basic Generic Component:**
\`\`\`tsx
interface ListProps<T> {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
}

function List<T extends { id: string | number }>(
  { items, renderItem }: ListProps<T>
): JSX.Element {
  return (
    <ul>
      {items.map((item) => (
        <li key={item.id}>{renderItem(item)}</li>
      ))}
    </ul>
  );
}

// Usage with different types
<List items={[1, 2, 3]} renderItem={(num) => <span>{num}</span>} />
<List items={['a', 'b']} renderItem={(str) => <span>{str}</span>} />
\`\`\`

**Generic with Constraints:**
\`\`\`tsx
interface Item {
  id: number;
  name: string;
}

// T must have an 'id' property
interface SelectProps<T extends { id: number }> {
  items: T[];
  selectedId: number;
  onSelect: (item: T) => void;
}

function Select<T extends { id: number }>({
  items,
  selectedId,
  onSelect
}: SelectProps<T>): JSX.Element {
  return (
    <select onChange={(e) => {
      const item = items.find(i => i.id === Number(e.target.value));
      if (item) onSelect(item);
    }}>
      {items.map(item => (
        <option key={item.id} value={item.id}>
          {item.id}
        </option>
      ))}
    </select>
  );
}
\`\`\`

**Benefits:**
- Single component works with multiple types
- Full type safety and autocomplete
- Reduces code duplication
- Catches type errors at compile time

## Your Task

Create a generic \`Table\` component:

1. Define interface \`TableProps<T>\` with:
   - \`data: T[]\` (array of generic type)
   - \`columns: Array<{ key: keyof T; label: string }>\`
   - \`renderCell: (item: T, key: keyof T) => React.ReactNode\`
2. Create function \`Table<T>\` that accepts \`TableProps<T>\`
3. Return a \`<table>\` with:
   - \`<thead>\` with \`<tr>\` containing \`<th>\` for each column label
   - \`<tbody>\` with \`<tr>\` for each data item
   - Each row has \`<td>\` for each column, calling renderCell
4. Use item index as key for rows
        `,
        hint: "Generic syntax: function Name<T>(props: Props<T>). Use keyof T for object keys. Map over both columns and data arrays.",
        starterCode: `import React from 'react';

// Define TableProps interface here


function Table<T>(/* Add typed props here */): JSX.Element {
  return (
    <table>
      {/* Your table structure here */}
    </table>
  );
}

export default Table;`,
        solution: `import React from 'react';

interface TableProps<T> {
  data: T[];
  columns: Array<{ id: string; key: keyof T; label: string }>;
  renderCell: (item: T, key: keyof T) => React.ReactNode;
}

function Table<T>({ data, columns, renderCell }: TableProps<T>): JSX.Element {
  return (
    <table>
      <thead>
        <tr>
          {columns.map((column) => (
            <th key={column.id}>{column.label}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((item, rowIndex) => (
          <tr key={rowIndex}>
            {columns.map((column, colIndex) => (
              <td key={colIndex}>{renderCell(item, column.key)}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Table;`,
        testCases: [
          {
            id: "test-1",
            description: "Should define TableProps interface with generic type",
            testFunction: `code.includes('interface TableProps<T>') || code.includes('type TableProps<T>')`,
          },
          {
            id: "test-2",
            description: "TableProps should have data array of generic type",
            testFunction: `code.includes('data: T[]')`,
          },
          {
            id: "test-3",
            description: "TableProps should have columns with keyof T",
            testFunction: `code.includes('keyof T')`,
          },
          {
            id: "test-4",
            description: "TableProps should have renderCell function",
            testFunction: `code.includes('renderCell') && code.includes('React.ReactNode')`,
          },
          {
            id: "test-5",
            description: "Table function should be generic",
            testFunction: `code.includes('function Table<T>') || code.includes('const Table = <T')`,
          },
          {
            id: "test-6",
            description: "Should render table with thead and tbody",
            testFunction: `
              const data = [{ id: 1, name: 'Test' }];
              const columns = [{ key: 'id', label: 'ID' }, { key: 'name', label: 'Name' }];
              const renderCell = (item: any, key: any) => item[key];
              const { container } = render(
                <Table data={data} columns={columns} renderCell={renderCell} />
              );
              container.querySelector('thead') !== null && container.querySelector('tbody') !== null
            `,
          },
        ],
        language: "tsx",
      },
    ],
  },

  // Lesson 7: Typing Context
  {
    id: "typescript-react-07",
    moduleId: "module-3-2",
    title: "Typing Context",
    order: 129,
    xpReward: 350,
    difficulty: "advanced",
    steps: [
      {
        id: "typescript-react-07-step-1",
        order: 1,
        instruction: `
# Typing Context

Context in TypeScript requires careful typing to ensure type safety across your component tree.

**Basic Context Typing:**
\`\`\`tsx
import React, { createContext, useContext, useState } from 'react';

// Define context type
interface ThemeContextType {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

// Create context with type (initially undefined)
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Provider component
function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// Custom hook for using context
function useTheme(): ThemeContextType {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
}
\`\`\`

**Key Patterns:**
1. Define interface for context value
2. Create context with type \`Type | undefined\`
3. Provider component wraps children
4. Custom hook checks for undefined and throws error
5. This ensures components can't use context outside provider

**Benefits:**
- Type safety for context values
- Autocomplete for context properties
- Runtime error if context used incorrectly
- Clear API for context consumers

## Your Task

Create a typed \`UserContext\`:

1. Define interface \`User\` with \`id: number\` and \`name: string\`
2. Define interface \`UserContextType\` with:
   - \`user: User | null\`
   - \`setUser: (user: User | null) => void\`
3. Create \`UserContext\` with type \`UserContextType | undefined\` (initially undefined)
4. Create \`UserProvider\` component that:
   - Accepts \`children: React.ReactNode\` prop
   - Uses useState for user state (initially null)
   - Provides context value with user and setUser
5. Create \`useUser\` hook that:
   - Uses useContext
   - Throws error with message "useUser must be used within UserProvider" if undefined
   - Returns the context
        `,
        hint: "Pattern: createContext<Type | undefined>(undefined). Check if context is undefined in the hook and throw an error.",
        starterCode: `import React, { createContext, useContext, useState } from 'react';

// Define User interface


// Define UserContextType interface


// Create context


// Create provider component


// Create custom hook


export { UserProvider, useUser };`,
        solution: `import React, { createContext, useContext, useState } from 'react';

interface User {
  id: number;
  name: string;
}

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

function UserProvider({ children }: { children: React.ReactNode }): JSX.Element {
  const [user, setUser] = useState<User | null>(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

function useUser(): UserContextType {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within UserProvider');
  }
  return context;
}

export { UserProvider, useUser };`,
        testCases: [
          {
            id: "test-1",
            description: "Should define User interface",
            testFunction: `code.includes('interface User') && code.includes('id: number') && code.includes('name: string')`,
          },
          {
            id: "test-2",
            description: "Should define UserContextType interface",
            testFunction: `code.includes('interface UserContextType') && code.includes('user: User | null') && code.includes('setUser')`,
          },
          {
            id: "test-3",
            description: "Should create context with correct type",
            testFunction: `code.includes('createContext<UserContextType | undefined>(undefined)')`,
          },
          {
            id: "test-4",
            description: "UserProvider should accept children prop",
            testFunction: `code.includes('children: React.ReactNode') && code.includes('UserProvider')`,
          },
          {
            id: "test-5",
            description: "UserProvider should use useState for user",
            testFunction: `code.includes('useState<User | null>(null)')`,
          },
          {
            id: "test-6",
            description: "useUser hook should check for undefined context",
            testFunction: `code.includes('if (!context)') || code.includes('if (context === undefined)')`,
          },
          {
            id: "test-7",
            description: "useUser should throw error with correct message",
            testFunction: `code.includes('throw new Error') && code.includes('useUser must be used within UserProvider')`,
          },
        ],
        language: "tsx",
      },
    ],
  },

  // Lesson 8: Typing Custom Hooks
  {
    id: "typescript-react-08",
    moduleId: "module-3-2",
    title: "Typing Custom Hooks",
    order: 130,
    xpReward: 350,
    difficulty: "advanced",
    steps: [
      {
        id: "typescript-react-08-step-1",
        order: 1,
        instruction: `
# Typing Custom Hooks

Custom hooks in TypeScript follow the same patterns as components - you define parameter types and return types.

**Simple Custom Hook:**
\`\`\`tsx
import { useState } from 'react';

function useToggle(initialValue: boolean = false): [boolean, () => void] {
  const [value, setValue] = useState<boolean>(initialValue);

  const toggle = (): void => {
    setValue(prev => !prev);
  };

  return [value, toggle];
}

// Usage
const [isOpen, toggleOpen] = useToggle(false);
\`\`\`

**Hook with Generic Type:**
\`\`\`tsx
function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T) => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : initialValue;
  });

  const setValue = (value: T): void => {
    setStoredValue(value);
    window.localStorage.setItem(key, JSON.stringify(value));
  };

  return [storedValue, setValue];
}

// Usage with type inference
const [name, setName] = useLocalStorage<string>('name', 'Guest');
\`\`\`

**Hook Returning Object:**
\`\`\`tsx
interface UseCounterReturn {
  count: number;
  increment: () => void;
  decrement: () => void;
  reset: () => void;
}

function useCounter(initialValue: number = 0): UseCounterReturn {
  const [count, setCount] = useState<number>(initialValue);

  return {
    count,
    increment: () => setCount(c => c + 1),
    decrement: () => setCount(c => c - 1),
    reset: () => setCount(initialValue)
  };
}
\`\`\`

## Your Task

Create a custom \`useFetch\` hook with TypeScript:

1. Define interface \`UseFetchReturn<T>\` with:
   - \`data: T | null\`
   - \`loading: boolean\`
   - \`error: string | null\`
2. Create function \`useFetch<T>\` that:
   - Takes parameter \`url: string\`
   - Returns \`UseFetchReturn<T>\`
   - Uses useState for data (typed \`T | null\`, initially null)
   - Uses useState for loading (initially true)
   - Uses useState for error (initially null)
3. For this exercise, just initialize the states (don't implement fetching logic)
4. Return an object with data, loading, and error
        `,
        hint: "Generic hook: function useName<T>(params): ReturnType. Use useState<T | null>(null) for nullable generic state.",
        starterCode: `import { useState } from 'react';

// Define UseFetchReturn interface


function useFetch<T>(url: string): /* Add return type */ {
  // Initialize typed state variables



  // Return object
}

export default useFetch;`,
        solution: `import { useState } from 'react';

interface UseFetchReturn<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

function useFetch<T>(url: string): UseFetchReturn<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  return {
    data,
    loading,
    error
  };
}

export default useFetch;`,
        testCases: [
          {
            id: "test-1",
            description: "Should define UseFetchReturn interface with generic type",
            testFunction: `code.includes('interface UseFetchReturn<T>') || code.includes('type UseFetchReturn<T>')`,
          },
          {
            id: "test-2",
            description: "UseFetchReturn should have all required properties",
            testFunction: `code.includes('data: T | null') && code.includes('loading: boolean') && code.includes('error: string | null')`,
          },
          {
            id: "test-3",
            description: "useFetch should be a generic function",
            testFunction: `code.includes('function useFetch<T>') || code.includes('const useFetch = <T')`,
          },
          {
            id: "test-4",
            description: "useFetch should accept url parameter",
            testFunction: `code.includes('url: string')`,
          },
          {
            id: "test-5",
            description: "useFetch should have correct return type",
            testFunction: `code.includes(': UseFetchReturn<T>')`,
          },
          {
            id: "test-6",
            description: "Should initialize data state with correct type",
            testFunction: `code.includes('useState<T | null>(null)') && code.includes('data')`,
          },
          {
            id: "test-7",
            description: "Should initialize loading state",
            testFunction: `code.includes('useState<boolean>(true)') || code.includes('useState(true)') && code.includes('loading')`,
          },
          {
            id: "test-8",
            description: "Should return object with data, loading, and error",
            testFunction: `code.includes('return') && code.includes('data') && code.includes('loading') && code.includes('error')`,
          },
        ],
        language: "tsx",
      },
    ],
  },

  // Lesson 9: Utility Types
  {
    id: "typescript-react-09",
    moduleId: "module-3-2",
    title: "Utility Types",
    order: 131,
    xpReward: 400,
    difficulty: "advanced",
    steps: [
      {
        id: "typescript-react-09-step-1",
        order: 1,
        instruction: `
# Utility Types

TypeScript provides built-in utility types that help transform and manipulate types. These are extremely useful in React applications.

**Common Utility Types:**

\`\`\`tsx
interface User {
  id: number;
  name: string;
  email: string;
  age: number;
}

// Partial<T> - Makes all properties optional
type PartialUser = Partial<User>;
// { id?: number; name?: string; email?: string; age?: number; }

// Required<T> - Makes all properties required
type RequiredUser = Required<PartialUser>;

// Readonly<T> - Makes all properties readonly
type ReadonlyUser = Readonly<User>;

// Pick<T, K> - Pick specific properties
type UserPreview = Pick<User, 'id' | 'name'>;
// { id: number; name: string; }

// Omit<T, K> - Omit specific properties
type UserWithoutEmail = Omit<User, 'email'>;
// { id: number; name: string; age: number; }

// Record<K, T> - Object with keys K and values T
type UserRoles = Record<string, 'admin' | 'user' | 'guest'>;
// { [key: string]: 'admin' | 'user' | 'guest' }
\`\`\`

**React-Specific Utility Types:**

\`\`\`tsx
// React.ComponentProps - Extract props from component
type ButtonProps = React.ComponentProps<'button'>;

// React.ReactNode - Any renderable content
type Children = React.ReactNode;

// React.FC - Function component type (less common now)
const Component: React.FC<{ name: string }> = ({ name }) => <div>{name}</div>;
\`\`\`

**Practical Examples:**

\`\`\`tsx
interface Todo {
  id: number;
  title: string;
  completed: boolean;
  createdAt: Date;
}

// Form only needs title
type CreateTodoForm = Pick<Todo, 'title'>;

// Update can partial any field except id
type UpdateTodoForm = Partial<Omit<Todo, 'id'>>;

// Read-only for display
type TodoDisplay = Readonly<Todo>;
\`\`\`

## Your Task

Create type definitions using utility types:

1. Define interface \`Product\` with:
   - \`id: number\`
   - \`name: string\`
   - \`price: number\`
   - \`description: string\`
   - \`inStock: boolean\`

2. Create type aliases using utility types:
   - \`PartialProduct\` using Partial<Product>
   - \`ProductPreview\` using Pick<Product, 'id' | 'name' | 'price'>
   - \`ProductForm\` using Omit<Product, 'id'>
   - \`ReadonlyProduct\` using Readonly<Product>

3. Create a component \`ProductEditor\` that:
   - Accepts props typed as \`ProductForm\`
   - Returns a \`<div>\` displaying all the form fields
        `,
        hint: "Utility types: Partial<T>, Pick<T, 'key1' | 'key2'>, Omit<T, 'key'>, Readonly<T>. Define types with 'type Name = Utility<Interface>'.",
        starterCode: `import React from 'react';

// Define Product interface


// Create utility type aliases





function ProductEditor(/* Add typed props */): JSX.Element {
  return (
    <div>
      {/* Display the product form fields */}
    </div>
  );
}

export default ProductEditor;`,
        solution: `import React from 'react';

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  inStock: boolean;
}

type PartialProduct = Partial<Product>;
type ProductPreview = Pick<Product, 'id' | 'name' | 'price'>;
type ProductForm = Omit<Product, 'id'>;
type ReadonlyProduct = Readonly<Product>;

function ProductEditor({ name, price, description, inStock }: ProductForm): JSX.Element {
  return (
    <div>
      <p>Name: {name}</p>
      <p>Price: {price}</p>
      <p>Description: {description}</p>
      <p>In Stock: {inStock ? 'Yes' : 'No'}</p>
    </div>
  );
}

export default ProductEditor;`,
        testCases: [
          {
            id: "test-1",
            description: "Should define Product interface with all properties",
            testFunction: `code.includes('interface Product') && code.includes('id: number') && code.includes('name: string') && code.includes('price: number') && code.includes('description: string') && code.includes('inStock: boolean')`,
          },
          {
            id: "test-2",
            description: "Should define PartialProduct using Partial",
            testFunction: `code.includes('type PartialProduct = Partial<Product>')`,
          },
          {
            id: "test-3",
            description: "Should define ProductPreview using Pick",
            testFunction: `code.includes('type ProductPreview = Pick<Product') && code.includes("'id'") && code.includes("'name'") && code.includes("'price'")`,
          },
          {
            id: "test-4",
            description: "Should define ProductForm using Omit",
            testFunction: `code.includes('type ProductForm = Omit<Product') && code.includes("'id'")`,
          },
          {
            id: "test-5",
            description: "Should define ReadonlyProduct using Readonly",
            testFunction: `code.includes('type ReadonlyProduct = Readonly<Product>')`,
          },
          {
            id: "test-6",
            description: "ProductEditor should use ProductForm type for props",
            testFunction: `code.includes('}: ProductForm') || code.includes('props: ProductForm')`,
          },
          {
            id: "test-7",
            description: "ProductEditor should display all form fields",
            testFunction: `
              const props = { name: 'Test', price: 100, description: 'Desc', inStock: true };
              const { getByText } = render(<ProductEditor {...props} />);
              getByText(/Name: Test/) !== null &&
              getByText(/Price: \\$100/) !== null
            `,
          },
        ],
        language: "tsx",
      },
    ],
  },

  // Lesson 10: Type Guards
  {
    id: "typescript-react-10",
    moduleId: "module-3-2",
    title: "Type Guards",
    order: 132,
    xpReward: 400,
    difficulty: "advanced",
    steps: [
      {
        id: "typescript-react-10-step-1",
        order: 1,
        instruction: `
# Type Guards

Type guards help TypeScript narrow down types at runtime, ensuring type safety when working with union types or unknown data.

**Built-in Type Guards:**

\`\`\`tsx
// typeof guard
function processValue(value: string | number) {
  if (typeof value === 'string') {
    // TypeScript knows value is string here
    return value.toUpperCase();
  }
  // TypeScript knows value is number here
  return value.toFixed(2);
}

// instanceof guard
function handleError(error: Error | string) {
  if (error instanceof Error) {
    console.log(error.message);
  } else {
    console.log(error);
  }
}

// in operator guard
interface User {
  name: string;
  email: string;
}

interface Admin {
  name: string;
  permissions: string[];
}

function greet(person: User | Admin) {
  if ('email' in person) {
    console.log(\`Email: \${person.email}\`);
  } else {
    console.log(\`Permissions: \${person.permissions}\`);
  }
}
\`\`\`

**Custom Type Guards:**

\`\`\`tsx
// User-defined type guard with 'is' keyword
interface Dog {
  bark: () => void;
}

interface Cat {
  meow: () => void;
}

function isDog(pet: Dog | Cat): pet is Dog {
  return (pet as Dog).bark !== undefined;
}

function handlePet(pet: Dog | Cat) {
  if (isDog(pet)) {
    pet.bark(); // TypeScript knows it's a Dog
  } else {
    pet.meow(); // TypeScript knows it's a Cat
  }
}
\`\`\`

**Type Guards in React:**

\`\`\`tsx
interface TextMessage {
  type: 'text';
  content: string;
}

interface ImageMessage {
  type: 'image';
  url: string;
  alt: string;
}

type Message = TextMessage | ImageMessage;

function isTextMessage(msg: Message): msg is TextMessage {
  return msg.type === 'text';
}

function MessageDisplay({ message }: { message: Message }) {
  if (isTextMessage(message)) {
    return <p>{message.content}</p>;
  }
  return <img src={message.url} alt={message.alt} />;
}
\`\`\`

## Your Task

Create type guards and a component that uses them:

1. Define interface \`SuccessResponse\` with:
   - \`status: 'success'\`
   - \`data: string\`

2. Define interface \`ErrorResponse\` with:
   - \`status: 'error'\`
   - \`message: string\`

3. Create type \`ApiResponse = SuccessResponse | ErrorResponse\`

4. Create type guard function \`isSuccessResponse\` that:
   - Takes parameter \`response: ApiResponse\`
   - Returns \`response is SuccessResponse\`
   - Checks if status is 'success'

5. Create component \`ResponseDisplay\` that:
   - Accepts prop \`response: ApiResponse\`
   - Uses type guard to check response type
   - If success: returns \`<div className="success">\` with "Success: {data}"
   - If error: returns \`<div className="error">\` with "Error: {message}"
        `,
        hint: "Type guard: function isType(param: Union): param is SpecificType { return condition; }. Use it in if statement to narrow type.",
        starterCode: `import React from 'react';

// Define interfaces



// Create union type


// Create type guard function


function ResponseDisplay(/* Add typed prop */): JSX.Element {
  // Use type guard here

}

export default ResponseDisplay;`,
        solution: `import React from 'react';

interface SuccessResponse {
  status: 'success';
  data: string;
}

interface ErrorResponse {
  status: 'error';
  message: string;
}

type ApiResponse = SuccessResponse | ErrorResponse;

function isSuccessResponse(response: ApiResponse): response is SuccessResponse {
  return response.status === 'success';
}

function ResponseDisplay({ response }: { response: ApiResponse }): JSX.Element {
  if (isSuccessResponse(response)) {
    return <div className="success">Success: {response.data}</div>;
  }
  return <div className="error">Error: {response.message}</div>;
}

export default ResponseDisplay;`,
        testCases: [
          {
            id: "test-1",
            description: "Should define SuccessResponse interface",
            testFunction: `code.includes('interface SuccessResponse') && code.includes("status: 'success'") && code.includes('data: string')`,
          },
          {
            id: "test-2",
            description: "Should define ErrorResponse interface",
            testFunction: `code.includes('interface ErrorResponse') && code.includes("status: 'error'") && code.includes('message: string')`,
          },
          {
            id: "test-3",
            description: "Should create ApiResponse union type",
            testFunction: `code.includes('type ApiResponse = SuccessResponse | ErrorResponse')`,
          },
          {
            id: "test-4",
            description: "Should create type guard function",
            testFunction: `code.includes('function isSuccessResponse') && code.includes('response is SuccessResponse')`,
          },
          {
            id: "test-5",
            description: "Type guard should check status",
            testFunction: `code.includes("response.status === 'success'")`,
          },
          {
            id: "test-6",
            description: "Component should render success response correctly",
            testFunction: `
              const successResponse = { status: 'success' as const, data: 'Test data' };
              const { container, getByText } = render(<ResponseDisplay response={successResponse} />);
              container.querySelector('.success') !== null && getByText(/Success: Test data/) !== null
            `,
          },
          {
            id: "test-7",
            description: "Component should render error response correctly",
            testFunction: `
              const errorResponse = { status: 'error' as const, message: 'Test error' };
              const { container, getByText } = render(<ResponseDisplay response={errorResponse} />);
              container.querySelector('.error') !== null && getByText(/Error: Test error/) !== null
            `,
          },
        ],
        language: "tsx",
      },
    ],
  },

  // Lesson 11: Advanced Types
  {
    id: "typescript-react-11",
    moduleId: "module-3-2",
    title: "Advanced Types",
    order: 133,
    xpReward: 400,
    difficulty: "advanced",
    steps: [
      {
        id: "typescript-react-11-step-1",
        order: 1,
        instruction: `
# Advanced Types

Advanced TypeScript features enable sophisticated type checking and code reuse patterns in React applications.

**Discriminated Unions:**
\`\`\`tsx
type Shape =
  | { kind: 'circle'; radius: number }
  | { kind: 'rectangle'; width: number; height: number }
  | { kind: 'square'; size: number };

function getArea(shape: Shape): number {
  switch (shape.kind) {
    case 'circle':
      return Math.PI * shape.radius ** 2;
    case 'rectangle':
      return shape.width * shape.height;
    case 'square':
      return shape.size ** 2;
  }
}
\`\`\`

**Mapped Types:**
\`\`\`tsx
type Readonly<T> = {
  readonly [P in keyof T]: T[P];
};

type Optional<T> = {
  [P in keyof T]?: T[P];
};

interface User {
  id: number;
  name: string;
}

type ReadonlyUser = Readonly<User>;
type PartialUser = Optional<User>;
\`\`\`

**Conditional Types:**
\`\`\`tsx
type IsString<T> = T extends string ? true : false;

type A = IsString<string>; // true
type B = IsString<number>; // false

// Practical example
type NonNullable<T> = T extends null | undefined ? never : T;
type Result = NonNullable<string | null>; // string
\`\`\`

**Template Literal Types:**
\`\`\`tsx
type EventName = 'click' | 'focus' | 'blur';
type EventHandler = \`on\${Capitalize<EventName>}\`;
// 'onClick' | 'onFocus' | 'onBlur'

interface Events {
  onClick: () => void;
  onFocus: () => void;
  onBlur: () => void;
}
\`\`\`

**Index Signatures with Template Literals:**
\`\`\`tsx
type DataAttributes = {
  [key: \`data-\${string}\`]: string;
};

const attrs: DataAttributes = {
  'data-testid': 'my-component',
  'data-name': 'test'
};
\`\`\`

## Your Task

Create advanced type definitions:

1. Define discriminated union \`Action\`:
   - Type with \`type: 'increment'\` (no payload)
   - Type with \`type: 'decrement'\` (no payload)
   - Type with \`type: 'set'\` and \`payload: number\`
   - Type with \`type: 'reset'\` (no payload)

2. Create type \`ActionHandlers\` as a mapped type:
   - Keys are each action type
   - Values are functions taking the action and returning void
   - Use: \`{ [K in Action['type']]: (action: Extract<Action, { type: K }>) => void }\`

3. Create component \`Counter\` that:
   - Uses \`useState<number>(0)\` for count
   - Has a reducer-like function that takes action parameter typed as \`Action\`
   - Returns \`<div>\` with:
     - \`<p>\` showing "Count: {count}"
     - Button "Increment"
     - Button "Reset"
        `,
        hint: "Discriminated union uses | to combine types with a common property. Use Extract<Union, { type: K }> to get specific type from union.",
        starterCode: `import React, { useState } from 'react';

// Define Action discriminated union type




// Define ActionHandlers mapped type (optional for this exercise)


function Counter(): JSX.Element {
  const [count, setCount] = useState<number>(0);

  // Create function that handles actions
  const dispatch = (action: Action): void => {
    switch (action.type) {
      case 'increment':
        setCount(c => c + 1);
        break;
      case 'decrement':
        setCount(c => c - 1);
        break;
      case 'set':
        setCount(action.payload);
        break;
      case 'reset':
        setCount(0);
        break;
    }
  };

  return (
    <div>
      {/* Your JSX here */}
    </div>
  );
}

export default Counter;`,
        solution: `import React, { useState } from 'react';

type Action =
  | { type: 'increment' }
  | { type: 'decrement' }
  | { type: 'set'; payload: number }
  | { type: 'reset' };

type ActionHandlers = {
  [K in Action['type']]: (action: Extract<Action, { type: K }>) => void;
};

function Counter(): JSX.Element {
  const [count, setCount] = useState<number>(0);

  const dispatch = (action: Action): void => {
    switch (action.type) {
      case 'increment':
        setCount(c => c + 1);
        break;
      case 'decrement':
        setCount(c => c - 1);
        break;
      case 'set':
        setCount(action.payload);
        break;
      case 'reset':
        setCount(0);
        break;
    }
  };

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => dispatch({ type: 'increment' })}>Increment</button>
      <button onClick={() => dispatch({ type: 'reset' })}>Reset</button>
    </div>
  );
}

export default Counter;`,
        testCases: [
          {
            id: "test-1",
            description: "Should define Action as discriminated union",
            testFunction: `code.includes('type Action') && code.includes("type: 'increment'") && code.includes("type: 'decrement'") && code.includes("type: 'set'") && code.includes("type: 'reset'")`,
          },
          {
            id: "test-2",
            description: "Set action should have payload",
            testFunction: `code.includes("type: 'set'") && code.includes('payload: number')`,
          },
          {
            id: "test-3",
            description: "Should use union type with |",
            testFunction: `code.match(/type Action[^=]*=[^;]*\|/s) !== null`,
          },
          {
            id: "test-4",
            description: "dispatch function should accept Action type",
            testFunction: `code.includes('action: Action') && code.includes('dispatch')`,
          },
          {
            id: "test-5",
            description: "Should use switch statement with action.type",
            testFunction: `code.includes('switch') && code.includes('action.type')`,
          },
          {
            id: "test-6",
            description: "Should render count and buttons",
            testFunction: `
              const { getByText } = render(<Counter />);
              getByText('Count: 0') !== null &&
              getByText('Increment') !== null &&
              getByText('Reset') !== null
            `,
          },
        ],
        language: "tsx",
      },
    ],
  },

  // Lesson 12: TypeScript Best Practices
  {
    id: "typescript-react-12",
    moduleId: "module-3-2",
    title: "TypeScript Best Practices",
    order: 134,
    xpReward: 300,
    difficulty: "advanced",
    steps: [
      {
        id: "typescript-react-12-step-1",
        order: 1,
        instruction: `
# TypeScript Best Practices

Following best practices ensures maintainable, type-safe React applications.

**1. Prefer Interfaces for Props:**
\`\`\`tsx
// ✅ Good
interface ButtonProps {
  label: string;
  onClick: () => void;
}

// ❌ Avoid (type works but interface is more conventional)
type ButtonProps = {
  label: string;
  onClick: () => void;
}
\`\`\`

**2. Use Type for Unions and Complex Types:**
\`\`\`tsx
// ✅ Good
type Status = 'idle' | 'loading' | 'success' | 'error';
type Theme = 'light' | 'dark';
type Result<T> = { success: true; data: T } | { success: false; error: string };
\`\`\`

**3. Leverage Type Inference:**
\`\`\`tsx
// ✅ Good - TypeScript infers the type
const [count, setCount] = useState(0);

// ❌ Unnecessary
const [count, setCount] = useState<number>(0);

// ✅ Good - Explicit when needed
const [user, setUser] = useState<User | null>(null);
\`\`\`

**4. Avoid 'any' Type:**
\`\`\`tsx
// ❌ Bad - Loses type safety
function process(data: any) {
  return data.value;
}

// ✅ Good - Use unknown and type guards
function process(data: unknown) {
  if (typeof data === 'object' && data !== null && 'value' in data) {
    return (data as { value: string }).value;
  }
}
\`\`\`

**5. Use Const Assertions:**
\`\`\`tsx
// ❌ Type is string
const action = 'INCREMENT';

// ✅ Type is literal 'INCREMENT'
const action = 'INCREMENT' as const;

// ✅ For objects
const config = {
  apiUrl: 'https://api.example.com',
  timeout: 5000
} as const;
\`\`\`

**6. Properly Type Event Handlers:**
\`\`\`tsx
// ✅ Good
const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
  console.log(e.currentTarget);
};

// ❌ Avoid
const handleClick = (e: any) => {
  console.log(e.currentTarget);
};
\`\`\`

**7. Use Non-null Assertion Carefully:**
\`\`\`tsx
// ❌ Risky - assumes ref is always populated
inputRef.current!.focus();

// ✅ Better - Safe with optional chaining
inputRef.current?.focus();
\`\`\`

**8. Export Types for Reusability:**
\`\`\`tsx
// types.ts
export interface User {
  id: number;
  name: string;
}

export type UserStatus = 'active' | 'inactive';

// component.tsx
import { User, UserStatus } from './types';
\`\`\`

## Your Task

Refactor a component to follow TypeScript best practices:

1. Define interface \`UserCardProps\` with:
   - \`user: { id: number; name: string; status: 'active' | 'inactive' }\`
   - \`onEdit: (userId: number) => void\`

2. Define type \`UserStatus = 'active' | 'inactive'\`

3. Create component \`UserCard\` that:
   - Uses the interface for props
   - Destructures props properly
   - Returns a \`<div>\` with className "user-card" containing:
     - \`<h3>\` with user.name
     - \`<p>\` with "ID: {user.id}"
     - \`<p>\` with "Status: {user.status}"
     - \`<button>\` with onClick handler that calls onEdit(user.id)

4. Follow best practices:
   - Use interface for props
   - Use type for the union
   - Let TypeScript infer what it can
   - Properly type event handlers
        `,
        hint: "Define interface for props, type for union. Destructure props in function parameters. Use proper event types for handlers.",
        starterCode: `import React from 'react';

// Define UserStatus type


// Define UserCardProps interface


function UserCard(/* Add typed props */): JSX.Element {
  // Add proper implementation

}

export default UserCard;`,
        solution: `import React, { MouseEvent } from 'react';

type UserStatus = 'active' | 'inactive';

interface UserCardProps {
  user: {
    id: number;
    name: string;
    status: UserStatus;
  };
  onEdit: (userId: number) => void;
}

function UserCard({ user, onEdit }: UserCardProps): JSX.Element {
  const handleEdit = (e: MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    onEdit(user.id);
  };

  return (
    <div className="user-card">
      <h3>{user.name}</h3>
      <p>ID: {user.id}</p>
      <p>Status: {user.status}</p>
      <button onClick={handleEdit}>Edit</button>
    </div>
  );
}

export default UserCard;`,
        testCases: [
          {
            id: "test-1",
            description: "Should define UserStatus as union type",
            testFunction: `code.includes('type UserStatus') && code.includes("'active'") && code.includes("'inactive'")`,
          },
          {
            id: "test-2",
            description: "Should define UserCardProps as interface",
            testFunction: `code.includes('interface UserCardProps')`,
          },
          {
            id: "test-3",
            description: "UserCardProps should have user object",
            testFunction: `code.includes('user:') && code.includes('id: number') && code.includes('name: string')`,
          },
          {
            id: "test-4",
            description: "UserCardProps should have onEdit function",
            testFunction: `code.includes('onEdit:') && code.includes('userId: number') && code.includes('=> void')`,
          },
          {
            id: "test-5",
            description: "Component should destructure props",
            testFunction: `code.includes('{ user, onEdit }') && code.includes('}: UserCardProps')`,
          },
          {
            id: "test-6",
            description: "Should render user information correctly",
            testFunction: `
              const user = { id: 1, name: 'John Doe', status: 'active' as const };
              const onEdit = jest.fn();
              const { getByText } = render(<UserCard user={user} onEdit={onEdit} />);
              getByText('John Doe') !== null &&
              getByText('ID: 1') !== null &&
              getByText('Status: active') !== null
            `,
          },
          {
            id: "test-7",
            description: "Button should call onEdit with user id",
            testFunction: `
              const user = { id: 42, name: 'Test', status: 'active' as const };
              const onEdit = jest.fn();
              const { getByText } = render(<UserCard user={user} onEdit={onEdit} />);
              const button = getByText('Edit');
              button.click();
              onEdit.mock.calls[0][0] === 42
            `,
          },
        ],
        language: "tsx",
      },
    ],
  },
];
