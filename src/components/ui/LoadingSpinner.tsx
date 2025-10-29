import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg" | "xl";
  text?: string;
  fullScreen?: boolean;
  className?: string;
}

/**
 * Accessible loading spinner component
 * Includes proper ARIA attributes for screen readers
 */
export function LoadingSpinner({
  size = "md",
  text = "Loading...",
  fullScreen = false,
  className = "",
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-8 w-8",
    lg: "h-12 w-12",
    xl: "h-16 w-16",
  };

  const spinner = (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-3",
        fullScreen && "min-h-screen",
        className
      )}
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <Loader2
        className={cn("animate-spin text-primary", sizeClasses[size])}
        aria-hidden="true"
      />
      {text && (
        <span className="text-sm text-muted-foreground">{text}</span>
      )}
      <span className="sr-only">{text}</span>
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50">
        {spinner}
      </div>
    );
  }

  return spinner;
}

/**
 * Inline loading spinner for buttons and small spaces
 */
export function InlineSpinner({ className = "" }: { className?: string }) {
  return (
    <Loader2
      className={cn("h-4 w-4 animate-spin", className)}
      role="status"
      aria-label="Loading"
    />
  );
}

/**
 * Loading overlay for content areas
 */
export function LoadingOverlay({
  text = "Loading...",
  transparent = false,
}: {
  text?: string;
  transparent?: boolean;
}) {
  return (
    <div
      className={cn(
        "absolute inset-0 flex items-center justify-center z-10",
        transparent ? "bg-background/60" : "bg-background"
      )}
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <div className="flex flex-col items-center gap-3">
        <Loader2
          className="h-8 w-8 animate-spin text-primary"
          aria-hidden="true"
        />
        <span className="text-sm text-muted-foreground">{text}</span>
        <span className="sr-only">{text}</span>
      </div>
    </div>
  );
}

/**
 * Loading spinner for buttons
 */
export function ButtonSpinner() {
  return (
    <Loader2
      className="h-4 w-4 animate-spin mr-2"
      role="status"
      aria-label="Loading"
    />
  );
}
