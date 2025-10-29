# Testing Guide

This document provides information about the testing infrastructure and best practices for the Learning Platform.

## Table of Contents

- [Overview](#overview)
- [Testing Stack](#testing-stack)
- [Running Tests](#running-tests)
- [Test Structure](#test-structure)
- [Writing Tests](#writing-tests)
- [Best Practices](#best-practices)
- [CI/CD Integration](#cicd-integration)

## Overview

The project maintains a comprehensive testing strategy with:

- **Unit Tests**: Testing individual functions and components
- **Integration Tests**: Testing how components work together
- **E2E Tests**: Testing complete user journeys

**Coverage Goal**: 30%+ code coverage

## Testing Stack

### Unit & Integration Testing

- **Vitest**: Fast unit test framework
- **React Testing Library**: Component testing utilities
- **@testing-library/user-event**: User interaction simulation
- **@faker-js/faker**: Mock data generation

### E2E Testing

- **Playwright**: End-to-end browser testing
- **Chromium**: Primary browser for E2E tests

### Test Utilities

- Custom render utilities with providers
- Mock data generators
- Test helpers for common scenarios

## Running Tests

### Unit & Component Tests

```bash
# Run tests in watch mode (development)
pnpm test

# Run all tests once
pnpm test:run

# Run tests with coverage
pnpm test:coverage

# Run tests with UI
pnpm test:ui
```

### E2E Tests

```bash
# Run E2E tests
pnpm test:e2e

# Run E2E tests in UI mode
pnpm test:e2e:ui

# Run E2E tests in headed mode (see browser)
pnpm test:e2e:headed
```

### All Tests

```bash
# Run all tests (unit + E2E)
pnpm test:all
```

## Test Structure

```
project-root/
├── src/
│   ├── components/
│   │   └── ui/
│   │       ├── button.tsx
│   │       └── __tests__/
│   │           └── button.test.tsx
│   ├── lib/
│   │   ├── utils.ts
│   │   └── __tests__/
│   │       └── utils.test.ts
│   ├── hooks/
│   │   ├── useInteractiveLessonProgress.ts
│   │   └── __tests__/
│   │       └── useInteractiveLessonProgress.test.ts
│   └── test-utils/
│       ├── index.tsx           # Custom render utilities
│       ├── mocks.ts            # Mock data generators
│       └── test-helpers.ts     # Test helper functions
├── e2e/
│   ├── auth.spec.ts
│   ├── courses.spec.ts
│   └── navigation.spec.ts
└── vitest.config.ts
```

## Writing Tests

### Unit Tests

Example of a utility function test:

```typescript
import { describe, it, expect } from "vitest";
import { calculateLevel } from "../xp";

describe("XP Calculations", () => {
  it("calculates level from XP correctly", () => {
    expect(calculateLevel(0)).toBe(1);
    expect(calculateLevel(1000)).toBe(2);
    expect(calculateLevel(3000)).toBe(3);
  });
});
```

### Component Tests

Example of a component test:

```typescript
import { describe, it, expect } from "vitest";
import { render, screen } from "@/test-utils";
import { Button } from "../button";

describe("Button", () => {
  it("renders button with text", () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText("Click me")).toBeInTheDocument();
  });

  it("handles click events", async () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click me</Button>);

    await userEvent.click(screen.getByText("Click me"));
    expect(handleClick).toHaveBeenCalledOnce();
  });
});
```

### Hook Tests

Example of a custom hook test:

```typescript
import { describe, it, expect } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useInteractiveLessonProgress } from "../useInteractiveLessonProgress";

describe("useInteractiveLessonProgress", () => {
  it("completes a step", () => {
    const { result } = renderHook(() =>
      useInteractiveLessonProgress("lesson-1", "user-1")
    );

    act(() => {
      result.current.completeStep("step-1");
    });

    expect(result.current.progress.completedSteps).toContain("step-1");
  });
});
```

### E2E Tests

Example of an E2E test:

```typescript
import { test, expect } from "@playwright/test";

test("user can navigate to courses page", async ({ page }) => {
  await page.goto("/");
  await page.click('a[href*="/courses"]');
  await expect(page).toHaveURL(/.*courses/);
});
```

## Best Practices

### General

1. **Test Behavior, Not Implementation**: Focus on what the component does, not how it does it
2. **Arrange-Act-Assert**: Structure tests with clear setup, action, and verification
3. **One Assertion Per Test**: Keep tests focused on a single behavior
4. **Descriptive Test Names**: Use clear, descriptive test names that explain what is being tested
5. **Avoid Test Interdependence**: Each test should be independent and runnable in isolation

### Component Testing

1. **Use Custom Render**: Always use the custom render from `@/test-utils` to include providers
2. **Query by Accessibility**: Prefer `getByRole`, `getByLabelText` over `getByTestId`
3. **User-Centric Testing**: Test as users would interact with the component
4. **Mock External Dependencies**: Mock API calls, contexts, and complex dependencies
5. **Test Error States**: Include tests for loading, error, and empty states

### E2E Testing

1. **Test Critical Paths**: Focus on the most important user journeys
2. **Use Page Objects**: Create reusable page objects for complex pages
3. **Wait for Elements**: Always wait for elements before interacting
4. **Test Isolation**: Reset database state between tests
5. **Meaningful Assertions**: Verify both UI state and data changes

### Mocking

```typescript
// Mock API calls
vi.mock("@/api/courses", () => ({
  getCourses: vi.fn().mockResolvedValue([mockCourse]),
}));

// Mock Next.js router
vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
  }),
}));

// Mock context
vi.mock("@/contexts/ProgressContext", () => ({
  useProgress: vi.fn().mockReturnValue({
    completedProjects: new Set(),
    markProjectComplete: vi.fn(),
  }),
}));
```

### Using Test Utilities

```typescript
// Generate mock data
import { mockCourse, mockUser, createMockArray } from "@/test-utils/mocks";

const courses = createMockArray(mockCourse, 5);
const user = mockUser({ level: 5, totalXP: 5000 });

// Use test helpers
import { mockFetchResponse, waitForAsync } from "@/test-utils/test-helpers";

mockFetchResponse({ courses }, true, 200);
```

## Coverage

### Viewing Coverage Reports

After running `pnpm test:coverage`, open:

```bash
open coverage/index.html  # macOS
xdg-open coverage/index.html  # Linux
start coverage/index.html  # Windows
```

### Coverage Thresholds

The project enforces minimum coverage thresholds:

- **Lines**: 30%
- **Functions**: 30%
- **Branches**: 30%
- **Statements**: 30%

## CI/CD Integration

Tests run automatically on:

- Push to `main` or `develop` branches
- Pull requests targeting `main` or `develop`

### GitHub Actions Workflow

The CI pipeline runs:

1. **Unit Tests**: Vitest tests with coverage
2. **E2E Tests**: Playwright tests
3. **Type Checking**: TypeScript compilation
4. **Linting**: ESLint checks

### Viewing Test Results

- **Coverage Reports**: Uploaded to Codecov
- **E2E Results**: Playwright HTML report uploaded as artifact
- **Build Status**: Badge in README

## Troubleshooting

### Common Issues

**Tests timing out:**

```typescript
// Increase timeout for specific test
it("slow test", async () => {
  // test code
}, 10000); // 10 second timeout
```

**Mock not working:**

```typescript
// Ensure mocks are cleared between tests
beforeEach(() => {
  vi.clearAllMocks();
});
```

**Component not rendering:**

```typescript
// Use custom render with providers
import { render } from "@/test-utils";
// NOT: import { render } from "@testing-library/react";
```

**E2E test failing intermittently:**

```typescript
// Add proper waits
await page.waitForLoadState("networkidle");
await page.waitForSelector("[data-testid='element']");
```

## Resources

- [Vitest Documentation](https://vitest.dev/)
- [React Testing Library](https://testing-library.com/react)
- [Playwright Documentation](https://playwright.dev/)
- [Testing Best Practices](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)

## Contributing

When adding new features:

1. Write tests first (TDD approach recommended)
2. Ensure tests pass locally
3. Verify coverage hasn't decreased
4. Update this documentation if adding new patterns

## Questions?

If you have questions about testing:

1. Check this documentation
2. Review existing tests for examples
3. Ask in team chat or open an issue
