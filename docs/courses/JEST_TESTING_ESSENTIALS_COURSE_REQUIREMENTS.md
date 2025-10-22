# Jest Testing Essentials for Interviews & Work
## Master Testing for React & JavaScript Development

---

## Course Overview

This focused Jest curriculum covers exactly what you need to pass technical interviews and write quality tests in professional environments. Learn to test React components, handle async code, mock dependencies, and follow testing best practices.

**Target Audience:** React/JavaScript developers who need testing skills for interviews and production code

**Time Commitment:** 10-15 hours

**Success Metrics:**
- Write comprehensive component tests
- Pass testing technical interviews
- Achieve 80%+ code coverage
- Debug failing tests quickly
- Follow testing best practices

---

## What You'll Learn

### Core Skills
- ✅ Jest fundamentals and assertions
- ✅ React component testing
- ✅ Mocking (functions, modules, APIs)
- ✅ Async testing patterns
- ✅ Snapshot testing
- ✅ Test coverage
- ✅ Testing best practices

---

## Learning Path

### Module 1: Jest Fundamentals (3-4 hours)
**Level: Testing Novice**

#### 1.1: Basic Test Structure & Assertions

**Essential Concepts:**
```javascript
// Basic test structure
describe('Calculator', () => {
  it('should add two numbers correctly', () => {
    const result = add(2, 3);
    expect(result).toBe(5);
  });

  it('should subtract two numbers correctly', () => {
    const result = subtract(5, 3);
    expect(result).toBe(2);
  });
});

// Common matchers
test('matchers examples', () => {
  // Equality
  expect(2 + 2).toBe(4);                    // Strict equality
  expect({name: 'John'}).toEqual({name: 'John'}); // Deep equality

  // Truthiness
  expect(null).toBeNull();
  expect(undefined).toBeUndefined();
  expect(true).toBeTruthy();
  expect(false).toBeFalsy();

  // Numbers
  expect(10).toBeGreaterThan(5);
  expect(5).toBeLessThan(10);
  expect(0.1 + 0.2).toBeCloseTo(0.3);      // Floating point

  // Strings
  expect('hello world').toMatch(/world/);
  expect('test@example.com').toContain('@');

  // Arrays
  expect([1, 2, 3]).toContain(2);
  expect([1, 2, 3]).toHaveLength(3);

  // Objects
  expect({name: 'John', age: 30}).toHaveProperty('name');
  expect({name: 'John'}).toMatchObject({name: 'John'});

  // Exceptions
  expect(() => throwError()).toThrow();
  expect(() => throwError()).toThrow('error message');
});

// Setup and teardown
describe('Database', () => {
  beforeAll(() => {
    // Runs once before all tests
    connectToDatabase();
  });

  afterAll(() => {
    // Runs once after all tests
    disconnectFromDatabase();
  });

  beforeEach(() => {
    // Runs before each test
    clearDatabase();
  });

  afterEach(() => {
    // Runs after each test
    cleanupTestData();
  });

  it('should insert data', () => {
    // test code
  });
});

// Grouping tests
describe('User Service', () => {
  describe('registration', () => {
    it('should create user with valid data', () => {});
    it('should reject invalid email', () => {});
  });

  describe('authentication', () => {
    it('should login with correct credentials', () => {});
    it('should reject wrong password', () => {});
  });
});
```

**Interview Questions (XP: 100):**
1. What's the difference between `toBe` and `toEqual`?
2. When would you use `beforeEach` vs `beforeAll`?
3. How do you test if a function throws an error?
4. What are describe blocks used for?
5. How do you skip or focus specific tests?

---

#### 1.2: Testing Functions & Logic

**Essential Patterns:**
```javascript
// Testing pure functions
describe('Pure Functions', () => {
  it('should always return same output for same input', () => {
    expect(double(5)).toBe(10);
    expect(double(5)).toBe(10); // Consistent
  });
});

// Testing with different inputs
describe('isEven', () => {
  it.each([
    [2, true],
    [3, false],
    [0, true],
    [-2, true],
    [-3, false]
  ])('isEven(%i) should return %s', (input, expected) => {
    expect(isEven(input)).toBe(expected);
  });
});

// Testing edge cases
describe('divide', () => {
  it('should divide two numbers', () => {
    expect(divide(10, 2)).toBe(5);
  });

  it('should handle division by zero', () => {
    expect(() => divide(10, 0)).toThrow('Cannot divide by zero');
  });

  it('should handle negative numbers', () => {
    expect(divide(-10, 2)).toBe(-5);
  });

  it('should handle decimal results', () => {
    expect(divide(5, 2)).toBeCloseTo(2.5);
  });
});

// Testing object transformations
describe('formatUser', () => {
  it('should format user data correctly', () => {
    const input = {
      first_name: 'John',
      last_name: 'Doe',
      email: 'JOHN@EXAMPLE.COM'
    };

    const result = formatUser(input);

    expect(result).toEqual({
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      fullName: 'John Doe'
    });
  });
});
```

