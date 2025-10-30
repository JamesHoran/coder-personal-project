/**
 * React Course - Phase 3: Expert Mastery
 * Module 3.4: Production Patterns (9 lessons)
 *
 * This module covers essential production-ready patterns for building
 * real-world React applications including authentication, API integration,
 * error handling, loading states, accessibility, SEO, and React 19 features.
 *
 * Lessons 1-6: Core Production Patterns
 * Lessons 7-9: React 19 Features (Server Components, Actions, Optimistic Updates)
 */

import { InteractiveLesson } from "@/types";
import { react19Lessons } from "./module-3-4-react-19-lessons";

export const productionPatternsLessons: InteractiveLesson[] = [
  // Lesson 1: Authentication Patterns
  {
    id: "production-patterns-01",
    moduleId: "module-3-4",
    title: "Authentication Patterns",
    order: 1,
    xpReward: 450,
    difficulty: "advanced",
    steps: [
      {
        id: "production-patterns-01-step-1",
        order: 1,
        instruction: `
# Authentication Patterns in React

Authentication is critical for most production applications. Modern React apps use **token-based authentication** with JWT (JSON Web Tokens) stored in memory or secure storage.

## Key Authentication Patterns

**1. Protected Routes:**
\`\`\`jsx
function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();

  if (loading) return <LoadingSpinner />;
  if (!isAuthenticated) return <Navigate to="/login" />;

  return children;
}
\`\`\`

**2. Auth Context Pattern:**
\`\`\`jsx
const AuthContext = createContext(null);

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    checkAuthStatus();
  }, []);

  const login = async (credentials) => {
    const response = await api.login(credentials);
    setUser(response.user);
    localStorage.setItem('token', response.token);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}
\`\`\`

**3. Token Refresh Pattern:**
\`\`\`jsx
// Axios interceptor for automatic token refresh
axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const newToken = await refreshToken();
      originalRequest.headers.Authorization = \`Bearer \${newToken}\`;
      return axios(originalRequest);
    }

    return Promise.reject(error);
  }
);
\`\`\`

## Your Task

Create a complete authentication system with:

1. An \`AuthContext\` using \`createContext\`
2. An \`AuthProvider\` component that:
   - Manages \`user\` state (null when not logged in)
   - Manages \`loading\` state
   - Provides \`login\` function that sets user to an object with \`id\` and \`email\`
   - Provides \`logout\` function that sets user to null
   - Returns the context provider with all values
3. A \`useAuth\` custom hook that returns the context
4. A \`ProtectedRoute\` component that:
   - Uses the \`useAuth\` hook
   - Shows "Loading..." text if loading is true
   - Redirects to "/login" if not authenticated (return \`<div>Redirect to /login</div>\`)
   - Renders children if authenticated
        `,
        hint: "Start by creating the context, then the provider component with state management, then the custom hook, and finally the ProtectedRoute component. Remember to check both loading and authentication states.",
        starterCode: `import React, { createContext, useState, useContext } from 'react';

// Create AuthContext


// Create AuthProvider component


// Create useAuth custom hook


// Create ProtectedRoute component


export { AuthProvider, useAuth, ProtectedRoute };`,
        solution: `import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext(null);

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const login = (credentials) => {
    setUser({
      id: credentials.id || 1,
      email: credentials.email
    });
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  return useContext(AuthContext);
}

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>Redirect to /login</div>;
  }

  return children;
}

export { AuthProvider, useAuth, ProtectedRoute };`,
        testCases: [
          {
            id: "test-1",
            description: "AuthContext should be created",
            testFunction: `AuthContext !== undefined && typeof AuthContext === 'object'`,
          },
          {
            id: "test-2",
            description: "AuthProvider should render children",
            testFunction: `
              const { getByText } = render(
                <AuthProvider>
                  <div>Test Content</div>
                </AuthProvider>
              );
              getByText('Test Content') !== null
            `,
          },
          {
            id: "test-3",
            description: "useAuth hook should return auth context",
            testFunction: `
              let authValue;
              function TestComponent() {
                authValue = useAuth();
                return null;
              }
              render(
                <AuthProvider>
                  <TestComponent />
                </AuthProvider>
              );
              authValue !== null && authValue.user !== undefined && authValue.login !== undefined
            `,
          },
          {
            id: "test-4",
            description: "login function should set user state",
            testFunction: `
              let authValue;
              function TestComponent() {
                authValue = useAuth();
                return <button onClick={() => authValue.login({ email: 'test@example.com' })}>Login</button>;
              }
              const { getByText } = render(
                <AuthProvider>
                  <TestComponent />
                </AuthProvider>
              );
              const button = getByText('Login');
              button.click();
              authValue.user !== null && authValue.user.email === 'test@example.com'
            `,
          },
          {
            id: "test-5",
            description: "logout function should clear user state",
            testFunction: `
              let authValue;
              function TestComponent() {
                authValue = useAuth();
                return (
                  <>
                    <button onClick={() => authValue.login({ email: 'test@example.com' })}>Login</button>
                    <button onClick={() => authValue.logout()}>Logout</button>
                  </>
                );
              }
              const { getByText } = render(
                <AuthProvider>
                  <TestComponent />
                </AuthProvider>
              );
              getByText('Login').click();
              getByText('Logout').click();
              authValue.user === null
            `,
          },
          {
            id: "test-6",
            description: "ProtectedRoute should show loading state",
            testFunction: `
              function TestAuth() {
                return { user: null, loading: true };
              }
              // This test checks the implementation includes loading check
              code.includes('loading') && code.includes('Loading...')
            `,
          },
          {
            id: "test-7",
            description: "ProtectedRoute should redirect when not authenticated",
            testFunction: `
              function MockAuthProvider({ children }) {
                const value = { user: null, loading: false };
                return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
              }
              const { getByText } = render(
                <MockAuthProvider>
                  <ProtectedRoute>
                    <div>Protected Content</div>
                  </ProtectedRoute>
                </MockAuthProvider>
              );
              getByText('Redirect to /login') !== null
            `,
          },
          {
            id: "test-8",
            description: "ProtectedRoute should render children when authenticated",
            testFunction: `
              function MockAuthProvider({ children }) {
                const value = { user: { id: 1, email: 'test@example.com' }, loading: false };
                return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
              }
              const { getByText } = render(
                <MockAuthProvider>
                  <ProtectedRoute>
                    <div>Protected Content</div>
                  </ProtectedRoute>
                </MockAuthProvider>
              );
              getByText('Protected Content') !== null
            `,
          },
        ],
        language: "jsx",
      },
    ],
  },

  // Lesson 2: API Integration
  {
    id: "production-patterns-02",
    moduleId: "module-3-4",
    title: "API Integration",
    order: 2,
    xpReward: 450,
    difficulty: "advanced",
    steps: [
      {
        id: "production-patterns-02-step-1",
        order: 1,
        instruction: `
# API Integration Patterns

Production React apps need robust API integration with proper error handling, caching, and request management. Modern patterns use custom hooks to encapsulate API logic.

## API Integration Patterns

**1. Custom API Hook:**
\`\`\`jsx
function useApi(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    fetch(url)
      .then(res => res.json())
      .then(data => {
        if (!cancelled) {
          setData(data);
          setLoading(false);
        }
      })
      .catch(err => {
        if (!cancelled) {
          setError(err);
          setLoading(false);
        }
      });

    return () => {
      cancelled = true; // Cleanup: prevent state updates
    };
  }, [url]);

  return { data, loading, error };
}
\`\`\`

**2. Request Deduplication:**
\`\`\`jsx
const requestCache = new Map();

function useCachedApi(url, options = {}) {
  const cacheKey = JSON.stringify({ url, ...options });

  if (requestCache.has(cacheKey)) {
    return requestCache.get(cacheKey);
  }

  const promise = fetch(url, options).then(r => r.json());
  requestCache.set(cacheKey, promise);

  return promise;
}
\`\`\`

**3. Mutation Hook:**
\`\`\`jsx
function useApiMutation(url, method = 'POST') {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const mutate = async (data) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      if (!response.ok) throw new Error('Request failed');

      const result = await response.json();
      setLoading(false);
      return result;
    } catch (err) {
      setError(err);
      setLoading(false);
      throw err;
    }
  };

  return { mutate, loading, error };
}
\`\`\`

## Your Task

Create a production-ready API hook system:

1. Create a \`useFetch\` custom hook that:
   - Accepts a \`url\` parameter
   - Manages \`data\`, \`loading\`, and \`error\` state
   - Fetches data when the component mounts
   - Sets loading to true initially, then false after fetch
   - Handles errors by setting the error state
   - Implements cleanup to prevent memory leaks (use a \`cancelled\` flag)
   - Returns \`{ data, loading, error, refetch }\` where \`refetch\` is a function to re-fetch data

2. Create a \`usePost\` hook that:
   - Accepts a \`url\` parameter
   - Manages \`loading\` and \`error\` state
   - Returns \`{ post, loading, error }\` where \`post\` is an async function
   - The \`post\` function accepts a \`data\` parameter and returns the response data
   - Sets loading states appropriately
   - Handles errors properly

**Note:** For this exercise, simulate API calls with mock data instead of actual fetch calls.
        `,
        hint: "Use useEffect for the fetch hook with cleanup. Use useState for all state management. The post function should be wrapped in useCallback to avoid recreating it on every render.",
        starterCode: `import React, { useState, useEffect, useCallback } from 'react';

// Create useFetch hook
function useFetch(url) {
  // Your implementation here
}

// Create usePost hook
function usePost(url) {
  // Your implementation here
}

export { useFetch, usePost };`,
        solution: `import React, { useState, useEffect, useCallback } from 'react';

function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(() => {
    let cancelled = false;

    setLoading(true);
    setError(null);

    // Simulate API call
    setTimeout(() => {
      if (!cancelled) {
        try {
          // Mock successful response
          setData({ url, message: 'Data fetched successfully' });
          setLoading(false);
        } catch (err) {
          setError(err);
          setLoading(false);
        }
      }
    }, 100);

    return () => {
      cancelled = true;
    };
  }, [url]);

  useEffect(() => {
    const cleanup = fetchData();
    return cleanup;
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
}

function usePost(url) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const post = useCallback(async (data) => {
    setLoading(true);
    setError(null);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 100));
      const result = { success: true, data, url };
      setLoading(false);
      return result;
    } catch (err) {
      setError(err);
      setLoading(false);
      throw err;
    }
  }, [url]);

  return { post, loading, error };
}

export { useFetch, usePost };`,
        testCases: [
          {
            id: "test-1",
            description: "useFetch should return data, loading, error, and refetch",
            testFunction: `
              let result;
              function TestComponent() {
                result = useFetch('/api/test');
                return null;
              }
              render(<TestComponent />);
              result.data !== undefined && result.loading !== undefined &&
              result.error !== undefined && typeof result.refetch === 'function'
            `,
          },
          {
            id: "test-2",
            description: "useFetch should start with loading true",
            testFunction: `
              let result;
              function TestComponent() {
                result = useFetch('/api/test');
                return null;
              }
              render(<TestComponent />);
              result.loading === true
            `,
          },
          {
            id: "test-3",
            description: "useFetch should fetch data on mount",
            testFunction: `
              let result;
              function TestComponent() {
                result = useFetch('/api/test');
                return <div>{result.loading ? 'Loading' : 'Loaded'}</div>;
              }
              const { findByText } = render(<TestComponent />);
              findByText('Loaded').then(() => true)
            `,
          },
          {
            id: "test-4",
            description: "useFetch should implement cleanup to prevent memory leaks",
            testFunction: `code.includes('cancelled') && code.includes('return () =>')`,
          },
          {
            id: "test-5",
            description: "usePost should return post, loading, and error",
            testFunction: `
              let result;
              function TestComponent() {
                result = usePost('/api/test');
                return null;
              }
              render(<TestComponent />);
              typeof result.post === 'function' && result.loading !== undefined && result.error !== undefined
            `,
          },
          {
            id: "test-6",
            description: "usePost should start with loading false",
            testFunction: `
              let result;
              function TestComponent() {
                result = usePost('/api/test');
                return null;
              }
              render(<TestComponent />);
              result.loading === false
            `,
          },
          {
            id: "test-7",
            description: "usePost post function should set loading state",
            testFunction: `
              let result;
              function TestComponent() {
                result = usePost('/api/test');
                return (
                  <button onClick={() => result.post({ test: true })}>
                    {result.loading ? 'Posting...' : 'Post'}
                  </button>
                );
              }
              const { getByText } = render(<TestComponent />);
              const button = getByText('Post');
              button.click();
              // Check that loading logic exists in code
              code.includes('setLoading(true)') && code.includes('setLoading(false)')
            `,
          },
          {
            id: "test-8",
            description: "usePost should handle async operations",
            testFunction: `code.includes('async') && code.includes('await')`,
          },
        ],
        language: "jsx",
      },
    ],
  },

  // Lesson 3: Error Handling Strategies
  {
    id: "production-patterns-03",
    moduleId: "module-3-4",
    title: "Error Handling Strategies",
    order: 3,
    xpReward: 450,
    difficulty: "advanced",
    steps: [
      {
        id: "production-patterns-03-step-1",
        order: 1,
        instruction: `
# Error Handling Strategies

Robust error handling is essential for production apps. React provides Error Boundaries for catching render errors, but you also need strategies for async errors, network failures, and user feedback.

## Error Handling Patterns

**1. Error Boundary:**
\`\`\`jsx
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // Log to error reporting service
    console.error('Error caught:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || <h1>Something went wrong.</h1>;
    }

    return this.props.children;
  }
}
\`\`\`

**2. Hook-based Error Handler:**
\`\`\`jsx
function useErrorHandler() {
  const [error, setError] = useState(null);

  const handleError = useCallback((error) => {
    setError(error);
    // Log to error service
    console.error(error);
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return { error, handleError, clearError };
}
\`\`\`

**3. Retry Logic:**
\`\`\`jsx
function useRetry(fn, maxRetries = 3) {
  const [retries, setRetries] = useState(0);

  const retry = async () => {
    try {
      return await fn();
    } catch (error) {
      if (retries < maxRetries) {
        setRetries(r => r + 1);
        // Exponential backoff
        await new Promise(resolve =>
          setTimeout(resolve, Math.pow(2, retries) * 1000)
        );
        return retry();
      }
      throw error;
    }
  };

  return { retry, retries };
}
\`\`\`

**4. Global Error Handler:**
\`\`\`jsx
const ErrorContext = createContext(null);

function ErrorProvider({ children }) {
  const [errors, setErrors] = useState([]);

  const addError = (error) => {
    const errorObj = {
      id: Date.now(),
      message: error.message || 'An error occurred',
      timestamp: new Date()
    };
    setErrors(prev => [...prev, errorObj]);
  };

  const removeError = (id) => {
    setErrors(prev => prev.filter(e => e.id !== id));
  };

  return (
    <ErrorContext.Provider value={{ errors, addError, removeError }}>
      {children}
      <ErrorDisplay errors={errors} onClose={removeError} />
    </ErrorContext.Provider>
  );
}
\`\`\`

## Your Task

Build a comprehensive error handling system:

1. Create an \`ErrorBoundary\` class component that:
   - Has state with \`hasError\` (boolean) and \`error\` (object)
   - Implements \`getDerivedStateFromError\` to set hasError to true
   - Implements \`componentDidCatch\` to log errors
   - Renders a custom fallback UI when there's an error: a div with className "error-boundary" containing an h2 with text "Something went wrong" and a paragraph with the error message
   - Renders children normally when there's no error

2. Create a \`useErrorHandler\` custom hook that:
   - Manages an \`error\` state
   - Returns \`{ error, handleError, clearError }\`
   - \`handleError\` sets the error
   - \`clearError\` clears the error

3. Create an \`ErrorDisplay\` component that:
   - Accepts \`error\` and \`onRetry\` props
   - Returns null if no error
   - Otherwise renders a div with className "error-display" containing:
     - A paragraph with the error message
     - A button with text "Retry" that calls onRetry when clicked
        `,
        hint: "ErrorBoundary must be a class component. Use lifecycle methods getDerivedStateFromError and componentDidCatch. The hook should use useState and useCallback.",
        starterCode: `import React, { Component, useState, useCallback } from 'react';

// Create ErrorBoundary class component
class ErrorBoundary extends Component {
  // Your implementation here
}

// Create useErrorHandler hook
function useErrorHandler() {
  // Your implementation here
}

// Create ErrorDisplay component
function ErrorDisplay({ error, onRetry }) {
  // Your implementation here
}

export { ErrorBoundary, useErrorHandler, ErrorDisplay };`,
        solution: `import React, { Component, useState, useCallback } from 'react';

class ErrorBoundary extends Component {
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
          <p>{this.state.error?.message || 'Unknown error'}</p>
        </div>
      );
    }

    return this.props.children;
  }
}

function useErrorHandler() {
  const [error, setError] = useState(null);

  const handleError = useCallback((error) => {
    setError(error);
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return { error, handleError, clearError };
}

function ErrorDisplay({ error, onRetry }) {
  if (!error) return null;

  return (
    <div className="error-display">
      <p>{error.message || error}</p>
      <button onClick={onRetry}>Retry</button>
    </div>
  );
}

export { ErrorBoundary, useErrorHandler, ErrorDisplay };`,
        testCases: [
          {
            id: "test-1",
            description: "ErrorBoundary should be a class component",
            testFunction: `ErrorBoundary.prototype instanceof React.Component`,
          },
          {
            id: "test-2",
            description: "ErrorBoundary should render children when no error",
            testFunction: `
              const { getByText } = render(
                <ErrorBoundary>
                  <div>Test Content</div>
                </ErrorBoundary>
              );
              getByText('Test Content') !== null
            `,
          },
          {
            id: "test-3",
            description: "ErrorBoundary should implement getDerivedStateFromError",
            testFunction: `typeof ErrorBoundary.getDerivedStateFromError === 'function'`,
          },
          {
            id: "test-4",
            description: "ErrorBoundary should implement componentDidCatch",
            testFunction: `typeof ErrorBoundary.prototype.componentDidCatch === 'function'`,
          },
          {
            id: "test-5",
            description: "ErrorBoundary should show error UI when error occurs",
            testFunction: `
              const ThrowError = () => {
                throw new Error('Test error');
              };
              const { getByText } = render(
                <ErrorBoundary>
                  <ThrowError />
                </ErrorBoundary>
              );
              getByText('Something went wrong') !== null
            `,
          },
          {
            id: "test-6",
            description: "useErrorHandler should return error, handleError, and clearError",
            testFunction: `
              let result;
              function TestComponent() {
                result = useErrorHandler();
                return null;
              }
              render(<TestComponent />);
              result.error !== undefined &&
              typeof result.handleError === 'function' &&
              typeof result.clearError === 'function'
            `,
          },
          {
            id: "test-7",
            description: "useErrorHandler handleError should set error state",
            testFunction: `
              let result;
              function TestComponent() {
                result = useErrorHandler();
                return <button onClick={() => result.handleError(new Error('Test'))}>Set Error</button>;
              }
              const { getByText } = render(<TestComponent />);
              getByText('Set Error').click();
              result.error !== null
            `,
          },
          {
            id: "test-8",
            description: "useErrorHandler clearError should clear error state",
            testFunction: `
              let result;
              function TestComponent() {
                result = useErrorHandler();
                return (
                  <>
                    <button onClick={() => result.handleError(new Error('Test'))}>Set</button>
                    <button onClick={() => result.clearError()}>Clear</button>
                  </>
                );
              }
              const { getByText } = render(<TestComponent />);
              getByText('Set').click();
              getByText('Clear').click();
              result.error === null
            `,
          },
          {
            id: "test-9",
            description: "ErrorDisplay should return null when no error",
            testFunction: `
              const { container } = render(<ErrorDisplay error={null} onRetry={() => {}} />);
              container.firstChild === null
            `,
          },
          {
            id: "test-10",
            description: "ErrorDisplay should show error message and retry button",
            testFunction: `
              const error = { message: 'Test error' };
              const { getByText } = render(<ErrorDisplay error={error} onRetry={() => {}} />);
              getByText('Test error') !== null && getByText('Retry') !== null
            `,
          },
          {
            id: "test-11",
            description: "ErrorDisplay retry button should call onRetry",
            testFunction: `
              let called = false;
              const onRetry = () => { called = true; };
              const { getByText } = render(
                <ErrorDisplay error={{ message: 'Test' }} onRetry={onRetry} />
              );
              getByText('Retry').click();
              called === true
            `,
          },
        ],
        language: "jsx",
      },
    ],
  },

  // Lesson 4: Loading States Management
  {
    id: "production-patterns-04",
    moduleId: "module-3-4",
    title: "Loading States Management",
    order: 4,
    xpReward: 450,
    difficulty: "advanced",
    steps: [
      {
        id: "production-patterns-04-step-1",
        order: 1,
        instruction: `
# Loading States Management

Professional applications need sophisticated loading state management to provide great UX. This includes skeleton screens, progressive loading, and optimistic updates.

## Loading Patterns

**1. Skeleton Screen:**
\`\`\`jsx
function SkeletonCard() {
  return (
    <div className="skeleton-card">
      <div className="skeleton-image" />
      <div className="skeleton-text" />
      <div className="skeleton-text short" />
    </div>
  );
}

function UserList() {
  const { data, loading } = useFetch('/api/users');

  if (loading) {
    return <>{Array(5).fill(0).map((_, i) => <SkeletonCard key={i} />)}</>;
  }

  return data.map(user => <UserCard key={user.id} user={user} />);
}
\`\`\`

**2. Progressive Loading:**
\`\`\`jsx
function useProgressiveImage(lowQualitySrc, highQualitySrc) {
  const [src, setSrc] = useState(lowQualitySrc);

  useEffect(() => {
    const img = new Image();
    img.src = highQualitySrc;
    img.onload = () => setSrc(highQualitySrc);
  }, [highQualitySrc]);

  return src;
}
\`\`\`

**3. Suspense-Ready Component:**
\`\`\`jsx
const resource = fetchData();

function DataComponent() {
  const data = resource.read(); // Suspends if not ready
  return <div>{data.title}</div>;
}

function App() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <DataComponent />
    </Suspense>
  );
}
\`\`\`

**4. Optimistic Updates:**
\`\`\`jsx
function useMutateWithOptimistic(url, method = 'POST') {
  const [optimisticData, setOptimisticData] = useState(null);

  const mutate = async (data) => {
    // Show optimistic result immediately
    setOptimisticData(data);

    try {
      const result = await fetch(url, {
        method,
        body: JSON.stringify(data)
      });
      // Update with real result
      setOptimisticData(null);
      return result;
    } catch (error) {
      // Rollback on error
      setOptimisticData(null);
      throw error;
    }
  };

  return { mutate, optimisticData };
}
\`\`\`

## Your Task

Create a comprehensive loading state management system:

1. Create a \`LoadingSpinner\` component that:
   - Returns a div with className "loading-spinner"
   - Contains a div with className "spinner"
   - Shows text "Loading..." in a paragraph

2. Create a \`Skeleton\` component that:
   - Accepts \`width\`, \`height\`, and \`className\` props
   - Returns a div with className "skeleton" plus any additional className
   - Has inline style with width and height from props

3. Create a \`useLoadingState\` hook that:
   - Manages loading states: 'idle', 'loading', 'success', 'error'
   - Returns \`{ state, startLoading, setSuccess, setError, reset }\`
   - \`startLoading\` sets state to 'loading'
   - \`setSuccess\` sets state to 'success'
   - \`setError\` sets state to 'error'
   - \`reset\` sets state to 'idle'

4. Create a \`SuspenseWrapper\` component that:
   - Accepts \`children\` and \`fallback\` props
   - If no fallback is provided, uses LoadingSpinner
   - Wraps children in React Suspense with the fallback
        `,
        hint: "Use useState for state management in the hook. Use useCallback to memoize the state setter functions. For SuspenseWrapper, import Suspense from React.",
        starterCode: `import React, { useState, useCallback, Suspense } from 'react';

// Create LoadingSpinner component
function LoadingSpinner() {
  // Your implementation here
}

// Create Skeleton component
function Skeleton({ width, height, className = '' }) {
  // Your implementation here
}

// Create useLoadingState hook
function useLoadingState() {
  // Your implementation here
}

// Create SuspenseWrapper component
function SuspenseWrapper({ children, fallback }) {
  // Your implementation here
}

export { LoadingSpinner, Skeleton, useLoadingState, SuspenseWrapper };`,
        solution: `import React, { useState, useCallback, Suspense } from 'react';

function LoadingSpinner() {
  return (
    <div className="loading-spinner">
      <div className="spinner" />
      <p>Loading...</p>
    </div>
  );
}

function Skeleton({ width, height, className = '' }) {
  return (
    <div
      className={\`skeleton \${className}\`}
      style={{ width, height }}
    />
  );
}

function useLoadingState() {
  const [state, setState] = useState('idle');

  const startLoading = useCallback(() => {
    setState('loading');
  }, []);

  const setSuccess = useCallback(() => {
    setState('success');
  }, []);

  const setError = useCallback(() => {
    setState('error');
  }, []);

  const reset = useCallback(() => {
    setState('idle');
  }, []);

  return { state, startLoading, setSuccess, setError, reset };
}

function SuspenseWrapper({ children, fallback }) {
  return (
    <Suspense fallback={fallback || <LoadingSpinner />}>
      {children}
    </Suspense>
  );
}

export { LoadingSpinner, Skeleton, useLoadingState, SuspenseWrapper };`,
        testCases: [
          {
            id: "test-1",
            description: "LoadingSpinner should render with correct classes",
            testFunction: `
              const { container } = render(<LoadingSpinner />);
              const spinner = container.querySelector('.loading-spinner');
              const inner = container.querySelector('.spinner');
              spinner !== null && inner !== null
            `,
          },
          {
            id: "test-2",
            description: "LoadingSpinner should show 'Loading...' text",
            testFunction: `
              const { getByText } = render(<LoadingSpinner />);
              getByText('Loading...') !== null
            `,
          },
          {
            id: "test-3",
            description: "Skeleton should render with skeleton className",
            testFunction: `
              const { container } = render(<Skeleton width="100px" height="20px" />);
              container.querySelector('.skeleton') !== null
            `,
          },
          {
            id: "test-4",
            description: "Skeleton should apply width and height styles",
            testFunction: `
              const { container } = render(<Skeleton width="100px" height="20px" />);
              const skeleton = container.querySelector('.skeleton');
              skeleton.style.width === '100px' && skeleton.style.height === '20px'
            `,
          },
          {
            id: "test-5",
            description: "Skeleton should accept additional className",
            testFunction: `
              const { container } = render(<Skeleton width="100px" height="20px" className="custom" />);
              const skeleton = container.querySelector('.skeleton.custom');
              skeleton !== null
            `,
          },
          {
            id: "test-6",
            description: "useLoadingState should return state and control functions",
            testFunction: `
              let result;
              function TestComponent() {
                result = useLoadingState();
                return null;
              }
              render(<TestComponent />);
              result.state === 'idle' &&
              typeof result.startLoading === 'function' &&
              typeof result.setSuccess === 'function' &&
              typeof result.setError === 'function' &&
              typeof result.reset === 'function'
            `,
          },
          {
            id: "test-7",
            description: "useLoadingState startLoading should set state to loading",
            testFunction: `
              let result;
              function TestComponent() {
                result = useLoadingState();
                return <button onClick={result.startLoading}>Start</button>;
              }
              const { getByText } = render(<TestComponent />);
              getByText('Start').click();
              result.state === 'loading'
            `,
          },
          {
            id: "test-8",
            description: "useLoadingState setSuccess should set state to success",
            testFunction: `
              let result;
              function TestComponent() {
                result = useLoadingState();
                return <button onClick={result.setSuccess}>Success</button>;
              }
              const { getByText } = render(<TestComponent />);
              getByText('Success').click();
              result.state === 'success'
            `,
          },
          {
            id: "test-9",
            description: "useLoadingState setError should set state to error",
            testFunction: `
              let result;
              function TestComponent() {
                result = useLoadingState();
                return <button onClick={result.setError}>Error</button>;
              }
              const { getByText } = render(<TestComponent />);
              getByText('Error').click();
              result.state === 'error'
            `,
          },
          {
            id: "test-10",
            description: "useLoadingState reset should set state back to idle",
            testFunction: `
              let result;
              function TestComponent() {
                result = useLoadingState();
                return (
                  <>
                    <button onClick={result.startLoading}>Start</button>
                    <button onClick={result.reset}>Reset</button>
                  </>
                );
              }
              const { getByText } = render(<TestComponent />);
              getByText('Start').click();
              getByText('Reset').click();
              result.state === 'idle'
            `,
          },
          {
            id: "test-11",
            description: "SuspenseWrapper should render with Suspense",
            testFunction: `
              const { getByText } = render(
                <SuspenseWrapper>
                  <div>Content</div>
                </SuspenseWrapper>
              );
              getByText('Content') !== null
            `,
          },
          {
            id: "test-12",
            description: "SuspenseWrapper should use LoadingSpinner as default fallback",
            testFunction: `code.includes('LoadingSpinner') && code.includes('fallback')`,
          },
        ],
        language: "jsx",
      },
    ],
  },

  // Lesson 5: Accessibility in React
  {
    id: "production-patterns-05",
    moduleId: "module-3-4",
    title: "Accessibility in React",
    order: 5,
    xpReward: 500,
    difficulty: "advanced",
    steps: [
      {
        id: "production-patterns-05-step-1",
        order: 1,
        instruction: `
# Accessibility in React

Accessibility (a11y) ensures your app is usable by everyone, including users with disabilities. React provides excellent support for building accessible applications.

## Accessibility Patterns

**1. Semantic HTML:**
\`\`\`jsx
// ❌ Bad: Div button
<div onClick={handleClick}>Click me</div>

// ✅ Good: Semantic button
<button onClick={handleClick}>Click me</button>
\`\`\`

**2. ARIA Attributes:**
\`\`\`jsx
function Modal({ isOpen, onClose, children }) {
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <h2 id="modal-title">Modal Title</h2>
      <div id="modal-description">{children}</div>
      <button onClick={onClose} aria-label="Close modal">×</button>
    </div>
  );
}
\`\`\`

**3. Keyboard Navigation:**
\`\`\`jsx
function Dropdown({ options, onSelect }) {
  const [isOpen, setIsOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(0);

  const handleKeyDown = (e) => {
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setFocusedIndex(i => Math.min(i + 1, options.length - 1));
        break;
      case 'ArrowUp':
        e.preventDefault();
        setFocusedIndex(i => Math.max(i - 1, 0));
        break;
      case 'Enter':
        e.preventDefault();
        onSelect(options[focusedIndex]);
        setIsOpen(false);
        break;
      case 'Escape':
        setIsOpen(false);
        break;
    }
  };

  return (
    <div onKeyDown={handleKeyDown} role="combobox" aria-expanded={isOpen}>
      {/* Dropdown implementation */}
    </div>
  );
}
\`\`\`

**4. Focus Management:**
\`\`\`jsx
function Modal({ isOpen, onClose }) {
  const firstFocusRef = useRef(null);
  const lastFocusRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      firstFocusRef.current?.focus();
    }
  }, [isOpen]);

  const handleTabKey = (e) => {
    if (e.key === 'Tab') {
      if (e.shiftKey && document.activeElement === firstFocusRef.current) {
        e.preventDefault();
        lastFocusRef.current?.focus();
      } else if (!e.shiftKey && document.activeElement === lastFocusRef.current) {
        e.preventDefault();
        firstFocusRef.current?.focus();
      }
    }
  };

  return (
    <div role="dialog" onKeyDown={handleTabKey}>
      <button ref={firstFocusRef}>First</button>
      <button ref={lastFocusRef}>Last</button>
    </div>
  );
}
\`\`\`

**5. Screen Reader Announcements:**
\`\`\`jsx
function LiveRegion({ message, politeness = 'polite' }) {
  return (
    <div
      role="status"
      aria-live={politeness}
      aria-atomic="true"
      className="sr-only"
    >
      {message}
    </div>
  );
}
\`\`\`

## Your Task

Build accessible React components following a11y best practices:

1. Create an \`AccessibleButton\` component that:
   - Accepts \`children\`, \`onClick\`, \`disabled\`, and \`ariaLabel\` props
   - Uses a semantic \`<button>\` element
   - Applies aria-label if provided
   - Sets aria-disabled when disabled
   - Has proper disabled styling

2. Create an \`AccessibleModal\` component that:
   - Accepts \`isOpen\`, \`onClose\`, \`title\`, and \`children\` props
   - Returns null when not open
   - Uses role="dialog" and aria-modal="true"
   - Uses aria-labelledby pointing to the title's id
   - Includes a close button with aria-label="Close"
   - Handles Escape key to close (using onKeyDown)

3. Create a \`ScreenReaderOnly\` component that:
   - Accepts \`children\` prop
   - Renders content visually hidden but accessible to screen readers
   - Uses className "sr-only"
   - Applies these styles via inline style: position: 'absolute', width: '1px', height: '1px', padding: 0, margin: '-1px', overflow: 'hidden', clip: 'rect(0,0,0,0)', whiteSpace: 'nowrap', border: 0

4. Create a \`useFocusTrap\` hook that:
   - Returns a ref to attach to a container
   - Traps focus within that container when Tab is pressed
   - For this exercise, simply return a ref created with useRef
        `,
        hint: "Use semantic HTML elements. Add ARIA attributes using the aria-* props. For keyboard handling, use onKeyDown event. Focus management uses useRef and useEffect.",
        starterCode: `import React, { useRef, useEffect } from 'react';

// Create AccessibleButton component
function AccessibleButton({ children, onClick, disabled, ariaLabel }) {
  // Your implementation here
}

// Create AccessibleModal component
function AccessibleModal({ isOpen, onClose, title, children }) {
  // Your implementation here
}

// Create ScreenReaderOnly component
function ScreenReaderOnly({ children }) {
  // Your implementation here
}

// Create useFocusTrap hook
function useFocusTrap() {
  // Your implementation here
}

export { AccessibleButton, AccessibleModal, ScreenReaderOnly, useFocusTrap };`,
        solution: `import React, { useRef, useEffect } from 'react';

function AccessibleButton({ children, onClick, disabled, ariaLabel }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      aria-disabled={disabled}
    >
      {children}
    </button>
  );
}

function AccessibleModal({ isOpen, onClose, title, children }) {
  if (!isOpen) return null;

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      onKeyDown={handleKeyDown}
    >
      <h2 id="modal-title">{title}</h2>
      <div>{children}</div>
      <button onClick={onClose} aria-label="Close">
        ×
      </button>
    </div>
  );
}

function ScreenReaderOnly({ children }) {
  return (
    <span
      className="sr-only"
      style={{
        position: 'absolute',
        width: '1px',
        height: '1px',
        padding: 0,
        margin: '-1px',
        overflow: 'hidden',
        clip: 'rect(0,0,0,0)',
        whiteSpace: 'nowrap',
        border: 0
      }}
    >
      {children}
    </span>
  );
}

function useFocusTrap() {
  const ref = useRef(null);
  return ref;
}

export { AccessibleButton, AccessibleModal, ScreenReaderOnly, useFocusTrap };`,
        testCases: [
          {
            id: "test-1",
            description: "AccessibleButton should render a button element",
            testFunction: `
              const { container } = render(
                <AccessibleButton onClick={() => {}}>Click</AccessibleButton>
              );
              container.querySelector('button') !== null
            `,
          },
          {
            id: "test-2",
            description: "AccessibleButton should apply aria-label",
            testFunction: `
              const { container } = render(
                <AccessibleButton onClick={() => {}} ariaLabel="Test label">Click</AccessibleButton>
              );
              const button = container.querySelector('button');
              button.getAttribute('aria-label') === 'Test label'
            `,
          },
          {
            id: "test-3",
            description: "AccessibleButton should be disabled when disabled prop is true",
            testFunction: `
              const { container } = render(
                <AccessibleButton onClick={() => {}} disabled={true}>Click</AccessibleButton>
              );
              const button = container.querySelector('button');
              button.disabled === true
            `,
          },
          {
            id: "test-4",
            description: "AccessibleButton should have aria-disabled attribute",
            testFunction: `
              const { container } = render(
                <AccessibleButton onClick={() => {}} disabled={true}>Click</AccessibleButton>
              );
              const button = container.querySelector('button');
              button.getAttribute('aria-disabled') !== null
            `,
          },
          {
            id: "test-5",
            description: "AccessibleModal should return null when not open",
            testFunction: `
              const { container } = render(
                <AccessibleModal isOpen={false} onClose={() => {}} title="Test">
                  Content
                </AccessibleModal>
              );
              container.firstChild === null
            `,
          },
          {
            id: "test-6",
            description: "AccessibleModal should have role='dialog' and aria-modal='true'",
            testFunction: `
              const { container } = render(
                <AccessibleModal isOpen={true} onClose={() => {}} title="Test">
                  Content
                </AccessibleModal>
              );
              const dialog = container.querySelector('[role="dialog"]');
              dialog !== null && dialog.getAttribute('aria-modal') === 'true'
            `,
          },
          {
            id: "test-7",
            description: "AccessibleModal should have aria-labelledby pointing to title",
            testFunction: `
              const { container } = render(
                <AccessibleModal isOpen={true} onClose={() => {}} title="Test Title">
                  Content
                </AccessibleModal>
              );
              const dialog = container.querySelector('[role="dialog"]');
              const titleId = dialog.getAttribute('aria-labelledby');
              const title = container.querySelector(\`#\${titleId}\`);
              title !== null && title.textContent === 'Test Title'
            `,
          },
          {
            id: "test-8",
            description: "AccessibleModal should have close button with aria-label",
            testFunction: `
              const { container } = render(
                <AccessibleModal isOpen={true} onClose={() => {}} title="Test">
                  Content
                </AccessibleModal>
              );
              const closeButton = container.querySelector('button[aria-label="Close"]');
              closeButton !== null
            `,
          },
          {
            id: "test-9",
            description: "AccessibleModal should handle Escape key",
            testFunction: `code.includes('Escape') && code.includes('onKeyDown')`,
          },
          {
            id: "test-10",
            description: "ScreenReaderOnly should render with sr-only class",
            testFunction: `
              const { container } = render(
                <ScreenReaderOnly>Hidden text</ScreenReaderOnly>
              );
              container.querySelector('.sr-only') !== null
            `,
          },
          {
            id: "test-11",
            description: "ScreenReaderOnly should have proper hiding styles",
            testFunction: `
              const { container } = render(
                <ScreenReaderOnly>Hidden text</ScreenReaderOnly>
              );
              const element = container.querySelector('.sr-only');
              element.style.position === 'absolute' &&
              element.style.width === '1px' &&
              element.style.overflow === 'hidden'
            `,
          },
          {
            id: "test-12",
            description: "useFocusTrap should return a ref",
            testFunction: `
              let result;
              function TestComponent() {
                result = useFocusTrap();
                return null;
              }
              render(<TestComponent />);
              result !== null && typeof result === 'object' && 'current' in result
            `,
          },
        ],
        language: "jsx",
      },
    ],
  },

  // Lesson 6: SEO with React
  {
    id: "production-patterns-06",
    moduleId: "module-3-4",
    title: "SEO with React",
    order: 6,
    xpReward: 500,
    difficulty: "advanced",
    steps: [
      {
        id: "production-patterns-06-step-1",
        order: 1,
        instruction: `
# SEO with React

SEO (Search Engine Optimization) in React requires managing metadata, structured data, and ensuring content is indexable. Modern solutions use libraries like React Helmet or Next.js's Head component.

## SEO Patterns

**1. Dynamic Meta Tags with React Helmet:**
\`\`\`jsx
import { Helmet } from 'react-helmet';

function ProductPage({ product }) {
  return (
    <>
      <Helmet>
        <title>{product.name} | My Store</title>
        <meta name="description" content={product.description} />
        <meta property="og:title" content={product.name} />
        <meta property="og:description" content={product.description} />
        <meta property="og:image" content={product.image} />
        <meta property="og:type" content="product" />
        <link rel="canonical" href={\`https://mystore.com/products/\${product.id}\`} />
      </Helmet>
      <div>
        <h1>{product.name}</h1>
        <p>{product.description}</p>
      </div>
    </>
  );
}
\`\`\`

**2. Structured Data (JSON-LD):**
\`\`\`jsx
function BlogPost({ post }) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "author": {
      "@type": "Person",
      "name": post.author
    },
    "datePublished": post.date,
    "image": post.image
  };

  return (
    <>
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>
      <article>
        <h1>{post.title}</h1>
        <p>By {post.author}</p>
      </article>
    </>
  );
}
\`\`\`

**3. Custom SEO Hook:**
\`\`\`jsx
function useSEO({ title, description, image, url }) {
  useEffect(() => {
    // Update document title
    document.title = title;

    // Update meta tags
    updateMetaTag('name', 'description', description);
    updateMetaTag('property', 'og:title', title);
    updateMetaTag('property', 'og:description', description);
    updateMetaTag('property', 'og:image', image);
    updateMetaTag('property', 'og:url', url);
  }, [title, description, image, url]);
}

function updateMetaTag(attr, key, content) {
  let element = document.querySelector(\`meta[\${attr}="\${key}"]\`);
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attr, key);
    document.head.appendChild(element);
  }
  element.setAttribute('content', content);
}
\`\`\`

**4. SEO-Friendly Routing:**
\`\`\`jsx
// Use semantic URLs
// ❌ Bad: /page?id=123
// ✅ Good: /products/laptop-pro-2024

function ProductPage() {
  const { slug } = useParams();

  return (
    <>
      <Helmet>
        <link rel="canonical" href={\`https://site.com/products/\${slug}\`} />
      </Helmet>
      {/* Content */}
    </>
  );
}
\`\`\`

**5. Sitemap Generation:**
\`\`\`jsx
// Generate sitemap.xml
function generateSitemap(pages) {
  const urls = pages.map(page => \`
    <url>
      <loc>https://mysite.com\${page.path}</loc>
      <lastmod>\${page.updated}</lastmod>
      <changefreq>\${page.changeFreq}</changefreq>
      <priority>\${page.priority}</priority>
    </url>
  \`).join('');

  return \`<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      \${urls}
    </urlset>\`;
}
\`\`\`

## Your Task

Build a comprehensive SEO system for React:

1. Create a \`SEOHead\` component that:
   - Accepts props: \`title\`, \`description\`, \`image\`, \`url\`, \`type\` (default: 'website')
   - Returns a \`<head>\` element (for this exercise) with:
     - A \`<title>\` tag with the title
     - A meta tag with name="description"
     - A meta tag with property="og:title"
     - A meta tag with property="og:description"
     - A meta tag with property="og:image" (if image provided)
     - A meta tag with property="og:url" (if url provided)
     - A meta tag with property="og:type"

2. Create a \`StructuredData\` component that:
   - Accepts \`data\` prop (object)
   - Returns a \`<script>\` tag with type="application/ld+json"
   - Contains JSON.stringify(data) as children

3. Create a \`useSEO\` custom hook that:
   - Accepts an object with \`title\`, \`description\`
   - Uses useEffect to update document.title
   - Updates document.title when title changes

4. Create a \`CanonicalLink\` component that:
   - Accepts \`url\` prop
   - Returns a \`<link>\` tag with rel="canonical" and href set to url
        `,
        hint: "For SEOHead, create multiple meta tags in a head element. For StructuredData, use JSON.stringify to convert the object. For useSEO, use useEffect with dependencies. Remember to handle optional props.",
        starterCode: `import React, { useEffect } from 'react';

// Create SEOHead component
function SEOHead({ title, description, image, url, type = 'website' }) {
  // Your implementation here
}

// Create StructuredData component
function StructuredData({ data }) {
  // Your implementation here
}

// Create useSEO hook
function useSEO({ title, description }) {
  // Your implementation here
}

// Create CanonicalLink component
function CanonicalLink({ url }) {
  // Your implementation here
}

export { SEOHead, StructuredData, useSEO, CanonicalLink };`,
        solution: `import React, { useEffect } from 'react';

function SEOHead({ title, description, image, url, type = 'website' }) {
  return (
    <head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      {image && <meta property="og:image" content={image} />}
      {url && <meta property="og:url" content={url} />}
      <meta property="og:type" content={type} />
    </head>
  );
}

function StructuredData({ data }) {
  return (
    <script type="application/ld+json">
      {JSON.stringify(data)}
    </script>
  );
}

function useSEO({ title, description }) {
  useEffect(() => {
    if (title) {
      document.title = title;
    }
  }, [title, description]);
}

function CanonicalLink({ url }) {
  return <link rel="canonical" href={url} />;
}

export { SEOHead, StructuredData, useSEO, CanonicalLink };`,
        testCases: [
          {
            id: "test-1",
            description: "SEOHead should render a head element",
            testFunction: `
              const { container } = render(
                <SEOHead title="Test" description="Test description" />
              );
              container.querySelector('head') !== null
            `,
          },
          {
            id: "test-2",
            description: "SEOHead should render title tag",
            testFunction: `
              const { container } = render(
                <SEOHead title="Test Title" description="Test description" />
              );
              const title = container.querySelector('title');
              title !== null && title.textContent === 'Test Title'
            `,
          },
          {
            id: "test-3",
            description: "SEOHead should render description meta tag",
            testFunction: `
              const { container } = render(
                <SEOHead title="Test" description="Test description" />
              );
              const meta = container.querySelector('meta[name="description"]');
              meta !== null && meta.getAttribute('content') === 'Test description'
            `,
          },
          {
            id: "test-4",
            description: "SEOHead should render Open Graph meta tags",
            testFunction: `
              const { container } = render(
                <SEOHead title="Test" description="Test description" />
              );
              const ogTitle = container.querySelector('meta[property="og:title"]');
              const ogDesc = container.querySelector('meta[property="og:description"]');
              ogTitle !== null && ogDesc !== null
            `,
          },
          {
            id: "test-5",
            description: "SEOHead should conditionally render image meta tag",
            testFunction: `
              const { container } = render(
                <SEOHead title="Test" description="Test" image="https://example.com/image.jpg" />
              );
              const ogImage = container.querySelector('meta[property="og:image"]');
              ogImage !== null && ogImage.getAttribute('content') === 'https://example.com/image.jpg'
            `,
          },
          {
            id: "test-6",
            description: "SEOHead should conditionally render url meta tag",
            testFunction: `
              const { container } = render(
                <SEOHead title="Test" description="Test" url="https://example.com" />
              );
              const ogUrl = container.querySelector('meta[property="og:url"]');
              ogUrl !== null && ogUrl.getAttribute('content') === 'https://example.com'
            `,
          },
          {
            id: "test-7",
            description: "SEOHead should render og:type with default value",
            testFunction: `
              const { container } = render(
                <SEOHead title="Test" description="Test" />
              );
              const ogType = container.querySelector('meta[property="og:type"]');
              ogType !== null && ogType.getAttribute('content') === 'website'
            `,
          },
          {
            id: "test-8",
            description: "StructuredData should render script tag with correct type",
            testFunction: `
              const data = { "@type": "Person", "name": "John" };
              const { container } = render(<StructuredData data={data} />);
              const script = container.querySelector('script[type="application/ld+json"]');
              script !== null
            `,
          },
          {
            id: "test-9",
            description: "StructuredData should contain JSON stringified data",
            testFunction: `
              const data = { "@type": "Person", "name": "John" };
              const { container } = render(<StructuredData data={data} />);
              const script = container.querySelector('script');
              script.textContent.includes('"@type"') && script.textContent.includes('"Person"')
            `,
          },
          {
            id: "test-10",
            description: "useSEO should update document.title",
            testFunction: `
              const originalTitle = document.title;
              function TestComponent() {
                useSEO({ title: 'New Title', description: 'New description' });
                return null;
              }
              render(<TestComponent />);
              const result = document.title === 'New Title';
              document.title = originalTitle; // Reset
              result
            `,
          },
          {
            id: "test-11",
            description: "useSEO should use useEffect",
            testFunction: `code.includes('useEffect')`,
          },
          {
            id: "test-12",
            description: "CanonicalLink should render link tag with rel='canonical'",
            testFunction: `
              const { container } = render(<CanonicalLink url="https://example.com/page" />);
              const link = container.querySelector('link[rel="canonical"]');
              link !== null && link.getAttribute('href') === 'https://example.com/page'
            `,
          },
        ],
        language: "jsx",
      },
    ],
  },

  // Lessons 7-9: React 19 Features (imported from separate file)
  ...react19Lessons,
];
