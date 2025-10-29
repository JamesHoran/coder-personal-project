"use client";

import { cn } from "@/lib/utils";

interface SkipLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

/**
 * Skip link component for keyboard navigation accessibility
 * Allows keyboard users to skip to main content
 *
 * Usage: Place at the very top of your layout/page
 * <SkipLink href="#main-content">Skip to main content</SkipLink>
 */
export function SkipLink({ href, children, className }: SkipLinkProps) {
  return (
    <a
      href={href}
      className={cn(
        // Position off-screen by default
        "absolute -translate-y-full left-4 top-4 z-50",
        // Show on focus
        "focus:translate-y-0",
        // Styling
        "bg-primary text-primary-foreground px-4 py-2 rounded-md",
        "font-medium text-sm",
        "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
        "transition-transform duration-200",
        className
      )}
    >
      {children}
    </a>
  );
}

/**
 * Multiple skip links for complex pages
 */
export function SkipLinks() {
  return (
    <div className="sr-only-focusable">
      <SkipLink href="#main-content">Skip to main content</SkipLink>
      <SkipLink href="#navigation" className="left-40">
        Skip to navigation
      </SkipLink>
      <SkipLink href="#footer" className="left-72">
        Skip to footer
      </SkipLink>
    </div>
  );
}

/**
 * Visually hidden class for screen readers only
 */
export function VisuallyHidden({
  children,
  as: Component = "span",
  ...props
}: {
  children: React.ReactNode;
  as?: React.ElementType;
  [key: string]: any;
}) {
  return (
    <Component className="sr-only" {...props}>
      {children}
    </Component>
  );
}

/**
 * Focus trap for modals and dialogs
 */
export function useFocusTrap(ref: React.RefObject<HTMLElement>) {
  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key !== "Tab") return;

    const focusableElements = ref.current?.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );

    if (!focusableElements || focusableElements.length === 0) return;

    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[
      focusableElements.length - 1
    ] as HTMLElement;

    if (event.shiftKey) {
      // Shift + Tab
      if (document.activeElement === firstElement) {
        lastElement.focus();
        event.preventDefault();
      }
    } else {
      // Tab
      if (document.activeElement === lastElement) {
        firstElement.focus();
        event.preventDefault();
      }
    }
  };

  return { handleKeyDown };
}
