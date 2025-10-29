# Quick Start Guide

Get your learning platform up and running in 5 minutes!

## Installation

1. **Install dependencies**:

```bash
cd /home/coder/repo
pnpm install
```

2. **Start the development server**:

```bash
pnpm dev
```

3. **Open your browser**:

Navigate to [http://localhost:3000](http://localhost:3000)

## Explore the App

### 1. Home Page (/)

- See featured courses
- Browse popular courses
- View platform features

### 2. Course Catalog (/courses)

- Browse all available courses
- Filter by category
- View course details
- See ratings and student count

### 3. Authentication

**Sign Up** (/auth/signup):
- Create a new account
- Enter name, email, password
- Form validation with Zod

**Login** (/auth/login):
- Sign in with email/password
- Mock authentication (no backend needed)
- Redirects to dashboard

### 4. Dashboard (/dashboard)

- View enrolled courses
- Track learning stats
- Continue learning
- See recommended courses

## Project Structure

```
src/
├── app/                   # Pages
│   ├── page.tsx          # Home
│   ├── courses/          # Course catalog
│   ├── dashboard/        # Student dashboard
│   └── auth/             # Login/Signup
├── components/           # UI components
│   └── ui/              # shadcn/ui components
├── stores/              # Zustand stores
├── atoms/               # Jotai atoms
└── types/               # TypeScript types
```

## Key Features to Test

### State Management

**Zustand (Global State)**:
- Authentication state
- User information
- Login/logout functionality

**Jotai (Atomic State)**:
- Course selection
- Video player state
- Progress tracking

### Form Validation

Try the signup form with invalid data:
- Email without @ symbol
- Password less than 8 characters
- Mismatched passwords

See real-time validation with Zod!

### UI Components

All components are type-safe and accessible:
- Buttons with variants
- Cards for content
- Forms with validation
- Responsive layouts

## Development Commands

```bash
# Development
pnpm dev              # Start dev server
pnpm build            # Build for production
pnpm start            # Start production build

# Code Quality
pnpm lint             # Run ESLint
pnpm typecheck        # Check TypeScript
pnpm format           # Format with Prettier

# Testing
pnpm test             # Run unit tests
pnpm test:ui          # Test UI mode
```

## Making Changes

### Add a New Component

```typescript
// src/components/MyComponent.tsx
export function MyComponent() {
  return <div>Hello World</div>;
}
```

### Add a New Page

```typescript
// src/app/my-page/page.tsx
export default function MyPage() {
  return <div>My Page</div>;
}
```

### Add State

```typescript
// src/stores/myStore.ts
import { create } from "zustand";

export const useMyStore = create((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
}));
```

## Common Tasks

### Update Styles

Edit `src/app/globals.css` for global styles or use Tailwind classes directly:

```tsx
<div className="bg-primary text-white p-4 rounded-lg">
  Styled content
</div>
```

### Add Form Validation

```typescript
import { z } from "zod";

const schema = z.object({
  email: z.string().email(),
  age: z.number().min(18),
});
```

### Write Tests

```typescript
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";

describe("MyComponent", () => {
  it("renders", () => {
    render(<MyComponent />);
    expect(screen.getByText("Hello")).toBeInTheDocument();
  });
});
```

## Architecture Patterns

This app demonstrates:

1. **Next.js App Router** - File-based routing
2. **TypeScript** - Full type safety
3. **State Management** - Zustand + Jotai
4. **Form Handling** - React Hook Form + Zod
5. **Component Library** - shadcn/ui
6. **Testing** - Vitest + RTL
7. **Styling** - Tailwind CSS

## Next Steps

- [ ] Explore the codebase
- [ ] Try modifying components
- [ ] Add new features
- [ ] Write tests
- [ ] Customize styling
- [ ] Add more pages

## Need Help?

- Check the [README.md](./README.md) for full documentation
- Review component files for examples
- Look at test files for usage patterns
- Check Next.js docs: https://nextjs.org/docs

Happy coding! 🚀
