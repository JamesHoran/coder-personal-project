/**
 * React Unified Course - Capstone Project Definitions
 *
 * Detailed specifications for the two major capstone projects
 * that exist as interactive lessons in the course structure.
 */

export interface CapstonProjectDefinition {
  id: string;
  moduleId: string;
  title: string;
  description: string;
  phase: number;
  xpReward: number;
  estimatedHours: string;
  difficulty: 'intermediate' | 'advanced';
  objectives: string[];
  features: string[];
  technicalRequirements: string[];
  evaluationCriteria: string[];
  bonusChallenges?: string[];
  resourceLinks: string[];
}

/**
 * Phase 1 Capstone: Meme Generator
 * Module 1.6 - Foundation Boss Battle
 */
export const phase1Capstone: CapstonProjectDefinition = {
  id: 'capstone-meme-generator',
  moduleId: 'module-1-6',
  title: 'Meme Generator',
  description: 'Build a complete meme generator application that fetches images from an API and allows users to add custom text overlays. This capstone integrates all Phase 1 concepts: components, state, props, events, conditional rendering, and lists.',
  phase: 1,
  xpReward: 500,
  estimatedHours: '4-6 hours',
  difficulty: 'intermediate',
  objectives: [
    'Integrate all React fundamentals in one project',
    'Work with external APIs for data fetching',
    'Manage complex component state',
    'Create an intuitive user interface',
    'Handle user input and form validation',
    'Implement responsive design'
  ],
  features: [
    'Fetch random meme images from API',
    'Display meme template gallery',
    'Add top and bottom text to memes',
    'Position text overlay on images',
    'Style text (font, size, color)',
    'Save/download generated memes',
    'Share meme functionality',
    'Meme history (last 5 created)'
  ],
  technicalRequirements: [
    'Use Imgflip API or similar for meme templates',
    'Implement useState for form inputs and selected meme',
    'Use useEffect for API data fetching',
    'Handle loading and error states',
    'Create reusable components (MemeImage, TextInput, MemeGallery)',
    'Implement proper event handling for all user interactions',
    'Use conditional rendering for UI states',
    'Render list of meme templates with proper keys',
    'Canvas API for text overlay (or CSS positioning)',
    'Responsive design with CSS Grid/Flexbox'
  ],
  evaluationCriteria: [
    '✅ Successfully fetches and displays meme templates',
    '✅ User can add top and bottom text',
    '✅ Text appears correctly positioned on image',
    '✅ Loading states are shown during API fetch',
    '✅ Error handling for failed API requests',
    '✅ Clean component structure with proper props',
    '✅ All event handlers work correctly',
    '✅ Responsive design works on mobile and desktop',
    '✅ Code is well-organized and commented',
    '✅ User can download the generated meme'
  ],
  bonusChallenges: [
    '🌟 Add text styling options (font family, size, color)',
    '🌟 Implement drag-and-drop text positioning',
    '🌟 Add meme templates search/filter',
    '🌟 Create custom upload for personal images',
    '🌟 Add stickers or emoji overlays',
    '🌟 Implement meme categories/tags',
    '🌟 Add social media sharing buttons',
    '🌟 Create a "Meme of the Day" feature'
  ],
  resourceLinks: [
    'https://imgflip.com/api',
    'https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API',
    'https://react.dev/learn/synchronizing-with-effects',
    'https://react.dev/learn/sharing-state-between-components'
  ]
};

/**
 * Phase 2 Capstone: Recipe Discovery App
 * Module 2.5 - Intermediate Boss Battle
 */
export const phase2Capstone: CapstonProjectDefinition = {
  id: 'capstone-recipe-app',
  moduleId: 'module-2-5',
  title: 'Recipe Discovery App',
  description: 'Build a full-featured recipe discovery application with search, filtering, favorites, and detailed recipe pages. This capstone integrates Phase 2 concepts: advanced hooks, component patterns, performance optimization, and React Router.',
  phase: 2,
  xpReward: 600,
  estimatedHours: '6-8 hours',
  difficulty: 'advanced',
  objectives: [
    'Build a multi-page application with routing',
    'Implement complex state management',
    'Optimize performance for large datasets',
    'Create reusable component patterns',
    'Work with real API data and caching',
    'Build production-ready features'
  ],
  features: [
    'Search recipes by name, ingredient, or cuisine',
    'Advanced filtering (diet, cuisine, cooking time, difficulty)',
    'Recipe cards with images and quick info',
    'Detailed recipe page with ingredients and instructions',
    'Favorites system with persistence',
    'Shopping list generation from recipe',
    'Cooking timer functionality',
    'Meal planning calendar',
    'User reviews and ratings',
    'Recipe collections/folders'
  ],
  technicalRequirements: [
    'Use React Router for navigation (search, recipe detail, favorites)',
    'Implement custom hooks (useRecipeSearch, useFavorites, useLocalStorage)',
    'Use useContext or Redux Toolkit for global state (favorites, user prefs)',
    'Implement useReducer for complex filter state',
    'Use React.memo and useMemo for performance optimization',
    'Implement lazy loading for recipe images',
    'Use Spoonacular API or similar for recipe data',
    'Implement debouncing for search input',
    'Create compound components for recipe cards',
    'Use localStorage for favorites persistence',
    'Implement error boundaries for robustness',
    'Add loading skeletons for better UX',
    'Responsive design with mobile-first approach'
  ],
  evaluationCriteria: [
    '✅ Multi-page navigation works seamlessly',
    '✅ Search functionality with live results',
    '✅ Filters update results correctly',
    '✅ Recipe detail page shows complete information',
    '✅ Favorites persist across page reloads',
    '✅ Performance optimized (no unnecessary re-renders)',
    '✅ Loading states and error handling throughout',
    '✅ Custom hooks are reusable and well-designed',
    '✅ Component patterns follow best practices',
    '✅ Code is well-organized with proper file structure',
    '✅ Responsive design works across devices',
    '✅ Shopping list generates correctly from recipe'
  ],
  bonusChallenges: [
    '🌟 Implement infinite scroll for recipe results',
    '🌟 Add recipe similarity/recommendations',
    '🌟 Create custom recipe submission form',
    '🌟 Implement user authentication',
    '🌟 Add recipe notes and substitutions',
    '🌟 Create meal prep calculator (scale servings)',
    '🌟 Add nutritional information visualization',
    '🌟 Implement recipe sharing functionality',
    '🌟 Create dark mode with theme toggle',
    '🌟 Add offline support with service worker',
    '🌟 Implement recipe PDF export',
    '🌟 Add voice-guided cooking mode'
  ],
  resourceLinks: [
    'https://spoonacular.com/food-api',
    'https://reactrouter.com/en/main',
    'https://react.dev/reference/react/memo',
    'https://redux-toolkit.js.org/',
    'https://tanstack.com/query/latest',
    'https://react.dev/reference/react/useReducer'
  ]
};

/**
 * All capstone projects
 */
export const allCapstonProjects: CapstonProjectDefinition[] = [
  phase1Capstone,
  phase2Capstone
];

/**
 * Get capstone by module ID
 */
export function getCapstonByModuleId(moduleId: string): CapstonProjectDefinition | undefined {
  return allCapstonProjects.find(capstone => capstone.moduleId === moduleId);
}

/**
 * Get capstone by phase
 */
export function getCapstonsByPhase(phase: number): CapstonProjectDefinition[] {
  return allCapstonProjects.filter(capstone => capstone.phase === phase);
}

/**
 * Calculate total capstone XP
 */
export function getTotalCapstoneXP(): number {
  return allCapstonProjects.reduce((total, capstone) => total + capstone.xpReward, 0);
}
