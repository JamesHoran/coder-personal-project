import { vi } from "vitest";

/**
 * Mock Next.js router
 */
export const mockRouter = {
  push: vi.fn(),
  replace: vi.fn(),
  back: vi.fn(),
  forward: vi.fn(),
  refresh: vi.fn(),
  prefetch: vi.fn(),
};

/**
 * Mock fetch response
 */
export const mockFetchResponse = (data: any, ok = true, status = 200) => {
  global.fetch = vi.fn(() =>
    Promise.resolve({
      ok,
      status,
      json: () => Promise.resolve(data),
      text: () => Promise.resolve(JSON.stringify(data)),
    } as Response)
  );
};

/**
 * Mock fetch error
 */
export const mockFetchError = (message = "Network error") => {
  global.fetch = vi.fn(() => Promise.reject(new Error(message)));
};

/**
 * Wait for async updates
 */
export const waitForAsync = () =>
  new Promise((resolve) => setTimeout(resolve, 0));

/**
 * Mock localStorage
 */
export const mockLocalStorage = () => {
  const store: Record<string, string> = {};

  return {
    getItem: vi.fn((key: string) => store[key] || null),
    setItem: vi.fn((key: string, value: string) => {
      store[key] = value;
    }),
    removeItem: vi.fn((key: string) => {
      delete store[key];
    }),
    clear: vi.fn(() => {
      Object.keys(store).forEach((key) => delete store[key]);
    }),
  };
};

/**
 * Mock console methods
 */
export const mockConsole = () => {
  const originalConsole = { ...console };

  return {
    mock: () => {
      console.log = vi.fn();
      console.error = vi.fn();
      console.warn = vi.fn();
      console.info = vi.fn();
    },
    restore: () => {
      console.log = originalConsole.log;
      console.error = originalConsole.error;
      console.warn = originalConsole.warn;
      console.info = originalConsole.info;
    },
  };
};

/**
 * Create mock API response
 */
export const createMockApiResponse = <T>(data: T, success = true) => ({
  success,
  data: success ? data : undefined,
  error: success ? undefined : "An error occurred",
});

/**
 * Mock IntersectionObserver
 */
export const mockIntersectionObserver = () => {
  global.IntersectionObserver = vi.fn().mockImplementation(() => ({
    observe: vi.fn(),
    unobserve: vi.fn(),
    disconnect: vi.fn(),
  }));
};

/**
 * Mock ResizeObserver
 */
export const mockResizeObserver = () => {
  global.ResizeObserver = vi.fn().mockImplementation(() => ({
    observe: vi.fn(),
    unobserve: vi.fn(),
    disconnect: vi.fn(),
  }));
};
