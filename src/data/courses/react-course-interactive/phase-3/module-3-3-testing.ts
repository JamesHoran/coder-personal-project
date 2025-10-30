/**
 * React Course - Phase 3: Expert Production
 * Module 3.3: Testing (10 lessons)
 *
 * This module covers comprehensive testing strategies using React Testing Library
 * and Jest, including component testing, user interactions, async behavior,
 * mocking, custom hooks, and context testing.
 */

import { InteractiveLesson } from "@/types";

export const testingLessons: InteractiveLesson[] = [
  // Lesson 1: Testing Introduction
  {
    id: "testing-01",
    moduleId: "module-3-3",
    title: "Testing Introduction",
    order: 1,
    xpReward: 300,
    difficulty: "advanced",
    steps: [
      {
        id: "testing-01-step-1",
        order: 1,
        instruction: `
# Testing Introduction

Testing is crucial for building reliable React applications. It helps catch bugs early, documents how your code should work, and gives you confidence when refactoring.

**React Testing Philosophy:**
The more your tests resemble the way your software is used, the more confidence they can give you.

**Types of Tests:**
- **Unit Tests:** Test individual components in isolation
- **Integration Tests:** Test how components work together
- **End-to-End Tests:** Test complete user workflows

**React Testing Library** focuses on testing from the user's perspective rather than implementation details.

\`\`\`jsx
import { render, screen } from '@testing-library/react';
import Welcome from './Welcome';

test('displays welcome message', () => {
  render(<Welcome name="Alice" />);
  expect(screen.getByText('Welcome, Alice!')).toBeInTheDocument();
});
\`\`\`

## Your Task

Create a simple component and a basic test for it.

**Component:** Create a \`StatusMessage\` component that:
- Accepts a \`status\` prop (string)
- Returns a \`<div>\` with className "status-message"
- Contains a \`<p>\` displaying: "Status: {status}"

**Test:** Export a function \`testStatusMessage\` that:
- Renders the component with status="Active"
- Returns true if the text "Status: Active" is found
- Returns false otherwise

**Note:** This is a simplified test to demonstrate the concept.
        `,
        hint: "Create the component first, then write a test function that renders it and checks for the expected text. Use a try-catch to return true/false.",
        starterCode: `import React from 'react';

// Create StatusMessage component
function StatusMessage({ status }) {
  // Your code here
}

// Create a test function
export function testStatusMessage() {
  // Render component and check if text exists
  // Return true if test passes, false otherwise
}

export default StatusMessage;`,
        solution: `import React from 'react';

function StatusMessage({ status }) {
  return (
    <div className="status-message">
      <p>Status: {status}</p>
    </div>
  );
}

export function testStatusMessage() {
  try {
    const { getByText } = render(<StatusMessage status="Active" />);
    return getByText('Status: Active') !== null;
  } catch (error) {
    return false;
  }
}

export default StatusMessage;`,
        testCases: [
          {
            id: "test-1",
            description: "StatusMessage component should exist",
            testFunction: `typeof StatusMessage === 'function'`,
          },
          {
            id: "test-2",
            description: "StatusMessage should render the status prop",
            testFunction: `
              const { getByText } = render(<StatusMessage status="Active" />);
              getByText('Status: Active') !== null
            `,
          },
          {
            id: "test-3",
            description: "StatusMessage should have className 'status-message'",
            testFunction: `
              const { container } = render(<StatusMessage status="Active" />);
              container.querySelector('.status-message') !== null
            `,
          },
          {
            id: "test-4",
            description: "testStatusMessage function should exist",
            testFunction: `typeof testStatusMessage === 'function'`,
          },
          {
            id: "test-5",
            description: "testStatusMessage should return true for valid render",
            testFunction: `testStatusMessage() === true`,
          },
        ],
        language: "jsx",
      },
    ],
  },

  // Lesson 2: React Testing Library Setup
  {
    id: "testing-02",
    moduleId: "module-3-3",
    title: "React Testing Library Setup",
    order: 2,
    xpReward: 300,
    difficulty: "advanced",
    steps: [
      {
        id: "testing-02-step-1",
        order: 1,
        instruction: `
# React Testing Library Setup

React Testing Library provides utilities for testing React components without relying on implementation details.

**Core APIs:**
- \`render()\`: Renders a component into a container
- \`screen\`: Queries the document
- \`cleanup()\`: Unmounts components (usually automatic)

**Common Imports:**
\`\`\`jsx
import { render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom'; // Additional matchers
\`\`\`

**Setup Pattern:**
\`\`\`jsx
import { render } from '@testing-library/react';
import MyComponent from './MyComponent';

describe('MyComponent', () => {
  it('renders correctly', () => {
    const { container } = render(<MyComponent />);
    expect(container).toBeInTheDocument();
  });
});
\`\`\`

**Best Practices:**
- Group related tests using \`describe()\`
- Use clear, descriptive test names
- Clean up after each test (automatic with modern RTL)
- Test user behavior, not implementation

## Your Task

Create a \`Button\` component and a proper test setup.

**Component:** \`Button\` that:
- Accepts \`children\`, \`variant\` props
- Returns \`<button>\` with className "btn btn-{variant}"
- Displays children inside

**Test Function:** \`setupButtonTest\` that:
- Takes \`variant\` and \`text\` as parameters
- Renders Button with those props
- Returns an object with: \`{ element, container }\`
  - \`element\`: the button element
  - \`container\`: the render container
        `,
        hint: "Use render() to create the component, then use container.querySelector('button') to get the element. Return both in an object.",
        starterCode: `import React from 'react';

function Button({ children, variant }) {
  // Your code here
}

// Create a reusable test setup function
export function setupButtonTest(variant, text) {
  // Render Button with props
  // Return { element, container }
}

export default Button;`,
        solution: `import React from 'react';

function Button({ children, variant }) {
  return (
    <button className={\`btn btn-\${variant}\`}>
      {children}
    </button>
  );
}

export function setupButtonTest(variant, text) {
  const { container } = render(<Button variant={variant}>{text}</Button>);
  const element = container.querySelector('button');
  return { element, container };
}

export default Button;`,
        testCases: [
          {
            id: "test-1",
            description: "Button component should accept children and variant props",
            testFunction: `
              const { getByText } = render(<Button variant="primary">Click</Button>);
              getByText('Click') !== null
            `,
          },
          {
            id: "test-2",
            description: "Button should have correct className based on variant",
            testFunction: `
              const { container } = render(<Button variant="danger">Delete</Button>);
              const btn = container.querySelector('button');
              btn.className.includes('btn-danger')
            `,
          },
          {
            id: "test-3",
            description: "setupButtonTest function should exist",
            testFunction: `typeof setupButtonTest === 'function'`,
          },
          {
            id: "test-4",
            description: "setupButtonTest should return element and container",
            testFunction: `
              const result = setupButtonTest('primary', 'Test');
              result.element !== null && result.container !== null
            `,
          },
          {
            id: "test-5",
            description: "setupButtonTest should render button with correct text",
            testFunction: `
              const { element } = setupButtonTest('secondary', 'Hello');
              element.textContent === 'Hello'
            `,
          },
          {
            id: "test-6",
            description: "setupButtonTest should apply correct variant class",
            testFunction: `
              const { element } = setupButtonTest('success', 'Go');
              element.className.includes('btn-success')
            `,
          },
        ],
        language: "jsx",
      },
    ],
  },

  // Lesson 3: Rendering Components
  {
    id: "testing-03",
    moduleId: "module-3-3",
    title: "Rendering Components",
    order: 3,
    xpReward: 350,
    difficulty: "advanced",
    steps: [
      {
        id: "testing-03-step-1",
        order: 1,
        instruction: `
# Rendering Components

The \`render()\` function returns several utilities for querying and interacting with your component.

**Return Values from render():**
\`\`\`jsx
const {
  container,     // The DOM container
  getByText,     // Find by text content
  getByRole,     // Find by ARIA role
  queryByText,   // Like getBy but returns null instead of throwing
  findByText,    // Async version
  debug,         // Prints the DOM
} = render(<MyComponent />);
\`\`\`

**Testing Different Props:**
\`\`\`jsx
// Test with different prop combinations
test('renders with title', () => {
  const { getByText } = render(<Card title="Hello" />);
  expect(getByText('Hello')).toBeInTheDocument();
});

test('renders without title', () => {
  const { queryByText } = render(<Card />);
  expect(queryByText('Hello')).not.toBeInTheDocument();
});
\`\`\`

**Re-rendering:**
\`\`\`jsx
const { rerender } = render(<Counter count={0} />);
rerender(<Counter count={1} />); // Update props
\`\`\`

## Your Task

Create a \`UserCard\` component with comprehensive rendering tests.

**Component:** \`UserCard\` that:
- Accepts \`name\`, \`email\`, \`isAdmin\` props
- Returns \`<div>\` with className "user-card"
- Shows \`<h3>\` with name
- Shows \`<p>\` with email
- If \`isAdmin\`, shows \`<span className="badge">\` with "Admin"

**Test Function:** \`testUserCardRendering\` that:
- Takes \`props\` object as parameter
- Renders UserCard with those props
- Returns object with:
  - \`hasName\`: boolean if name is rendered
  - \`hasEmail\`: boolean if email is rendered
  - \`hasAdminBadge\`: boolean if admin badge is rendered
        `,
        hint: "Use conditional rendering for the admin badge. In the test, use getByText with try-catch to check if elements exist.",
        starterCode: `import React from 'react';

function UserCard({ name, email, isAdmin }) {
  // Your code here
}

export function testUserCardRendering(props) {
  // Render component with props
  // Check for name, email, and admin badge
  // Return { hasName, hasEmail, hasAdminBadge }
}

export default UserCard;`,
        solution: `import React from 'react';

function UserCard({ name, email, isAdmin }) {
  return (
    <div className="user-card">
      <h3>{name}</h3>
      <p>{email}</p>
      {isAdmin && <span className="badge">Admin</span>}
    </div>
  );
}

export function testUserCardRendering(props) {
  const { getByText, queryByText } = render(<UserCard {...props} />);

  let hasName = false;
  let hasEmail = false;
  let hasAdminBadge = false;

  try {
    hasName = getByText(props.name) !== null;
  } catch (e) {
    hasName = false;
  }

  try {
    hasEmail = getByText(props.email) !== null;
  } catch (e) {
    hasEmail = false;
  }

  hasAdminBadge = queryByText('Admin') !== null;

  return { hasName, hasEmail, hasAdminBadge };
}

export default UserCard;`,
        testCases: [
          {
            id: "test-1",
            description: "UserCard should render name in h3",
            testFunction: `
              const { container } = render(<UserCard name="John" email="john@example.com" isAdmin={false} />);
              const h3 = container.querySelector('h3');
              h3.textContent === 'John'
            `,
          },
          {
            id: "test-2",
            description: "UserCard should render email in p",
            testFunction: `
              const { getByText } = render(<UserCard name="John" email="john@example.com" isAdmin={false} />);
              getByText('john@example.com') !== null
            `,
          },
          {
            id: "test-3",
            description: "UserCard should show admin badge when isAdmin is true",
            testFunction: `
              const { getByText } = render(<UserCard name="Admin" email="admin@example.com" isAdmin={true} />);
              getByText('Admin') !== null
            `,
          },
          {
            id: "test-4",
            description: "UserCard should NOT show badge when isAdmin is false",
            testFunction: `
              const { queryByText } = render(<UserCard name="User" email="user@example.com" isAdmin={false} />);
              queryByText('Admin') === null
            `,
          },
          {
            id: "test-5",
            description: "testUserCardRendering should return correct results for admin user",
            testFunction: `
              const result = testUserCardRendering({ name: 'Alice', email: 'alice@example.com', isAdmin: true });
              result.hasName === true && result.hasEmail === true && result.hasAdminBadge === true
            `,
          },
          {
            id: "test-6",
            description: "testUserCardRendering should return correct results for regular user",
            testFunction: `
              const result = testUserCardRendering({ name: 'Bob', email: 'bob@example.com', isAdmin: false });
              result.hasName === true && result.hasEmail === true && result.hasAdminBadge === false
            `,
          },
        ],
        language: "jsx",
      },
    ],
  },

  // Lesson 4: Querying Elements
  {
    id: "testing-04",
    moduleId: "module-3-3",
    title: "Querying Elements",
    order: 4,
    xpReward: 350,
    difficulty: "advanced",
    steps: [
      {
        id: "testing-04-step-1",
        order: 1,
        instruction: `
# Querying Elements

React Testing Library provides multiple query methods to find elements.

**Query Types:**
- **getBy...**: Returns element or throws error (for elements that should exist)
- **queryBy...**: Returns element or null (for elements that might not exist)
- **findBy...**: Returns promise (for elements that appear asynchronously)

**Query Variants:**
\`\`\`jsx
// By text content
getByText('Submit')
getByText(/submit/i) // Case-insensitive regex

// By role (most accessible)
getByRole('button', { name: /submit/i })
getByRole('textbox', { name: /email/i })

// By label text
getByLabelText('Email address')

// By placeholder
getByPlaceholderText('Enter email')

// By test ID (use sparingly)
getByTestId('submit-button')
\`\`\`

**Priority Order:**
1. getByRole
2. getByLabelText
3. getByPlaceholderText
4. getByText
5. getByTestId (last resort)

## Your Task

Create a \`LoginForm\` component and query tests.

**Component:** \`LoginForm\` that returns a form with:
- Input with placeholder="Email" and data-testid="email-input"
- Input with placeholder="Password" and data-testid="password-input"
- Button with text "Login" and data-testid="login-button"

**Test Function:** \`testLoginFormQueries\` that:
- Renders LoginForm
- Returns object with:
  - \`emailInput\`: found by placeholder
  - \`passwordInput\`: found by placeholder
  - \`loginButton\`: found by text
  - \`allInputs\`: array of elements found by data-testid containing "input"
        `,
        hint: "Use getByPlaceholderText() for inputs, getByText() for button. Use querySelectorAll('[data-testid*=\"input\"]') for allInputs.",
        starterCode: `import React from 'react';

function LoginForm() {
  // Your code here
}

export function testLoginFormQueries() {
  const { getByPlaceholderText, getByText, container } = render(<LoginForm />);

  // Find elements using different query methods
  // Return { emailInput, passwordInput, loginButton, allInputs }
}

export default LoginForm;`,
        solution: `import React from 'react';

function LoginForm() {
  return (
    <form>
      <input
        type="email"
        placeholder="Email"
        data-testid="email-input"
      />
      <input
        type="password"
        placeholder="Password"
        data-testid="password-input"
      />
      <button type="submit" data-testid="login-button">
        Login
      </button>
    </form>
  );
}

export function testLoginFormQueries() {
  const { getByPlaceholderText, getByText, container } = render(<LoginForm />);

  const emailInput = getByPlaceholderText('Email');
  const passwordInput = getByPlaceholderText('Password');
  const loginButton = getByText('Login');
  const allInputs = Array.from(container.querySelectorAll('[data-testid*="input"]'));

  return { emailInput, passwordInput, loginButton, allInputs };
}

export default LoginForm;`,
        testCases: [
          {
            id: "test-1",
            description: "LoginForm should render email input with placeholder",
            testFunction: `
              const { getByPlaceholderText } = render(<LoginForm />);
              getByPlaceholderText('Email') !== null
            `,
          },
          {
            id: "test-2",
            description: "LoginForm should render password input with placeholder",
            testFunction: `
              const { getByPlaceholderText } = render(<LoginForm />);
              getByPlaceholderText('Password') !== null
            `,
          },
          {
            id: "test-3",
            description: "LoginForm should render login button with text",
            testFunction: `
              const { getByText } = render(<LoginForm />);
              const button = getByText('Login');
              button.tagName === 'BUTTON'
            `,
          },
          {
            id: "test-4",
            description: "All inputs should have data-testid attributes",
            testFunction: `
              const { container } = render(<LoginForm />);
              const testIds = container.querySelectorAll('[data-testid*="input"]');
              testIds.length >= 2
            `,
          },
          {
            id: "test-5",
            description: "testLoginFormQueries should find all elements",
            testFunction: `
              const result = testLoginFormQueries();
              result.emailInput !== null &&
              result.passwordInput !== null &&
              result.loginButton !== null
            `,
          },
          {
            id: "test-6",
            description: "testLoginFormQueries should return correct allInputs array",
            testFunction: `
              const result = testLoginFormQueries();
              Array.isArray(result.allInputs) && result.allInputs.length === 2
            `,
          },
        ],
        language: "jsx",
      },
    ],
  },

  // Lesson 5: User Interactions
  {
    id: "testing-05",
    moduleId: "module-3-3",
    title: "User Interactions",
    order: 5,
    xpReward: 400,
    difficulty: "advanced",
    steps: [
      {
        id: "testing-05-step-1",
        order: 1,
        instruction: `
# User Interactions

Test user interactions with the \`@testing-library/user-event\` library, which simulates real user behavior better than \`fireEvent\`.

**Common User Interactions:**
\`\`\`jsx
import userEvent from '@testing-library/user-event';

test('user can type in input', async () => {
  const user = userEvent.setup();
  render(<Input />);

  const input = screen.getByRole('textbox');
  await user.type(input, 'Hello');

  expect(input).toHaveValue('Hello');
});

test('user can click button', async () => {
  const user = userEvent.setup();
  const handleClick = jest.fn();
  render(<Button onClick={handleClick}>Click</Button>);

  await user.click(screen.getByRole('button'));

  expect(handleClick).toHaveBeenCalledTimes(1);
});
\`\`\`

**User Events:**
- \`user.click(element)\`: Click an element
- \`user.type(element, 'text')\`: Type into an input
- \`user.clear(element)\`: Clear an input
- \`user.selectOptions(element, value)\`: Select dropdown option
- \`user.hover(element)\`: Hover over element

## Your Task

Create a \`Counter\` component with interaction testing.

**Component:** \`Counter\` that:
- Uses \`useState\` with initial value 0
- Shows count in \`<p data-testid="count">\`Count: {count}\`</p>\`
- Has button with text "Increment" that increases count
- Has button with text "Decrement" that decreases count
- Has button with text "Reset" that sets count to 0

**Test Function:** \`testCounterInteractions\` that:
- Renders Counter
- Clicks Increment 3 times
- Clicks Decrement 1 time
- Clicks Reset
- Returns object with:
  - \`finalCount\`: the count after all interactions (should be 0)
  - \`clicksPerformed\`: should be 5
        `,
        hint: "Use useState for count. Each button should update count accordingly. In test, use container.querySelector and click() to simulate interactions.",
        starterCode: `import React, { useState } from 'react';

function Counter() {
  // Use useState for count
  // Create increment, decrement, reset handlers
  // Return JSX with count display and three buttons
}

export function testCounterInteractions() {
  const { container } = render(<Counter />);

  // Get buttons
  // Simulate clicks
  // Get final count value
  // Return { finalCount, clicksPerformed: 5 }
}

export default Counter;`,
        solution: `import React, { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p data-testid="count">Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <button onClick={() => setCount(count - 1)}>Decrement</button>
      <button onClick={() => setCount(0)}>Reset</button>
    </div>
  );
}

export function testCounterInteractions() {
  const { container, getByText } = render(<Counter />);

  const incrementBtn = getByText('Increment');
  const decrementBtn = getByText('Decrement');
  const resetBtn = getByText('Reset');

  // Click increment 3 times
  incrementBtn.click();
  incrementBtn.click();
  incrementBtn.click();

  // Click decrement 1 time
  decrementBtn.click();

  // Click reset
  resetBtn.click();

  const countElement = container.querySelector('[data-testid="count"]');
  const finalCount = parseInt(countElement.textContent.replace('Count: ', ''));

  return { finalCount, clicksPerformed: 5 };
}

export default Counter;`,
        testCases: [
          {
            id: "test-1",
            description: "Counter should start at 0",
            testFunction: `
              const { getByTestId } = render(<Counter />);
              getByTestId('count').textContent === 'Count: 0'
            `,
          },
          {
            id: "test-2",
            description: "Increment button should increase count",
            testFunction: `
              const { getByText, getByTestId } = render(<Counter />);
              getByText('Increment').click();
              getByTestId('count').textContent === 'Count: 1'
            `,
          },
          {
            id: "test-3",
            description: "Decrement button should decrease count",
            testFunction: `
              const { getByText, getByTestId } = render(<Counter />);
              getByText('Increment').click();
              getByText('Increment').click();
              getByText('Decrement').click();
              getByTestId('count').textContent === 'Count: 1'
            `,
          },
          {
            id: "test-4",
            description: "Reset button should set count to 0",
            testFunction: `
              const { getByText, getByTestId } = render(<Counter />);
              getByText('Increment').click();
              getByText('Increment').click();
              getByText('Reset').click();
              getByTestId('count').textContent === 'Count: 0'
            `,
          },
          {
            id: "test-5",
            description: "testCounterInteractions should return correct finalCount",
            testFunction: `
              const result = testCounterInteractions();
              result.finalCount === 0
            `,
          },
          {
            id: "test-6",
            description: "testCounterInteractions should track clicks performed",
            testFunction: `
              const result = testCounterInteractions();
              result.clicksPerformed === 5
            `,
          },
        ],
        language: "jsx",
      },
    ],
  },

  // Lesson 6: Async Testing
  {
    id: "testing-06",
    moduleId: "module-3-3",
    title: "Async Testing",
    order: 6,
    xpReward: 400,
    difficulty: "advanced",
    steps: [
      {
        id: "testing-06-step-1",
        order: 1,
        instruction: `
# Async Testing

Many React components perform asynchronous operations like API calls. React Testing Library provides async utilities for testing these scenarios.

**Async Utilities:**
\`\`\`jsx
import { render, screen, waitFor } from '@testing-library/react';

test('loads and displays data', async () => {
  render(<UserProfile userId="1" />);

  // Wait for element to appear
  const name = await screen.findByText(/john/i);
  expect(name).toBeInTheDocument();

  // Or wait for a condition
  await waitFor(() => {
    expect(screen.getByText('Loaded')).toBeInTheDocument();
  });
});
\`\`\`

**Key Methods:**
- \`findBy...\`: Returns promise, waits for element (combines getBy + waitFor)
- \`waitFor()\`: Waits for assertion to pass
- \`waitForElementToBeRemoved()\`: Waits for element to be removed

**Testing Loading States:**
\`\`\`jsx
test('shows loading then data', async () => {
  render(<DataComponent />);

  // Initially shows loading
  expect(screen.getByText('Loading...')).toBeInTheDocument();

  // Wait for data to appear
  await screen.findByText('Data loaded');

  // Loading should be gone
  expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
});
\`\`\`

## Your Task

Create a \`DataFetcher\` component that simulates async data loading.

**Component:** \`DataFetcher\` that:
- Accepts \`userId\` prop
- Uses \`useState\` for \`loading\` (initially true) and \`data\` (initially null)
- Uses \`useEffect\` to simulate fetching:
  - After 100ms, set loading to false and data to "User {userId}"
- Shows "Loading..." in \`<p>\` when loading is true
- Shows data in \`<p data-testid="user-data">\` when loading is false

**Test Function:** \`testAsyncDataFetcher\` that:
- Renders DataFetcher with userId="123"
- Checks if "Loading..." is initially present
- Waits 150ms using setTimeout wrapped in Promise
- Returns object with:
  - \`initialLoading\`: boolean if Loading was present
  - \`finalData\`: the text content after waiting
        `,
        hint: "Use useEffect with setTimeout. In test, use setTimeout with Promise to wait for the data to load.",
        starterCode: `import React, { useState, useEffect } from 'react';

function DataFetcher({ userId }) {
  // Use useState for loading and data
  // Use useEffect to simulate data fetching
  // Show loading state, then data
}

export function testAsyncDataFetcher() {
  const { queryByText, getByTestId, container } = render(<DataFetcher userId="123" />);

  // Check if Loading is present
  const initialLoading = queryByText('Loading...') !== null;

  // Wait for data to load
  return new Promise((resolve) => {
    setTimeout(() => {
      const dataElement = container.querySelector('[data-testid="user-data"]');
      const finalData = dataElement ? dataElement.textContent : null;
      resolve({ initialLoading, finalData });
    }, 150);
  });
}

export default DataFetcher;`,
        solution: `import React, { useState, useEffect } from 'react';

function DataFetcher({ userId }) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      setData(\`User \${userId}\`);
    }, 100);

    return () => clearTimeout(timer);
  }, [userId]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return <p data-testid="user-data">{data}</p>;
}

export function testAsyncDataFetcher() {
  const { queryByText, container } = render(<DataFetcher userId="123" />);

  const initialLoading = queryByText('Loading...') !== null;

  return new Promise((resolve) => {
    setTimeout(() => {
      const dataElement = container.querySelector('[data-testid="user-data"]');
      const finalData = dataElement ? dataElement.textContent : null;
      resolve({ initialLoading, finalData });
    }, 150);
  });
}

export default DataFetcher;`,
        testCases: [
          {
            id: "test-1",
            description: "DataFetcher should show loading initially",
            testFunction: `
              const { getByText } = render(<DataFetcher userId="1" />);
              getByText('Loading...') !== null
            `,
          },
          {
            id: "test-2",
            description: "DataFetcher should eventually show data",
            testFunction: `
              return new Promise((resolve) => {
                const { container } = render(<DataFetcher userId="456" />);
                setTimeout(() => {
                  const data = container.querySelector('[data-testid="user-data"]');
                  resolve(data && data.textContent === 'User 456');
                }, 150);
              });
            `,
          },
          {
            id: "test-3",
            description: "testAsyncDataFetcher should detect initial loading",
            testFunction: `
              return testAsyncDataFetcher().then(result => {
                return result.initialLoading === true;
              });
            `,
          },
          {
            id: "test-4",
            description: "testAsyncDataFetcher should get final data",
            testFunction: `
              return testAsyncDataFetcher().then(result => {
                return result.finalData === 'User 123';
              });
            `,
          },
        ],
        language: "jsx",
      },
    ],
  },

  // Lesson 7: Mocking Functions
  {
    id: "testing-07",
    moduleId: "module-3-3",
    title: "Mocking Functions",
    order: 7,
    xpReward: 400,
    difficulty: "advanced",
    steps: [
      {
        id: "testing-07-step-1",
        order: 1,
        instruction: `
# Mocking Functions

Mock functions let you test component behavior without executing the actual implementation. This is essential for testing callbacks, event handlers, and props.

**Creating Mock Functions:**
\`\`\`jsx
const mockFunction = jest.fn();

// Mock with implementation
const mockFunction = jest.fn((x) => x * 2);

// Mock with return value
const mockFunction = jest.fn().mockReturnValue(42);
\`\`\`

**Testing Mock Calls:**
\`\`\`jsx
const handleClick = jest.fn();
render(<Button onClick={handleClick}>Click</Button>);

fireEvent.click(screen.getByRole('button'));

expect(handleClick).toHaveBeenCalled();
expect(handleClick).toHaveBeenCalledTimes(1);
expect(handleClick).toHaveBeenCalledWith(expectedArg);
\`\`\`

**Checking Mock Data:**
\`\`\`jsx
// Access call history
mockFunction.mock.calls // [[arg1, arg2], [arg1, arg2]]
mockFunction.mock.results // [{ value: returnValue }]
\`\`\`

## Your Task

Create a \`SearchBar\` component that uses callback functions.

**Component:** \`SearchBar\` that:
- Accepts \`onSearch\` and \`onChange\` props
- Has input with placeholder="Search..."
- Has button with text "Search"
- Calls \`onChange(e.target.value)\` when input changes
- Calls \`onSearch(inputValue)\` when button clicks

**Test Function:** \`testSearchBarMocks\` that:
- Creates mock functions for onSearch and onChange
- Renders SearchBar with these mocks
- Types "test query" into input (simulate by setting value and calling onChange)
- Clicks search button
- Returns object with:
  - \`onChangeCalls\`: number of times onChange was called
  - \`onSearchCalls\`: number of times onSearch was called
  - \`lastSearchQuery\`: the argument passed to onSearch

Note: Use a simple call counter for this exercise.
        `,
        hint: "Store the input value in state. Call onChange when input changes and onSearch when button is clicked. Track mock calls in the test function.",
        starterCode: `import React, { useState } from 'react';

function SearchBar({ onSearch, onChange }) {
  const [value, setValue] = useState('');

  const handleChange = (e) => {
    // Update value and call onChange
  };

  const handleSearch = () => {
    // Call onSearch with current value
  };

  return (
    <div>
      <input
        placeholder="Search..."
        value={value}
        onChange={handleChange}
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
}

export function testSearchBarMocks() {
  let onChangeCallCount = 0;
  let onSearchCallCount = 0;
  let lastSearchQuery = null;

  const mockOnChange = (value) => {
    onChangeCallCount++;
  };

  const mockOnSearch = (query) => {
    onSearchCallCount++;
    lastSearchQuery = query;
  };

  const { getByPlaceholderText, getByText } = render(
    <SearchBar onSearch={mockOnSearch} onChange={mockOnChange} />
  );

  // Simulate typing and searching
  const input = getByPlaceholderText('Search...');

  // Simulate typing "test query"
  // For simplicity, we'll simulate change event
  input.value = 'test query';
  input.dispatchEvent(new Event('change', { bubbles: true }));

  // Click search
  getByText('Search').click();

  return {
    onChangeCalls: onChangeCallCount,
    onSearchCalls: onSearchCallCount,
    lastSearchQuery
  };
}

export default SearchBar;`,
        solution: `import React, { useState } from 'react';

function SearchBar({ onSearch, onChange }) {
  const [value, setValue] = useState('');

  const handleChange = (e) => {
    const newValue = e.target.value;
    setValue(newValue);
    if (onChange) {
      onChange(newValue);
    }
  };

  const handleSearch = () => {
    if (onSearch) {
      onSearch(value);
    }
  };

  return (
    <div>
      <input
        placeholder="Search..."
        value={value}
        onChange={handleChange}
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
}

export function testSearchBarMocks() {
  let onChangeCallCount = 0;
  let onSearchCallCount = 0;
  let lastSearchQuery = null;

  const mockOnChange = (value) => {
    onChangeCallCount++;
  };

  const mockOnSearch = (query) => {
    onSearchCallCount++;
    lastSearchQuery = query;
  };

  const { getByPlaceholderText, getByText } = render(
    <SearchBar onSearch={mockOnSearch} onChange={mockOnChange} />
  );

  const input = getByPlaceholderText('Search...');

  // Simulate typing
  input.value = 'test query';
  input.dispatchEvent(new Event('change', { bubbles: true }));

  // Click search
  getByText('Search').click();

  return {
    onChangeCalls: onChangeCallCount,
    onSearchCalls: onSearchCallCount,
    lastSearchQuery
  };
}

export default SearchBar;`,
        testCases: [
          {
            id: "test-1",
            description: "SearchBar should render input and button",
            testFunction: `
              const { getByPlaceholderText, getByText } = render(
                <SearchBar onSearch={() => {}} onChange={() => {}} />
              );
              getByPlaceholderText('Search...') !== null && getByText('Search') !== null
            `,
          },
          {
            id: "test-2",
            description: "SearchBar should call onChange when typing",
            testFunction: `
              let called = false;
              const { getByPlaceholderText } = render(
                <SearchBar onChange={() => called = true} onSearch={() => {}} />
              );
              const input = getByPlaceholderText('Search...');
              input.value = 'test';
              input.dispatchEvent(new Event('change', { bubbles: true }));
              called === true
            `,
          },
          {
            id: "test-3",
            description: "SearchBar should call onSearch when button clicked",
            testFunction: `
              let called = false;
              const { getByText } = render(
                <SearchBar onSearch={() => called = true} onChange={() => {}} />
              );
              getByText('Search').click();
              called === true
            `,
          },
          {
            id: "test-4",
            description: "testSearchBarMocks should track onChange calls",
            testFunction: `
              const result = testSearchBarMocks();
              result.onChangeCalls === 1
            `,
          },
          {
            id: "test-5",
            description: "testSearchBarMocks should track onSearch calls",
            testFunction: `
              const result = testSearchBarMocks();
              result.onSearchCalls === 1
            `,
          },
          {
            id: "test-6",
            description: "testSearchBarMocks should capture search query",
            testFunction: `
              const result = testSearchBarMocks();
              result.lastSearchQuery === 'test query'
            `,
          },
        ],
        language: "jsx",
      },
    ],
  },

  // Lesson 8: Mocking API Calls
  {
    id: "testing-08",
    moduleId: "module-3-3",
    title: "Mocking API Calls",
    order: 8,
    xpReward: 400,
    difficulty: "advanced",
    steps: [
      {
        id: "testing-08-step-1",
        order: 1,
        instruction: `
# Mocking API Calls

When testing components that fetch data, mock the API calls to avoid making real network requests.

**Mocking fetch with jest:**
\`\`\`jsx
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ data: 'test' }),
  })
);

test('loads data from API', async () => {
  render(<DataComponent />);

  const data = await screen.findByText('test');
  expect(data).toBeInTheDocument();

  expect(fetch).toHaveBeenCalledWith('/api/data');
});
\`\`\`

**Mocking Different Responses:**
\`\`\`jsx
// Success
fetch.mockResolvedValueOnce({
  json: async () => ({ data: 'success' })
});

// Error
fetch.mockRejectedValueOnce(new Error('API Error'));
\`\`\`

**Testing Error States:**
\`\`\`jsx
test('shows error on API failure', async () => {
  fetch.mockRejectedValueOnce(new Error('Failed'));

  render(<DataComponent />);

  expect(await screen.findByText(/error/i)).toBeInTheDocument();
});
\`\`\`

## Your Task

Create a \`UserList\` component that fetches and displays users.

**Component:** \`UserList\` that:
- Uses \`useState\` for \`users\` (array), \`loading\`, and \`error\`
- Uses \`useEffect\` to fetch from \`/api/users\`
- Shows "Loading users..." when loading
- Shows "Error: {error.message}" if error occurs
- Maps users to \`<li key={user.id}>\` showing \`{user.name}\`
- Uses a \`fetchUsers\` prop if provided, otherwise uses global fetch

**Test Function:** \`testUserListWithMockAPI\` that:
- Creates a mock fetch returning \`[{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }]\`
- Renders UserList with the mock fetch
- Waits for data to load
- Returns object with:
  - \`userCount\`: number of users rendered
  - \`userNames\`: array of user names
        `,
        hint: "Accept fetchUsers as prop for testing. Use useEffect to call it. In test, create a mock that resolves to the user data.",
        starterCode: `import React, { useState, useEffect } from 'react';

function UserList({ fetchUsers }) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        // Use fetchUsers if provided, otherwise use fetch
        const fetcher = fetchUsers || fetch;
        const response = await fetcher('/api/users');
        const data = await response.json();
        setUsers(data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    loadUsers();
  }, [fetchUsers]);

  if (loading) return <p>Loading users...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <ul>
      {users.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}

export function testUserListWithMockAPI() {
  const mockFetch = () => {
    return Promise.resolve({
      json: () => Promise.resolve([
        { id: 1, name: 'Alice' },
        { id: 2, name: 'Bob' }
      ])
    });
  };

  const { container } = render(<UserList fetchUsers={mockFetch} />);

  // Wait for data to load
  return new Promise((resolve) => {
    setTimeout(() => {
      const listItems = container.querySelectorAll('li');
      const userCount = listItems.length;
      const userNames = Array.from(listItems).map(li => li.textContent);
      resolve({ userCount, userNames });
    }, 100);
  });
}

export default UserList;`,
        solution: `import React, { useState, useEffect } from 'react';

function UserList({ fetchUsers }) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const fetcher = fetchUsers || fetch;
        const response = await fetcher('/api/users');
        const data = await response.json();
        setUsers(data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    loadUsers();
  }, [fetchUsers]);

  if (loading) return <p>Loading users...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <ul>
      {users.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}

export function testUserListWithMockAPI() {
  const mockFetch = () => {
    return Promise.resolve({
      json: () => Promise.resolve([
        { id: 1, name: 'Alice' },
        { id: 2, name: 'Bob' }
      ])
    });
  };

  const { container } = render(<UserList fetchUsers={mockFetch} />);

  return new Promise((resolve) => {
    setTimeout(() => {
      const listItems = container.querySelectorAll('li');
      const userCount = listItems.length;
      const userNames = Array.from(listItems).map(li => li.textContent);
      resolve({ userCount, userNames });
    }, 100);
  });
}

export default UserList;`,
        testCases: [
          {
            id: "test-1",
            description: "UserList should show loading initially",
            testFunction: `
              const mockFetch = () => new Promise(() => {});
              const { getByText } = render(<UserList fetchUsers={mockFetch} />);
              getByText('Loading users...') !== null
            `,
          },
          {
            id: "test-2",
            description: "UserList should display users after loading",
            testFunction: `
              const mockFetch = () => Promise.resolve({
                json: () => Promise.resolve([{ id: 1, name: 'Test User' }])
              });
              return new Promise((resolve) => {
                const { getByText } = render(<UserList fetchUsers={mockFetch} />);
                setTimeout(() => {
                  resolve(getByText('Test User') !== null);
                }, 100);
              });
            `,
          },
          {
            id: "test-3",
            description: "UserList should show error on failure",
            testFunction: `
              const mockFetch = () => Promise.reject(new Error('Network error'));
              return new Promise((resolve) => {
                const { getByText } = render(<UserList fetchUsers={mockFetch} />);
                setTimeout(() => {
                  resolve(getByText('Error: Network error') !== null);
                }, 100);
              });
            `,
          },
          {
            id: "test-4",
            description: "testUserListWithMockAPI should return correct user count",
            testFunction: `
              return testUserListWithMockAPI().then(result => {
                return result.userCount === 2;
              });
            `,
          },
          {
            id: "test-5",
            description: "testUserListWithMockAPI should return user names",
            testFunction: `
              return testUserListWithMockAPI().then(result => {
                return result.userNames.includes('Alice') && result.userNames.includes('Bob');
              });
            `,
          },
        ],
        language: "jsx",
      },
    ],
  },

  // Lesson 9: Testing Custom Hooks
  {
    id: "testing-09",
    moduleId: "module-3-3",
    title: "Testing Custom Hooks",
    order: 9,
    xpReward: 400,
    difficulty: "advanced",
    steps: [
      {
        id: "testing-09-step-1",
        order: 1,
        instruction: `
# Testing Custom Hooks

Custom hooks can be tested using the \`@testing-library/react-hooks\` library or by testing them within a component.

**Testing Hooks in a Component:**
\`\`\`jsx
function TestComponent() {
  const { value, increment } = useCounter(0);
  return (
    <div>
      <span data-testid="count">{value}</span>
      <button onClick={increment}>Increment</button>
    </div>
  );
}

test('custom hook works', () => {
  render(<TestComponent />);
  expect(screen.getByTestId('count')).toHaveTextContent('0');

  fireEvent.click(screen.getByText('Increment'));
  expect(screen.getByTestId('count')).toHaveTextContent('1');
});
\`\`\`

**Testing Hook Logic:**
\`\`\`jsx
// Custom hook
function useToggle(initial = false) {
  const [value, setValue] = useState(initial);
  const toggle = () => setValue(v => !v);
  return { value, toggle };
}

// Test component
function TestHarness() {
  const { value, toggle } = useToggle();
  return (
    <>
      <div data-testid="value">{String(value)}</div>
      <button onClick={toggle}>Toggle</button>
    </>
  );
}
\`\`\`

## Your Task

Create a custom hook \`useLocalStorage\` and test it.

**Hook:** \`useLocalStorage(key, initialValue)\` that:
- Returns \`[value, setValue]\` like useState
- On first render, tries to get value from localStorage[key]
- If not found, uses initialValue
- When setValue is called, updates state AND localStorage
- For this exercise, use a simple object as mock localStorage

**Component:** \`StorageDemo\` that:
- Accepts \`storageKey\` and \`initialValue\` props
- Uses useLocalStorage with these values
- Shows value in \`<p data-testid="display">\`
- Has button "Update" that sets value to "updated"
- Has button "Clear" that sets value to ""

**Test Function:** \`testUseLocalStorage\` that:
- Creates mock storage object
- Renders StorageDemo with storageKey="test", initialValue="initial"
- Clicks "Update" button
- Returns object with:
  - \`initialValue\`: the first displayed value
  - \`updatedValue\`: the value after clicking Update
  - \`storageUpdated\`: boolean if mock storage was updated
        `,
        hint: "Pass a storage object as prop to make it testable. Update both state and storage when setValue is called.",
        starterCode: `import React, { useState } from 'react';

function useLocalStorage(key, initialValue, storage = {}) {
  const [value, setValue] = useState(() => {
    // Try to get from storage, otherwise use initialValue
    const stored = storage[key];
    return stored !== undefined ? stored : initialValue;
  });

  const setStoredValue = (newValue) => {
    // Update state and storage
    setValue(newValue);
    storage[key] = newValue;
  };

  return [value, setStoredValue];
}

function StorageDemo({ storageKey, initialValue, storage }) {
  const [value, setValue] = useLocalStorage(storageKey, initialValue, storage);

  return (
    <div>
      <p data-testid="display">{value}</p>
      <button onClick={() => setValue('updated')}>Update</button>
      <button onClick={() => setValue('')}>Clear</button>
    </div>
  );
}

export function testUseLocalStorage() {
  const mockStorage = {};
  const { getByTestId, getByText } = render(
    <StorageDemo storageKey="test" initialValue="initial" storage={mockStorage} />
  );

  const initialValue = getByTestId('display').textContent;

  // Click update
  getByText('Update').click();

  const updatedValue = getByTestId('display').textContent;
  const storageUpdated = mockStorage['test'] === 'updated';

  return { initialValue, updatedValue, storageUpdated };
}

export { useLocalStorage, StorageDemo };
export default StorageDemo;`,
        solution: `import React, { useState } from 'react';

function useLocalStorage(key, initialValue, storage = {}) {
  const [value, setValue] = useState(() => {
    const stored = storage[key];
    return stored !== undefined ? stored : initialValue;
  });

  const setStoredValue = (newValue) => {
    setValue(newValue);
    storage[key] = newValue;
  };

  return [value, setStoredValue];
}

function StorageDemo({ storageKey, initialValue, storage }) {
  const [value, setValue] = useLocalStorage(storageKey, initialValue, storage);

  return (
    <div>
      <p data-testid="display">{value}</p>
      <button onClick={() => setValue('updated')}>Update</button>
      <button onClick={() => setValue('')}>Clear</button>
    </div>
  );
}

export function testUseLocalStorage() {
  const mockStorage = {};
  const { getByTestId, getByText } = render(
    <StorageDemo storageKey="test" initialValue="initial" storage={mockStorage} />
  );

  const initialValue = getByTestId('display').textContent;

  getByText('Update').click();

  const updatedValue = getByTestId('display').textContent;
  const storageUpdated = mockStorage['test'] === 'updated';

  return { initialValue, updatedValue, storageUpdated };
}

export { useLocalStorage, StorageDemo };
export default StorageDemo;`,
        testCases: [
          {
            id: "test-1",
            description: "StorageDemo should display initial value",
            testFunction: `
              const { getByTestId } = render(
                <StorageDemo storageKey="test" initialValue="hello" storage={{}} />
              );
              getByTestId('display').textContent === 'hello'
            `,
          },
          {
            id: "test-2",
            description: "Update button should change display value",
            testFunction: `
              const { getByTestId, getByText } = render(
                <StorageDemo storageKey="test" initialValue="initial" storage={{}} />
              );
              getByText('Update').click();
              getByTestId('display').textContent === 'updated'
            `,
          },
          {
            id: "test-3",
            description: "Clear button should set value to empty string",
            testFunction: `
              const { getByTestId, getByText } = render(
                <StorageDemo storageKey="test" initialValue="initial" storage={{}} />
              );
              getByText('Clear').click();
              getByTestId('display').textContent === ''
            `,
          },
          {
            id: "test-4",
            description: "Hook should update storage when value changes",
            testFunction: `
              const mockStorage = {};
              const { getByText } = render(
                <StorageDemo storageKey="mykey" initialValue="initial" storage={mockStorage} />
              );
              getByText('Update').click();
              mockStorage['mykey'] === 'updated'
            `,
          },
          {
            id: "test-5",
            description: "testUseLocalStorage should return correct initial value",
            testFunction: `
              const result = testUseLocalStorage();
              result.initialValue === 'initial'
            `,
          },
          {
            id: "test-6",
            description: "testUseLocalStorage should verify storage update",
            testFunction: `
              const result = testUseLocalStorage();
              result.updatedValue === 'updated' && result.storageUpdated === true
            `,
          },
        ],
        language: "jsx",
      },
    ],
  },

  // Lesson 10: Testing Context
  {
    id: "testing-10",
    moduleId: "module-3-3",
    title: "Testing Context",
    order: 10,
    xpReward: 400,
    difficulty: "advanced",
    steps: [
      {
        id: "testing-10-step-1",
        order: 1,
        instruction: `
# Testing Context

Testing components that use React Context requires wrapping them in the appropriate provider.

**Basic Context Testing:**
\`\`\`jsx
const ThemeContext = createContext();

function ThemedComponent() {
  const theme = useContext(ThemeContext);
  return <div className={theme}>Content</div>;
}

test('uses theme from context', () => {
  render(
    <ThemeContext.Provider value="dark">
      <ThemedComponent />
    </ThemeContext.Provider>
  );

  expect(screen.getByText('Content')).toHaveClass('dark');
});
\`\`\`

**Creating Test Wrappers:**
\`\`\`jsx
function renderWithContext(component, contextValue) {
  return render(
    <MyContext.Provider value={contextValue}>
      {component}
    </MyContext.Provider>
  );
}

test('with custom wrapper', () => {
  renderWithContext(<MyComponent />, { user: 'Alice' });
  expect(screen.getByText('Alice')).toBeInTheDocument();
});
\`\`\`

**Testing Context Updates:**
\`\`\`jsx
test('updates context value', () => {
  const { rerender } = render(
    <ThemeContext.Provider value="light">
      <ThemedComponent />
    </ThemeContext.Provider>
  );

  rerender(
    <ThemeContext.Provider value="dark">
      <ThemedComponent />
    </ThemeContext.Provider>
  );

  expect(screen.getByText('Content')).toHaveClass('dark');
});
\`\`\`

## Your Task

Create a user authentication context and test it.

**Context:** Create \`UserContext\` with:
- \`createContext()\` with default value \`{ user: null, login: () => {}, logout: () => {} }\`

**Provider:** \`UserProvider\` component that:
- Uses \`useState\` for user (initially null)
- Provides \`{ user, login: (name) => setUser({ name }), logout: () => setUser(null) }\`
- Accepts children prop

**Component:** \`UserDisplay\` that:
- Uses \`useContext(UserContext)\`
- Shows "Not logged in" when user is null
- Shows "Welcome, {user.name}" when user exists
- Has button "Login as Alice" that calls login('Alice')
- Has button "Logout" that calls logout()

**Test Function:** \`testUserContext\` that:
- Renders UserDisplay wrapped in UserProvider
- Clicks "Login as Alice"
- Returns object with:
  - \`initialText\`: text before login
  - \`loggedInText\`: text after login
  - \`hasLoginButton\`: boolean if login button exists initially
        `,
        hint: "Create context with createContext, provider with useState, and component with useContext. Test by wrapping component in provider.",
        starterCode: `import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext({
  user: null,
  login: () => {},
  logout: () => {}
});

function UserProvider({ children }) {
  const [user, setUser] = useState(null);

  const login = (name) => setUser({ name });
  const logout = () => setUser(null);

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
}

function UserDisplay() {
  const { user, login, logout } = useContext(UserContext);

  return (
    <div>
      <p data-testid="status">
        {user ? \`Welcome, \${user.name}\` : 'Not logged in'}
      </p>
      <button onClick={() => login('Alice')}>Login as Alice</button>
      <button onClick={logout}>Logout</button>
    </div>
  );
}

export function testUserContext() {
  const { getByTestId, getByText, queryByText } = render(
    <UserProvider>
      <UserDisplay />
    </UserProvider>
  );

  const initialText = getByTestId('status').textContent;
  const hasLoginButton = queryByText('Login as Alice') !== null;

  // Click login
  getByText('Login as Alice').click();

  const loggedInText = getByTestId('status').textContent;

  return { initialText, loggedInText, hasLoginButton };
}

export { UserContext, UserProvider, UserDisplay };
export default UserDisplay;`,
        solution: `import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext({
  user: null,
  login: () => {},
  logout: () => {}
});

function UserProvider({ children }) {
  const [user, setUser] = useState(null);

  const login = (name) => setUser({ name });
  const logout = () => setUser(null);

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
}

function UserDisplay() {
  const { user, login, logout } = useContext(UserContext);

  return (
    <div>
      <p data-testid="status">
        {user ? \`Welcome, \${user.name}\` : 'Not logged in'}
      </p>
      <button onClick={() => login('Alice')}>Login as Alice</button>
      <button onClick={logout}>Logout</button>
    </div>
  );
}

export function testUserContext() {
  const { getByTestId, getByText, queryByText } = render(
    <UserProvider>
      <UserDisplay />
    </UserProvider>
  );

  const initialText = getByTestId('status').textContent;
  const hasLoginButton = queryByText('Login as Alice') !== null;

  getByText('Login as Alice').click();

  const loggedInText = getByTestId('status').textContent;

  return { initialText, loggedInText, hasLoginButton };
}

export { UserContext, UserProvider, UserDisplay };
export default UserDisplay;`,
        testCases: [
          {
            id: "test-1",
            description: "UserDisplay should show 'Not logged in' initially",
            testFunction: `
              const { getByTestId } = render(
                <UserProvider>
                  <UserDisplay />
                </UserProvider>
              );
              getByTestId('status').textContent === 'Not logged in'
            `,
          },
          {
            id: "test-2",
            description: "Login button should update user state",
            testFunction: `
              const { getByTestId, getByText } = render(
                <UserProvider>
                  <UserDisplay />
                </UserProvider>
              );
              getByText('Login as Alice').click();
              getByTestId('status').textContent === 'Welcome, Alice'
            `,
          },
          {
            id: "test-3",
            description: "Logout button should clear user state",
            testFunction: `
              const { getByTestId, getByText } = render(
                <UserProvider>
                  <UserDisplay />
                </UserProvider>
              );
              getByText('Login as Alice').click();
              getByText('Logout').click();
              getByTestId('status').textContent === 'Not logged in'
            `,
          },
          {
            id: "test-4",
            description: "testUserContext should capture initial state",
            testFunction: `
              const result = testUserContext();
              result.initialText === 'Not logged in'
            `,
          },
          {
            id: "test-5",
            description: "testUserContext should capture logged in state",
            testFunction: `
              const result = testUserContext();
              result.loggedInText === 'Welcome, Alice'
            `,
          },
          {
            id: "test-6",
            description: "testUserContext should verify login button exists",
            testFunction: `
              const result = testUserContext();
              result.hasLoginButton === true
            `,
          },
        ],
        language: "jsx",
      },
    ],
  },
];
