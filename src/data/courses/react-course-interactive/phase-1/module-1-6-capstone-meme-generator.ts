/**
 * React Course - Phase 1 Capstone Project
 * Module 1.6: Build a Meme Generator (5 lessons)
 *
 * This capstone project integrates all Phase 1 concepts:
 * - Components & JSX
 * - State management with useState
 * - Event handling
 * - Conditional rendering
 * - Lists and keys
 *
 * Students build a real, shareable application!
 */

import { InteractiveLesson } from "@/types";

export const memeGeneratorCapstone: InteractiveLesson[] = [
  // Lesson 1: Project Setup & Layout
  {
    id: "meme-capstone-01",
    moduleId: "module-1-6",
    title: "Meme Generator: Setup & Layout",
    order: 1,
    xpReward: 100,
    difficulty: "beginner",
    steps: [
      {
        id: "meme-capstone-01-step-1",
        order: 1,
        instruction: `
# 🎨 Capstone Project: Build a Meme Generator!

Welcome to your first **real project**! You're going to build a fully functional meme generator that you can share with friends.

## What You'll Build

A meme generator that lets users:
- Choose from popular meme templates
- Add custom top and bottom text
- Generate shareable memes
- Download their creations

This project integrates everything you learned in Phase 1!

## Lesson 1: Setup & Layout

Let's start by creating the basic structure and layout for our meme generator.

### Your Task

Create a component named \`MemeGenerator\` that sets up the initial layout:

1. Return a \`<div>\` with className "meme-generator"
2. Inside, add:
   - An \`<h1>\` with text "Meme Generator"
   - A \`<p>\` with className "subtitle" and text "Create hilarious memes in seconds!"
   - A \`<div>\` with className "meme-container" (empty for now)
   - A \`<div>\` with className "controls" containing:
     - A \`<button>\` with text "Get Random Meme Template"

**Tip:** This is just the skeleton. We'll add functionality in the next lessons!
        `,
        hint: "Focus on structure first. Create the div containers and elements as specified. We'll add interactivity next!",
        starterCode: `import React from 'react';

function MemeGenerator() {
  // Create the layout structure

}

export default MemeGenerator;`,
        solution: `import React from 'react';

function MemeGenerator() {
  return (
    <div className="meme-generator">
      <h1>Meme Generator</h1>
      <p className="subtitle">Create hilarious memes in seconds!</p>

      <div className="meme-container">
        {/* Meme will appear here */}
      </div>

      <div className="controls">
        <button>Get Random Meme Template</button>
      </div>
    </div>
  );
}

export default MemeGenerator;`,
        testCases: [
          {
            id: "test-1",
            description: "Should render a div with className 'meme-generator'",
            testFunction: `
              const { container } = render(<MemeGenerator />);
              container.querySelector('div.meme-generator') !== null
            `,
          },
          {
            id: "test-2",
            description: "Should render h1 with 'Meme Generator'",
            testFunction: `
              const { getByText } = render(<MemeGenerator />);
              getByText('Meme Generator') !== null
            `,
          },
          {
            id: "test-3",
            description: "Should render subtitle with className 'subtitle'",
            testFunction: `
              const { container } = render(<MemeGenerator />);
              const subtitle = container.querySelector('p.subtitle');
              subtitle !== null && subtitle.textContent.includes('Create hilarious memes')
            `,
          },
          {
            id: "test-4",
            description: "Should render meme-container div",
            testFunction: `
              const { container } = render(<MemeGenerator />);
              container.querySelector('div.meme-container') !== null
            `,
          },
          {
            id: "test-5",
            description: "Should render controls div with a button",
            testFunction: `
              const { container } = render(<MemeGenerator />);
              const controls = container.querySelector('div.controls');
              const button = controls?.querySelector('button');
              controls !== null && button !== null
            `,
          },
          {
            id: "test-6",
            description: "Button should have text 'Get Random Meme Template'",
            testFunction: `
              const { getByText } = render(<MemeGenerator />);
              const button = getByText('Get Random Meme Template');
              button !== null && button.tagName === 'BUTTON'
            `,
          },
        ],
        language: "jsx",
      },
    ],
  },

  // Lesson 2: Add State for Meme Data
  {
    id: "meme-capstone-02",
    moduleId: "module-1-6",
    title: "Meme Generator: Add State Management",
    order: 2,
    xpReward: 100,
    difficulty: "beginner",
    steps: [
      {
        id: "meme-capstone-02-step-1",
        order: 1,
        instruction: `
# Add State to Your Meme Generator

Now let's add state to manage our meme data! We'll store:
- The current meme image URL
- Top text for the meme
- Bottom text for the meme

## Your Task

Enhance the \`MemeGenerator\` component with state:

1. Import \`useState\` from React
2. Create state for \`topText\` (initial value: empty string)
3. Create state for \`bottomText\` (initial value: empty string)
4. Create state for \`memeImage\` (initial value: "https://i.imgflip.com/30b1gx.jpg")
5. Display the meme image in the meme-container:
   - Add an \`<img>\` with src set to \`memeImage\`
   - Add alt text: "Meme template"
   - Add className "meme-image"
6. Add two input fields in the controls div (before the button):
   - Input for top text with placeholder "Top text"
   - Input for bottom text with placeholder "Bottom text"
   - Both inputs should have type="text"

**Note:** We'll connect the inputs in the next lesson!
        `,
        hint: "Use useState three times for topText, bottomText, and memeImage. Display the image using the memeImage state variable.",
        starterCode: `import React from 'react';

function MemeGenerator() {
  // Add state here

  return (
    <div className="meme-generator">
      <h1>Meme Generator</h1>
      <p className="subtitle">Create hilarious memes in seconds!</p>

      <div className="meme-container">
        {/* Add meme image here */}
      </div>

      <div className="controls">
        {/* Add input fields here */}
        <button>Get Random Meme Template</button>
      </div>
    </div>
  );
}

export default MemeGenerator;`,
        solution: `import React, { useState } from 'react';

function MemeGenerator() {
  const [topText, setTopText] = useState('');
  const [bottomText, setBottomText] = useState('');
  const [memeImage, setMemeImage] = useState('https://i.imgflip.com/30b1gx.jpg');

  return (
    <div className="meme-generator">
      <h1>Meme Generator</h1>
      <p className="subtitle">Create hilarious memes in seconds!</p>

      <div className="meme-container">
        <img src={memeImage} alt="Meme template" className="meme-image" />
      </div>

      <div className="controls">
        <input type="text" placeholder="Top text" />
        <input type="text" placeholder="Bottom text" />
        <button>Get Random Meme Template</button>
      </div>
    </div>
  );
}

export default MemeGenerator;`,
        testCases: [
          {
            id: "test-1",
            description: "Should import and use useState",
            testFunction: `code.includes('useState')`,
          },
          {
            id: "test-2",
            description: "Should create topText state",
            testFunction: `code.includes('topText') && code.includes('setTopText')`,
          },
          {
            id: "test-3",
            description: "Should create bottomText state",
            testFunction: `code.includes('bottomText') && code.includes('setBottomText')`,
          },
          {
            id: "test-4",
            description: "Should create memeImage state with initial URL",
            testFunction: `code.includes('memeImage') && code.includes('setMemeImage') && code.includes('imgflip.com')`,
          },
          {
            id: "test-5",
            description: "Should render an img element with memeImage as src",
            testFunction: `
              const { container } = render(<MemeGenerator />);
              const img = container.querySelector('img.meme-image');
              img !== null && img.src.includes('imgflip.com')
            `,
          },
          {
            id: "test-6",
            description: "Should render two input fields",
            testFunction: `
              const { container } = render(<MemeGenerator />);
              const inputs = container.querySelectorAll('input[type="text"]');
              inputs.length === 2
            `,
          },
          {
            id: "test-7",
            description: "Inputs should have correct placeholders",
            testFunction: `
              const { container } = render(<MemeGenerator />);
              const topInput = container.querySelector('input[placeholder="Top text"]');
              const bottomInput = container.querySelector('input[placeholder="Bottom text"]');
              topInput !== null && bottomInput !== null
            `,
          },
        ],
        language: "jsx",
      },
    ],
  },

  // Lesson 3: Handle User Input
  {
    id: "meme-capstone-03",
    moduleId: "module-1-6",
    title: "Meme Generator: Handle User Input",
    order: 3,
    xpReward: 100,
    difficulty: "beginner",
    steps: [
      {
        id: "meme-capstone-03-step-1",
        order: 1,
        instruction: `
# Connect Input Fields to State

Time to make those input fields functional! Users should be able to type text that will appear on the meme.

## Your Task

Connect the input fields to state and display the text on the meme:

1. Add \`value\` and \`onChange\` to the top text input:
   - \`value={topText}\`
   - \`onChange\` should update topText state
2. Add \`value\` and \`onChange\` to the bottom text input:
   - \`value={bottomText}\`
   - \`onChange\` should update bottomText state
3. Display the text on the meme by updating the meme-container:
   - After the image, add a \`<div>\` with className "meme-text-container"
   - Inside, add an \`<h2>\` with className "meme-text top" displaying topText
   - Add another \`<h2>\` with className "meme-text bottom" displaying bottomText

**Tip:** Use \`e.target.value\` in your onChange handlers!
        `,
        hint: "For onChange: (e) => setTopText(e.target.value). The text overlays should be in a separate div after the image.",
        starterCode: `import React, { useState } from 'react';

function MemeGenerator() {
  const [topText, setTopText] = useState('');
  const [bottomText, setBottomText] = useState('');
  const [memeImage, setMemeImage] = useState('https://i.imgflip.com/30b1gx.jpg');

  return (
    <div className="meme-generator">
      <h1>Meme Generator</h1>
      <p className="subtitle">Create hilarious memes in seconds!</p>

      <div className="meme-container">
        <img src={memeImage} alt="Meme template" className="meme-image" />
        {/* Add text overlay container here */}
      </div>

      <div className="controls">
        <input type="text" placeholder="Top text" />
        <input type="text" placeholder="Bottom text" />
        <button>Get Random Meme Template</button>
      </div>
    </div>
  );
}

export default MemeGenerator;`,
        solution: `import React, { useState } from 'react';

function MemeGenerator() {
  const [topText, setTopText] = useState('');
  const [bottomText, setBottomText] = useState('');
  const [memeImage, setMemeImage] = useState('https://i.imgflip.com/30b1gx.jpg');

  return (
    <div className="meme-generator">
      <h1>Meme Generator</h1>
      <p className="subtitle">Create hilarious memes in seconds!</p>

      <div className="meme-container">
        <img src={memeImage} alt="Meme template" className="meme-image" />
        <div className="meme-text-container">
          <h2 className="meme-text top">{topText}</h2>
          <h2 className="meme-text bottom">{bottomText}</h2>
        </div>
      </div>

      <div className="controls">
        <input
          type="text"
          placeholder="Top text"
          value={topText}
          onChange={(e) => setTopText(e.target.value)}
        />
        <input
          type="text"
          placeholder="Bottom text"
          value={bottomText}
          onChange={(e) => setBottomText(e.target.value)}
        />
        <button>Get Random Meme Template</button>
      </div>
    </div>
  );
}

export default MemeGenerator;`,
        testCases: [
          {
            id: "test-1",
            description: "Top text input should have value prop",
            testFunction: `code.includes('value={topText}')`,
          },
          {
            id: "test-2",
            description: "Bottom text input should have value prop",
            testFunction: `code.includes('value={bottomText}')`,
          },
          {
            id: "test-3",
            description: "Top text input should have onChange handler",
            testFunction: `code.includes('onChange') && code.includes('setTopText')`,
          },
          {
            id: "test-4",
            description: "Bottom text input should have onChange handler",
            testFunction: `code.includes('onChange') && code.includes('setBottomText')`,
          },
          {
            id: "test-5",
            description: "Should render meme-text-container div",
            testFunction: `
              const { container } = render(<MemeGenerator />);
              container.querySelector('div.meme-text-container') !== null
            `,
          },
          {
            id: "test-6",
            description: "Should display topText in h2 with class 'meme-text top'",
            testFunction: `
              const { container } = render(<MemeGenerator />);
              const topH2 = container.querySelector('h2.meme-text.top');
              topH2 !== null
            `,
          },
          {
            id: "test-7",
            description: "Should display bottomText in h2 with class 'meme-text bottom'",
            testFunction: `
              const { container } = render(<MemeGenerator />);
              const bottomH2 = container.querySelector('h2.meme-text.bottom');
              bottomH2 !== null
            `,
          },
        ],
        language: "jsx",
      },
    ],
  },

  // Lesson 4: Get Random Meme Templates
  {
    id: "meme-capstone-04",
    moduleId: "module-1-6",
    title: "Meme Generator: Random Meme Templates",
    order: 4,
    xpReward: 150,
    difficulty: "intermediate",
    steps: [
      {
        id: "meme-capstone-04-step-1",
        order: 1,
        instruction: `
# Add Random Meme Template Functionality

Now let's make the "Get Random Meme Template" button work! We'll create an array of popular meme templates and randomly select one.

## Your Task

Add functionality to get random meme templates:

1. Create a constant array named \`memeTemplates\` with these meme URLs:
   - "https://i.imgflip.com/30b1gx.jpg" (I Bet He's Thinking About Other Women)
   - "https://i.imgflip.com/1bij.jpg" (One Does Not Simply)
   - "https://i.imgflip.com/1g8my4.jpg" (Distracted Boyfriend)
   - "https://i.imgflip.com/26am.jpg" (Disaster Girl)
   - "https://i.imgflip.com/5c7lwq.jpg" (Bernie Sanders)

2. Create a function named \`getRandomMeme\` that:
   - Generates a random index using \`Math.random()\` and \`Math.floor()\`
   - Gets the meme URL at that index
   - Updates the \`memeImage\` state with the new URL

3. Connect the button's \`onClick\` to the \`getRandomMeme\` function

**Tip:** Random index = \`Math.floor(Math.random() * memeTemplates.length)\`
        `,
        hint: "Create memeTemplates array outside or inside the component. Use Math.floor(Math.random() * array.length) for random index.",
        starterCode: `import React, { useState } from 'react';

function MemeGenerator() {
  const [topText, setTopText] = useState('');
  const [bottomText, setBottomText] = useState('');
  const [memeImage, setMemeImage] = useState('https://i.imgflip.com/30b1gx.jpg');

  // Add memeTemplates array here

  // Add getRandomMeme function here

  return (
    <div className="meme-generator">
      <h1>Meme Generator</h1>
      <p className="subtitle">Create hilarious memes in seconds!</p>

      <div className="meme-container">
        <img src={memeImage} alt="Meme template" className="meme-image" />
        <div className="meme-text-container">
          <h2 className="meme-text top">{topText}</h2>
          <h2 className="meme-text bottom">{bottomText}</h2>
        </div>
      </div>

      <div className="controls">
        <input
          type="text"
          placeholder="Top text"
          value={topText}
          onChange={(e) => setTopText(e.target.value)}
        />
        <input
          type="text"
          placeholder="Bottom text"
          value={bottomText}
          onChange={(e) => setBottomText(e.target.value)}
        />
        <button>Get Random Meme Template</button>
      </div>
    </div>
  );
}

export default MemeGenerator;`,
        solution: `import React, { useState } from 'react';

function MemeGenerator() {
  const [topText, setTopText] = useState('');
  const [bottomText, setBottomText] = useState('');
  const [memeImage, setMemeImage] = useState('https://i.imgflip.com/30b1gx.jpg');

  const memeTemplates = [
    'https://i.imgflip.com/30b1gx.jpg',
    'https://i.imgflip.com/1bij.jpg',
    'https://i.imgflip.com/1g8my4.jpg',
    'https://i.imgflip.com/26am.jpg',
    'https://i.imgflip.com/5c7lwq.jpg',
  ];

  const getRandomMeme = () => {
    const randomIndex = Math.floor(Math.random() * memeTemplates.length);
    const randomMemeUrl = memeTemplates[randomIndex];
    setMemeImage(randomMemeUrl);
  };

  return (
    <div className="meme-generator">
      <h1>Meme Generator</h1>
      <p className="subtitle">Create hilarious memes in seconds!</p>

      <div className="meme-container">
        <img src={memeImage} alt="Meme template" className="meme-image" />
        <div className="meme-text-container">
          <h2 className="meme-text top">{topText}</h2>
          <h2 className="meme-text bottom">{bottomText}</h2>
        </div>
      </div>

      <div className="controls">
        <input
          type="text"
          placeholder="Top text"
          value={topText}
          onChange={(e) => setTopText(e.target.value)}
        />
        <input
          type="text"
          placeholder="Bottom text"
          value={bottomText}
          onChange={(e) => setBottomText(e.target.value)}
        />
        <button onClick={getRandomMeme}>Get Random Meme Template</button>
      </div>
    </div>
  );
}

export default MemeGenerator;`,
        testCases: [
          {
            id: "test-1",
            description: "Should create memeTemplates array",
            testFunction: `code.includes('memeTemplates') && code.includes('imgflip.com')`,
          },
          {
            id: "test-2",
            description: "memeTemplates should have at least 5 URLs",
            testFunction: `code.match(/https:\\/\\/i\\.imgflip\\.com/g)?.length >= 5`,
          },
          {
            id: "test-3",
            description: "Should create getRandomMeme function",
            testFunction: `code.includes('getRandomMeme')`,
          },
          {
            id: "test-4",
            description: "getRandomMeme should use Math.random",
            testFunction: `code.includes('Math.random')`,
          },
          {
            id: "test-5",
            description: "getRandomMeme should use Math.floor",
            testFunction: `code.includes('Math.floor')`,
          },
          {
            id: "test-6",
            description: "getRandomMeme should update memeImage state",
            testFunction: `code.includes('setMemeImage')`,
          },
          {
            id: "test-7",
            description: "Button should have onClick handler",
            testFunction: `code.includes('onClick={getRandomMeme}')`,
          },
        ],
        language: "jsx",
      },
    ],
  },

  // Lesson 5: Polish & Conditional Rendering
  {
    id: "meme-capstone-05",
    moduleId: "module-1-6",
    title: "Meme Generator: Final Polish",
    order: 5,
    xpReward: 150,
    difficulty: "intermediate",
    steps: [
      {
        id: "meme-capstone-05-step-1",
        order: 1,
        instruction: `
# Polish Your Meme Generator!

Let's add the final touches to make your meme generator production-ready!

## Your Task

Add these finishing touches:

1. **Only show text when it exists:**
   - Wrap the top text h2 in a conditional: only render if \`topText\` has content
   - Wrap the bottom text h2 in a conditional: only render if \`bottomText\` has content
   - Use the \`&&\` operator for conditional rendering

2. **Add a reset button:**
   - After the "Get Random Meme Template" button, add another button
   - Text: "Reset Text"
   - When clicked, it should clear both topText and bottomText (set to empty strings)

3. **Add a meme counter:**
   - Create state for \`memeCount\` starting at 0
   - Increment the count each time a new random meme is generated
   - Display the count: Add a \`<p>\` with className "meme-count" showing "Memes generated: {memeCount}"
   - Place this after the subtitle

**Congrats!** You're building a real, shareable application! 🎉
        `,
        hint: "Use {topText && <h2>...</h2>} for conditional rendering. Create a resetText function that sets both texts to empty strings. Increment memeCount inside getRandomMeme.",
        starterCode: `import React, { useState } from 'react';

function MemeGenerator() {
  const [topText, setTopText] = useState('');
  const [bottomText, setBottomText] = useState('');
  const [memeImage, setMemeImage] = useState('https://i.imgflip.com/30b1gx.jpg');

  // Add memeCount state here

  const memeTemplates = [
    'https://i.imgflip.com/30b1gx.jpg',
    'https://i.imgflip.com/1bij.jpg',
    'https://i.imgflip.com/1g8my4.jpg',
    'https://i.imgflip.com/26am.jpg',
    'https://i.imgflip.com/5c7lwq.jpg',
  ];

  const getRandomMeme = () => {
    const randomIndex = Math.floor(Math.random() * memeTemplates.length);
    const randomMemeUrl = memeTemplates[randomIndex];
    setMemeImage(randomMemeUrl);
    // Increment memeCount here
  };

  // Add resetText function here

  return (
    <div className="meme-generator">
      <h1>Meme Generator</h1>
      <p className="subtitle">Create hilarious memes in seconds!</p>
      {/* Add meme count display here */}

      <div className="meme-container">
        <img src={memeImage} alt="Meme template" className="meme-image" />
        <div className="meme-text-container">
          {/* Add conditional rendering for text */}
          <h2 className="meme-text top">{topText}</h2>
          <h2 className="meme-text bottom">{bottomText}</h2>
        </div>
      </div>

      <div className="controls">
        <input
          type="text"
          placeholder="Top text"
          value={topText}
          onChange={(e) => setTopText(e.target.value)}
        />
        <input
          type="text"
          placeholder="Bottom text"
          value={bottomText}
          onChange={(e) => setBottomText(e.target.value)}
        />
        <button onClick={getRandomMeme}>Get Random Meme Template</button>
        {/* Add reset button here */}
      </div>
    </div>
  );
}

export default MemeGenerator;`,
        solution: `import React, { useState } from 'react';

function MemeGenerator() {
  const [topText, setTopText] = useState('');
  const [bottomText, setBottomText] = useState('');
  const [memeImage, setMemeImage] = useState('https://i.imgflip.com/30b1gx.jpg');
  const [memeCount, setMemeCount] = useState(0);

  const memeTemplates = [
    'https://i.imgflip.com/30b1gx.jpg',
    'https://i.imgflip.com/1bij.jpg',
    'https://i.imgflip.com/1g8my4.jpg',
    'https://i.imgflip.com/26am.jpg',
    'https://i.imgflip.com/5c7lwq.jpg',
  ];

  const getRandomMeme = () => {
    const randomIndex = Math.floor(Math.random() * memeTemplates.length);
    const randomMemeUrl = memeTemplates[randomIndex];
    setMemeImage(randomMemeUrl);
    setMemeCount(memeCount + 1);
  };

  const resetText = () => {
    setTopText('');
    setBottomText('');
  };

  return (
    <div className="meme-generator">
      <h1>Meme Generator</h1>
      <p className="subtitle">Create hilarious memes in seconds!</p>
      <p className="meme-count">Memes generated: {memeCount}</p>

      <div className="meme-container">
        <img src={memeImage} alt="Meme template" className="meme-image" />
        <div className="meme-text-container">
          {topText && <h2 className="meme-text top">{topText}</h2>}
          {bottomText && <h2 className="meme-text bottom">{bottomText}</h2>}
        </div>
      </div>

      <div className="controls">
        <input
          type="text"
          placeholder="Top text"
          value={topText}
          onChange={(e) => setTopText(e.target.value)}
        />
        <input
          type="text"
          placeholder="Bottom text"
          value={bottomText}
          onChange={(e) => setBottomText(e.target.value)}
        />
        <button onClick={getRandomMeme}>Get Random Meme Template</button>
        <button onClick={resetText}>Reset Text</button>
      </div>
    </div>
  );
}

export default MemeGenerator;`,
        testCases: [
          {
            id: "test-1",
            description: "Should create memeCount state",
            testFunction: `code.includes('memeCount') && code.includes('setMemeCount')`,
          },
          {
            id: "test-2",
            description: "Should use conditional rendering for topText",
            testFunction: `code.includes('topText &&')`,
          },
          {
            id: "test-3",
            description: "Should use conditional rendering for bottomText",
            testFunction: `code.includes('bottomText &&')`,
          },
          {
            id: "test-4",
            description: "Should display meme count",
            testFunction: `
              const { getByText } = render(<MemeGenerator />);
              getByText(/Memes generated: \\d+/) !== null
            `,
          },
          {
            id: "test-5",
            description: "Should have p element with className 'meme-count'",
            testFunction: `
              const { container } = render(<MemeGenerator />);
              container.querySelector('p.meme-count') !== null
            `,
          },
          {
            id: "test-6",
            description: "Should create resetText function",
            testFunction: `code.includes('resetText')`,
          },
          {
            id: "test-7",
            description: "Should have Reset Text button",
            testFunction: `
              const { getByText } = render(<MemeGenerator />);
              const button = getByText('Reset Text');
              button !== null && button.tagName === 'BUTTON'
            `,
          },
          {
            id: "test-8",
            description: "Reset button should have onClick handler",
            testFunction: `code.includes('onClick={resetText}')`,
          },
          {
            id: "test-9",
            description: "getRandomMeme should increment memeCount",
            testFunction: `
              const getRandomMemeMatch = code.match(/const getRandomMeme[\\s\\S]*?};/);
              getRandomMemeMatch && getRandomMemeMatch[0].includes('setMemeCount')
            `,
          },
        ],
        language: "jsx",
      },
    ],
  },
];
