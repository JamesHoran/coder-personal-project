/**
 * React Course - Phase 2: Practitioner Mastery
 * Module 2.3: Performance Optimization (15 lessons)
 *
 * This module teaches advanced performance optimization techniques including
 * memoization, code splitting, lazy loading, and profiling tools.
 */

import { InteractiveLesson } from "@/types";

export const performanceOptimizationLessons: InteractiveLesson[] = [
  // Lesson 1: React.memo Introduction
  {
    id: "perf-opt-01",
    moduleId: "module-2-3",
    title: "React.memo Introduction",
    order: 1,
    xpReward: 200,
    difficulty: "intermediate",
    steps: [
      {
        id: "perf-opt-01-step-1",
        order: 1,
        instruction: `
# React.memo Introduction

**React.memo** is a higher-order component (HOC) that prevents unnecessary re-renders by memoizing the component. It only re-renders when props actually change.

\`\`\`jsx
import React from 'react';

// Without React.memo - re-renders every time parent re-renders
function ExpensiveComponent({ data }) {
  console.log('Rendering...');
  return <div>{data}</div>;
}

// With React.memo - only re-renders when data changes
const MemoizedComponent = React.memo(function ExpensiveComponent({ data }) {
  console.log('Rendering...');
  return <div>{data}</div>;
});
\`\`\`

**How it works:**
- React.memo performs a **shallow comparison** of props
- If props haven't changed, React reuses the previous render result
- This can significantly improve performance for expensive components

**When to use React.memo:**
- Components that render often with the same props
- Pure functional components (output depends only on props)
- Components with expensive rendering logic

## Your Task

Create a component named \`UserDisplay\` that uses React.memo:

1. Create a function component that accepts \`name\` and \`email\` props
2. Return a \`<div>\` with className "user-display"
3. Display an \`<h2>\` with the name
4. Display a \`<p>\` with the email
5. Wrap the component with \`React.memo()\`
6. Export the memoized component as default

**Bonus:** Add a console.log to see when the component renders.
        `,
        hint: "Use const MemoizedComponent = React.memo(function Component({props}) { ... }). Or export React.memo at the end.",
        starterCode: `import React from 'react';

// Create your UserDisplay component here and wrap it with React.memo


export default UserDisplay;`,
        solution: `import React from 'react';

const UserDisplay = React.memo(function UserDisplay({ name, email }) {
  console.log('UserDisplay rendering');

  return (
    <div className="user-display">
      <h2>{name}</h2>
      <p>{email}</p>
    </div>
  );
});

export default UserDisplay;`,
        testCases: [
          {
            id: "test-1",
            description: "UserDisplay component should exist",
            testFunction: `typeof UserDisplay === 'object' || typeof UserDisplay === 'function'`,
          },
          {
            id: "test-2",
            description: "Component should be wrapped with React.memo",
            testFunction: `code.includes('React.memo')`,
          },
          {
            id: "test-3",
            description: "Should render name in an h2 element",
            testFunction: `
              const { container } = render(<UserDisplay name="Alice" email="alice@example.com" />);
              const h2 = container.querySelector('h2');
              h2 !== null && h2.textContent === 'Alice'
            `,
          },
          {
            id: "test-4",
            description: "Should render email in a p element",
            testFunction: `
              const { container } = render(<UserDisplay name="Alice" email="alice@example.com" />);
              const p = container.querySelector('p');
              p !== null && p.textContent === 'alice@example.com'
            `,
          },
          {
            id: "test-5",
            description: "Should have className 'user-display'",
            testFunction: `
              const { container } = render(<UserDisplay name="Alice" email="alice@example.com" />);
              container.querySelector('div.user-display') !== null
            `,
          },
        ],
        language: "jsx",
      },
    ],
  },

  // Lesson 2: When to Use React.memo
  {
    id: "perf-opt-02",
    moduleId: "module-2-3",
    title: "When to Use React.memo",
    order: 2,
    xpReward: 250,
    difficulty: "intermediate",
    steps: [
      {
        id: "perf-opt-02-step-1",
        order: 1,
        instruction: `
# When to Use React.memo

Not every component benefits from React.memo. Using it incorrectly can actually **hurt performance** by adding unnecessary comparison overhead.

## Use React.memo When:

✅ **Component renders often with same props**
\`\`\`jsx
// In a list where items rarely change
const ListItem = React.memo(({ item }) => <li>{item.name}</li>);
\`\`\`

✅ **Rendering is expensive**
\`\`\`jsx
// Complex calculations or large DOM trees
const Chart = React.memo(({ data }) => {
  // Expensive chart rendering
});
\`\`\`

✅ **Component is pure (output depends only on props)**
\`\`\`jsx
const PureButton = React.memo(({ label, onClick }) => (
  <button onClick={onClick}>{label}</button>
));
\`\`\`

## Don't Use React.memo When:

❌ **Props change frequently**
❌ **Component is already fast to render**
❌ **Component has complex prop comparisons needed**

## Custom Comparison Function

You can provide a custom comparison function as a second argument:

\`\`\`jsx
const MyComponent = React.memo(
  ({ user }) => <div>{user.name}</div>,
  (prevProps, nextProps) => {
    // Return true if props are equal (skip re-render)
    // Return false if props changed (re-render)
    return prevProps.user.id === nextProps.user.id;
  }
);
\`\`\`

## Your Task

Create a \`ProductCard\` component with custom comparison logic:

1. Create a component that accepts \`product\` (object with id, name, price) and \`onView\` (function)
2. Display the product name in an \`<h3>\`
3. Display the price in a \`<p>\` with text "Price: $" concatenated with product.price
4. Add a button "View Details" that calls \`onView\` when clicked
5. Wrap with React.memo and a **custom comparison function**
6. The comparison should only re-render if \`product.id\` changes (ignore onView changes)
        `,
        hint: "React.memo takes two arguments: the component and a comparison function. The comparison function returns true to SKIP re-render. Compare prevProps.product.id with nextProps.product.id.",
        starterCode: `import React from 'react';

const ProductCard = React.memo(
  function ProductCard({ product, onView }) {
    return (
      <div className="product-card">
        {/* Add your JSX here */}
      </div>
    );
  },
  (prevProps, nextProps) => {
    // Add custom comparison logic here
    // Return true to skip re-render, false to re-render
  }
);

export default ProductCard;`,
        solution: `import React from 'react';

const ProductCard = React.memo(
  function ProductCard({ product, onView }) {
    return (
      <div className="product-card">
        <h3>{product.name}</h3>
        <p>Price: \${product.price}</p>
        <button onClick={onView}>View Details</button>
      </div>
    );
  },
  (prevProps, nextProps) => {
    // Return true if props are equal (skip re-render)
    return prevProps.product.id === nextProps.product.id;
  }
);

export default ProductCard;`,
        testCases: [
          {
            id: "test-1",
            description: "Component should be wrapped with React.memo",
            testFunction: `code.includes('React.memo')`,
          },
          {
            id: "test-2",
            description: "Should have a custom comparison function",
            testFunction: `code.includes('prevProps') && code.includes('nextProps')`,
          },
          {
            id: "test-3",
            description: "Should display product name in h3",
            testFunction: `
              const product = { id: 1, name: 'Laptop', price: 999 };
              const { container } = render(<ProductCard product={product} onView={() => {}} />);
              const h3 = container.querySelector('h3');
              h3 !== null && h3.textContent === 'Laptop'
            `,
          },
          {
            id: "test-4",
            description: "Should display price with correct format",
            testFunction: `
              const product = { id: 1, name: 'Laptop', price: 999 };
              const { getByText } = render(<ProductCard product={product} onView={() => {}} />);
              getByText('Price: $999') !== null
            `,
          },
          {
            id: "test-5",
            description: "Should render a button with 'View Details' text",
            testFunction: `
              const product = { id: 1, name: 'Laptop', price: 999 };
              const { getByText } = render(<ProductCard product={product} onView={() => {}} />);
              const button = getByText('View Details');
              button !== null && button.tagName === 'BUTTON'
            `,
          },
          {
            id: "test-6",
            description: "Comparison function should check product.id",
            testFunction: `code.includes('product.id')`,
          },
        ],
        language: "jsx",
      },
    ],
  },

  // Lesson 3: useMemo Hook
  {
    id: "perf-opt-03",
    moduleId: "module-2-3",
    title: "useMemo Hook",
    order: 3,
    xpReward: 250,
    difficulty: "intermediate",
    steps: [
      {
        id: "perf-opt-03-step-1",
        order: 1,
        instruction: `
# useMemo Hook

**useMemo** is a React Hook that memoizes (caches) the result of an expensive calculation. It only recalculates when dependencies change.

\`\`\`jsx
import { useMemo } from 'react';

function ExpensiveComponent({ items }) {
  // Without useMemo - recalculates on every render
  const total = items.reduce((sum, item) => sum + item.price, 0);

  // With useMemo - only recalculates when items change
  const total = useMemo(() => {
    return items.reduce((sum, item) => sum + item.price, 0);
  }, [items]);

  return <div>Total: {total}</div>;
}
\`\`\`

**Syntax:**
\`\`\`jsx
const memoizedValue = useMemo(() => {
  // Expensive calculation
  return result;
}, [dependency1, dependency2]);
\`\`\`

**Key points:**
- First argument: A function that returns the value to memoize
- Second argument: Dependency array (like useEffect)
- Returns the memoized value
- Only recalculates when dependencies change

**When to use useMemo:**
- Expensive calculations (filtering, sorting, transforming large arrays)
- Creating objects/arrays that are passed as props
- Preventing unnecessary child re-renders

## Your Task

Create a \`PriceCalculator\` component that uses useMemo:

1. Accept props: \`items\` (array of objects with price property) and \`taxRate\` (number)
2. Use \`useMemo\` to calculate the subtotal (sum of all item prices)
3. Use \`useMemo\` to calculate the tax (subtotal * taxRate)
4. Use \`useMemo\` to calculate the total (subtotal + tax)
5. Return a \`<div>\` with className "price-calculator"
6. Display three \`<p>\` elements showing (with $ sign):
   - "Subtotal: $" followed by subtotal value (use \`Subtotal: \${subtotal}\`)
   - "Tax: $" followed by tax value (use \`Tax: \${tax}\`)
   - "Total: $" followed by total value (use \`Total: \${total}\`)
        `,
        hint: "Use three separate useMemo calls. First memoize subtotal with [items] dependency. Then memoize tax with [subtotal, taxRate]. Finally memoize total with [subtotal, tax].",
        starterCode: `import React, { useMemo } from 'react';

function PriceCalculator({ items, taxRate }) {
  // Calculate subtotal using useMemo


  // Calculate tax using useMemo


  // Calculate total using useMemo


  return (
    <div className="price-calculator">
      {/* Display the values */}
    </div>
  );
}

export default PriceCalculator;`,
        solution: `import React, { useMemo } from 'react';

function PriceCalculator({ items, taxRate }) {
  const subtotal = useMemo(() => {
    return items.reduce((sum, item) => sum + item.price, 0);
  }, [items]);

  const tax = useMemo(() => {
    return subtotal * taxRate;
  }, [subtotal, taxRate]);

  const total = useMemo(() => {
    return subtotal + tax;
  }, [subtotal, tax]);

  return (
    <div className="price-calculator">
      <p>Subtotal: \${subtotal}</p>
      <p>Tax: \${tax}</p>
      <p>Total: \${total}</p>
    </div>
  );
}

export default PriceCalculator;`,
        testCases: [
          {
            id: "test-1",
            description: "Component should use useMemo",
            testFunction: `code.includes('useMemo')`,
          },
          {
            id: "test-2",
            description: "Should import useMemo from react",
            testFunction: `code.includes('useMemo') && code.includes("from 'react'")`,
          },
          {
            id: "test-3",
            description: "Should calculate and display correct subtotal",
            testFunction: `
              const items = [{ price: 10 }, { price: 20 }, { price: 30 }];
              const { getByText } = render(<PriceCalculator items={items} taxRate={0.1} />);
              getByText('Subtotal: $60') !== null
            `,
          },
          {
            id: "test-4",
            description: "Should calculate and display correct tax",
            testFunction: `
              const items = [{ price: 100 }];
              const { getByText } = render(<PriceCalculator items={items} taxRate={0.2} />);
              getByText('Tax: $20') !== null
            `,
          },
          {
            id: "test-5",
            description: "Should calculate and display correct total",
            testFunction: `
              const items = [{ price: 100 }];
              const { getByText } = render(<PriceCalculator items={items} taxRate={0.1} />);
              getByText('Total: $110') !== null
            `,
          },
          {
            id: "test-6",
            description: "Should use dependency arrays in useMemo",
            testFunction: `code.includes('[items]') || code.includes('[subtotal') || code.includes('[tax')`,
          },
        ],
        language: "jsx",
      },
    ],
  },

  // Lesson 4: useMemo Use Cases
  {
    id: "perf-opt-04",
    moduleId: "module-2-3",
    title: "useMemo Use Cases",
    order: 4,
    xpReward: 300,
    difficulty: "intermediate",
    steps: [
      {
        id: "perf-opt-04-step-1",
        order: 1,
        instruction: `
# useMemo Use Cases

Let's explore common scenarios where useMemo provides real performance benefits.

## Use Case 1: Filtering Large Lists

\`\`\`jsx
function UserList({ users, searchTerm }) {
  const filteredUsers = useMemo(() => {
    return users.filter(user =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [users, searchTerm]);

  return filteredUsers.map(user => <UserCard key={user.id} user={user} />);
}
\`\`\`

## Use Case 2: Sorting Data

\`\`\`jsx
function ProductTable({ products, sortBy }) {
  const sortedProducts = useMemo(() => {
    return [...products].sort((a, b) => {
      return a[sortBy] > b[sortBy] ? 1 : -1;
    });
  }, [products, sortBy]);

  return <Table data={sortedProducts} />;
}
\`\`\`

## Use Case 3: Complex Calculations

\`\`\`jsx
function Statistics({ data }) {
  const stats = useMemo(() => {
    const sum = data.reduce((a, b) => a + b, 0);
    const avg = sum / data.length;
    const max = Math.max(...data);
    const min = Math.min(...data);
    return { sum, avg, max, min };
  }, [data]);

  return <StatsDisplay stats={stats} />;
}
\`\`\`

## Use Case 4: Preventing Reference Changes

\`\`\`jsx
function Parent() {
  const [count, setCount] = useState(0);

  // Without useMemo - new object every render
  const config = { theme: 'dark', locale: 'en' };

  // With useMemo - same object reference
  const config = useMemo(() => ({
    theme: 'dark',
    locale: 'en'
  }), []);

  return <ChildComponent config={config} />;
}
\`\`\`

## Your Task

Create a \`DataAnalyzer\` component that demonstrates multiple useMemo use cases:

1. Accept props: \`numbers\` (array of numbers) and \`filterThreshold\` (number)
2. Use useMemo to filter numbers greater than or equal to filterThreshold
3. Use useMemo to calculate statistics from filtered numbers:
   - \`count\`: length of filtered array
   - \`sum\`: sum of filtered numbers
   - \`average\`: average of filtered numbers (sum / count)
4. Return a \`<div>\` with className "data-analyzer"
5. Display the statistics in separate \`<p>\` elements:
   - "Count: {count}"
   - "Sum: {sum}"
   - "Average: {average}"

**Tip:** Round the average to 2 decimal places using .toFixed(2)
        `,
        hint: "First useMemo filters the numbers. Second useMemo calculates statistics from the filtered numbers. Dependencies: first depends on [numbers, filterThreshold], second depends on [filteredNumbers].",
        starterCode: `import React, { useMemo } from 'react';

function DataAnalyzer({ numbers, filterThreshold }) {
  // Use useMemo to filter numbers


  // Use useMemo to calculate statistics


  return (
    <div className="data-analyzer">
      {/* Display statistics */}
    </div>
  );
}

export default DataAnalyzer;`,
        solution: `import React, { useMemo } from 'react';

function DataAnalyzer({ numbers, filterThreshold }) {
  const filteredNumbers = useMemo(() => {
    return numbers.filter(num => num >= filterThreshold);
  }, [numbers, filterThreshold]);

  const statistics = useMemo(() => {
    const count = filteredNumbers.length;
    const sum = filteredNumbers.reduce((acc, num) => acc + num, 0);
    const average = count > 0 ? sum / count : 0;
    return { count, sum, average };
  }, [filteredNumbers]);

  return (
    <div className="data-analyzer">
      <p>Count: {statistics.count}</p>
      <p>Sum: {statistics.sum}</p>
      <p>Average: {statistics.average.toFixed(2)}</p>
    </div>
  );
}

export default DataAnalyzer;`,
        testCases: [
          {
            id: "test-1",
            description: "Should use useMemo for filtering",
            testFunction: `code.includes('useMemo') && code.includes('filter')`,
          },
          {
            id: "test-2",
            description: "Should calculate correct count",
            testFunction: `
              const { getByText } = render(<DataAnalyzer numbers={[10, 20, 30, 5]} filterThreshold={15} />);
              getByText('Count: 2') !== null
            `,
          },
          {
            id: "test-3",
            description: "Should calculate correct sum",
            testFunction: `
              const { getByText } = render(<DataAnalyzer numbers={[10, 20, 30, 5]} filterThreshold={15} />);
              getByText('Sum: 50') !== null
            `,
          },
          {
            id: "test-4",
            description: "Should calculate correct average",
            testFunction: `
              const { getByText } = render(<DataAnalyzer numbers={[10, 20, 30]} filterThreshold={0} />);
              getByText('Average: 20.00') !== null
            `,
          },
          {
            id: "test-5",
            description: "Should handle empty filtered array",
            testFunction: `
              const { getByText } = render(<DataAnalyzer numbers={[1, 2, 3]} filterThreshold={100} />);
              getByText('Count: 0') !== null && getByText('Sum: 0') !== null
            `,
          },
          {
            id: "test-6",
            description: "Should use multiple useMemo calls",
            testFunction: `(code.match(/useMemo/g) || []).length >= 2`,
          },
        ],
        language: "jsx",
      },
    ],
  },

  // Lesson 5: useCallback Hook
  {
    id: "perf-opt-05",
    moduleId: "module-2-3",
    title: "useCallback Hook",
    order: 5,
    xpReward: 250,
    difficulty: "intermediate",
    steps: [
      {
        id: "perf-opt-05-step-1",
        order: 1,
        instruction: `
# useCallback Hook

**useCallback** is a React Hook that memoizes (caches) a function definition between re-renders. It returns the same function reference unless dependencies change.

\`\`\`jsx
import { useCallback } from 'react';

function ParentComponent() {
  const [count, setCount] = useState(0);

  // Without useCallback - new function every render
  const handleClick = () => {
    console.log('Clicked');
  };

  // With useCallback - same function reference
  const handleClick = useCallback(() => {
    console.log('Clicked');
  }, []);

  return <ChildComponent onClick={handleClick} />;
}
\`\`\`

**Why it matters:**
When you pass a function as a prop to a memoized child component, creating a new function reference on every render will cause the child to re-render unnecessarily.

\`\`\`jsx
// Without useCallback - ChildComponent re-renders every time
const MemoizedChild = React.memo(ChildComponent);

function Parent() {
  const handleClick = () => console.log('Click'); // New function every render
  return <MemoizedChild onClick={handleClick} />;
}

// With useCallback - ChildComponent only re-renders when needed
function Parent() {
  const handleClick = useCallback(() => {
    console.log('Click');
  }, []); // Same function reference
  return <MemoizedChild onClick={handleClick} />;
}
\`\`\`

**Syntax:**
\`\`\`jsx
const memoizedCallback = useCallback(
  () => {
    // Function body
  },
  [dependency1, dependency2]
);
\`\`\`

## Your Task

Create a \`TodoApp\` component that uses useCallback:

1. Import useState and useCallback
2. Create state: \`todos\` (array) initialized to []
3. Create state: \`inputValue\` (string) initialized to ""
4. Create \`handleInputChange\` function using useCallback that updates inputValue
5. Create \`handleAddTodo\` function using useCallback that:
   - Adds inputValue to todos array (if not empty)
   - Resets inputValue to ""
6. Return a \`<div>\` with className "todo-app" containing:
   - An \`<input>\` with value={inputValue} and onChange={handleInputChange}
   - A \`<button>\` with text "Add Todo" and onClick={handleAddTodo}
   - Display todos count in a \`<p>\`: "Todos: {todos.length}"
        `,
        hint: "useCallback syntax: const fn = useCallback(() => { ... }, [dependencies]). handleInputChange depends on nothing ([]). handleAddTodo depends on [inputValue, todos].",
        starterCode: `import React, { useState, useCallback } from 'react';

function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');

  // Create handleInputChange using useCallback


  // Create handleAddTodo using useCallback


  return (
    <div className="todo-app">
      {/* Add your JSX here */}
    </div>
  );
}

export default TodoApp;`,
        solution: `import React, { useState, useCallback } from 'react';

function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = useCallback((e) => {
    setInputValue(e.target.value);
  }, []);

  const handleAddTodo = useCallback(() => {
    if (inputValue.trim()) {
      setTodos([...todos, inputValue]);
      setInputValue('');
    }
  }, [inputValue, todos]);

  return (
    <div className="todo-app">
      <input value={inputValue} onChange={handleInputChange} />
      <button onClick={handleAddTodo}>Add Todo</button>
      <p>Todos: {todos.length}</p>
    </div>
  );
}

export default TodoApp;`,
        testCases: [
          {
            id: "test-1",
            description: "Should import useCallback",
            testFunction: `code.includes('useCallback')`,
          },
          {
            id: "test-2",
            description: "Should use useCallback for handleInputChange",
            testFunction: `code.includes('useCallback') && code.includes('handleInputChange')`,
          },
          {
            id: "test-3",
            description: "Should use useCallback for handleAddTodo",
            testFunction: `code.includes('useCallback') && code.includes('handleAddTodo')`,
          },
          {
            id: "test-4",
            description: "Should render an input element",
            testFunction: `
              const { container } = render(<TodoApp />);
              container.querySelector('input') !== null
            `,
          },
          {
            id: "test-5",
            description: "Should render a button with text 'Add Todo'",
            testFunction: `
              const { getByText } = render(<TodoApp />);
              const button = getByText('Add Todo');
              button !== null && button.tagName === 'BUTTON'
            `,
          },
          {
            id: "test-6",
            description: "Should display todos count starting at 0",
            testFunction: `
              const { getByText } = render(<TodoApp />);
              getByText('Todos: 0') !== null
            `,
          },
        ],
        language: "jsx",
      },
    ],
  },

  // Lesson 6: useCallback Use Cases
  {
    id: "perf-opt-06",
    moduleId: "module-2-3",
    title: "useCallback Use Cases",
    order: 6,
    xpReward: 300,
    difficulty: "intermediate",
    steps: [
      {
        id: "perf-opt-06-step-1",
        order: 1,
        instruction: `
# useCallback Use Cases

Let's explore common scenarios where useCallback is essential for performance optimization.

## Use Case 1: Optimizing Child Components

\`\`\`jsx
const MemoizedButton = React.memo(function Button({ onClick, label }) {
  console.log('Button render');
  return <button onClick={onClick}>{label}</button>;
});

function Parent() {
  const [count, setCount] = useState(0);

  // Button re-renders every time - BAD
  const handleClick = () => console.log('Clicked');

  // Button doesn't re-render unnecessarily - GOOD
  const handleClick = useCallback(() => {
    console.log('Clicked');
  }, []);

  return (
    <>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <MemoizedButton onClick={handleClick} label="Click me" />
    </>
  );
}
\`\`\`

## Use Case 2: Event Handlers with Dependencies

\`\`\`jsx
function SearchBox({ onSearch }) {
  const [query, setQuery] = useState('');
  const [filters, setFilters] = useState({ category: 'all' });

  const handleSearch = useCallback(() => {
    onSearch(query, filters);
  }, [query, filters, onSearch]);

  return (
    <div>
      <input value={query} onChange={e => setQuery(e.target.value)} />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
}
\`\`\`

## Use Case 3: Custom Hooks

\`\`\`jsx
function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  const updateValue = useCallback(() => {
    setDebouncedValue(value);
  }, [value]);

  useEffect(() => {
    const timer = setTimeout(updateValue, delay);
    return () => clearTimeout(timer);
  }, [updateValue, delay]);

  return debouncedValue;
}
\`\`\`

## Use Case 4: useEffect Dependencies

\`\`\`jsx
function DataFetcher({ userId }) {
  const [data, setData] = useState(null);

  const fetchData = useCallback(async () => {
    const response = await fetch(\`/api/users/\${userId}\`);
    const json = await response.json();
    setData(json);
  }, [userId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]); // Safe to use as dependency

  return <div>{data?.name}</div>;
}
\`\`\`

## Your Task

Create a \`SearchableList\` component that demonstrates useCallback optimization:

1. Accept props: \`items\` (array of strings)
2. Create state: \`searchTerm\` initialized to ""
3. Create a **memoized child component** \`SearchBar\` that:
   - Accepts \`value\` and \`onChange\` props
   - Renders an \`<input>\` with type="text"
   - Wrap with React.memo
4. In the main component:
   - Use useCallback for \`handleSearchChange\` function
   - Use useMemo to filter items based on searchTerm (case-insensitive)
5. Return a \`<div>\` with className "searchable-list" containing:
   - The SearchBar component
   - A \`<p>\` showing "Results: {filteredItems.length}"
   - A \`<ul>\` with filtered items

Export both SearchBar and SearchableList.
        `,
        hint: "Create SearchBar first with React.memo. In SearchableList, use useCallback for the change handler (depends on nothing). Use useMemo to filter items (depends on [items, searchTerm]).",
        starterCode: `import React, { useState, useCallback, useMemo } from 'react';

// Create memoized SearchBar component here


// Create SearchableList component
function SearchableList({ items }) {
  const [searchTerm, setSearchTerm] = useState('');

  // Create handleSearchChange with useCallback


  // Filter items using useMemo


  return (
    <div className="searchable-list">
      {/* Add your JSX here */}
    </div>
  );
}

export { SearchBar };
export default SearchableList;`,
        solution: `import React, { useState, useCallback, useMemo } from 'react';

const SearchBar = React.memo(function SearchBar({ value, onChange }) {
  return <input type="text" value={value} onChange={onChange} />;
});

function SearchableList({ items }) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = useCallback((e) => {
    setSearchTerm(e.target.value);
  }, []);

  const filteredItems = useMemo(() => {
    return items.filter(item =>
      item.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [items, searchTerm]);

  return (
    <div className="searchable-list">
      <SearchBar value={searchTerm} onChange={handleSearchChange} />
      <p>Results: {filteredItems.length}</p>
      <ul>
        {filteredItems.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

export { SearchBar };
export default SearchableList;`,
        testCases: [
          {
            id: "test-1",
            description: "SearchBar should be wrapped with React.memo",
            testFunction: `code.includes('React.memo') && code.includes('SearchBar')`,
          },
          {
            id: "test-2",
            description: "Should use useCallback for handleSearchChange",
            testFunction: `code.includes('useCallback') && code.includes('handleSearchChange')`,
          },
          {
            id: "test-3",
            description: "Should use useMemo for filtering",
            testFunction: `code.includes('useMemo') && code.includes('filter')`,
          },
          {
            id: "test-4",
            description: "Should render SearchBar component",
            testFunction: `
              const { container } = render(<SearchableList items={['Apple', 'Banana']} />);
              container.querySelector('input[type="text"]') !== null
            `,
          },
          {
            id: "test-5",
            description: "Should display results count",
            testFunction: `
              const { getByText } = render(<SearchableList items={['Apple', 'Banana', 'Cherry']} />);
              getByText('Results: 3') !== null
            `,
          },
          {
            id: "test-6",
            description: "Should render all items initially",
            testFunction: `
              const { container } = render(<SearchableList items={['Apple', 'Banana']} />);
              const items = container.querySelectorAll('li');
              items.length === 2
            `,
          },
        ],
        language: "jsx",
      },
    ],
  },

  // Lesson 7: Preventing Re-renders
  {
    id: "perf-opt-07",
    moduleId: "module-2-3",
    title: "Preventing Re-renders",
    order: 7,
    xpReward: 300,
    difficulty: "intermediate",
    steps: [
      {
        id: "perf-opt-07-step-1",
        order: 1,
        instruction: `
# Preventing Re-renders

Understanding and preventing unnecessary re-renders is crucial for React performance. Let's combine all optimization techniques.

## Common Re-render Triggers:

1. **State Changes** - Component re-renders when its state changes
2. **Props Changes** - Component re-renders when props change
3. **Parent Re-renders** - Child re-renders when parent re-renders (unless optimized)
4. **Context Changes** - Components using context re-render when context value changes

## Optimization Strategy:

\`\`\`jsx
// ❌ BAD: Everything re-renders
function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Header />
      <Counter count={count} onChange={setCount} />
      <ExpensiveComponent />
    </>
  );
}

// ✅ GOOD: Only Counter re-renders when count changes
const MemoizedHeader = React.memo(Header);
const MemoizedExpensive = React.memo(ExpensiveComponent);

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <MemoizedHeader />
      <Counter count={count} onChange={setCount} />
      <MemoizedExpensive />
    </>
  );
}
\`\`\`

## Preventing Object/Array Prop Re-renders:

\`\`\`jsx
function Parent() {
  const [count, setCount] = useState(0);

  // ❌ BAD: New object every render
  const config = { theme: 'dark', locale: 'en' };

  // ✅ GOOD: Memoized object
  const config = useMemo(() => ({
    theme: 'dark',
    locale: 'en'
  }), []);

  return <Child config={config} />;
}
\`\`\`

## Your Task

Create an optimized \`Dashboard\` component:

1. Create three memoized child components:
   - \`Header\`: Takes \`title\` prop, renders \`<h1>{title}</h1>\`
   - \`Stats\`: Takes \`data\` prop (object), renders \`<div>Users: {data.users}</div>\`
   - \`Actions\`: Takes \`onRefresh\` prop, renders \`<button onClick={onRefresh}>Refresh</button>\`

2. Create the main \`Dashboard\` component:
   - State: \`refreshCount\` initialized to 0
   - Use useMemo to create a \`stats\` object: \`{ users: 1000, posts: 5000 }\`
   - Use useCallback for \`handleRefresh\` that increments refreshCount
   - Return a \`<div>\` with className "dashboard" containing:
     - Header with title "Dashboard"
     - Stats with the stats object
     - Actions with the handleRefresh callback
     - A \`<p>\` showing "Refreshed: {refreshCount} times"

Export all components.
        `,
        hint: "Wrap each child component with React.memo. Use useMemo for the stats object with [] dependencies. Use useCallback for handleRefresh with [refreshCount] dependency.",
        starterCode: `import React, { useState, useMemo, useCallback } from 'react';

// Create memoized Header component


// Create memoized Stats component


// Create memoized Actions component


// Create Dashboard component
function Dashboard() {
  const [refreshCount, setRefreshCount] = useState(0);

  // Create stats object with useMemo


  // Create handleRefresh with useCallback


  return (
    <div className="dashboard">
      {/* Add your components here */}
    </div>
  );
}

export { Header, Stats, Actions };
export default Dashboard;`,
        solution: `import React, { useState, useMemo, useCallback } from 'react';

const Header = React.memo(function Header({ title }) {
  return <h1>{title}</h1>;
});

const Stats = React.memo(function Stats({ data }) {
  return <div>Users: {data.users}</div>;
});

const Actions = React.memo(function Actions({ onRefresh }) {
  return <button onClick={onRefresh}>Refresh</button>;
});

function Dashboard() {
  const [refreshCount, setRefreshCount] = useState(0);

  const stats = useMemo(() => ({
    users: 1000,
    posts: 5000
  }), []);

  const handleRefresh = useCallback(() => {
    setRefreshCount(refreshCount + 1);
  }, [refreshCount]);

  return (
    <div className="dashboard">
      <Header title="Dashboard" />
      <Stats data={stats} />
      <Actions onRefresh={handleRefresh} />
      <p>Refreshed: {refreshCount} times</p>
    </div>
  );
}

export { Header, Stats, Actions };
export default Dashboard;`,
        testCases: [
          {
            id: "test-1",
            description: "All child components should be memoized",
            testFunction: `(code.match(/React\\.memo/g) || []).length >= 3`,
          },
          {
            id: "test-2",
            description: "Should use useMemo for stats object",
            testFunction: `code.includes('useMemo') && code.includes('users')`,
          },
          {
            id: "test-3",
            description: "Should use useCallback for handleRefresh",
            testFunction: `code.includes('useCallback') && code.includes('handleRefresh')`,
          },
          {
            id: "test-4",
            description: "Header should display title",
            testFunction: `
              const { container } = render(<Dashboard />);
              const h1 = container.querySelector('h1');
              h1 !== null && h1.textContent === 'Dashboard'
            `,
          },
          {
            id: "test-5",
            description: "Stats should display users count",
            testFunction: `
              const { getByText } = render(<Dashboard />);
              getByText('Users: 1000') !== null
            `,
          },
          {
            id: "test-6",
            description: "Should display refresh count",
            testFunction: `
              const { getByText } = render(<Dashboard />);
              getByText('Refreshed: 0 times') !== null
            `,
          },
        ],
        language: "jsx",
      },
    ],
  },

  // Lesson 8: Code Splitting
  {
    id: "perf-opt-08",
    moduleId: "module-2-3",
    title: "Code Splitting",
    order: 8,
    xpReward: 300,
    difficulty: "intermediate",
    steps: [
      {
        id: "perf-opt-08-step-1",
        order: 1,
        instruction: `
# Code Splitting

**Code splitting** allows you to split your bundle into smaller chunks that can be loaded on demand. This reduces the initial load time of your application.

## Why Code Splitting?

Without code splitting:
- Single large JavaScript bundle
- Slower initial load time
- Users download code they may never use

With code splitting:
- Multiple smaller bundles
- Faster initial load
- Code loaded only when needed

## Dynamic Import Syntax

\`\`\`javascript
// Static import - bundled together
import MyComponent from './MyComponent';

// Dynamic import - separate bundle
const MyComponent = React.lazy(() => import('./MyComponent'));
\`\`\`

## Code Splitting Strategies:

**1. Route-based splitting:**
\`\`\`jsx
const Home = React.lazy(() => import('./Home'));
const About = React.lazy(() => import('./About'));
const Contact = React.lazy(() => import('./Contact'));

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Router>
  );
}
\`\`\`

**2. Component-based splitting:**
\`\`\`jsx
// Split heavy components
const Chart = React.lazy(() => import('./Chart'));
const VideoPlayer = React.lazy(() => import('./VideoPlayer'));
\`\`\`

**3. Conditional splitting:**
\`\`\`jsx
function AdminPanel() {
  const [showAdvanced, setShowAdvanced] = useState(false);

  const AdvancedSettings = React.lazy(() =>
    import('./AdvancedSettings')
  );

  return (
    <div>
      <button onClick={() => setShowAdvanced(true)}>
        Show Advanced
      </button>
      {showAdvanced && <AdvancedSettings />}
    </div>
  );
}
\`\`\`

## Your Task

Create a simple demonstration of code splitting concepts:

1. Create a component named \`LazyLoadDemo\` with:
   - State: \`showHeavy\` initialized to false
   - A \`<div>\` with className "lazy-demo"
   - A \`<button>\` with text "Load Heavy Component" that toggles showHeavy
   - A \`<p>\` showing the current state: "Heavy component loaded: {showHeavy ? 'Yes' : 'No'}"
   - When showHeavy is true, display a \`<div>\` with text "This is the heavy component"

**Note:** In a real app, you'd use React.lazy() for the heavy component. This exercise focuses on the loading pattern.
        `,
        hint: "Use useState for showHeavy. The button's onClick should toggle the state. Use conditional rendering with && to show the heavy component div.",
        starterCode: `import React, { useState } from 'react';

function LazyLoadDemo() {
  // Create showHeavy state


  return (
    <div className="lazy-demo">
      {/* Add your JSX here */}
    </div>
  );
}

export default LazyLoadDemo;`,
        solution: `import React, { useState } from 'react';

function LazyLoadDemo() {
  const [showHeavy, setShowHeavy] = useState(false);

  return (
    <div className="lazy-demo">
      <button onClick={() => setShowHeavy(!showHeavy)}>
        Load Heavy Component
      </button>
      <p>Heavy component loaded: {showHeavy ? 'Yes' : 'No'}</p>
      {showHeavy && <div>This is the heavy component</div>}
    </div>
  );
}

export default LazyLoadDemo;`,
        testCases: [
          {
            id: "test-1",
            description: "Should have showHeavy state",
            testFunction: `code.includes('showHeavy') && code.includes('useState')`,
          },
          {
            id: "test-2",
            description: "Should render a button",
            testFunction: `
              const { getByText } = render(<LazyLoadDemo />);
              const button = getByText('Load Heavy Component');
              button !== null && button.tagName === 'BUTTON'
            `,
          },
          {
            id: "test-3",
            description: "Should initially show 'No' for loaded state",
            testFunction: `
              const { getByText } = render(<LazyLoadDemo />);
              getByText('Heavy component loaded: No') !== null
            `,
          },
          {
            id: "test-4",
            description: "Should not show heavy component initially",
            testFunction: `
              const { queryByText } = render(<LazyLoadDemo />);
              queryByText('This is the heavy component') === null
            `,
          },
          {
            id: "test-5",
            description: "Should use conditional rendering with &&",
            testFunction: `code.includes('&&')`,
          },
          {
            id: "test-6",
            description: "Button should toggle showHeavy state",
            testFunction: `code.includes('setShowHeavy') && (code.includes('!showHeavy') || code.includes('true'))`,
          },
        ],
        language: "jsx",
      },
    ],
  },

  // Lesson 9: Lazy Loading Components
  {
    id: "perf-opt-09",
    moduleId: "module-2-3",
    title: "Lazy Loading Components",
    order: 9,
    xpReward: 350,
    difficulty: "intermediate",
    steps: [
      {
        id: "perf-opt-09-step-1",
        order: 1,
        instruction: `
# Lazy Loading Components

**Lazy loading** defers loading components until they're actually needed. This is achieved using dynamic imports and React.lazy().

## React.lazy() Syntax

\`\`\`jsx
// Before: Eager loading (included in initial bundle)
import HeavyComponent from './HeavyComponent';

// After: Lazy loading (loaded when needed)
const HeavyComponent = React.lazy(() => import('./HeavyComponent'));
\`\`\`

## When to Lazy Load:

✅ **Route components** - Load pages only when navigating to them
✅ **Modal/Dialog content** - Load when opened
✅ **Below-the-fold content** - Load when scrolling
✅ **Feature flags** - Load based on user permissions
✅ **Heavy libraries** - Load rich text editors, charts only when used

❌ **Small components** - Overhead not worth it
❌ **Critical path components** - Needed immediately
❌ **Frequently used components** - Better to load upfront

## Pattern: Lazy Loading with State

\`\`\`jsx
function App() {
  const [showModal, setShowModal] = useState(false);

  // Modal only loaded when showModal becomes true
  const Modal = React.lazy(() => import('./Modal'));

  return (
    <div>
      <button onClick={() => setShowModal(true)}>Open Modal</button>
      {showModal && (
        <Suspense fallback={<div>Loading...</div>}>
          <Modal onClose={() => setShowModal(false)} />
        </Suspense>
      )}
    </div>
  );
}
\`\`\`

## Pattern: Preloading

You can trigger the import early to preload:

\`\`\`jsx
function App() {
  const [showEditor, setShowEditor] = useState(false);

  // Preload on hover
  const handleMouseEnter = () => {
    import('./RichTextEditor'); // Preload
  };

  return (
    <button
      onMouseEnter={handleMouseEnter}
      onClick={() => setShowEditor(true)}
    >
      Open Editor
    </button>
  );
}
\`\`\`

## Your Task

Create a \`TabPanel\` component that demonstrates lazy loading concepts:

1. Create state: \`activeTab\` initialized to "home"
2. Create a function \`renderTabContent\` that:
   - Returns "Home Content" if activeTab is "home"
   - Returns "Profile Content" if activeTab is "profile"
   - Returns "Settings Content" if activeTab is "settings"
3. Return a \`<div>\` with className "tab-panel" containing:
   - Three buttons: "Home", "Profile", "Settings"
   - Each button sets the activeTab when clicked
   - The buttons should have className "active" when they match activeTab
   - A \`<div>\` with className "tab-content" displaying the result of renderTabContent()

This simulates lazy loading patterns (in production, each tab would be lazy loaded).
        `,
        hint: "Create renderTabContent() function that uses if statements or switch to return different content. Buttons use onClick={() => setActiveTab('home')}. Use template literals for className: className={\\`tab-btn \\${activeTab === 'home' ? 'active' : ''}\`}",
        starterCode: `import React, { useState } from 'react';

function TabPanel() {
  const [activeTab, setActiveTab] = useState('home');

  const renderTabContent = () => {
    // Return content based on activeTab

  };

  return (
    <div className="tab-panel">
      {/* Add your JSX here */}
    </div>
  );
}

export default TabPanel;`,
        solution: `import React, { useState } from 'react';

function TabPanel() {
  const [activeTab, setActiveTab] = useState('home');

  const renderTabContent = () => {
    if (activeTab === 'home') return 'Home Content';
    if (activeTab === 'profile') return 'Profile Content';
    if (activeTab === 'settings') return 'Settings Content';
  };

  return (
    <div className="tab-panel">
      <button
        className={\`tab-btn \${activeTab === 'home' ? 'active' : ''}\`}
        onClick={() => setActiveTab('home')}
      >
        Home
      </button>
      <button
        className={\`tab-btn \${activeTab === 'profile' ? 'active' : ''}\`}
        onClick={() => setActiveTab('profile')}
      >
        Profile
      </button>
      <button
        className={\`tab-btn \${activeTab === 'settings' ? 'active' : ''}\`}
        onClick={() => setActiveTab('settings')}
      >
        Settings
      </button>
      <div className="tab-content">
        {renderTabContent()}
      </div>
    </div>
  );
}

export default TabPanel;`,
        testCases: [
          {
            id: "test-1",
            description: "Should have activeTab state",
            testFunction: `code.includes('activeTab') && code.includes('useState')`,
          },
          {
            id: "test-2",
            description: "Should have renderTabContent function",
            testFunction: `code.includes('renderTabContent')`,
          },
          {
            id: "test-3",
            description: "Should render three buttons",
            testFunction: `
              const { container } = render(<TabPanel />);
              const buttons = container.querySelectorAll('button');
              buttons.length === 3
            `,
          },
          {
            id: "test-4",
            description: "Should initially display 'Home Content'",
            testFunction: `
              const { getByText } = render(<TabPanel />);
              getByText('Home Content') !== null
            `,
          },
          {
            id: "test-5",
            description: "Should have tab-content div",
            testFunction: `
              const { container } = render(<TabPanel />);
              container.querySelector('.tab-content') !== null
            `,
          },
          {
            id: "test-6",
            description: "Home button should have 'active' class initially",
            testFunction: `
              const { getByText } = render(<TabPanel />);
              const homeBtn = getByText('Home');
              homeBtn.className.includes('active')
            `,
          },
        ],
        language: "jsx",
      },
    ],
  },

  // Lesson 10: React.lazy and Suspense
  {
    id: "perf-opt-10",
    moduleId: "module-2-3",
    title: "React.lazy and Suspense",
    order: 10,
    xpReward: 350,
    difficulty: "intermediate",
    steps: [
      {
        id: "perf-opt-10-step-1",
        order: 1,
        instruction: `
# React.lazy and Suspense

**React.lazy** and **Suspense** work together to handle lazy-loaded components gracefully.

## The Problem Without Suspense

\`\`\`jsx
// This will cause an error!
const LazyComponent = React.lazy(() => import('./MyComponent'));

function App() {
  return <LazyComponent />; // ❌ Error: LazyComponent needs Suspense
}
\`\`\`

## The Solution: Suspense

\`\`\`jsx
import { Suspense } from 'react';

const LazyComponent = React.lazy(() => import('./MyComponent'));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LazyComponent />
    </Suspense>
  );
}
\`\`\`

## Suspense Features:

**1. Fallback UI** - Show loading state while component loads:
\`\`\`jsx
<Suspense fallback={<Spinner />}>
  <LazyComponent />
</Suspense>
\`\`\`

**2. Multiple Lazy Components** - One Suspense can wrap multiple:
\`\`\`jsx
<Suspense fallback={<Loading />}>
  <LazyHeader />
  <LazyContent />
  <LazyFooter />
</Suspense>
\`\`\`

**3. Nested Suspense** - Different loading states for different parts:
\`\`\`jsx
<Suspense fallback={<PageLoader />}>
  <Header />
  <Suspense fallback={<ContentLoader />}>
    <MainContent />
  </Suspense>
  <Footer />
</Suspense>
\`\`\`

**4. Error Boundaries** - Combine with error handling:
\`\`\`jsx
<ErrorBoundary fallback={<ErrorMessage />}>
  <Suspense fallback={<Loading />}>
    <LazyComponent />
  </Suspense>
</ErrorBoundary>
\`\`\`

## Complete Example:

\`\`\`jsx
import { Suspense, lazy } from 'react';

const Dashboard = lazy(() => import('./Dashboard'));
const Profile = lazy(() => import('./Profile'));
const Settings = lazy(() => import('./Settings'));

function App() {
  const [currentView, setCurrentView] = useState('dashboard');

  const renderView = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard />;
      case 'profile':
        return <Profile />;
      case 'settings':
        return <Settings />;
      default:
        return null;
    }
  };

  return (
    <div>
      <nav>
        <button onClick={() => setCurrentView('dashboard')}>Dashboard</button>
        <button onClick={() => setCurrentView('profile')}>Profile</button>
        <button onClick={() => setCurrentView('settings')}>Settings</button>
      </nav>

      <Suspense fallback={<div>Loading view...</div>}>
        {renderView()}
      </Suspense>
    </div>
  );
}
\`\`\`

## Your Task

Create a \`LazyContainer\` component that simulates the Suspense pattern:

1. Accept props: \`isLoading\` and \`children\`
2. If \`isLoading\` is true, display a \`<div>\` with:
   - className "loading-fallback"
   - Text: "Loading..."
3. If \`isLoading\` is false, render the children
4. Wrap everything in a \`<div>\` with className "lazy-container"

Then create a \`LazyDemo\` component that uses LazyContainer:
1. State: \`loaded\` initialized to false
2. A button "Load Component" that sets loaded to true
3. Use LazyContainer with isLoading={!loaded}
4. Inside LazyContainer, show a \`<div>\` with text "Component Loaded!"

Export both components.
        `,
        hint: "LazyContainer: Use conditional rendering - if isLoading show loading div, else show children. LazyDemo: Pass !loaded as isLoading prop.",
        starterCode: `import React, { useState } from 'react';

// Create LazyContainer component
function LazyContainer({ isLoading, children }) {
  // Add conditional rendering logic

}

// Create LazyDemo component
function LazyDemo() {
  const [loaded, setLoaded] = useState(false);

  return (
    <div>
      {/* Add your JSX here */}
    </div>
  );
}

export { LazyContainer };
export default LazyDemo;`,
        solution: `import React, { useState } from 'react';

function LazyContainer({ isLoading, children }) {
  return (
    <div className="lazy-container">
      {isLoading ? (
        <div className="loading-fallback">Loading...</div>
      ) : (
        children
      )}
    </div>
  );
}

function LazyDemo() {
  const [loaded, setLoaded] = useState(false);

  return (
    <div>
      <button onClick={() => setLoaded(true)}>Load Component</button>
      <LazyContainer isLoading={!loaded}>
        <div>Component Loaded!</div>
      </LazyContainer>
    </div>
  );
}

export { LazyContainer };
export default LazyDemo;`,
        testCases: [
          {
            id: "test-1",
            description: "LazyContainer should accept isLoading and children props",
            testFunction: `code.includes('isLoading') && code.includes('children')`,
          },
          {
            id: "test-2",
            description: "LazyContainer should show loading state when isLoading is true",
            testFunction: `
              const { getByText } = render(<LazyContainer isLoading={true}><div>Content</div></LazyContainer>);
              getByText('Loading...') !== null
            `,
          },
          {
            id: "test-3",
            description: "LazyContainer should show children when isLoading is false",
            testFunction: `
              const { getByText } = render(<LazyContainer isLoading={false}><div>Content</div></LazyContainer>);
              getByText('Content') !== null
            `,
          },
          {
            id: "test-4",
            description: "LazyDemo should have a button",
            testFunction: `
              const { getByText } = render(<LazyDemo />);
              const button = getByText('Load Component');
              button !== null && button.tagName === 'BUTTON'
            `,
          },
          {
            id: "test-5",
            description: "LazyDemo should initially show loading state",
            testFunction: `
              const { getByText } = render(<LazyDemo />);
              getByText('Loading...') !== null
            `,
          },
          {
            id: "test-6",
            description: "LazyDemo should use LazyContainer component",
            testFunction: `code.includes('LazyContainer')`,
          },
        ],
        language: "jsx",
      },
    ],
  },

  // Lesson 11: Virtual Scrolling
  {
    id: "perf-opt-11",
    moduleId: "module-2-3",
    title: "Virtual Scrolling",
    order: 11,
    xpReward: 350,
    difficulty: "advanced",
    steps: [
      {
        id: "perf-opt-11-step-1",
        order: 1,
        instruction: `
# Virtual Scrolling

**Virtual scrolling** (also called windowing) only renders items that are visible in the viewport, dramatically improving performance for large lists.

## The Problem: Rendering Large Lists

\`\`\`jsx
// ❌ BAD: Renders 10,000 DOM nodes
function UserList({ users }) {
  return (
    <div>
      {users.map(user => (
        <UserCard key={user.id} user={user} />
      ))}
    </div>
  );
}

// If users array has 10,000 items, this creates 10,000 DOM nodes!
\`\`\`

## The Solution: Virtual Scrolling

\`\`\`jsx
// ✅ GOOD: Only renders visible items (~20 DOM nodes)
import { FixedSizeList } from 'react-window';

function UserList({ users }) {
  const Row = ({ index, style }) => (
    <div style={style}>
      <UserCard user={users[index]} />
    </div>
  );

  return (
    <FixedSizeList
      height={600}
      itemCount={users.length}
      itemSize={80}
      width="100%"
    >
      {Row}
    </FixedSizeList>
  );
}
\`\`\`

## How It Works:

1. Calculate which items are visible based on scroll position
2. Only render those items
3. As user scrolls, render new items and unmount old ones
4. Maintain scroll position using placeholder space

## Popular Libraries:

**react-window** (recommended, lightweight):
\`\`\`jsx
import { FixedSizeList, VariableSizeList } from 'react-window';
\`\`\`

**react-virtualized** (feature-rich, heavier):
\`\`\`jsx
import { List, Grid, Table } from 'react-virtualized';
\`\`\`

## Manual Implementation Concept:

\`\`\`jsx
function VirtualList({ items, itemHeight, containerHeight }) {
  const [scrollTop, setScrollTop] = useState(0);

  // Calculate which items to render
  const startIndex = Math.floor(scrollTop / itemHeight);
  const endIndex = Math.ceil((scrollTop + containerHeight) / itemHeight);
  const visibleItems = items.slice(startIndex, endIndex);

  // Calculate offset for positioning
  const offsetY = startIndex * itemHeight;

  return (
    <div
      style={{ height: containerHeight, overflow: 'auto' }}
      onScroll={(e) => setScrollTop(e.target.scrollTop)}
    >
      <div style={{ height: items.length * itemHeight }}>
        <div style={{ transform: \`translateY(\${offsetY}px)\` }}>
          {visibleItems.map((item, index) => (
            {/* ✅ Exception: startIndex + index creates stable IDs for virtual scrolling
                Each item maintains its absolute position despite the sliding window */}
            <div key={startIndex + index} style={{ height: itemHeight }}>
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
\`\`\`

## Your Task

Create a simplified \`WindowedList\` component that demonstrates virtual scrolling concepts:

1. Accept props: \`items\` (array of strings), \`itemHeight\` (number), \`visibleCount\` (number)
2. Create state: \`startIndex\` initialized to 0
3. Calculate:
   - \`endIndex\` = startIndex + visibleCount
   - \`visibleItems\` = items.slice(startIndex, endIndex)
4. Create buttons:
   - "Previous" - decreases startIndex by 1 (if > 0)
   - "Next" - increases startIndex by 1 (if endIndex < items.length)
5. Return a \`<div>\` with className "windowed-list" containing:
   - The navigation buttons
   - A \`<p>\` showing "Showing items {startIndex} to {endIndex} of {items.length}"
   - A \`<div>\` with className "list-content" displaying visibleItems as a \`<ul>\`

This simulates the concept of windowing without actual scroll handling.
        `,
        hint: "Use items.slice(startIndex, endIndex) to get visible items. Buttons: onClick={() => setStartIndex(startIndex - 1)} but check if startIndex > 0 first.",
        starterCode: `import React, { useState } from 'react';

function WindowedList({ items, itemHeight, visibleCount }) {
  const [startIndex, setStartIndex] = useState(0);

  // Calculate endIndex and visibleItems


  // Create handlers for navigation


  return (
    <div className="windowed-list">
      {/* Add your JSX here */}
    </div>
  );
}

export default WindowedList;`,
        solution: `import React, { useState } from 'react';

function WindowedList({ items, itemHeight, visibleCount }) {
  const [startIndex, setStartIndex] = useState(0);

  const endIndex = startIndex + visibleCount;
  const visibleItems = items.slice(startIndex, endIndex);

  const handlePrevious = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - 1);
    }
  };

  const handleNext = () => {
    if (endIndex < items.length) {
      setStartIndex(startIndex + 1);
    }
  };

  return (
    <div className="windowed-list">
      <button onClick={handlePrevious}>Previous</button>
      <button onClick={handleNext}>Next</button>
      <p>Showing items {startIndex} to {endIndex} of {items.length}</p>
      <div className="list-content">
        <ul>
          {visibleItems.map((item, index) => (
            {/* ✅ startIndex + index is stable here because it represents
                the item's absolute position in the full list */}
            <li key={startIndex + index}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default WindowedList;`,
        testCases: [
          {
            id: "test-1",
            description: "Should have startIndex state",
            testFunction: `code.includes('startIndex') && code.includes('useState')`,
          },
          {
            id: "test-2",
            description: "Should calculate endIndex",
            testFunction: `code.includes('endIndex')`,
          },
          {
            id: "test-3",
            description: "Should slice items to get visibleItems",
            testFunction: `code.includes('slice')`,
          },
          {
            id: "test-4",
            description: "Should render Previous and Next buttons",
            testFunction: `
              const { getByText } = render(<WindowedList items={['a', 'b', 'c']} itemHeight={50} visibleCount={2} />);
              getByText('Previous') !== null && getByText('Next') !== null
            `,
          },
          {
            id: "test-5",
            description: "Should display correct range information",
            testFunction: `
              const { getByText } = render(<WindowedList items={['a', 'b', 'c', 'd', 'e']} itemHeight={50} visibleCount={2} />);
              getByText('Showing items 0 to 2 of 5') !== null
            `,
          },
          {
            id: "test-6",
            description: "Should render only visible items",
            testFunction: `
              const { container } = render(<WindowedList items={['a', 'b', 'c', 'd']} itemHeight={50} visibleCount={2} />);
              const listItems = container.querySelectorAll('li');
              listItems.length === 2
            `,
          },
        ],
        language: "jsx",
      },
    ],
  },

  // Lesson 12: Debouncing and Throttling
  {
    id: "perf-opt-12",
    moduleId: "module-2-3",
    title: "Debouncing and Throttling",
    order: 12,
    xpReward: 300,
    difficulty: "intermediate",
    steps: [
      {
        id: "perf-opt-12-step-1",
        order: 1,
        instruction: `
# Debouncing and Throttling

**Debouncing** and **throttling** are techniques to limit how often a function executes, crucial for performance with frequent events.

## Debouncing

Delays execution until after a pause in events:

\`\`\`jsx
import { useState, useEffect } from 'react';

function SearchBox() {
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedTerm, setDebouncedTerm] = useState('');

  useEffect(() => {
    // Set a timer
    const timer = setTimeout(() => {
      setDebouncedTerm(searchTerm);
    }, 500);

    // Clear timer if searchTerm changes (cleanup)
    return () => clearTimeout(timer);
  }, [searchTerm]);

  useEffect(() => {
    // API call only fires after user stops typing
    if (debouncedTerm) {
      fetch(\`/api/search?q=\${debouncedTerm}\`);
    }
  }, [debouncedTerm]);

  return (
    <input
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
    />
  );
}
\`\`\`

## Throttling

Limits execution to once per specified interval:

\`\`\`jsx
import { useState, useEffect, useRef } from 'react';

function ScrollTracker() {
  const [scrollY, setScrollY] = useState(0);
  const lastRun = useRef(Date.now());

  useEffect(() => {
    const handleScroll = () => {
      const now = Date.now();
      const timeSinceLastRun = now - lastRun.current;

      // Only update if 100ms has passed
      if (timeSinceLastRun >= 100) {
        setScrollY(window.scrollY);
        lastRun.current = now;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return <div>Scroll position: {scrollY}</div>;
}
\`\`\`

## When to Use Each:

**Debounce:**
- Search inputs (wait until user stops typing)
- Form validation (validate after pause)
- Auto-save (save after user stops editing)
- Window resize handlers (wait for final size)

**Throttle:**
- Scroll handlers (update at regular intervals)
- Mouse movement tracking
- Real-time updates (limit update frequency)
- API rate limiting

## Visual Comparison:

\`\`\`
Events:     |||||||||||||||||
Debounce:   Wait... Wait... ✓
Throttle:   ✓...✓...✓...✓...✓
\`\`\`

## Your Task

Create a \`DebouncedInput\` component:

1. Accept props: \`delay\` (number) and \`onDebouncedChange\` (function)
2. Create state: \`value\` initialized to ""
3. Use useEffect to debounce the value:
   - Set a setTimeout that calls \`onDebouncedChange(value)\` after \`delay\` milliseconds
   - Return a cleanup function that clears the timeout
   - Dependency: [value, delay, onDebouncedChange]
4. Return a \`<div>\` with className "debounced-input" containing:
   - An \`<input>\` with value and onChange that updates the state
   - A \`<p>\` showing "Current input: {value}"

**Note:** In a real implementation, you'd also memoize onDebouncedChange with useCallback.
        `,
        hint: "In useEffect, use const timer = setTimeout(() => onDebouncedChange(value), delay). Return () => clearTimeout(timer). Dependencies are [value, delay, onDebouncedChange].",
        starterCode: `import React, { useState, useEffect } from 'react';

function DebouncedInput({ delay, onDebouncedChange }) {
  const [value, setValue] = useState('');

  // Add useEffect for debouncing


  return (
    <div className="debounced-input">
      {/* Add your JSX here */}
    </div>
  );
}

export default DebouncedInput;`,
        solution: `import React, { useState, useEffect } from 'react';

function DebouncedInput({ delay, onDebouncedChange }) {
  const [value, setValue] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      onDebouncedChange(value);
    }, delay);

    return () => clearTimeout(timer);
  }, [value, delay, onDebouncedChange]);

  return (
    <div className="debounced-input">
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <p>Current input: {value}</p>
    </div>
  );
}

export default DebouncedInput;`,
        testCases: [
          {
            id: "test-1",
            description: "Should have value state",
            testFunction: `code.includes('value') && code.includes('useState')`,
          },
          {
            id: "test-2",
            description: "Should use useEffect for debouncing",
            testFunction: `code.includes('useEffect') && code.includes('setTimeout')`,
          },
          {
            id: "test-3",
            description: "Should have cleanup function",
            testFunction: `code.includes('clearTimeout')`,
          },
          {
            id: "test-4",
            description: "Should render an input",
            testFunction: `
              const { container } = render(<DebouncedInput delay={300} onDebouncedChange={() => {}} />);
              container.querySelector('input') !== null
            `,
          },
          {
            id: "test-5",
            description: "Should display current input value",
            testFunction: `
              const { getByText } = render(<DebouncedInput delay={300} onDebouncedChange={() => {}} />);
              getByText('Current input:') !== null
            `,
          },
          {
            id: "test-6",
            description: "useEffect should depend on value, delay, and callback",
            testFunction: `code.includes('[value') || code.includes('delay') || code.includes('onDebouncedChange')`,
          },
        ],
        language: "jsx",
      },
    ],
  },

  // Lesson 13: Optimizing Lists
  {
    id: "perf-opt-13",
    moduleId: "module-2-3",
    title: "Optimizing Lists",
    order: 13,
    xpReward: 350,
    difficulty: "intermediate",
    steps: [
      {
        id: "perf-opt-13-step-1",
        order: 1,
        instruction: `
# Optimizing Lists

Lists are common performance bottlenecks in React. Let's explore optimization strategies.

## Key Optimization Techniques:

### 1. Use Proper Keys

\`\`\`jsx
// ❌ ANTI-PATTERN DEMO: Index as key (can cause bugs with reordering)
// This intentionally shows WRONG code to illustrate the problem
{items.map((item, index) => <Item key={index} data={item} />)}

// ❌ BAD: Non-unique keys
{items.map(item => <Item key={item.category} data={item} />)}

// ✅ GOOD: Stable, unique identifiers
{items.map(item => <Item key={item.id} data={item} />)}
\`\`\`

### 2. Memoize List Items

\`\`\`jsx
// Memoize the list item component
const ListItem = React.memo(function ListItem({ item, onDelete }) {
  return (
    <div>
      <span>{item.name}</span>
      <button onClick={() => onDelete(item.id)}>Delete</button>
    </div>
  );
});

function List({ items }) {
  // Memoize the delete handler
  const handleDelete = useCallback((id) => {
    // Delete logic
  }, []);

  return (
    <ul>
      {items.map(item => (
        <ListItem key={item.id} item={item} onDelete={handleDelete} />
      ))}
    </ul>
  );
}
\`\`\`

### 3. Virtualize Long Lists

\`\`\`jsx
import { FixedSizeList } from 'react-window';

function LongList({ items }) {
  const Row = ({ index, style }) => (
    <div style={style}>{items[index].name}</div>
  );

  return (
    <FixedSizeList
      height={400}
      itemCount={items.length}
      itemSize={50}
    >
      {Row}
    </FixedSizeList>
  );
}
\`\`\`

### 4. Avoid Inline Functions in List Items

\`\`\`jsx
// ❌ BAD: Creates new function for every item
{items.map(item => (
  <button onClick={() => handleClick(item.id)}>
    {item.name}
  </button>
))}

// ✅ GOOD: Pass stable function reference
const ListItem = React.memo(({ item, onClick }) => (
  <button onClick={onClick} data-id={item.id}>
    {item.name}
  </button>
));

function List({ items }) {
  const handleClick = useCallback((e) => {
    const id = e.currentTarget.dataset.id;
    // Handle click
  }, []);

  return items.map(item => (
    <ListItem key={item.id} item={item} onClick={handleClick} />
  ));
}
\`\`\`

### 5. Optimize List Updates

\`\`\`jsx
function TodoList() {
  const [todos, setTodos] = useState([]);

  // ❌ BAD: Creates new array every time
  const addTodo = (text) => {
    setTodos([...todos, { id: Date.now(), text }]);
  };

  // ✅ GOOD: Uses functional update
  const addTodo = useCallback((text) => {
    setTodos(prev => [...prev, { id: Date.now(), text }]);
  }, []);

  return <div>{/* render todos */}</div>;
}
\`\`\`

## Your Task

Create an optimized \`TaskList\` component:

1. Create a memoized \`TaskItem\` component:
   - Props: \`task\` (object with id and text) and \`onToggle\` (function)
   - Render a \`<li>\` containing:
     - A checkbox input with onChange={() => onToggle(task.id)}
     - The task.text as a \`<span>\`
   - Wrap with React.memo

2. Create the main \`TaskList\` component:
   - Props: \`tasks\` (array of task objects)
   - State: \`completedIds\` (array) initialized to []
   - Use useCallback for \`handleToggle\` that toggles task ID in completedIds
   - Return a \`<div>\` with className "task-list" containing:
     - A \`<p>\` showing "Completed: {completedIds.length}/{tasks.length}"
     - A \`<ul>\` rendering TaskItem for each task

Export both components.
        `,
        hint: "TaskItem: wrap with React.memo. TaskList: use useCallback for handleToggle. To toggle in array: if id exists, filter it out; if not, add it. Use setCompletedIds with functional update: prev => ...",
        starterCode: `import React, { useState, useCallback } from 'react';

// Create memoized TaskItem component


// Create TaskList component
function TaskList({ tasks }) {
  const [completedIds, setCompletedIds] = useState([]);

  // Create handleToggle with useCallback


  return (
    <div className="task-list">
      {/* Add your JSX here */}
    </div>
  );
}

export { TaskItem };
export default TaskList;`,
        solution: `import React, { useState, useCallback } from 'react';

const TaskItem = React.memo(function TaskItem({ task, onToggle }) {
  return (
    <li>
      <input
        type="checkbox"
        onChange={() => onToggle(task.id)}
      />
      <span>{task.text}</span>
    </li>
  );
});

function TaskList({ tasks }) {
  const [completedIds, setCompletedIds] = useState([]);

  const handleToggle = useCallback((id) => {
    setCompletedIds(prev => {
      if (prev.includes(id)) {
        return prev.filter(completedId => completedId !== id);
      } else {
        return [...prev, id];
      }
    });
  }, []);

  return (
    <div className="task-list">
      <p>Completed: {completedIds.length}/{tasks.length}</p>
      <ul>
        {tasks.map(task => (
          <TaskItem key={task.id} task={task} onToggle={handleToggle} />
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
            description: "TaskItem should be wrapped with React.memo",
            testFunction: `code.includes('React.memo') && code.includes('TaskItem')`,
          },
          {
            id: "test-2",
            description: "Should use useCallback for handleToggle",
            testFunction: `code.includes('useCallback') && code.includes('handleToggle')`,
          },
          {
            id: "test-3",
            description: "Should display completion count",
            testFunction: `
              const tasks = [{ id: 1, text: 'Task 1' }, { id: 2, text: 'Task 2' }];
              const { getByText } = render(<TaskList tasks={tasks} />);
              getByText('Completed: 0/2') !== null
            `,
          },
          {
            id: "test-4",
            description: "Should render a TaskItem for each task",
            testFunction: `
              const tasks = [{ id: 1, text: 'Task 1' }, { id: 2, text: 'Task 2' }];
              const { container } = render(<TaskList tasks={tasks} />);
              const items = container.querySelectorAll('li');
              items.length === 2
            `,
          },
          {
            id: "test-5",
            description: "TaskItem should render checkbox and text",
            testFunction: `
              const task = { id: 1, text: 'Test Task' };
              const { container, getByText } = render(<TaskItem task={task} onToggle={() => {}} />);
              container.querySelector('input[type="checkbox"]') !== null && getByText('Test Task') !== null
            `,
          },
          {
            id: "test-6",
            description: "Should use functional state update for completedIds",
            testFunction: `code.includes('setCompletedIds') && code.includes('prev')`,
          },
        ],
        language: "jsx",
      },
    ],
  },

  // Lesson 14: React DevTools Profiler
  {
    id: "perf-opt-14",
    moduleId: "module-2-3",
    title: "React DevTools Profiler",
    order: 14,
    xpReward: 300,
    difficulty: "intermediate",
    steps: [
      {
        id: "perf-opt-14-step-1",
        order: 1,
        instruction: `
# React DevTools Profiler

The **React DevTools Profiler** is an essential tool for measuring and identifying performance issues in your React applications.

## Installing React DevTools

**Browser Extensions:**
- Chrome: Install from Chrome Web Store
- Firefox: Install from Firefox Add-ons
- Edge: Install from Edge Add-ons

**Standalone App:**
\`\`\`bash
npm install -g react-devtools
react-devtools
\`\`\`

## Using the Profiler

### 1. Start Profiling

1. Open React DevTools
2. Click the "Profiler" tab
3. Click the record button (⚫)
4. Interact with your app
5. Stop recording

### 2. Reading the Flamegraph

\`\`\`
Components with colors:
- Gray: Did not render
- Yellow/Orange: Rendered quickly
- Red: Rendered slowly
- Height: Component tree depth
- Width: Time spent rendering
\`\`\`

### 3. Ranked View

Shows components sorted by render time:
- Identifies slowest components
- Shows render duration
- Displays render count

### 4. Interactions

Track specific user interactions:
\`\`\`jsx
import { unstable_trace as trace } from 'scheduler/tracing';

function handleClick() {
  trace('Button clicked', performance.now(), () => {
    // Your logic
  });
}
\`\`\`

## Profiler API (Programmatic)

\`\`\`jsx
import { Profiler } from 'react';

function onRenderCallback(
  id,                  // Profiler id
  phase,               // "mount" or "update"
  actualDuration,      // Time spent rendering
  baseDuration,        // Estimated time without memoization
  startTime,           // When render started
  commitTime,          // When render committed
  interactions         // Set of interactions
) {
  console.log(\`\${id} took \${actualDuration}ms to render\`);
}

function App() {
  return (
    <Profiler id="App" onRender={onRenderCallback}>
      <YourComponents />
    </Profiler>
  );
}
\`\`\`

## Key Metrics to Watch:

**1. Render Duration**
- How long a component takes to render
- Target: < 16ms for 60fps

**2. Render Frequency**
- How often a component re-renders
- Look for unnecessary re-renders

**3. Committed Changes**
- Changes that actually updated the DOM
- Yellow bars = no DOM changes (wasted render)

**4. Why Did This Render?**
- Props changes
- State changes
- Parent re-rendered
- Context changed

## Common Patterns in Profiler:

### Pattern 1: Unnecessary Re-renders
\`\`\`
Component renders but no DOM updates (yellow bars)
→ Solution: Add React.memo or check props
\`\`\`

### Pattern 2: Slow Component
\`\`\`
Component takes > 16ms to render (red bars)
→ Solution: Add useMemo, lazy load, or optimize logic
\`\`\`

### Pattern 3: Cascading Re-renders
\`\`\`
Parent render causes all children to render
→ Solution: Memoize children or move state down
\`\`\`

## Your Task

Create a \`PerformanceMonitor\` component that uses the Profiler API:

1. Import Profiler from 'react'
2. Create state: \`renderCount\` initialized to 0
3. Create state: \`totalDuration\` initialized to 0
4. Create \`onRenderCallback\` function that:
   - Increments renderCount by 1
   - Adds actualDuration to totalDuration
5. Calculate average duration: totalDuration / renderCount (or 0 if renderCount is 0)
6. Return a Profiler component wrapping a \`<div>\` with className "performance-monitor":
   - Profiler id: "monitor"
   - Profiler onRender: onRenderCallback
   - Inside div, display:
     - A \`<p>\`: "Render count: {renderCount}"
     - A \`<p>\`: "Average duration: {averageDuration.toFixed(2)}ms"
     - A \`<button>\` "Trigger Render" that calls forceUpdate or toggles a dummy state
        `,
        hint: "Import { Profiler } from 'react'. The onRender callback receives (id, phase, actualDuration, ...). Use setRenderCount(prev => prev + 1) and setTotalDuration(prev => prev + actualDuration). For forceUpdate, use const [, forceUpdate] = useReducer(x => x + 1, 0).",
        starterCode: `import React, { useState, Profiler } from 'react';

function PerformanceMonitor() {
  const [renderCount, setRenderCount] = useState(0);
  const [totalDuration, setTotalDuration] = useState(0);

  const onRenderCallback = (id, phase, actualDuration) => {
    // Update renderCount and totalDuration

  };

  const averageDuration = renderCount > 0 ? totalDuration / renderCount : 0;

  return (
    <Profiler id="monitor" onRender={onRenderCallback}>
      <div className="performance-monitor">
        {/* Add your JSX here */}
      </div>
    </Profiler>
  );
}

export default PerformanceMonitor;`,
        solution: `import React, { useState, useReducer, Profiler } from 'react';

function PerformanceMonitor() {
  const [renderCount, setRenderCount] = useState(0);
  const [totalDuration, setTotalDuration] = useState(0);
  const [, forceUpdate] = useReducer(x => x + 1, 0);

  const onRenderCallback = (id, phase, actualDuration) => {
    setRenderCount(prev => prev + 1);
    setTotalDuration(prev => prev + actualDuration);
  };

  const averageDuration = renderCount > 0 ? totalDuration / renderCount : 0;

  return (
    <Profiler id="monitor" onRender={onRenderCallback}>
      <div className="performance-monitor">
        <p>Render count: {renderCount}</p>
        <p>Average duration: {averageDuration.toFixed(2)}ms</p>
        <button onClick={forceUpdate}>Trigger Render</button>
      </div>
    </Profiler>
  );
}

export default PerformanceMonitor;`,
        testCases: [
          {
            id: "test-1",
            description: "Should import and use Profiler",
            testFunction: `code.includes('Profiler')`,
          },
          {
            id: "test-2",
            description: "Should have renderCount and totalDuration state",
            testFunction: `code.includes('renderCount') && code.includes('totalDuration')`,
          },
          {
            id: "test-3",
            description: "Should have onRenderCallback function",
            testFunction: `code.includes('onRenderCallback')`,
          },
          {
            id: "test-4",
            description: "Should display render count",
            testFunction: `
              const { getByText } = render(<PerformanceMonitor />);
              getByText(/Render count:/) !== null
            `,
          },
          {
            id: "test-5",
            description: "Should display average duration",
            testFunction: `
              const { getByText } = render(<PerformanceMonitor />);
              getByText(/Average duration:/) !== null
            `,
          },
          {
            id: "test-6",
            description: "Should have a button to trigger render",
            testFunction: `
              const { getByText } = render(<PerformanceMonitor />);
              const button = getByText('Trigger Render');
              button !== null && button.tagName === 'BUTTON'
            `,
          },
        ],
        language: "jsx",
      },
    ],
  },

  // Lesson 15: Performance Best Practices
  {
    id: "perf-opt-15",
    moduleId: "module-2-3",
    title: "Performance Best Practices",
    order: 15,
    xpReward: 400,
    difficulty: "advanced",
    steps: [
      {
        id: "perf-opt-15-step-1",
        order: 1,
        instruction: `
# Performance Best Practices

Let's consolidate everything into a comprehensive performance optimization strategy.

## 1. Measure First, Optimize Second

\`\`\`jsx
// Don't optimize prematurely!
// Use React DevTools Profiler to identify real bottlenecks
\`\`\`

## 2. Component Optimization Checklist

\`\`\`jsx
// ✅ Use React.memo for expensive pure components
const ExpensiveComponent = React.memo(MyComponent);

// ✅ Use useMemo for expensive calculations
const result = useMemo(() => expensiveCalc(data), [data]);

// ✅ Use useCallback for callbacks passed to memoized children
const handleClick = useCallback(() => {}, []);

// ✅ Use proper keys in lists
{items.map(item => <Item key={item.id} item={item} />)}

// ✅ Code split large components
const HeavyComponent = lazy(() => import('./HeavyComponent'));
\`\`\`

## 3. State Management Best Practices

\`\`\`jsx
// ✅ Keep state as local as possible
function Parent() {
  // Don't lift state here if only one child needs it
  return (
    <>
      <ChildA />
      <ChildB /> {/* Only ChildB needs the state */}
    </>
  );
}

// ✅ Split state to prevent unnecessary re-renders
function Form() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  // Good: Independent state updates
}

// ❌ Avoid putting everything in one object
function Form() {
  const [formData, setFormData] = useState({ name: '', email: '' });
  // Changes to name cause email field to re-render
}
\`\`\`

## 4. List Optimization Strategies

\`\`\`jsx
// ✅ Virtualize long lists (>100 items)
import { FixedSizeList } from 'react-window';

// ✅ Memoize list items
const ListItem = React.memo(({ item }) => <div>{item.name}</div>);

// ✅ Use stable keys
{items.map(item => <Item key={item.id} />)}

// ✅ Avoid inline functions in lists
const handleClick = useCallback((e) => {
  const id = e.currentTarget.dataset.id;
}, []);
\`\`\`

## 5. Event Handler Optimization

\`\`\`jsx
// ✅ Debounce search inputs
const debouncedSearch = useMemo(
  () => debounce((term) => search(term), 300),
  []
);

// ✅ Throttle scroll handlers
const throttledScroll = useMemo(
  () => throttle(() => handleScroll(), 100),
  []
);
\`\`\`

## 6. Bundle Optimization

\`\`\`jsx
// ✅ Code split by route
const Home = lazy(() => import('./pages/Home'));
const Dashboard = lazy(() => import('./pages/Dashboard'));

// ✅ Lazy load heavy dependencies
const ChartComponent = lazy(() => import('./Chart'));

// ✅ Use dynamic imports for conditionals
if (isAdmin) {
  const AdminPanel = await import('./AdminPanel');
}
\`\`\`

## 7. Common Anti-Patterns to Avoid

\`\`\`jsx
// ❌ Creating objects/arrays in render
function App() {
  const config = { theme: 'dark' }; // New object every render
  return <Child config={config} />;
}

// ❌ Inline arrow functions in list items
{items.map(item => (
  <button onClick={() => handleClick(item.id)}>Click</button>
))}

// ❌ Unnecessary context providers
function App() {
  const [count, setCount] = useState(0);
  // Every state change re-renders all context consumers
  return <Context.Provider value={{ count }}>{children}</Context.Provider>;
}

// ❌ Not using keys or using index as key
{items.map((item, i) => <Item key={i} />)}
\`\`\`

## Your Task

Create a comprehensive \`OptimizedApp\` component that demonstrates all best practices:

1. Create a memoized \`Counter\` component:
   - Props: \`count\` and \`onIncrement\`
   - Display count and a button to increment
   - Wrap with React.memo

2. Create a memoized \`ExpensiveCalculation\` component:
   - Props: \`numbers\` (array)
   - Use useMemo to calculate sum of numbers
   - Display "Sum: {sum}"
   - Wrap with React.memo

3. Create main \`OptimizedApp\` component:
   - State: \`count\` initialized to 0
   - State: \`numbers\` initialized to [1, 2, 3, 4, 5]
   - Use useCallback for \`handleIncrement\` that increments count
   - Return a \`<div>\` with className "optimized-app" containing:
     - A \`<h1>\`: "Performance Optimized App"
     - Counter component with count and handleIncrement
     - ExpensiveCalculation component with numbers
     - A \`<p>\`: "This app uses React.memo, useMemo, and useCallback"

Export all three components.
        `,
        hint: "Wrap Counter and ExpensiveCalculation with React.memo. In ExpensiveCalculation, use useMemo to calculate sum. In OptimizedApp, use useCallback for handleIncrement with [count] dependency.",
        starterCode: `import React, { useState, useCallback, useMemo } from 'react';

// Create memoized Counter component


// Create memoized ExpensiveCalculation component


// Create OptimizedApp component
function OptimizedApp() {
  const [count, setCount] = useState(0);
  const [numbers] = useState([1, 2, 3, 4, 5]);

  // Create handleIncrement with useCallback


  return (
    <div className="optimized-app">
      {/* Add your JSX here */}
    </div>
  );
}

export { Counter, ExpensiveCalculation };
export default OptimizedApp;`,
        solution: `import React, { useState, useCallback, useMemo } from 'react';

const Counter = React.memo(function Counter({ count, onIncrement }) {
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={onIncrement}>Increment</button>
    </div>
  );
});

const ExpensiveCalculation = React.memo(function ExpensiveCalculation({ numbers }) {
  const sum = useMemo(() => {
    return numbers.reduce((acc, num) => acc + num, 0);
  }, [numbers]);

  return <div>Sum: {sum}</div>;
});

function OptimizedApp() {
  const [count, setCount] = useState(0);
  const [numbers] = useState([1, 2, 3, 4, 5]);

  const handleIncrement = useCallback(() => {
    setCount(count + 1);
  }, [count]);

  return (
    <div className="optimized-app">
      <h1>Performance Optimized App</h1>
      <Counter count={count} onIncrement={handleIncrement} />
      <ExpensiveCalculation numbers={numbers} />
      <p>This app uses React.memo, useMemo, and useCallback</p>
    </div>
  );
}

export { Counter, ExpensiveCalculation };
export default OptimizedApp;`,
        testCases: [
          {
            id: "test-1",
            description: "Counter should be wrapped with React.memo",
            testFunction: `code.includes('React.memo') && code.includes('Counter')`,
          },
          {
            id: "test-2",
            description: "ExpensiveCalculation should be wrapped with React.memo",
            testFunction: `code.includes('React.memo') && code.includes('ExpensiveCalculation')`,
          },
          {
            id: "test-3",
            description: "ExpensiveCalculation should use useMemo for sum",
            testFunction: `code.includes('useMemo') && code.includes('reduce')`,
          },
          {
            id: "test-4",
            description: "OptimizedApp should use useCallback for handleIncrement",
            testFunction: `code.includes('useCallback') && code.includes('handleIncrement')`,
          },
          {
            id: "test-5",
            description: "Should render all components correctly",
            testFunction: `
              const { getByText } = render(<OptimizedApp />);
              getByText('Performance Optimized App') !== null &&
              getByText('Count: 0') !== null &&
              getByText('Sum: 15') !== null
            `,
          },
          {
            id: "test-6",
            description: "Should display performance optimization message",
            testFunction: `
              const { getByText } = render(<OptimizedApp />);
              getByText('This app uses React.memo, useMemo, and useCallback') !== null
            `,
          },
        ],
        language: "jsx",
      },
    ],
  },
];
