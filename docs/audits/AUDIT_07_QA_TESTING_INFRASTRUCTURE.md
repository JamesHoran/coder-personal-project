# AUDIT TASK 07: QA Testing Infrastructure

**Category:** QA & TESTING
**Priority:** 🟡 HIGH (for long-term quality)
**Estimated Effort:** 20-30 hours
**Dependencies:** Should be done alongside fixes

---

## Current State

**Testing Coverage:** ~0%
- No unit tests
- No integration tests
- No E2E tests
- No test infrastructure

**Problem:** Many bugs found in audit would have been caught by tests.

---

## Goals

1. **Prevent Regressions:** Ensure fixes stay fixed
2. **Catch Bugs Early:** Find issues before users do
3. **Document Behavior:** Tests serve as documentation
4. **Enable Refactoring:** Tests give confidence to change code
5. **Improve Code Quality:** Testable code is better code

---

## Testing Strategy

### Level 1: Unit Tests (30% coverage goal)
Test individual functions and components in isolation.

**Focus Areas:**
- Utility functions
- Custom hooks
- Form validation
- Data transformations
- Business logic

**Tools:**
- Jest
- React Testing Library
- @testing-library/user-event

---

### Level 2: Integration Tests (20% coverage goal)
Test how components work together.

**Focus Areas:**
- API endpoints
- Page components with data fetching
- Complex user interactions
- Context providers
- Form submissions

**Tools:**
- Jest
- React Testing Library
- MSW (Mock Service Worker) for API mocking

---

### Level 3: E2E Tests (Critical flows only)
Test complete user journeys.

**Critical Flows to Test:**
1. Sign up → Dashboard
2. Log in → Browse courses → Enroll → Start lesson
3. Complete lesson → Earn XP → Level up
4. Complete challenge → Unlock badge
5. View leaderboard
6. Navigate using global nav

**Tools:**
- Playwright (recommended)
- OR Cypress

---

## Tasks to Complete

### Phase 1: Setup Testing Infrastructure
- [ ] Install testing dependencies
- [ ] Configure Jest
- [ ] Configure React Testing Library
- [ ] Setup test utilities
- [ ] Create test helpers
- [ ] Setup coverage reporting
- [ ] Add test scripts to package.json
- [ ] Configure CI/CD for tests

### Phase 2: Unit Tests - Utilities
- [ ] Test form validation functions
- [ ] Test date/time formatters
- [ ] Test XP calculation functions
- [ ] Test progress calculation
- [ ] Test helper functions
- [ ] Aim for 80%+ coverage on utilities

### Phase 3: Unit Tests - Hooks
- [ ] Test useAuth hook
- [ ] Test useProgress hook
- [ ] Test useEnrollment hook
- [ ] Test useInteractiveLessonProgress
- [ ] Test custom hooks
- [ ] Mock external dependencies

### Phase 4: Component Tests
- [ ] Test form components (login, signup)
- [ ] Test button components
- [ ] Test card components
- [ ] Test modal components
- [ ] Test navigation components
- [ ] Test interactive lesson player

### Phase 5: Integration Tests - API
- [ ] Test /api/progress endpoints
- [ ] Test /api/courses endpoints
- [ ] Test /api/enrollments endpoints
- [ ] Test /api/auth endpoints
- [ ] Test /api/challenges endpoints
- [ ] Test error handling
- [ ] Test authentication middleware

### Phase 6: Integration Tests - Pages
- [ ] Test dashboard page with data
- [ ] Test course detail page
- [ ] Test learn page
- [ ] Test courses listing page
- [ ] Test profile page
- [ ] Test leaderboard page

### Phase 7: E2E Tests
- [ ] Setup Playwright
- [ ] Write signup flow test
- [ ] Write login flow test
- [ ] Write course enrollment test
- [ ] Write lesson completion test
- [ ] Write challenge completion test
- [ ] Write navigation tests
- [ ] Add visual regression tests (optional)

### Phase 8: CI/CD Integration
- [ ] Add GitHub Actions workflow
- [ ] Run tests on PR
- [ ] Block merge if tests fail
- [ ] Generate coverage reports
- [ ] Add status badges to README

---

## Files to Create

### Test Setup
- [jest.config.js](jest.config.js)
- [jest.setup.js](jest.setup.js)
- [playwright.config.ts](playwright.config.ts)
- [src/test-utils/index.tsx](src/test-utils/index.tsx)
- [src/test-utils/mocks.ts](src/test-utils/mocks.ts)

### Unit Tests
- [src/utils/__tests__/validation.test.ts](src/utils/__tests__/validation.test.ts)
- [src/utils/__tests__/xp.test.ts](src/utils/__tests__/xp.test.ts)
- [src/hooks/__tests__/useAuth.test.ts](src/hooks/__tests__/useAuth.test.ts)
- [src/hooks/__tests__/useProgress.test.ts](src/hooks/__tests__/useProgress.test.ts)

### Component Tests
- [src/components/course/__tests__/CourseCard.test.tsx](src/components/course/__tests__/CourseCard.test.tsx)
- [src/components/course/__tests__/ProjectButton.test.tsx](src/components/course/__tests__/ProjectButton.test.tsx)
- [src/components/course/__tests__/ChallengeButton.test.tsx](src/components/course/__tests__/ChallengeButton.test.tsx)

