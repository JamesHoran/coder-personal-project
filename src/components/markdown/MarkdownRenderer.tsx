"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";

// Import highlight.js styles (you may need to add this to your global CSS)
// import 'highlight.js/styles/github-dark.css';

interface MarkdownRendererProps {
  content: string;
  className?: string;
  /**
   * Whether to enable GitHub Flavored Markdown extensions
   * (tables, task lists, strikethrough, etc.)
   */
  enableGfm?: boolean;
  /**
   * Whether to enable syntax highlighting for code blocks
   */
  enableSyntaxHighlight?: boolean;
}

/**
 * Renders markdown content using react-markdown with proper plugins
 * Replaces the basic custom markdown parser with a robust solution
 *
 * Features:
 * - Full markdown support via react-markdown
 * - GitHub Flavored Markdown (tables, task lists, etc.)
 * - Syntax highlighting for code blocks
 * - Accessible HTML output
 * - Sanitized for security
 */
export function MarkdownRenderer({
  content,
  className = "",
  enableGfm = true,
  enableSyntaxHighlight = true,
}: MarkdownRendererProps) {
  const plugins = {
    remarkPlugins: enableGfm ? [remarkGfm] : [],
    rehypePlugins: enableSyntaxHighlight ? [rehypeHighlight] : [],
  };

  return (
    <div
      className={cn(
        "prose prose-sm dark:prose-invert max-w-none",
        "prose-headings:font-semibold prose-headings:tracking-tight",
        "prose-a:text-primary prose-a:no-underline hover:prose-a:underline",
        "prose-code:text-sm prose-code:bg-muted prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded",
        "prose-pre:bg-muted prose-pre:border prose-pre:border-border",
        "prose-blockquote:border-l-primary prose-blockquote:bg-muted/50 prose-blockquote:py-1",
        "prose-ul:list-disc prose-ol:list-decimal",
        "prose-table:border prose-th:border prose-td:border",
        "prose-img:rounded-lg prose-img:shadow-sm",
        className
      )}
    >
      <ReactMarkdown
        remarkPlugins={plugins.remarkPlugins}
        rehypePlugins={plugins.rehypePlugins}
        components={{
          // Custom component overrides for better styling and accessibility
          h1: ({ node, ...props }) => (
            <h1 className="text-3xl font-bold mt-8 mb-4" {...props} />
          ),
          h2: ({ node, ...props }) => (
            <h2 className="text-2xl font-semibold mt-6 mb-3" {...props} />
          ),
          h3: ({ node, ...props }) => (
            <h3 className="text-xl font-semibold mt-4 mb-2" {...props} />
          ),
          h4: ({ node, ...props }) => (
            <h4 className="text-lg font-semibold mt-3 mb-2" {...props} />
          ),
          h5: ({ node, ...props }) => (
            <h5 className="text-base font-semibold mt-2 mb-1" {...props} />
          ),
          h6: ({ node, ...props }) => (
            <h6 className="text-sm font-semibold mt-2 mb-1" {...props} />
          ),
          a: ({ node, ...props }) => (
            <a
              className="text-primary hover:underline focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded"
              target={props.href?.startsWith("http") ? "_blank" : undefined}
              rel={
                props.href?.startsWith("http")
                  ? "noopener noreferrer"
                  : undefined
              }
              {...props}
            />
          ),
          code: ({ node, className, children, ...props }) => {
            const match = /language-(\w+)/.exec(className || "");
            const isInline = !match;

            if (isInline) {
              return (
                <code
                  className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono"
                  {...props}
                >
                  {children}
                </code>
              );
            }

            return (
              <code className={className} {...props}>
                {children}
              </code>
            );
          },
          pre: ({ node, children, ...props }) => (
            <pre
              className="overflow-x-auto rounded-lg border bg-muted p-4 my-4"
              {...props}
            >
              {children}
            </pre>
          ),
          blockquote: ({ node, ...props }) => (
            <blockquote
              className="border-l-4 border-primary bg-muted/50 pl-4 py-2 my-4 italic"
              {...props}
            />
          ),
          ul: ({ node, ...props }) => (
            <ul className="list-disc list-inside space-y-1 my-4" {...props} />
          ),
          ol: ({ node, ...props }) => (
            <ol
              className="list-decimal list-inside space-y-1 my-4"
              {...props}
            />
          ),
          li: ({ node, ...props }) => (
            <li className="ml-4" {...props} />
          ),
          table: ({ node, ...props }) => (
            <div className="overflow-x-auto my-4">
              <table
                className="min-w-full border-collapse border border-border"
                {...props}
              />
            </div>
          ),
          th: ({ node, ...props }) => (
            <th
              className="border border-border bg-muted px-4 py-2 text-left font-semibold"
              {...props}
            />
          ),
          td: ({ node, ...props }) => (
            <td className="border border-border px-4 py-2" {...props} />
          ),
          img: ({ node, alt, ...props }) => (
            <img
              className="rounded-lg shadow-sm my-4 max-w-full h-auto"
              alt={alt || "Image"}
              loading="lazy"
              {...props}
            />
          ),
          hr: ({ node, ...props }) => (
            <hr className="border-border my-8" {...props} />
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}

/**
 * Compact version of MarkdownRenderer for inline content
 */
export function InlineMarkdown({
  content,
  className = "",
}: {
  content: string;
  className?: string;
}) {
  return (
    <div className={cn("prose prose-sm dark:prose-invert inline", className)}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          p: ({ node, ...props }) => <span {...props} />,
          a: ({ node, ...props }) => (
            <a
              className="text-primary hover:underline"
              target={props.href?.startsWith("http") ? "_blank" : undefined}
              rel={
                props.href?.startsWith("http")
                  ? "noopener noreferrer"
                  : undefined
              }
              {...props}
            />
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