**XP Rewards:** 150 XP + "Function Tester" badge

---

### Module 2: React Component Testing (4-5 hours)
**Level: Component Tester**

#### 2.1: Testing React Components with React Testing Library

**Essential Setup:**
```javascript
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Button from './Button';

// Basic component rendering
test('renders button with text', () => {
  render(<Button>Click me</Button>);

  const button = screen.getByText('Click me');
  expect(button).toBeInTheDocument();
});

// Testing props
test('applies correct className', () => {
  render(<Button className="primary">Click</Button>);

  const button = screen.getByText('Click');
  expect(button).toHaveClass('primary');
});

// Testing user interactions
test('calls onClick when clicked', async () => {
  const handleClick = jest.fn();
  const user = userEvent.setup();

  render(<Button onClick={handleClick}>Click</Button>);

  const button = screen.getByText('Click');
  await user.click(button);

  expect(handleClick).toHaveBeenCalledTimes(1);
});

// Testing conditional rendering
test('shows loading state', () => {
  render(<Button loading>Click</Button>);

  expect(screen.getByText('Loading...')).toBeInTheDocument();
  expect(screen.queryByText('Click')).not.toBeInTheDocument();
});

// Testing forms
test('submits form with input value', async () => {
  const handleSubmit = jest.fn();
  const user = userEvent.setup();

  render(<LoginForm onSubmit={handleSubmit} />);

  const emailInput = screen.getByLabelText('Email');
  const passwordInput = screen.getByLabelText('Password');
  const submitButton = screen.getByRole('button', { name: 'Login' });

  await user.type(emailInput, 'test@example.com');
  await user.type(passwordInput, 'password123');
  await user.click(submitButton);

  expect(handleSubmit).toHaveBeenCalledWith({
    email: 'test@example.com',
    password: 'password123'
  });
});

// Querying elements
describe('Querying Methods', () => {
  it('uses getBy for elements that should exist', () => {
    render(<Component />);
    const element = screen.getByText('Hello'); // Throws if not found
  });

  it('uses queryBy for elements that might not exist', () => {
    render(<Component />);
    const element = screen.queryByText('Hello'); // Returns null if not found
    expect(element).not.toBeInTheDocument();
  });

  it('uses findBy for elements that appear asynchronously', async () => {
    render(<Component />);
    const element = await screen.findByText('Hello'); // Waits for element
  });
});

// Query priority (best practices)
test('uses accessible queries', () => {
  render(<LoginForm />);

  // ✅ Best: Accessible to everyone
  screen.getByRole('button', { name: 'Login' });
  screen.getByLabelText('Email');
  screen.getByPlaceholderText('Enter email');

  // ⚠️ OK: Semantic
  screen.getByText('Login');
  screen.getByAltText('User avatar');

  // ❌ Last resort: Test IDs
  screen.getByTestId('login-button');
});
```

**Common Testing Patterns:**
```javascript
// Testing lists
test('renders list of items', () => {
  const items = ['Apple', 'Banana', 'Orange'];
  render(<ItemList items={items} />);

  items.forEach(item => {
    expect(screen.getByText(item)).toBeInTheDocument();
  });
});

// Testing component state
test('toggles visibility', async () => {
  const user = userEvent.setup();
  render(<Accordion title="Click me">Content</Accordion>);

  expect(screen.queryByText('Content')).not.toBeInTheDocument();

  await user.click(screen.getByText('Click me'));
  expect(screen.getByText('Content')).toBeInTheDocument();

  await user.click(screen.getByText('Click me'));
  expect(screen.queryByText('Content')).not.toBeInTheDocument();
});

// Testing with props changes
test('updates when props change', () => {
  const { rerender } = render(<Counter count={0} />);
  expect(screen.getByText('Count: 0')).toBeInTheDocument();

  rerender(<Counter count={5} />);
  expect(screen.getByText('Count: 5')).toBeInTheDocument();
});
```