### API Tests
- [src/app/api/__tests__/progress.test.ts](src/app/api/__tests__/progress.test.ts)
- [src/app/api/__tests__/enrollments.test.ts](src/app/api/__tests__/enrollments.test.ts)

### E2E Tests
- [e2e/auth.spec.ts](e2e/auth.spec.ts)
- [e2e/enrollment.spec.ts](e2e/enrollment.spec.ts)
- [e2e/lessons.spec.ts](e2e/lessons.spec.ts)

### CI/CD
- [.github/workflows/test.yml](.github/workflows/test.yml)

---

## NPM Packages to Install

```bash
# Core testing
npm install -D jest @types/jest
npm install -D @testing-library/react @testing-library/jest-dom
npm install -D @testing-library/user-event

# Next.js testing
npm install -D @testing-library/react-hooks
npm install -D jest-environment-jsdom

# API mocking
npm install -D msw

# E2E testing
npm install -D @playwright/test
npm install -D playwright

# Coverage
npm install -D @jest/globals

# Test utilities
npm install -D @faker-js/faker
```

---

## Jest Configuration

```javascript
// jest.config.js
const nextJest = require('next/jest')

const createJestConfig = nextJest({
  dir: './',
})

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    '!src/**/*.d.ts',
    '!src/**/*.stories.tsx',
    '!src/**/_*.tsx',
  ],
  coverageThreshold: {
    global: {
      branches: 30,
      functions: 30,
      lines: 30,
      statements: 30,
    },
  },
}

module.exports = createJestConfig(customJestConfig)
```

---

## Example Tests

### Unit Test Example:
```typescript
// src/utils/__tests__/xp.test.ts
import { calculateLevel, getXPForNextLevel } from '../xp';

describe('XP Calculations', () => {
  test('calculates level from XP correctly', () => {
    expect(calculateLevel(0)).toBe(1);
    expect(calculateLevel(1000)).toBe(2);
    expect(calculateLevel(3000)).toBe(3);
  });

  test('calculates XP needed for next level', () => {
    expect(getXPForNextLevel(1)).toBe(1000);
    expect(getXPForNextLevel(2)).toBe(2000);
  });
});
```

### Component Test Example:
```typescript
// src/components/course/__tests__/CourseCard.test.tsx
import { render, screen } from '@testing-library/react';
import { CourseCard } from '../CourseCard';

describe('CourseCard', () => {
  const mockCourse = {
    id: '1',
    title: 'Test Course',
    description: 'Test Description',
    totalXP: 1000,
  };

  test('renders course title', () => {
    render(<CourseCard course={mockCourse} />);
    expect(screen.getByText('Test Course')).toBeInTheDocument();
  });

  test('displays XP correctly', () => {
    render(<CourseCard course={mockCourse} />);
    expect(screen.getByText(/1000.*XP/i)).toBeInTheDocument();
  });
});
```

### E2E Test Example:
```typescript
// e2e/enrollment.spec.ts
import { test, expect } from '@playwright/test';

test('user can enroll in a course', async ({ page }) => {
  await page.goto('/auth/login');

  // Login
  await page.fill('input[type="email"]', 'test@example.com');
  await page.fill('input[type="password"]', 'password123');
  await page.click('button[type="submit"]');

  // Navigate to courses
  await page.goto('/courses');

  // Click on a course
  await page.click('text=TypeScript Mastery');

  // Enroll
  await page.click('text=Enroll Now');

  // Verify enrollment
  await expect(page.locator('text=Successfully enrolled')).toBeVisible();

  // Check dashboard
  await page.goto('/dashboard');
  await expect(page.locator('text=TypeScript Mastery')).toBeVisible();
});
```

---

## Testing Checklist

### For Each Bug Fix:
- [ ] Write test that reproduces the bug
- [ ] Verify test fails
- [ ] Fix the bug
- [ ] Verify test passes
- [ ] Add regression test to prevent recurrence

### For Each New Feature:
- [ ] Write tests first (TDD)
- [ ] Test happy path
- [ ] Test edge cases
- [ ] Test error cases
- [ ] Test with different user roles
- [ ] Test accessibility

---

## Success Criteria

- ✅ 30%+ code coverage
- ✅ All critical user flows have E2E tests
- ✅ All utility functions have unit tests
- ✅ All API endpoints have integration tests
- ✅ Tests run in CI/CD
- ✅ Tests pass consistently
- ✅ No flaky tests
- ✅ Fast test execution (<5 min total)

---

## CI/CD Workflow

```yaml
# .github/workflows/test.yml
name: Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'

      - name: Install dependencies
        run: pnpm install

      - name: Run unit tests
        run: pnpm test

      - name: Run E2E tests
        run: pnpm test:e2e

      - name: Upload coverage
        uses: codecov/codecov-action@v3
```

---

## Maintenance

### Daily:
- Run tests locally before committing
- Fix failing tests immediately

### Weekly:
- Review coverage reports
- Identify untested areas
- Add tests for new features

### Monthly:
- Review and update test strategy
- Remove obsolete tests
- Refactor test code
- Update testing dependencies
