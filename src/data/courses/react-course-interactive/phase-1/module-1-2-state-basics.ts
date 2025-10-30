/**
 * React Course - Phase 1: Novice Foundations
 * Module 1.2: State Basics (10 lessons)
 *
 * This module introduces state management in React using the useState hook.
 * Students learn how to declare, update, and manage state for primitives,
 * objects, and arrays.
 */

import { InteractiveLesson } from "@/types";

export const stateBasicsLessons: InteractiveLesson[] = [
  // Lesson 1: Introduction to useState
  {
    id: "state-basics-01",
    moduleId: "module-1-2",
    title: "Introduction to useState",
    order: 1,
    xpReward: 100,
    difficulty: "beginner",
    steps: [
      {
        id: "state-basics-01-step-1",
        order: 1,
        instruction: `
# Introduction to useState

In React, **state** is data that can change over time. When state changes, React automatically re-renders your component to reflect the new data.

The \`useState\` hook allows functional components to have state:

\`\`\`jsx
import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return <p>Count: {count}</p>;
}
\`\`\`

**What's happening here:**
- \`useState(0)\` creates a state variable with an initial value of 0
- It returns an array with two items:
  - \`count\`: the current state value
  - \`setCount\`: a function to update the state
- We use array destructuring to get both values

**Why use state?**
- To store data that changes over time
- To make your UI interactive
- To trigger re-renders when data changes

## Your Task

Create a component named \`WelcomeMessage\` that uses state:
1. Import \`useState\` from 'react'
2. Inside the component, use \`useState\` to create a state variable \`message\` with initial value \`"Hello, React!"\`
3. Return a \`<div>\` with className "welcome"
4. Display the \`message\` state inside an \`<h1>\` element
        `,
        hint: "Use array destructuring: const [message, setMessage] = useState('Hello, React!'). Remember to import useState from 'react'.",
        starterCode: `import React from 'react';
// Import useState here


function WelcomeMessage() {
  // Create state variable here


  return (
    <div className="welcome">
      {/* Display message here */}
    </div>
  );
}

export default WelcomeMessage;`,
        solution: `import React from 'react';
import { useState } from 'react';

function WelcomeMessage() {
  const [message, setMessage] = useState("Hello, React!");

  return (
    <div className="welcome">
      <h1>{message}</h1>
    </div>
  );
}

export default WelcomeMessage;`,
        testCases: [
          {
            id: "test-1",
            description: "Should import useState from 'react'",
            testFunction: `code.includes('import') && code.includes('useState') && code.includes('react')`,
          },
          {
            id: "test-2",
            description: "Should use useState to create a message state",
            testFunction: `code.includes('useState') && code.includes('"Hello, React!"')`,
          },
          {
            id: "test-3",
            description: "Should use array destructuring for state",
            testFunction: `code.includes('const [message') && code.includes('setMessage]')`,
          },
          {
            id: "test-4",
            description: "Should render the message in an h1 element",
            testFunction: `
              const { getByText } = render(<WelcomeMessage />);
              getByText('Hello, React!') !== null
            `,
          },
          {
            id: "test-5",
            description: "Should have a div with className 'welcome'",
            testFunction: `
              const { container } = render(<WelcomeMessage />);
              container.querySelector('div.welcome') !== null
            `,
          },
        ],
        language: "jsx",
      },
    ],
  },

  // Lesson 2: Declaring State
  {
    id: "state-basics-02",
    moduleId: "module-1-2",
    title: "Declaring State",
    order: 2,
    xpReward: 100,
    difficulty: "beginner",
    steps: [
      {
        id: "state-basics-02-step-1",
        order: 1,
        instruction: `
# Declaring State

State can hold different types of values: numbers, strings, booleans, objects, and arrays. The initial value you pass to \`useState\` determines what type of data the state will hold.

\`\`\`jsx
// Number state
const [count, setCount] = useState(0);

// String state
const [name, setName] = useState("Alice");

// Boolean state
const [isActive, setIsActive] = useState(true);
\`\`\`

**Best Practices:**
- Choose descriptive names for your state variables
- The setter function name should be "set" + the state variable name (camelCase)
- Initialize state with a sensible default value

## Your Task

Create a component named \`UserStatus\` that declares multiple state variables:

1. A \`name\` state initialized with \`"Guest"\`
2. An \`age\` state initialized with \`0\`
3. An \`isOnline\` state initialized with \`false\`
4. Return a \`<div>\` with className "user-status" containing:
   - A \`<p>\` showing "Name: {name}"
   - A \`<p>\` showing "Age: {age}"
   - A \`<p>\` showing "Status: {isOnline ? 'Online' : 'Offline'}"
        `,
        hint: "Create three separate useState calls. Use ternary operator for the status text.",
        starterCode: `import React from 'react';
import { useState } from 'react';

function UserStatus() {
  // Declare your state variables here




  return (
    <div className="user-status">
      {/* Display the state values here */}
    </div>
  );
}

export default UserStatus;`,
        solution: `import React from 'react';
import { useState } from 'react';

function UserStatus() {
  const [name, setName] = useState("Guest");
  const [age, setAge] = useState(0);
  const [isOnline, setIsOnline] = useState(false);

  return (
    <div className="user-status">
      <p>Name: {name}</p>
      <p>Age: {age}</p>
      <p>Status: {isOnline ? 'Online' : 'Offline'}</p>
    </div>
  );
}

export default UserStatus;`,
        testCases: [
          {
            id: "test-1",
            description: "Should declare a name state with initial value 'Guest'",
            testFunction: `code.includes('[name') && code.includes('setName]') && code.includes('"Guest"')`,
          },
          {
            id: "test-2",
            description: "Should declare an age state with initial value 0",
            testFunction: `code.includes('[age') && code.includes('setAge]') && code.includes('useState(0)')`,
          },
          {
            id: "test-3",
            description: "Should declare an isOnline state with initial value false",
            testFunction: `code.includes('[isOnline') && code.includes('setIsOnline]') && code.includes('useState(false)')`,
          },
          {
            id: "test-4",
            description: "Should display 'Name: Guest'",
            testFunction: `
              const { getByText } = render(<UserStatus />);
              getByText('Name: Guest') !== null
            `,
          },
          {
            id: "test-5",
            description: "Should display 'Age: 0'",
            testFunction: `
              const { getByText } = render(<UserStatus />);
              getByText('Age: 0') !== null
            `,
          },
          {
            id: "test-6",
            description: "Should display 'Status: Offline' when isOnline is false",
            testFunction: `
              const { getByText } = render(<UserStatus />);
              getByText('Status: Offline') !== null
            `,
          },
        ],
        language: "jsx",
      },
    ],
  },

  // Lesson 3: Updating State
  {
    id: "state-basics-03",
    moduleId: "module-1-2",
    title: "Updating State",
    order: 3,
    xpReward: 125,
    difficulty: "beginner",
    steps: [
      {
        id: "state-basics-03-step-1",
        order: 1,
        instruction: `
# Updating State

To change state, you call the setter function that \`useState\` provides. When you update state, React re-renders your component with the new value.

\`\`\`jsx
function Counter() {
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount(count + 1);
  };

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>Increment</button>
    </div>
  );
}
\`\`\`

**Important:**
- Never modify state directly: \`count = count + 1\` ❌
- Always use the setter function: \`setCount(count + 1)\` ✅
- State updates trigger a re-render

## Your Task

Create a component named \`LikeButton\` that updates state when clicked:

1. Create a \`likes\` state initialized to \`0\`
2. Create a function \`handleLike\` that increments likes by 1
3. Return a \`<div>\` with className "like-button"
4. Display a \`<p>\` showing "Likes: {likes}"
5. Add a \`<button>\` with text "Like" that calls \`handleLike\` when clicked
        `,
        hint: "In handleLike, use setLikes(likes + 1) to increment the count. Connect the button with onClick={handleLike}.",
        starterCode: `import React from 'react';
import { useState } from 'react';

function LikeButton() {
  // Create state here


  // Create handleLike function here


  return (
    <div className="like-button">
      {/* Display likes and button here */}
    </div>
  );
}

export default LikeButton;`,
        solution: `import React from 'react';
import { useState } from 'react';

function LikeButton() {
  const [likes, setLikes] = useState(0);

  const handleLike = () => {
    setLikes(likes + 1);
  };

  return (
    <div className="like-button">
      <p>Likes: {likes}</p>
      <button onClick={handleLike}>Like</button>
    </div>
  );
}

export default LikeButton;`,
        testCases: [
          {
            id: "test-1",
            description: "Should create a likes state initialized to 0",
            testFunction: `code.includes('[likes') && code.includes('setLikes]') && code.includes('useState(0)')`,
          },
          {
            id: "test-2",
            description: "Should display 'Likes: 0' initially",
            testFunction: `
              const { getByText } = render(<LikeButton />);
              getByText('Likes: 0') !== null
            `,
          },
          {
            id: "test-3",
            description: "Should have a button with text 'Like'",
            testFunction: `
              const { getByText } = render(<LikeButton />);
              const button = getByText('Like');
              button !== null && button.tagName === 'BUTTON'
            `,
          },
          {
            id: "test-4",
            description: "Should create a handleLike function",
            testFunction: `code.includes('handleLike') && (code.includes('function handleLike') || code.includes('const handleLike'))`,
          },
          {
            id: "test-5",
            description: "Button should call handleLike on click",
            testFunction: `code.includes('onClick={handleLike}')`,
          },
          {
            id: "test-6",
            description: "handleLike should update likes state",
            testFunction: `
              // Accept both direct update and functional update patterns
              const hasSetLikes = code.includes('setLikes');
              const hasIncrement = code.match(/setLikes\\s*\\(\\s*(likes\\s*\\+\\s*1|prev\\s*=>\\s*prev\\s*\\+\\s*1)/);
              return hasSetLikes && hasIncrement !== null;
            `,
          },
        ],
        language: "jsx",
      },
    ],
  },

  // Lesson 4: Multiple State Variables
  {
    id: "state-basics-04",
    moduleId: "module-1-2",
    title: "Multiple State Variables",
    order: 4,
    xpReward: 125,
    difficulty: "beginner",
    steps: [
      {
        id: "state-basics-04-step-1",
        order: 1,
        instruction: `
# Multiple State Variables

Components can have multiple independent state variables. Each state variable has its own setter function and updates independently.

\`\`\`jsx
function Form() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState(0);

  // Each state updates independently
  const updateName = () => setName("Alice");
  const updateEmail = () => setEmail("alice@example.com");
  const updateAge = () => setAge(25);

  return (
    <div>
      <p>{name} - {email} - {age}</p>
    </div>
  );
}
\`\`\`

**When to use multiple state variables:**
- When values are independent and don't relate to each other
- When different values update at different times
- To keep your code simple and readable

## Your Task

Create a component named \`ColorPicker\` with multiple state variables:

1. Create a \`color\` state initialized to \`"red"\`
2. Create a \`size\` state initialized to \`"medium"\`
3. Create a function \`setToBlue\` that sets color to \`"blue"\`
4. Create a function \`setToLarge\` that sets size to \`"large"\`
5. Return a \`<div>\` with className "color-picker" containing:
   - A \`<p>\` showing "Color: {color}"
   - A \`<p>\` showing "Size: {size}"
   - A \`<button>\` with text "Blue" that calls \`setToBlue\`
   - A \`<button>\` with text "Large" that calls \`setToLarge\`
        `,
        hint: "Create two separate useState hooks. Each button should update only one state variable.",
        starterCode: `import React from 'react';
import { useState } from 'react';

function ColorPicker() {
  // Create state variables here



  // Create handler functions here



  return (
    <div className="color-picker">
      {/* Display state and buttons here */}
    </div>
  );
}

export default ColorPicker;`,
        solution: `import React from 'react';
import { useState } from 'react';

function ColorPicker() {
  const [color, setColor] = useState("red");
  const [size, setSize] = useState("medium");

  const setToBlue = () => {
    setColor("blue");
  };

  const setToLarge = () => {
    setSize("large");
  };

  return (
    <div className="color-picker">
      <p>Color: {color}</p>
      <p>Size: {size}</p>
      <button onClick={setToBlue}>Blue</button>
      <button onClick={setToLarge}>Large</button>
    </div>
  );
}

export default ColorPicker;`,
        testCases: [
          {
            id: "test-1",
            description: "Should create a color state initialized to 'red'",
            testFunction: `code.includes('[color') && code.includes('setColor]') && code.includes('"red"')`,
          },
          {
            id: "test-2",
            description: "Should create a size state initialized to 'medium'",
            testFunction: `code.includes('[size') && code.includes('setSize]') && code.includes('"medium"')`,
          },
          {
            id: "test-3",
            description: "Should display 'Color: red' initially",
            testFunction: `
              const { getByText } = render(<ColorPicker />);
              getByText('Color: red') !== null
            `,
          },
          {
            id: "test-4",
            description: "Should display 'Size: medium' initially",
            testFunction: `
              const { getByText } = render(<ColorPicker />);
              getByText('Size: medium') !== null
            `,
          },
          {
            id: "test-5",
            description: "Should have a Blue button that updates color to 'blue'",
            testFunction: `code.includes('setToBlue') && code.includes('setColor') && code.includes('"blue"')`,
          },
          {
            id: "test-6",
            description: "Should have a Large button that updates size to 'large'",
            testFunction: `code.includes('setToLarge') && code.includes('setSize') && code.includes('"large"')`,
          },
        ],
        language: "jsx",
      },
    ],
  },

  // Lesson 5: State with Objects
  {
    id: "state-basics-05",
    moduleId: "module-1-2",
    title: "State with Objects",
    order: 5,
    xpReward: 150,
    difficulty: "beginner",
    steps: [
      {
        id: "state-basics-05-step-1",
        order: 1,
        instruction: `
# State with Objects

Instead of multiple state variables, you can store related data in a single object. This is useful when values are closely related.

\`\`\`jsx
function UserProfile() {
  const [user, setUser] = useState({
    name: "Alice",
    email: "alice@example.com",
    age: 25
  });

  return (
    <div>
      <p>{user.name}</p>
      <p>{user.email}</p>
      <p>{user.age}</p>
    </div>
  );
}
\`\`\`

**Benefits:**
- Groups related data together
- Easier to pass around as a single unit
- More organized code structure

**When to use object state:**
- Data that belongs together (user info, form data)
- Multiple properties that represent a single entity

## Your Task

Create a component named \`ProductInfo\` that uses an object for state:

1. Create a \`product\` state initialized with an object containing:
   - \`name\`: \`"Laptop"\`
   - \`price\`: \`999\`
   - \`inStock\`: \`true\`
2. Return a \`<div>\` with className "product-info" containing:
   - An \`<h2>\` showing the product name
   - A \`<p>\` showing "Price: $" followed by the price (use \`Price: \${product.price}\` format)
   - A \`<p>\` showing "Available: " followed by "Yes" if inStock is true, "No" if false
        `,
        hint: "Initialize useState with an object: useState({ name: 'Laptop', price: 999, inStock: true }). Access properties with product.name, product.price, etc.",
        starterCode: `import React from 'react';
import { useState } from 'react';

function ProductInfo() {
  // Create product state here


  return (
    <div className="product-info">
      {/* Display product information here */}
    </div>
  );
}

export default ProductInfo;`,
        solution: `import React from 'react';
import { useState } from 'react';

function ProductInfo() {
  const [product, setProduct] = useState({
    name: "Laptop",
    price: 999,
    inStock: true
  });

  return (
    <div className="product-info">
      <h2>{product.name}</h2>
      <p>Price: \${product.price}</p>
      <p>Available: {product.inStock ? 'Yes' : 'No'}</p>
    </div>
  );
}

export default ProductInfo;`,
        testCases: [
          {
            id: "test-1",
            description: "Should create a product state with object containing name, price, and inStock",
            testFunction: `code.includes('[product') && code.includes('setProduct]') && code.includes('name:') && code.includes('price:') && code.includes('inStock:')`,
          },
          {
            id: "test-2",
            description: "Product name should be 'Laptop'",
            testFunction: `code.includes('"Laptop"') || code.includes("'Laptop'")`,
          },
          {
            id: "test-3",
            description: "Should display the product name in an h2",
            testFunction: `
              const { container } = render(<ProductInfo />);
              const h2 = container.querySelector('h2');
              h2 !== null && h2.textContent === 'Laptop'
            `,
          },
          {
            id: "test-4",
            description: "Should display 'Price: $999'",
            testFunction: `
              const { getByText } = render(<ProductInfo />);
              getByText('Price: $999') !== null
            `,
          },
          {
            id: "test-5",
            description: "Should display 'Available: Yes' when inStock is true",
            testFunction: `
              const { getByText } = render(<ProductInfo />);
              getByText('Available: Yes') !== null
            `,
          },
          {
            id: "test-6",
            description: "Should access object properties using product.name, product.price, product.inStock",
            testFunction: `code.includes('product.name') && code.includes('product.price') && code.includes('product.inStock')`,
          },
        ],
        language: "jsx",
      },
    ],
  },

  // Lesson 6: State with Arrays
  {
    id: "state-basics-06",
    moduleId: "module-1-2",
    title: "State with Arrays",
    order: 6,
    xpReward: 150,
    difficulty: "beginner",
    steps: [
      {
        id: "state-basics-06-step-1",
        order: 1,
        instruction: `
# State with Arrays

Arrays are perfect for storing lists of items in state. You can display the array items using the \`.map()\` method.

\`\`\`jsx
function TodoList() {
  const [todos, setTodos] = useState([
    { id: 1, text: "Learn React" },
    { id: 2, text: "Build a project" },
    { id: 3, text: "Deploy it" }
  ]);

  return (
    <ul>
      {todos.map((todo) => (
        <li key={todo.id}>{todo.text}</li>
      ))}
    </ul>
  );
}
\`\`\`

**Why use array state:**
- To store lists of items (todos, users, products)
- To render dynamic lists with map()
- To manage collections of data

**Remember:** Always give each list item a unique \`key\` prop! Use stable IDs from your data, not array indices.

⚠️ **Important:** Each item in your array should have a unique ID that you use as the key. This helps React efficiently update your list when items are added, removed, or reordered.

## Your Task

Create a component named \`TagList\` that uses an array for state:

1. Create a \`tags\` state initialized with an array of objects, each with \`id\` and \`name\`:
   - \`{ id: 1, name: "React" }\`
   - \`{ id: 2, name: "JavaScript" }\`
   - \`{ id: 3, name: "CSS" }\`
2. Return a \`<div>\` with className "tag-list" containing:
   - An \`<h3>\` with text "Tags"
   - A \`<ul>\` that maps over the tags array
   - Each tag should be rendered in an \`<li>\` with key set to \`tag.id\`
   - Display \`tag.name\` inside each \`<li>\`
        `,
        hint: "Use tags.map((tag) => <li key={tag.id}>{tag.name}</li>) to render the list with stable IDs.",
        starterCode: `import React from 'react';
import { useState } from 'react';

function TagList() {
  // Create tags state here


  return (
    <div className="tag-list">
      <h3>Tags</h3>
      {/* Render tags here */}
    </div>
  );
}

export default TagList;`,
        solution: `import React from 'react';
import { useState } from 'react';

function TagList() {
  const [tags, setTags] = useState([
    { id: 1, name: "React" },
    { id: 2, name: "JavaScript" },
    { id: 3, name: "CSS" }
  ]);

  return (
    <div className="tag-list">
      <h3>Tags</h3>
      <ul>
        {tags.map((tag) => (
          <li key={tag.id}>{tag.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default TagList;`,
        testCases: [
          {
            id: "test-1",
            description: "Should create a tags state with array of objects with id and name",
            testFunction: `code.includes('[tags') && code.includes('setTags]') && code.includes('id:') && code.includes('name:') && code.includes('"React"') && code.includes('"JavaScript"') && code.includes('"CSS"')`,
          },
          {
            id: "test-2",
            description: "Should render an h3 with 'Tags'",
            testFunction: `
              const { getByText } = render(<TagList />);
              getByText('Tags') !== null
            `,
          },
          {
            id: "test-3",
            description: "Should render a ul element",
            testFunction: `
              const { container } = render(<TagList />);
              container.querySelector('ul') !== null
            `,
          },
          {
            id: "test-4",
            description: "Should render 3 li elements",
            testFunction: `
              const { container } = render(<TagList />);
              const items = container.querySelectorAll('li');
              items.length === 3
            `,
          },
          {
            id: "test-5",
            description: "Should display all tag names",
            testFunction: `
              const { getByText } = render(<TagList />);
              getByText('React') !== null && getByText('JavaScript') !== null && getByText('CSS') !== null
            `,
          },
          {
            id: "test-6",
            description: "Should use .map() with tag.id as key (not index)",
            testFunction: `code.includes('.map(') && code.includes('key=') && code.includes('tag.id')`,
          },
        ],
        language: "jsx",
      },
    ],
  },

  // Lesson 7: Adding Items to State
  {
    id: "state-basics-07",
    moduleId: "module-1-2",
    title: "Adding Items to State Arrays",
    order: 7,
    xpReward: 150,
    difficulty: "beginner",
    steps: [
      {
        id: "state-basics-07-step-1",
        order: 1,
        instruction: `
# Adding Items to State Arrays

To add items to an array in state, you must create a **new array** rather than modifying the existing one. Use the spread operator (\`...\`) to create a new array with the added item.

\`\`\`jsx
function TodoList() {
  const [todos, setTodos] = useState(["Task 1"]);

  const addTodo = () => {
    setTodos([...todos, "New Task"]);
  };

  return (
    <div>
      <button onClick={addTodo}>Add Todo</button>
      <ul>
        {todos.map((todo) => <li key={todo}>{todo}</li>)}
      </ul>
    </div>
  );
}
\`\`\`

**Why use spread operator?**
- \`[...todos]\` creates a copy of the array
- \`[...todos, "New Task"]\` creates a copy with the new item at the end
- React detects the new array and re-renders

**Wrong way:** ❌ \`todos.push("New Task")\` - This mutates the original array!

**Right way:** ✅ \`setTodos([...todos, "New Task"])\` - This creates a new array!

## Your Task

Create a component named \`ShoppingList\` that adds items to an array:

1. Create an \`items\` state initialized with \`["Milk", "Bread"]\`
2. Create a function \`addItem\` that adds \`"Eggs"\` to the items array using the spread operator
3. Return a \`<div>\` with className "shopping-list" containing:
   - A \`<button>\` with text "Add Eggs" that calls \`addItem\`
   - A \`<ul>\` that maps over items and displays each in an \`<li>\` with key set to the item string
        `,
        hint: "In addItem, use setItems([...items, 'Eggs']) to add the new item. Use the item itself as the key.",
        starterCode: `import React from 'react';
import { useState } from 'react';

function ShoppingList() {
  // Create items state here


  // Create addItem function here


  return (
    <div className="shopping-list">
      {/* Add button and list here */}
    </div>
  );
}

export default ShoppingList;`,
        solution: `import React from 'react';
import { useState } from 'react';

function ShoppingList() {
  const [items, setItems] = useState(["Milk", "Bread"]);

  const addItem = () => {
    setItems([...items, "Eggs"]);
  };

  return (
    <div className="shopping-list">
      <button onClick={addItem}>Add Eggs</button>
      <ul>
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

export default ShoppingList;`,
        testCases: [
          {
            id: "test-1",
            description: "Should create an items state with initial array ['Milk', 'Bread']",
            testFunction: `code.includes('[items') && code.includes('setItems]') && code.includes('"Milk"') && code.includes('"Bread"')`,
          },
          {
            id: "test-2",
            description: "Should initially display 'Milk' and 'Bread'",
            testFunction: `
              const { getByText } = render(<ShoppingList />);
              getByText('Milk') !== null && getByText('Bread') !== null
            `,
          },
          {
            id: "test-3",
            description: "Should have a button with text 'Add Eggs'",
            testFunction: `
              const { getByText } = render(<ShoppingList />);
              const button = getByText('Add Eggs');
              button !== null && button.tagName === 'BUTTON'
            `,
          },
          {
            id: "test-4",
            description: "Should create an addItem function",
            testFunction: `code.includes('addItem') && (code.includes('function addItem') || code.includes('const addItem'))`,
          },
          {
            id: "test-5",
            description: "addItem should use spread operator to add 'Eggs'",
            testFunction: `code.includes('...items') && code.includes('"Eggs"') && code.includes('setItems')`,
          },
          {
            id: "test-6",
            description: "Should use .map() to render the list",
            testFunction: `code.includes('.map(') && code.includes('key=')`,
          },
        ],
        language: "jsx",
      },
    ],
  },

  // Lesson 8: Removing Items from State
  {
    id: "state-basics-08",
    moduleId: "module-1-2",
    title: "Removing Items from State Arrays",
    order: 8,
    xpReward: 150,
    difficulty: "beginner",
    steps: [
      {
        id: "state-basics-08-step-1",
        order: 1,
        instruction: `
# Removing Items from State Arrays

To remove an item from an array in state, use the \`.filter()\` method to create a new array without the item you want to remove.

\`\`\`jsx
function TodoList() {
  const [todos, setTodos] = useState(["Task 1", "Task 2", "Task 3"]);

  const removeFirst = () => {
    setTodos(todos.filter((todo, index) => index !== 0));
  };

  return (
    <div>
      <button onClick={removeFirst}>Remove First</button>
      <ul>
        {todos.map((todo) => <li key={todo}>{todo}</li>)}
      </ul>
    </div>
  );
}
\`\`\`

**How it works:**
- \`.filter()\` creates a new array containing only items that pass a test
- \`index !== 0\` keeps all items except the one at index 0
- The new array is used to update state

**Common patterns:**
- Remove by index: \`filter((item, i) => i !== indexToRemove)\`
- Remove by value: \`filter(item => item !== valueToRemove)\`

## Your Task

Create a component named \`TaskManager\` that removes items from an array:

1. Create a \`tasks\` state initialized with \`["Write code", "Review PR", "Deploy"]\`
2. Create a function \`removeLastTask\` that removes the last item from the tasks array using filter
3. Return a \`<div>\` with className "task-manager" containing:
   - A \`<button>\` with text "Remove Last Task" that calls \`removeLastTask\`
   - A \`<ul>\` that maps over tasks and displays each in an \`<li>\` with key set to the task string
        `,
        hint: "Use filter to remove the last item: setTasks(tasks.filter((task, index) => index !== tasks.length - 1)). Use the task string itself as the key.",
        starterCode: `import React from 'react';
import { useState } from 'react';

function TaskManager() {
  // Create tasks state here


  // Create removeLastTask function here


  return (
    <div className="task-manager">
      {/* Add button and list here */}
    </div>
  );
}

export default TaskManager;`,
        solution: `import React from 'react';
import { useState } from 'react';

function TaskManager() {
  const [tasks, setTasks] = useState(["Write code", "Review PR", "Deploy"]);

  const removeLastTask = () => {
    setTasks(tasks.filter((task, index) => index !== tasks.length - 1));
  };

  return (
    <div className="task-manager">
      <button onClick={removeLastTask}>Remove Last Task</button>
      <ul>
        {tasks.map((task) => (
          <li key={task}>{task}</li>
        ))}
      </ul>
    </div>
  );
}

export default TaskManager;`,
        testCases: [
          {
            id: "test-1",
            description: "Should create a tasks state with initial array",
            testFunction: `code.includes('[tasks') && code.includes('setTasks]') && code.includes('"Write code"')`,
          },
          {
            id: "test-2",
            description: "Should initially display all three tasks",
            testFunction: `
              const { getByText } = render(<TaskManager />);
              getByText('Write code') !== null && getByText('Review PR') !== null && getByText('Deploy') !== null
            `,
          },
          {
            id: "test-3",
            description: "Should have a button with text 'Remove Last Task'",
            testFunction: `
              const { getByText } = render(<TaskManager />);
              const button = getByText('Remove Last Task');
              button !== null && button.tagName === 'BUTTON'
            `,
          },
          {
            id: "test-4",
            description: "Should create a removeLastTask function",
            testFunction: `code.includes('removeLastTask') && (code.includes('function removeLastTask') || code.includes('const removeLastTask'))`,
          },
          {
            id: "test-5",
            description: "removeLastTask should use .filter() to remove the last item",
            testFunction: `code.includes('.filter(') && code.includes('tasks.length - 1') && code.includes('setTasks')`,
          },
          {
            id: "test-6",
            description: "Should render the list with .map()",
            testFunction: `code.includes('.map(') && code.includes('key=')`,
          },
        ],
        language: "jsx",
      },
    ],
  },

  // Lesson 9: Updating Objects in State
  {
    id: "state-basics-09",
    moduleId: "module-1-2",
    title: "Updating Objects in State",
    order: 9,
    xpReward: 150,
    difficulty: "beginner",
    steps: [
      {
        id: "state-basics-09-step-1",
        order: 1,
        instruction: `
# Updating Objects in State

When updating an object in state, you must create a **new object** rather than modifying the existing one. Use the spread operator to copy the object and update specific properties.

\`\`\`jsx
function UserProfile() {
  const [user, setUser] = useState({
    name: "Alice",
    age: 25,
    city: "NYC"
  });

  const updateAge = () => {
    setUser({
      ...user,        // Copy all existing properties
      age: 26         // Update only the age
    });
  };

  return (
    <div>
      <p>{user.name} - {user.age} - {user.city}</p>
      <button onClick={updateAge}>Birthday!</button>
    </div>
  );
}
\`\`\`

**How it works:**
- \`...user\` spreads all properties from the current user object
- \`age: 26\` overwrites the age property with the new value
- Other properties (name, city) remain unchanged

**Wrong way:** ❌ \`user.age = 26\` - Mutates the object!

**Right way:** ✅ \`setUser({ ...user, age: 26 })\` - Creates a new object!

## Your Task

Create a component named \`BookInfo\` that updates an object:

1. Create a \`book\` state initialized with object:
   - \`title\`: \`"React Basics"\`
   - \`pages\`: \`200\`
   - \`read\`: \`false\`
2. Create a function \`markAsRead\` that updates the \`read\` property to \`true\` using the spread operator
3. Return a \`<div>\` with className "book-info" containing:
   - An \`<h2>\` showing the book title
   - A \`<p>\` showing "Pages: " followed by the pages count
   - A \`<p>\` showing "Status: " followed by "Read" if read is true, "Unread" if false
   - A \`<button>\` with text "Mark as Read" that calls \`markAsRead\`
        `,
        hint: "Use setBook({ ...book, read: true }) to update only the read property while keeping other properties intact.",
        starterCode: `import React from 'react';
import { useState } from 'react';

function BookInfo() {
  // Create book state here


  // Create markAsRead function here


  return (
    <div className="book-info">
      {/* Display book info and button here */}
    </div>
  );
}

export default BookInfo;`,
        solution: `import React from 'react';
import { useState } from 'react';

function BookInfo() {
  const [book, setBook] = useState({
    title: "React Basics",
    pages: 200,
    read: false
  });

  const markAsRead = () => {
    setBook({
      ...book,
      read: true
    });
  };

  return (
    <div className="book-info">
      <h2>{book.title}</h2>
      <p>Pages: {book.pages}</p>
      <p>Status: {book.read ? 'Read' : 'Unread'}</p>
      <button onClick={markAsRead}>Mark as Read</button>
    </div>
  );
}

export default BookInfo;`,
        testCases: [
          {
            id: "test-1",
            description: "Should create a book state with title, pages, and read properties",
            testFunction: `code.includes('[book') && code.includes('setBook]') && code.includes('title:') && code.includes('pages:') && code.includes('read:')`,
          },
          {
            id: "test-2",
            description: "Should display the book title in an h2",
            testFunction: `
              const { container } = render(<BookInfo />);
              const h2 = container.querySelector('h2');
              h2 !== null && h2.textContent === 'React Basics'
            `,
          },
          {
            id: "test-3",
            description: "Should display 'Pages: 200'",
            testFunction: `
              const { getByText } = render(<BookInfo />);
              getByText('Pages: 200') !== null
            `,
          },
          {
            id: "test-4",
            description: "Should display 'Status: Unread' initially",
            testFunction: `
              const { getByText } = render(<BookInfo />);
              getByText('Status: Unread') !== null
            `,
          },
          {
            id: "test-5",
            description: "Should have a button with text 'Mark as Read'",
            testFunction: `
              const { getByText } = render(<BookInfo />);
              const button = getByText('Mark as Read');
              button !== null && button.tagName === 'BUTTON'
            `,
          },
          {
            id: "test-6",
            description: "markAsRead should use spread operator to update read property",
            testFunction: `code.includes('markAsRead') && code.includes('...book') && code.includes('read: true') && code.includes('setBook')`,
          },
        ],
        language: "jsx",
      },
    ],
  },

  // Lesson 10: Updating Arrays in State
  {
    id: "state-basics-10",
    moduleId: "module-1-2",
    title: "Updating Arrays in State",
    order: 10,
    xpReward: 150,
    difficulty: "beginner",
    steps: [
      {
        id: "state-basics-10-step-1",
        order: 1,
        instruction: `
# Updating Arrays in State

To update items within an array in state, use \`.map()\` to create a new array with the updated item.

\`\`\`jsx
function TodoList() {
  const [todos, setTodos] = useState([
    { id: 1, text: "Learn React", done: false },
    { id: 2, text: "Build App", done: false }
  ]);

  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id
        ? { ...todo, done: !todo.done }  // Update this item
        : todo                            // Keep other items unchanged
    ));
  };

  return (
    <ul>
      {todos.map(todo => (
        <li key={todo.id}>
          {todo.text} - {todo.done ? 'Done' : 'Pending'}
          <button onClick={() => toggleTodo(todo.id)}>Toggle</button>
        </li>
      ))}
    </ul>
  );
}
\`\`\`

**How it works:**
- \`.map()\` creates a new array by transforming each item
- If the item matches the condition, create a new updated version
- Otherwise, return the item unchanged
- This creates a new array with only the target item modified

## Your Task

Create a component named \`CounterList\` that updates items in an array:

1. Create a \`counters\` state initialized with \`[0, 0, 0]\` (three zeros)
2. Create a function \`incrementCounter\` that accepts an \`index\` parameter
3. This function should use \`.map()\` to create a new array where the counter at the given index is incremented by 1
4. Return a \`<div>\` with className "counter-list" containing:
   - A \`<ul>\` that maps over counters
   - Each counter displays its value in an \`<li>\` with text "Counter: {value}"
   - Each \`<li>\` should have a key set to the index ⚠️ Note: This is an exception case - since the counters are identical and never reorder, index keys are acceptable here
   - Each \`<li>\` should contain a \`<button>\` with text "+" that calls \`incrementCounter(index)\`
        `,
        hint: "Use setCounters(counters.map((count, i) => i === index ? count + 1 : count)) to update the specific counter. Use onClick={() => incrementCounter(index)} for the button.",
        starterCode: `import React from 'react';
import { useState } from 'react';

function CounterList() {
  // Create counters state here


  // Create incrementCounter function here


  return (
    <div className="counter-list">
      <ul>
        {/* Map over counters and render each one */}
      </ul>
    </div>
  );
}

export default CounterList;`,
        solution: `import React from 'react';
import { useState } from 'react';

function CounterList() {
  const [counters, setCounters] = useState([0, 0, 0]);

  const incrementCounter = (index) => {
    setCounters(counters.map((count, i) =>
      i === index ? count + 1 : count
    ));
  };

  return (
    <div className="counter-list">
      <ul>
        {counters.map((count, index) => (
          <li key={index}>
            Counter: {count}
            <button onClick={() => incrementCounter(index)}>+</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CounterList;`,
        testCases: [
          {
            id: "test-1",
            description: "Should create a counters state initialized with [0, 0, 0]",
            testFunction: `code.includes('[counters') && code.includes('setCounters]') && code.includes('[0, 0, 0]')`,
          },
          {
            id: "test-2",
            description: "Should render 3 list items initially",
            testFunction: `
              const { container } = render(<CounterList />);
              const items = container.querySelectorAll('li');
              items.length === 3
            `,
          },
          {
            id: "test-3",
            description: "Each list item should display 'Counter: 0' initially",
            testFunction: `
              const { container } = render(<CounterList />);
              const items = container.querySelectorAll('li');
              Array.from(items).every(item => item.textContent.includes('Counter: 0'))
            `,
          },
          {
            id: "test-4",
            description: "Each list item should have a '+' button",
            testFunction: `
              const { container } = render(<CounterList />);
              const buttons = container.querySelectorAll('button');
              buttons.length === 3 && Array.from(buttons).every(btn => btn.textContent === '+')
            `,
          },
          {
            id: "test-5",
            description: "Should create an incrementCounter function that accepts index",
            testFunction: `code.includes('incrementCounter') && (code.includes('incrementCounter(index)') || code.includes('incrementCounter = (index)'))`,
          },
          {
            id: "test-6",
            description: "incrementCounter should use .map() to update the counter at the given index",
            testFunction: `code.includes('counters.map(') && code.includes('setCounters') && (code.includes('i === index') || code.includes('index === i'))`,
          },
        ],
        language: "jsx",
      },
    ],
  },
];