**Interview Questions (XP: 250):**
1. What's the difference between getBy, queryBy, and findBy?
2. How do you test user interactions?
3. How do you test a form submission?
4. What's the query priority in React Testing Library?
5. How do you test conditional rendering?

**XP Rewards:** 250 XP + "Component Tester" badge

---

#### 2.2: Testing Hooks

**Essential Patterns:**
```javascript
import { renderHook, act } from '@testing-library/react';
import { useCounter } from './useCounter';

// Testing custom hooks
test('useCounter increments', () => {
  const { result } = renderHook(() => useCounter());

  expect(result.current.count).toBe(0);

  act(() => {
    result.current.increment();
  });

  expect(result.current.count).toBe(1);
});

// Testing hooks with parameters
test('useCounter with initial value', () => {
  const { result } = renderHook(() => useCounter(10));

  expect(result.current.count).toBe(10);
});

// Testing hooks with dependencies
test('useFetch fetches data', async () => {
  const { result, waitForNextUpdate } = renderHook(() =>
    useFetch('/api/users')
  );

  expect(result.current.loading).toBe(true);

  await waitForNextUpdate();

  expect(result.current.loading).toBe(false);
  expect(result.current.data).toBeDefined();
});

// Testing useEffect
test('useDocumentTitle updates title', () => {
  const { rerender } = renderHook(
    ({ title }) => useDocumentTitle(title),
    { initialProps: { title: 'First Title' } }
  );

  expect(document.title).toBe('First Title');

  rerender({ title: 'Second Title' });
  expect(document.title).toBe('Second Title');
});
```

**XP Rewards:** 200 XP + "Hook Tester" badge

---

### Module 3: Mocking (3-4 hours)
**Level: Mocking Master**

#### 3.1: Mock Functions

**Essential Patterns:**
```javascript
// Basic mock functions
test('mock functions', () => {
  const mockFn = jest.fn();

  mockFn('hello');
  mockFn('world');

  expect(mockFn).toHaveBeenCalledTimes(2);
  expect(mockFn).toHaveBeenCalledWith('hello');
  expect(mockFn).toHaveBeenLastCalledWith('world');
  expect(mockFn.mock.calls).toEqual([['hello'], ['world']]);
});

// Mock return values
test('mock return values', () => {
  const mockFn = jest.fn();

  mockFn.mockReturnValue(42);
  expect(mockFn()).toBe(42);

  mockFn.mockReturnValueOnce(1).mockReturnValueOnce(2);
  expect(mockFn()).toBe(1);
  expect(mockFn()).toBe(2);
  expect(mockFn()).toBe(42); // Falls back to default
});

// Mock implementations
test('mock implementations', () => {
  const mockFn = jest.fn((x) => x * 2);

  expect(mockFn(5)).toBe(10);
  expect(mockFn).toHaveBeenCalledWith(5);
});

// Mocking object methods
test('mocks object methods', () => {
  const user = {
    getName: jest.fn().mockReturnValue('John'),
    getAge: jest.fn().mockReturnValue(30)
  };

  expect(user.getName()).toBe('John');
  expect(user.getName).toHaveBeenCalled();
});
```

#### 3.2: Mocking Modules

**Essential Patterns:**
```javascript
// Mock entire module
jest.mock('./api');
import { fetchUser } from './api';

test('uses mocked API', async () => {
  fetchUser.mockResolvedValue({ name: 'John' });

  const result = await fetchUser(1);
  expect(result.name).toBe('John');
});

// Mock with implementation
jest.mock('./utils', () => ({
  formatDate: jest.fn((date) => 'mocked date'),
  capitalize: jest.fn((str) => str.toUpperCase())
}));

// Partial mocks
jest.mock('./config', () => ({
  ...jest.requireActual('./config'),
  API_URL: 'http://test-api.com'
}));

// Mock axios
jest.mock('axios');
import axios from 'axios';

test('fetches data', async () => {
  axios.get.mockResolvedValue({
    data: { users: [{ name: 'John' }] }
  });

  const result = await getUsers();
  expect(result).toHaveLength(1);
  expect(axios.get).toHaveBeenCalledWith('/api/users');
});

// Mock fetch
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ data: 'test' })
  })
);

test('fetches with fetch API', async () => {
  const data = await fetchData();
  expect(fetch).toHaveBeenCalledWith('/api/data');
  expect(data).toEqual({ data: 'test' });
});
```

#### 3.3: Mocking Timers

