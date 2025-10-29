# Learning Platform

A modern, full-featured learning platform built with Next.js 15, React 19, TypeScript, and Tailwind CSS. This project demonstrates enterprise-level patterns and architecture inspired by production applications.

## Features

- 🎓 **Course Catalog** - Browse and explore courses across various topics
- 👤 **User Authentication** - Secure signup/login with form validation
- 📊 **Student Dashboard** - Track progress, view enrolled courses, and stats
- 🎨 **Modern UI** - Beautiful interface using shadcn/ui components
- 📱 **Responsive Design** - Mobile-first approach with Tailwind CSS
- ⚡ **Performance Optimized** - Next.js 15 App Router with React 19
- 🧪 **Testing** - Unit tests with Vitest and React Testing Library
- 🔒 **Type Safety** - Full TypeScript coverage
- 🎯 **State Management** - Zustand for global state, Jotai for atomic state
- 📝 **Form Handling** - React Hook Form with Zod validation

## Architecture Patterns

This project implements key patterns from the MyPets architecture specification:

### Frontend Architecture

- **Next.js App Router** - File-based routing with layouts
- **TypeScript** - Strict type checking throughout
- **Component Organization** - Modular, testable components
- **State Management**:
  - Zustand for authentication and global state
  - Jotai for course-specific atomic state
- **Form Validation** - React Hook Form + Zod schemas
- **UI Components** - shadcn/ui component library
- **Styling** - Tailwind CSS with CSS variables for theming

### Project Structure

```
learning-app/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── (routes)/
│   │   │   ├── auth/          # Authentication pages
│   │   │   │   ├── login/
│   │   │   │   └── signup/
│   │   │   ├── courses/       # Course catalog
│   │   │   └── dashboard/     # Student dashboard
│   │   ├── layout.tsx         # Root layout
│   │   ├── page.tsx           # Home page
│   │   └── globals.css        # Global styles
│   ├── components/            # Reusable components
│   │   ├── ui/                # shadcn/ui components
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── input.tsx
│   │   │   └── label.tsx
│   │   └── providers.tsx      # Context providers
│   ├── stores/                # Zustand stores
│   │   └── authStore.ts       # Authentication state
│   ├── atoms/                 # Jotai atoms
│   │   └── courseAtoms.ts     # Course state
│   ├── types/                 # TypeScript types
│   │   └── index.ts           # Domain types
│   ├── lib/                   # Utilities
│   │   └── utils.ts           # Helper functions
│   └── __tests__/             # Test infrastructure
│       └── setup.ts           # Test configuration
├── package.json
├── tsconfig.json
├── next.config.ts
├── tailwind.config.ts
└── vitest.config.ts
```

## Getting Started

### Prerequisites

- Node.js >= 20.0.0
- pnpm >= 9.0.0 (or npm)

### Installation

1. Clone the repository:

```bash
cd repo
```

2. Install dependencies:

```bash
pnpm install
```

3. Run the development server:

```bash
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

```bash
# Development
pnpm dev              # Start development server
pnpm build            # Build for production
pnpm start            # Start production server
pnpm lint             # Run ESLint
pnpm typecheck        # Run TypeScript type checking
pnpm format           # Format code with Prettier

# Testing
pnpm test             # Run unit tests
pnpm test:ui          # Run tests with UI
```

## Key Technologies

### Core

- **Next.js 15** - React framework with App Router
- **React 19** - Latest React with Server Components
- **TypeScript 5.9** - Type-safe development
- **Tailwind CSS 4** - Utility-first CSS framework

### State Management

- **Zustand** - Lightweight global state
- **Jotai** - Atomic state management

### Forms & Validation

- **React Hook Form** - Performant form handling
- **Zod** - TypeScript-first schema validation

### UI Components

- **shadcn/ui** - High-quality component library
- **Lucide React** - Beautiful icon library
- **class-variance-authority** - Component variants

### Testing

- **Vitest** - Fast unit test framework
- **React Testing Library** - Component testing
- **@testing-library/jest-dom** - Custom matchers

## Development Patterns

### Component Pattern

Components follow this structure:

```typescript
// ComponentName.tsx
import { Button } from "@/components/ui/button";

interface ComponentNameProps {
  title: string;
  onAction: () => void;
}

