/**
 * React Course - Phase 3: Expert Mastery
 * Module 3.1: Advanced State Management (12 lessons)
 *
 * This module covers expert-level state management including Redux Toolkit,
 * Zustand, and advanced patterns for managing application state at scale.
 */

import { InteractiveLesson } from "@/types";

export const advancedStateManagementLessons: InteractiveLesson[] = [
  // Lesson 1: State Management Overview
  {
    id: "state-mgmt-01",
    moduleId: "module-3-1",
    title: "State Management Overview",
    order: 1,
    xpReward: 250,
    difficulty: "advanced",
    steps: [
      {
        id: "state-mgmt-01-step-1",
        order: 1,
        instruction: `
# State Management Overview

As React applications grow, managing state becomes increasingly complex. While \`useState\` and \`useContext\` work well for small apps, larger applications require more sophisticated state management solutions.

## The Problem: State Complexity

\`\`\`jsx
// ❌ This becomes unmanageable quickly
function App() {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [theme, setTheme] = useState('light');
  const [settings, setSettings] = useState({});
  // ... dozens more state variables
}
\`\`\`

## State Management Solutions

**1. Context API + useReducer**
- Built into React
- Good for moderate complexity
- Can cause performance issues with frequent updates

**2. Redux Toolkit**
- Industry standard for large apps
- Predictable state updates
- Excellent DevTools
- Time-travel debugging

**3. Zustand**
- Minimal boilerplate
- Simple API
- Great performance
- Perfect for medium-sized apps

**4. Jotai / Recoil**
- Atomic state management
- Bottom-up approach
- Fine-grained updates

## When to Use What

| Solution | Best For | Complexity |
|----------|----------|------------|
| useState | Local component state | Low |
| Context + useReducer | Shared state, 2-3 features | Medium |
| Redux Toolkit | Large apps, complex data flow | High |
| Zustand | Medium apps, simple API | Low-Medium |

## Your Task

Create a type definition and comparison object that maps state management solutions to their characteristics:

1. Create a TypeScript type \`StateManagementSolution\` with properties:
   - \`name: string\`
   - \`complexity: 'low' | 'medium' | 'high'\`
   - \`bestFor: string\`
   - \`boilerplate: 'minimal' | 'moderate' | 'extensive'\`

2. Create a constant \`stateManagementComparison\` that is an array of \`StateManagementSolution\` objects for:
   - useState (low complexity, local state, minimal boilerplate)
   - Context API (medium complexity, shared state, moderate boilerplate)
   - Redux Toolkit (high complexity, large applications, moderate boilerplate)
   - Zustand (low complexity, medium applications, minimal boilerplate)

3. Export both the type and the constant
        `,
        hint: "Define the type first, then create an array of objects matching that type. Use TypeScript's type annotation for the array.",
        starterCode: `// Define your StateManagementSolution type here


// Create the stateManagementComparison array here


export { StateManagementSolution, stateManagementComparison };`,
        solution: `type StateManagementSolution = {
  name: string;
  complexity: 'low' | 'medium' | 'high';
  bestFor: string;
  boilerplate: 'minimal' | 'moderate' | 'extensive';
};

const stateManagementComparison: StateManagementSolution[] = [
  {
    name: 'useState',
    complexity: 'low',
    bestFor: 'local state',
    boilerplate: 'minimal'
  },
  {
    name: 'Context API',
    complexity: 'medium',
    bestFor: 'shared state',
    boilerplate: 'moderate'
  },
  {
    name: 'Redux Toolkit',
    complexity: 'high',
    bestFor: 'large applications',
    boilerplate: 'moderate'
  },
  {
    name: 'Zustand',
    complexity: 'low',
    bestFor: 'medium applications',
    boilerplate: 'minimal'
  }
];

export { StateManagementSolution, stateManagementComparison };`,
        testCases: [
          {
            id: "test-1",
            description: "StateManagementSolution type should be defined",
            testFunction: `code.includes('type StateManagementSolution')`,
          },
          {
            id: "test-2",
            description: "Type should have all required properties",
            testFunction: `code.includes('name:') && code.includes('complexity:') && code.includes('bestFor:') && code.includes('boilerplate:')`,
          },
          {
            id: "test-3",
            description: "stateManagementComparison should be an array with 4 items",
            testFunction: `Array.isArray(stateManagementComparison) && stateManagementComparison.length === 4`,
          },
          {
            id: "test-4",
            description: "Array should include useState solution",
            testFunction: `stateManagementComparison.some(s => s.name === 'useState' && s.complexity === 'low')`,
          },
          {
            id: "test-5",
            description: "Array should include Redux Toolkit solution",
            testFunction: `stateManagementComparison.some(s => s.name === 'Redux Toolkit' && s.complexity === 'high')`,
          },
          {
            id: "test-6",
            description: "Array should include Zustand solution",
            testFunction: `stateManagementComparison.some(s => s.name === 'Zustand' && s.boilerplate === 'minimal')`,
          },
        ],
        language: "typescript",
      },
    ],
  },

  // Lesson 2: Redux Basics
  {
    id: "state-mgmt-02",
    moduleId: "module-3-1",
    title: "Redux Basics",
    order: 2,
    xpReward: 300,
    difficulty: "advanced",
    steps: [
      {
        id: "state-mgmt-02-step-1",
        order: 1,
        instruction: `
# Redux Basics

Redux is a predictable state container based on three core principles:

## 1. Single Source of Truth
The entire application state is stored in a single **store**.

## 2. State is Read-Only
The only way to change state is by dispatching an **action**.

## 3. Changes are Made with Pure Functions
**Reducers** are pure functions that take the previous state and an action, and return the next state.

## Redux Data Flow

\`\`\`
┌─────────┐
│  Store  │ ← Single source of truth
└────┬────┘
     │
     ↓ (provides state)
┌─────────┐
│Component│
└────┬────┘
     │
     ↓ (dispatches)
┌─────────┐
│ Action  │ ← Plain object: { type: 'INCREMENT', payload: 1 }
└────┬────┘
     │
     ↓ (sent to)
┌─────────┐
│ Reducer │ ← Pure function: (state, action) => newState
└────┬────┘
     │
     ↓ (updates)
┌─────────┐
│  Store  │
└─────────┘
\`\`\`

## Example: Traditional Redux

\`\`\`javascript
// Action Types
const INCREMENT = 'counter/increment';
const DECREMENT = 'counter/decrement';

// Action Creators
const increment = (amount) => ({
  type: INCREMENT,
  payload: amount
});

// Reducer
const counterReducer = (state = { value: 0 }, action) => {
  switch (action.type) {
    case INCREMENT:
      return { value: state.value + action.payload };
    case DECREMENT:
      return { value: state.value - action.payload };
    default:
      return state;
  }
};

// Store
import { createStore } from 'redux';
const store = createStore(counterReducer);
\`\`\`

## Your Task

Implement a basic Redux-style counter reducer:

1. Define action type constants:
   - \`ADD_TODO\` = 'todos/add'
   - \`TOGGLE_TODO\` = 'todos/toggle'

2. Create an action creator function \`addTodo\` that accepts a \`text\` parameter and returns an action with:
   - \`type: ADD_TODO\`
   - \`payload: { id: Date.now(), text, completed: false }\`

3. Create a reducer function \`todosReducer\` that:
   - Has initial state: \`{ todos: [] }\`
   - Handles \`ADD_TODO\`: adds the todo to the todos array
   - Returns state unchanged for unknown actions

4. Export all three items
        `,
        hint: "Remember that reducers must return NEW state objects, not mutate existing state. Use the spread operator to create new arrays.",
        starterCode: `// Define action type constants


// Create addTodo action creator


// Create todosReducer


export { ADD_TODO, TOGGLE_TODO, addTodo, todosReducer };`,
        solution: `const ADD_TODO = 'todos/add';
const TOGGLE_TODO = 'todos/toggle';

const addTodo = (text: string) => ({
  type: ADD_TODO,
  payload: {
    id: Date.now(),
    text,
    completed: false
  }
});

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

interface TodoState {
  todos: Todo[];
}

const todosReducer = (state: TodoState = { todos: [] }, action: any): TodoState => {
  switch (action.type) {
    case ADD_TODO:
      return {
        todos: [...state.todos, action.payload]
      };
    default:
      return state;
  }
};

export { ADD_TODO, TOGGLE_TODO, addTodo, todosReducer };`,
        testCases: [
          {
            id: "test-1",
            description: "ADD_TODO constant should be defined correctly",
            testFunction: `ADD_TODO === 'todos/add'`,
          },
          {
            id: "test-2",
            description: "addTodo should return correct action structure",
            testFunction: `
              const action = addTodo('Test todo');
              action.type === ADD_TODO && action.payload.text === 'Test todo' && action.payload.completed === false
            `,
          },
          {
            id: "test-3",
            description: "todosReducer should return initial state when called with undefined",
            testFunction: `
              const state = todosReducer(undefined, { type: '@@INIT' });
              Array.isArray(state.todos) && state.todos.length === 0
            `,
          },
          {
            id: "test-4",
            description: "todosReducer should handle ADD_TODO action",
            testFunction: `
              const action = addTodo('Learn Redux');
              const newState = todosReducer({ todos: [] }, action);
              newState.todos.length === 1 && newState.todos[0].text === 'Learn Redux'
            `,
          },
          {
            id: "test-5",
            description: "todosReducer should not mutate the original state",
            testFunction: `
              const originalState = { todos: [] };
              const action = addTodo('Test');
              const newState = todosReducer(originalState, action);
              originalState.todos.length === 0 && newState.todos.length === 1
            `,
          },
          {
            id: "test-6",
            description: "todosReducer should return unchanged state for unknown actions",
            testFunction: `
              const state = { todos: [{ id: 1, text: 'Test', completed: false }] };
              const newState = todosReducer(state, { type: 'UNKNOWN' });
              newState === state
            `,
          },
        ],
        language: "typescript",
      },
    ],
  },

  // Lesson 3: Redux Toolkit Introduction
  {
    id: "state-mgmt-03",
    moduleId: "module-3-1",
    title: "Redux Toolkit Introduction",
    order: 3,
    xpReward: 300,
    difficulty: "advanced",
    steps: [
      {
        id: "state-mgmt-03-step-1",
        order: 1,
        instruction: `
# Redux Toolkit Introduction

**Redux Toolkit (RTK)** is the official, opinionated way to write Redux. It dramatically reduces boilerplate and follows best practices by default.

## Why Redux Toolkit?

**Traditional Redux:**
\`\`\`javascript
// Action types
const INCREMENT = 'counter/increment';

// Action creators
const increment = (amount) => ({ type: INCREMENT, payload: amount });

// Reducer with immutable updates
const reducer = (state = 0, action) => {
  switch (action.type) {
    case INCREMENT:
      return state + action.payload;
    default:
      return state;
  }
};
\`\`\`

**Redux Toolkit:**
\`\`\`javascript
import { createSlice } from '@reduxjs/toolkit';

const counterSlice = createSlice({
  name: 'counter',
  initialState: 0,
  reducers: {
    increment: (state, action) => state + action.payload
  }
});
\`\`\`

## Key Features

1. **configureStore**: Sets up store with good defaults
2. **createSlice**: Combines actions and reducers
3. **createAsyncThunk**: Handles async logic
4. **Immer integration**: Write "mutating" logic that becomes immutable

## Setting Up Redux Toolkit

\`\`\`bash
npm install @reduxjs/toolkit react-redux
\`\`\`

\`\`\`javascript
// store.js
import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './counterSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
});
\`\`\`

\`\`\`jsx
// App.jsx
import { Provider } from 'react-redux';
import { store } from './store';

function App() {
  return (
    <Provider store={store}>
      <MyComponents />
    </Provider>
  );
}
\`\`\`

## Your Task

Set up a basic Redux Toolkit store configuration:

1. Import \`configureStore\` from '@reduxjs/toolkit'

2. Create a simple slice reducer object with:
   - \`user\`: a placeholder reducer that returns \`{ name: 'Guest', isLoggedIn: false }\`
   - \`settings\`: a placeholder reducer that returns \`{ theme: 'light' }\`

3. Create and export a store using \`configureStore\` with these reducers

4. Export a type \`RootState\` that represents the return type of \`store.getState\`

5. Export a type \`AppDispatch\` that represents the type of \`store.dispatch\`
        `,
        hint: "Use configureStore({ reducer: { ... } }). For TypeScript types, use ReturnType<typeof store.getState> for RootState.",
        starterCode: `import { configureStore } from '@reduxjs/toolkit';

// Create placeholder reducers


// Create store with configureStore


// Export types


export { store };`,
        solution: `import { configureStore } from '@reduxjs/toolkit';

// Placeholder reducers
const userReducer = (state = { name: 'Guest', isLoggedIn: false }) => state;
const settingsReducer = (state = { theme: 'light' }) => state;

// Configure store
export const store = configureStore({
  reducer: {
    user: userReducer,
    settings: settingsReducer,
  },
});

// Export types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;`,
        testCases: [
          {
            id: "test-1",
            description: "Should import configureStore from Redux Toolkit",
            testFunction: `code.includes("from '@reduxjs/toolkit'")`,
          },
          {
            id: "test-2",
            description: "Store should be created with configureStore",
            testFunction: `typeof store === 'object' && typeof store.getState === 'function' && typeof store.dispatch === 'function'`,
          },
          {
            id: "test-3",
            description: "Store should have user reducer",
            testFunction: `
              const state = store.getState();
              state.user !== undefined && state.user.name === 'Guest' && state.user.isLoggedIn === false
            `,
          },
          {
            id: "test-4",
            description: "Store should have settings reducer",
            testFunction: `
              const state = store.getState();
              state.settings !== undefined && state.settings.theme === 'light'
            `,
          },
          {
            id: "test-5",
            description: "RootState type should be exported",
            testFunction: `code.includes('export type RootState')`,
          },
          {
            id: "test-6",
            description: "AppDispatch type should be exported",
            testFunction: `code.includes('export type AppDispatch')`,
          },
        ],
        language: "typescript",
      },
    ],
  },

  // Lesson 4: Creating Slices
  {
    id: "state-mgmt-04",
    moduleId: "module-3-1",
    title: "Creating Slices",
    order: 4,
    xpReward: 350,
    difficulty: "advanced",
    steps: [
      {
        id: "state-mgmt-04-step-1",
        order: 1,
        instruction: `
# Creating Slices

A **slice** is a collection of Redux reducer logic and actions for a single feature of your app. \`createSlice\` automatically generates action creators and action types.

## Anatomy of a Slice

\`\`\`typescript
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CounterState {
  value: number;
  status: 'idle' | 'loading';
}

const initialState: CounterState = {
  value: 0,
  status: 'idle'
};

const counterSlice = createSlice({
  name: 'counter', // Used in action types: "counter/increment"
  initialState,
  reducers: {
    // Action creator: increment()
    increment: (state) => {
      state.value += 1; // Looks like mutation, but Immer makes it immutable!
    },

    // Action creator: decrement()
    decrement: (state) => {
      state.value -= 1;
    },

    // Action creator: incrementByAmount(5)
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },

    // Can return new state instead of "mutating"
    reset: () => initialState,
  },
});

// Export actions
export const { increment, decrement, incrementByAmount, reset } = counterSlice.actions;

// Export reducer
export default counterSlice.reducer;
\`\`\`

## Using the Slice

\`\`\`typescript
// In store.ts
import counterReducer from './counterSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
});
\`\`\`

## Immer Magic

Redux Toolkit uses **Immer** internally, allowing you to write code that looks like it mutates state, but actually produces immutable updates:

\`\`\`typescript
// ✅ This is OK in Redux Toolkit
state.value += 1;

// ✅ This is also OK
state.items.push(newItem);

// ⚠️ You can also return new state
return { ...state, value: state.value + 1 };

// ❌ DON'T do both! Either mutate OR return, not both
state.value += 1;
return state; // WRONG!
\`\`\`

## Your Task

Create a slice for managing a shopping cart:

1. Define an interface \`CartItem\` with:
   - \`id: number\`
   - \`name: string\`
   - \`price: number\`
   - \`quantity: number\`

2. Define an interface \`CartState\` with:
   - \`items: CartItem[]\`
   - \`total: number\`

3. Create a slice named \`'cart'\` with initial state \`{ items: [], total: 0 }\`

4. Add reducers:
   - \`addItem\`: accepts a CartItem, adds it to items, updates total
   - \`removeItem\`: accepts a number (id), removes that item, updates total
   - \`clearCart\`: resets to initial state

5. Export the actions and default export the reducer
        `,
        hint: "Use state.items.push() to add items (Immer handles immutability). Calculate total by summing item.price * item.quantity for all items.",
        starterCode: `import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define interfaces


// Define initial state


// Create slice


// Export actions and reducer
`,
        solution: `import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  total: number;
}

const initialState: CartState = {
  items: [],
  total: 0
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<CartItem>) => {
      state.items.push(action.payload);
      state.total = state.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    },
    removeItem: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
      state.total = state.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    },
    clearCart: () => initialState,
  },
});

export const { addItem, removeItem, clearCart } = cartSlice.actions;
export default cartSlice.reducer;`,
        testCases: [
          {
            id: "test-1",
            description: "Should define CartItem and CartState interfaces",
            testFunction: `code.includes('interface CartItem') && code.includes('interface CartState')`,
          },
          {
            id: "test-2",
            description: "Should create slice with correct name",
            testFunction: `code.includes("name: 'cart'")`,
          },
          {
            id: "test-3",
            description: "Should export addItem, removeItem, and clearCart actions",
            testFunction: `code.includes('export const { addItem, removeItem, clearCart }')`,
          },
          {
            id: "test-4",
            description: "Reducer should handle addItem correctly",
            testFunction: `
              const state = { items: [], total: 0 };
              const item = { id: 1, name: 'Test', price: 10, quantity: 2 };
              const newState = cartSlice.reducer(state, addItem(item));
              newState.items.length === 1 && newState.total === 20
            `,
          },
          {
            id: "test-5",
            description: "Reducer should handle removeItem correctly",
            testFunction: `
              const state = { items: [{ id: 1, name: 'Test', price: 10, quantity: 1 }], total: 10 };
              const newState = cartSlice.reducer(state, removeItem(1));
              newState.items.length === 0 && newState.total === 0
            `,
          },
          {
            id: "test-6",
            description: "Reducer should handle clearCart correctly",
            testFunction: `
              const state = { items: [{ id: 1, name: 'Test', price: 10, quantity: 1 }], total: 10 };
              const newState = cartSlice.reducer(state, clearCart());
              newState.items.length === 0 && newState.total === 0
            `,
          },
        ],
        language: "typescript",
      },
    ],
  },

  // Lesson 5: useDispatch and useSelector
  {
    id: "state-mgmt-05",
    moduleId: "module-3-1",
    title: "useDispatch and useSelector",
    order: 5,
    xpReward: 350,
    difficulty: "advanced",
    steps: [
      {
        id: "state-mgmt-05-step-1",
        order: 1,
        instruction: `
# useDispatch and useSelector

React-Redux provides hooks to interact with the Redux store from your components.

## useSelector: Reading State

\`useSelector\` extracts data from the Redux store state.

\`\`\`tsx
import { useSelector } from 'react-redux';
import { RootState } from './store';

function Counter() {
  // Select specific data from state
  const count = useSelector((state: RootState) => state.counter.value);
  const status = useSelector((state: RootState) => state.counter.status);

  return <div>Count: {count}</div>;
}
\`\`\`

**Best Practice:** Create custom selector functions:

\`\`\`typescript
// In counterSlice.ts
export const selectCount = (state: RootState) => state.counter.value;
export const selectStatus = (state: RootState) => state.counter.status;

// In component
const count = useSelector(selectCount);
\`\`\`

## useDispatch: Dispatching Actions

\`useDispatch\` returns a reference to the dispatch function.

\`\`\`tsx
import { useDispatch } from 'react-redux';
import { increment, decrement } from './counterSlice';

function Counter() {
  const dispatch = useDispatch();
  const count = useSelector(selectCount);

  return (
    <div>
      <button onClick={() => dispatch(increment())}>+</button>
      <span>{count}</span>
      <button onClick={() => dispatch(decrement())}>-</button>
    </div>
  );
}
\`\`\`

## Typed Hooks (Recommended)

Create typed versions for better TypeScript support:

\`\`\`typescript
// hooks.ts
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from './store';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
\`\`\`

Then use \`useAppDispatch\` and \`useAppSelector\` in components.

## Performance: Selector Optimization

\`\`\`tsx
// ❌ Bad: Creates new array every render
const todoIds = useSelector(state =>
  state.todos.map(todo => todo.id)
);

// ✅ Good: Only recomputes when todos array changes
import { createSelector } from '@reduxjs/toolkit';

const selectTodoIds = createSelector(
  [(state: RootState) => state.todos],
  (todos) => todos.map(todo => todo.id)
);

const todoIds = useSelector(selectTodoIds);
\`\`\`

## Your Task

Create a React component that uses Redux hooks:

1. Import necessary hooks and types (assume they exist)

2. Create a component \`TodoList\` that:
   - Uses \`useSelector\` to get \`todos\` array from state.todos.items
   - Uses \`useDispatch\` to get the dispatch function
   - Accepts no props

3. The component should:
   - Display a list of todos (each todo has \`id\`, \`text\`, \`completed\`)
   - Show a button next to each todo that says "Toggle"
   - When clicked, dispatch \`toggleTodo(todo.id)\` action
   - Render a "No todos" message if the array is empty

4. Use proper TypeScript types for RootState
        `,
        hint: "Use useSelector with (state: RootState) => state.todos.items. Map over todos to render each one with a Toggle button.",
        starterCode: `import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleTodo } from './todosSlice';
import { RootState } from './store';

function TodoList() {
  // Get todos from Redux state


  // Get dispatch function


  // Render UI
  return (
    <div>
      {/* Your code here */}
    </div>
  );
}

export default TodoList;`,
        solution: `import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleTodo } from './todosSlice';
import { RootState } from './store';

function TodoList() {
  const todos = useSelector((state: RootState) => state.todos.items);
  const dispatch = useDispatch();

  if (todos.length === 0) {
    return <div>No todos</div>;
  }

  return (
    <div>
      {todos.map(todo => (
        <div key={todo.id}>
          <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
            {todo.text}
          </span>
          <button onClick={() => dispatch(toggleTodo(todo.id))}>
            Toggle
          </button>
        </div>
      ))}
    </div>
  );
}

export default TodoList;`,
        testCases: [
          {
            id: "test-1",
            description: "Should import useSelector and useDispatch",
            testFunction: `code.includes('useSelector') && code.includes('useDispatch')`,
          },
          {
            id: "test-2",
            description: "Should use useSelector to get todos from state",
            testFunction: `code.includes('useSelector') && code.includes('state.todos.items')`,
          },
          {
            id: "test-3",
            description: "Should use useDispatch to get dispatch function",
            testFunction: `code.includes('useDispatch()')`,
          },
          {
            id: "test-4",
            description: "Should render 'No todos' when array is empty",
            testFunction: `code.includes('No todos')`,
          },
          {
            id: "test-5",
            description: "Should map over todos and render each one",
            testFunction: `code.includes('.map(') && code.includes('todo')`,
          },
          {
            id: "test-6",
            description: "Should dispatch toggleTodo action on button click",
            testFunction: `code.includes('dispatch(toggleTodo') && code.includes('onClick')`,
          },
        ],
        language: "tsx",
      },
    ],
  },

  // Lesson 6: Async Actions with Thunks
  {
    id: "state-mgmt-06",
    moduleId: "module-3-1",
    title: "Async Actions with Thunks",
    order: 6,
    xpReward: 400,
    difficulty: "advanced",
    steps: [
      {
        id: "state-mgmt-06-step-1",
        order: 1,
        instruction: `
# Async Actions with Thunks

Redux reducers must be pure and synchronous. For async operations (API calls, timers), we use **thunks**.

## What is a Thunk?

A thunk is a function that returns another function. Redux Toolkit provides \`createAsyncThunk\` to handle async logic.

## createAsyncThunk Lifecycle

\`\`\`typescript
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// Define async thunk
export const fetchUserById = createAsyncThunk(
  'users/fetchById', // Action type prefix
  async (userId: number) => {
    const response = await fetch(\`/api/users/\${userId}\`);
    return response.json(); // This becomes the payload
  }
);

// Thunk generates 3 action types automatically:
// - 'users/fetchById/pending'
// - 'users/fetchById/fulfilled'
// - 'users/fetchById/rejected'
\`\`\`

## Handling Thunks in Slices

\`\`\`typescript
interface UserState {
  user: User | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const userSlice = createSlice({
  name: 'users',
  initialState: {
    user: null,
    status: 'idle',
    error: null
  } as UserState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserById.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUserById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
      })
      .addCase(fetchUserById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Something went wrong';
      });
  },
});
\`\`\`

## Using Thunks in Components

\`\`\`tsx
function UserProfile({ userId }: { userId: number }) {
  const dispatch = useAppDispatch();
  const { user, status, error } = useAppSelector(state => state.users);

  useEffect(() => {
    dispatch(fetchUserById(userId));
  }, [userId, dispatch]);

  if (status === 'loading') return <div>Loading...</div>;
  if (status === 'failed') return <div>Error: {error}</div>;
  if (!user) return null;

  return <div>{user.name}</div>;
}
\`\`\`

## Error Handling & AbortController

\`\`\`typescript
export const fetchUserById = createAsyncThunk(
  'users/fetchById',
  async (userId: number, { rejectWithValue, signal }) => {
    try {
      const response = await fetch(\`/api/users/\${userId}\`, { signal });

      if (!response.ok) {
        return rejectWithValue('User not found');
      }

      return await response.json();
    } catch (error) {
      if (error.name === 'AbortError') {
        return rejectWithValue('Request cancelled');
      }
      return rejectWithValue('Network error');
    }
  }
);
\`\`\`

## Your Task

Create an async thunk for fetching posts:

1. Define an interface \`Post\` with:
   - \`id: number\`
   - \`title: string\`
   - \`body: string\`

2. Create an async thunk \`fetchPosts\` that:
   - Has no parameters
   - Fetches from 'https://jsonplaceholder.typicode.com/posts'
   - Returns the JSON response

3. Define interface \`PostsState\` with:
   - \`posts: Post[]\`
   - \`status: 'idle' | 'loading' | 'succeeded' | 'failed'\`
   - \`error: string | null\`

4. Create a slice \`'posts'\` with:
   - Initial state matching PostsState
   - No regular reducers
   - extraReducers that handle all three thunk states

5. Export the thunk, actions, and reducer
        `,
        hint: "Use createAsyncThunk with async function. In extraReducers, use builder.addCase for pending, fulfilled, and rejected.",
        starterCode: `import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Define Post interface


// Define PostsState interface


// Create async thunk


// Create slice with extraReducers


// Export thunk and reducer
`,
        solution: `import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

interface Post {
  id: number;
  title: string;
  body: string;
}

interface PostsState {
  posts: Post[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: PostsState = {
  posts: [],
  status: 'idle',
  error: null
};

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts');
  return (await response.json()) as Post[];
});

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPosts.fulfilled, (state, action: PayloadAction<Post[]>) => {
        state.status = 'succeeded';
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch posts';
      });
  },
});

export default postsSlice.reducer;`,
        testCases: [
          {
            id: "test-1",
            description: "Should define Post interface",
            testFunction: `code.includes('interface Post')`,
          },
          {
            id: "test-2",
            description: "Should define PostsState interface",
            testFunction: `code.includes('interface PostsState')`,
          },
          {
            id: "test-3",
            description: "Should create fetchPosts async thunk",
            testFunction: `code.includes('createAsyncThunk') && code.includes('fetchPosts')`,
          },
          {
            id: "test-4",
            description: "Thunk should fetch from correct URL",
            testFunction: `code.includes('jsonplaceholder.typicode.com/posts')`,
          },
          {
            id: "test-5",
            description: "Slice should have extraReducers",
            testFunction: `code.includes('extraReducers')`,
          },
          {
            id: "test-6",
            description: "Should handle pending, fulfilled, and rejected cases",
            testFunction: `code.includes('.pending') && code.includes('.fulfilled') && code.includes('.rejected')`,
          },
        ],
        language: "typescript",
      },
    ],
  },

  // Lesson 7: Redux Best Practices
  {
    id: "state-mgmt-07",
    moduleId: "module-3-1",
    title: "Redux Best Practices",
    order: 7,
    xpReward: 350,
    difficulty: "advanced",
    steps: [
      {
        id: "state-mgmt-07-step-1",
        order: 1,
        instruction: `
# Redux Best Practices

Follow these patterns to write maintainable, scalable Redux code.

## 1. File Structure

\`\`\`
src/
├── features/
│   ├── todos/
│   │   ├── todosSlice.ts        # Slice logic
│   │   ├── todosSelectors.ts    # Memoized selectors
│   │   ├── todosThunks.ts       # Async thunks
│   │   └── TodoList.tsx         # UI components
│   ├── users/
│   │   └── usersSlice.ts
│   └── ...
├── app/
│   ├── store.ts                 # Store configuration
│   └── hooks.ts                 # Typed hooks
└── types/
    └── index.ts                 # Shared types
\`\`\`

## 2. Naming Conventions

\`\`\`typescript
// ✅ Good: Descriptive action names
const todosSlice = createSlice({
  name: 'todos',
  reducers: {
    todoAdded: (state, action) => {},      // Past tense
    todoToggled: (state, action) => {},
    todoDeleted: (state, action) => {},
  }
});

// ❌ Bad: Vague names
reducers: {
  add: (state, action) => {},
  toggle: (state, action) => {},
}
\`\`\`

## 3. Normalize State Shape

\`\`\`typescript
// ❌ Bad: Nested arrays are hard to update
interface State {
  posts: {
    id: number;
    title: string;
    comments: Comment[];
  }[];
}

// ✅ Good: Normalized structure
interface State {
  posts: {
    byId: Record<number, Post>;
    allIds: number[];
  };
  comments: {
    byId: Record<number, Comment>;
    allIds: number[];
  };
}
\`\`\`

Use \`@reduxjs/toolkit\`'s \`createEntityAdapter\` for this:

\`\`\`typescript
import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';

const postsAdapter = createEntityAdapter<Post>();

const postsSlice = createSlice({
  name: 'posts',
  initialState: postsAdapter.getInitialState(),
  reducers: {
    postAdded: postsAdapter.addOne,
    postsReceived: postsAdapter.setAll,
    postUpdated: postsAdapter.updateOne,
  }
});

// Auto-generated selectors
export const {
  selectAll: selectAllPosts,
  selectById: selectPostById,
  selectIds: selectPostIds,
} = postsAdapter.getSelectors((state: RootState) => state.posts);
\`\`\`

## 4. Memoized Selectors

Use \`createSelector\` for expensive computations:

\`\`\`typescript
import { createSelector } from '@reduxjs/toolkit';

// Basic selectors
const selectTodos = (state: RootState) => state.todos;

// Memoized selector - only recomputes when todos change
export const selectCompletedTodos = createSelector(
  [selectTodos],
  (todos) => todos.filter(todo => todo.completed)
);

// Selector with multiple inputs
export const selectTodoById = createSelector(
  [selectTodos, (state: RootState, todoId: number) => todoId],
  (todos, todoId) => todos.find(todo => todo.id === todoId)
);
\`\`\`

## 5. Keep Reducers Pure

\`\`\`typescript
// ❌ Bad: Side effects in reducer
reducers: {
  userLoggedIn: (state, action) => {
    state.user = action.payload;
    localStorage.setItem('token', action.payload.token); // Side effect!
  }
}

// ✅ Good: Side effects in thunk or middleware
const loginUser = createAsyncThunk('user/login', async (credentials) => {
  const user = await api.login(credentials);
  localStorage.setItem('token', user.token); // Side effect here
  return user;
});
\`\`\`

## 6. Split Large Slices

\`\`\`typescript
// Instead of one giant slice, split by feature:
export const store = configureStore({
  reducer: {
    auth: authReducer,
    todos: todosReducer,
    users: usersReducer,
    settings: settingsReducer,
  }
});
\`\`\`

## Your Task

Refactor poorly written Redux code to follow best practices:

Given this bad code:
\`\`\`typescript
const slice = createSlice({
  name: 'data',
  initialState: { items: [], loading: false },
  reducers: {
    add: (state, action) => {
      state.items.push(action.payload);
      console.log('Item added'); // Side effect!
    },
    update: (state, action) => {
      const item = state.items.find(i => i.id === action.payload.id);
      if (item) {
        item.name = action.payload.name;
      }
    }
  }
});
\`\`\`

Refactor it to:
1. Use descriptive action names (past tense: itemAdded, itemUpdated)
2. Remove the console.log side effect
3. Add proper TypeScript types for Item and State
4. Use createEntityAdapter for normalized state
5. Export proper selectors
        `,
        hint: "Create interfaces first. Use createEntityAdapter for managing normalized items. Use adapter methods like addOne and updateOne.",
        starterCode: `import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

// Define Item interface


// Create entity adapter


// Create slice with proper naming


// Export actions and selectors
`,
        solution: `import { createSlice, createEntityAdapter, EntityState } from '@reduxjs/toolkit';

interface Item {
  id: number;
  name: string;
}

interface ItemsState extends EntityState<Item> {
  loading: boolean;
}

const itemsAdapter = createEntityAdapter<Item>();

const initialState: ItemsState = itemsAdapter.getInitialState({
  loading: false
});

const itemsSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    itemAdded: (state, action) => {
      itemsAdapter.addOne(state, action.payload);
    },
    itemUpdated: (state, action) => {
      itemsAdapter.updateOne(state, action.payload);
    },
    loadingStarted: (state) => {
      state.loading = true;
    },
    loadingFinished: (state) => {
      state.loading = false;
    }
  }
});

export const { itemAdded, itemUpdated, loadingStarted, loadingFinished } = itemsSlice.actions;

export const {
  selectAll: selectAllItems,
  selectById: selectItemById,
  selectIds: selectItemIds,
} = itemsAdapter.getSelectors((state: { items: ItemsState }) => state.items);

export default itemsSlice.reducer;`,
        testCases: [
          {
            id: "test-1",
            description: "Should define Item interface",
            testFunction: `code.includes('interface Item')`,
          },
          {
            id: "test-2",
            description: "Should use createEntityAdapter",
            testFunction: `code.includes('createEntityAdapter')`,
          },
          {
            id: "test-3",
            description: "Should use past tense for action names",
            testFunction: `code.includes('itemAdded') && code.includes('itemUpdated')`,
          },
          {
            id: "test-4",
            description: "Should not include console.log",
            testFunction: `!code.includes('console.log')`,
          },
          {
            id: "test-5",
            description: "Should use adapter methods",
            testFunction: `code.includes('addOne') || code.includes('updateOne')`,
          },
          {
            id: "test-6",
            description: "Should export selectors from adapter",
            testFunction: `code.includes('selectAll') || code.includes('selectById')`,
          },
        ],
        language: "typescript",
      },
    ],
  },

  // Lesson 8: Zustand Introduction
  {
    id: "state-mgmt-08",
    moduleId: "module-3-1",
    title: "Zustand Introduction",
    order: 8,
    xpReward: 300,
    difficulty: "advanced",
    steps: [
      {
        id: "state-mgmt-08-step-1",
        order: 1,
        instruction: `
# Zustand Introduction

**Zustand** is a small, fast, and scalable state management solution with minimal boilerplate. It's a great alternative to Redux for many use cases.

## Why Zustand?

**Redux Toolkit:**
\`\`\`typescript
// 1. Define types
interface CounterState { value: number; }

// 2. Create slice
const counterSlice = createSlice({ /* ... */ });

// 3. Configure store
const store = configureStore({ /* ... */ });

// 4. Wrap app in Provider
<Provider store={store}><App /></Provider>

// 5. Use in component
const value = useSelector(state => state.counter.value);
const dispatch = useDispatch();
dispatch(increment());
\`\`\`

**Zustand:**
\`\`\`typescript
// 1. Create store (that's it!)
const useCounterStore = create((set) => ({
  value: 0,
  increment: () => set((state) => ({ value: state.value + 1 })),
}));

// 2. Use in component (no Provider needed!)
const { value, increment } = useCounterStore();
\`\`\`

## Key Features

1. **No Provider wrapper needed** - Store is just a hook
2. **TypeScript-first** - Great type inference
3. **Minimal boilerplate** - Define store in one place
4. **Built-in DevTools** - Easy debugging
5. **Middleware support** - Persist, logger, etc.

## Basic Store

\`\`\`typescript
import { create } from 'zustand';

interface BearStore {
  bears: number;
  increase: () => void;
  decrease: () => void;
  removeAll: () => void;
}

const useBearStore = create<BearStore>((set) => ({
  bears: 0,
  increase: () => set((state) => ({ bears: state.bears + 1 })),
  decrease: () => set((state) => ({ bears: state.bears - 1 })),
  removeAll: () => set({ bears: 0 }),
}));
\`\`\`

## Using the Store

\`\`\`tsx
function BearCounter() {
  // Get entire store
  const { bears, increase, decrease } = useBearStore();

  // Or select specific values (better performance)
  const bears = useBearStore(state => state.bears);
  const increase = useBearStore(state => state.increase);

  return (
    <div>
      <h1>{bears} bears</h1>
      <button onClick={increase}>Add bear</button>
      <button onClick={decrease}>Remove bear</button>
    </div>
  );
}
\`\`\`

## Async Actions

\`\`\`typescript
const useUserStore = create<UserStore>((set) => ({
  user: null,
  loading: false,
  fetchUser: async (id: number) => {
    set({ loading: true });
    const user = await api.getUser(id);
    set({ user, loading: false });
  },
}));
\`\`\`

## Installation

\`\`\`bash
npm install zustand
\`\`\`

## Your Task

Create a basic Zustand store for managing a todo list:

1. Install types: \`import { create } from 'zustand'\`

2. Define interface \`Todo\` with:
   - \`id: number\`
   - \`text: string\`
   - \`completed: boolean\`

3. Define interface \`TodoStore\` with:
   - \`todos: Todo[]\`
   - \`addTodo: (text: string) => void\`
   - \`toggleTodo: (id: number) => void\`
   - \`deleteTodo: (id: number) => void\`

4. Create store \`useTodoStore\` with:
   - Initial state: \`todos: []\`
   - \`addTodo\`: creates new todo with \`Date.now()\` as id
   - \`toggleTodo\`: toggles completed status
   - \`deleteTodo\`: removes todo from array

5. Export the store hook
        `,
        hint: "Use create<TodoStore>((set) => ({ ... })). In actions, use set((state) => ({ ... })) to update state based on previous state.",
        starterCode: `import { create } from 'zustand';

// Define Todo interface


// Define TodoStore interface


// Create store


export { useTodoStore };`,
        solution: `import { create } from 'zustand';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

interface TodoStore {
  todos: Todo[];
  addTodo: (text: string) => void;
  toggleTodo: (id: number) => void;
  deleteTodo: (id: number) => void;
}

const useTodoStore = create<TodoStore>((set) => ({
  todos: [],

  addTodo: (text: string) =>
    set((state) => ({
      todos: [...state.todos, { id: Date.now(), text, completed: false }]
    })),

  toggleTodo: (id: number) =>
    set((state) => ({
      todos: state.todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    })),

  deleteTodo: (id: number) =>
    set((state) => ({
      todos: state.todos.filter(todo => todo.id !== id)
    })),
}));

export { useTodoStore };`,
        testCases: [
          {
            id: "test-1",
            description: "Should import create from zustand",
            testFunction: `code.includes("from 'zustand'")`,
          },
          {
            id: "test-2",
            description: "Should define Todo interface",
            testFunction: `code.includes('interface Todo')`,
          },
          {
            id: "test-3",
            description: "Should define TodoStore interface",
            testFunction: `code.includes('interface TodoStore')`,
          },
          {
            id: "test-4",
            description: "Store should have todos array",
            testFunction: `code.includes('todos:') && code.includes('[]')`,
          },
          {
            id: "test-5",
            description: "Store should have addTodo, toggleTodo, and deleteTodo methods",
            testFunction: `code.includes('addTodo:') && code.includes('toggleTodo:') && code.includes('deleteTodo:')`,
          },
          {
            id: "test-6",
            description: "Methods should use set function to update state",
            testFunction: `code.includes('set((state)') || code.includes('set({')`,
          },
        ],
        language: "typescript",
      },
    ],
  },

  // Lesson 9: Zustand Store Creation
  {
    id: "state-mgmt-09",
    moduleId: "module-3-1",
    title: "Zustand Store Creation",
    order: 9,
    xpReward: 350,
    difficulty: "advanced",
    steps: [
      {
        id: "state-mgmt-09-step-1",
        order: 1,
        instruction: `
# Zustand Store Creation

Let's dive deeper into creating and structuring Zustand stores for real-world applications.

## Advanced Store Patterns

### 1. Nested State Updates

\`\`\`typescript
interface Store {
  user: {
    name: string;
    settings: {
      theme: 'light' | 'dark';
      notifications: boolean;
    };
  };
  updateTheme: (theme: 'light' | 'dark') => void;
}

const useStore = create<Store>((set) => ({
  user: {
    name: 'Guest',
    settings: {
      theme: 'light',
      notifications: true,
    },
  },

  updateTheme: (theme) =>
    set((state) => ({
      user: {
        ...state.user,
        settings: {
          ...state.user.settings,
          theme,
        },
      },
    })),
}));
\`\`\`

### 2. Using Immer for Simpler Updates

\`\`\`typescript
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

const useStore = create<Store>()(
  immer((set) => ({
    user: { name: 'Guest', settings: { theme: 'light' } },

    // With Immer, "mutate" state directly!
    updateTheme: (theme) =>
      set((state) => {
        state.user.settings.theme = theme;
      }),
  }))
);
\`\`\`

### 3. Persist Middleware

Save state to localStorage automatically:

\`\`\`typescript
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useStore = create<Store>()(
  persist(
    (set) => ({
      user: null,
      login: (user) => set({ user }),
      logout: () => set({ user: null }),
    }),
    {
      name: 'user-storage', // localStorage key
      partialize: (state) => ({ user: state.user }), // Only persist user
    }
  )
);
\`\`\`

### 4. DevTools Integration

\`\`\`typescript
import { devtools } from 'zustand/middleware';

const useStore = create<Store>()(
  devtools(
    (set) => ({
      count: 0,
      increment: () => set((state) => ({ count: state.count + 1 })),
    }),
    { name: 'MyStore' }
  )
);
\`\`\`

### 5. Combining Middleware

\`\`\`typescript
const useStore = create<Store>()(
  devtools(
    persist(
      immer((set) => ({
        // Your store here
      })),
      { name: 'my-storage' }
    ),
    { name: 'MyStore' }
  )
);
\`\`\`

## Slice Pattern (Organize Large Stores)

\`\`\`typescript
// userSlice.ts
export const createUserSlice = (set) => ({
  user: null,
  login: (user) => set({ user }),
  logout: () => set({ user: null }),
});

// todoSlice.ts
export const createTodoSlice = (set) => ({
  todos: [],
  addTodo: (text) => set((state) => ({
    todos: [...state.todos, { id: Date.now(), text }]
  })),
});

// store.ts
import { create } from 'zustand';
import { createUserSlice } from './userSlice';
import { createTodoSlice } from './todoSlice';

const useStore = create((set) => ({
  ...createUserSlice(set),
  ...createTodoSlice(set),
}));
\`\`\`

## Accessing Store Outside Components

\`\`\`typescript
const useStore = create<Store>(() => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
}));

// Get state
const count = useStore.getState().count;

// Subscribe to changes
const unsubscribe = useStore.subscribe((state) => {
  console.log('Count changed:', state.count);
});

// Update state
useStore.setState({ count: 5 });
\`\`\`

## Your Task

Create an advanced Zustand store for an e-commerce cart with middleware:

1. Import necessary functions from zustand

2. Define interfaces:
   - \`CartItem\`: id, name, price, quantity
   - \`CartStore\`: items, total, addItem, removeItem, updateQuantity, clearCart

3. Create store with:
   - DevTools middleware (name: 'CartStore')
   - Persist middleware (name: 'cart-storage', persist only items)
   - Initial state: items as empty array, total as 0

4. Implement methods:
   - \`addItem\`: adds or increments quantity, recalculates total
   - \`removeItem\`: removes item by id, recalculates total
   - \`updateQuantity\`: updates quantity for item, recalculates total
   - \`clearCart\`: resets to initial state

5. Create a helper \`calculateTotal\` that sums price * quantity for all items
        `,
        hint: "Wrap your store with devtools and persist: create()(devtools(persist((set) => ({ ... })))). Calculate total after each state change.",
        starterCode: `import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

// Define interfaces


// Create store with middleware


export { useCartStore };`,
        solution: `import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  total: number;
  addItem: (item: Omit<CartItem, 'quantity'>) => void;
  removeItem: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
}

const calculateTotal = (items: CartItem[]) =>
  items.reduce((sum, item) => sum + item.price * item.quantity, 0);

const useCartStore = create<CartStore>()(
  devtools(
    persist(
      (set) => ({
        items: [],
        total: 0,

        addItem: (item) =>
          set((state) => {
            const existingItem = state.items.find(i => i.id === item.id);
            let newItems;

            if (existingItem) {
              newItems = state.items.map(i =>
                i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
              );
            } else {
              newItems = [...state.items, { ...item, quantity: 1 }];
            }

            return { items: newItems, total: calculateTotal(newItems) };
          }),

        removeItem: (id) =>
          set((state) => {
            const newItems = state.items.filter(item => item.id !== id);
            return { items: newItems, total: calculateTotal(newItems) };
          }),

        updateQuantity: (id, quantity) =>
          set((state) => {
            const newItems = state.items.map(item =>
              item.id === id ? { ...item, quantity } : item
            );
            return { items: newItems, total: calculateTotal(newItems) };
          }),

        clearCart: () => set({ items: [], total: 0 }),
      }),
      {
        name: 'cart-storage',
        partialize: (state) => ({ items: state.items }),
      }
    ),
    { name: 'CartStore' }
  )
);

export { useCartStore };`,
        testCases: [
          {
            id: "test-1",
            description: "Should import devtools and persist middleware",
            testFunction: `code.includes('devtools') && code.includes('persist')`,
          },
          {
            id: "test-2",
            description: "Should define CartItem and CartStore interfaces",
            testFunction: `code.includes('interface CartItem') && code.includes('interface CartStore')`,
          },
          {
            id: "test-3",
            description: "Store should be wrapped with devtools",
            testFunction: `code.includes('devtools(')`,
          },
          {
            id: "test-4",
            description: "Store should be wrapped with persist",
            testFunction: `code.includes('persist(')`,
          },
          {
            id: "test-5",
            description: "Store should have all required methods",
            testFunction: `code.includes('addItem:') && code.includes('removeItem:') && code.includes('updateQuantity:') && code.includes('clearCart:')`,
          },
          {
            id: "test-6",
            description: "Should calculate total after state changes",
            testFunction: `code.includes('total:') && (code.includes('calculateTotal') || code.includes('reduce'))`,
          },
        ],
        language: "typescript",
      },
    ],
  },

  // Lesson 10: Zustand vs Redux
  {
    id: "state-mgmt-10",
    moduleId: "module-3-1",
    title: "Zustand vs Redux",
    order: 10,
    xpReward: 300,
    difficulty: "advanced",
    steps: [
      {
        id: "state-mgmt-10-step-1",
        order: 1,
        instruction: `
# Zustand vs Redux

Both are excellent state management solutions. Let's compare them to help you choose the right tool.

## Side-by-Side Comparison

### Redux Toolkit
\`\`\`typescript
// 1. Create slice
const counterSlice = createSlice({
  name: 'counter',
  initialState: { value: 0 },
  reducers: {
    increment: (state) => { state.value += 1; },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
  },
});

// 2. Configure store
export const store = configureStore({
  reducer: { counter: counterSlice.reducer },
});

// 3. Wrap app
<Provider store={store}>
  <App />
</Provider>

// 4. Use in component
const count = useSelector(state => state.counter.value);
const dispatch = useDispatch();
dispatch(increment());
\`\`\`

### Zustand
\`\`\`typescript
// 1. Create store (no separate files needed)
const useCounterStore = create((set) => ({
  value: 0,
  increment: () => set((state) => ({ value: state.value + 1 })),
  incrementByAmount: (amount) =>
    set((state) => ({ value: state.value + amount })),
}));

// 2. Use directly in component (no Provider!)
const { value, increment } = useCounterStore();
\`\`\`

## Feature Comparison

| Feature | Redux Toolkit | Zustand |
|---------|---------------|---------|
| **Learning Curve** | Steeper | Gentle |
| **Boilerplate** | Moderate | Minimal |
| **Bundle Size** | ~12KB | ~1KB |
| **DevTools** | Excellent | Good |
| **TypeScript** | Great | Great |
| **Async** | Thunks/RTK Query | Built-in |
| **Provider** | Required | Not needed |
| **Ecosystem** | Huge | Growing |

## When to Use Redux

✅ **Choose Redux when:**
- Large enterprise applications
- Complex data flow with many features
- Need time-travel debugging
- Team already knows Redux
- Need Redux DevTools ecosystem
- Using RTK Query for data fetching
- Strict patterns and structure preferred

\`\`\`typescript
// Redux excels with complex data relationships
const store = configureStore({
  reducer: {
    users: usersReducer,
    posts: postsReducer,
    comments: commentsReducer,
    auth: authReducer,
    notifications: notificationsReducer,
    settings: settingsReducer,
    // 20+ more slices...
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(logger, analytics),
});
\`\`\`

## When to Use Zustand

✅ **Choose Zustand when:**
- Small to medium applications
- Want minimal boilerplate
- Prefer simpler API
- Don't need Redux ecosystem
- Performance is critical
- Rapid prototyping
- Learning state management

\`\`\`typescript
// Zustand is perfect for focused stores
const useAuthStore = create((set) => ({
  user: null,
  login: async (credentials) => {
    const user = await api.login(credentials);
    set({ user });
  },
  logout: () => set({ user: null }),
}));
\`\`\`

## Can They Coexist?

**Yes!** You can use both in the same app:

\`\`\`typescript
// Redux for complex global state
const store = configureStore({
  reducer: { users, posts, comments },
});

// Zustand for simple UI state
const useUIStore = create((set) => ({
  sidebarOpen: false,
  toggleSidebar: () => set((state) => ({
    sidebarOpen: !state.sidebarOpen
  })),
}));
\`\`\`

## Migration Path

### Redux → Zustand
\`\`\`typescript
// Before (Redux)
const slice = createSlice({
  name: 'todos',
  initialState: [],
  reducers: {
    todoAdded: (state, action) => {
      state.push(action.payload);
    },
  },
});

// After (Zustand)
const useTodoStore = create((set) => ({
  todos: [],
  addTodo: (todo) => set((state) => ({
    todos: [...state.todos, todo]
  })),
}));
\`\`\`

## Performance Considerations

**Redux:**
- Selectors with \`useSelector\` can cause re-renders
- Use \`createSelector\` for memoization
- Connect multiple slices carefully

**Zustand:**
- Only re-renders when selected state changes
- Automatic shallow equality check
- Very efficient by default

\`\`\`typescript
// Zustand: Only re-render when count changes
const count = useStore(state => state.count);

// Not when other state changes
const { items, settings, user } = useStore(); // Will re-render more often
\`\`\`

## Your Task

Create a comparison analysis by implementing the same counter in both Redux Toolkit and Zustand:

1. **Part A: Redux Version**
   - Create a counter slice with \`value\` and \`increment\` action
   - Export the reducer

2. **Part B: Zustand Version**
   - Create equivalent Zustand store

3. **Part C: Comparison Object**
   - Create an object \`comparison\` with properties:
     - \`reduxLines\`: count of lines in Redux implementation
     - \`zustandLines\`: count of lines in Zustand implementation
     - \`reduxFiles\`: number of files needed (slice + store = 2)
     - \`zustandFiles\`: number of files needed (1)
     - \`winner\`: 'zustand' (for simplicity)

4. Export all three parts
        `,
        hint: "Count actual code lines excluding comments and blank lines. Redux needs a slice definition; Zustand just needs create().",
        starterCode: `// Part A: Redux implementation
import { createSlice } from '@reduxjs/toolkit';


// Part B: Zustand implementation
import { create } from 'zustand';


// Part C: Comparison
const comparison = {
  // Fill in the comparison
};

export { counterSlice, useCounterStore, comparison };`,
        solution: `// Part A: Redux implementation
import { createSlice } from '@reduxjs/toolkit';

const counterSlice = createSlice({
  name: 'counter',
  initialState: { value: 0 },
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
  },
});

export const { increment } = counterSlice.actions;
export const counterReducer = counterSlice.reducer;

// Part B: Zustand implementation
import { create } from 'zustand';

const useCounterStore = create((set) => ({
  value: 0,
  increment: () => set((state) => ({ value: state.value + 1 })),
}));

// Part C: Comparison
const comparison = {
  reduxLines: 11,
  zustandLines: 4,
  reduxFiles: 2,
  zustandFiles: 1,
  winner: 'zustand',
  reason: 'Less boilerplate, simpler API, no Provider needed'
};

export { counterSlice, useCounterStore, comparison };`,
        testCases: [
          {
            id: "test-1",
            description: "Should create Redux counter slice",
            testFunction: `code.includes('createSlice') && code.includes("name: 'counter'")`,
          },
          {
            id: "test-2",
            description: "Redux slice should have increment reducer",
            testFunction: `code.includes('increment:') && code.includes('state.value')`,
          },
          {
            id: "test-3",
            description: "Should create Zustand counter store",
            testFunction: `code.includes('create((set)') && code.includes('value: 0')`,
          },
          {
            id: "test-4",
            description: "Zustand store should have increment method",
            testFunction: `code.includes('increment:') && code.includes('set((state)')`,
          },
          {
            id: "test-5",
            description: "Comparison object should exist with all properties",
            testFunction: `
              comparison.reduxLines !== undefined &&
              comparison.zustandLines !== undefined &&
              comparison.reduxFiles !== undefined &&
              comparison.zustandFiles !== undefined &&
              comparison.winner !== undefined
            `,
          },
          {
            id: "test-6",
            description: "Comparison should show Zustand is simpler",
            testFunction: `comparison.zustandLines < comparison.reduxLines && comparison.zustandFiles < comparison.reduxFiles`,
          },
        ],
        language: "typescript",
      },
    ],
  },

  // Lesson 11: State Management Patterns
  {
    id: "state-mgmt-11",
    moduleId: "module-3-1",
    title: "State Management Patterns",
    order: 11,
    xpReward: 400,
    difficulty: "advanced",
    steps: [
      {
        id: "state-mgmt-11-step-1",
        order: 1,
        instruction: `
# State Management Patterns

Advanced patterns for organizing and managing state in production applications.

## 1. Feature-Based Organization

Group related state, actions, and components together:

\`\`\`
src/features/
├── auth/
│   ├── authSlice.ts          # Redux slice or Zustand store
│   ├── authSelectors.ts      # Reusable selectors
│   ├── authThunks.ts         # Async logic
│   ├── LoginForm.tsx         # UI components
│   └── useAuth.ts            # Custom hooks
├── todos/
│   ├── todosSlice.ts
│   ├── TodoList.tsx
│   └── useTodos.ts
└── ...
\`\`\`

## 2. Selector Pattern

Create reusable, testable selectors:

\`\`\`typescript
// selectors.ts
export const selectUser = (state: RootState) => state.auth.user;
export const selectIsAuthenticated = (state: RootState) =>
  state.auth.user !== null;
export const selectUserRole = (state: RootState) =>
  state.auth.user?.role || 'guest';

// Memoized selectors for expensive computations
export const selectCompletedTodos = createSelector(
  [(state: RootState) => state.todos.items],
  (todos) => todos.filter(todo => todo.completed)
);

// Parametric selectors
export const selectTodoById = (id: number) =>
  createSelector(
    [(state: RootState) => state.todos.items],
    (todos) => todos.find(todo => todo.id === id)
  );
\`\`\`

## 3. Action Creator Pattern

Centralize business logic in action creators:

\`\`\`typescript
// Before: Logic in component
function TodoForm() {
  const dispatch = useDispatch();

  const handleSubmit = (text: string) => {
    if (text.length < 3) {
      alert('Too short!');
      return;
    }
    dispatch(addTodo({ id: Date.now(), text, completed: false }));
  };
}

// After: Logic in action creator
const addTodoWithValidation = (text: string) => {
  return (dispatch: AppDispatch) => {
    if (text.length < 3) {
      dispatch(showError('Todo must be at least 3 characters'));
      return;
    }
    dispatch(addTodo({ id: Date.now(), text, completed: false }));
  };
};

function TodoForm() {
  const dispatch = useDispatch();
  const handleSubmit = (text: string) => {
    dispatch(addTodoWithValidation(text));
  };
}
\`\`\`

## 4. Optimistic Updates

Update UI immediately, revert on error:

\`\`\`typescript
const likeTodo = createAsyncThunk(
  'todos/like',
  async (id: number, { dispatch, rejectWithValue }) => {
    // Optimistically update UI
    dispatch(todoLiked(id));

    try {
      await api.likeTodo(id);
    } catch (error) {
      // Revert on error
      dispatch(todoUnliked(id));
      return rejectWithValue('Failed to like todo');
    }
  }
);
\`\`\`

## 5. Request Status Pattern

Track loading/error states consistently:

\`\`\`typescript
interface RequestState {
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

interface TodosState extends RequestState {
  todos: Todo[];
}

// Helper to reduce boilerplate
const createRequestReducers = <T>(
  builder: ActionReducerMapBuilder<T>,
  thunk: AsyncThunk<any, any, any>
) => {
  builder
    .addCase(thunk.pending, (state: any) => {
      state.status = 'loading';
      state.error = null;
    })
    .addCase(thunk.fulfilled, (state: any) => {
      state.status = 'succeeded';
    })
    .addCase(thunk.rejected, (state: any, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    });
};
\`\`\`

## 6. Middleware Pattern

Add cross-cutting concerns:

\`\`\`typescript
// Logger middleware
const loggerMiddleware = (store) => (next) => (action) => {
  console.log('Dispatching:', action.type);
  const result = next(action);
  console.log('Next state:', store.getState());
  return result;
};

// Analytics middleware
const analyticsMiddleware = (store) => (next) => (action) => {
  if (action.type.includes('user/')) {
    analytics.track(action.type, action.payload);
  }
  return next(action);
};

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(loggerMiddleware, analyticsMiddleware),
});
\`\`\`

## 7. Derived State Pattern

Compute state from existing state:

\`\`\`typescript
// ❌ Bad: Duplicate state
interface State {
  todos: Todo[];
  completedTodos: Todo[];  // Redundant!
  activeTodos: Todo[];     // Redundant!
}

// ✅ Good: Compute derived state
interface State {
  todos: Todo[];
}

const selectCompletedTodos = createSelector(
  [selectTodos],
  (todos) => todos.filter(t => t.completed)
);

const selectActiveTodos = createSelector(
  [selectTodos],
  (todos) => todos.filter(t => !t.completed)
);
\`\`\`

## 8. Multi-Store Pattern (Zustand)

Separate stores by concern:

\`\`\`typescript
// Global stores
const useAuthStore = create(() => ({ user: null }));
const useThemeStore = create(() => ({ theme: 'light' }));

// Feature stores
const useTodoStore = create(() => ({ todos: [] }));
const useCartStore = create(() => ({ items: [] }));

// UI stores
const useModalStore = create(() => ({ isOpen: false }));
const useToastStore = create(() => ({ toasts: [] }));
\`\`\`

## Your Task

Implement a feature-complete user profile system with advanced patterns:

1. Create a Zustand store \`useProfileStore\` with:
   - State: profile (UserProfile | null), status, error
   - Actions: fetchProfile, updateProfile, clearProfile

2. Use proper TypeScript types:
   - \`UserProfile\`: id, name, email, bio
   - \`RequestStatus\`: 'idle' | 'loading' | 'succeeded' | 'failed'

3. Implement optimistic updates in \`updateProfile\`:
   - Update local state immediately
   - Simulate API call with setTimeout (1 second)
   - Revert if "error" is in the name (simulate error condition)

4. Create selector functions:
   - \`selectProfile\`: returns profile
   - \`selectIsLoading\`: returns true if status is 'loading'
   - \`selectHasError\`: returns true if error is not null

5. Export store and selectors
        `,
        hint: "Store the previous state before optimistic update so you can revert on error. Use set() to update state immediately, then async logic.",
        starterCode: `import { create } from 'zustand';

// Define types


// Create store


// Create selectors


export { useProfileStore, selectProfile, selectIsLoading, selectHasError };`,
        solution: `import { create } from 'zustand';

type RequestStatus = 'idle' | 'loading' | 'succeeded' | 'failed';

interface UserProfile {
  id: number;
  name: string;
  email: string;
  bio: string;
}

interface ProfileStore {
  profile: UserProfile | null;
  status: RequestStatus;
  error: string | null;
  fetchProfile: (id: number) => Promise<void>;
  updateProfile: (updates: Partial<UserProfile>) => Promise<void>;
  clearProfile: () => void;
}

const useProfileStore = create<ProfileStore>((set, get) => ({
  profile: null,
  status: 'idle',
  error: null,

  fetchProfile: async (id: number) => {
    set({ status: 'loading', error: null });

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      const profile: UserProfile = {
        id,
        name: 'John Doe',
        email: 'john@example.com',
        bio: 'Software Developer'
      };

      set({ profile, status: 'succeeded' });
    } catch (error) {
      set({ status: 'failed', error: 'Failed to fetch profile' });
    }
  },

  updateProfile: async (updates: Partial<UserProfile>) => {
    const previousProfile = get().profile;

    // Optimistic update
    set({
      profile: previousProfile ? { ...previousProfile, ...updates } : null,
      status: 'loading',
      error: null
    });

    try {
      // Simulate API call
      await new Promise((resolve, reject) =>
        setTimeout(() => {
          // Simulate error if "error" is in the name
          if (updates.name?.toLowerCase().includes('error')) {
            reject(new Error('Update failed'));
          } else {
            resolve(true);
          }
        }, 1000)
      );

      set({ status: 'succeeded' });
    } catch (error) {
      // Revert optimistic update
      set({
        profile: previousProfile,
        status: 'failed',
        error: 'Failed to update profile'
      });
    }
  },

  clearProfile: () => set({ profile: null, status: 'idle', error: null }),
}));

// Selectors
const selectProfile = (state: ProfileStore) => state.profile;
const selectIsLoading = (state: ProfileStore) => state.status === 'loading';
const selectHasError = (state: ProfileStore) => state.error !== null;

export { useProfileStore, selectProfile, selectIsLoading, selectHasError };`,
        testCases: [
          {
            id: "test-1",
            description: "Should define UserProfile and RequestStatus types",
            testFunction: `code.includes('UserProfile') && code.includes('RequestStatus')`,
          },
          {
            id: "test-2",
            description: "Store should have profile, status, and error state",
            testFunction: `code.includes('profile:') && code.includes('status:') && code.includes('error:')`,
          },
          {
            id: "test-3",
            description: "Store should have fetchProfile, updateProfile, and clearProfile methods",
            testFunction: `code.includes('fetchProfile:') && code.includes('updateProfile:') && code.includes('clearProfile:')`,
          },
          {
            id: "test-4",
            description: "updateProfile should implement optimistic updates",
            testFunction: `code.includes('previousProfile') || code.includes('previous')`,
          },
          {
            id: "test-5",
            description: "Should export selector functions",
            testFunction: `code.includes('selectProfile') && code.includes('selectIsLoading') && code.includes('selectHasError')`,
          },
          {
            id: "test-6",
            description: "updateProfile should revert on error",
            testFunction: `code.includes('catch') && code.includes('set({') && code.match(/set\([^)]*previous/i)`,
          },
        ],
        language: "typescript",
      },
    ],
  },

  // Lesson 12: When to Use What
  {
    id: "state-mgmt-12",
    moduleId: "module-3-1",
    title: "When to Use What",
    order: 12,
    xpReward: 300,
    difficulty: "advanced",
    steps: [
      {
        id: "state-mgmt-12-step-1",
        order: 1,
        instruction: `
# When to Use What

A comprehensive decision guide for choosing the right state management solution.

## Decision Tree

\`\`\`
Start
  │
  ├─ Is state only used in one component?
  │   └─ YES → useState ✅
  │
  ├─ Is state shared by 2-3 nearby components?
  │   └─ YES → Lift state up + props ✅
  │
  ├─ Is state shared across distant components?
  │   │
  │   ├─ Simple read-only data?
  │   │   └─ YES → Context API ✅
  │   │
  │   ├─ Small-to-medium app?
  │   │   └─ YES → Zustand ✅
  │   │
  │   └─ Large app with complex state?
  │       └─ YES → Redux Toolkit ✅
\`\`\`

## Scenario-Based Guide

### Scenario 1: Form State
\`\`\`tsx
// ✅ Use useState - local component state
function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // ...
}
\`\`\`

### Scenario 2: Theme Toggle
\`\`\`tsx
// ✅ Use Context API - simple global state
const ThemeContext = createContext<Theme>('light');

function App() {
  const [theme, setTheme] = useState<Theme>('light');
  return (
    <ThemeContext.Provider value={theme}>
      <Components />
    </ThemeContext.Provider>
  );
}
\`\`\`

### Scenario 3: Shopping Cart
\`\`\`tsx
// ✅ Use Zustand - moderate complexity
const useCartStore = create((set) => ({
  items: [],
  addItem: (item) => set((state) => ({
    items: [...state.items, item]
  })),
  removeItem: (id) => set((state) => ({
    items: state.items.filter(i => i.id !== id)
  })),
}));
\`\`\`

### Scenario 4: Enterprise Dashboard
\`\`\`tsx
// ✅ Use Redux Toolkit - complex data flow
const store = configureStore({
  reducer: {
    users: usersReducer,
    analytics: analyticsReducer,
    reports: reportsReducer,
    permissions: permissionsReducer,
    notifications: notificationsReducer,
    // ... 15+ more features
  },
});
\`\`\`

## State Classification

### Local State (useState)
**Use for:**
- Form inputs
- Toggle states
- UI animations
- Temporary data
- Component-specific state

**Example:**
\`\`\`tsx
function Modal({ isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState(0);
  return <Tabs active={activeTab} onChange={setActiveTab} />;
}
\`\`\`

### Lifted State (Props)
**Use for:**
- Parent-child communication
- Sibling component sharing
- Shallow component trees

**Example:**
\`\`\`tsx
function Parent() {
  const [filter, setFilter] = useState('all');
  return (
    <>
      <FilterBar filter={filter} onChange={setFilter} />
      <TodoList filter={filter} />
    </>
  );
}
\`\`\`

### Context (Context API)
**Use for:**
- Theme
- Locale/i18n
- Auth user (read-only)
- Feature flags
- Simple global config

**Example:**
\`\`\`tsx
const AuthContext = createContext<User | null>(null);

function App() {
  const [user] = useState<User | null>(null);
  return (
    <AuthContext.Provider value={user}>
      <Routes />
    </AuthContext.Provider>
  );
}
\`\`\`

### Zustand
**Use for:**
- Global UI state
- Shopping carts
- User preferences
- Notifications/toasts
- Modal management
- Small to medium apps

**Example:**
\`\`\`tsx
const useNotificationStore = create((set) => ({
  notifications: [],
  addNotification: (n) => set((state) => ({
    notifications: [...state.notifications, n]
  })),
}));
\`\`\`

### Redux Toolkit
**Use for:**
- Large enterprise apps
- Complex data relationships
- Multiple teams
- Need time-travel debugging
- Extensive middleware needs
- Data fetching with RTK Query

**Example:**
\`\`\`tsx
// Multiple interconnected features
const store = configureStore({
  reducer: {
    users: usersReducer,
    posts: postsReducer,
    comments: commentsReducer,
    likes: likesReducer,
    notifications: notificationsReducer,
  },
});
\`\`\`

## Performance Considerations

### useState/Context
- **Pros:** Built-in, no deps
- **Cons:** Context re-renders all consumers

### Zustand
- **Pros:** Selective subscriptions, minimal re-renders
- **Cons:** Extra dependency

### Redux
- **Pros:** Memoized selectors, DevTools
- **Cons:** More boilerplate, steeper learning curve

## Migration Strategy

### Start Simple, Scale Up
1. **Day 1:** useState for everything
2. **Week 1:** Lift state as needed
3. **Month 1:** Add Zustand for shared state
4. **Month 3:** Consider Redux if complexity grows

### Don't Over-Engineer
\`\`\`tsx
// ❌ Overkill: Redux for a simple todo app
// ✅ Perfect: useState or Zustand

// ❌ Overkill: Context API for enterprise app with 50+ features
// ✅ Perfect: Redux Toolkit

// ❌ Overkill: Zustand for a single toggle
// ✅ Perfect: useState
\`\`\`

## Team Considerations

### Junior Team
→ **Start with:** useState → Context → Zustand
→ **Avoid:** Redux until truly needed

### Experienced Team
→ **Start with:** Redux Toolkit from day 1 for large apps
→ **Use:** Zustand for smaller services

### Prototyping
→ **Use:** Zustand or useState
→ **Benefit:** Fast iteration, less boilerplate

## Real-World Examples

### Blog Platform (Small)
- **Auth:** Context API
- **Posts:** Zustand
- **UI State:** useState

### E-Commerce (Medium)
- **Products:** Zustand + API cache
- **Cart:** Zustand
- **User/Auth:** Zustand
- **UI:** useState

### SaaS Dashboard (Large)
- **Everything:** Redux Toolkit
- **API:** RTK Query
- **UI State:** Local useState where possible

## Your Task

Create a decision helper function that recommends state management solution:

1. Define type \`StateRequirements\` with:
   - \`componentScope: 'single' | 'nearby' | 'global'\`
   - \`complexity: 'simple' | 'moderate' | 'complex'\`
   - \`teamSize: 'small' | 'medium' | 'large'\`
   - \`appSize: 'small' | 'medium' | 'large'\`

2. Define type \`StateSolution\`:
   - \`solution: 'useState' | 'Context' | 'Zustand' | 'Redux'\`
   - \`reason: string\`

3. Create function \`recommendStateManagement\` that:
   - Accepts \`StateRequirements\`
   - Returns \`StateSolution\`
   - Uses logic:
     - Single component → useState
     - Nearby + simple → lift state / Context
     - Global + (simple or moderate) → Zustand
     - Global + complex → Redux
     - Large app + large team → Redux

4. Create test cases array \`testCases\` with 4 different scenarios

5. Export the function and types
        `,
        hint: "Use if/else logic based on requirements. Consider componentScope first, then complexity and app size. Provide clear reasons for each recommendation.",
        starterCode: `// Define types


// Create recommendation function


// Create test cases


export { StateRequirements, StateSolution, recommendStateManagement, testCases };`,
        solution: `type StateRequirements = {
  componentScope: 'single' | 'nearby' | 'global';
  complexity: 'simple' | 'moderate' | 'complex';
  teamSize: 'small' | 'medium' | 'large';
  appSize: 'small' | 'medium' | 'large';
};

type StateSolution = {
  solution: 'useState' | 'Context' | 'Zustand' | 'Redux';
  reason: string;
};

function recommendStateManagement(req: StateRequirements): StateSolution {
  // Single component - always useState
  if (req.componentScope === 'single') {
    return {
      solution: 'useState',
      reason: 'State is only used in one component, useState is perfect'
    };
  }

  // Nearby components with simple state
  if (req.componentScope === 'nearby' && req.complexity === 'simple') {
    return {
      solution: 'Context',
      reason: 'Simple state shared between nearby components, Context API is sufficient'
    };
  }

  // Large app + complex state + large team = Redux
  if (req.appSize === 'large' && req.complexity === 'complex' && req.teamSize === 'large') {
    return {
      solution: 'Redux',
      reason: 'Large enterprise app with complex state and big team needs Redux Toolkit'
    };
  }

  // Global state with complex requirements
  if (req.componentScope === 'global' && req.complexity === 'complex') {
    return {
      solution: 'Redux',
      reason: 'Complex global state management requires Redux Toolkit'
    };
  }

  // Global state with simple/moderate complexity
  if (req.componentScope === 'global') {
    return {
      solution: 'Zustand',
      reason: 'Global state with moderate complexity is perfect for Zustand'
    };
  }

  // Default fallback
  return {
    solution: 'Zustand',
    reason: 'General purpose solution with minimal boilerplate'
  };
}

const testCases = [
  {
    input: { componentScope: 'single', complexity: 'simple', teamSize: 'small', appSize: 'small' } as StateRequirements,
    expected: 'useState'
  },
  {
    input: { componentScope: 'nearby', complexity: 'simple', teamSize: 'small', appSize: 'medium' } as StateRequirements,
    expected: 'Context'
  },
  {
    input: { componentScope: 'global', complexity: 'moderate', teamSize: 'medium', appSize: 'medium' } as StateRequirements,
    expected: 'Zustand'
  },
  {
    input: { componentScope: 'global', complexity: 'complex', teamSize: 'large', appSize: 'large' } as StateRequirements,
    expected: 'Redux'
  }
];

export { StateRequirements, StateSolution, recommendStateManagement, testCases };`,
        testCases: [
          {
            id: "test-1",
            description: "Should define StateRequirements type",
            testFunction: `code.includes('type StateRequirements') || code.includes('interface StateRequirements')`,
          },
          {
            id: "test-2",
            description: "Should define StateSolution type",
            testFunction: `code.includes('type StateSolution') || code.includes('interface StateSolution')`,
          },
          {
            id: "test-3",
            description: "Function should recommend useState for single component",
            testFunction: `
              const result = recommendStateManagement({
                componentScope: 'single',
                complexity: 'simple',
                teamSize: 'small',
                appSize: 'small'
              });
              result.solution === 'useState'
            `,
          },
          {
            id: "test-4",
            description: "Function should recommend Redux for large complex apps",
            testFunction: `
              const result = recommendStateManagement({
                componentScope: 'global',
                complexity: 'complex',
                teamSize: 'large',
                appSize: 'large'
              });
              result.solution === 'Redux'
            `,
          },
          {
            id: "test-5",
            description: "Function should recommend Zustand for moderate global state",
            testFunction: `
              const result = recommendStateManagement({
                componentScope: 'global',
                complexity: 'moderate',
                teamSize: 'medium',
                appSize: 'medium'
              });
              result.solution === 'Zustand'
            `,
          },
          {
            id: "test-6",
            description: "Should export testCases array with 4 scenarios",
            testFunction: `Array.isArray(testCases) && testCases.length === 4`,
          },
        ],
        language: "typescript",
      },
    ],
  },
];