**Essential Patterns:**
```javascript
// Mock timers
jest.useFakeTimers();

test('waits 1 second before calling callback', () => {
  const callback = jest.fn();
  setTimeout(callback, 1000);

  expect(callback).not.toHaveBeenCalled();

  jest.advanceTimersByTime(1000);

  expect(callback).toHaveBeenCalledTimes(1);
});

// Run all timers
test('runs all timers', () => {
  const callback = jest.fn();
  setTimeout(callback, 1000);
  setTimeout(callback, 2000);

  jest.runAllTimers();

  expect(callback).toHaveBeenCalledTimes(2);
});

// Test debounce
test('debounces function calls', () => {
  const callback = jest.fn();
  const debounced = debounce(callback, 1000);

  debounced();
  debounced();
  debounced();

  expect(callback).not.toHaveBeenCalled();

  jest.advanceTimersByTime(1000);

  expect(callback).toHaveBeenCalledTimes(1);
});
```

**Interview Questions (XP: 300):**
1. How do you mock a function?
2. How do you mock an API call?
3. What's the difference between mockReturnValue and mockResolvedValue?
4. How do you test code with setTimeout?
5. How do you partially mock a module?

**XP Rewards:** 300 XP + "Mocking Master" badge

---

### Module 4: Async Testing (2-3 hours)
**Level: Async Expert**

**Essential Patterns:**
```javascript
// Async/await
test('fetches user data', async () => {
  const user = await fetchUser(1);
  expect(user.name).toBe('John');
});

// Using resolves/rejects
test('fetches user data', () => {
  return expect(fetchUser(1)).resolves.toEqual({ name: 'John' });
});

test('handles error', () => {
  return expect(fetchUser(-1)).rejects.toThrow('User not found');
});

// Waiting for updates
test('shows data after loading', async () => {
  render(<UserProfile userId={1} />);

  expect(screen.getByText('Loading...')).toBeInTheDocument();

  const userName = await screen.findByText('John Doe');
  expect(userName).toBeInTheDocument();
});

// waitFor utility
test('shows error message', async () => {
  render(<Form />);

  const submitButton = screen.getByRole('button');
  fireEvent.click(submitButton);

  await waitFor(() => {
    expect(screen.getByText('Error occurred')).toBeInTheDocument();
  });
});

// Testing loading states
test('handles loading, success, and error states', async () => {
  const { rerender } = render(<AsyncComponent />);

  // Loading state
  expect(screen.getByText('Loading...')).toBeInTheDocument();

  // Success state
  await waitFor(() => {
    expect(screen.getByText('Data loaded')).toBeInTheDocument();
  });

  // Error state
  rerender(<AsyncComponent shouldError />);
  await waitFor(() => {
    expect(screen.getByText('Error occurred')).toBeInTheDocument();
  });
});
```

**XP Rewards:** 250 XP + "Async Expert" badge

---

### Module 5: Advanced Topics (2-3 hours)
**Level: Testing Pro**

#### 5.1: Snapshot Testing

**Essential Concepts:**
```javascript
// Basic snapshot
test('matches snapshot', () => {
  const tree = renderer.create(<Button>Click me</Button>).toJSON();
  expect(tree).toMatchSnapshot();
});

// Inline snapshots
test('inline snapshot', () => {
  expect({ name: 'John', age: 30 }).toMatchInlineSnapshot(`
    Object {
      "age": 30,
      "name": "John",
    }
  `);
});

// Property matchers (for dynamic values)
test('snapshot with dynamic data', () => {
  expect({
    id: generateId(),
    createdAt: new Date(),
    name: 'John'
  }).toMatchSnapshot({
    id: expect.any(String),
    createdAt: expect.any(Date)
  });
});

// When to use snapshots
// ✅ Good: UI components with stable structure
// ✅ Good: Configuration objects
// ✅ Good: API response shapes
// ❌ Bad: Frequently changing data
// ❌ Bad: Large components (hard to review)
```

#### 5.2: Code Coverage

**Understanding Coverage:**
```bash
# Run tests with coverage
npm test -- --coverage

# Coverage types:
# - Statements: % of statements executed
# - Branches: % of if/else branches taken
# - Functions: % of functions called
# - Lines: % of lines executed
```

**Coverage Configuration:**
```javascript
// jest.config.js
module.exports = {
  coverageThreshold: {
    global: {
      statements: 80,
      branches: 80,
      functions: 80,
      lines: 80
    }
  },
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    '!src/**/*.test.{js,jsx,ts,tsx}',
    '!src/index.js'
  ]
};
```

