/**
 * React Course - Phase 2: Practitioner Skills
 * Module 2.4: Routing (15 lessons)
 *
 * This module covers React Router for building single-page applications
 * with client-side routing, navigation, and URL management.
 */

import { InteractiveLesson } from "@/types";

export const routingLessons: InteractiveLesson[] = [
  // Lesson 1: React Router Introduction
  {
    id: "routing-01",
    moduleId: "module-2-4",
    title: "React Router Introduction",
    order: 1,
    xpReward: 150,
    difficulty: "intermediate",
    steps: [
      {
        id: "routing-01-step-1",
        order: 1,
        instruction: `
# React Router Introduction

**React Router** is the standard routing library for React applications. It enables navigation between different views or pages in your single-page application (SPA) without full page reloads.

## Why React Router?

In traditional multi-page applications, clicking a link causes a full page refresh. React Router allows you to:
- Navigate between "pages" without refreshing
- Keep UI state during navigation
- Handle dynamic URLs with parameters
- Create nested route hierarchies
- Build better user experiences with instant navigation

## Key Concepts

**Router:** The container component that keeps your UI in sync with the URL.

**Route:** Defines what component to render for a specific URL path.

**Link:** Creates navigation links without page reloads.

\`\`\`jsx
// Basic example of React Router structure
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  );
}
\`\`\`

## Your Task

Create a simple component that explains the benefits of React Router.

Create a component named \`RouterIntro\` that:
1. Returns a \`<div>\` with className "router-intro"
2. Contains an \`<h1>\` with text "Why React Router?"
3. Contains a \`<ul>\` with three \`<li>\` elements:
   - "No page refreshes"
   - "Instant navigation"
   - "Better user experience"
        `,
        hint: "This is a simple presentational component. Focus on the structure and content.",
        starterCode: `import React from 'react';

function RouterIntro() {
  // Create your component here

}

export default RouterIntro;`,
        solution: `import React from 'react';

function RouterIntro() {
  return (
    <div className="router-intro">
      <h1>Why React Router?</h1>
      <ul>
        <li>No page refreshes</li>
        <li>Instant navigation</li>
        <li>Better user experience</li>
      </ul>
    </div>
  );
}

export default RouterIntro;`,
        testCases: [
          {
            id: "test-1",
            description: "Should render a div with className 'router-intro'",
            testFunction: `
              const { container } = render(<RouterIntro />);
              container.querySelector('div.router-intro') !== null
            `,
          },
          {
            id: "test-2",
            description: "Should render h1 with correct text",
            testFunction: `
              const { getByText } = render(<RouterIntro />);
              getByText('Why React Router?') !== null
            `,
          },
          {
            id: "test-3",
            description: "Should render ul with three list items",
            testFunction: `
              const { container } = render(<RouterIntro />);
              const items = container.querySelectorAll('li');
              items.length === 3
            `,
          },
          {
            id: "test-4",
            description: "Should display all three benefits",
            testFunction: `
              const { getByText } = render(<RouterIntro />);
              getByText('No page refreshes') !== null &&
              getByText('Instant navigation') !== null &&
              getByText('Better user experience') !== null
            `,
          },
        ],
        language: "jsx",
      },
    ],
  },

  // Lesson 2: Installing React Router
  {
    id: "routing-02",
    moduleId: "module-2-4",
    title: "Installing React Router",
    order: 2,
    xpReward: 150,
    difficulty: "intermediate",
    steps: [
      {
        id: "routing-02-step-1",
        order: 1,
        instruction: `
# Installing React Router

Before using React Router, you need to install it in your project. React Router is distributed as an npm package.

## Installation Command

\`\`\`bash
# Using npm
npm install react-router-dom

# Using yarn
yarn add react-router-dom

# Using pnpm
pnpm add react-router-dom
\`\`\`

## What is react-router-dom?

- **react-router-dom** is the web version of React Router
- It includes components specific to browser environments
- The core routing logic is in \`react-router\` (included automatically)

## Importing from React Router

After installation, you can import the components you need:

\`\`\`jsx
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
\`\`\`

## Common Imports

- \`BrowserRouter\`: The router component for web apps
- \`Routes\`: Container for all your routes
- \`Route\`: Defines a single route
- \`Link\`: Navigation component
- \`NavLink\`: Link with active state styling
- \`useNavigate\`: Hook for programmatic navigation
- \`useParams\`: Hook for accessing URL parameters

## Your Task

Create a component that imports and lists React Router components.

Create a component named \`RouterImports\` that:
1. At the top, add a comment listing the import statement:
   \`// import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';\`
2. Returns a \`<div>\` with className "router-imports"
3. Contains an \`<h2>\` with text "Core Router Components"
4. Contains a \`<ul>\` with four \`<li>\` elements listing:
   - "BrowserRouter"
   - "Routes"
   - "Route"
   - "Link"
        `,
        hint: "Add the import as a comment. Create the list structure with the four component names.",
        starterCode: `import React from 'react';

// Add your import comment here

function RouterImports() {
  // Create your component here

}

export default RouterImports;`,
        solution: `import React from 'react';

// import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

function RouterImports() {
  return (
    <div className="router-imports">
      <h2>Core Router Components</h2>
      <ul>
        <li>BrowserRouter</li>
        <li>Routes</li>
        <li>Route</li>
        <li>Link</li>
      </ul>
    </div>
  );
}

export default RouterImports;`,
        testCases: [
          {
            id: "test-1",
            description: "Should include import comment",
            testFunction: `code.includes("import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'")`,
          },
          {
            id: "test-2",
            description: "Should render div with className 'router-imports'",
            testFunction: `
              const { container } = render(<RouterImports />);
              container.querySelector('div.router-imports') !== null
            `,
          },
          {
            id: "test-3",
            description: "Should render h2 with correct text",
            testFunction: `
              const { getByText } = render(<RouterImports />);
              getByText('Core Router Components') !== null
            `,
          },
          {
            id: "test-4",
            description: "Should list all four core components",
            testFunction: `
              const { getByText } = render(<RouterImports />);
              getByText('BrowserRouter') !== null &&
              getByText('Routes') !== null &&
              getByText('Route') !== null &&
              getByText('Link') !== null
            `,
          },
        ],
        language: "jsx",
      },
    ],
  },

  // Lesson 3: BrowserRouter Setup
  {
    id: "routing-03",
    moduleId: "module-2-4",
    title: "BrowserRouter Setup",
    order: 3,
    xpReward: 200,
    difficulty: "intermediate",
    steps: [
      {
        id: "routing-03-step-1",
        order: 1,
        instruction: `
# BrowserRouter Setup

The \`BrowserRouter\` component is the foundation of React Router. It uses the HTML5 history API to keep your UI in sync with the URL.

## Basic Setup

Wrap your entire app (or the part that needs routing) with \`BrowserRouter\`:

\`\`\`jsx
import { BrowserRouter } from 'react-router-dom';
import App from './App';

function Root() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}
\`\`\`

Typically, you set this up in your main entry file (\`main.jsx\` or \`index.jsx\`).

## Why BrowserRouter?

- Creates clean URLs without hash symbols: \`/about\` not \`/#/about\`
- Uses \`window.history.pushState\` for navigation
- Requires server configuration for production (all routes should serve index.html)

## Alternative: HashRouter

For simple apps or static hosting without server config, you can use \`HashRouter\`:
\`\`\`jsx
import { HashRouter } from 'react-router-dom';
// URLs will look like: /#/about
\`\`\`

## Your Task

Create an app wrapper component with BrowserRouter.

**Note:** For this exercise, we'll simulate the import. Create a component named \`AppRoot\` that:
1. Accepts a \`children\` prop
2. Returns a \`<div>\` with className "browser-router" (simulating BrowserRouter)
3. Contains a \`<div>\` with className "app-wrapper"
4. Inside app-wrapper, render the \`children\`
5. Add a comment above: \`// In real app: <BrowserRouter>\`
        `,
        hint: "This simulates wrapping your app with BrowserRouter. Accept and render children prop.",
        starterCode: `import React from 'react';

function AppRoot({ children }) {
  // Add your comment and JSX here

}

export default AppRoot;`,
        solution: `import React from 'react';

function AppRoot({ children }) {
  // In real app: <BrowserRouter>
  return (
    <div className="browser-router">
      <div className="app-wrapper">
        {children}
      </div>
    </div>
  );
}

export default AppRoot;`,
        testCases: [
          {
            id: "test-1",
            description: "Should include the BrowserRouter comment",
            testFunction: `code.includes('In real app: <BrowserRouter>')`,
          },
          {
            id: "test-2",
            description: "Should accept children prop",
            testFunction: `code.includes('children')`,
          },
          {
            id: "test-3",
            description: "Should render div with className 'browser-router'",
            testFunction: `
              const { container } = render(<AppRoot><div>Test</div></AppRoot>);
              container.querySelector('div.browser-router') !== null
            `,
          },
          {
            id: "test-4",
            description: "Should render div with className 'app-wrapper'",
            testFunction: `
              const { container } = render(<AppRoot><div>Test</div></AppRoot>);
              container.querySelector('div.app-wrapper') !== null
            `,
          },
          {
            id: "test-5",
            description: "Should render children inside app-wrapper",
            testFunction: `
              const { getByText } = render(<AppRoot><p>Child Content</p></AppRoot>);
              getByText('Child Content') !== null
            `,
          },
        ],
        language: "jsx",
      },
    ],
  },

  // Lesson 4: Route Component
  {
    id: "routing-04",
    moduleId: "module-2-4",
    title: "Route Component",
    order: 4,
    xpReward: 200,
    difficulty: "intermediate",
    steps: [
      {
        id: "routing-04-step-1",
        order: 1,
        instruction: `
# Route Component

The \`Route\` component defines which component to render for a specific URL path. In React Router v6+, routes use the \`element\` prop to specify the component.

## Basic Route Syntax

\`\`\`jsx
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
    </Routes>
  );
}
\`\`\`

## Key Points

- \`path\`: The URL pattern to match
- \`element\`: The component to render when path matches
- All \`Route\` components must be wrapped in a \`Routes\` component
- Only the first matching route renders (automatic exact matching in v6)

## Path Matching

- \`path="/"\` matches the root URL
- \`path="/about"\` matches exactly /about
- \`path="/users/:id"\` matches dynamic segments (we'll cover this later)
- \`path="*"\` matches any unmatched routes (useful for 404 pages)

## Your Task

Create a simple routing setup with three routes.

Create a component named \`AppRoutes\` that:
1. Returns a \`<div>\` with className "routes-container"
2. Inside, create a \`<div>\` with className "route" and data-path="/"
   - Contains text "Home Page"
3. Create another \`<div>\` with className "route" and data-path="/about"
   - Contains text "About Page"
4. Create another \`<div>\` with className "route" and data-path="/contact"
   - Contains text "Contact Page"

**Note:** We're simulating routes with divs. In a real app, you'd use \`<Routes>\` and \`<Route>\`.
        `,
        hint: "Create three divs with className 'route' and data-path attributes. Each should display its page name.",
        starterCode: `import React from 'react';

function AppRoutes() {
  return (
    <div className="routes-container">
      {/* Create your three route divs here */}

    </div>
  );
}

export default AppRoutes;`,
        solution: `import React from 'react';

function AppRoutes() {
  return (
    <div className="routes-container">
      <div className="route" data-path="/">
        Home Page
      </div>
      <div className="route" data-path="/about">
        About Page
      </div>
      <div className="route" data-path="/contact">
        Contact Page
      </div>
    </div>
  );
}

export default AppRoutes;`,
        testCases: [
          {
            id: "test-1",
            description: "Should render routes-container div",
            testFunction: `
              const { container } = render(<AppRoutes />);
              container.querySelector('div.routes-container') !== null
            `,
          },
          {
            id: "test-2",
            description: "Should render three route divs",
            testFunction: `
              const { container } = render(<AppRoutes />);
              const routes = container.querySelectorAll('div.route');
              routes.length === 3
            `,
          },
          {
            id: "test-3",
            description: "Home route should have correct path and text",
            testFunction: `
              const { container } = render(<AppRoutes />);
              const route = container.querySelector('[data-path="/"]');
              route !== null && route.textContent.trim() === 'Home Page'
            `,
          },
          {
            id: "test-4",
            description: "About route should have correct path and text",
            testFunction: `
              const { container } = render(<AppRoutes />);
              const route = container.querySelector('[data-path="/about"]');
              route !== null && route.textContent.trim() === 'About Page'
            `,
          },
          {
            id: "test-5",
            description: "Contact route should have correct path and text",
            testFunction: `
              const { container } = render(<AppRoutes />);
              const route = container.querySelector('[data-path="/contact"]');
              route !== null && route.textContent.trim() === 'Contact Page'
            `,
          },
        ],
        language: "jsx",
      },
    ],
  },

  // Lesson 5: Link Component
  {
    id: "routing-05",
    moduleId: "module-2-4",
    title: "Link Component",
    order: 5,
    xpReward: 200,
    difficulty: "intermediate",
    steps: [
      {
        id: "routing-05-step-1",
        order: 1,
        instruction: `
# Link Component

The \`Link\` component creates navigation links that work with React Router. Unlike regular \`<a>\` tags, Link prevents full page reloads.

## Why Link vs <a>?

**Bad (causes page reload):**
\`\`\`jsx
<a href="/about">About</a>
\`\`\`

**Good (client-side navigation):**
\`\`\`jsx
import { Link } from 'react-router-dom';

<Link to="/about">About</Link>
\`\`\`

## Link Syntax

\`\`\`jsx
function Navigation() {
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>
      <Link to="/contact">Contact</Link>
    </nav>
  );
}
\`\`\`

## Key Props

- \`to\`: The destination path (required)
- \`className\`: CSS classes
- \`style\`: Inline styles
- \`replace\`: Replace current history entry instead of adding new one

## Link vs NavLink

- \`Link\`: Basic navigation link
- \`NavLink\`: Link with active state styling (we'll cover next)

## Your Task

Create a navigation component with links.

Create a component named \`Navigation\` that:
1. Returns a \`<nav>\` with className "main-nav"
2. Contains a \`<ul>\` with className "nav-list"
3. Inside the ul, create three \`<li>\` elements, each containing an \`<a>\` tag:
   - First link: href="/" with text "Home"
   - Second link: href="/about" with text "About"
   - Third link: href="/services" with text "Services"
4. Each \`<a>\` should have className "nav-link"

**Note:** In a real app, you'd use \`<Link to="...">\` instead of \`<a href="...">\`.
        `,
        hint: "Create a nav with a ul containing three li elements. Each li has an anchor tag with className 'nav-link'.",
        starterCode: `import React from 'react';

function Navigation() {
  return (
    // Create your navigation here

  );
}

export default Navigation;`,
        solution: `import React from 'react';

function Navigation() {
  return (
    <nav className="main-nav">
      <ul className="nav-list">
        <li>
          <a href="/" className="nav-link">Home</a>
        </li>
        <li>
          <a href="/about" className="nav-link">About</a>
        </li>
        <li>
          <a href="/services" className="nav-link">Services</a>
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;`,
        testCases: [
          {
            id: "test-1",
            description: "Should render nav with className 'main-nav'",
            testFunction: `
              const { container } = render(<Navigation />);
              container.querySelector('nav.main-nav') !== null
            `,
          },
          {
            id: "test-2",
            description: "Should render ul with className 'nav-list'",
            testFunction: `
              const { container } = render(<Navigation />);
              container.querySelector('ul.nav-list') !== null
            `,
          },
          {
            id: "test-3",
            description: "Should render three list items",
            testFunction: `
              const { container } = render(<Navigation />);
              const items = container.querySelectorAll('li');
              items.length === 3
            `,
          },
          {
            id: "test-4",
            description: "All links should have className 'nav-link'",
            testFunction: `
              const { container } = render(<Navigation />);
              const links = container.querySelectorAll('a.nav-link');
              links.length === 3
            `,
          },
          {
            id: "test-5",
            description: "Links should have correct hrefs and text",
            testFunction: `
              const { container } = render(<Navigation />);
              const homeLink = container.querySelector('a[href="/"]');
              const aboutLink = container.querySelector('a[href="/about"]');
              const servicesLink = container.querySelector('a[href="/services"]');
              homeLink.textContent === 'Home' &&
              aboutLink.textContent === 'About' &&
              servicesLink.textContent === 'Services'
            `,
          },
        ],
        language: "jsx",
      },
    ],
  },

  // Lesson 6: NavLink Component
  {
    id: "routing-06",
    moduleId: "module-2-4",
    title: "NavLink Component",
    order: 6,
    xpReward: 250,
    difficulty: "intermediate",
    steps: [
      {
        id: "routing-06-step-1",
        order: 1,
        instruction: `
# NavLink Component

\`NavLink\` is like \`Link\`, but it adds an "active" class to the link when its route is active. This is perfect for navigation menus where you want to highlight the current page.

## NavLink vs Link

\`\`\`jsx
import { NavLink } from 'react-router-dom';

// Automatically gets 'active' class when route matches
<NavLink to="/about">About</NavLink>

// When on /about, renders as:
// <a href="/about" class="active">About</a>
\`\`\`

## Styling Active Links

**CSS approach:**
\`\`\`css
.nav-link {
  color: gray;
}

.nav-link.active {
  color: blue;
  font-weight: bold;
}
\`\`\`

**Inline style approach:**
\`\`\`jsx
<NavLink
  to="/about"
  style={({ isActive }) => ({
    color: isActive ? 'blue' : 'gray'
  })}
>
  About
</NavLink>
\`\`\`

**ClassName function approach:**
\`\`\`jsx
<NavLink
  to="/about"
  className={({ isActive }) =>
    isActive ? 'nav-link active' : 'nav-link'
  }
>
  About
</NavLink>
\`\`\`

## Your Task

Create a navigation component that shows active state.

Create a component named \`ActiveNav\` that:
1. Accepts props: \`currentPath\` (string)
2. Returns a \`<nav>\` with className "active-nav"
3. Contains three \`<a>\` tags:
   - href="/" with text "Home"
   - href="/products" with text "Products"
   - href="/contact" with text "Contact"
4. Each link should have className "nav-item"
5. Add className "active" to the link that matches currentPath
   - Example: if currentPath is "/products", the Products link gets both "nav-item" and "active" classes

**Hint:** Use template literals to conditionally add the active class.
        `,
        hint: "Use a ternary or template literal to add 'active' class: className={href === currentPath ? 'nav-item active' : 'nav-item'}",
        starterCode: `import React from 'react';

function ActiveNav({ currentPath }) {
  return (
    <nav className="active-nav">
      {/* Create your three links with conditional active class */}

    </nav>
  );
}

export default ActiveNav;`,
        solution: `import React from 'react';

function ActiveNav({ currentPath }) {
  return (
    <nav className="active-nav">
      <a
        href="/"
        className={currentPath === '/' ? 'nav-item active' : 'nav-item'}
      >
        Home
      </a>
      <a
        href="/products"
        className={currentPath === '/products' ? 'nav-item active' : 'nav-item'}
      >
        Products
      </a>
      <a
        href="/contact"
        className={currentPath === '/contact' ? 'nav-item active' : 'nav-item'}
      >
        Contact
      </a>
    </nav>
  );
}

export default ActiveNav;`,
        testCases: [
          {
            id: "test-1",
            description: "Should render nav with className 'active-nav'",
            testFunction: `
              const { container } = render(<ActiveNav currentPath="/" />);
              container.querySelector('nav.active-nav') !== null
            `,
          },
          {
            id: "test-2",
            description: "Should render three links",
            testFunction: `
              const { container } = render(<ActiveNav currentPath="/" />);
              const links = container.querySelectorAll('a');
              links.length === 3
            `,
          },
          {
            id: "test-3",
            description: "Home link should be active when currentPath is '/'",
            testFunction: `
              const { container } = render(<ActiveNav currentPath="/" />);
              const homeLink = container.querySelector('a[href="/"]');
              homeLink.classList.contains('active')
            `,
          },
          {
            id: "test-4",
            description: "Products link should be active when currentPath is '/products'",
            testFunction: `
              const { container } = render(<ActiveNav currentPath="/products" />);
              const productsLink = container.querySelector('a[href="/products"]');
              productsLink.classList.contains('active')
            `,
          },
          {
            id: "test-5",
            description: "Only one link should be active at a time",
            testFunction: `
              const { container } = render(<ActiveNav currentPath="/contact" />);
              const activeLinks = container.querySelectorAll('a.active');
              activeLinks.length === 1
            `,
          },
          {
            id: "test-6",
            description: "All links should have className 'nav-item'",
            testFunction: `
              const { container } = render(<ActiveNav currentPath="/" />);
              const navItems = container.querySelectorAll('a.nav-item');
              navItems.length === 3
            `,
          },
        ],
        language: "jsx",
      },
    ],
  },

  // Lesson 7: URL Parameters
  {
    id: "routing-07",
    moduleId: "module-2-4",
    title: "URL Parameters",
    order: 7,
    xpReward: 250,
    difficulty: "intermediate",
    steps: [
      {
        id: "routing-07-step-1",
        order: 1,
        instruction: `
# URL Parameters

URL parameters (also called dynamic segments) allow you to create routes that match patterns and extract values from the URL.

## Defining Dynamic Routes

Use a colon \`:\` to define a parameter in your route path:

\`\`\`jsx
<Route path="/users/:userId" element={<UserProfile />} />
<Route path="/products/:category/:id" element={<Product />} />
\`\`\`

## URL Examples

- \`/users/123\` matches \`/users/:userId\` (userId = "123")
- \`/users/abc\` matches \`/users/:userId\` (userId = "abc")
- \`/products/electronics/456\` matches \`/products/:category/:id\`

## Common Use Cases

**User profiles:**
\`\`\`jsx
<Route path="/profile/:username" element={<Profile />} />
// Matches: /profile/john, /profile/jane
\`\`\`

**Blog posts:**
\`\`\`jsx
<Route path="/blog/:slug" element={<BlogPost />} />
// Matches: /blog/intro-to-react, /blog/hooks-explained
\`\`\`

**Product pages:**
\`\`\`jsx
<Route path="/products/:id" element={<ProductDetail />} />
// Matches: /products/123, /products/xyz
\`\`\`

## Your Task

Create a component that demonstrates dynamic route patterns.

Create a component named \`RoutePatterns\` that:
1. Returns a \`<div>\` with className "route-patterns"
2. Contains an \`<h2>\` with text "Dynamic Route Patterns"
3. Contains a \`<ul>\` with three \`<li>\` elements:
   - "/users/:id"
   - "/posts/:slug"
   - "/products/:category/:id"
4. Each li should have className "pattern"
        `,
        hint: "Create a simple list showing route pattern examples with colons for parameters.",
        starterCode: `import React from 'react';

function RoutePatterns() {
  return (
    // Create your component here

  );
}

export default RoutePatterns;`,
        solution: `import React from 'react';

function RoutePatterns() {
  return (
    <div className="route-patterns">
      <h2>Dynamic Route Patterns</h2>
      <ul>
        <li className="pattern">/users/:id</li>
        <li className="pattern">/posts/:slug</li>
        <li className="pattern">/products/:category/:id</li>
      </ul>
    </div>
  );
}

export default RoutePatterns;`,
        testCases: [
          {
            id: "test-1",
            description: "Should render div with className 'route-patterns'",
            testFunction: `
              const { container } = render(<RoutePatterns />);
              container.querySelector('div.route-patterns') !== null
            `,
          },
          {
            id: "test-2",
            description: "Should render h2 with correct text",
            testFunction: `
              const { getByText } = render(<RoutePatterns />);
              getByText('Dynamic Route Patterns') !== null
            `,
          },
          {
            id: "test-3",
            description: "Should render three list items with className 'pattern'",
            testFunction: `
              const { container } = render(<RoutePatterns />);
              const patterns = container.querySelectorAll('li.pattern');
              patterns.length === 3
            `,
          },
          {
            id: "test-4",
            description: "Should display all three route patterns",
            testFunction: `
              const { getByText } = render(<RoutePatterns />);
              getByText('/users/:id') !== null &&
              getByText('/posts/:slug') !== null &&
              getByText('/products/:category/:id') !== null
            `,
          },
        ],
        language: "jsx",
      },
    ],
  },

  // Lesson 8: useParams Hook
  {
    id: "routing-08",
    moduleId: "module-2-4",
    title: "useParams Hook",
    order: 8,
    xpReward: 300,
    difficulty: "intermediate",
    steps: [
      {
        id: "routing-08-step-1",
        order: 1,
        instruction: `
# useParams Hook

The \`useParams\` hook lets you access URL parameters from inside your components. It returns an object containing all dynamic segments from the current URL.

## Basic Usage

\`\`\`jsx
import { useParams } from 'react-router-dom';

// Route: <Route path="/users/:userId" element={<UserProfile />} />

function UserProfile() {
  const { userId } = useParams();

  return <h1>User ID: {userId}</h1>;
}

// When URL is /users/123, userId will be "123"
\`\`\`

## Multiple Parameters

\`\`\`jsx
// Route: <Route path="/blog/:category/:postId" element={<BlogPost />} />

function BlogPost() {
  const { category, postId } = useParams();

  return (
    <div>
      <p>Category: {category}</p>
      <p>Post ID: {postId}</p>
    </div>
  );
}

// URL: /blog/tech/456
// category = "tech", postId = "456"
\`\`\`

## Important Notes

- All parameter values are **strings**
- If you need a number, convert it: \`Number(userId)\` or \`parseInt(userId)\`
- Parameters are always returned as an object
- Missing parameters return \`undefined\`

## Your Task

Create a component that uses URL parameters.

Create a component named \`UserProfile\` that:
1. Accepts props: \`params\` (object with id and username properties)
2. Destructures \`id\` and \`username\` from params
3. Returns a \`<div>\` with className "user-profile"
4. Contains an \`<h1>\` with text "User Profile"
5. Contains a \`<p>\` with className "user-id" showing "ID: {id}"
6. Contains a \`<p>\` with className "username" showing "Username: {username}"

**Note:** In a real app, you'd use \`const params = useParams()\` instead of receiving params as a prop.
        `,
        hint: "Destructure id and username from the params prop. Display them in separate paragraph elements.",
        starterCode: `import React from 'react';

function UserProfile({ params }) {
  // Destructure params here

  return (
    // Create your JSX here

  );
}

export default UserProfile;`,
        solution: `import React from 'react';

function UserProfile({ params }) {
  const { id, username } = params;

  return (
    <div className="user-profile">
      <h1>User Profile</h1>
      <p className="user-id">ID: {id}</p>
      <p className="username">Username: {username}</p>
    </div>
  );
}

export default UserProfile;`,
        testCases: [
          {
            id: "test-1",
            description: "Should destructure params",
            testFunction: `code.includes('id') && code.includes('username')`,
          },
          {
            id: "test-2",
            description: "Should render div with className 'user-profile'",
            testFunction: `
              const { container } = render(<UserProfile params={{ id: '123', username: 'john' }} />);
              container.querySelector('div.user-profile') !== null
            `,
          },
          {
            id: "test-3",
            description: "Should display the user ID",
            testFunction: `
              const { container } = render(<UserProfile params={{ id: '123', username: 'john' }} />);
              const idElement = container.querySelector('p.user-id');
              idElement !== null && idElement.textContent === 'ID: 123'
            `,
          },
          {
            id: "test-4",
            description: "Should display the username",
            testFunction: `
              const { container } = render(<UserProfile params={{ id: '123', username: 'john' }} />);
              const usernameElement = container.querySelector('p.username');
              usernameElement !== null && usernameElement.textContent === 'Username: john'
            `,
          },
          {
            id: "test-5",
            description: "Should work with different param values",
            testFunction: `
              const { container } = render(<UserProfile params={{ id: '456', username: 'alice' }} />);
              const idElement = container.querySelector('p.user-id');
              const usernameElement = container.querySelector('p.username');
              idElement.textContent === 'ID: 456' && usernameElement.textContent === 'Username: alice'
            `,
          },
        ],
        language: "jsx",
      },
    ],
  },

  // Lesson 9: useNavigate Hook
  {
    id: "routing-09",
    moduleId: "module-2-4",
    title: "useNavigate Hook",
    order: 9,
    xpReward: 300,
    difficulty: "intermediate",
    steps: [
      {
        id: "routing-09-step-1",
        order: 1,
        instruction: `
# useNavigate Hook

The \`useNavigate\` hook provides a function for programmatic navigation. Use it when you need to navigate based on user actions or after certain events.

## Basic Usage

\`\`\`jsx
import { useNavigate } from 'react-router-dom';

function LoginForm() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // After successful login
    navigate('/dashboard');
  };

  return <form onSubmit={handleSubmit}>...</form>;
}
\`\`\`

## Navigate Options

**Go to a path:**
\`\`\`jsx
navigate('/home');
\`\`\`

**Go back:**
\`\`\`jsx
navigate(-1);  // Go back one page
navigate(-2);  // Go back two pages
\`\`\`

**Replace history (no back button):**
\`\`\`jsx
navigate('/home', { replace: true });
\`\`\`

**Navigate with state:**
\`\`\`jsx
navigate('/profile', { state: { from: 'login' } });
\`\`\`

## Common Use Cases

- Redirecting after form submission
- Navigating after authentication
- Going back to previous page
- Redirecting based on conditions

## Your Task

Create a component with programmatic navigation.

Create a component named \`NavigationButtons\` that:
1. Accepts props: \`onNavigate\` (function)
2. Returns a \`<div>\` with className "navigation-buttons"
3. Contains three buttons:
   - Button 1: text "Go Home" that calls \`onNavigate('/')\` on click
   - Button 2: text "Go to Profile" that calls \`onNavigate('/profile')\` on click
   - Button 3: text "Go Back" that calls \`onNavigate(-1)\` on click
4. Each button should have className "nav-button"

**Note:** In a real app, you'd use \`const navigate = useNavigate()\` instead of receiving onNavigate as a prop.
        `,
        hint: "Create three buttons that call onNavigate with different arguments. Use onClick handlers.",
        starterCode: `import React from 'react';

function NavigationButtons({ onNavigate }) {
  return (
    // Create your component here

  );
}

export default NavigationButtons;`,
        solution: `import React from 'react';

function NavigationButtons({ onNavigate }) {
  return (
    <div className="navigation-buttons">
      <button className="nav-button" onClick={() => onNavigate('/')}>
        Go Home
      </button>
      <button className="nav-button" onClick={() => onNavigate('/profile')}>
        Go to Profile
      </button>
      <button className="nav-button" onClick={() => onNavigate(-1)}>
        Go Back
      </button>
    </div>
  );
}

export default NavigationButtons;`,
        testCases: [
          {
            id: "test-1",
            description: "Should render div with className 'navigation-buttons'",
            testFunction: `
              const { container } = render(<NavigationButtons onNavigate={() => {}} />);
              container.querySelector('div.navigation-buttons') !== null
            `,
          },
          {
            id: "test-2",
            description: "Should render three buttons",
            testFunction: `
              const { container } = render(<NavigationButtons onNavigate={() => {}} />);
              const buttons = container.querySelectorAll('button.nav-button');
              buttons.length === 3
            `,
          },
          {
            id: "test-3",
            description: "Go Home button should call onNavigate with '/'",
            testFunction: `
              let called = false;
              let arg = null;
              const mockNavigate = (path) => { called = true; arg = path; };
              const { getByText } = render(<NavigationButtons onNavigate={mockNavigate} />);
              const button = getByText('Go Home');
              button.click();
              called && arg === '/'
            `,
          },
          {
            id: "test-4",
            description: "Go to Profile button should call onNavigate with '/profile'",
            testFunction: `
              let arg = null;
              const mockNavigate = (path) => { arg = path; };
              const { getByText } = render(<NavigationButtons onNavigate={mockNavigate} />);
              const button = getByText('Go to Profile');
              button.click();
              arg === '/profile'
            `,
          },
          {
            id: "test-5",
            description: "Go Back button should call onNavigate with -1",
            testFunction: `
              let arg = null;
              const mockNavigate = (path) => { arg = path; };
              const { getByText } = render(<NavigationButtons onNavigate={mockNavigate} />);
              const button = getByText('Go Back');
              button.click();
              arg === -1
            `,
          },
        ],
        language: "jsx",
      },
    ],
  },

  // Lesson 10: Nested Routes
  {
    id: "routing-10",
    moduleId: "module-2-4",
    title: "Nested Routes",
    order: 10,
    xpReward: 300,
    difficulty: "intermediate",
    steps: [
      {
        id: "routing-10-step-1",
        order: 1,
        instruction: `
# Nested Routes

Nested routes allow you to render routes within routes, creating hierarchical page structures. This is perfect for layouts with persistent navigation and changing content areas.

## Basic Nested Routes

\`\`\`jsx
import { Routes, Route, Outlet } from 'react-router-dom';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
      </Route>
    </Routes>
  );
}

function Layout() {
  return (
    <div>
      <nav>Navigation here</nav>
      <Outlet />  {/* Child routes render here */}
    </div>
  );
}
\`\`\`

## The Outlet Component

\`<Outlet />\` is a placeholder that renders the matched child route. Without it, nested routes won't appear.

## Index Route

The \`index\` route renders when the parent route is matched exactly:
\`\`\`jsx
<Route path="/dashboard" element={<Dashboard />}>
  <Route index element={<Overview />} />  {/* Renders at /dashboard */}
  <Route path="stats" element={<Stats />} />  {/* Renders at /dashboard/stats */}
</Route>
\`\`\`

## Your Task

Create a layout component for nested routes.

Create a component named \`DashboardLayout\` that:
1. Accepts props: \`children\`
2. Returns a \`<div>\` with className "dashboard-layout"
3. Contains a \`<header>\` with className "dashboard-header"
   - Inside header: \`<h1>\` with text "Dashboard"
4. Contains a \`<nav>\` with className "dashboard-nav"
   - Inside nav: \`<p>\` with text "Navigation"
5. Contains a \`<main>\` with className "dashboard-content"
   - Inside main: render the \`children\` prop
6. Contains a \`<footer>\` with className "dashboard-footer"
   - Inside footer: \`<p>\` with text "Footer"

**Note:** In a real app, children would be replaced with \`<Outlet />\` for nested routes.
        `,
        hint: "Create a layout structure with header, nav, main (with children), and footer sections.",
        starterCode: `import React from 'react';

function DashboardLayout({ children }) {
  return (
    // Create your layout structure here

  );
}

export default DashboardLayout;`,
        solution: `import React from 'react';

function DashboardLayout({ children }) {
  return (
    <div className="dashboard-layout">
      <header className="dashboard-header">
        <h1>Dashboard</h1>
      </header>
      <nav className="dashboard-nav">
        <p>Navigation</p>
      </nav>
      <main className="dashboard-content">
        {children}
      </main>
      <footer className="dashboard-footer">
        <p>Footer</p>
      </footer>
    </div>
  );
}

export default DashboardLayout;`,
        testCases: [
          {
            id: "test-1",
            description: "Should render div with className 'dashboard-layout'",
            testFunction: `
              const { container } = render(<DashboardLayout><div>Content</div></DashboardLayout>);
              container.querySelector('div.dashboard-layout') !== null
            `,
          },
          {
            id: "test-2",
            description: "Should render header with h1",
            testFunction: `
              const { container } = render(<DashboardLayout><div>Content</div></DashboardLayout>);
              const header = container.querySelector('header.dashboard-header');
              const h1 = header.querySelector('h1');
              header !== null && h1 !== null && h1.textContent === 'Dashboard'
            `,
          },
          {
            id: "test-3",
            description: "Should render nav with Navigation text",
            testFunction: `
              const { container } = render(<DashboardLayout><div>Content</div></DashboardLayout>);
              const nav = container.querySelector('nav.dashboard-nav');
              nav !== null && nav.textContent.includes('Navigation')
            `,
          },
          {
            id: "test-4",
            description: "Should render main with children",
            testFunction: `
              const { container, getByText } = render(
                <DashboardLayout>
                  <div>Test Content</div>
                </DashboardLayout>
              );
              const main = container.querySelector('main.dashboard-content');
              main !== null && getByText('Test Content') !== null
            `,
          },
          {
            id: "test-5",
            description: "Should render footer with Footer text",
            testFunction: `
              const { container } = render(<DashboardLayout><div>Content</div></DashboardLayout>);
              const footer = container.querySelector('footer.dashboard-footer');
              footer !== null && footer.textContent.includes('Footer')
            `,
          },
        ],
        language: "jsx",
      },
    ],
  },

  // Lesson 11: Protected Routes
  {
    id: "routing-11",
    moduleId: "module-2-4",
    title: "Protected Routes",
    order: 11,
    xpReward: 300,
    difficulty: "intermediate",
    steps: [
      {
        id: "routing-11-step-1",
        order: 1,
        instruction: `
# Protected Routes

Protected routes (also called private routes) restrict access to certain pages based on authentication status. Users who aren't logged in are redirected to a login page.

## Creating a Protected Route Component

\`\`\`jsx
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ isAuthenticated, children }) {
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
\`\`\`

## Using Protected Routes

\`\`\`jsx
<Routes>
  <Route path="/login" element={<Login />} />
  <Route
    path="/dashboard"
    element={
      <ProtectedRoute isAuthenticated={user.isLoggedIn}>
        <Dashboard />
      </ProtectedRoute>
    }
  />
</Routes>
\`\`\`

## Real-World Example

\`\`\`jsx
function App() {
  const { user } = useAuth();

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/profile"
        element={
          <ProtectedRoute isAuthenticated={user?.isLoggedIn}>
            <Profile />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}
\`\`\`

## Your Task

Create a protected route component.

Create a component named \`ProtectedRoute\` that:
1. Accepts props: \`isAuthenticated\` (boolean) and \`children\`
2. If \`isAuthenticated\` is false:
   - Return a \`<div>\` with className "redirect-message"
   - Contains text "Redirecting to login..."
3. If \`isAuthenticated\` is true:
   - Return a \`<div>\` with className "protected-content"
   - Render the \`children\` inside

**Note:** In a real app, you'd use \`<Navigate to="/login" replace />\` instead of showing a message.
        `,
        hint: "Use an if statement to check isAuthenticated. Return different divs based on the condition.",
        starterCode: `import React from 'react';

function ProtectedRoute({ isAuthenticated, children }) {
  // Add your logic here

}

export default ProtectedRoute;`,
        solution: `import React from 'react';

function ProtectedRoute({ isAuthenticated, children }) {
  if (!isAuthenticated) {
    return (
      <div className="redirect-message">
        Redirecting to login...
      </div>
    );
  }

  return (
    <div className="protected-content">
      {children}
    </div>
  );
}

export default ProtectedRoute;`,
        testCases: [
          {
            id: "test-1",
            description: "Should show redirect message when not authenticated",
            testFunction: `
              const { container, getByText } = render(
                <ProtectedRoute isAuthenticated={false}>
                  <div>Protected Content</div>
                </ProtectedRoute>
              );
              const redirectDiv = container.querySelector('div.redirect-message');
              redirectDiv !== null && getByText('Redirecting to login...') !== null
            `,
          },
          {
            id: "test-2",
            description: "Should render children when authenticated",
            testFunction: `
              const { container, getByText } = render(
                <ProtectedRoute isAuthenticated={true}>
                  <div>Protected Content</div>
                </ProtectedRoute>
              );
              const contentDiv = container.querySelector('div.protected-content');
              contentDiv !== null && getByText('Protected Content') !== null
            `,
          },
          {
            id: "test-3",
            description: "Should NOT render children when not authenticated",
            testFunction: `
              const { queryByText } = render(
                <ProtectedRoute isAuthenticated={false}>
                  <div>Protected Content</div>
                </ProtectedRoute>
              );
              queryByText('Protected Content') === null
            `,
          },
          {
            id: "test-4",
            description: "Should NOT show redirect message when authenticated",
            testFunction: `
              const { queryByText } = render(
                <ProtectedRoute isAuthenticated={true}>
                  <div>Protected Content</div>
                </ProtectedRoute>
              );
              queryByText('Redirecting to login...') === null
            `,
          },
        ],
        language: "jsx",
      },
    ],
  },

  // Lesson 12: 404 Pages
  {
    id: "routing-12",
    moduleId: "module-2-4",
    title: "404 Not Found Pages",
    order: 12,
    xpReward: 250,
    difficulty: "intermediate",
    steps: [
      {
        id: "routing-12-step-1",
        order: 1,
        instruction: `
# 404 Not Found Pages

A 404 page (Not Found) is shown when users try to access a route that doesn't exist. React Router makes it easy to create catch-all routes for unmatched URLs.

## Creating a Catch-All Route

Use \`path="*"\` to match any route that wasn't matched by previous routes:

\`\`\`jsx
<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/about" element={<About />} />
  <Route path="/contact" element={<Contact />} />
  <Route path="*" element={<NotFound />} />
</Routes>
\`\`\`

The \`*\` wildcard must be the **last route** because routes are matched in order.

## NotFound Component Example

\`\`\`jsx
import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div className="not-found">
      <h1>404</h1>
      <h2>Page Not Found</h2>
      <p>The page you're looking for doesn't exist.</p>
      <Link to="/">Go Home</Link>
    </div>
  );
}
\`\`\`

## Best Practices

- Make 404 pages helpful and friendly
- Include a link back to the home page
- Consider adding navigation or search
- Use consistent branding and styling

## Your Task

Create a 404 Not Found page component.

Create a component named \`NotFound\` that:
1. Returns a \`<div>\` with className "not-found"
2. Contains an \`<h1>\` with className "error-code" displaying "404"
3. Contains an \`<h2>\` with text "Page Not Found"
4. Contains a \`<p>\` with className "error-message" displaying:
   "Sorry, the page you're looking for doesn't exist."
5. Contains an \`<a>\` with href="/" and className "home-link" with text "Go to Home"
        `,
        hint: "Create a structured error page with heading, message, and a link to home.",
        starterCode: `import React from 'react';

function NotFound() {
  return (
    // Create your 404 page here

  );
}

export default NotFound;`,
        solution: `import React from 'react';

function NotFound() {
  return (
    <div className="not-found">
      <h1 className="error-code">404</h1>
      <h2>Page Not Found</h2>
      <p className="error-message">
        Sorry, the page you're looking for doesn't exist.
      </p>
      <a href="/" className="home-link">Go to Home</a>
    </div>
  );
}

export default NotFound;`,
        testCases: [
          {
            id: "test-1",
            description: "Should render div with className 'not-found'",
            testFunction: `
              const { container } = render(<NotFound />);
              container.querySelector('div.not-found') !== null
            `,
          },
          {
            id: "test-2",
            description: "Should display 404 in h1 with className 'error-code'",
            testFunction: `
              const { container } = render(<NotFound />);
              const h1 = container.querySelector('h1.error-code');
              h1 !== null && h1.textContent === '404'
            `,
          },
          {
            id: "test-3",
            description: "Should display 'Page Not Found' in h2",
            testFunction: `
              const { getByText } = render(<NotFound />);
              const h2 = getByText('Page Not Found');
              h2 !== null && h2.tagName === 'H2'
            `,
          },
          {
            id: "test-4",
            description: "Should display error message in paragraph",
            testFunction: `
              const { container } = render(<NotFound />);
              const p = container.querySelector('p.error-message');
              p !== null && p.textContent.includes("Sorry, the page you're looking for doesn't exist")
            `,
          },
          {
            id: "test-5",
            description: "Should have a home link",
            testFunction: `
              const { container } = render(<NotFound />);
              const link = container.querySelector('a.home-link');
              link !== null && link.getAttribute('href') === '/' && link.textContent === 'Go to Home'
            `,
          },
        ],
        language: "jsx",
      },
    ],
  },

  // Lesson 13: Programmatic Navigation
  {
    id: "routing-13",
    moduleId: "module-2-4",
    title: "Programmatic Navigation Patterns",
    order: 13,
    xpReward: 300,
    difficulty: "intermediate",
    steps: [
      {
        id: "routing-13-step-1",
        order: 1,
        instruction: `
# Programmatic Navigation Patterns

Programmatic navigation means navigating users through code rather than clicking links. This is essential for redirects after form submissions, authentication flows, and conditional navigation.

## Common Patterns

**After Form Submission:**
\`\`\`jsx
function CreatePost() {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const post = await api.createPost(data);
    navigate(\`/posts/\${post.id}\`);
  };

  return <form onSubmit={handleSubmit}>...</form>;
}
\`\`\`

**After Authentication:**
\`\`\`jsx
function Login() {
  const navigate = useNavigate();

  const handleLogin = async (credentials) => {
    const user = await auth.login(credentials);
    if (user) {
      navigate('/dashboard');
    }
  };

  return <LoginForm onSubmit={handleLogin} />;
}
\`\`\`

**Conditional Navigation:**
\`\`\`jsx
function Checkout() {
  const navigate = useNavigate();
  const { cart } = useCart();

  useEffect(() => {
    if (cart.items.length === 0) {
      navigate('/cart', { replace: true });
    }
  }, [cart, navigate]);

  return <CheckoutForm />;
}
\`\`\`

**Navigation with State:**
\`\`\`jsx
// Pass data to the next page
navigate('/profile', {
  state: { message: 'Profile updated successfully' }
});

// Access it in the destination component
function Profile() {
  const location = useLocation();
  const message = location.state?.message;

  return message && <Alert>{message}</Alert>;
}
\`\`\`

## Your Task

Create a form component with programmatic navigation.

Create a component named \`SubmitForm\` that:
1. Accepts props: \`onNavigate\` (function)
2. Returns a \`<div>\` with className "submit-form"
3. Contains a \`<form>\` with onSubmit handler that:
   - Prevents default form submission
   - Calls \`onNavigate('/success')\`
4. Form should contain:
   - An \`<input>\` with type="text", placeholder="Enter text", className="form-input"
   - A \`<button>\` with type="submit" and text "Submit"
        `,
        hint: "Create a form with onSubmit={(e) => { e.preventDefault(); onNavigate('/success'); }}. Add an input and submit button.",
        starterCode: `import React from 'react';

function SubmitForm({ onNavigate }) {
  return (
    // Create your form here

  );
}

export default SubmitForm;`,
        solution: `import React from 'react';

function SubmitForm({ onNavigate }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    onNavigate('/success');
  };

  return (
    <div className="submit-form">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter text"
          className="form-input"
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default SubmitForm;`,
        testCases: [
          {
            id: "test-1",
            description: "Should render div with className 'submit-form'",
            testFunction: `
              const { container } = render(<SubmitForm onNavigate={() => {}} />);
              container.querySelector('div.submit-form') !== null
            `,
          },
          {
            id: "test-2",
            description: "Should render a form element",
            testFunction: `
              const { container } = render(<SubmitForm onNavigate={() => {}} />);
              container.querySelector('form') !== null
            `,
          },
          {
            id: "test-3",
            description: "Should render input with correct attributes",
            testFunction: `
              const { container } = render(<SubmitForm onNavigate={() => {}} />);
              const input = container.querySelector('input.form-input');
              input !== null &&
              input.type === 'text' &&
              input.placeholder === 'Enter text'
            `,
          },
          {
            id: "test-4",
            description: "Should render submit button",
            testFunction: `
              const { getByText } = render(<SubmitForm onNavigate={() => {}} />);
              const button = getByText('Submit');
              button !== null && button.type === 'submit'
            `,
          },
          {
            id: "test-5",
            description: "Form submission should call onNavigate with '/success'",
            testFunction: `
              let navigatedTo = null;
              const mockNavigate = (path) => { navigatedTo = path; };
              const { container } = render(<SubmitForm onNavigate={mockNavigate} />);
              const form = container.querySelector('form');
              const event = new Event('submit', { bubbles: true, cancelable: true });
              form.dispatchEvent(event);
              navigatedTo === '/success'
            `,
          },
        ],
        language: "jsx",
      },
    ],
  },

  // Lesson 14: Query Parameters
  {
    id: "routing-14",
    moduleId: "module-2-4",
    title: "Query Parameters",
    order: 14,
    xpReward: 300,
    difficulty: "intermediate",
    steps: [
      {
        id: "routing-14-step-1",
        order: 1,
        instruction: `
# Query Parameters

Query parameters (also called search parameters) are key-value pairs that appear after the \`?\` in a URL. They're perfect for filters, pagination, and search functionality.

## Example URLs

- \`/products?category=electronics&sort=price\`
- \`/search?q=react&page=2\`
- \`/users?role=admin&active=true\`

## Reading Query Parameters

Use the \`useSearchParams\` hook to read and update query parameters:

\`\`\`jsx
import { useSearchParams } from 'react-router-dom';

function ProductList() {
  const [searchParams] = useSearchParams();

  const category = searchParams.get('category');  // "electronics"
  const sort = searchParams.get('sort');          // "price"

  return (
    <div>
      <h1>Category: {category}</h1>
      <p>Sorted by: {sort}</p>
    </div>
  );
}
\`\`\`

## Setting Query Parameters

\`\`\`jsx
function Filters() {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleFilterChange = (key, value) => {
    setSearchParams({ ...Object.fromEntries(searchParams), [key]: value });
  };

  return (
    <button onClick={() => handleFilterChange('category', 'books')}>
      Show Books
    </button>
  );
}
\`\`\`

## Your Task

Create a component that displays query parameters.

Create a component named \`SearchResults\` that:
1. Accepts props: \`query\` (string) and \`page\` (string)
2. Returns a \`<div>\` with className "search-results"
3. Contains an \`<h2>\` with text "Search Results"
4. Contains a \`<p>\` with className "query-display" showing "Query: {query}"
5. Contains a \`<p>\` with className "page-display" showing "Page: {page}"
6. If query is empty, show "No search query" instead
7. If page is empty, show "1" as default

**Note:** In a real app, you'd use \`const [searchParams] = useSearchParams()\` to get these values.
        `,
        hint: "Use conditional rendering to show 'No search query' when query is empty. Use 'Page: {page || \"1\"}' for the default page.",
        starterCode: `import React from 'react';

function SearchResults({ query, page }) {
  return (
    // Create your component here

  );
}

export default SearchResults;`,
        solution: `import React from 'react';

function SearchResults({ query, page }) {
  return (
    <div className="search-results">
      <h2>Search Results</h2>
      <p className="query-display">
        Query: {query || 'No search query'}
      </p>
      <p className="page-display">
        Page: {page || '1'}
      </p>
    </div>
  );
}

export default SearchResults;`,
        testCases: [
          {
            id: "test-1",
            description: "Should render div with className 'search-results'",
            testFunction: `
              const { container } = render(<SearchResults query="react" page="2" />);
              container.querySelector('div.search-results') !== null
            `,
          },
          {
            id: "test-2",
            description: "Should display the query parameter",
            testFunction: `
              const { container } = render(<SearchResults query="react" page="2" />);
              const queryP = container.querySelector('p.query-display');
              queryP !== null && queryP.textContent === 'Query: react'
            `,
          },
          {
            id: "test-3",
            description: "Should display the page parameter",
            testFunction: `
              const { container } = render(<SearchResults query="react" page="2" />);
              const pageP = container.querySelector('p.page-display');
              pageP !== null && pageP.textContent === 'Page: 2'
            `,
          },
          {
            id: "test-4",
            description: "Should show 'No search query' when query is empty",
            testFunction: `
              const { container } = render(<SearchResults query="" page="1" />);
              const queryP = container.querySelector('p.query-display');
              queryP.textContent.includes('No search query')
            `,
          },
          {
            id: "test-5",
            description: "Should default to page 1 when page is empty",
            testFunction: `
              const { container } = render(<SearchResults query="test" page="" />);
              const pageP = container.querySelector('p.page-display');
              pageP.textContent === 'Page: 1'
            `,
          },
        ],
        language: "jsx",
      },
    ],
  },

  // Lesson 15: Route Guards
  {
    id: "routing-15",
    moduleId: "module-2-4",
    title: "Route Guards",
    order: 15,
    xpReward: 300,
    difficulty: "intermediate",
    steps: [
      {
        id: "routing-15-step-1",
        order: 1,
        instruction: `
# Route Guards

Route guards are components that control access to routes based on conditions like authentication, user roles, or permissions. They're more advanced than simple protected routes.

## Role-Based Route Guard

\`\`\`jsx
function RoleGuard({ allowedRoles, userRole, children }) {
  if (!allowedRoles.includes(userRole)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
}

// Usage
<Route
  path="/admin"
  element={
    <RoleGuard allowedRoles={['admin']} userRole={user.role}>
      <AdminDashboard />
    </RoleGuard>
  }
/>
\`\`\`

## Permission-Based Guard

\`\`\`jsx
function PermissionGuard({ requiredPermission, userPermissions, children }) {
  if (!userPermissions.includes(requiredPermission)) {
    return <Navigate to="/forbidden" replace />;
  }

  return children;
}
\`\`\`

## Multi-Condition Guard

\`\`\`jsx
function AuthGuard({
  isAuthenticated,
  isEmailVerified,
  redirectTo = '/login',
  children
}) {
  if (!isAuthenticated) {
    return <Navigate to={redirectTo} replace />;
  }

  if (!isEmailVerified) {
    return <Navigate to="/verify-email" replace />;
  }

  return children;
}
\`\`\`

## Your Task

Create a role-based route guard component.

Create a component named \`RoleGuard\` that:
1. Accepts props: \`userRole\` (string), \`allowedRoles\` (array of strings), and \`children\`
2. If \`allowedRoles\` includes \`userRole\`:
   - Return a \`<div>\` with className "authorized-content"
   - Render the \`children\` inside
3. If \`userRole\` is NOT in \`allowedRoles\`:
   - Return a \`<div>\` with className "unauthorized"
   - Contains \`<h2>\` with text "Access Denied"
   - Contains \`<p>\` with text "You don't have permission to view this page."

**Note:** In a real app, you'd use \`<Navigate to="/unauthorized" replace />\` instead of showing an error message.
        `,
        hint: "Use allowedRoles.includes(userRole) to check if the user has access. Return different divs based on the condition.",
        starterCode: `import React from 'react';

function RoleGuard({ userRole, allowedRoles, children }) {
  // Add your guard logic here

}

export default RoleGuard;`,
        solution: `import React from 'react';

function RoleGuard({ userRole, allowedRoles, children }) {
  if (!allowedRoles.includes(userRole)) {
    return (
      <div className="unauthorized">
        <h2>Access Denied</h2>
        <p>You don't have permission to view this page.</p>
      </div>
    );
  }

  return (
    <div className="authorized-content">
      {children}
    </div>
  );
}

export default RoleGuard;`,
        testCases: [
          {
            id: "test-1",
            description: "Should render children when user role is allowed",
            testFunction: `
              const { container, getByText } = render(
                <RoleGuard userRole="admin" allowedRoles={['admin', 'editor']}>
                  <div>Protected Content</div>
                </RoleGuard>
              );
              const contentDiv = container.querySelector('div.authorized-content');
              contentDiv !== null && getByText('Protected Content') !== null
            `,
          },
          {
            id: "test-2",
            description: "Should show access denied when role is not allowed",
            testFunction: `
              const { container, getByText } = render(
                <RoleGuard userRole="user" allowedRoles={['admin']}>
                  <div>Protected Content</div>
                </RoleGuard>
              );
              const unauthorizedDiv = container.querySelector('div.unauthorized');
              unauthorizedDiv !== null &&
              getByText('Access Denied') !== null
            `,
          },
          {
            id: "test-3",
            description: "Should NOT render children when role is not allowed",
            testFunction: `
              const { queryByText } = render(
                <RoleGuard userRole="user" allowedRoles={['admin']}>
                  <div>Protected Content</div>
                </RoleGuard>
              );
              queryByText('Protected Content') === null
            `,
          },
          {
            id: "test-4",
            description: "Should work with multiple allowed roles",
            testFunction: `
              const { getByText } = render(
                <RoleGuard userRole="editor" allowedRoles={['admin', 'editor', 'moderator']}>
                  <div>Editor Content</div>
                </RoleGuard>
              );
              getByText('Editor Content') !== null
            `,
          },
          {
            id: "test-5",
            description: "Should show error message with correct text",
            testFunction: `
              const { getByText } = render(
                <RoleGuard userRole="guest" allowedRoles={['member']}>
                  <div>Member Content</div>
                </RoleGuard>
              );
              getByText("You don't have permission to view this page.") !== null
            `,
          },
        ],
        language: "jsx",
      },
    ],
  },
];
