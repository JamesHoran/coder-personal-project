# PRP: Fix Index Key Anti-Patterns in React Course

**Priority:** CRITICAL (Priority 1)
**Estimated Time:** 6 hours
**Agent:** code-validator + course-content-creator
**Audit Finding:** Issue #17 - Teaching anti-pattern with index keys

---

## Context

Multiple lessons use `key={index}` which is an anti-pattern that causes mysterious state bugs in production. Students will copy this pattern and ship buggy code.

**Files Affected:**
- `/src/data/courses/react-course-interactive/phase-1/module-1-1-react-fundamentals.ts` (Line 1010)
- `/src/data/courses/react-course-interactive/phase-1/module-1-2-state-basics.ts` (Line 754)
- `/src/data/courses/react-course-interactive/phase-1/module-1-5-lists-and-keys.ts` (if exists)

---

## Requirements

### Functional Requirements

1. **Replace ALL index keys with stable IDs**
   - Use object IDs where available
   - Generate stable keys from content
   - Add ID field to example data

2. **Add Lesson Explaining Key Problems**
   - Show the bug that happens with index keys
   - Demonstrate correct patterns
   - Explain when index IS okay

3. **Update Existing List Lessons**
   - Fix all code examples
   - Add warnings about index keys
   - Show real-world impact

### Technical Requirements

- Don't break existing lesson structure
- Maintain test compatibility
- Add interactive demonstration of the bug
- Keep beginner-friendly

---

## Implementation Plan

### Step 1: Replace Index Keys in All Examples (2 hours)

#### File 1: `module-1-1-react-fundamentals.ts` Line 1010

**Before (WRONG):**
```jsx
const fruits = ['Apple', 'Banana', 'Orange'];

return (
  <ul>
    {fruits.map((fruit, index) => (
      <li key={index}>{fruit}</li>  // ❌ Anti-pattern
    ))}
  </ul>
);
```

**After (CORRECT):**
```jsx
const fruits = [
  { id: 1, name: 'Apple' },
  { id: 2, name: 'Banana' },
  { id: 3, name: 'Orange' }
];

return (
  <ul>
    {fruits.map((fruit) => (
      <li key={fruit.id}>{fruit.name}</li>  // ✅ Stable ID
    ))}
  </ul>
);
```

#### File 2: `module-1-2-state-basics.ts` Line 754

**Before (WRONG):**
```jsx
<li key={index}>{tag}</li>
```

**After (CORRECT):**
```jsx
// Update tags to be objects with IDs
const [tags, setTags] = useState([
  { id: 1, name: 'React' },
  { id: 2, name: 'JavaScript' }
]);

// Render with stable keys
<li key={tag.id}>{tag.name}</li>
```

### Step 2: Add New Lesson - "Why Keys Matter" (3 hours)

Insert in Module 1.5 (Lists and Keys):

```typescript
{
  order: 2,
  title: "The Problem with Index Keys",
  description: "Learn why using array index as key causes bugs",
  concepts: ["Keys", "React reconciliation", "State preservation"],
  difficulty: "intermediate" as const,
  estimatedTime: 12,
  xp: 150,

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
```
// Before delete:
<li key={0}>Buy milk</li>        // checkbox unchecked
<li key={1}>Walk dog</li>        // checkbox CHECKED ✓
<li key={2}>Write code</li>      // checkbox unchecked

// After deleting index 0:
<li key={0}>Walk dog</li>        // checkbox unchecked (WRONG!)
<li key={1}>Write code</li>      // checkbox CHECKED ✓ (WRONG!)
```

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

  starterCode: `
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

export default ShoppingList;
  `,

  solution: `
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

export default ShoppingList;
  `,

  testFunction: `
    // Check items are objects with id
    const hasObjectItems = code.match(/\\{\\s*id:\\s*\\d+/);
    // Check key uses item.id
    const hasIdKey = code.match(/key=\\{item\\.id\\}/);
    // Check filter uses ID
    const hasIdFilter = code.match(/filter\\s*\\(\\s*item\\s*=>\\s*item\\.id\\s*!==\\s*id/);

    return hasObjectItems && hasIdKey && hasIdFilter;
  `,

  hints: [
    "Change items to an array of objects: [{ id: 1, name: 'Apples' }, ...]",
    "Use item.id as the key prop",
    "Update deleteItem to take an id parameter",
    "Use items.filter(item => item.id !== id)"
  ]
}
```

### Step 3: Add Warning to Existing Lessons (1 hour)

Update any lesson that shows lists to include:

```markdown
⚠️ **Important:** Never use array index as key when items can be reordered, deleted, or filtered. Use stable unique IDs instead. We'll learn why in the "Lists and Keys" module.
```

Add this warning to:
- Module 1.1, Lesson 9 (Rendering Lists)
- Module 1.2, any list rendering lessons
- Module 1.4, any conditional rendering with lists

---

## Examples

### Example 1: Todo List Bug

```jsx
// ❌ WRONG - State gets confused
{todos.map((todo, i) => <Todo key={i} todo={todo} />)}

// ✅ CORRECT - State follows the item
{todos.map(todo => <Todo key={todo.id} todo={todo} />)}
```

### Example 2: When Index IS Okay

```jsx
// ✅ OK - Static list, never changes
const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
{DAYS.map((day, i) => <span key={i}>{day}</span>)}

// ✅ OK - No state tied to items
{colors.map((color, i) => <div key={i} style={{background: color}} />)}
```

### Example 3: Generating Stable Keys

```jsx
// When you don't have IDs
const items = ['Apple', 'Banana', 'Orange'];

// Generate stable keys from content
{items.map(item => (
  <li key={`fruit-${item}`}>{item}</li>  // ✅ Stable if items are unique
))}

// Or use a library
import { nanoid } from 'nanoid';
const items = ['Apple', 'Banana'].map(name => ({
  id: nanoid(),
  name
}));
```

---

## Validation Checklist

- [ ] All index keys replaced with stable IDs
- [ ] New lesson explains the bug clearly
- [ ] Interactive exercise demonstrates the problem
- [ ] Warning added to relevant lessons
- [ ] All code examples use correct patterns
- [ ] Test cases verify stable keys
- [ ] Examples show when index IS okay

---

## Success Criteria

1. **ZERO index keys in list rendering**
2. **Students understand WHY index is wrong**
3. **Interactive demo shows the bug**
4. **Clear guidance on when index is acceptable**
5. **All tests verify correct key usage**

---

## Files to Modify

```
src/data/courses/react-course-interactive/
├── phase-1/
│   ├── module-1-1-react-fundamentals.ts
│   │   └── Line 1010 - Replace index key with stable ID
│   ├── module-1-2-state-basics.ts
│   │   └── Line 754 - Replace index key with stable ID
│   └── module-1-5-lists-and-keys.ts
│       └── Add new Lesson 2: "The Problem with Index Keys"
```

---

**This PRP is ready for execution by code-validator and course-content-creator agents.**
