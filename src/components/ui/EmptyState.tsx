import { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import {
  BookOpen,
  Inbox,
  Search,
  FileQuestion,
  AlertCircle,
  LucideIcon,
} from "lucide-react";

interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  children?: ReactNode;
  className?: string;
}

/**
 * Generic empty state component with icon, title, description, and optional action
 * Provides consistent empty states across the application
 */
export function EmptyState({
  icon: Icon = Inbox,
  title,
  description,
  action,
  children,
  className = "",
}: EmptyStateProps) {
  return (
    <div
      className={`flex flex-col items-center justify-center text-center p-8 ${className}`}
      role="status"
      aria-live="polite"
    >
      <div className="rounded-full bg-muted p-6 mb-4">
        <Icon className="h-12 w-12 text-muted-foreground" aria-hidden="true" />
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      {description && (
        <p className="text-muted-foreground max-w-md mb-6">{description}</p>
      )}
      {action && (
        <Button onClick={action.onClick} aria-label={action.label}>
          {action.label}
        </Button>
      )}
      {children}
    </div>
  );
}

/**
 * Pre-configured empty state for no courses
 */
export function EmptyStateCourses({
  onAction,
}: {
  onAction?: () => void;
}) {
  return (
    <EmptyState
      icon={BookOpen}
      title="No courses available"
      description="There are no courses to display at the moment. Check back later or browse other sections."
      action={
        onAction
          ? {
              label: "Browse All Courses",
              onClick: onAction,
            }
          : undefined
      }
    />
  );
}

/**
 * Pre-configured empty state for no search results
 */
export function EmptyStateSearch({
  searchTerm,
  onClear,
}: {
  searchTerm?: string;
  onClear?: () => void;
}) {
  return (
    <EmptyState
      icon={Search}
      title={`No results found${searchTerm ? ` for "${searchTerm}"` : ""}`}
      description="Try adjusting your search terms or filters to find what you're looking for."
      action={
        onClear
          ? {
              label: "Clear Search",
              onClick: onClear,
            }
          : undefined
      }
    />
  );
}

/**
 * Pre-configured empty state for no lessons
 */
export function EmptyStateLessons({
  onAction,
}: {
  onAction?: () => void;
}) {
  return (
    <EmptyState
      icon={FileQuestion}
      title="No lessons yet"
      description="Start your learning journey by enrolling in a course."
      action={
        onAction
          ? {
              label: "Explore Courses",
              onClick: onAction,
            }
          : undefined
      }
    />
  );
}

/**
 * Pre-configured empty state for errors
 */
export function EmptyStateError({
  title = "Something went wrong",
  description = "We encountered an error while loading this content. Please try again.",
  onRetry,
}: {
  title?: string;
  description?: string;
  onRetry?: () => void;
}) {
  return (
    <EmptyState
      icon={AlertCircle}
      title={title}
      description={description}
      action={
        onRetry
          ? {
              label: "Try Again",
              onClick: onRetry,
            }
          : undefined
      }
    />
  );
}

/**
 * Generic error boundary fallback
 */
export function ErrorFallback({
  error,
  resetErrorBoundary,
}: {
  error: Error;
  resetErrorBoundary?: () => void;
}) {
  return (
    <div
      className="min-h-[400px] flex items-center justify-center p-8"
      role="alert"
      aria-live="assertive"
    >
      <div className="text-center max-w-md">
        <div className="rounded-full bg-red-100 dark:bg-red-950 p-6 mb-4 inline-flex">
          <AlertCircle
            className="h-12 w-12 text-red-600 dark:text-red-400"
            aria-hidden="true"
          />
        </div>
        <h2 className="text-2xl font-bold mb-2">Oops! Something went wrong</h2>
        <p className="text-muted-foreground mb-4">
          We encountered an unexpected error. Our team has been notified.
        </p>
        {process.env.NODE_ENV === "development" && (
          <details className="text-left bg-muted p-4 rounded-lg mb-4">
            <summary className="cursor-pointer font-medium mb-2">
              Error details
            </summary>
            <pre className="text-xs overflow-auto">
              {error.message}
              {error.stack && `\n\n${error.stack}`}
            </pre>
          </details>
        )}
        {resetErrorBoundary && (
          <Button onClick={resetErrorBoundary}>Try Again</Button>
        )}
      </div>
    </div>
  );
}
