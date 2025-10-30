/**
 * React Course - Phase 1: Novice Foundations
 * Module 1.3: Event Handling (10 lessons)
 *
 * This module teaches how to handle user interactions and form inputs
 * in React, including event handlers, controlled components, and forms.
 */

import { InteractiveLesson } from "@/types";

export const eventHandlingLessons: InteractiveLesson[] = [
  // Lesson 1: onClick Events
  {
    id: "react-events-01",
    moduleId: "module-1-3",
    title: "Understanding onClick Events",
    order: 1,
    xpReward: 50,
    difficulty: "beginner",
    steps: [
      {
        id: "react-events-01-step-1",
        order: 1,
        instruction: `
# Understanding onClick Events

In React, you handle user interactions through **events**. The most common event is \`onClick\`, which fires when a user clicks an element.

\`\`\`jsx
function Button() {
  const handleClick = () => {
    console.log('Button was clicked!');
  };

  return <button onClick={handleClick}>Click me</button>;
}
\`\`\`

**Important Rules:**
- Use camelCase: \`onClick\` (not \`onclick\`)
- Pass a function reference: \`onClick={handleClick}\` not \`onClick={handleClick()}\`
- Event handlers are functions that run when the event occurs

## Your Task

Create a component named \`AlertButton\` that:
1. Has a function \`showAlert\` that displays an alert with the message "Hello from React!"
2. Returns a \`<button>\` with the text "Show Alert"
3. Calls \`showAlert\` when the button is clicked
        `,
        hint: "Create a function and pass it to the onClick prop without parentheses: onClick={showAlert}",
        starterCode: `import React from 'react';

function AlertButton() {
  // Create your showAlert function here


  return (
    // Add your button here
  );
}

export default AlertButton;`,
        solution: `import React from 'react';

function AlertButton() {
  const showAlert = () => {
    alert('Hello from React!');
  };

  return (
    <button onClick={showAlert}>Show Alert</button>
  );
}

export default AlertButton;`,
        testCases: [
          {
            id: "test-1",
            description: "The component should define a showAlert function",
            testFunction: `code.includes('showAlert') && (code.includes('function showAlert') || code.includes('const showAlert'))`,
          },
          {
            id: "test-2",
            description: "The button should have text 'Show Alert'",
            testFunction: `
              const { getByText } = render(<AlertButton />);
              const button = getByText('Show Alert');
              button !== null && button.tagName === 'BUTTON'
            `,
          },
          {
            id: "test-3",
            description: "The button should have an onClick handler",
            testFunction: `code.includes('onClick={showAlert}')`,
          },
          {
            id: "test-4",
            description: "The showAlert function should call alert()",
            testFunction: `code.includes('alert') && code.includes('Hello from React!')`,
          },
        ],
        language: "jsx",
      },
    ],
  },

  // Lesson 2: Event Handlers
  {
    id: "react-events-02",
    moduleId: "module-1-3",
    title: "Creating Event Handler Functions",
    order: 2,
    xpReward: 75,
    difficulty: "beginner",
    steps: [
      {
        id: "react-events-02-step-1",
        order: 1,
        instruction: `
# Creating Event Handler Functions

Event handlers are functions that respond to user actions. You can define them inside your component and handle different types of events.

\`\`\`jsx
function InteractiveDiv() {
  const handleClick = () => {
    console.log('Div clicked');
  };

  const handleMouseEnter = () => {
    console.log('Mouse entered');
  };

  return (
    <div
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
    >
      Hover or click me!
    </div>
  );
}
\`\`\`

**Common Event Handlers:**
- \`onClick\` - Element is clicked
- \`onMouseEnter\` - Mouse enters element
- \`onMouseLeave\` - Mouse leaves element
- \`onChange\` - Input value changes
- \`onSubmit\` - Form is submitted

## Your Task

Create a component named \`HoverButton\` that:
1. Creates a \`handleHover\` function that logs "Hovered!" to the console
2. Creates a \`handleClick\` function that logs "Clicked!" to the console
3. Returns a \`<button>\` with text "Hover and Click Me"
4. Calls \`handleHover\` on mouse enter (\`onMouseEnter\`)
5. Calls \`handleClick\` when clicked (\`onClick\`)
        `,
        hint: "You can add multiple event handlers to the same element. Use onMouseEnter and onClick props.",
        starterCode: `import React from 'react';

function HoverButton() {
  // Create your event handler functions here



  return (
    // Add your button with event handlers
  );
}

export default HoverButton;`,
        solution: `import React from 'react';

function HoverButton() {
  const handleHover = () => {
    console.log('Hovered!');
  };

  const handleClick = () => {
    console.log('Clicked!');
  };

  return (
    <button onMouseEnter={handleHover} onClick={handleClick}>
      Hover and Click Me
    </button>
  );
}

export default HoverButton;`,
        testCases: [
          {
            id: "test-1",
            description: "Should define handleHover function",
            testFunction: `code.includes('handleHover') && code.includes('console.log') && code.includes('Hovered!')`,
          },
          {
            id: "test-2",
            description: "Should define handleClick function",
            testFunction: `code.includes('handleClick') && code.includes('console.log') && code.includes('Clicked!')`,
          },
          {
            id: "test-3",
            description: "Button should have text 'Hover and Click Me'",
            testFunction: `
              const { getByText } = render(<HoverButton />);
              getByText('Hover and Click Me') !== null
            `,
          },
          {
            id: "test-4",
            description: "Button should have onMouseEnter handler",
            testFunction: `code.includes('onMouseEnter={handleHover}')`,
          },
          {
            id: "test-5",
            description: "Button should have onClick handler",
            testFunction: `code.includes('onClick={handleClick}')`,
          },
        ],
        language: "jsx",
      },
    ],
  },

  // Lesson 3: Passing Arguments to Handlers
  {
    id: "react-events-03",
    moduleId: "module-1-3",
    title: "Passing Arguments to Event Handlers",
    order: 3,
    xpReward: 100,
    difficulty: "beginner",
    steps: [
      {
        id: "react-events-03-step-1",
        order: 1,
        instruction: `
# Passing Arguments to Event Handlers

Sometimes you need to pass additional information to your event handlers. You can do this using arrow functions.

\`\`\`jsx
function Greeter() {
  const greet = (name) => {
    alert(\`Hello, \${name}!\`);
  };

  return (
    <div>
      <button onClick={() => greet('Alice')}>Greet Alice</button>
      <button onClick={() => greet('Bob')}>Greet Bob</button>
    </div>
  );
}
\`\`\`

**Two ways to pass arguments:**

1. **Inline arrow function** (shown above):
   \`onClick={() => handleClick(arg)}\`

2. **Return a function**:
   \`\`\`jsx
   const handleClick = (arg) => () => {
     console.log(arg);
   };
   \`\`\`

## Your Task

Create a component named \`ColorButtons\` that:
1. Creates a \`changeColor\` function that accepts a \`color\` parameter
2. The function should log "Changed to: {color}" to the console
3. Returns a \`<div>\` with className "color-buttons"
4. Contains three buttons:
   - Button with text "Red" that calls changeColor with "red"
   - Button with text "Green" that calls changeColor with "green"
   - Button with text "Blue" that calls changeColor with "blue"
        `,
        hint: "Use arrow functions in onClick: onClick={() => changeColor('red')}",
        starterCode: `import React from 'react';

function ColorButtons() {
  const changeColor = (color) => {
    // Log the color here
  };

  return (
    <div className="color-buttons">
      {/* Add three buttons here */}
    </div>
  );
}

export default ColorButtons;`,
        solution: `import React from 'react';

function ColorButtons() {
  const changeColor = (color) => {
    console.log(\`Changed to: \${color}\`);
  };

  return (
    <div className="color-buttons">
      <button onClick={() => changeColor('red')}>Red</button>
      <button onClick={() => changeColor('green')}>Green</button>
      <button onClick={() => changeColor('blue')}>Blue</button>
    </div>
  );
}

export default ColorButtons;`,
        testCases: [
          {
            id: "test-1",
            description: "Should define changeColor function with a parameter",
            testFunction: `code.includes('changeColor') && code.includes('(color)') && code.includes('console.log')`,
          },
          {
            id: "test-2",
            description: "Should render a div with className 'color-buttons'",
            testFunction: `
              const { container } = render(<ColorButtons />);
              container.querySelector('div.color-buttons') !== null
            `,
          },
          {
            id: "test-3",
            description: "Should render three buttons",
            testFunction: `
              const { container } = render(<ColorButtons />);
              container.querySelectorAll('button').length === 3
            `,
          },
          {
            id: "test-4",
            description: "Should have buttons with text 'Red', 'Green', 'Blue'",
            testFunction: `
              const { getByText } = render(<ColorButtons />);
              getByText('Red') !== null && getByText('Green') !== null && getByText('Blue') !== null
            `,
          },
          {
            id: "test-5",
            description: "Should pass arguments using arrow functions",
            testFunction: `code.includes("() => changeColor('red')") || code.includes('() => changeColor("red")')`,
          },
          {
            id: "test-6",
            description: "Should log messages with template literals",
            testFunction: `code.includes('Changed to:') && code.includes('\${color}')`,
          },
        ],
        language: "jsx",
      },
    ],
  },

  // Lesson 4: Form Inputs
  {
    id: "react-events-04",
    moduleId: "module-1-3",
    title: "Working with Form Inputs",
    order: 4,
    xpReward: 100,
    difficulty: "beginner",
    steps: [
      {
        id: "react-events-04-step-1",
        order: 1,
        instruction: `
# Working with Form Inputs

Form inputs in React can be "uncontrolled" or "controlled". Let's start by understanding how to read input values using the event object.

\`\`\`jsx
function NameInput() {
  const handleChange = (event) => {
    console.log(event.target.value);
  };

  return (
    <input
      type="text"
      onChange={handleChange}
      placeholder="Enter your name"
    />
  );
}
\`\`\`

**The Event Object:**
- Every event handler receives an \`event\` parameter
- \`event.target\` is the element that triggered the event
- \`event.target.value\` is the current value of an input

## Your Task

Create a component named \`SearchBox\` that:
1. Creates a \`handleSearch\` function that accepts an \`event\` parameter
2. The function logs "Searching for: {value}" where value is the input's current value
3. Returns a \`<div>\` with className "search-box"
4. Contains an \`<input>\` with:
   - type="text"
   - placeholder="Search..."
   - onChange handler that calls handleSearch
        `,
        hint: "Access the input value with event.target.value. Use onChange to detect when the input changes.",
        starterCode: `import React from 'react';

function SearchBox() {
  const handleSearch = (event) => {
    // Log the search value here
  };

  return (
    <div className="search-box">
      {/* Add your input here */}
    </div>
  );
}

export default SearchBox;`,
        solution: `import React from 'react';

function SearchBox() {
  const handleSearch = (event) => {
    console.log(\`Searching for: \${event.target.value}\`);
  };

  return (
    <div className="search-box">
      <input
        type="text"
        placeholder="Search..."
        onChange={handleSearch}
      />
    </div>
  );
}

export default SearchBox;`,
        testCases: [
          {
            id: "test-1",
            description: "Should define handleSearch function with event parameter",
            testFunction: `code.includes('handleSearch') && code.includes('(event)') && code.includes('event.target.value')`,
          },
          {
            id: "test-2",
            description: "Should render a div with className 'search-box'",
            testFunction: `
              const { container } = render(<SearchBox />);
              container.querySelector('div.search-box') !== null
            `,
          },
          {
            id: "test-3",
            description: "Should render an input with type='text'",
            testFunction: `
              const { container } = render(<SearchBox />);
              const input = container.querySelector('input[type="text"]');
              input !== null
            `,
          },
          {
            id: "test-4",
            description: "Input should have placeholder 'Search...'",
            testFunction: `
              const { container } = render(<SearchBox />);
              const input = container.querySelector('input');
              input.placeholder === 'Search...'
            `,
          },
          {
            id: "test-5",
            description: "Input should have onChange handler",
            testFunction: `code.includes('onChange={handleSearch}')`,
          },
        ],
        language: "jsx",
      },
    ],
  },

  // Lesson 5: Controlled Components
  {
    id: "react-events-05",
    moduleId: "module-1-3",
    title: "Creating Controlled Components",
    order: 5,
    xpReward: 125,
    difficulty: "beginner",
    steps: [
      {
        id: "react-events-05-step-1",
        order: 1,
        instruction: `
# Creating Controlled Components

A **controlled component** is an input whose value is controlled by React state. This gives you full control over the input's value and behavior.

\`\`\`jsx
import { useState } from 'react';

function ControlledInput() {
  const [text, setText] = useState('');

  const handleChange = (event) => {
    setText(event.target.value);
  };

  return (
    <div>
      <input
        type="text"
        value={text}
        onChange={handleChange}
      />
      <p>You typed: {text}</p>
    </div>
  );
}
\`\`\`

**Key Points:**
- The input's \`value\` is set to state variable
- The \`onChange\` handler updates the state
- This makes React the "single source of truth" for the input value

## Your Task

Create a component named \`NameForm\` that uses a controlled input:
1. Import and use \`useState\` from 'react'
2. Create a state variable \`name\` initialized to an empty string
3. Create a \`handleChange\` function that updates the name state
4. Return a \`<div>\` with className "name-form"
5. Include an \`<input>\` with type="text", value={name}, and onChange handler
6. Include a \`<p>\` that displays "Hello, {name}!" (or "Hello, !" if empty)
        `,
        hint: "Import useState: import { useState } from 'react'. Use const [name, setName] = useState(''). Set the input's value prop to the state variable.",
        starterCode: `import React from 'react';
// Import useState here

function NameForm() {
  // Create state variable here


  // Create handleChange function here


  return (
    <div className="name-form">
      {/* Add input and paragraph here */}
    </div>
  );
}

export default NameForm;`,
        solution: `import React, { useState } from 'react';

function NameForm() {
  const [name, setName] = useState('');

  const handleChange = (event) => {
    setName(event.target.value);
  };

  return (
    <div className="name-form">
      <input
        type="text"
        value={name}
        onChange={handleChange}
      />
      <p>Hello, {name}!</p>
    </div>
  );
}

export default NameForm;`,
        testCases: [
          {
            id: "test-1",
            description: "Should import useState from react",
            testFunction: `code.includes('useState') && code.includes("from 'react'")`,
          },
          {
            id: "test-2",
            description: "Should initialize name state with empty string",
            testFunction: `code.includes('useState') && code.includes("('')")`,
          },
          {
            id: "test-3",
            description: "Should render a controlled input",
            testFunction: `
              const { container } = render(<NameForm />);
              const input = container.querySelector('input[type="text"]');
              input !== null && input.value === ''
            `,
          },
          {
            id: "test-4",
            description: "Input should have value prop set to state",
            testFunction: `code.includes('value={name}')`,
          },
          {
            id: "test-5",
            description: "Should display greeting with name",
            testFunction: `
              const { container } = render(<NameForm />);
              const p = container.querySelector('p');
              p !== null && p.textContent.includes('Hello')
            `,
          },
          {
            id: "test-6",
            description: "Should update state in onChange handler",
            testFunction: `code.includes('setName(event.target.value)')`,
          },
        ],
        language: "jsx",
      },
    ],
  },

  // Lesson 6: Form Submission
  {
    id: "react-events-06",
    moduleId: "module-1-3",
    title: "Handling Form Submission",
    order: 6,
    xpReward: 125,
    difficulty: "beginner",
    steps: [
      {
        id: "react-events-06-step-1",
        order: 1,
        instruction: `
# Handling Form Submission

When working with forms, you need to prevent the default browser behavior and handle submission yourself using the \`onSubmit\` event.

\`\`\`jsx
import { useState } from 'react';

function LoginForm() {
  const [username, setUsername] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent page reload
    console.log('Submitted:', username);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <button type="submit">Login</button>
    </form>
  );
}
\`\`\`

**Important:**
- Always call \`event.preventDefault()\` to stop the page from reloading
- Use \`onSubmit\` on the \`<form>\`, not onClick on the button
- The submit button should have \`type="submit"\`

## Your Task

Create a component named \`EmailForm\` that handles form submission:
1. Import and use \`useState\`
2. Create state variable \`email\` initialized to empty string
3. Create \`handleSubmit\` function that:
   - Prevents default behavior
   - Logs "Email submitted: {email}"
4. Create \`handleChange\` function that updates email state
5. Return a \`<form>\` with onSubmit handler
6. Include an \`<input>\` with type="email", value, and onChange
7. Include a \`<button>\` with type="submit" and text "Submit"
        `,
        hint: "Use event.preventDefault() as the first line in handleSubmit. The form needs onSubmit={handleSubmit}, not the button.",
        starterCode: `import React, { useState } from 'react';

function EmailForm() {
  // Create state here


  // Create handleChange function here


  // Create handleSubmit function here


  return (
    // Add form here
  );
}

export default EmailForm;`,
        solution: `import React, { useState } from 'react';

function EmailForm() {
  const [email, setEmail] = useState('');

  const handleChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(\`Email submitted: \${email}\`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}
        onChange={handleChange}
      />
      <button type="submit">Submit</button>
    </form>
  );
}

export default EmailForm;`,
        testCases: [
          {
            id: "test-1",
            description: "Should use useState to create email state",
            testFunction: `code.includes('useState') && code.includes('email')`,
          },
          {
            id: "test-2",
            description: "Should define handleSubmit with event.preventDefault()",
            testFunction: `code.includes('handleSubmit') && code.includes('event.preventDefault()')`,
          },
          {
            id: "test-3",
            description: "Should render a form element",
            testFunction: `
              const { container } = render(<EmailForm />);
              container.querySelector('form') !== null
            `,
          },
          {
            id: "test-4",
            description: "Form should have onSubmit handler",
            testFunction: `code.includes('onSubmit={handleSubmit}')`,
          },
          {
            id: "test-5",
            description: "Should render email input with controlled value",
            testFunction: `
              const { container } = render(<EmailForm />);
              const input = container.querySelector('input[type="email"]');
              input !== null && code.includes('value={email}')
            `,
          },
          {
            id: "test-6",
            description: "Should render submit button",
            testFunction: `
              const { container } = render(<EmailForm />);
              const button = container.querySelector('button[type="submit"]');
              button !== null && button.textContent === 'Submit'
            `,
          },
        ],
        language: "jsx",
      },
    ],
  },

  // Lesson 7: Multiple Inputs
  {
    id: "react-events-07",
    moduleId: "module-1-3",
    title: "Managing Multiple Input Fields",
    order: 7,
    xpReward: 150,
    difficulty: "beginner",
    steps: [
      {
        id: "react-events-07-step-1",
        order: 1,
        instruction: `
# Managing Multiple Input Fields

When you have multiple inputs, you can use a single state object and one handler function by using the input's \`name\` attribute.

\`\`\`jsx
import { useState } from 'react';

function RegistrationForm() {
  const [formData, setFormData] = useState({
    username: '',
    email: ''
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  return (
    <form>
      <input
        name="username"
        value={formData.username}
        onChange={handleChange}
      />
      <input
        name="email"
        value={formData.email}
        onChange={handleChange}
      />
    </form>
  );
}
\`\`\`

**Key Concepts:**
- Use an object for state: \`{ field1: '', field2: '' }\`
- Spread existing state: \`...formData\`
- Use computed property: \`[name]: value\`

## Your Task

Create a component named \`ContactForm\` with multiple inputs:
1. Import and use \`useState\`
2. Create state \`formData\` with properties: \`firstName\`, \`lastName\`, \`phone\` (all empty strings)
3. Create \`handleChange\` function that updates the appropriate field
4. Return a \`<div>\` with className "contact-form"
5. Include three inputs with type="text", each with:
   - name attribute matching state property
   - value from formData
   - onChange handler
   - placeholder: "First Name", "Last Name", "Phone Number"
6. Include a \`<p>\` displaying: "Full Name: {firstName} {lastName}"
        `,
        hint: "Use object destructuring: const { name, value } = event.target. Use spread operator to copy state: {...formData, [name]: value}",
        starterCode: `import React, { useState } from 'react';

function ContactForm() {
  const [formData, setFormData] = useState({
    // Initialize state here
  });

  const handleChange = (event) => {
    // Update state here
  };

  return (
    <div className="contact-form">
      {/* Add inputs and paragraph here */}
    </div>
  );
}

export default ContactForm;`,
        solution: `import React, { useState } from 'react';

function ContactForm() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: ''
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  return (
    <div className="contact-form">
      <input
        type="text"
        name="firstName"
        value={formData.firstName}
        onChange={handleChange}
        placeholder="First Name"
      />
      <input
        type="text"
        name="lastName"
        value={formData.lastName}
        onChange={handleChange}
        placeholder="Last Name"
      />
      <input
        type="text"
        name="phone"
        value={formData.phone}
        onChange={handleChange}
        placeholder="Phone Number"
      />
      <p>Full Name: {formData.firstName} {formData.lastName}</p>
    </div>
  );
}

export default ContactForm;`,
        testCases: [
          {
            id: "test-1",
            description: "Should initialize formData state with three properties",
            testFunction: `code.includes('firstName') && code.includes('lastName') && code.includes('phone')`,
          },
          {
            id: "test-2",
            description: "Should use object destructuring in handleChange",
            testFunction: `code.includes('const { name, value } = event.target')`,
          },
          {
            id: "test-3",
            description: "Should spread formData when updating state",
            testFunction: `code.includes('...formData') && code.includes('[name]: value')`,
          },
          {
            id: "test-4",
            description: "Should render three text inputs",
            testFunction: `
              const { container } = render(<ContactForm />);
              container.querySelectorAll('input[type="text"]').length === 3
            `,
          },
          {
            id: "test-5",
            description: "Inputs should have correct name attributes",
            testFunction: `
              const { container } = render(<ContactForm />);
              const inputs = container.querySelectorAll('input');
              Array.from(inputs).some(input => input.name === 'firstName') &&
              Array.from(inputs).some(input => input.name === 'lastName') &&
              Array.from(inputs).some(input => input.name === 'phone')
            `,
          },
          {
            id: "test-6",
            description: "Should display full name in paragraph",
            testFunction: `
              const { container } = render(<ContactForm />);
              const p = container.querySelector('p');
              p !== null && p.textContent.includes('Full Name:')
            `,
          },
        ],
        language: "jsx",
      },
    ],
  },

  // Lesson 8: Checkboxes
  {
    id: "react-events-08",
    moduleId: "module-1-3",
    title: "Working with Checkboxes",
    order: 8,
    xpReward: 125,
    difficulty: "beginner",
    steps: [
      {
        id: "react-events-08-step-1",
        order: 1,
        instruction: `
# Working with Checkboxes

Checkboxes in React work differently from text inputs. They use the \`checked\` prop instead of \`value\`, and you access \`event.target.checked\` instead of \`event.target.value\`.

\`\`\`jsx
import { useState } from 'react';

function Newsletter() {
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleChange = (event) => {
    setIsSubscribed(event.target.checked);
  };

  return (
    <label>
      <input
        type="checkbox"
        checked={isSubscribed}
        onChange={handleChange}
      />
      Subscribe to newsletter
    </label>
  );
}
\`\`\`

**Key Points:**
- Use \`checked\` prop (not \`value\`)
- Access \`event.target.checked\` (returns true/false)
- Wrap input and text in \`<label>\` for better UX

## Your Task

Create a component named \`TermsAgreement\` that uses a checkbox:
1. Import and use \`useState\`
2. Create state variable \`agreed\` initialized to \`false\`
3. Create \`handleCheckboxChange\` function that updates agreed state
4. Return a \`<div>\` with className "terms-agreement"
5. Include a \`<label>\`:
   - Contains checkbox input with type="checkbox", checked prop, and onChange
   - Text: "I agree to the terms and conditions"
6. Include a \`<p>\` that displays:
   - "Status: Agreed" if agreed is true
   - "Status: Not Agreed" if agreed is false
        `,
        hint: "Use checked={agreed} and onChange={handleCheckboxChange}. Access event.target.checked in the handler. Use a ternary operator for conditional text.",
        starterCode: `import React, { useState } from 'react';

function TermsAgreement() {
  // Create state here


  // Create handleCheckboxChange here


  return (
    <div className="terms-agreement">
      {/* Add label with checkbox here */}
      {/* Add status paragraph here */}
    </div>
  );
}

export default TermsAgreement;`,
        solution: `import React, { useState } from 'react';

function TermsAgreement() {
  const [agreed, setAgreed] = useState(false);

  const handleCheckboxChange = (event) => {
    setAgreed(event.target.checked);
  };

  return (
    <div className="terms-agreement">
      <label>
        <input
          type="checkbox"
          checked={agreed}
          onChange={handleCheckboxChange}
        />
        I agree to the terms and conditions
      </label>
      <p>Status: {agreed ? 'Agreed' : 'Not Agreed'}</p>
    </div>
  );
}

export default TermsAgreement;`,
        testCases: [
          {
            id: "test-1",
            description: "Should initialize agreed state to false",
            testFunction: `code.includes('useState(false)')`,
          },
          {
            id: "test-2",
            description: "Should access event.target.checked in handler",
            testFunction: `code.includes('event.target.checked')`,
          },
          {
            id: "test-3",
            description: "Should render checkbox input with checked prop",
            testFunction: `
              const { container } = render(<TermsAgreement />);
              const checkbox = container.querySelector('input[type="checkbox"]');
              checkbox !== null && code.includes('checked={agreed}')
            `,
          },
          {
            id: "test-4",
            description: "Checkbox should be wrapped in label with text",
            testFunction: `
              const { container } = render(<TermsAgreement />);
              const label = container.querySelector('label');
              label !== null && label.textContent.includes('terms and conditions')
            `,
          },
          {
            id: "test-5",
            description: "Should display status based on agreed state",
            testFunction: `
              const { container } = render(<TermsAgreement />);
              const p = container.querySelector('p');
              p !== null && p.textContent.includes('Status:')
            `,
          },
          {
            id: "test-6",
            description: "Should use ternary operator for conditional text",
            testFunction: `code.includes('?') && code.includes('Agreed') && code.includes('Not Agreed')`,
          },
        ],
        language: "jsx",
      },
    ],
  },

  // Lesson 9: Radio Buttons
  {
    id: "react-events-09",
    moduleId: "module-1-3",
    title: "Implementing Radio Buttons",
    order: 9,
    xpReward: 125,
    difficulty: "beginner",
    steps: [
      {
        id: "react-events-09-step-1",
        order: 1,
        instruction: `
# Implementing Radio Buttons

Radio buttons let users select one option from a group. All radio buttons in a group share the same \`name\` attribute, and each has a unique \`value\`.

\`\`\`jsx
import { useState } from 'react';

function SizeSelector() {
  const [size, setSize] = useState('medium');

  const handleChange = (event) => {
    setSize(event.target.value);
  };

  return (
    <div>
      <label>
        <input
          type="radio"
          name="size"
          value="small"
          checked={size === 'small'}
          onChange={handleChange}
        />
        Small
      </label>
      <label>
        <input
          type="radio"
          name="size"
          value="medium"
          checked={size === 'medium'}
          onChange={handleChange}
        />
        Medium
      </label>
    </div>
  );
}
\`\`\`

**Key Points:**
- All radio buttons have the same \`name\`
- Each has a unique \`value\`
- Use \`checked={state === value}\` to control selection
- Read \`event.target.value\` to get selected value

## Your Task

Create a component named \`PaymentMethod\` with radio buttons:
1. Import and use \`useState\`
2. Create state \`payment\` initialized to \`'credit'\`
3. Create \`handlePaymentChange\` function that updates payment state
4. Return a \`<div>\` with className "payment-method"
5. Include an \`<h3>\` with text "Select Payment Method"
6. Include three radio button options in labels:
   - "Credit Card" (value: "credit")
   - "PayPal" (value: "paypal")
   - "Bitcoin" (value: "bitcoin")
7. All radios should have name="payment"
8. Include a \`<p>\` displaying "Selected: {payment}"
        `,
        hint: "Each radio needs: checked={payment === 'value'} and onChange={handlePaymentChange}. They all share the same name attribute.",
        starterCode: `import React, { useState } from 'react';

function PaymentMethod() {
  // Create state here


  // Create handlePaymentChange here


  return (
    <div className="payment-method">
      <h3>Select Payment Method</h3>
      {/* Add radio buttons here */}
      {/* Add paragraph showing selection */}
    </div>
  );
}

export default PaymentMethod;`,
        solution: `import React, { useState } from 'react';

function PaymentMethod() {
  const [payment, setPayment] = useState('credit');

  const handlePaymentChange = (event) => {
    setPayment(event.target.value);
  };

  return (
    <div className="payment-method">
      <h3>Select Payment Method</h3>
      <label>
        <input
          type="radio"
          name="payment"
          value="credit"
          checked={payment === 'credit'}
          onChange={handlePaymentChange}
        />
        Credit Card
      </label>
      <label>
        <input
          type="radio"
          name="payment"
          value="paypal"
          checked={payment === 'paypal'}
          onChange={handlePaymentChange}
        />
        PayPal
      </label>
      <label>
        <input
          type="radio"
          name="payment"
          value="bitcoin"
          checked={payment === 'bitcoin'}
          onChange={handlePaymentChange}
        />
        Bitcoin
      </label>
      <p>Selected: {payment}</p>
    </div>
  );
}

export default PaymentMethod;`,
        testCases: [
          {
            id: "test-1",
            description: "Should initialize payment state to 'credit'",
            testFunction: `code.includes("useState('credit')")`,
          },
          {
            id: "test-2",
            description: "Should render h3 with 'Select Payment Method'",
            testFunction: `
              const { getByText } = render(<PaymentMethod />);
              getByText('Select Payment Method') !== null
            `,
          },
          {
            id: "test-3",
            description: "Should render three radio buttons",
            testFunction: `
              const { container } = render(<PaymentMethod />);
              container.querySelectorAll('input[type="radio"]').length === 3
            `,
          },
          {
            id: "test-4",
            description: "All radios should have name='payment'",
            testFunction: `
              const { container } = render(<PaymentMethod />);
              const radios = container.querySelectorAll('input[type="radio"]');
              Array.from(radios).every(radio => radio.name === 'payment')
            `,
          },
          {
            id: "test-5",
            description: "Radios should have correct values",
            testFunction: `
              const { container } = render(<PaymentMethod />);
              const radios = container.querySelectorAll('input[type="radio"]');
              const values = Array.from(radios).map(r => r.value);
              values.includes('credit') && values.includes('paypal') && values.includes('bitcoin')
            `,
          },
          {
            id: "test-6",
            description: "Should display selected payment method",
            testFunction: `
              const { container } = render(<PaymentMethod />);
              const p = container.querySelector('p');
              p !== null && p.textContent.includes('Selected:')
            `,
          },
          {
            id: "test-7",
            description: "Should use checked={payment === 'value'} pattern",
            testFunction: `code.includes("checked={payment === 'credit'}") || code.includes('checked={payment === "credit"}')`,
          },
        ],
        language: "jsx",
      },
    ],
  },

  // Lesson 10: Select Dropdowns
  {
    id: "react-events-10",
    moduleId: "module-1-3",
    title: "Creating Select Dropdowns",
    order: 10,
    xpReward: 150,
    difficulty: "beginner",
    steps: [
      {
        id: "react-events-10-step-1",
        order: 1,
        instruction: `
# Creating Select Dropdowns

Select dropdowns (drop-down menus) allow users to choose from a list of options. In React, you control them just like text inputs using \`value\` and \`onChange\`.

\`\`\`jsx
import { useState } from 'react';

function CountrySelector() {
  const [country, setCountry] = useState('usa');

  const handleChange = (event) => {
    setCountry(event.target.value);
  };

  return (
    <div>
      <label>
        Choose Country:
        <select value={country} onChange={handleChange}>
          <option value="usa">United States</option>
          <option value="uk">United Kingdom</option>
          <option value="canada">Canada</option>
        </select>
      </label>
      <p>Selected: {country}</p>
    </div>
  );
}
\`\`\`

**Key Points:**
- Set \`value\` on the \`<select>\` element (not on options)
- Each \`<option>\` has a \`value\` attribute
- The display text is between \`<option>\` tags
- Access selected value with \`event.target.value\`

## Your Task

Create a component named \`LanguageSelector\` with a dropdown:
1. Import and use \`useState\`
2. Create state \`language\` initialized to \`'javascript'\`
3. Create \`handleLanguageChange\` function that updates language state
4. Return a \`<div>\` with className "language-selector"
5. Include a \`<label>\` with text "Select Programming Language:"
6. Include a \`<select>\` with value and onChange props
7. Add five \`<option>\` elements:
   - JavaScript (value: "javascript")
   - Python (value: "python")
   - TypeScript (value: "typescript")
   - Go (value: "go")
   - Rust (value: "rust")
8. Include a \`<p>\` displaying "You selected: {language}"
        `,
        hint: "The select element needs value={language} and onChange={handleLanguageChange}. Each option needs a value attribute.",
        starterCode: `import React, { useState } from 'react';

function LanguageSelector() {
  // Create state here


  // Create handleLanguageChange here


  return (
    <div className="language-selector">
      <label>
        Select Programming Language:
        {/* Add select with options here */}
      </label>
      {/* Add paragraph showing selection */}
    </div>
  );
}

export default LanguageSelector;`,
        solution: `import React, { useState } from 'react';

function LanguageSelector() {
  const [language, setLanguage] = useState('javascript');

  const handleLanguageChange = (event) => {
    setLanguage(event.target.value);
  };

  return (
    <div className="language-selector">
      <label>
        Select Programming Language:
        <select value={language} onChange={handleLanguageChange}>
          <option value="javascript">JavaScript</option>
          <option value="python">Python</option>
          <option value="typescript">TypeScript</option>
          <option value="go">Go</option>
          <option value="rust">Rust</option>
        </select>
      </label>
      <p>You selected: {language}</p>
    </div>
  );
}

export default LanguageSelector;`,
        testCases: [
          {
            id: "test-1",
            description: "Should initialize language state to 'javascript'",
            testFunction: `code.includes("useState('javascript')")`,
          },
          {
            id: "test-2",
            description: "Should render a label with correct text",
            testFunction: `
              const { container } = render(<LanguageSelector />);
              const label = container.querySelector('label');
              label !== null && label.textContent.includes('Select Programming Language')
            `,
          },
          {
            id: "test-3",
            description: "Should render a select element with value prop",
            testFunction: `
              const { container } = render(<LanguageSelector />);
              const select = container.querySelector('select');
              select !== null && code.includes('value={language}')
            `,
          },
          {
            id: "test-4",
            description: "Should render five option elements",
            testFunction: `
              const { container } = render(<LanguageSelector />);
              container.querySelectorAll('option').length === 5
            `,
          },
          {
            id: "test-5",
            description: "Options should have correct values",
            testFunction: `
              const { container } = render(<LanguageSelector />);
              const options = container.querySelectorAll('option');
              const values = Array.from(options).map(o => o.value);
              values.includes('javascript') && values.includes('python') &&
              values.includes('typescript') && values.includes('go') && values.includes('rust')
            `,
          },
          {
            id: "test-6",
            description: "Should display selected language",
            testFunction: `
              const { container } = render(<LanguageSelector />);
              const p = container.querySelector('p');
              p !== null && p.textContent.includes('You selected:')
            `,
          },
          {
            id: "test-7",
            description: "Select should have onChange handler",
            testFunction: `code.includes('onChange={handleLanguageChange}')`,
          },
        ],
        language: "jsx",
      },
    ],
  },
];
