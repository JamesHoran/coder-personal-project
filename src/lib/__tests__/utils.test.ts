import { describe, it, expect } from "vitest";
import { cn } from "../utils";

describe("utils", () => {
  describe("cn", () => {
    it("merges class names correctly", () => {
      const result = cn("text-red-500", "bg-blue-500");
      expect(result).toBe("text-red-500 bg-blue-500");
    });

    it("handles conditional classes", () => {
      const result = cn("base-class", false && "hidden", "visible");
      expect(result).toBe("base-class visible");
    });

    it("merges tailwind classes correctly", () => {
      const result = cn("p-4", "p-8");
      expect(result).toBe("p-8");
    });

    it("handles undefined and null values", () => {
      const result = cn("text-base", undefined, null, "font-bold");
      expect(result).toBe("text-base font-bold");
    });

    it("handles arrays of classes", () => {
      const result = cn(["text-sm", "font-medium"], "text-blue-500");
      expect(result).toBe("text-sm font-medium text-blue-500");
    });

    it("handles empty input", () => {
      const result = cn();
      expect(result).toBe("");
    });
  });
});
