# Architecture Documentation

This document explains the architectural decisions and patterns used in this learning platform.

## Overview

This is a **Next.js 15** application built with **React 19** and **TypeScript**, implementing modern patterns from enterprise applications while remaining focused on learning platform features.

## Technology Stack

### Core Framework
- **Next.js 15.1.6** - React framework with App Router
- **React 19.0.0** - UI library with latest features
- **TypeScript 5.9.3** - Type-safe development

### State Management
- **Zustand 5.0.8** - Global state (auth, user)
- **Jotai 2.15.0** - Atomic state (courses, lessons)

### Forms & Validation
- **React Hook Form 7.65.0** - Form management
- **Zod 3.22.4** - Schema validation

### UI & Styling
- **Tailwind CSS 4.1.15** - Utility-first CSS
- **shadcn/ui** - Component library
- **Lucide React** - Icons
- **class-variance-authority** - Component variants

### Testing
- **Vitest 3.2.4** - Unit test framework
- **React Testing Library 16.3.0** - Component testing
- **@testing-library/jest-dom** - DOM matchers

## Architecture Decisions

### 1. Next.js App Router

**Why App Router?**
- Server Components by default
- Improved routing with layouts
- Better performance
- Streaming and Suspense support

**Structure:**
```
app/
├── layout.tsx          # Root layout
├── page.tsx            # Home page
├── courses/
│   └── page.tsx        # Course catalog
├── dashboard/
│   └── page.tsx        # Student dashboard
└── auth/
    ├── login/
    └── signup/
```

### 2. State Management Strategy

**Zustand for Global State:**
- Authentication state
- User information
- Simple API
- No boilerplate

```typescript
// stores/authStore.ts
export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  login: async (email, password) => { /* ... */ },
  logout: () => { /* ... */ },
}));
```

**Jotai for Atomic State:**
- Course-specific state
- Lesson progress
- Video player state
- Derived state with atoms

```typescript
// atoms/courseAtoms.ts
export const selectedCourseAtom = atom<Course | null>(null);
export const enrollmentsAtom = atom<Enrollment[]>([]);
export const isCourseEnrolledAtom = atom((get) => {
  // Derived state
});
```

**When to use which:**
- Zustand: Global, persistent state (auth, settings)
- Jotai: Component-level, derived state (course data, UI state)

### 3. Form Handling Pattern

**React Hook Form + Zod:**
- Type-safe validation
- Minimal re-renders
- Great DX

```typescript
const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

type FormData = z.infer<typeof schema>;

const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
  resolver: zodResolver(schema),
});
```

**Benefits:**
- Runtime validation
- TypeScript types from schemas
- Excellent error handling
- Accessible forms

### 4. Component Architecture

**shadcn/ui Pattern:**
- Copy components into project
- Full ownership and customization
- Built on Radix UI primitives
- Accessible by default

**Component Structure:**
```
components/
├── ui/               # Base components
│   ├── button.tsx
│   ├── card.tsx
│   ├── input.tsx
│   └── label.tsx
└── [feature]/        # Feature components
```

**Variant System:**
```typescript
const buttonVariants = cva(
  "base-classes",
  {
    variants: {
      variant: {
        default: "...",
        outline: "...",
      },
      size: {
        default: "...",
        sm: "...",
        lg: "...",
      },
    },
  }
);
```

### 5. Type System

**Domain Types:**
All entities have interfaces:
```typescript
// types/index.ts
export interface User {
  id: string;
  email: string;
  displayName: string;
  role: UserRole;
}

export interface Course {
  id: string;
  title: string;
  lessons: Lesson[];
}
```

**Benefits:**
- Autocomplete
- Type errors at compile time
- Self-documenting code
- Refactoring safety

### 6. Styling System

**Tailwind CSS with CSS Variables:**

```css
/* globals.css */
:root {
  --primary: 221.2 83.2% 53.3%;
  --background: 0 0% 100%;
}

.dark {
  --primary: 217.2 91.2% 59.8%;
  --background: 222.2 84% 4.9%;
}
```

**Usage:**
```tsx
<div className="bg-primary text-primary-foreground">
  Content
</div>
```

**Benefits:**
- Theme support
- Consistent design system
- Runtime theme switching
- Type-safe with Tailwind

### 7. Testing Strategy

**Unit Tests with Vitest:**
```typescript
describe("Button", () => {
  it("renders", () => {
    render(<Button>Click</Button>);
    expect(screen.getByText("Click")).toBeInTheDocument();
  });
});
```

**Test Organization:**
- Colocated with components
- Mock Next.js router
- Test user interactions
- Verify accessibility

## Data Flow

### Authentication Flow

```
User → Login Form → useAuthStore.login() → Update State → Redirect
                                             ↓
                                    localStorage (optional)
```

### Course Enrollment Flow

