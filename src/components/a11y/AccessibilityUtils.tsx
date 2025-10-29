"use client";

import { useEffect, useRef } from "react";

/**
 * Hook to announce content changes to screen readers
 */
export function useAnnounce() {
  const announceRef = useRef<HTMLDivElement>(null);

  const announce = (
    message: string,
    politeness: "polite" | "assertive" = "polite"
  ) => {
    if (announceRef.current) {
      announceRef.current.setAttribute("aria-live", politeness);
      announceRef.current.textContent = message;

      // Clear after announcement
      setTimeout(() => {
        if (announceRef.current) {
          announceRef.current.textContent = "";
        }
      }, 1000);
    }
  };

  const AnnouncementRegion = () => (
    <div
      ref={announceRef}
      role="status"
      aria-live="polite"
      aria-atomic="true"
      className="sr-only"
    />
  );

  return { announce, AnnouncementRegion };
}

/**
 * Hook to manage focus for modal/dialog opening
 */
export function useFocusManagement(isOpen: boolean) {
  const previousFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      // Store the currently focused element
      previousFocusRef.current = document.activeElement as HTMLElement;
    } else {
      // Restore focus when closed
      if (previousFocusRef.current) {
        previousFocusRef.current.focus();
      }
    }
  }, [isOpen]);

  return previousFocusRef;
}

/**
 * Hook to detect keyboard navigation
 * Adds a class to body when user is using keyboard
 */
export function useKeyboardUser() {
  useEffect(() => {
    let isKeyboardUser = false;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Tab") {
        isKeyboardUser = true;
        document.body.classList.add("keyboard-user");
      }
    };

    const handleMouseDown = () => {
      isKeyboardUser = false;
      document.body.classList.remove("keyboard-user");
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleMouseDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleMouseDown);
    };
  }, []);
}

/**
 * Hook to trap focus within an element (for modals)
 */
export function useFocusTrap(isActive: boolean) {
  const elementRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!isActive || !elementRef.current) return;

    const element = elementRef.current;
    const focusableElements = element.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;

      if (e.shiftKey) {
        // Shift + Tab
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        }
      } else {
        // Tab
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    };

    element.addEventListener("keydown", handleTab as any);

    // Focus first element on mount
    firstElement?.focus();

    return () => {
      element.removeEventListener("keydown", handleTab as any);
    };
  }, [isActive]);

  return elementRef;
}

/**
 * Hook to handle escape key
 */
export function useEscapeKey(callback: () => void, isActive: boolean = true) {
  useEffect(() => {
    if (!isActive) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        callback();
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [callback, isActive]);
}

/**
 * Component to provide live region announcements
 */
export function LiveRegion({
  message,
  politeness = "polite",
}: {
  message: string;
  politeness?: "polite" | "assertive" | "off";
}) {
  return (
    <div
      role="status"
      aria-live={politeness}
      aria-atomic="true"
      className="sr-only"
    >
      {message}
    </div>
  );
}

/**
 * Get color contrast ratio
 * Returns the contrast ratio between two hex colors
 */
export function getContrastRatio(color1: string, color2: string): number {
  const getLuminance = (hex: string): number => {
    // Remove # if present
    hex = hex.replace("#", "");

    // Convert to RGB
    const r = parseInt(hex.substr(0, 2), 16) / 255;
    const g = parseInt(hex.substr(2, 2), 16) / 255;
    const b = parseInt(hex.substr(4, 2), 16) / 255;

    // Calculate relative luminance
    const [rs, gs, bs] = [r, g, b].map((c) =>
      c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)
    );

    return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
  };

  const lum1 = getLuminance(color1);
  const lum2 = getLuminance(color2);

  const brightest = Math.max(lum1, lum2);
  const darkest = Math.min(lum1, lum2);

  return (brightest + 0.05) / (darkest + 0.05);
}

/**
 * Check if contrast ratio meets WCAG standards
 */
export function meetsWCAGContrast(
  color1: string,
  color2: string,
  level: "AA" | "AAA" = "AA",
  textSize: "normal" | "large" = "normal"
): boolean {
  const ratio = getContrastRatio(color1, color2);

  if (level === "AAA") {
    return textSize === "large" ? ratio >= 4.5 : ratio >= 7;
  }

  // AA level
  return textSize === "large" ? ratio >= 3 : ratio >= 4.5;
}
