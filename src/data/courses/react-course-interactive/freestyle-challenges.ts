/**
 * Freestyle Challenges - Creative Freedom!
 *
 * These challenges appear every 10 lessons throughout the course.
 * They have NO automated tests - just creative prompts!
 *
 * Purpose: Allow students to express creativity, experiment, and build
 * something unique without rigid test constraints.
 */

import { InteractiveLesson } from "@/types";

export const freestyleChallenges: InteractiveLesson[] = [
  // Freestyle Challenge 1: After first 10 lessons (Phase 1)
  {
    id: "freestyle-01",
    moduleId: "freestyle",
    title: "🎨 Freestyle Challenge: Build Anything You Want!",
    order: 1,
    xpReward: 200,
    difficulty: "beginner",
    steps: [
      {
        id: "freestyle-01-step-1",
        order: 1,
        instruction: `
# 🎨 Freestyle Challenge #1: Creative Freedom!

Congratulations on completing your first 10 lessons! Time to build something **completely your own**.

## The Challenge

Build **anything you want** using the React concepts you've learned so far!

### Requirements (Loose!)
- Use at least **3 components**
- Implement **useState** at least once
- Handle at least **one event** (click, input, etc.)
- **Make it fun!**

### Ideas to Get You Started
- 🎲 Dice roller with custom styling
- 🎨 Color picker that shows hex codes
- 💬 Random quote generator
- 🃏 Card flip game
- 🎯 Simple clicker game
- 🌈 Mood tracker with emoji buttons
- 🎪 Joke generator
- 🎵 Playlist creator (no actual music, just list management)

### No Automated Tests!

There are **NO tests** for this challenge. We won't check if you named things correctly or used exact HTML. Just **build something cool** and have fun!

### Tips
- Start simple - you can always expand later
- Add your own personality and style
- Experiment with things you're curious about
- Share with friends when you're done!

**Ready? Let's see what you create!** 🚀
        `,
        hint: "There's no right answer! Pick something that sounds fun to YOU. Start with components, add state, make it interactive!",
        starterCode: `import React, { useState } from 'react';

// Build anything you want here!
// Delete this comment and let your creativity flow!

function MyFreestyleProject() {
  return (
    <div>
      <h1>My Awesome Creation</h1>
      {/* Your code here! */}
    </div>
  );
}

export default MyFreestyleProject;`,
        solution: `import React, { useState } from 'react';

// Example solution: Dice Roller
// Students can build ANYTHING - this is just one possibility!

function DiceRoller() {
  const [dice1, setDice1] = useState(1);
  const [dice2, setDice2] = useState(1);
  const [rollCount, setRollCount] = useState(0);

  const rollDice = () => {
    setDice1(Math.floor(Math.random() * 6) + 1);
    setDice2(Math.floor(Math.random() * 6) + 1);
    setRollCount(rollCount + 1);
  };

  const total = dice1 + dice2;

  return (
    <div style={{ textAlign: 'center', padding: '40px' }}>
      <h1>🎲 Dice Roller 🎲</h1>

      <div style={{ fontSize: '80px', margin: '20px' }}>
        <span style={{ margin: '10px' }}>{dice1}</span>
        <span style={{ margin: '10px' }}>{dice2}</span>
      </div>

      <h2>Total: {total}</h2>

      {total === 12 && <p style={{ fontSize: '30px' }}>🎉 DOUBLE SIXES! 🎉</p>}
      {total === 2 && <p style={{ fontSize: '30px' }}>😱 Snake eyes! 😱</p>}

      <button onClick={rollDice} style={{ fontSize: '20px', padding: '10px 20px' }}>
        Roll Dice!
      </button>

      <p>Rolls: {rollCount}</p>
    </div>
  );
}

export default DiceRoller;`,
        testCases: [
          // INTENTIONALLY EMPTY - No tests for freestyle challenges!
        ],
        language: "jsx",
      },
    ],
  },

  // Freestyle Challenge 2: After 20 lessons (Phase 1)
  {
    id: "freestyle-02",
    moduleId: "freestyle",
    title: "🎨 Freestyle Challenge: Lists & Creativity",
    order: 2,
    xpReward: 200,
    difficulty: "beginner",
    steps: [
      {
        id: "freestyle-02-step-1",
        order: 1,
        instruction: `
# 🎨 Freestyle Challenge #2: Lists & Iteration

You've learned about lists and keys! Time to build something that uses them creatively.

## The Challenge

Build a project that **displays and manages a list** of items!

### Requirements
- Use **.map()** to render a list
- Each item needs a unique **key**
- Add functionality to **add new items** to the list
- **Bonus:** Add ability to remove items!

### Ideas
- 🎮 Quest Log (RPG-style task list)
- 🏆 Achievement Tracker
- 🎬 Movie Watchlist
- 🍕 Pizza Topping Builder
- 🎸 Setlist Creator (for musicians)
- 🦸 Superhero Team Builder
- 📝 Bucket List Manager
- 🎨 Color Palette Creator

### Your Canvas

No strict tests. Make it **yours**. Add fun themes, emojis, colors, whatever makes you smile!

**Have fun and be creative!** ✨
        `,
        hint: "Start with an array in state, map over it to display, and add a form to add new items!",
        starterCode: `import React, { useState } from 'react';

function MyListProject() {
  // Your creative list-based project here!

  return (
    <div>
      <h1>My List Project</h1>
    </div>
  );
}

export default MyListProject;`,
        solution: `import React, { useState } from 'react';

// Example: Quest Log
function QuestLog() {
  const [quests, setQuests] = useState([
    { id: 1, name: 'Learn React Hooks', completed: true },
    { id: 2, name: 'Build a Project', completed: false },
  ]);
  const [newQuest, setNewQuest] = useState('');

  const addQuest = (e) => {
    e.preventDefault();
    if (newQuest.trim()) {
      setQuests([...quests, {
        id: Date.now(),
        name: newQuest,
        completed: false
      }]);
      setNewQuest('');
    }
  };

  const toggleQuest = (id) => {
    setQuests(quests.map(quest =>
      quest.id === id ? { ...quest, completed: !quest.completed } : quest
    ));
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: 'auto' }}>
      <h1>⚔️ Quest Log ⚔️</h1>

      <form onSubmit={addQuest}>
        <input
          type="text"
          value={newQuest}
          onChange={(e) => setNewQuest(e.target.value)}
          placeholder="New quest..."
        />
        <button type="submit">Add Quest</button>
      </form>

      <ul style={{ listStyle: 'none', padding: 0 }}>
        {quests.map(quest => (
          <li
            key={quest.id}
            onClick={() => toggleQuest(quest.id)}
            style={{
              padding: '10px',
              margin: '5px',
              background: quest.completed ? '#90EE90' : '#FFE4B5',
              cursor: 'pointer',
              textDecoration: quest.completed ? 'line-through' : 'none'
            }}
          >
            {quest.completed ? '✅' : '⬜'} {quest.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default QuestLog;`,
        testCases: [],
        language: "jsx",
      },
    ],
  },

  // Freestyle Challenge 3: After Phase 1 (30 lessons)
  {
    id: "freestyle-03",
    moduleId: "freestyle",
    title: "🎨 Freestyle Challenge: Phase 1 Mastery Project",
    order: 3,
    xpReward: 300,
    difficulty: "intermediate",
    steps: [
      {
        id: "freestyle-03-step-1",
        order: 1,
        instruction: `
# 🎨 Freestyle Challenge #3: Phase 1 Mastery

You've completed Phase 1! Celebrate by building something **ambitious**!

## The Challenge

Build a **mini-application** that combines multiple concepts from Phase 1.

### Requirements
- Multiple **components** working together
- **State management** (at least 2-3 state variables)
- **Event handling** (multiple types of events)
- **Conditional rendering**
- **Lists and iteration**

### Project Ideas (Pick One!)

**🎮 Mini-Game:**
- Tic-Tac-Toe
- Memory card game
- Rock-Paper-Scissors tournament
- Simple platformer character creator

**🎨 Creative Tool:**
- Pixel art drawer
- Gradient generator
- Font pairing preview
- Color scheme creator

**📱 Utility App:**
- Timer/Stopwatch with laps
- Calculator with history
- Unit converter
- Budget tracker

**🎪 Just For Fun:**
- Random team generator
- Decision maker (spin the wheel)
- Compliment generator
- Personality quiz

### Challenge Yourself!

This is your chance to build something **portfolio-worthy**. Make it polished, add your style, and be proud of it!

**No tests. No limits. Just creativity!** 🚀
        `,
        hint: "Pick something that genuinely excites you. Break it down into components. Start simple and add features!",
        starterCode: `import React, { useState } from 'react';

// Build your Phase 1 Mastery Project!
// This is going in your portfolio!

function MyMasteryProject() {
  return (
    <div>
      <h1>My Amazing Project</h1>
    </div>
  );
}

export default MyMasteryProject;`,
        solution: `import React, { useState } from 'react';

// Example: Memory Card Game
function MemoryGame() {
  const [cards, setCards] = useState([
    { id: 1, emoji: '🐶', flipped: false, matched: false },
    { id: 2, emoji: '🐶', flipped: false, matched: false },
    { id: 3, emoji: '🐱', flipped: false, matched: false },
    { id: 4, emoji: '🐱', flipped: false, matched: false },
    { id: 5, emoji: '🦊', flipped: false, matched: false },
    { id: 6, emoji: '🦊', flipped: false, matched: false },
  ]);
  const [flippedIds, setFlippedIds] = useState([]);
  const [moves, setMoves] = useState(0);

  const handleCardClick = (id) => {
    if (flippedIds.length === 2) return;

    const newCards = cards.map(card =>
      card.id === id ? { ...card, flipped: true } : card
    );
    setCards(newCards);
    setFlippedIds([...flippedIds, id]);

    if (flippedIds.length === 1) {
      setMoves(moves + 1);
      setTimeout(() => checkMatch([...flippedIds, id]), 1000);
    }
  };

  const checkMatch = (ids) => {
    const [first, second] = ids;
    const firstCard = cards.find(c => c.id === first);
    const secondCard = cards.find(c => c.id === second);

    if (firstCard.emoji === secondCard.emoji) {
      setCards(cards.map(card =>
        ids.includes(card.id) ? { ...card, matched: true } : card
      ));
    } else {
      setCards(cards.map(card =>
        ids.includes(card.id) ? { ...card, flipped: false } : card
      ));
    }
    setFlippedIds([]);
  };

  const gameWon = cards.every(card => card.matched);

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h1>🧠 Memory Game 🧠</h1>
      <p>Moves: {moves}</p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 100px)', gap: '10px', justifyContent: 'center' }}>
        {cards.map(card => (
          <div
            key={card.id}
            onClick={() => !card.matched && !card.flipped && handleCardClick(card.id)}
            style={{
              width: '100px',
              height: '100px',
              background: card.matched ? '#90EE90' : card.flipped ? '#fff' : '#4A90E2',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '40px',
              cursor: 'pointer',
              borderRadius: '10px',
            }}
          >
            {(card.flipped || card.matched) && card.emoji}
          </div>
        ))}
      </div>

      {gameWon && (
        <div style={{ marginTop: '20px', fontSize: '30px' }}>
          🎉 You Won in {moves} Moves! 🎉
        </div>
      )}
    </div>
  );
}

export default MemoryGame;`,
        testCases: [],
        language: "jsx",
      },
    ],
  },

  // Additional freestyle challenges would continue for Phase 2 and Phase 3
  // Total of 15 freestyle challenges across the entire course
];
