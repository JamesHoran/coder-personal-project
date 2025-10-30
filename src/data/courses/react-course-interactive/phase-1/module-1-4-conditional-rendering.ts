/**
 * React Course - Phase 1: Novice Foundations
 * Module 1.4: Conditional Rendering (10 lessons)
 *
 * This module teaches different patterns and techniques for conditionally
 * rendering components and elements in React applications.
 */

import { InteractiveLesson } from "@/types";

export const conditionalRenderingLessons: InteractiveLesson[] = [
  // Lesson 1: If Statements in JSX
  {
    id: "conditional-rendering-01",
    moduleId: "module-1-4",
    title: "If Statements in JSX",
    order: 1,
    xpReward: 75,
    difficulty: "beginner",
    steps: [
      {
        id: "conditional-rendering-01-step-1",
        order: 1,
        instruction: `
# If Statements in JSX

While you cannot use if statements directly inside JSX, you can use them **before** the return statement to conditionally set variables.

\`\`\`jsx
function Greeting({ isLoggedIn }) {
  let message;

  if (isLoggedIn) {
    message = <h1>Welcome back!</h1>;
  } else {
    message = <h1>Please sign in.</h1>;
  }

  return <div>{message}</div>;
}
\`\`\`

This pattern is useful when you have complex conditions or need multiple statements to determine what to render.

**Key Concepts:**
- Use if statements before the return
- Assign JSX to variables
- Render the variable in your JSX

## Your Task

Create a component named \`LoginStatus\` that uses if statements:

1. Destructure \`isLoggedIn\` and \`userName\` from props
2. Declare a variable \`statusMessage\`
3. Use an if statement: if \`isLoggedIn\` is true, set \`statusMessage\` to a \`<p>\` with text "Welcome, {userName}!"
4. Use an else statement: set \`statusMessage\` to a \`<p>\` with text "Please log in to continue"
5. Return a \`<div>\` with className "login-status" containing the \`statusMessage\`
        `,
        hint: "Declare statusMessage with let, use if/else to assign JSX to it, then render {statusMessage} inside your return statement.",
        starterCode: `import React from 'react';

function LoginStatus({ isLoggedIn, userName }) {
  // Declare statusMessage here


  // Use if/else to set statusMessage


  // Return the div with statusMessage

}

export default LoginStatus;`,
        solution: `import React from 'react';

function LoginStatus({ isLoggedIn, userName }) {
  let statusMessage;

  if (isLoggedIn) {
    statusMessage = <p>Welcome, {userName}!</p>;
  } else {
    statusMessage = <p>Please log in to continue</p>;
  }

  return (
    <div className="login-status">
      {statusMessage}
    </div>
  );
}

export default LoginStatus;`,
        testCases: [
          {
            id: "test-1",
            description: "Should declare a statusMessage variable",
            testFunction: `code.includes('statusMessage')`,
          },
          {
            id: "test-2",
            description: "Should use if statement",
            testFunction: `code.includes('if') && code.includes('isLoggedIn')`,
          },
          {
            id: "test-3",
            description: "Should show welcome message when logged in",
            testFunction: `
              const { getByText } = render(<LoginStatus isLoggedIn={true} userName="Alice" />);
              getByText('Welcome, Alice!') !== null
            `,
          },
          {
            id: "test-4",
            description: "Should show login prompt when not logged in",
            testFunction: `
              const { getByText } = render(<LoginStatus isLoggedIn={false} userName="Alice" />);
              getByText('Please log in to continue') !== null
            `,
          },
          {
            id: "test-5",
            description: "Should render inside a div with className 'login-status'",
            testFunction: `
              const { container } = render(<LoginStatus isLoggedIn={true} userName="Alice" />);
              container.querySelector('div.login-status') !== null
            `,
          },
        ],
        language: "jsx",
      },
    ],
  },

  // Lesson 2: Ternary Operators
  {
    id: "conditional-rendering-02",
    moduleId: "module-1-4",
    title: "Ternary Operators",
    order: 2,
    xpReward: 100,
    difficulty: "beginner",
    steps: [
      {
        id: "conditional-rendering-02-step-1",
        order: 1,
        instruction: `
# Ternary Operators

The **ternary operator** is the most common way to conditionally render content in React. It's a concise one-line if-else statement.

**Syntax:**
\`\`\`javascript
condition ? expressionIfTrue : expressionIfFalse
\`\`\`

**In React:**
\`\`\`jsx
function UserStatus({ isActive }) {
  return (
    <div>
      <p>Status: {isActive ? 'Active' : 'Inactive'}</p>
    </div>
  );
}
\`\`\`

You can render entire components conditionally:
\`\`\`jsx
{isLoggedIn ? <Dashboard /> : <LoginForm />}
\`\`\`

**When to use:**
- Simple conditional rendering with two options
- Inline conditional expressions in JSX
- When you need both "if" and "else" cases

## Your Task

Create a component named \`SubscriptionStatus\` that uses ternary operators:

1. Destructure \`isPremium\` and \`trialDays\` from props
2. Return a \`<div>\` with className "subscription"
3. Include an \`<h2>\` with the text "Account Status"
4. Use a ternary operator to show:
   - If \`isPremium\` is true: \`<p>\` with text "Premium Member"
   - If \`isPremium\` is false: \`<p>\` with text "Free Member"
5. Add another \`<p>\` that uses a ternary to show:
   - If \`trialDays > 0\`: "Trial days remaining: {trialDays}"
   - Otherwise: "No trial available"
        `,
        hint: "Use {condition ? <element1> : <element2>} for rendering elements conditionally. You'll need two separate ternary operators.",
        starterCode: `import React from 'react';

function SubscriptionStatus({ isPremium, trialDays }) {
  return (
    <div className="subscription">
      <h2>Account Status</h2>
      {/* Add ternary operators here */}


    </div>
  );
}

export default SubscriptionStatus;`,
        solution: `import React from 'react';

function SubscriptionStatus({ isPremium, trialDays }) {
  return (
    <div className="subscription">
      <h2>Account Status</h2>
      {isPremium ? <p>Premium Member</p> : <p>Free Member</p>}
      <p>{trialDays > 0 ? \`Trial days remaining: \${trialDays}\` : 'No trial available'}</p>
    </div>
  );
}

export default SubscriptionStatus;`,
        testCases: [
          {
            id: "test-1",
            description: "Should render h2 with 'Account Status'",
            testFunction: `
              const { getByText } = render(<SubscriptionStatus isPremium={true} trialDays={0} />);
              getByText('Account Status') !== null
            `,
          },
          {
            id: "test-2",
            description: "Should show 'Premium Member' when isPremium is true",
            testFunction: `
              const { getByText } = render(<SubscriptionStatus isPremium={true} trialDays={0} />);
              getByText('Premium Member') !== null
            `,
          },
          {
            id: "test-3",
            description: "Should show 'Free Member' when isPremium is false",
            testFunction: `
              const { getByText } = render(<SubscriptionStatus isPremium={false} trialDays={0} />);
              getByText('Free Member') !== null
            `,
          },
          {
            id: "test-4",
            description: "Should show trial days when trialDays > 0",
            testFunction: `
              const { getByText } = render(<SubscriptionStatus isPremium={false} trialDays={7} />);
              getByText('Trial days remaining: 7') !== null
            `,
          },
          {
            id: "test-5",
            description: "Should show 'No trial available' when trialDays is 0",
            testFunction: `
              const { getByText } = render(<SubscriptionStatus isPremium={false} trialDays={0} />);
              getByText('No trial available') !== null
            `,
          },
          {
            id: "test-6",
            description: "Should use ternary operators",
            testFunction: `code.includes('?') && code.includes(':')`,
          },
        ],
        language: "jsx",
      },
    ],
  },

  // Lesson 3: Logical && Operator
  {
    id: "conditional-rendering-03",
    moduleId: "module-1-4",
    title: "Logical && Operator",
    order: 3,
    xpReward: 100,
    difficulty: "beginner",
    steps: [
      {
        id: "conditional-rendering-03-step-1",
        order: 1,
        instruction: `
# Logical && Operator

The **logical AND operator** (\`&&\`) is perfect when you want to render something only if a condition is true, with **no else case**.

**How it works:**
\`\`\`jsx
{condition && <Element />}
\`\`\`

If \`condition\` is true, React renders \`<Element />\`. If false, React renders nothing.

**Example:**
\`\`\`jsx
function Notifications({ hasMessages, messageCount }) {
  return (
    <div>
      <h1>Inbox</h1>
      {hasMessages && <p>You have {messageCount} new messages</p>}
      {messageCount > 10 && <p>Your inbox is getting full!</p>}
    </div>
  );
}
\`\`\`

**When to use:**
- You only need to show something when a condition is true
- No "else" case needed
- Cleaner than using a ternary with null

**Warning:** Be careful with numbers! \`{count && <p>Count: {count}</p>}\` will render "0" when count is 0. Use \`{count > 0 && ...}\` instead.

## Your Task

Create a component named \`NotificationBell\` that uses the \`&&\` operator:

1. Destructure \`unreadCount\`, \`hasUrgent\`, and \`username\` from props
2. Return a \`<div>\` with className "notification-bell"
3. Always show an \`<h3>\` with text "Notifications"
4. Use \`&&\` to show a \`<p>\` with "You have {unreadCount} unread messages" only if \`unreadCount > 0\`
5. Use \`&&\` to show a \`<p>\` with className "urgent" and text "You have urgent notifications!" only if \`hasUrgent\` is true
6. Use \`&&\` to show a \`<p>\` with "Welcome, {username}!" only if \`username\` exists (is truthy)
        `,
        hint: "Use three separate && operators: {unreadCount > 0 && <p>...</p>}, {hasUrgent && <p>...</p>}, {username && <p>...</p>}",
        starterCode: `import React from 'react';

function NotificationBell({ unreadCount, hasUrgent, username }) {
  return (
    <div className="notification-bell">
      <h3>Notifications</h3>
      {/* Add conditional rendering with && operator */}



    </div>
  );
}

export default NotificationBell;`,
        solution: `import React from 'react';

function NotificationBell({ unreadCount, hasUrgent, username }) {
  return (
    <div className="notification-bell">
      <h3>Notifications</h3>
      {unreadCount > 0 && <p>You have {unreadCount} unread messages</p>}
      {hasUrgent && <p className="urgent">You have urgent notifications!</p>}
      {username && <p>Welcome, {username}!</p>}
    </div>
  );
}

export default NotificationBell;`,
        testCases: [
          {
            id: "test-1",
            description: "Should always show h3 with 'Notifications'",
            testFunction: `
              const { getByText } = render(<NotificationBell unreadCount={0} hasUrgent={false} username="" />);
              getByText('Notifications') !== null
            `,
          },
          {
            id: "test-2",
            description: "Should show unread count when greater than 0",
            testFunction: `
              const { getByText } = render(<NotificationBell unreadCount={5} hasUrgent={false} username="" />);
              getByText('You have 5 unread messages') !== null
            `,
          },
          {
            id: "test-3",
            description: "Should NOT show unread count when 0",
            testFunction: `
              const { queryByText } = render(<NotificationBell unreadCount={0} hasUrgent={false} username="" />);
              queryByText(/unread messages/) === null
            `,
          },
          {
            id: "test-4",
            description: "Should show urgent message when hasUrgent is true",
            testFunction: `
              const { getByText, container } = render(<NotificationBell unreadCount={0} hasUrgent={true} username="" />);
              const urgent = getByText('You have urgent notifications!');
              urgent !== null && urgent.className.includes('urgent')
            `,
          },
          {
            id: "test-5",
            description: "Should NOT show urgent message when hasUrgent is false",
            testFunction: `
              const { queryByText } = render(<NotificationBell unreadCount={0} hasUrgent={false} username="" />);
              queryByText(/urgent/) === null
            `,
          },
          {
            id: "test-6",
            description: "Should show welcome message when username exists",
            testFunction: `
              const { getByText } = render(<NotificationBell unreadCount={0} hasUrgent={false} username="Alice" />);
              getByText('Welcome, Alice!') !== null
            `,
          },
          {
            id: "test-7",
            description: "Should NOT show welcome message when username is empty",
            testFunction: `
              const { queryByText } = render(<NotificationBell unreadCount={0} hasUrgent={false} username="" />);
              queryByText(/Welcome/) === null
            `,
          },
          {
            id: "test-8",
            description: "Should use && operator for conditional rendering",
            testFunction: `code.includes('&&')`,
          },
        ],
        language: "jsx",
      },
    ],
  },

  // Lesson 4: Conditional Rendering Patterns
  {
    id: "conditional-rendering-04",
    moduleId: "module-1-4",
    title: "Conditional Rendering Patterns",
    order: 4,
    xpReward: 125,
    difficulty: "beginner",
    steps: [
      {
        id: "conditional-rendering-04-step-1",
        order: 1,
        instruction: `
# Conditional Rendering Patterns

In real applications, you'll often combine different conditional rendering techniques. Let's look at common patterns:

**Pattern 1: Early Return**
\`\`\`jsx
function UserProfile({ user }) {
  if (!user) {
    return <p>No user found</p>;
  }

  return (
    <div>
      <h1>{user.name}</h1>
      <p>{user.email}</p>
    </div>
  );
}
\`\`\`

**Pattern 2: Nested Ternaries (use sparingly)**
\`\`\`jsx
function Status({ isLoading, error, data }) {
  return (
    <div>
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <p>Data: {data}</p>
      )}
    </div>
  );
}
\`\`\`

**Pattern 3: Combined Conditions**
\`\`\`jsx
{isLoggedIn && isPremium && <PremiumFeature />}
{(isAdmin || isModerator) && <AdminPanel />}
\`\`\`

## Your Task

Create a component named \`ContentDisplay\` that uses multiple patterns:

1. Destructure \`isLoading\`, \`error\`, \`content\`, and \`isAuthorized\` from props
2. Use **early return**: if \`!isAuthorized\`, return a \`<div>\` with className "error" containing \`<p>\`"Access Denied"
3. Return a \`<div>\` with className "content-display"
4. Use **nested ternary**:
   - If \`isLoading\` is true, show \`<p>\`"Loading content..."
   - Else if \`error\` exists, show \`<p>\` with className "error" containing "Error: {error}"
   - Else show \`<p>\`"Content: {content}"
5. Use \`&&\` to show \`<button>\`"Refresh" only when \`!isLoading\` AND \`content\` exists
        `,
        hint: "Start with: if (!isAuthorized) return <div>...</div>; Then use a ternary inside your main return. Finally add {!isLoading && content && <button>}",
        starterCode: `import React from 'react';

function ContentDisplay({ isLoading, error, content, isAuthorized }) {
  // Add early return for unauthorized access


  return (
    <div className="content-display">
      {/* Add nested ternary for loading/error/content */}


      {/* Add conditional button */}

    </div>
  );
}

export default ContentDisplay;`,
        solution: `import React from 'react';

function ContentDisplay({ isLoading, error, content, isAuthorized }) {
  if (!isAuthorized) {
    return (
      <div className="error">
        <p>Access Denied</p>
      </div>
    );
  }

  return (
    <div className="content-display">
      {isLoading ? (
        <p>Loading content...</p>
      ) : error ? (
        <p className="error">Error: {error}</p>
      ) : (
        <p>Content: {content}</p>
      )}
      {!isLoading && content && <button>Refresh</button>}
    </div>
  );
}

export default ContentDisplay;`,
        testCases: [
          {
            id: "test-1",
            description: "Should show 'Access Denied' when not authorized",
            testFunction: `
              const { getByText, container } = render(<ContentDisplay isAuthorized={false} isLoading={false} error={null} content="Test" />);
              const text = getByText('Access Denied');
              text !== null && container.querySelector('div.error') !== null
            `,
          },
          {
            id: "test-2",
            description: "Should show 'Loading content...' when loading",
            testFunction: `
              const { getByText } = render(<ContentDisplay isAuthorized={true} isLoading={true} error={null} content={null} />);
              getByText('Loading content...') !== null
            `,
          },
          {
            id: "test-3",
            description: "Should show error message when error exists",
            testFunction: `
              const { getByText, container } = render(<ContentDisplay isAuthorized={true} isLoading={false} error="Network error" content={null} />);
              const errorText = getByText('Error: Network error');
              errorText !== null && errorText.className.includes('error')
            `,
          },
          {
            id: "test-4",
            description: "Should show content when loaded successfully",
            testFunction: `
              const { getByText } = render(<ContentDisplay isAuthorized={true} isLoading={false} error={null} content="Hello World" />);
              getByText('Content: Hello World') !== null
            `,
          },
          {
            id: "test-5",
            description: "Should show Refresh button when content is loaded",
            testFunction: `
              const { getByText } = render(<ContentDisplay isAuthorized={true} isLoading={false} error={null} content="Hello" />);
              const button = getByText('Refresh');
              button !== null && button.tagName === 'BUTTON'
            `,
          },
          {
            id: "test-6",
            description: "Should NOT show Refresh button when loading",
            testFunction: `
              const { queryByText } = render(<ContentDisplay isAuthorized={true} isLoading={true} error={null} content={null} />);
              queryByText('Refresh') === null
            `,
          },
          {
            id: "test-7",
            description: "Should use early return pattern",
            testFunction: `code.includes('if') && code.includes('!isAuthorized') && code.includes('return')`,
          },
          {
            id: "test-8",
            description: "Should use nested ternary operators",
            testFunction: `code.match(/\?[\\s\\S]*?:[\\s\\S]*?\?[\\s\\S]*?:/) !== null`,
          },
        ],
        language: "jsx",
      },
    ],
  },

  // Lesson 5: Hiding Components
  {
    id: "conditional-rendering-05",
    moduleId: "module-1-4",
    title: "Hiding Components",
    order: 5,
    xpReward: 100,
    difficulty: "beginner",
    steps: [
      {
        id: "conditional-rendering-05-step-1",
        order: 1,
        instruction: `
# Hiding Components

Sometimes you want to **hide** a component without removing it from the DOM. This is useful for CSS animations or maintaining component state.

**React Approach (Removes from DOM):**
\`\`\`jsx
{isVisible && <Component />}
\`\`\`

**CSS Approach (Hides but keeps in DOM):**
\`\`\`jsx
<div style={{ display: isVisible ? 'block' : 'none' }}>
  <Component />
</div>
\`\`\`

**When to use each:**
- **Conditional rendering** (\`&&\`): Component is destroyed and recreated. Loses internal state.
- **CSS hiding** (\`display: none\`): Component stays mounted. Keeps internal state. Better for animations.

**Other hiding options:**
\`\`\`jsx
// Visibility (takes up space but invisible)
<div style={{ visibility: isVisible ? 'visible' : 'hidden' }}>

// Opacity (visible but transparent)
<div style={{ opacity: isVisible ? 1 : 0 }}>
\`\`\`

## Your Task

Create a component named \`TogglePanel\` that demonstrates both hiding techniques:

1. Destructure \`isVisible\`, \`useCSS\`, and \`content\` from props
2. If \`useCSS\` is true, always render a \`<div>\` with className "panel" and:
   - Style with \`display\` set to \`isVisible ? 'block' : 'none'\`
   - Include a \`<p>\` with the content
3. If \`useCSS\` is false, use conditional rendering:
   - Use \`&&\` to only render the \`<div>\` when \`isVisible\` is true
   - \`<div>\` should have className "panel" with a \`<p>\` containing the content
4. Also include an \`<p>\` with className "method" showing: "Method: {useCSS ? 'CSS' : 'React'}"
        `,
        hint: "Use a ternary at the top level: {useCSS ? <div style={{display: ...}}>...</div> : (isVisible && <div>...</div>)}. Don't forget the method paragraph outside the conditional.",
        starterCode: `import React from 'react';

function TogglePanel({ isVisible, useCSS, content }) {
  return (
    <div>
      {/* Add conditional rendering here */}



      <p className="method">Method: {useCSS ? 'CSS' : 'React'}</p>
    </div>
  );
}

export default TogglePanel;`,
        solution: `import React from 'react';

function TogglePanel({ isVisible, useCSS, content }) {
  return (
    <div>
      {useCSS ? (
        <div className="panel" style={{ display: isVisible ? 'block' : 'none' }}>
          <p>{content}</p>
        </div>
      ) : (
        isVisible && (
          <div className="panel">
            <p>{content}</p>
          </div>
        )
      )}
      <p className="method">Method: {useCSS ? 'CSS' : 'React'}</p>
    </div>
  );
}

export default TogglePanel;`,
        testCases: [
          {
            id: "test-1",
            description: "Should show method paragraph",
            testFunction: `
              const { container } = render(<TogglePanel isVisible={true} useCSS={true} content="Test" />);
              container.querySelector('p.method') !== null
            `,
          },
          {
            id: "test-2",
            description: "When useCSS is true, panel should always be in DOM",
            testFunction: `
              const { container } = render(<TogglePanel isVisible={false} useCSS={true} content="Hidden" />);
              const panel = container.querySelector('div.panel');
              panel !== null
            `,
          },
          {
            id: "test-3",
            description: "When useCSS is true and isVisible false, display should be none",
            testFunction: `
              const { container } = render(<TogglePanel isVisible={false} useCSS={true} content="Hidden" />);
              const panel = container.querySelector('div.panel');
              panel.style.display === 'none'
            `,
          },
          {
            id: "test-4",
            description: "When useCSS is true and isVisible true, display should be block",
            testFunction: `
              const { container } = render(<TogglePanel isVisible={true} useCSS={true} content="Visible" />);
              const panel = container.querySelector('div.panel');
              panel.style.display === 'block'
            `,
          },
          {
            id: "test-5",
            description: "When useCSS is false and isVisible false, panel should not be in DOM",
            testFunction: `
              const { container } = render(<TogglePanel isVisible={false} useCSS={false} content="Hidden" />);
              container.querySelector('div.panel') === null
            `,
          },
          {
            id: "test-6",
            description: "When useCSS is false and isVisible true, panel should be in DOM",
            testFunction: `
              const { container, getByText } = render(<TogglePanel isVisible={true} useCSS={false} content="Visible" />);
              const panel = container.querySelector('div.panel');
              panel !== null && getByText('Visible') !== null
            `,
          },
          {
            id: "test-7",
            description: "Should show correct method text",
            testFunction: `
              const { getByText: getText1 } = render(<TogglePanel isVisible={true} useCSS={true} content="Test" />);
              const { getByText: getText2 } = render(<TogglePanel isVisible={true} useCSS={false} content="Test" />);
              getText1('Method: CSS') !== null && getText2('Method: React') !== null
            `,
          },
        ],
        language: "jsx",
      },
    ],
  },

  // Lesson 6: Multiple Conditions
  {
    id: "conditional-rendering-06",
    moduleId: "module-1-4",
    title: "Multiple Conditions",
    order: 6,
    xpReward: 125,
    difficulty: "beginner",
    steps: [
      {
        id: "conditional-rendering-06-step-1",
        order: 1,
        instruction: `
# Multiple Conditions

Often you need to check multiple conditions before rendering content. You can combine conditions using logical operators.

**AND Conditions (both must be true):**
\`\`\`jsx
{isLoggedIn && isPremium && <PremiumContent />}
{age >= 18 && hasLicense && <DriveButton />}
\`\`\`

**OR Conditions (at least one must be true):**
\`\`\`jsx
{isAdmin || isModerator && <ModeratorPanel />}
\`\`\`

**Complex Conditions:**
\`\`\`jsx
{(isLoggedIn && !isBanned) && <CommentSection />}
{(hasSubscription || isTrialActive) && <PremiumVideo />}
\`\`\`

**Tip:** Use parentheses to make complex conditions more readable!

## Your Task

Create a component named \`FeatureAccess\` that checks multiple conditions:

1. Destructure: \`isLoggedIn\`, \`isPremium\`, \`isTrial\`, \`age\`, and \`featureName\` from props
2. Return a \`<div>\` with className "feature-access"
3. Show an \`<h2>\` with text "Feature: {featureName}"
4. Use \`&&\` with multiple conditions:
   - Show \`<p>\`"Access Granted" with className "success" when: \`isLoggedIn\` AND (\`isPremium\` OR \`isTrial\`)
   - Show \`<p>\`"Age Restricted" with className "warning" when: \`isLoggedIn\` AND \`age < 18\`
   - Show \`<p>\`"Please log in" with className "error" when: \`!isLoggedIn\`
5. Show a \`<p>\`"Status: Premium" when \`isPremium\` is true
6. Show a \`<p>\`"Status: Trial" when \`isTrial\` is true AND \`!isPremium\`
        `,
        hint: "Use parentheses for clarity: (isLoggedIn && (isPremium || isTrial)). Remember order matters - check !isLoggedIn last so other messages don't show.",
        starterCode: `import React from 'react';

function FeatureAccess({ isLoggedIn, isPremium, isTrial, age, featureName }) {
  return (
    <div className="feature-access">
      <h2>Feature: {featureName}</h2>
      {/* Add multiple conditional checks here */}





    </div>
  );
}

export default FeatureAccess;`,
        solution: `import React from 'react';

function FeatureAccess({ isLoggedIn, isPremium, isTrial, age, featureName }) {
  return (
    <div className="feature-access">
      <h2>Feature: {featureName}</h2>
      {isLoggedIn && (isPremium || isTrial) && <p className="success">Access Granted</p>}
      {isLoggedIn && age < 18 && <p className="warning">Age Restricted</p>}
      {!isLoggedIn && <p className="error">Please log in</p>}
      {isPremium && <p>Status: Premium</p>}
      {isTrial && !isPremium && <p>Status: Trial</p>}
    </div>
  );
}

export default FeatureAccess;`,
        testCases: [
          {
            id: "test-1",
            description: "Should show feature name in h2",
            testFunction: `
              const { getByText } = render(<FeatureAccess isLoggedIn={false} isPremium={false} isTrial={false} age={25} featureName="Premium Video" />);
              getByText('Feature: Premium Video') !== null
            `,
          },
          {
            id: "test-2",
            description: "Should show 'Please log in' when not logged in",
            testFunction: `
              const { getByText, container } = render(<FeatureAccess isLoggedIn={false} isPremium={false} isTrial={false} age={25} featureName="Test" />);
              const errorMsg = getByText('Please log in');
              errorMsg !== null && errorMsg.className.includes('error')
            `,
          },
          {
            id: "test-3",
            description: "Should show 'Access Granted' when logged in and premium",
            testFunction: `
              const { getByText, container } = render(<FeatureAccess isLoggedIn={true} isPremium={true} isTrial={false} age={25} featureName="Test" />);
              const successMsg = getByText('Access Granted');
              successMsg !== null && successMsg.className.includes('success')
            `,
          },
          {
            id: "test-4",
            description: "Should show 'Access Granted' when logged in and trial",
            testFunction: `
              const { getByText } = render(<FeatureAccess isLoggedIn={true} isPremium={false} isTrial={true} age={25} featureName="Test" />);
              getByText('Access Granted') !== null
            `,
          },
          {
            id: "test-5",
            description: "Should show 'Age Restricted' when logged in but under 18",
            testFunction: `
              const { getByText, container } = render(<FeatureAccess isLoggedIn={true} isPremium={true} isTrial={false} age={16} featureName="Test" />);
              const warningMsg = getByText('Age Restricted');
              warningMsg !== null && warningMsg.className.includes('warning')
            `,
          },
          {
            id: "test-6",
            description: "Should show 'Status: Premium' when isPremium is true",
            testFunction: `
              const { getByText } = render(<FeatureAccess isLoggedIn={true} isPremium={true} isTrial={false} age={25} featureName="Test" />);
              getByText('Status: Premium') !== null
            `,
          },
          {
            id: "test-7",
            description: "Should show 'Status: Trial' when isTrial is true and not premium",
            testFunction: `
              const { getByText } = render(<FeatureAccess isLoggedIn={true} isPremium={false} isTrial={true} age={25} featureName="Test" />);
              getByText('Status: Trial') !== null
            `,
          },
          {
            id: "test-8",
            description: "Should NOT show 'Status: Trial' when both premium and trial",
            testFunction: `
              const { queryByText } = render(<FeatureAccess isLoggedIn={true} isPremium={true} isTrial={true} age={25} featureName="Test" />);
              queryByText('Status: Trial') === null
            `,
          },
        ],
        language: "jsx",
      },
    ],
  },

  // Lesson 7: Switch Statements
  {
    id: "conditional-rendering-07",
    moduleId: "module-1-4",
    title: "Switch Statements",
    order: 7,
    xpReward: 125,
    difficulty: "beginner",
    steps: [
      {
        id: "conditional-rendering-07-step-1",
        order: 1,
        instruction: `
# Switch Statements

When you have many possible conditions based on a single value, a **switch statement** is cleaner than multiple if-else or ternary operators.

\`\`\`jsx
function StatusBadge({ status }) {
  let badge;

  switch (status) {
    case 'active':
      badge = <span className="badge green">Active</span>;
      break;
    case 'pending':
      badge = <span className="badge yellow">Pending</span>;
      break;
    case 'inactive':
      badge = <span className="badge gray">Inactive</span>;
      break;
    default:
      badge = <span className="badge">Unknown</span>;
  }

  return <div>{badge}</div>;
}
\`\`\`

**When to use:**
- You have 3+ possible values to check
- All conditions check the same variable
- You want readable, organized code

**Don't forget:**
- Each case needs a \`break\`
- Include a \`default\` case for unexpected values

## Your Task

Create a component named \`UserRoleBadge\` that uses a switch statement:

1. Destructure \`role\` and \`userName\` from props
2. Declare a variable \`badge\`
3. Use a switch statement on \`role\`:
   - Case 'admin': Set badge to \`<span>\` with className "badge admin" and text "Admin"
   - Case 'moderator': Set badge to \`<span>\` with className "badge moderator" and text "Moderator"
   - Case 'user': Set badge to \`<span>\` with className "badge user" and text "User"
   - Case 'guest': Set badge to \`<span>\` with className "badge guest" and text "Guest"
   - Default: Set badge to \`<span>\` with className "badge" and text "Unknown"
4. Return a \`<div>\` with className "user-role" containing:
   - An \`<h3>\` with text "{userName}"
   - The badge variable
        `,
        hint: "Use switch(role) with cases for each role. Don't forget break statements and a default case. Assign JSX elements to the badge variable.",
        starterCode: `import React from 'react';

function UserRoleBadge({ role, userName }) {
  let badge;

  // Add switch statement here







  return (
    <div className="user-role">
      <h3>{userName}</h3>
      {badge}
    </div>
  );
}

export default UserRoleBadge;`,
        solution: `import React from 'react';

function UserRoleBadge({ role, userName }) {
  let badge;

  switch (role) {
    case 'admin':
      badge = <span className="badge admin">Admin</span>;
      break;
    case 'moderator':
      badge = <span className="badge moderator">Moderator</span>;
      break;
    case 'user':
      badge = <span className="badge user">User</span>;
      break;
    case 'guest':
      badge = <span className="badge guest">Guest</span>;
      break;
    default:
      badge = <span className="badge">Unknown</span>;
  }

  return (
    <div className="user-role">
      <h3>{userName}</h3>
      {badge}
    </div>
  );
}

export default UserRoleBadge;`,
        testCases: [
          {
            id: "test-1",
            description: "Should use a switch statement",
            testFunction: `code.includes('switch') && code.includes('case')`,
          },
          {
            id: "test-2",
            description: "Should display the userName in h3",
            testFunction: `
              const { getByText } = render(<UserRoleBadge role="user" userName="Alice" />);
              const h3 = getByText('Alice');
              h3 !== null && h3.tagName === 'H3'
            `,
          },
          {
            id: "test-3",
            description: "Should show Admin badge for admin role",
            testFunction: `
              const { getByText, container } = render(<UserRoleBadge role="admin" userName="Bob" />);
              const badge = getByText('Admin');
              badge.className.includes('badge') && badge.className.includes('admin')
            `,
          },
          {
            id: "test-4",
            description: "Should show Moderator badge for moderator role",
            testFunction: `
              const { getByText } = render(<UserRoleBadge role="moderator" userName="Charlie" />);
              const badge = getByText('Moderator');
              badge.className.includes('badge') && badge.className.includes('moderator')
            `,
          },
          {
            id: "test-5",
            description: "Should show User badge for user role",
            testFunction: `
              const { getByText } = render(<UserRoleBadge role="user" userName="Diana" />);
              const badge = getByText('User');
              badge.className.includes('badge') && badge.className.includes('user')
            `,
          },
          {
            id: "test-6",
            description: "Should show Guest badge for guest role",
            testFunction: `
              const { getByText } = render(<UserRoleBadge role="guest" userName="Eve" />);
              const badge = getByText('Guest');
              badge.className.includes('badge') && badge.className.includes('guest')
            `,
          },
          {
            id: "test-7",
            description: "Should show Unknown badge for unrecognized role",
            testFunction: `
              const { getByText, container } = render(<UserRoleBadge role="superuser" userName="Frank" />);
              const badge = getByText('Unknown');
              badge.className.includes('badge')
            `,
          },
          {
            id: "test-8",
            description: "Should have break statements in switch cases",
            testFunction: `code.includes('break')`,
          },
        ],
        language: "jsx",
      },
    ],
  },

  // Lesson 8: Loading States
  {
    id: "conditional-rendering-08",
    moduleId: "module-1-4",
    title: "Loading States",
    order: 8,
    xpReward: 125,
    difficulty: "beginner",
    steps: [
      {
        id: "conditional-rendering-08-step-1",
        order: 1,
        instruction: `
# Loading States

In real applications, data often needs to be fetched from APIs. You need to show **loading states** while waiting for data.

**Common Loading Pattern:**
\`\`\`jsx
function DataDisplay({ isLoading, data }) {
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return <div>Data: {data}</div>;
}
\`\`\`

**Better UX with Spinners:**
\`\`\`jsx
function UserList({ isLoading, users }) {
  if (isLoading) {
    return (
      <div className="loading-spinner">
        <p>Loading users...</p>
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <ul>
      {users.map(user => <li key={user.id}>{user.name}</li>)}
    </ul>
  );
}
\`\`\`

**Progressive Loading:**
Show a skeleton or placeholder while loading to improve perceived performance.

## Your Task

Create a component named \`ProductLoader\` that handles loading states:

1. Destructure \`isLoading\`, \`isFetching\`, \`product\` from props
2. Use **early return**: If \`isLoading\` is true, return a \`<div>\` with className "loading" containing:
   - An \`<h3>\`"Loading Product..."
   - A \`<p>\`"Please wait"
3. Otherwise, return a \`<div>\` with className "product" containing:
   - An \`<h2>\` with text showing product name
   - A \`<p>\` with className "price" showing price
   - A \`<p>\` with className "description" showing description
   - Use \`&&\` to show a \`<p>\` with className "fetching" and text "Updating..." only when \`isFetching\` is true
        `,
        hint: "Use if (isLoading) return <div>...</div>; for early return. Then render the product normally. Add {isFetching && <p>...</p>} at the end.",
        starterCode: `import React from 'react';

function ProductLoader({ isLoading, isFetching, product }) {
  // Add early return for loading state




  // Return product display with optional updating indicator




}

export default ProductLoader;`,
        solution: `import React from 'react';

function ProductLoader({ isLoading, isFetching, product }) {
  if (isLoading) {
    return (
      <div className="loading">
        <h3>Loading Product...</h3>
        <p>Please wait</p>
      </div>
    );
  }

  const { name = '', price = 0, description = '' } = product || {};

  return (
    <div className="product">
      <h2>{name}</h2>
      <p className="price">Price: {price}</p>
      <p className="description">{description}</p>
      {isFetching && <p className="fetching">Updating...</p>}
    </div>
  );
}

export default ProductLoader;`,
        testCases: [
          {
            id: "test-1",
            description: "Should show loading message when isLoading is true",
            testFunction: `
              const { getByText, container } = render(<ProductLoader isLoading={true} isFetching={false} product={null} />);
              getByText('Loading Product...') !== null && container.querySelector('div.loading') !== null
            `,
          },
          {
            id: "test-2",
            description: "Should show 'Please wait' when loading",
            testFunction: `
              const { getByText } = render(<ProductLoader isLoading={true} isFetching={false} product={null} />);
              getByText('Please wait') !== null
            `,
          },
          {
            id: "test-3",
            description: "Should show product name when loaded",
            testFunction: `
              const product = { name: 'Laptop', price: 999, description: 'Great laptop' };
              const { getByText } = render(<ProductLoader isLoading={false} isFetching={false} product={product} />);
              const h2 = getByText('Laptop');
              h2 !== null && h2.tagName === 'H2'
            `,
          },
          {
            id: "test-4",
            description: "Should show product price with correct format",
            testFunction: `
              const product = { name: 'Laptop', price: 999, description: 'Great laptop' };
              const { getByText, container } = render(<ProductLoader isLoading={false} isFetching={false} product={product} />);
              const price = getByText('Price: $999');
              price !== null && price.className.includes('price')
            `,
          },
          {
            id: "test-5",
            description: "Should show product description",
            testFunction: `
              const product = { name: 'Laptop', price: 999, description: 'Great laptop' };
              const { getByText, container } = render(<ProductLoader isLoading={false} isFetching={false} product={product} />);
              const desc = getByText('Great laptop');
              desc !== null && desc.className.includes('description')
            `,
          },
          {
            id: "test-6",
            description: "Should show 'Updating...' when isFetching is true",
            testFunction: `
              const product = { name: 'Laptop', price: 999, description: 'Great laptop' };
              const { getByText, container } = render(<ProductLoader isLoading={false} isFetching={true} product={product} />);
              const updating = getByText('Updating...');
              updating !== null && updating.className.includes('fetching')
            `,
          },
          {
            id: "test-7",
            description: "Should NOT show 'Updating...' when isFetching is false",
            testFunction: `
              const product = { name: 'Laptop', price: 999, description: 'Great laptop' };
              const { queryByText } = render(<ProductLoader isLoading={false} isFetching={false} product={product} />);
              queryByText('Updating...') === null
            `,
          },
          {
            id: "test-8",
            description: "Should use early return for loading state",
            testFunction: `code.includes('if') && code.includes('isLoading') && code.match(/if[\\s\\S]*?return/i)`,
          },
        ],
        language: "jsx",
      },
    ],
  },

  // Lesson 9: Error States
  {
    id: "conditional-rendering-09",
    moduleId: "module-1-4",
    title: "Error States",
    order: 9,
    xpReward: 125,
    difficulty: "beginner",
    steps: [
      {
        id: "conditional-rendering-09-step-1",
        order: 1,
        instruction: `
# Error States

Handling errors gracefully is crucial for good UX. Always show helpful error messages when things go wrong.

**Basic Error Handling:**
\`\`\`jsx
function DataFetcher({ error, data }) {
  if (error) {
    return <div className="error">Error: {error.message}</div>;
  }

  return <div>{data}</div>;
}
\`\`\`

**Complete Pattern (Loading + Error + Success):**
\`\`\`jsx
function UserProfile({ isLoading, error, user }) {
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return (
      <div className="error">
        <h2>Oops! Something went wrong</h2>
        <p>{error.message}</p>
        <button onClick={retry}>Try Again</button>
      </div>
    );
  }

  return (
    <div>
      <h1>{user.name}</h1>
      <p>{user.email}</p>
    </div>
  );
}
\`\`\`

**Best Practices:**
- Show clear, user-friendly error messages
- Provide a way to recover (retry button, help link)
- Log technical errors for debugging but show simple messages to users

## Your Task

Create a component named \`DataDisplay\` that handles loading, error, and success states:

1. Destructure \`isLoading\`, \`error\`, \`data\`, and \`onRetry\` from props
2. Use **early return** for loading: If \`isLoading\`, return \`<div>\` with className "loading" containing \`<p>\`"Loading data..."
3. Use **early return** for errors: If \`error\` exists, return \`<div>\` with className "error-container" containing:
   - An \`<h3>\` with text "Error Loading Data"
   - A \`<p>\` with className "error-message" showing the error
   - A \`<button>\` with text "Retry" that has onClick set to \`onRetry\`
4. For success: Return \`<div>\` with className "data-display" containing:
   - An \`<h3>\`"Data Loaded Successfully"
   - A \`<p>\` with className "data-content" showing the data
        `,
        hint: "Use two early returns: one for isLoading, one for error. Check if (error) not if (error === true). The success case is what remains after both early returns.",
        starterCode: `import React from 'react';

function DataDisplay({ isLoading, error, data, onRetry }) {
  // Add early return for loading


  // Add early return for error




  // Return success state



}

export default DataDisplay;`,
        solution: `import React from 'react';

function DataDisplay({ isLoading, error, data, onRetry }) {
  if (isLoading) {
    return (
      <div className="loading">
        <p>Loading data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <h3>Error Loading Data</h3>
        <p className="error-message">{error}</p>
        <button onClick={onRetry}>Retry</button>
      </div>
    );
  }

  return (
    <div className="data-display">
      <h3>Data Loaded Successfully</h3>
      <p className="data-content">{data}</p>
    </div>
  );
}

export default DataDisplay;`,
        testCases: [
          {
            id: "test-1",
            description: "Should show loading state when isLoading is true",
            testFunction: `
              const { getByText, container } = render(<DataDisplay isLoading={true} error={null} data={null} onRetry={() => {}} />);
              getByText('Loading data...') !== null && container.querySelector('div.loading') !== null
            `,
          },
          {
            id: "test-2",
            description: "Should show error heading when error exists",
            testFunction: `
              const { getByText, container } = render(<DataDisplay isLoading={false} error="Network error" data={null} onRetry={() => {}} />);
              const h3 = getByText('Error Loading Data');
              h3 !== null && container.querySelector('div.error-container') !== null
            `,
          },
          {
            id: "test-3",
            description: "Should display error message with correct className",
            testFunction: `
              const { getByText, container } = render(<DataDisplay isLoading={false} error="Network error" data={null} onRetry={() => {}} />);
              const errorMsg = getByText('Network error');
              errorMsg !== null && errorMsg.className.includes('error-message')
            `,
          },
          {
            id: "test-4",
            description: "Should show Retry button with onClick handler",
            testFunction: `
              const mockRetry = () => {};
              const { getByText } = render(<DataDisplay isLoading={false} error="Error" data={null} onRetry={mockRetry} />);
              const button = getByText('Retry');
              button !== null && button.tagName === 'BUTTON'
            `,
          },
          {
            id: "test-5",
            description: "Should show success message when data is loaded",
            testFunction: `
              const { getByText, container } = render(<DataDisplay isLoading={false} error={null} data="Test data" onRetry={() => {}} />);
              getByText('Data Loaded Successfully') !== null && container.querySelector('div.data-display') !== null
            `,
          },
          {
            id: "test-6",
            description: "Should display data with correct className",
            testFunction: `
              const { getByText, container } = render(<DataDisplay isLoading={false} error={null} data="Test data" onRetry={() => {}} />);
              const dataContent = getByText('Test data');
              dataContent !== null && dataContent.className.includes('data-content')
            `,
          },
          {
            id: "test-7",
            description: "Should prioritize loading over error (loading shown first)",
            testFunction: `
              const { getByText, queryByText } = render(<DataDisplay isLoading={true} error="Error" data={null} onRetry={() => {}} />);
              getByText('Loading data...') !== null && queryByText('Error Loading Data') === null
            `,
          },
          {
            id: "test-8",
            description: "Should use early returns for loading and error",
            testFunction: `
              const returns = code.match(/if[\\s\\S]*?return/gi);
              returns !== null && returns.length >= 2
            `,
          },
        ],
        language: "jsx",
      },
    ],
  },

  // Lesson 10: Empty States
  {
    id: "conditional-rendering-10",
    moduleId: "module-1-4",
    title: "Empty States",
    order: 10,
    xpReward: 150,
    difficulty: "beginner",
    steps: [
      {
        id: "conditional-rendering-10-step-1",
        order: 1,
        instruction: `
# Empty States

**Empty states** handle scenarios where there's no data to display. Good empty states guide users on what to do next.

**Basic Empty State:**
\`\`\`jsx
function MessageList({ messages }) {
  if (messages.length === 0) {
    return <p>No messages yet. Start a conversation!</p>;
  }

  return (
    <ul>
      {messages.map(msg => <li key={msg.id}>{msg.text}</li>)}
    </ul>
  );
}
\`\`\`

**Complete Pattern with All States:**
\`\`\`jsx
function TodoList({ isLoading, error, todos, onAddTodo }) {
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  if (todos.length === 0) {
    return (
      <div className="empty-state">
        <h2>No todos yet!</h2>
        <p>Get started by adding your first task</p>
        <button onClick={onAddTodo}>Add Todo</button>
      </div>
    );
  }

  return (
    <ul>
      {todos.map(todo => <li key={todo.id}>{todo.text}</li>)}
    </ul>
  );
}
\`\`\`

**Empty State Best Practices:**
- Explain why it's empty
- Provide an action (button, link)
- Use friendly, encouraging language
- Consider adding an illustration or icon

## Your Task

Create a component named \`ShoppingCart\` that handles all states including empty:

1. Destructure \`isLoading\`, \`error\`, \`items\`, and \`onStartShopping\` from props
2. **Loading state**: If \`isLoading\`, return \`<div>\` with className "loading" containing \`<p>\`"Loading cart..."
3. **Error state**: If \`error\`, return \`<div>\` with className "error" containing:
   - \`<p>\`"Error: {error}"
4. **Empty state**: If \`items.length === 0\`, return \`<div>\` with className "empty-cart" containing:
   - An \`<h2>\`"Your cart is empty"
   - A \`<p>\`"Add some items to get started"
   - A \`<button>\` with text "Start Shopping" that has onClick set to \`onStartShopping\`
5. **Success state**: Return \`<div>\` with className "cart" containing:
   - An \`<h2>\`"Shopping Cart"
   - A \`<p>\`"Items: {items.length}"
   - A \`<ul>\` that maps over items, showing each item.name in an \`<li>\` with key={item.id}
        `,
        hint: "Use three early returns: isLoading, error, and items.length === 0. The final return is for the success case with items.map().",
        starterCode: `import React from 'react';

function ShoppingCart({ isLoading, error, items, onStartShopping }) {
  // Add loading state early return


  // Add error state early return


  // Add empty state early return





  // Return cart with items




}

export default ShoppingCart;`,
        solution: `import React from 'react';

function ShoppingCart({ isLoading, error, items, onStartShopping }) {
  if (isLoading) {
    return (
      <div className="loading">
        <p>Loading cart...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error">
        <p>Error: {error}</p>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="empty-cart">
        <h2>Your cart is empty</h2>
        <p>Add some items to get started</p>
        <button onClick={onStartShopping}>Start Shopping</button>
      </div>
    );
  }

  return (
    <div className="cart">
      <h2>Shopping Cart</h2>
      <p>Items: {items.length}</p>
      <ul>
        {items.map(item => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default ShoppingCart;`,
        testCases: [
          {
            id: "test-1",
            description: "Should show loading state",
            testFunction: `
              const { getByText, container } = render(<ShoppingCart isLoading={true} error={null} items={[]} onStartShopping={() => {}} />);
              getByText('Loading cart...') !== null && container.querySelector('div.loading') !== null
            `,
          },
          {
            id: "test-2",
            description: "Should show error state",
            testFunction: `
              const { getByText, container } = render(<ShoppingCart isLoading={false} error="Connection failed" items={[]} onStartShopping={() => {}} />);
              getByText('Error: Connection failed') !== null && container.querySelector('div.error') !== null
            `,
          },
          {
            id: "test-3",
            description: "Should show empty cart heading",
            testFunction: `
              const { getByText, container } = render(<ShoppingCart isLoading={false} error={null} items={[]} onStartShopping={() => {}} />);
              const h2 = getByText('Your cart is empty');
              h2 !== null && container.querySelector('div.empty-cart') !== null
            `,
          },
          {
            id: "test-4",
            description: "Should show empty cart message and button",
            testFunction: `
              const { getByText } = render(<ShoppingCart isLoading={false} error={null} items={[]} onStartShopping={() => {}} />);
              getByText('Add some items to get started') !== null;
              const button = getByText('Start Shopping');
              button !== null && button.tagName === 'BUTTON'
            `,
          },
          {
            id: "test-5",
            description: "Should show cart with items count",
            testFunction: `
              const items = [{ id: 1, name: 'Laptop' }, { id: 2, name: 'Mouse' }];
              const { getByText, container } = render(<ShoppingCart isLoading={false} error={null} items={items} onStartShopping={() => {}} />);
              getByText('Shopping Cart') !== null;
              getByText('Items: 2') !== null;
              container.querySelector('div.cart') !== null
            `,
          },
          {
            id: "test-6",
            description: "Should render list of items with correct keys",
            testFunction: `
              const items = [{ id: 1, name: 'Laptop' }, { id: 2, name: 'Mouse' }];
              const { getByText, container } = render(<ShoppingCart isLoading={false} error={null} items={items} onStartShopping={() => {}} />);
              const ul = container.querySelector('ul');
              ul !== null;
              getByText('Laptop') !== null;
              getByText('Mouse') !== null
            `,
          },
          {
            id: "test-7",
            description: "Should use items.map() to render list",
            testFunction: `code.includes('items.map') && code.includes('key=')`,
          },
          {
            id: "test-8",
            description: "Should check items.length === 0 for empty state",
            testFunction: `code.includes('items.length') && (code.includes('=== 0') || code.includes('== 0'))`,
          },
          {
            id: "test-9",
            description: "Should use multiple early returns",
            testFunction: `
              const returns = code.match(/if[\\s\\S]*?return/gi);
              returns !== null && returns.length >= 3
            `,
          },
        ],
        language: "jsx",
      },
    ],
  },
];
