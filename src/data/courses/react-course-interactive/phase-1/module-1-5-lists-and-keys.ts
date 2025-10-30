/**
 * React Course - Phase 1: Novice Foundations
 * Module 1.5: Lists and Keys (10 lessons)
 *
 * This module teaches how to render dynamic lists in React,
 * the importance of keys, and best practices for list rendering.
 */

import { InteractiveLesson } from "@/types";

export const listsAndKeysLessons: InteractiveLesson[] = [
  // Lesson 1: Rendering Lists with map()
  {
    id: "lists-keys-01",
    moduleId: "module-1-5",
    title: "Rendering Lists with map()",
    order: 1,
    xpReward: 100,
    difficulty: "beginner",
    steps: [
      {
        id: "lists-keys-01-step-1",
        order: 1,
        instruction: `
# Rendering Lists with map()

In React, you'll frequently need to display lists of data. The most common way to do this is using JavaScript's **map()** method to transform an array of data into an array of JSX elements.

\`\`\`jsx
function ShoppingList() {
  const items = ['Apples', 'Bananas', 'Cherries'];

  return (
    <ul>
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}
\`\`\`

**How it works:**
1. \`map()\` iterates over each element in the array
2. For each element, it returns a JSX element
3. The array of JSX elements is rendered in the component

**Important:** Each element must have a unique \`key\` prop (we'll learn more about this in the next lesson).

⚠️ **Critical Warning:** Never use array index as the key when items can be reordered, deleted, or filtered! This causes mysterious bugs. Always use stable unique IDs. We'll learn exactly why in the next lesson.

## Your Task

Create a component named \`NumberList\` that renders a list of numbers:
1. Destructure \`numbers\` from props (an array of numbers)
2. Return a \`<div>\` with className "number-list"
3. Inside, create a \`<ul>\` element
4. Use \`map()\` to render each number in an \`<li>\`
5. Use the number itself as the key prop
6. Display the text "Number: {number}" in each li
        `,
        hint: "Use numbers.map((number) => <li key={number}>Number: {number}</li>)",
        starterCode: `import React from 'react';

function NumberList({ numbers }) {
  return (
    // Your code here
  );
}

export default NumberList;`,
        solution: `import React from 'react';

function NumberList({ numbers }) {
  return (
    <div className="number-list">
      <ul>
        {numbers.map((number) => (
          <li key={number}>Number: {number}</li>
        ))}
      </ul>
    </div>
  );
}

export default NumberList;`,
        testCases: [
          {
            id: "test-1",
            description: "Should render a div with className 'number-list'",
            testFunction: `
              const { container } = render(<NumberList numbers={[1, 2, 3]} />);
              container.querySelector('div.number-list') !== null
            `,
          },
          {
            id: "test-2",
            description: "Should render a ul element",
            testFunction: `
              const { container } = render(<NumberList numbers={[1]} />);
              container.querySelector('ul') !== null
            `,
          },
          {
            id: "test-3",
            description: "Should render an li for each number",
            testFunction: `
              const { container } = render(<NumberList numbers={[1, 2, 3, 4, 5]} />);
              const items = container.querySelectorAll('li');
              items.length === 5
            `,
          },
          {
            id: "test-4",
            description: "Each li should display 'Number: {number}'",
            testFunction: `
              const { getByText } = render(<NumberList numbers={[7, 42]} />);
              getByText('Number: 7') !== null && getByText('Number: 42') !== null
            `,
          },
          {
            id: "test-5",
            description: "Should use .map() method",
            testFunction: `code.includes('.map(')`,
          },
          {
            id: "test-6",
            description: "Should use key prop",
            testFunction: `code.includes('key=')`,
          },
        ],
        language: "jsx",
      },
    ],
  },

  // Lesson 2: The Problem with Index Keys
  {
    id: "lists-keys-02",
    moduleId: "module-1-5",
    title: "The Problem with Index Keys",
    order: 2,
    xpReward: 150,
    difficulty: "intermediate",
    steps: [
      {
        id: "lists-keys-02-step-1",
        order: 1,
        instruction: `
# Why Index Keys Are Dangerous

Using array index as \`key\` seems convenient, but it causes subtle bugs.

## The Bug

\`\`\`jsx
function TodoList() {
  const [todos, setTodos] = useState([
    'Buy milk',
    'Walk dog',
    'Write code'
  ]);

  const removeTodo = (index) => {
    setTodos(todos.filter((_, i) => i !== index));
  };

  return (
    <ul>
      {todos.map((todo, index) => (
        <li key={index}>  {/* ❌ Using index */}
          <input type="checkbox" />
          <span>{todo}</span>
          <button onClick={() => removeTodo(index)}>Delete</button>
        </li>
      ))}
    </ul>
  );
}
\`\`\`

**Try this:**
1. Check the checkbox for "Walk dog" (index 1)
2. Delete "Buy milk" (index 0)
3. 🐛 **BUG:** "Write code" is now checked instead!

**Why?**
\`\`\`
// Before delete:
<li key={0}>Buy milk</li>        // checkbox unchecked
<li key={1}>Walk dog</li>        // checkbox CHECKED ✓
<li key={2}>Write code</li>      // checkbox unchecked

// After deleting index 0:
<li key={0}>Walk dog</li>        // checkbox unchecked (WRONG!)
<li key={1}>Write code</li>      // checkbox CHECKED ✓ (WRONG!)
\`\`\`

React thinks:
- "key={0} still exists, keep its state (unchecked)"
- "key={1} still exists, keep its state (checked)"

But the DATA changed! The checkbox state stayed with the KEY, not the item.

## The Solution

Use **stable, unique IDs**:

\`\`\`jsx
const [todos, setTodos] = useState([
  { id: 1, text: 'Buy milk' },
  { id: 2, text: 'Walk dog' },
  { id: 3, text: 'Write code' }
]);

return (
  <ul>
    {todos.map((todo) => (
      <li key={todo.id}>  {/* ✅ Stable ID */}
        <input type="checkbox" />
        <span>{todo.text}</span>
        <button onClick={() => removeTodo(todo.id)}>Delete</button>
      </li>
    ))}
  </ul>
);
\`\`\`

Now React correctly tracks each item by its ID.

## When Index IS Okay

Index keys are fine ONLY when:
- ✅ List never reorders
- ✅ Items never deleted from middle
- ✅ List only appends to end
- ✅ Items have no state (pure display)

**Example where index is okay:**
\`\`\`jsx
const months = ['Jan', 'Feb', 'Mar', ...];  // Never changes
months.map((month, i) => <span key={i}>{month}</span>);  // OK
\`\`\`

## Your Task

Fix the \`ShoppingList\` component to use stable IDs instead of index keys.

**Requirements:**
1. Change items to objects with \`id\` and \`name\` fields
2. Use \`item.id\` as the key
3. Update the delete function to use ID
        `,
        hint: "Change items to an array of objects: [{ id: 1, name: 'Apples' }, ...]. Use item.id as the key prop. Update deleteItem to take an id parameter.",
        starterCode: `import React from 'react';
import { useState } from 'react';

function ShoppingList() {
  const [items, setItems] = useState(['Apples', 'Bread', 'Milk']);

  const deleteItem = (index) => {
    setItems(items.filter((_, i) => i !== index));
  };

  return (
    <div>
      <h2>Shopping List</h2>
      <ul>
        {items.map((item, index) => (
          <li key={index}>
            <span>{item}</span>
            <button onClick={() => deleteItem(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ShoppingList;`,
        solution: `import React from 'react';
import { useState } from 'react';

function ShoppingList() {
  const [items, setItems] = useState([
    { id: 1, name: 'Apples' },
    { id: 2, name: 'Bread' },
    { id: 3, name: 'Milk' }
  ]);

  const deleteItem = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  return (
    <div>
      <h2>Shopping List</h2>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            <span>{item.name}</span>
            <button onClick={() => deleteItem(item.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ShoppingList;`,
        testCases: [
          {
            id: "test-1",
            description: "Should use objects with id and name for items",
            testFunction: `code.includes('id:') && code.includes('name:')`,
          },
          {
            id: "test-2",
            description: "Should use item.id as key (not index)",
            testFunction: `code.includes('key={item.id}')`,
          },
          {
            id: "test-3",
            description: "Should display item.name in the span",
            testFunction: `code.includes('item.name')`,
          },
          {
            id: "test-4",
            description: "deleteItem should accept id parameter",
            testFunction: `code.includes('deleteItem = (id)') || code.includes('deleteItem(id)')`,
          },
          {
            id: "test-5",
            description: "Should filter by item.id, not index",
            testFunction: `code.includes('item.id !== id') || code.includes('item.id != id')`,
          },
          {
            id: "test-6",
            description: "Should NOT use index as key",
            testFunction: `!code.includes('key={index}')`,
          },
        ],
        language: "jsx",
      },
    ],
  },

  // Lesson 3: The Key Prop
  {
    id: "lists-keys-03",
    moduleId: "module-1-5",
    title: "Understanding the Key Prop",
    order: 3,
    xpReward: 125,
    difficulty: "beginner",
    steps: [
      {
        id: "lists-keys-02-step-1",
        order: 1,
        instruction: `
# Understanding the Key Prop

The \`key\` prop is a special attribute you must include when creating lists of elements. Keys help React identify which items have changed, been added, or been removed.

**Why keys matter:**
\`\`\`jsx
// ❌ Without keys - React warning
<ul>
  {items.map(item => <li>{item}</li>)}
</ul>

// ✅ With keys - React can efficiently update
<ul>
  {items.map(item => <li key={item.id}>{item.name}</li>)}
</ul>
\`\`\`

**Best practices for keys:**
- Keys must be unique among siblings
- Use stable IDs from your data (like database IDs)
- Don't use random values (keys should be consistent across re-renders)
- **NEVER use array index as key** (you learned why in the previous lesson!)

**Example with objects:**
\`\`\`jsx
const users = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
  { id: 3, name: 'Charlie' }
];

return (
  <ul>
    {users.map(user => (
      <li key={user.id}>{user.name}</li>
    ))}
  </ul>
);
\`\`\`

## Your Task

Create a component named \`TodoList\` that properly uses keys:
1. Destructure \`todos\` from props (array of objects with \`id\` and \`text\`)
2. Return a \`<div>\` with className "todo-list"
3. Include an \`<h2>\` with text "My Todos"
4. Create a \`<ul>\` that maps over todos
5. Each \`<li>\` should use \`todo.id\` as the key
6. Display the \`todo.text\` in each li
        `,
        hint: "Use todos.map(todo => <li key={todo.id}>{todo.text}</li>). Remember to access properties with dot notation.",
        starterCode: `import React from 'react';

function TodoList({ todos }) {
  return (
    // Your code here
  );
}

export default TodoList;`,
        solution: `import React from 'react';

function TodoList({ todos }) {
  return (
    <div className="todo-list">
      <h2>My Todos</h2>
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>{todo.text}</li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;`,
        testCases: [
          {
            id: "test-1",
            description: "Should render a div with className 'todo-list'",
            testFunction: `
              const todos = [{ id: 1, text: 'Learn React' }];
              const { container } = render(<TodoList todos={todos} />);
              container.querySelector('div.todo-list') !== null
            `,
          },
          {
            id: "test-2",
            description: "Should render an h2 with 'My Todos'",
            testFunction: `
              const todos = [{ id: 1, text: 'Learn React' }];
              const { getByText } = render(<TodoList todos={todos} />);
              getByText('My Todos') !== null
            `,
          },
          {
            id: "test-3",
            description: "Should render an li for each todo",
            testFunction: `
              const todos = [
                { id: 1, text: 'Learn React' },
                { id: 2, text: 'Build a project' },
                { id: 3, text: 'Deploy it' }
              ];
              const { container } = render(<TodoList todos={todos} />);
              const items = container.querySelectorAll('li');
              items.length === 3
            `,
          },
          {
            id: "test-4",
            description: "Should display the todo text in each li",
            testFunction: `
              const todos = [
                { id: 1, text: 'Learn React' },
                { id: 2, text: 'Build a project' }
              ];
              const { getByText } = render(<TodoList todos={todos} />);
              getByText('Learn React') !== null && getByText('Build a project') !== null
            `,
          },
          {
            id: "test-5",
            description: "Should use todo.id as the key",
            testFunction: `code.includes('key={todo.id}') || code.includes('key={') && code.includes('.id')`,
          },
          {
            id: "test-6",
            description: "Should use .map() method",
            testFunction: `code.includes('.map(')`,
          },
        ],
        language: "jsx",
      },
    ],
  },

  // Lesson 4: List of Components
  {
    id: "lists-keys-04",
    moduleId: "module-1-5",
    title: "Rendering a List of Components",
    order: 4,
    xpReward: 150,
    difficulty: "beginner",
    steps: [
      {
        id: "lists-keys-03-step-1",
        order: 1,
        instruction: `
# Rendering a List of Components

Instead of rendering simple elements, you can map data to custom components. This keeps your code organized and makes components reusable.

\`\`\`jsx
function UserCard({ name, email }) {
  return (
    <div className="card">
      <h3>{name}</h3>
      <p>{email}</p>
    </div>
  );
}

function UserList({ users }) {
  return (
    <div>
      {users.map(user => (
        <UserCard
          key={user.id}
          name={user.name}
          email={user.email}
        />
      ))}
    </div>
  );
}
\`\`\`

**Key points:**
- The \`key\` prop goes on the component in the map, not inside the component
- Pass data as props to the component
- This creates a clear separation of concerns

## Your Task

Create TWO components:

**1. Component \`ProductCard\`:**
- Accepts \`name\`, \`price\`, and \`category\` as props
- Returns a \`<div>\` with className "product-card"
- Contains an \`<h3>\` with the name
- Contains a \`<p>\` with className "price" showing "\${price}"
- Contains a \`<p>\` with className "category" showing the category

**2. Component \`ProductGrid\`:**
- Accepts \`products\` as props (array of objects with id, name, price, category)
- Returns a \`<div>\` with className "product-grid"
- Maps over products to render a ProductCard for each
- Uses product.id as the key
- Passes name, price, and category as props to ProductCard

Export ProductCard as a named export and ProductGrid as default.
        `,
        hint: "Create ProductCard first. In ProductGrid, use products.map(product => <ProductCard key={product.id} name={product.name} price={product.price} category={product.category} />)",
        starterCode: `import React from 'react';

// Create ProductCard component here


// Create ProductGrid component here


export { ProductCard };
export default ProductGrid;`,
        solution: `import React from 'react';

function ProductCard({ name, price, category }) {
  return (
    <div className="product-card">
      <h3>{name}</h3>
      <p className="price">$\{price}</p>
      <p className="category">{category}</p>
    </div>
  );
}

function ProductGrid({ products }) {
  return (
    <div className="product-grid">
      {products.map(product => (
        <ProductCard
          key={product.id}
          name={product.name}
          price={product.price}
          category={product.category}
        />
      ))}
    </div>
  );
}

export { ProductCard };
export default ProductGrid;`,
        testCases: [
          {
            id: "test-1",
            description: "ProductCard should exist",
            testFunction: `typeof ProductCard === 'function'`,
          },
          {
            id: "test-2",
            description: "ProductCard should render a div with className 'product-card'",
            testFunction: `
              const { container } = render(<ProductCard name="Laptop" price={999} category="Electronics" />);
              container.querySelector('div.product-card') !== null
            `,
          },
          {
            id: "test-3",
            description: "ProductCard should display name, price, and category",
            testFunction: `
              const { getByText, container } = render(<ProductCard name="Laptop" price={999} category="Electronics" />);
              const price = container.querySelector('.price');
              const category = container.querySelector('.category');
              getByText('Laptop') !== null && price.textContent === '$999' && category.textContent === 'Electronics'
            `,
          },
          {
            id: "test-4",
            description: "ProductGrid should render a div with className 'product-grid'",
            testFunction: `
              const products = [{ id: 1, name: 'Laptop', price: 999, category: 'Electronics' }];
              const { container } = render(<ProductGrid products={products} />);
              container.querySelector('div.product-grid') !== null
            `,
          },
          {
            id: "test-5",
            description: "ProductGrid should render a ProductCard for each product",
            testFunction: `
              const products = [
                { id: 1, name: 'Laptop', price: 999, category: 'Electronics' },
                { id: 2, name: 'Book', price: 20, category: 'Education' },
                { id: 3, name: 'Headphones', price: 150, category: 'Electronics' }
              ];
              const { container } = render(<ProductGrid products={products} />);
              const cards = container.querySelectorAll('.product-card');
              cards.length === 3
            `,
          },
          {
            id: "test-6",
            description: "ProductGrid should use .map() and pass props correctly",
            testFunction: `
              const products = [{ id: 1, name: 'Test Product', price: 50, category: 'Test' }];
              const { getByText } = render(<ProductGrid products={products} />);
              getByText('Test Product') !== null && getByText('Test') !== null
            `,
          },
        ],
        language: "jsx",
      },
    ],
  },

  // Lesson 5: Filtering Lists
  {
    id: "lists-keys-05",
    moduleId: "module-1-5",
    title: "Filtering Lists",
    order: 5,
    xpReward: 150,
    difficulty: "beginner",
    steps: [
      {
        id: "lists-keys-04-step-1",
        order: 1,
        instruction: `
# Filtering Lists

Often you need to display only certain items from a list. Combine \`filter()\` with \`map()\` to show filtered data.

\`\`\`jsx
function ActiveTasks({ tasks }) {
  return (
    <ul>
      {tasks
        .filter(task => task.isActive)
        .map(task => (
          <li key={task.id}>{task.name}</li>
        ))}
    </ul>
  );
}
\`\`\`

**How it works:**
1. \`filter()\` creates a new array with only items that match the condition
2. \`map()\` transforms the filtered array into JSX elements

**You can filter by various criteria:**
\`\`\`jsx
// Filter by boolean
items.filter(item => item.isAvailable)

// Filter by comparison
items.filter(item => item.price < 100)

// Filter by search term
items.filter(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()))
\`\`\`

## Your Task

Create a component named \`AvailableProducts\` that filters and displays products:
1. Destructure \`products\` from props (array with id, name, price, inStock)
2. Return a \`<div>\` with className "available-products"
3. Include an \`<h2>\` with text "Available Products"
4. Create a \`<ul>\` that:
   - Filters products where \`inStock\` is true
   - Maps over filtered products to create \`<li>\` elements
   - Uses product.id as key
   - Displays "{name} - \${price}" in each li
        `,
        hint: "Use products.filter(product => product.inStock).map(product => <li key={product.id}>{product.name} - \${product.price}</li>)",
        starterCode: `import React from 'react';

function AvailableProducts({ products }) {
  return (
    // Your code here
  );
}

export default AvailableProducts;`,
        solution: `import React from 'react';

function AvailableProducts({ products }) {
  return (
    <div className="available-products">
      <h2>Available Products</h2>
      <ul>
        {products
          .filter(product => product.inStock)
          .map(product => (
            <li key={product.id}>{product.name} - $\{product.price}</li>
          ))}
      </ul>
    </div>
  );
}

export default AvailableProducts;`,
        testCases: [
          {
            id: "test-1",
            description: "Should render a div with className 'available-products'",
            testFunction: `
              const products = [{ id: 1, name: 'Item', price: 10, inStock: true }];
              const { container } = render(<AvailableProducts products={products} />);
              container.querySelector('div.available-products') !== null
            `,
          },
          {
            id: "test-2",
            description: "Should render an h2 with 'Available Products'",
            testFunction: `
              const products = [{ id: 1, name: 'Item', price: 10, inStock: true }];
              const { getByText } = render(<AvailableProducts products={products} />);
              getByText('Available Products') !== null
            `,
          },
          {
            id: "test-3",
            description: "Should only display products where inStock is true",
            testFunction: `
              const products = [
                { id: 1, name: 'Laptop', price: 999, inStock: true },
                { id: 2, name: 'Mouse', price: 25, inStock: false },
                { id: 3, name: 'Keyboard', price: 75, inStock: true }
              ];
              const { container, queryByText } = render(<AvailableProducts products={products} />);
              const items = container.querySelectorAll('li');
              items.length === 2 && queryByText(/Mouse/) === null
            `,
          },
          {
            id: "test-4",
            description: "Should display product name and price in correct format",
            testFunction: `
              const products = [
                { id: 1, name: 'Laptop', price: 999, inStock: true }
              ];
              const { getByText } = render(<AvailableProducts products={products} />);
              getByText('Laptop - $999') !== null
            `,
          },
          {
            id: "test-5",
            description: "Should use .filter() method",
            testFunction: `code.includes('.filter(')`,
          },
          {
            id: "test-6",
            description: "Should use .map() method",
            testFunction: `code.includes('.map(')`,
          },
        ],
        language: "jsx",
      },
    ],
  },

  // Lesson 6: Sorting Lists
  {
    id: "lists-keys-06",
    moduleId: "module-1-5",
    title: "Sorting Lists",
    order: 6,
    xpReward: 150,
    difficulty: "beginner",
    steps: [
      {
        id: "lists-keys-05-step-1",
        order: 1,
        instruction: `
# Sorting Lists

You can sort lists before rendering them using JavaScript's \`sort()\` method. **Important:** Always create a copy of the array before sorting, since \`sort()\` mutates the original array.

\`\`\`jsx
function SortedList({ items }) {
  return (
    <ul>
      {[...items]
        .sort((a, b) => a.name.localeCompare(b.name))
        .map(item => (
          <li key={item.id}>{item.name}</li>
        ))}
    </ul>
  );
}
\`\`\`

**Common sorting patterns:**
\`\`\`jsx
// Sort numbers ascending
[...numbers].sort((a, b) => a - b)

// Sort numbers descending
[...numbers].sort((a, b) => b - a)

// Sort strings alphabetically
[...items].sort((a, b) => a.name.localeCompare(b.name))

// Sort by property
[...users].sort((a, b) => a.age - b.age)
\`\`\`

**Why spread operator \`[...items]\`?**
- Creates a shallow copy of the array
- Prevents mutating the original props
- React best practice: never mutate props directly

## Your Task

Create a component named \`SortedStudents\` that sorts and displays students:
1. Destructure \`students\` from props (array with id, name, grade)
2. Return a \`<div>\` with className "sorted-students"
3. Include an \`<h2>\` with text "Students by Grade"
4. Create a \`<ul>\` that:
   - Creates a copy of students using spread operator
   - Sorts by grade in descending order (highest first)
   - Maps to \`<li>\` elements
   - Uses student.id as key
   - Displays "{name}: Grade {grade}" in each li
        `,
        hint: "Use [...students].sort((a, b) => b.grade - a.grade).map(...). Remember: b - a for descending order.",
        starterCode: `import React from 'react';

function SortedStudents({ students }) {
  return (
    // Your code here
  );
}

export default SortedStudents;`,
        solution: `import React from 'react';

function SortedStudents({ students }) {
  return (
    <div className="sorted-students">
      <h2>Students by Grade</h2>
      <ul>
        {[...students]
          .sort((a, b) => b.grade - a.grade)
          .map(student => (
            <li key={student.id}>{student.name}: Grade {student.grade}</li>
          ))}
      </ul>
    </div>
  );
}

export default SortedStudents;`,
        testCases: [
          {
            id: "test-1",
            description: "Should render a div with className 'sorted-students'",
            testFunction: `
              const students = [{ id: 1, name: 'Alice', grade: 90 }];
              const { container } = render(<SortedStudents students={students} />);
              container.querySelector('div.sorted-students') !== null
            `,
          },
          {
            id: "test-2",
            description: "Should render an h2 with 'Students by Grade'",
            testFunction: `
              const students = [{ id: 1, name: 'Alice', grade: 90 }];
              const { getByText } = render(<SortedStudents students={students} />);
              getByText('Students by Grade') !== null
            `,
          },
          {
            id: "test-3",
            description: "Should display students sorted by grade (highest first)",
            testFunction: `
              const students = [
                { id: 1, name: 'Alice', grade: 85 },
                { id: 2, name: 'Bob', grade: 95 },
                { id: 3, name: 'Charlie', grade: 78 }
              ];
              const { container } = render(<SortedStudents students={students} />);
              const items = container.querySelectorAll('li');
              items[0].textContent.includes('Bob') && items[1].textContent.includes('Alice') && items[2].textContent.includes('Charlie')
            `,
          },
          {
            id: "test-4",
            description: "Should display in format '{name}: Grade {grade}'",
            testFunction: `
              const students = [{ id: 1, name: 'Alice', grade: 90 }];
              const { getByText } = render(<SortedStudents students={students} />);
              getByText('Alice: Grade 90') !== null
            `,
          },
          {
            id: "test-5",
            description: "Should use spread operator to copy array",
            testFunction: `code.includes('[...students]') || code.includes('[ ...students ]')`,
          },
          {
            id: "test-6",
            description: "Should use .sort() method",
            testFunction: `code.includes('.sort(')`,
          },
        ],
        language: "jsx",
      },
    ],
  },

  // Lesson 7: Dynamic Lists
  {
    id: "lists-keys-07",
    moduleId: "module-1-5",
    title: "Working with Dynamic Lists",
    order: 7,
    xpReward: 175,
    difficulty: "intermediate",
    steps: [
      {
        id: "lists-keys-06-step-1",
        order: 1,
        instruction: `
# Working with Dynamic Lists

Dynamic lists change based on conditions, user input, or other criteria. You can combine filtering, sorting, and mapping to create powerful list displays.

\`\`\`jsx
function SearchableList({ items, searchTerm, sortBy }) {
  return (
    <ul>
      {items
        .filter(item =>
          item.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .sort((a, b) => {
          if (sortBy === 'name') return a.name.localeCompare(b.name);
          if (sortBy === 'price') return a.price - b.price;
          return 0;
        })
        .map(item => (
          <li key={item.id}>{item.name} - $\{item.price}</li>
        ))}
    </ul>
  );
}
\`\`\`

**Pattern:**
1. Filter first (reduce the array)
2. Sort second (order the filtered results)
3. Map last (transform to JSX)

## Your Task

Create a component named \`FilteredProducts\` with dynamic filtering:
1. Destructure \`products\` and \`maxPrice\` from props
2. Products have: id, name, price, category
3. Return a \`<div>\` with className "filtered-products"
4. Include an \`<h2>\` with text "Products Under \${maxPrice}"
5. Create a \`<ul>\` that:
   - Filters products where price <= maxPrice
   - Sorts by price ascending (lowest first)
   - Maps to \`<li>\` elements with key={product.id}
   - Displays "{name} - \${price} ({category})" in each li
6. If no products match, show a \`<p>\` with text "No products found"
        `,
        hint: "Use conditional rendering: {filteredProducts.length === 0 ? <p>No products found</p> : <ul>...</ul>}. Chain filter, sort, and map.",
        starterCode: `import React from 'react';

function FilteredProducts({ products, maxPrice }) {
  return (
    // Your code here
  );
}

export default FilteredProducts;`,
        solution: `import React from 'react';

function FilteredProducts({ products, maxPrice }) {
  const filteredProducts = products
    .filter(product => product.price <= maxPrice)
    .sort((a, b) => a.price - b.price);

  return (
    <div className="filtered-products">
      <h2>Products Under $\{maxPrice}</h2>
      {filteredProducts.length === 0 ? (
        <p>No products found</p>
      ) : (
        <ul>
          {filteredProducts.map(product => (
            <li key={product.id}>
              {product.name} - $\{product.price} ({product.category})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default FilteredProducts;`,
        testCases: [
          {
            id: "test-1",
            description: "Should render a div with className 'filtered-products'",
            testFunction: `
              const products = [{ id: 1, name: 'Item', price: 50, category: 'Test' }];
              const { container } = render(<FilteredProducts products={products} maxPrice={100} />);
              container.querySelector('div.filtered-products') !== null
            `,
          },
          {
            id: "test-2",
            description: "Should display the maxPrice in the heading",
            testFunction: `
              const products = [{ id: 1, name: 'Item', price: 50, category: 'Test' }];
              const { getByText } = render(<FilteredProducts products={products} maxPrice={75} />);
              getByText('Products Under $75') !== null
            `,
          },
          {
            id: "test-3",
            description: "Should only show products at or below maxPrice",
            testFunction: `
              const products = [
                { id: 1, name: 'Cheap', price: 25, category: 'A' },
                { id: 2, name: 'Expensive', price: 150, category: 'B' },
                { id: 3, name: 'Medium', price: 75, category: 'C' }
              ];
              const { container, queryByText } = render(<FilteredProducts products={products} maxPrice={100} />);
              const items = container.querySelectorAll('li');
              items.length === 2 && queryByText(/Expensive/) === null
            `,
          },
          {
            id: "test-4",
            description: "Should sort products by price (lowest first)",
            testFunction: `
              const products = [
                { id: 1, name: 'High', price: 100, category: 'A' },
                { id: 2, name: 'Low', price: 25, category: 'B' },
                { id: 3, name: 'Mid', price: 50, category: 'C' }
              ];
              const { container } = render(<FilteredProducts products={products} maxPrice={150} />);
              const items = container.querySelectorAll('li');
              items[0].textContent.includes('Low') && items[2].textContent.includes('High')
            `,
          },
          {
            id: "test-5",
            description: "Should show 'No products found' when no products match",
            testFunction: `
              const products = [
                { id: 1, name: 'Expensive', price: 200, category: 'A' }
              ];
              const { getByText } = render(<FilteredProducts products={products} maxPrice={50} />);
              getByText('No products found') !== null
            `,
          },
          {
            id: "test-6",
            description: "Should display products in correct format",
            testFunction: `
              const products = [{ id: 1, name: 'Laptop', price: 500, category: 'Electronics' }];
              const { getByText } = render(<FilteredProducts products={products} maxPrice={1000} />);
              getByText('Laptop - $500 (Electronics)') !== null
            `,
          },
        ],
        language: "jsx",
      },
    ],
  },

  // Lesson 8: Nested Lists
  {
    id: "lists-keys-08",
    moduleId: "module-1-5",
    title: "Rendering Nested Lists",
    order: 8,
    xpReward: 175,
    difficulty: "intermediate",
    steps: [
      {
        id: "lists-keys-07-step-1",
        order: 1,
        instruction: `
# Rendering Nested Lists

Sometimes you need to render lists within lists, such as categories containing items or nested menu structures.

\`\`\`jsx
function CategoryList({ categories }) {
  return (
    <div>
      {categories.map(category => (
        <div key={category.id}>
          <h3>{category.name}</h3>
          <ul>
            {category.items.map(item => (
              <li key={item.id}>{item.name}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
\`\`\`

**Key points:**
- Each level of nesting needs its own \`map()\`
- Each level needs unique keys
- Outer key uses category.id, inner key uses item.id

**Example data structure:**
\`\`\`javascript
const categories = [
  {
    id: 1,
    name: 'Fruits',
    items: [
      { id: 101, name: 'Apple' },
      { id: 102, name: 'Banana' }
    ]
  },
  {
    id: 2,
    name: 'Vegetables',
    items: [
      { id: 201, name: 'Carrot' },
      { id: 202, name: 'Broccoli' }
    ]
  }
];
\`\`\`

## Your Task

Create a component named \`DepartmentList\` that renders nested lists:
1. Destructure \`departments\` from props
2. Each department has: id, name, employees (array)
3. Each employee has: id, name, role
4. Return a \`<div>\` with className "department-list"
5. Map over departments to create a section for each:
   - \`<div>\` with className "department" and key={department.id}
   - \`<h2>\` with department name
   - \`<ul>\` mapping over employees:
     - \`<li>\` with key={employee.id}
     - Display "{name} - {role}" in each li
        `,
        hint: "You'll need two .map() calls: one for departments, one for employees inside each department.",
        starterCode: `import React from 'react';

function DepartmentList({ departments }) {
  return (
    // Your code here
  );
}

export default DepartmentList;`,
        solution: `import React from 'react';

function DepartmentList({ departments }) {
  return (
    <div className="department-list">
      {departments.map(department => (
        <div key={department.id} className="department">
          <h2>{department.name}</h2>
          <ul>
            {department.employees.map(employee => (
              <li key={employee.id}>
                {employee.name} - {employee.role}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default DepartmentList;`,
        testCases: [
          {
            id: "test-1",
            description: "Should render a div with className 'department-list'",
            testFunction: `
              const departments = [
                { id: 1, name: 'Engineering', employees: [] }
              ];
              const { container } = render(<DepartmentList departments={departments} />);
              container.querySelector('div.department-list') !== null
            `,
          },
          {
            id: "test-2",
            description: "Should render a div for each department",
            testFunction: `
              const departments = [
                { id: 1, name: 'Engineering', employees: [] },
                { id: 2, name: 'Sales', employees: [] }
              ];
              const { container } = render(<DepartmentList departments={departments} />);
              const depts = container.querySelectorAll('.department');
              depts.length === 2
            `,
          },
          {
            id: "test-3",
            description: "Should render department names in h2 elements",
            testFunction: `
              const departments = [
                { id: 1, name: 'Engineering', employees: [] },
                { id: 2, name: 'Sales', employees: [] }
              ];
              const { getByText } = render(<DepartmentList departments={departments} />);
              getByText('Engineering') !== null && getByText('Sales') !== null
            `,
          },
          {
            id: "test-4",
            description: "Should render employees in ul/li elements",
            testFunction: `
              const departments = [
                {
                  id: 1,
                  name: 'Engineering',
                  employees: [
                    { id: 101, name: 'Alice', role: 'Developer' },
                    { id: 102, name: 'Bob', role: 'Designer' }
                  ]
                }
              ];
              const { container } = render(<DepartmentList departments={departments} />);
              const items = container.querySelectorAll('li');
              items.length === 2
            `,
          },
          {
            id: "test-5",
            description: "Should display employees in correct format",
            testFunction: `
              const departments = [
                {
                  id: 1,
                  name: 'Engineering',
                  employees: [
                    { id: 101, name: 'Alice', role: 'Developer' }
                  ]
                }
              ];
              const { getByText } = render(<DepartmentList departments={departments} />);
              getByText('Alice - Developer') !== null
            `,
          },
          {
            id: "test-6",
            description: "Should use keys for both departments and employees",
            testFunction: `code.includes('key={department.id}') && code.includes('key={employee.id}')`,
          },
        ],
        language: "jsx",
      },
    ],
  },

  // Lesson 9: List Performance
  {
    id: "lists-keys-09",
    moduleId: "module-1-5",
    title: "Optimizing List Performance",
    order: 9,
    xpReward: 200,
    difficulty: "intermediate",
    steps: [
      {
        id: "lists-keys-08-step-1",
        order: 1,
        instruction: `
# Optimizing List Performance

When working with large lists, performance becomes important. Here are best practices to keep your lists fast.

**1. Use proper keys:**
\`\`\`jsx
// ❌ Bad: Using index (we'll learn why in the next lesson)
{items.map((item, index) => <li key={index}>{item}</li>)}

// ✅ Good: Using stable IDs
{items.map(item => <li key={item.id}>{item.name}</li>)}
\`\`\`

**2. Extract list items to separate components:**
\`\`\`jsx
// ✅ Better performance with component extraction
function TodoItem({ todo }) {
  return <li>{todo.text}</li>;
}

function TodoList({ todos }) {
  return (
    <ul>
      {todos.map(todo => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </ul>
  );
}
\`\`\`

**3. Avoid inline object/array creation:**
\`\`\`jsx
// ❌ Bad: Creates new object on every render
<MyComponent style={{ color: 'red' }} />

// ✅ Good: Define outside or use useMemo
const styles = { color: 'red' };
<MyComponent style={styles} />
\`\`\`

**4. Use virtualization for very long lists** (1000+ items)
- Libraries like react-window or react-virtualized
- Only render visible items

## Your Task

Create an optimized list component:

**1. Component \`TaskItem\`:**
- Accepts \`task\` prop (object with id, title, priority)
- Returns an \`<li>\` with className "task-item"
- Display "{title} - Priority: {priority}"

**2. Component \`TaskList\`:**
- Accepts \`tasks\` prop (array of task objects)
- Returns a \`<div>\` with className "task-list"
- Include an \`<h2>\` with text "Tasks ({count})" where count is tasks.length
- Create a \`<ul>\` that maps over tasks
- Render TaskItem for each task, using task.id as key
- Pass the entire task object as a prop

Export both components.
        `,
        hint: "Extract TaskItem to a separate component. In TaskList, use <TaskItem key={task.id} task={task} />",
        starterCode: `import React from 'react';

// Create TaskItem component here


// Create TaskList component here


export { TaskItem };
export default TaskList;`,
        solution: `import React from 'react';

function TaskItem({ task }) {
  return (
    <li className="task-item">
      {task.title} - Priority: {task.priority}
    </li>
  );
}

function TaskList({ tasks }) {
  return (
    <div className="task-list">
      <h2>Tasks ({tasks.length})</h2>
      <ul>
        {tasks.map(task => (
          <TaskItem key={task.id} task={task} />
        ))}
      </ul>
    </div>
  );
}

export { TaskItem };
export default TaskList;`,
        testCases: [
          {
            id: "test-1",
            description: "TaskItem should exist",
            testFunction: `typeof TaskItem === 'function'`,
          },
          {
            id: "test-2",
            description: "TaskItem should render an li with className 'task-item'",
            testFunction: `
              const task = { id: 1, title: 'Test Task', priority: 'High' };
              const { container } = render(<TaskItem task={task} />);
              container.querySelector('li.task-item') !== null
            `,
          },
          {
            id: "test-3",
            description: "TaskItem should display task info correctly",
            testFunction: `
              const task = { id: 1, title: 'Test Task', priority: 'High' };
              const { getByText } = render(<TaskItem task={task} />);
              getByText('Test Task - Priority: High') !== null
            `,
          },
          {
            id: "test-4",
            description: "TaskList should render a div with className 'task-list'",
            testFunction: `
              const tasks = [{ id: 1, title: 'Task', priority: 'Low' }];
              const { container } = render(<TaskList tasks={tasks} />);
              container.querySelector('div.task-list') !== null
            `,
          },
          {
            id: "test-5",
            description: "TaskList should display task count in heading",
            testFunction: `
              const tasks = [
                { id: 1, title: 'Task 1', priority: 'Low' },
                { id: 2, title: 'Task 2', priority: 'High' },
                { id: 3, title: 'Task 3', priority: 'Medium' }
              ];
              const { getByText } = render(<TaskList tasks={tasks} />);
              getByText('Tasks (3)') !== null
            `,
          },
          {
            id: "test-6",
            description: "TaskList should render TaskItem components",
            testFunction: `
              const tasks = [
                { id: 1, title: 'Task 1', priority: 'Low' },
                { id: 2, title: 'Task 2', priority: 'High' }
              ];
              const { container } = render(<TaskList tasks={tasks} />);
              const items = container.querySelectorAll('.task-item');
              items.length === 2
            `,
          },
        ],
        language: "jsx",
      },
    ],
  },

  // Lesson 10: Index as Key (Anti-pattern) - DEPRECATED, moved to Lesson 2
  {
    id: "lists-keys-10-deprecated",
    moduleId: "module-1-5",
    title: "Index as Key: The Anti-pattern (Legacy)",
    order: 10,
    xpReward: 150,
    difficulty: "intermediate",
    steps: [
      {
        id: "lists-keys-09-step-1",
        order: 1,
        instruction: `
# Index as Key: The Anti-pattern

Using array index as a key is tempting but can cause serious bugs. Let's understand why and when it's acceptable.

**❌ Why index as key is problematic:**

When items are reordered, added, or removed, using index as key can cause:
- Incorrect component state
- Performance issues
- UI bugs

\`\`\`jsx
// ❌ Bad: Using index as key
{items.map((item, index) => (
  <TodoItem key={index} todo={item} />
))}
\`\`\`

**Example of the bug:**
\`\`\`jsx
// Initial list: ['A', 'B', 'C']
// Keys:         [0,   1,   2  ]

// After removing 'A': ['B', 'C']
// Keys:              [0,   1  ]

// React thinks item at key 0 changed from 'A' to 'B'
// This can preserve wrong state or cause render issues
\`\`\`

**✅ When index as key IS acceptable:**
- List never reorders
- List never adds/removes items
- Items have no state
- List is static

**✅ Best practice: Use stable unique IDs**
\`\`\`jsx
// Good: Using stable ID from data
{items.map(item => (
  <TodoItem key={item.id} todo={item} />
))}

// Good: Generate stable IDs (like with nanoid or uuid)
const itemsWithIds = items.map(item => ({
  ...item,
  id: nanoid()
}));
\`\`\`

## Your Task

Create a component that demonstrates proper key usage:

**Component \`MessageList\`:**
1. Destructure \`messages\` from props
2. Each message has: id, text, timestamp
3. Return a \`<div>\` with className "message-list"
4. Include an \`<h2>\` with text "Messages"
5. Create a \`<ul>\` that maps over messages
6. Each \`<li>\` should:
   - Use message.id as the key (NOT index)
   - Have className "message"
   - Display the message.text
   - Display the timestamp in a \`<small>\` element

**Important:** Do NOT use index as the key!
        `,
        hint: "Use messages.map(message => <li key={message.id}>...). Never use map((message, index) => <li key={index}>).",
        starterCode: `import React from 'react';

function MessageList({ messages }) {
  return (
    // Your code here
  );
}

export default MessageList;`,
        solution: `import React from 'react';

function MessageList({ messages }) {
  return (
    <div className="message-list">
      <h2>Messages</h2>
      <ul>
        {messages.map(message => (
          <li key={message.id} className="message">
            {message.text}
            <small>{message.timestamp}</small>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MessageList;`,
        testCases: [
          {
            id: "test-1",
            description: "Should render a div with className 'message-list'",
            testFunction: `
              const messages = [{ id: 1, text: 'Hello', timestamp: '10:00' }];
              const { container } = render(<MessageList messages={messages} />);
              container.querySelector('div.message-list') !== null
            `,
          },
          {
            id: "test-2",
            description: "Should render an h2 with 'Messages'",
            testFunction: `
              const messages = [{ id: 1, text: 'Hello', timestamp: '10:00' }];
              const { getByText } = render(<MessageList messages={messages} />);
              getByText('Messages') !== null
            `,
          },
          {
            id: "test-3",
            description: "Should render li elements with className 'message'",
            testFunction: `
              const messages = [
                { id: 1, text: 'Hello', timestamp: '10:00' },
                { id: 2, text: 'World', timestamp: '10:05' }
              ];
              const { container } = render(<MessageList messages={messages} />);
              const items = container.querySelectorAll('li.message');
              items.length === 2
            `,
          },
          {
            id: "test-4",
            description: "Should display message text",
            testFunction: `
              const messages = [{ id: 1, text: 'Hello World', timestamp: '10:00' }];
              const { getByText } = render(<MessageList messages={messages} />);
              getByText('Hello World') !== null
            `,
          },
          {
            id: "test-5",
            description: "Should display timestamp in small element",
            testFunction: `
              const messages = [{ id: 1, text: 'Hello', timestamp: '10:00' }];
              const { container } = render(<MessageList messages={messages} />);
              const small = container.querySelector('small');
              small !== null && small.textContent === '10:00'
            `,
          },
          {
            id: "test-6",
            description: "Should use message.id as key (NOT index)",
            testFunction: `
              code.includes('key={message.id}') && !code.includes('key={index}') && !code.includes(', index)')
            `,
          },
        ],
        language: "jsx",
      },
    ],
  },

  // Lesson 11: Complex List Items
  {
    id: "lists-keys-11",
    moduleId: "module-1-5",
    title: "Rendering Complex List Items",
    order: 11,
    xpReward: 200,
    difficulty: "intermediate",
    steps: [
      {
        id: "lists-keys-10-step-1",
        order: 1,
        instruction: `
# Rendering Complex List Items

Real-world lists often contain complex data with multiple fields, nested structures, and conditional rendering. Let's combine everything we've learned.

\`\`\`jsx
function UserCard({ user }) {
  return (
    <div className="user-card">
      <img src={user.avatar} alt={user.name} />
      <h3>{user.name}</h3>
      <p>{user.email}</p>
      {user.isVerified && <span className="badge">Verified</span>}
      <div className="tags">
        {user.tags.map(tag => (
          <span key={tag} className="tag">{tag}</span>
        ))}
      </div>
    </div>
  );
}

function UserList({ users }) {
  return (
    <div className="user-list">
      {users
        .filter(user => user.isActive)
        .sort((a, b) => a.name.localeCompare(b.name))
        .map(user => (
          <UserCard key={user.id} user={user} />
        ))}
    </div>
  );
}
\`\`\`

**This example combines:**
- Component extraction (UserCard)
- Filtering (isActive users)
- Sorting (alphabetically by name)
- Conditional rendering (verified badge)
- Nested lists (tags)
- Proper keys at all levels

## Your Task

Create a comprehensive product listing system:

**1. Component \`ProductCard\`:**
- Accepts \`product\` prop with: id, name, price, rating, inStock, tags (array)
- Returns a \`<div>\` with className "product-card"
- Contains:
  - \`<h3>\` with product name
  - \`<p>\` with className "price" showing "\${price}"
  - \`<p>\` with className "rating" showing "Rating: {rating}/5"
  - If inStock is true, show \`<span>\` with className "in-stock" and text "Available"
  - If inStock is false, show \`<span>\` with className "out-of-stock" and text "Out of Stock"
  - \`<div>\` with className "tags" containing:
    - Map over tags to render \`<span>\` with className "tag", key={tag}, displaying the tag

**2. Component \`ProductCatalog\`:**
- Accepts \`products\` and \`minRating\` props
- Returns a \`<div>\` with className "product-catalog"
- Contains an \`<h2>\` with text "Featured Products"
- Filters products with rating >= minRating
- Sorts by rating (highest first)
- Maps to ProductCard components with key={product.id}

Export both components.
        `,
        hint: "Create ProductCard first with all its logic. Then in ProductCatalog, chain .filter(), .sort(), and .map().",
        starterCode: `import React from 'react';

// Create ProductCard component here


// Create ProductCatalog component here


export { ProductCard };
export default ProductCatalog;`,
        solution: `import React from 'react';

function ProductCard({ product }) {
  return (
    <div className="product-card">
      <h3>{product.name}</h3>
      <p className="price">$\{product.price}</p>
      <p className="rating">Rating: {product.rating}/5</p>
      {product.inStock ? (
        <span className="in-stock">Available</span>
      ) : (
        <span className="out-of-stock">Out of Stock</span>
      )}
      <div className="tags">
        {product.tags.map(tag => (
          <span key={tag} className="tag">{tag}</span>
        ))}
      </div>
    </div>
  );
}

function ProductCatalog({ products, minRating }) {
  return (
    <div className="product-catalog">
      <h2>Featured Products</h2>
      {products
        .filter(product => product.rating >= minRating)
        .sort((a, b) => b.rating - a.rating)
        .map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
    </div>
  );
}

export { ProductCard };
export default ProductCatalog;`,
        testCases: [
          {
            id: "test-1",
            description: "ProductCard should exist",
            testFunction: `typeof ProductCard === 'function'`,
          },
          {
            id: "test-2",
            description: "ProductCard should render product information",
            testFunction: `
              const product = { id: 1, name: 'Laptop', price: 999, rating: 4.5, inStock: true, tags: ['Tech', 'Sale'] };
              const { getByText, container } = render(<ProductCard product={product} />);
              getByText('Laptop') !== null &&
              container.querySelector('.price').textContent === '$999' &&
              container.querySelector('.rating').textContent === 'Rating: 4.5/5'
            `,
          },
          {
            id: "test-3",
            description: "ProductCard should show 'Available' when inStock is true",
            testFunction: `
              const product = { id: 1, name: 'Laptop', price: 999, rating: 4.5, inStock: true, tags: [] };
              const { container } = render(<ProductCard product={product} />);
              const inStock = container.querySelector('.in-stock');
              inStock !== null && inStock.textContent === 'Available'
            `,
          },
          {
            id: "test-4",
            description: "ProductCard should show 'Out of Stock' when inStock is false",
            testFunction: `
              const product = { id: 1, name: 'Laptop', price: 999, rating: 4.5, inStock: false, tags: [] };
              const { container } = render(<ProductCard product={product} />);
              const outOfStock = container.querySelector('.out-of-stock');
              outOfStock !== null && outOfStock.textContent === 'Out of Stock'
            `,
          },
          {
            id: "test-5",
            description: "ProductCard should render tags",
            testFunction: `
              const product = { id: 1, name: 'Laptop', price: 999, rating: 4.5, inStock: true, tags: ['Tech', 'Sale', 'New'] };
              const { container } = render(<ProductCard product={product} />);
              const tags = container.querySelectorAll('.tag');
              tags.length === 3 && tags[0].textContent === 'Tech'
            `,
          },
          {
            id: "test-6",
            description: "ProductCatalog should filter by minRating",
            testFunction: `
              const products = [
                { id: 1, name: 'Good', price: 100, rating: 4.5, inStock: true, tags: [] },
                { id: 2, name: 'Bad', price: 50, rating: 2.0, inStock: true, tags: [] },
                { id: 3, name: 'Great', price: 150, rating: 5.0, inStock: true, tags: [] }
              ];
              const { container, queryByText } = render(<ProductCatalog products={products} minRating={4.0} />);
              const cards = container.querySelectorAll('.product-card');
              cards.length === 2 && queryByText('Bad') === null
            `,
          },
          {
            id: "test-7",
            description: "ProductCatalog should sort by rating (highest first)",
            testFunction: `
              const products = [
                { id: 1, name: 'Medium', price: 100, rating: 3.5, inStock: true, tags: [] },
                { id: 2, name: 'Best', price: 200, rating: 5.0, inStock: true, tags: [] },
                { id: 3, name: 'Good', price: 150, rating: 4.0, inStock: true, tags: [] }
              ];
              const { container } = render(<ProductCatalog products={products} minRating={0} />);
              const cards = container.querySelectorAll('.product-card h3');
              cards[0].textContent === 'Best' && cards[1].textContent === 'Good' && cards[2].textContent === 'Medium'
            `,
          },
          {
            id: "test-8",
            description: "ProductCatalog should use product.id as key",
            testFunction: `code.includes('key={product.id}')`,
          },
        ],
        language: "jsx",
      },
    ],
  },
];
