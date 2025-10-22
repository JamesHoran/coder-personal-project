'use client'

import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'
import 'highlight.js/styles/github-dark.css'
import { CheckCircle, Clock, Award } from 'lucide-react'

interface LessonContentProps {
  title: string
  content: string
  duration?: number
  xpReward?: number
  isCompleted?: boolean
  onComplete?: () => void
}

export default function LessonContent({
  title,
  content,
  duration,
  xpReward,
  isCompleted = false,
  onComplete,
}: LessonContentProps) {
  return (
    <div className="mx-auto max-w-4xl">
      {/* Header */}
      <div className="mb-8 flex flex-col gap-4">
        <h1 className="text-4xl font-bold">{title}</h1>
        <div className="flex items-center gap-4">
          {duration && (
            <div className="flex items-center gap-2 text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span className="text-sm">{duration} minutes</span>
            </div>
          )}
          {xpReward && (
            <div className="flex items-center gap-2">
              <Award className="h-4 w-4 text-emerald-600" />
              <span className="text-sm font-medium text-emerald-600">
                {xpReward} XP
              </span>
            </div>
          )}
          {isCompleted && (
            <div className="flex items-center gap-2 text-emerald-600">
              <CheckCircle className="h-4 w-4" />
              <span className="text-sm font-medium">Completed</span>
            </div>
          )}
        </div>
      </div>

      {/* Markdown Content */}
      <div className="prose prose-slate dark:prose-invert max-w-none">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeHighlight]}
          components={{
            // Custom code block styling
            code({ node, className, children, ...props }: any) {
              const isInline = !className
              return isInline ? (
                <code
                  className="rounded bg-slate-200 px-1 py-0.5 font-mono text-sm dark:bg-slate-800"
                  {...props}
                >
                  {children}
                </code>
              ) : (
                <code className={className} {...props}>
                  {children}
                </code>
              )
            },
            // Custom heading styling
            h1: ({ node, ...props }) => (
              <h1
                className="mb-4 mt-8 text-3xl font-bold text-slate-900 dark:text-slate-100"
                {...props}
              />
            ),
            h2: ({ node, ...props }) => (
              <h2
                className="mb-3 mt-6 text-2xl font-bold text-slate-900 dark:text-slate-100"
                {...props}
              />
            ),
            h3: ({ node, ...props }) => (
              <h3
                className="mb-2 mt-4 text-xl font-semibold text-slate-800 dark:text-slate-200"
                {...props}
              />
            ),
            // Custom link styling
            a: ({ node, ...props }) => (
              <a
                className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                target="_blank"
                rel="noopener noreferrer"
                {...props}
              />
            ),
            // Custom list styling
            ul: ({ node, ...props }) => (
              <ul className="my-4 list-disc pl-6" {...props} />
            ),
            ol: ({ node, ...props }) => (
              <ol className="my-4 list-decimal pl-6" {...props} />
            ),
            // Custom blockquote styling
            blockquote: ({ node, ...props }) => (
              <blockquote
                className="my-4 border-l-4 border-blue-500 bg-blue-50 pl-4 italic text-slate-700 dark:bg-blue-900/20 dark:text-slate-300"
                {...props}
              />
            ),
            // Custom table styling
            table: ({ node, ...props }) => (
              <div className="my-4 overflow-x-auto">
                <table
                  className="min-w-full divide-y divide-slate-200 dark:divide-slate-700"
                  {...props}
                />
              </div>
            ),
            th: ({ node, ...props }) => (
              <th
                className="bg-slate-100 px-4 py-2 text-left font-semibold dark:bg-slate-800"
                {...props}
              />
            ),
            td: ({ node, ...props }) => (
              <td className="border-t px-4 py-2" {...props} />
            ),
          }}
        >
          {content}
        </ReactMarkdown>
      </div>

      {/* Complete Lesson Button */}
      {!isCompleted && onComplete && (
        <div className="mt-12 flex justify-center">
          <button
            onClick={onComplete}
            className="rounded-lg bg-emerald-600 px-8 py-3 font-semibold text-white hover:bg-emerald-700"
          >
            Mark as Complete {xpReward && `(+${xpReward} XP)`}
          </button>
        </div>
      )}

      {/* Navigation Hints */}
      <div className="mt-8 rounded-lg border bg-slate-50 p-6 dark:bg-slate-900">
        <h3 className="mb-2 font-semibold">Next Steps</h3>
        <p className="text-sm text-muted-foreground">
          {isCompleted
            ? 'Great job! Continue to the next lesson or try a challenge to test your knowledge.'
            : 'Read through the lesson content and click "Mark as Complete" when you\'re ready to move on.'}
        </p>
      </div>
    </div>
  )
}
