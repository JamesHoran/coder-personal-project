import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useInteractiveLessonProgress } from "../useInteractiveLessonProgress";

// Mock fetch
global.fetch = vi.fn();

describe("useInteractiveLessonProgress", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    (global.fetch as any).mockReset();
  });

  it("initializes with default progress state", () => {
    const { result } = renderHook(() =>
      useInteractiveLessonProgress("lesson-1", "user-1")
    );

    expect(result.current.progress).toMatchObject({
      userId: "user-1",
      lessonId: "lesson-1",
      currentStepIndex: 0,
      completedSteps: [],
      code: {},
      completed: false,
      xpEarned: 0,
    });
    expect(result.current.totalXP).toBe(0);
  });

  it("completes a step", () => {
    const { result } = renderHook(() =>
      useInteractiveLessonProgress("lesson-1", "user-1")
    );

    act(() => {
      result.current.completeStep("step-1");
    });

    expect(result.current.progress.completedSteps).toContain("step-1");
  });

  it("does not add duplicate completed steps", () => {
    const { result } = renderHook(() =>
      useInteractiveLessonProgress("lesson-1", "user-1")
    );

    act(() => {
      result.current.completeStep("step-1");
      result.current.completeStep("step-1");
    });

    expect(result.current.progress.completedSteps).toEqual(["step-1"]);
  });

  it("saves code for a step", () => {
    const { result } = renderHook(() =>
      useInteractiveLessonProgress("lesson-1", "user-1")
    );

    act(() => {
      result.current.saveCode("step-1", "const x = 1;");
    });

    expect(result.current.progress.code["step-1"]).toBe("const x = 1;");
  });

  it("updates current step index", () => {
    const { result } = renderHook(() =>
      useInteractiveLessonProgress("lesson-1", "user-1")
    );

    act(() => {
      result.current.updateCurrentStep(3);
    });

    expect(result.current.progress.currentStepIndex).toBe(3);
  });

  it("completes lesson and updates XP on success", async () => {
    const mockResponse = {
      success: true,
      data: {
        totalXP: 500,
        leveledUp: false,
        achievements: [],
      },
    };

    (global.fetch as any).mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });

    const { result } = renderHook(() =>
      useInteractiveLessonProgress("lesson-1", "user-1")
    );

    await act(async () => {
      await result.current.completeLesson(100);
    });

    expect(result.current.progress.completed).toBe(true);
    expect(result.current.progress.xpEarned).toBe(100);
    expect(result.current.totalXP).toBe(500);
    expect(global.fetch).toHaveBeenCalledWith(
      "/api/lessons/complete",
      expect.objectContaining({
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: "user-1",
          lessonId: "lesson-1",
          xp: 100,
        }),
      })
    );
  });

  it("handles API error during lesson completion", async () => {
    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});

    (global.fetch as any).mockRejectedValueOnce(new Error("Network error"));

    const { result } = renderHook(() =>
      useInteractiveLessonProgress("lesson-1", "user-1")
    );

    await act(async () => {
      await result.current.completeLesson(100);
    });

    expect(result.current.progress.completed).toBe(true);
    expect(result.current.progress.xpEarned).toBe(100);
    expect(consoleSpy).toHaveBeenCalledWith(
      "Error completing lesson:",
      expect.any(Error)
    );

    consoleSpy.mockRestore();
  });

  it("handles unsuccessful API response", async () => {
    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});

    const mockResponse = {
      success: false,
      error: "Failed to save",
    };

    (global.fetch as any).mockResolvedValueOnce({
      ok: false,
      json: async () => mockResponse,
    });

    const { result } = renderHook(() =>
      useInteractiveLessonProgress("lesson-1", "user-1")
    );

    await act(async () => {
      await result.current.completeLesson(100);
    });

    expect(consoleSpy).toHaveBeenCalledWith(
      "Failed to save lesson progress:",
      "Failed to save"
    );

    consoleSpy.mockRestore();
  });
});
