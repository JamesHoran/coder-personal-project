# Accessibility Guidelines & Implementation

This document outlines the accessibility features and best practices implemented in this application to ensure WCAG 2.1 AA compliance.

## Table of Contents

- [Overview](#overview)
- [Implemented Features](#implemented-features)
- [Components](#components)
- [Testing](#testing)
- [Best Practices](#best-practices)
- [Known Issues](#known-issues)

---

## Overview

This application is designed to be accessible to all users, including those with disabilities. We follow the Web Content Accessibility Guidelines (WCAG) 2.1 Level AA standards.

### Key Principles

1. **Perceivable**: Information and UI components must be presentable to users in ways they can perceive
2. **Operable**: UI components and navigation must be operable
3. **Understandable**: Information and UI operation must be understandable
4. **Robust**: Content must be robust enough to be interpreted by assistive technologies

---

## Implemented Features

### 1. Keyboard Navigation

All interactive elements are fully keyboard accessible:

- **Tab**: Navigate forward through interactive elements
- **Shift + Tab**: Navigate backward
- **Enter/Space**: Activate buttons and links
- **Escape**: Close modals and dialogs
- **Arrow keys**: Navigate within custom components (where applicable)

**Implementation:**
- All interactive elements have proper `tabindex` values
- Focus order follows a logical sequence
- Focus indicators are clearly visible
- No keyboard traps

### 2. Screen Reader Support

All content is accessible to screen readers:

- **Semantic HTML**: Proper use of headings, lists, landmarks
- **ARIA labels**: Descriptive labels for all interactive elements
- **ARIA live regions**: Dynamic content updates are announced
- **Alternative text**: All images have descriptive alt text

**Key ARIA Attributes Used:**
- `aria-label`: Provides accessible names
- `aria-labelledby`: Associates labels with elements
- `aria-describedby`: Provides additional descriptions
- `aria-live`: Announces dynamic changes
- `aria-invalid`: Indicates form errors
- `aria-required`: Marks required fields
- `aria-busy`: Indicates loading states
- `aria-expanded`: Indicates expandable sections
- `aria-controls`: Associates controls with controlled elements

### 3. Visual Focus Indicators

Clear visual indicators show which element has keyboard focus:

- **2px solid outline** using the theme's ring color
- **2px offset** from the element
- **Visible in both light and dark modes**
- **Enhanced for keyboard users** via `.keyboard-user` class

### 4. Color Contrast

All text meets WCAG AA contrast requirements:

- **Normal text**: Minimum 4.5:1 contrast ratio
- **Large text (18pt+)**: Minimum 3:1 contrast ratio
- **UI components**: Minimum 3:1 contrast ratio

Theme colors are designed to maintain contrast in both light and dark modes.

### 5. Form Validation

Forms provide clear, specific error messages:

- **Field-level validation**: Errors are shown next to the relevant field
- **ARIA associations**: Errors are linked to fields via `aria-describedby`
- **Required fields**: Marked with asterisk and `aria-required`
- **Real-time feedback**: Validation on blur for better UX
- **Success messages**: Confirmation when actions complete successfully

### 6. Loading States

Consistent loading indicators across the application:

- **Loading spinners**: With `aria-busy` and descriptive labels
- **Skeleton loaders**: For content areas
- **Progress indicators**: For multi-step processes
- **Accessible announcements**: Screen readers are notified of loading state changes

### 7. Error Handling

User-friendly error messages and states:

- **Specific error messages**: Tell users exactly what went wrong
- **Recovery suggestions**: Provide guidance on how to fix errors
- **Error boundaries**: Graceful fallbacks for component errors
- **Retry options**: Allow users to retry failed operations

### 8. Responsive Design

Application is accessible on all device sizes:

- **Mobile-friendly**: Touch targets are at least 44x44 pixels
- **Flexible layouts**: Content adapts to screen size
- **Text sizing**: Supports up to 200% zoom without loss of functionality
- **Orientation**: Works in both portrait and landscape

### 9. Reduced Motion

Respects user's motion preferences:

```css
@media (prefers-reduced-motion: reduce) {
  /* Minimal animations for users who prefer reduced motion */
}
```

### 10. High Contrast Mode

Improved visibility in high contrast mode:

- **Thicker borders**: 2px instead of 1px
- **Text decoration**: Links are underlined
- **Enhanced focus indicators**: More prominent outlines

---

## Components

### Accessibility Components

Located in `/src/components/a11y/`:

#### SkipLink

Allows keyboard users to skip to main content:

```tsx
import { SkipLink } from '@/components/a11y/SkipLink';

<SkipLink href="#main-content">Skip to main content</SkipLink>
```

#### VisuallyHidden

Hides content visually but keeps it accessible to screen readers:

```tsx
import { VisuallyHidden } from '@/components/a11y/SkipLink';

<VisuallyHidden>Additional context for screen readers</VisuallyHidden>
```

#### Accessibility Hooks

Custom hooks for common accessibility patterns:

```tsx
import {
  useAnnounce,
  useFocusManagement,
  useFocusTrap,
  useEscapeKey,
  useKeyboardUser,
} from '@/components/a11y/AccessibilityUtils';

// Announce content to screen readers
const { announce, AnnouncementRegion } = useAnnounce();
announce("Form submitted successfully", "polite");

// Manage focus for modals
const previousFocusRef = useFocusManagement(isOpen);

// Trap focus within a modal
const modalRef = useFocusTrap(isOpen);

// Handle escape key
useEscapeKey(() => closeModal(), isModalOpen);

// Detect keyboard navigation
useKeyboardUser(); // Adds .keyboard-user class to body
```

### Form Components

Located in `/src/components/forms/`:

#### ValidationMessage

Displays validation errors with proper ARIA attributes:

```tsx
import { ValidationMessage } from '@/components/forms/ValidationMessage';

<ValidationMessage
  id="email-error"
  message="Please enter a valid email address"
  type="error"
/>
```

#### PasswordRequirements

Shows password requirements with visual feedback:

```tsx
import { PasswordRequirements } from '@/components/forms/ValidationMessage';

<PasswordRequirements
  password={password}
  requirements={passwordRequirements}
/>
```

### UI Components

#### LoadingSpinner

Accessible loading indicator:

```tsx
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';

<LoadingSpinner
  size="md"
  text="Loading courses..."
  fullScreen={false}
/>
```

#### SkeletonLoader

Loading placeholders for content:

```tsx
import { SkeletonLoader } from '@/components/ui/SkeletonLoader';

<SkeletonLoader type="courseCard" count={3} />
```

#### EmptyState

Accessible empty state messages:

```tsx
import { EmptyState, EmptyStateSearch } from '@/components/ui/EmptyState';

<EmptyState
  icon={BookOpen}
  title="No courses available"
  description="Check back later for new courses."
  action={{ label: "Browse All", onClick: handleBrowse }}
/>
```

### Content Components

#### MarkdownRenderer

Renders markdown with proper semantic HTML:

```tsx
import { MarkdownRenderer } from '@/components/markdown/MarkdownRenderer';

<MarkdownRenderer
  content={markdownContent}
  enableGfm={true}
  enableSyntaxHighlight={true}
/>
```

Features:
- Semantic HTML output
- Syntax highlighting for code
- Accessible links (external links open in new tab with `rel="noopener noreferrer"`)
- Proper heading hierarchy
- Accessible tables

---

## Testing

### Manual Testing

#### Keyboard Navigation Test

1. Use only the keyboard to navigate the entire application
2. Verify all interactive elements are reachable
3. Check that focus is visible on all elements
4. Ensure no keyboard traps exist

#### Screen Reader Test

Test with multiple screen readers:
- **Windows**: NVDA (free) or JAWS
- **macOS**: VoiceOver (built-in)
- **Linux**: Orca

Verification checklist:
- [ ] All text content is read correctly
- [ ] Form labels are associated with inputs
- [ ] Error messages are announced
- [ ] Loading states are announced
- [ ] Dynamic content updates are announced

#### Color Contrast Test

Use tools to verify contrast ratios:
- Chrome DevTools (Lighthouse)
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [Colour Contrast Analyser](https://www.tpgi.com/color-contrast-checker/)

### Automated Testing

#### Recommended Tools

1. **axe-core**: Automated accessibility testing
   ```bash
   npm install -D @axe-core/react
   ```

2. **eslint-plugin-jsx-a11y**: Linting for accessibility
   ```bash
   npm install -D eslint-plugin-jsx-a11y
   ```

3. **Lighthouse**: Comprehensive audits
   - Run in Chrome DevTools
   - Aim for 90+ accessibility score

#### Running Tests

```bash
# Type checking
npm run typecheck

# Linting (includes accessibility checks if configured)
npm run lint

# Unit tests
npm run test
```

---

## Best Practices

### For Developers

1. **Use semantic HTML**
   - Use `<button>` for buttons, not `<div>`
   - Use proper heading hierarchy (`<h1>` to `<h6>`)
   - Use `<nav>`, `<main>`, `<aside>`, `<footer>` landmarks

2. **Provide text alternatives**
   - Add `alt` text to all images
   - Use `aria-label` for icon-only buttons
   - Provide transcripts for audio/video content

3. **Ensure keyboard accessibility**
   - All interactive elements must be keyboard accessible
   - Implement focus management for modals
   - Test with keyboard only

4. **Use ARIA appropriately**
   - Don't override native semantics
   - Only use ARIA when HTML doesn't provide the needed semantics
   - Keep ARIA attributes up to date with component state

5. **Test with real users**
   - Include users with disabilities in testing
   - Use actual assistive technologies
   - Don't rely solely on automated tools

### Common Patterns

#### Accessible Button

```tsx
<Button
  onClick={handleClick}
  aria-label="Delete course"
  disabled={isDeleting}
  aria-busy={isDeleting}
>
  {isDeleting ? "Deleting..." : "Delete"}
</Button>
```

#### Accessible Form Field

```tsx
<div>
  <Label htmlFor="email">
    Email <span aria-label="required">*</span>
  </Label>
  <Input
    id="email"
    type="email"
    aria-required="true"
    aria-invalid={errors.email ? "true" : "false"}
    aria-describedby={errors.email ? "email-error" : undefined}
  />
  {errors.email && (
    <ValidationMessage id="email-error" message={errors.email.message} />
  )}
</div>
```

#### Accessible Modal

```tsx
function Modal({ isOpen, onClose, children }) {
  const modalRef = useFocusTrap(isOpen);
  useFocusManagement(isOpen);
  useEscapeKey(onClose, isOpen);

  return (
    <div
      ref={modalRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <h2 id="modal-title">Modal Title</h2>
      {children}
    </div>
  );
}
```

---

## Known Issues

Currently, there are no known critical accessibility issues. Minor improvements are tracked in the project's issue tracker.

---

## Resources

### Standards & Guidelines

- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [WAI-ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)
- [MDN Accessibility Guide](https://developer.mozilla.org/en-US/docs/Web/Accessibility)

### Tools

- [axe DevTools](https://www.deque.com/axe/devtools/)
- [WAVE Browser Extension](https://wave.webaim.org/extension/)
- [Lighthouse](https://developers.google.com/web/tools/lighthouse)
- [Screen Reader Testing](https://www.nvaccess.org/)

### Learning

- [WebAIM](https://webaim.org/)
- [A11y Project](https://www.a11yproject.com/)
- [Inclusive Components](https://inclusive-components.design/)

---

## Contact

For accessibility concerns or suggestions, please:
1. Open an issue in the project repository
2. Contact the development team
3. Submit a pull request with improvements

---

**Last Updated**: 2025-01-29
**WCAG Compliance**: 2.1 Level AA
**Status**: Active Implementation
