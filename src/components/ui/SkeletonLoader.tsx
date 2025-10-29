import { cn } from "@/lib/utils";

interface SkeletonProps {
  className?: string;
}

/**
 * Basic skeleton component for loading states
 */
export function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-muted", className)}
      role="status"
      aria-label="Loading"
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
}

interface SkeletonLoaderProps {
  type:
    | "text"
    | "title"
    | "card"
    | "courseCard"
    | "lessonCard"
    | "avatar"
    | "button"
    | "badge"
    | "custom";
  count?: number;
  className?: string;
}

/**
 * Reusable skeleton loader for different content types
 * Provides consistent loading states across the application
 */
export function SkeletonLoader({
  type,
  count = 1,
  className = "",
}: SkeletonLoaderProps) {
  const items = Array.from({ length: count }, (_, i) => i);

  const renderSkeleton = () => {
    switch (type) {
      case "text":
        return (
          <div className="space-y-2">
            {items.map((i) => (
              <Skeleton key={i} className="h-4 w-full" />
            ))}
          </div>
        );

      case "title":
        return (
          <div className="space-y-3">
            {items.map((i) => (
              <Skeleton key={i} className="h-8 w-3/4" />
            ))}
          </div>
        );

      case "card":
        return (
          <div className="space-y-4">
            {items.map((i) => (
              <div key={i} className="border rounded-lg p-4 space-y-3">
                <Skeleton className="h-6 w-2/3" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-4/5" />
              </div>
            ))}
          </div>
        );

      case "courseCard":
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((i) => (
              <div key={i} className="border rounded-lg overflow-hidden">
                <Skeleton className="h-48 w-full rounded-none" />
                <div className="p-4 space-y-3">
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-5/6" />
                  <div className="flex gap-2 mt-4">
                    <Skeleton className="h-6 w-16" />
                    <Skeleton className="h-6 w-20" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        );

      case "lessonCard":
        return (
          <div className="space-y-4">
            {items.map((i) => (
              <div key={i} className="border rounded-lg p-4 flex gap-4">
                <Skeleton className="h-16 w-16 rounded" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-5 w-2/3" />
                  <Skeleton className="h-4 w-full" />
                  <div className="flex gap-2">
                    <Skeleton className="h-5 w-12" />
                    <Skeleton className="h-5 w-16" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        );

      case "avatar":
        return (
          <div className="flex items-center gap-3">
            {items.map((i) => (
              <div key={i} className="flex items-center gap-3">
                <Skeleton className="h-12 w-12 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-3 w-16" />
                </div>
              </div>
            ))}
          </div>
        );

      case "button":
        return (
          <div className="flex gap-2">
            {items.map((i) => (
              <Skeleton key={i} className="h-10 w-24" />
            ))}
          </div>
        );

      case "badge":
        return (
          <div className="flex gap-2">
            {items.map((i) => (
              <Skeleton key={i} className="h-6 w-16 rounded-full" />
            ))}
          </div>
        );

      default:
        return <Skeleton className="h-20 w-full" />;
    }
  };

  return (
    <div className={className} role="status" aria-label="Loading content">
      {renderSkeleton()}
      <span className="sr-only">Loading content, please wait...</span>
    </div>
  );
}

/**
 * Table skeleton loader
 */
export function SkeletonTable({ rows = 5 }: { rows?: number }) {
  return (
    <div className="space-y-2" role="status" aria-label="Loading table">
      <div className="border rounded-lg p-4">
        <Skeleton className="h-8 w-full mb-4" />
        {Array.from({ length: rows }).map((_, i) => (
          <div key={i} className="flex gap-4 mb-3">
            <Skeleton className="h-6 w-1/4" />
            <Skeleton className="h-6 w-1/3" />
            <Skeleton className="h-6 w-1/4" />
            <Skeleton className="h-6 w-1/6" />
          </div>
        ))}
      </div>
      <span className="sr-only">Loading table data...</span>
    </div>
  );
}

/**
 * Page skeleton loader
 */
export function SkeletonPage() {
  return (
    <div className="space-y-6" role="status" aria-label="Loading page">
      <div className="space-y-2">
        <Skeleton className="h-10 w-1/3" />
        <Skeleton className="h-4 w-2/3" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Skeleton className="h-32" />
        <Skeleton className="h-32" />
        <Skeleton className="h-32" />
      </div>
      <Skeleton className="h-64 w-full" />
      <span className="sr-only">Loading page content...</span>
    </div>
  );
}