export function ComponentName({ title, onAction }: ComponentNameProps) {
  return (
    <div>
      <h2>{title}</h2>
      <Button onClick={onAction}>Action</Button>
    </div>
  );
}
```

### State Management Pattern

```typescript
// stores/authStore.ts (Zustand)
import { create } from "zustand";

interface AuthState {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  login: async (email, password) => {
    // Implementation
  },
  logout: () => set({ user: null }),
}));
```

```typescript
// atoms/courseAtoms.ts (Jotai)
import { atom } from "jotai";

export const selectedCourseAtom = atom<Course | null>(null);
export const currentLessonIndexAtom = atom(0);
```

### Form Pattern

```typescript
// Using React Hook Form + Zod
const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

type FormData = z.infer<typeof schema>;

export function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    // Handle submission
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input {...register("email")} />
      {errors.email && <span>{errors.email.message}</span>}
    </form>
  );
}
```

## Type System

All domain entities are fully typed:

```typescript
// src/types/index.ts
export interface Course {
  id: string;
  title: string;
  description: string;
  instructor: Instructor;
  price: number;
  lessons: Lesson[];
}

export interface Enrollment {
  id: string;
  userId: string;
  courseId: string;
  progress: number;
  completedLessons: string[];
}
```

## UI Components

All UI components are built with accessibility in mind:

- Semantic HTML
- ARIA labels
- Keyboard navigation
- Focus management
- Responsive design

### Available Components

- `Button` - Multiple variants and sizes
- `Card` - Content containers
- `Input` - Form inputs
- `Label` - Form labels

## Testing

Tests are colocated with components:

```typescript
// button.test.tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Button } from "./button";

describe("Button", () => {
  it("renders button with text", () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText("Click me")).toBeInTheDocument();
  });
});
```

## Performance Optimizations

- **Code Splitting** - Automatic with Next.js App Router
- **Image Optimization** - Next.js Image component with AVIF/WebP
- **Module Optimization** - Tree-shaking with modularized imports
- **Separate Build Dirs** - Faster dev rebuilds

## 📚 Documentation

**All project documentation has been organized in the [`/docs`](docs/) directory.**

### Quick Links

- **[Documentation Hub](docs/README.md)** - Start here for complete documentation index
- **[Architecture](docs/architecture/INTERACTIVE_LESSON_ARCHITECTURE.md)** - Reusable framework for interactive lessons
- **[Audit Reports](docs/audits/AUDIT_MASTER_INDEX.md)** - Current issues and fixes (58 issues, 7 sub-reports)
- **[Course Formats](docs/courses/REACT_COURSE_FREECODECAMP_FORMAT.md)** - FreeCodeCamp-style lesson creation guide
- **[Quick Start](docs/quickstart/QUICK_START.md)** - Get started quickly

### For Developers

- Building interactive lessons? → [Interactive Lesson Architecture](docs/architecture/INTERACTIVE_LESSON_ARCHITECTURE.md)
- Fixing bugs? → [Audit Master Index](docs/audits/AUDIT_MASTER_INDEX.md)
- Creating courses? → [React Course Format](docs/courses/REACT_COURSE_FREECODECAMP_FORMAT.md)

### For QA Engineers

- Setting up tests? → [AUDIT_07: Testing Infrastructure](docs/audits/AUDIT_07_QA_TESTING_INFRASTRUCTURE.md)
- Finding issues? → [Complete Audit Report](docs/audits/AUDIT_REPORT.md)

---

## Future Enhancements

See [Audit Reports](docs/audits/AUDIT_MASTER_INDEX.md) for prioritized work items.

High-priority items include:
- [ ] Fix authentication system (CRITICAL)
- [ ] Implement enrollment flow
- [ ] Build interactive lesson player
- [ ] Add testing infrastructure
- [ ] Progress tracking improvements
- [ ] Add global navigation
- [ ] Leaderboard and badges

## Contributing

This project is set up for learning and demonstration purposes. Feel free to:

- Add new features
- Improve existing components
- Add more tests
- Enhance documentation

**Before contributing:**
1. Read the [Documentation Hub](docs/README.md)
2. Check the [Audit Reports](docs/audits/AUDIT_MASTER_INDEX.md) for priority items
3. Follow patterns in [CLAUDE.md](CLAUDE.md)

## License

MIT

## Acknowledgments

Architecture inspired by enterprise applications and best practices from:

- Next.js documentation
- React patterns
- TypeScript best practices
- shadcn/ui component design
- Modern state management patterns
