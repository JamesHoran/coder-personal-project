# Testing Quick Reference

Quick commands and examples for testing in the Learning Platform.

## Quick Commands

```bash
# Unit Tests
pnpm test              # Watch mode
pnpm test:run          # Run once
pnpm test:coverage     # With coverage report

# E2E Tests
pnpm test:e2e          # Run all E2E tests
pnpm test:e2e:ui       # Interactive UI mode
pnpm test:e2e:headed   # See browser

# All Tests
pnpm test:all          # Unit + E2E
```

## Test Templates

### Unit Test Template

```typescript
import { describe, it, expect } from "vitest";
import { myFunction } from "../myFunction";

describe("myFunction", () => {
  it("does something", () => {
    const result = myFunction("input");
    expect(result).toBe("expected");
  });
});
```

### Component Test Template

```typescript
import { describe, it, expect } from "vitest";
import { render, screen } from "@/test-utils";
import { MyComponent } from "../MyComponent";

describe("MyComponent", () => {
  it("renders correctly", () => {
    render(<MyComponent title="Test" />);
    expect(screen.getByText("Test")).toBeInTheDocument();
  });
});
```

### Hook Test Template

```typescript
import { describe, it, expect } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useMyHook } from "../useMyHook";

describe("useMyHook", () => {
  it("updates state", () => {
    const { result } = renderHook(() => useMyHook());

    act(() => {
      result.current.updateSomething("value");
    });

    expect(result.current.something).toBe("value");
  });
});
```

### E2E Test Template

```typescript
import { test, expect } from "@playwright/test";

test("user flow description", async ({ page }) => {
  await page.goto("/");
  await page.click('button:text("Click Me")');
  await expect(page).toHaveURL(/.*success/);
});
```

## Common Queries

```typescript
// By role (preferred)
screen.getByRole("button", { name: /submit/i });
screen.getByRole("heading", { level: 1 });

// By label text
screen.getByLabelText("Email");

// By placeholder
screen.getByPlaceholderText("Enter email");

// By text
screen.getByText("Welcome");

// By test id (last resort)
screen.getByTestId("custom-element");
```

## Assertions

```typescript
// Existence
expect(element).toBeInTheDocument();
expect(element).not.toBeInTheDocument();

// Visibility
expect(element).toBeVisible();
expect(element).not.toBeVisible();

// Disabled state
expect(button).toBeDisabled();
expect(button).toBeEnabled();

// Text content
expect(element).toHaveTextContent("text");

// Class
expect(element).toHaveClass("class-name");

// Attribute
expect(element).toHaveAttribute("href", "/path");
```

## Mocking

```typescript
// Mock function
const mockFn = vi.fn();
mockFn.mockReturnValue("value");
mockFn.mockResolvedValue("async value");

// Mock module
vi.mock("@/lib/api", () => ({
  fetchData: vi.fn().mockResolvedValue({ data: "mock" }),
}));

// Clear mocks
beforeEach(() => {
  vi.clearAllMocks();
});
```

## User Events

```typescript
import { userEvent } from "@testing-library/user-event";

// Click
await userEvent.click(button);

// Type
await userEvent.type(input, "text");

// Select
await userEvent.selectOptions(select, "option1");

// Upload file
await userEvent.upload(fileInput, file);
```

## E2E Page Actions

```typescript
// Navigation
await page.goto("/path");

// Click
await page.click("button");
await page.locator("button").click();

// Fill input
await page.fill('input[type="text"]', "value");

// Select
await page.selectOption("select", "option");

// Wait
await page.waitForSelector(".element");
await page.waitForLoadState("networkidle");

// Assertions
await expect(page).toHaveURL(/.*path/);
await expect(page.locator("h1")).toBeVisible();
await expect(page.locator("button")).toBeDisabled();
```

## Coverage Commands

```bash
# Generate coverage
pnpm test:coverage

# View HTML report
open coverage/index.html       # macOS
xdg-open coverage/index.html   # Linux
start coverage/index.html      # Windows
```

## Debugging

```typescript
// Component debugging
import { screen } from "@testing-library/react";
screen.debug(); // Prints DOM

// Vitest debugging
import { vi } from "vitest";
console.log(vi.mocked(mockFn).mock.calls);

// Playwright debugging
await page.pause(); // Pauses execution
PWDEBUG=1 pnpm test:e2e  # Debug mode
```

## Tips

1. **Always use custom render**: `import { render } from "@/test-utils"`
2. **Prefer accessible queries**: Use `getByRole` over `getByTestId`
3. **Test user behavior**: Don't test implementation details
4. **Wait for async**: Use `waitFor` for async updates
5. **Mock external deps**: Don't make real API calls in tests

## File Locations

- Unit tests: `src/**/__tests__/*.test.ts(x)`
- E2E tests: `e2e/*.spec.ts`
- Test utils: `src/test-utils/`
- Coverage: `coverage/`
- Playwright report: `playwright-report/`