**Best Practices:**
- Aim for 80%+ coverage
- Focus on critical paths
- Don't chase 100% blindly
- Review uncovered lines
- Test edge cases

#### 5.3: Testing Best Practices

**Key Principles:**
```javascript
// 1. Test behavior, not implementation
// ❌ Bad: Testing internal state
test('bad test', () => {
  const component = new Component();
  expect(component.state.count).toBe(0);
});

// ✅ Good: Testing user-visible behavior
test('good test', () => {
  render(<Counter />);
  expect(screen.getByText('Count: 0')).toBeInTheDocument();
});

// 2. Write descriptive test names
// ❌ Bad
test('it works', () => {});

// ✅ Good
test('displays error message when form submission fails', () => {});

// 3. Arrange-Act-Assert pattern
test('adds item to cart', () => {
  // Arrange
  const product = { id: 1, name: 'Phone' };
  render(<ProductPage product={product} />);

  // Act
  fireEvent.click(screen.getByText('Add to Cart'));

  // Assert
  expect(screen.getByText('Item added')).toBeInTheDocument();
});

// 4. Keep tests isolated
// ❌ Bad: Tests depend on each other
let user;
test('creates user', () => {
  user = createUser();
});
test('updates user', () => {
  user.update(); // Depends on previous test
});

// ✅ Good: Independent tests
test('creates user', () => {
  const user = createUser();
  // ...
});
test('updates user', () => {
  const user = createUser(); // Fresh data
  user.update();
});

// 5. Test edge cases
test('handles edge cases', () => {
  expect(divide(0, 1)).toBe(0);        // Zero numerator
  expect(() => divide(1, 0)).toThrow(); // Zero denominator
  expect(divide(-10, 2)).toBe(-5);     // Negative numbers
  expect(divide(5, 2)).toBeCloseTo(2.5); // Floating point
});
```

**Common Anti-Patterns:**
```javascript
// ❌ Testing implementation details
// ❌ Long setup/teardown
// ❌ Testing libraries instead of your code
// ❌ Asserting on console.log output
// ❌ Brittle selectors (testing by class names)
// ❌ Not cleaning up after tests
```

**XP Rewards:** 300 XP + "Testing Pro" badge

---

## Interview Preparation

### Common Interview Questions

**Basic:**
1. What is Jest and why use it?
2. Difference between `toBe` and `toEqual`?
3. How do you test async code?
4. What are mock functions?
5. Explain beforeEach and afterEach

**Intermediate:**
1. How do you test React components?
2. How do you mock an API call?
3. What's the difference between getBy, queryBy, findBy?
4. How do you test user interactions?
5. Explain snapshot testing

**Advanced:**
1. How do you achieve high test coverage?
2. How do you test custom hooks?
3. How do you mock timers?
4. What are testing best practices?
5. How do you test error boundaries?

### Practical Coding Tests

**You May Be Asked To:**
1. Write tests for a given component
2. Debug failing tests
3. Mock an API and test data fetching
4. Test a form with validation
5. Achieve specific code coverage

---

## Gamification

### XP System
- Basic tests: 100 XP
- Component tests: 250 XP
- Mocking: 300 XP
- Async tests: 250 XP
- Advanced: 300 XP

### Badges
- **Function Tester**: Master basic testing
- **Component Tester**: Test React components
- **Mocking Master**: Master all mocking
- **Async Expert**: Handle async code
- **Testing Pro**: Complete advanced topics
- **Interview Ready**: Pass mock interview

### Milestones
- [ ] Write 50 tests
- [ ] Test 10 React components
- [ ] Mock 10 API calls
- [ ] Achieve 80% coverage on a project
- [ ] Pass mock interview

---

## Resources

### Documentation
- [Jest Docs](https://jestjs.io/)
- [React Testing Library](https://testing-library.com/react)
- [Testing Library Queries](https://testing-library.com/docs/queries/about)

### Practice
- Add tests to personal projects
- Contribute tests to open source
- Practice on CodeSandbox
- Take testing challenges

---

## Certification

**Jest Testing Professional:**
- [ ] Complete all modules
- [ ] Write 100+ tests
- [ ] Achieve 80% coverage on project
- [ ] Pass mock interview (85%+)
- [ ] Test 20+ React components

---

## Conclusion

Testing is a must-have skill for professional developers. With 10-15 hours of focused practice, you'll write confident, reliable tests that catch bugs before production.

**Master testing. Ship confident code. Get hired!**
