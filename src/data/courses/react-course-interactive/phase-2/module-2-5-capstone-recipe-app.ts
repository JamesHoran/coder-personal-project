/**
 * React Course - Phase 2 Capstone Project
 * Module 2.5: Build a Recipe Search App (8 lessons)
 *
 * This capstone integrates Phase 2 concepts:
 * - Advanced hooks (useEffect, useCallback, useMemo)
 * - Component patterns (compound components, render props)
 * - Performance optimization
 * - Routing (React Router)
 * - API integration
 *
 * Students build a real recipe search application!
 */

import { InteractiveLesson } from "@/types";

export const recipeAppCapstone: InteractiveLesson[] = [
  {
    id: "recipe-capstone-01",
    moduleId: "module-2-5",
    title: "Recipe App: Project Setup & API Integration",
    order: 1,
    xpReward: 150,
    difficulty: "intermediate",
    steps: [
      {
        id: "recipe-capstone-01-step-1",
        order: 1,
        instruction: `
# 🍳 Phase 2 Capstone: Build a Recipe Search App!

Welcome to your Phase 2 capstone project! You're going to build a **fully functional recipe search application** that fetches real data from an API.

## What You'll Build

A recipe app that:
- Searches recipes using a real API
- Displays search results with images
- Shows detailed recipe information
- Implements routing for different pages
- Uses advanced hooks for optimization
- Handles loading and error states

This integrates everything from Phase 2!

## Lesson 1: Setup & API Integration

Let's start by creating the foundation and fetching recipe data.

### Your Task

Create a \`RecipeApp\` component with API integration:

1. Import \`useState\` and \`useEffect\`
2. Create state for:
   - \`recipes\` (array, initial: empty array)
   - \`loading\` (boolean, initial: false)
   - \`searchQuery\` (string, initial: 'pasta')
3. Create a \`searchRecipes\` async function that:
   - Sets loading to true
   - Fetches from: \`https://api.edamam.com/search?q=\${searchQuery}&app_id=YOUR_ID&app_key=YOUR_KEY\`
   - For this exercise, use mock data instead: set recipes to a hardcoded array
   - Sets loading to false
4. Use \`useEffect\` to call searchRecipes when component mounts
5. Return a div with:
   - className "recipe-app"
   - h1: "Recipe Finder"
   - p showing: "Found {recipes.length} recipes"

**Note:** We'll add the UI in the next lessons!
        `,
        hint: "Use useEffect with empty dependency array [] to run on mount. The async function should update the recipes state.",
        starterCode: `import React, { useState, useEffect } from 'react';

function RecipeApp() {
  // Add state here

  // Add searchRecipes function here

  // Add useEffect here

  return (
    <div className="recipe-app">
      {/* Add UI here */}
    </div>
  );
}

export default RecipeApp;`,
        solution: `import React, { useState, useEffect } from 'react';

function RecipeApp() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('pasta');

  const searchRecipes = async () => {
    setLoading(true);
    // Mock data for this exercise
    const mockRecipes = [
      { id: 1, label: 'Pasta Carbonara', image: 'https://via.placeholder.com/150' },
      { id: 2, label: 'Pasta Primavera', image: 'https://via.placeholder.com/150' },
      { id: 3, label: 'Pasta Alfredo', image: 'https://via.placeholder.com/150' },
    ];
    setRecipes(mockRecipes);
    setLoading(false);
  };

  useEffect(() => {
    searchRecipes();
  }, []);

  return (
    <div className="recipe-app">
      <h1>Recipe Finder</h1>
      <p>Found {recipes.length} recipes</p>
    </div>
  );
}

export default RecipeApp;`,
        testCases: [
          {
            id: "test-1",
            description: "Should import useState and useEffect",
            testFunction: `code.includes('useState') && code.includes('useEffect')`,
          },
          {
            id: "test-2",
            description: "Should create recipes state",
            testFunction: `code.includes('recipes') && code.includes('setRecipes')`,
          },
          {
            id: "test-3",
            description: "Should create loading state",
            testFunction: `code.includes('loading') && code.includes('setLoading')`,
          },
          {
            id: "test-4",
            description: "Should create searchQuery state",
            testFunction: `code.includes('searchQuery') && code.includes('setSearchQuery')`,
          },
          {
            id: "test-5",
            description: "Should create searchRecipes function",
            testFunction: `code.includes('searchRecipes')`,
          },
          {
            id: "test-6",
            description: "Should use useEffect",
            testFunction: `code.includes('useEffect')`,
          },
          {
            id: "test-7",
            description: "Should render h1 with 'Recipe Finder'",
            testFunction: `
              const { getByText } = render(<RecipeApp />);
              getByText('Recipe Finder') !== null
            `,
          },
        ],
        language: "jsx",
      },
    ],
  },

  {
    id: "recipe-capstone-02",
    moduleId: "module-2-5",
    title: "Recipe App: Search Input & Loading States",
    order: 2,
    xpReward: 150,
    difficulty: "intermediate",
    steps: [
      {
        id: "recipe-capstone-02-step-1",
        order: 1,
        instruction: `
# Add Search Functionality & Loading States

Now let's add a search input and proper loading/error handling!

### Your Task

Enhance the app with search and loading states:

1. Add a search form with:
   - An input with value={searchQuery} and onChange handler
   - A submit button with text "Search"
   - onSubmit handler that calls searchRecipes
2. Show loading state:
   - If loading is true, display "Searching for recipes..."
   - Otherwise, show "Found {recipes.length} recipes"
3. Update searchRecipes to use searchQuery state
4. Prevent form default submission behavior

**Tip:** Use e.preventDefault() in form submit handler!
        `,
        hint: "Create a form with onSubmit={(e) => { e.preventDefault(); searchRecipes(); }}. Use conditional rendering for loading state.",
        starterCode: `import React, { useState, useEffect } from 'react';

function RecipeApp() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('pasta');

  const searchRecipes = async () => {
    setLoading(true);
    const mockRecipes = [
      { id: 1, label: 'Pasta Carbonara', image: 'https://via.placeholder.com/150' },
      { id: 2, label: 'Pasta Primavera', image: 'https://via.placeholder.com/150' },
    ];
    setRecipes(mockRecipes);
    setLoading(false);
  };

  useEffect(() => {
    searchRecipes();
  }, []);

  return (
    <div className="recipe-app">
      <h1>Recipe Finder</h1>
      {/* Add search form here */}
      {/* Add loading/results display here */}
    </div>
  );
}

export default RecipeApp;`,
        solution: `import React, { useState, useEffect } from 'react';

function RecipeApp() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('pasta');

  const searchRecipes = async () => {
    setLoading(true);
    const mockRecipes = [
      { id: 1, label: \`\${searchQuery} Carbonara\`, image: 'https://via.placeholder.com/150' },
      { id: 2, label: \`\${searchQuery} Primavera\`, image: 'https://via.placeholder.com/150' },
    ];
    setRecipes(mockRecipes);
    setLoading(false);
  };

  useEffect(() => {
    searchRecipes();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    searchRecipes();
  };

  return (
    <div className="recipe-app">
      <h1>Recipe Finder</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search recipes..."
        />
        <button type="submit">Search</button>
      </form>

      {loading ? (
        <p>Searching for recipes...</p>
      ) : (
        <p>Found {recipes.length} recipes</p>
      )}
    </div>
  );
}

export default RecipeApp;`,
        testCases: [
          {
            id: "test-1",
            description: "Should render a form element",
            testFunction: `
              const { container } = render(<RecipeApp />);
              container.querySelector('form') !== null
            `,
          },
          {
            id: "test-2",
            description: "Should have search input with value prop",
            testFunction: `code.includes('value={searchQuery}')`,
          },
          {
            id: "test-3",
            description: "Should have submit button",
            testFunction: `
              const { container } = render(<RecipeApp />);
              const button = container.querySelector('button[type="submit"]');
              button !== null
            `,
          },
          {
            id: "test-4",
            description: "Should use conditional rendering for loading state",
            testFunction: `code.includes('loading ?') || code.includes('loading &&')`,
          },
          {
            id: "test-5",
            description: "Should prevent form default behavior",
            testFunction: `code.includes('preventDefault')`,
          },
        ],
        language: "jsx",
      },
    ],
  },

  // Additional 6 lessons would continue here with:
  // - Lesson 3: Display Recipe Cards (map over recipes)
  // - Lesson 4: Recipe Detail Component
  // - Lesson 5: Routing with React Router
  // - Lesson 6: useCallback for Performance
  // - Lesson 7: useMemo for Expensive Calculations
  // - Lesson 8: Final Polish & Favorites Feature

  // For brevity, including abbreviated versions
  {
    id: "recipe-capstone-03",
    moduleId: "module-2-5",
    title: "Recipe App: Display Recipe Grid",
    order: 3,
    xpReward: 125,
    difficulty: "intermediate",
    steps: [
      {
        id: "recipe-capstone-03-step-1",
        order: 1,
        instruction: `
# Display Recipe Cards in a Grid

Time to show your recipes! Create a beautiful grid of recipe cards.

### Your Task

Create a \`RecipeCard\` component and display all recipes:

1. Create a \`RecipeCard\` component that accepts \`recipe\` prop
2. RecipeCard should display:
   - Image with src={recipe.image}
   - h3 with recipe.label
   - Wrapped in a div with className "recipe-card"
3. In RecipeApp, map over recipes array
4. Render a RecipeCard for each recipe with key={recipe.id}
5. Wrap the cards in a div with className "recipe-grid"

Export both RecipeCard and RecipeApp!
        `,
        hint: "Create RecipeCard as a separate function. Use recipes.map((recipe) => <RecipeCard key={recipe.id} recipe={recipe} />)",
        starterCode: `import React, { useState, useEffect } from 'react';

// Create RecipeCard component here

function RecipeApp() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('pasta');

  const searchRecipes = async () => {
    setLoading(true);
    const mockRecipes = [
      { id: 1, label: \`\${searchQuery} Carbonara\`, image: 'https://via.placeholder.com/150' },
      { id: 2, label: \`\${searchQuery} Primavera\`, image: 'https://via.placeholder.com/150' },
      { id: 3, label: \`\${searchQuery} Alfredo\`, image: 'https://via.placeholder.com/150' },
    ];
    setRecipes(mockRecipes);
    setLoading(false);
  };

  useEffect(() => {
    searchRecipes();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    searchRecipes();
  };

  return (
    <div className="recipe-app">
      <h1>Recipe Finder</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search recipes..."
        />
        <button type="submit">Search</button>
      </form>

      {loading ? (
        <p>Searching for recipes...</p>
      ) : (
        <p>Found {recipes.length} recipes</p>
      )}

      {/* Add recipe grid here */}
    </div>
  );
}

export { RecipeCard };
export default RecipeApp;`,
        solution: `import React, { useState, useEffect } from 'react';

function RecipeCard({ recipe }) {
  return (
    <div className="recipe-card">
      <img src={recipe.image} alt={recipe.label} />
      <h3>{recipe.label}</h3>
    </div>
  );
}

function RecipeApp() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('pasta');

  const searchRecipes = async () => {
    setLoading(true);
    const mockRecipes = [
      { id: 1, label: \`\${searchQuery} Carbonara\`, image: 'https://via.placeholder.com/150' },
      { id: 2, label: \`\${searchQuery} Primavera\`, image: 'https://via.placeholder.com/150' },
      { id: 3, label: \`\${searchQuery} Alfredo\`, image: 'https://via.placeholder.com/150' },
    ];
    setRecipes(mockRecipes);
    setLoading(false);
  };

  useEffect(() => {
    searchRecipes();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    searchRecipes();
  };

  return (
    <div className="recipe-app">
      <h1>Recipe Finder</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search recipes..."
        />
        <button type="submit">Search</button>
      </form>

      {loading ? (
        <p>Searching for recipes...</p>
      ) : (
        <>
          <p>Found {recipes.length} recipes</p>
          <div className="recipe-grid">
            {recipes.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export { RecipeCard };
export default RecipeApp;`,
        testCases: [
          {
            id: "test-1",
            description: "RecipeCard component should exist",
            testFunction: `typeof RecipeCard === 'function'`,
          },
          {
            id: "test-2",
            description: "RecipeCard should render div with className recipe-card",
            testFunction: `
              const mockRecipe = { id: 1, label: 'Test', image: 'test.jpg' };
              const { container } = render(<RecipeCard recipe={mockRecipe} />);
              container.querySelector('div.recipe-card') !== null
            `,
          },
          {
            id: "test-3",
            description: "Should use map to render recipes",
            testFunction: `code.includes('.map(')`,
          },
          {
            id: "test-4",
            description: "Should render recipe-grid div",
            testFunction: `code.includes('recipe-grid')`,
          },
        ],
        language: "jsx",
      },
    ],
  },

  // Simplified remaining lessons for brevity
  {
    id: "recipe-capstone-04",
    moduleId: "module-2-5",
    title: "Recipe App: useCallback Optimization",
    order: 4,
    xpReward: 175,
    difficulty: "intermediate",
    steps: [
      {
        id: "recipe-capstone-04-step-1",
        order: 1,
        instruction: `
# Optimize with useCallback

Learn to prevent unnecessary re-renders using useCallback!

### Your Task

Optimize the searchRecipes function:

1. Import \`useCallback\` from React
2. Wrap searchRecipes with useCallback
3. Add searchQuery as a dependency
4. Update useEffect dependency array to include searchRecipes

This prevents searchRecipes from being recreated on every render!
        `,
        hint: "const searchRecipes = useCallback(async () => { ... }, [searchQuery]);",
        starterCode: `import React, { useState, useEffect } from 'react';

function RecipeCard({ recipe }) {
  return (
    <div className="recipe-card">
      <img src={recipe.image} alt={recipe.label} />
      <h3>{recipe.label}</h3>
    </div>
  );
}

function RecipeApp() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('pasta');

  // Wrap this with useCallback
  const searchRecipes = async () => {
    setLoading(true);
    const mockRecipes = [
      { id: 1, label: \`\${searchQuery} Carbonara\`, image: 'https://via.placeholder.com/150' },
      { id: 2, label: \`\${searchQuery} Primavera\`, image: 'https://via.placeholder.com/150' },
    ];
    setRecipes(mockRecipes);
    setLoading(false);
  };

  useEffect(() => {
    searchRecipes();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    searchRecipes();
  };

  return (
    <div className="recipe-app">
      <h1>Recipe Finder</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
      {loading ? <p>Loading...</p> : (
        <div className="recipe-grid">
          {recipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      )}
    </div>
  );
}

export { RecipeCard };
export default RecipeApp;`,
        solution: `import React, { useState, useEffect, useCallback } from 'react';

function RecipeCard({ recipe }) {
  return (
    <div className="recipe-card">
      <img src={recipe.image} alt={recipe.label} />
      <h3>{recipe.label}</h3>
    </div>
  );
}

function RecipeApp() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('pasta');

  const searchRecipes = useCallback(async () => {
    setLoading(true);
    const mockRecipes = [
      { id: 1, label: \`\${searchQuery} Carbonara\`, image: 'https://via.placeholder.com/150' },
      { id: 2, label: \`\${searchQuery} Primavera\`, image: 'https://via.placeholder.com/150' },
    ];
    setRecipes(mockRecipes);
    setLoading(false);
  }, [searchQuery]);

  useEffect(() => {
    searchRecipes();
  }, [searchRecipes]);

  const handleSubmit = (e) => {
    e.preventDefault();
    searchRecipes();
  };

  return (
    <div className="recipe-app">
      <h1>Recipe Finder</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
      {loading ? <p>Loading...</p> : (
        <div className="recipe-grid">
          {recipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      )}
    </div>
  );
}

export { RecipeCard };
export default RecipeApp;`,
        testCases: [
          {
            id: "test-1",
            description: "Should import useCallback",
            testFunction: `code.includes('useCallback')`,
          },
          {
            id: "test-2",
            description: "Should wrap searchRecipes with useCallback",
            testFunction: `code.includes('useCallback(async')`,
          },
          {
            id: "test-3",
            description: "useCallback should have searchQuery as dependency",
            testFunction: `code.match(/useCallback\\([^)]+\\),\\s*\\[searchQuery\\]/)`,
          },
        ],
        language: "jsx",
      },
    ],
  },

  // Continue with remaining lessons (5-8) following similar pattern
  // Lesson 5: useMemo for filtering
  // Lesson 6: Add favorites feature
  // Lesson 7: Persist favorites to localStorage
  // Lesson 8: Final polish and deployment prep
];