```
User → Course Page → Enroll Button → Update enrollmentsAtom
                                         ↓
                              Update courseProgressAtom
                                         ↓
                                  Show in Dashboard
```

## Performance Optimizations

### 1. Next.js Optimizations

**Separate Build Directories:**
```typescript
// next.config.ts
distDir: process.env.NODE_ENV === "production" ? ".next" : ".next-dev"
```
- Faster dev rebuilds
- Production optimizations separate

**Image Optimization:**
```typescript
images: {
  formats: ["image/avif", "image/webp"],
  deviceSizes: [640, 768, 1024, 1280, 1536],
}
```

**Module Optimization:**
```typescript
modularizeImports: {
  "lucide-react": {
    transform: "lucide-react/dist/esm/icons/{{kebabCase member}}",
  },
}
```

### 2. Component Optimizations

- Use Client Components only when needed
- Server Components by default
- Lazy load heavy components
- Minimize bundle size

## Security Considerations

### 1. Form Validation

- Client-side with Zod
- Server-side validation (when backend added)
- XSS prevention with React
- CSRF tokens (for server actions)

### 2. Authentication

- HTTPOnly cookies (production)
- Secure session management
- Password hashing (backend)
- JWT validation

## Future Enhancements

### Backend Integration

**GraphQL API:**
```typescript
// codegen.ts
const config: CodegenConfig = {
  schema: process.env.GRAPHQL_URL,
  documents: ["src/**/*.graphql"],
  generates: {
    "src/generated/graphql.ts": {
      plugins: ["typescript", "typescript-operations", "typescript-react-apollo"],
    },
  },
};
```

**Benefits:**
- Type-safe queries
- Auto-generated hooks
- Role-based types
- Real-time subscriptions

### Database Schema

```sql
-- Users
CREATE TABLE users (
  id UUID PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  display_name TEXT,
  role TEXT DEFAULT 'student'
);

-- Courses
CREATE TABLE courses (
  id UUID PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  instructor_id UUID REFERENCES users(id),
  price DECIMAL(10,2)
);

-- Enrollments
CREATE TABLE enrollments (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  course_id UUID REFERENCES courses(id),
  progress INTEGER DEFAULT 0,
  enrolled_at TIMESTAMPTZ DEFAULT NOW()
);
```

### Real-time Features

**WebSocket Support:**
- Live progress updates
- Collaborative learning
- Chat functionality
- Notifications

## Deployment

### Vercel (Recommended)

1. Connect GitHub repository
2. Configure environment variables
3. Deploy automatically on push

### Environment Variables

```bash
# .env.local
NEXT_PUBLIC_API_URL=https://api.example.com
DATABASE_URL=postgresql://...
NEXTAUTH_SECRET=...
```

### Build Optimization

```bash
# Build for production
pnpm build

# Analyze bundle
ANALYZE=true pnpm build
```

## Monitoring

### Error Tracking

- Sentry for error monitoring
- LogRocket for session replay
- Analytics with PostHog/Google Analytics

### Performance Monitoring

- Web Vitals tracking
- Lighthouse CI
- Bundle size monitoring

## Best Practices

### Code Organization

1. **Group by feature** - Related files together
2. **Collocate tests** - Tests near implementation
3. **Barrel exports** - Clean imports
4. **Type everything** - No `any` types

### Component Design

1. **Single responsibility** - One thing per component
2. **Props interface** - Always type props
3. **Composition over inheritance** - Compose smaller components
4. **Accessibility first** - ARIA labels, keyboard nav

### State Management

1. **Local first** - Use local state when possible
2. **Global sparingly** - Only for truly global state
3. **Derived state** - Compute from source of truth
4. **Immutability** - Never mutate state directly

### Performance

1. **Code splitting** - Dynamic imports
2. **Memoization** - useMemo, useCallback when needed
3. **Virtualization** - For long lists
4. **Lazy loading** - Load on demand

## Common Patterns

### Protected Route

```typescript
"use client";

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/auth/login");
    }
  }, [isAuthenticated]);

  if (!isAuthenticated) return null;
  return <>{children}</>;
}
```

### Data Fetching

```typescript
// Server Component (default)
async function CoursePage({ params }: { params: { id: string } }) {
  const course = await fetchCourse(params.id);
  return <CourseDetails course={course} />;
}

// Client Component
"use client";
function CourseList() {
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    fetchCourses().then(setCourses);
  }, []);

  return <>{/* ... */}</>;
}
```

### Error Handling

```typescript
// error.tsx
"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div>
      <h2>Something went wrong!</h2>
      <button onClick={reset}>Try again</button>
    </div>
  );
}
```

## Conclusion

This architecture provides:

✅ Type safety throughout
✅ Modern React patterns
✅ Scalable state management
✅ Excellent developer experience
✅ Production-ready patterns
✅ Easy to test
✅ Easy to extend

The patterns used here are battle-tested in production applications and can scale from learning projects to enterprise applications.
