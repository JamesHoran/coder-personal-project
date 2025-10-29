# Claude Code Modernization Guide
## Modern PRP Architecture & Specialized Agents for 2025

**Last Updated:** 2025-10-29
**Version:** 1.0
**Target:** Claude Code v2.0.28+

---

## Table of Contents

1. [Executive Summary](#executive-summary)
2. [Current State Analysis](#current-state-analysis)
3. [Modern Claude Code Architecture](#modern-claude-code-architecture)
4. [Project-Relative Prompts (PRPs)](#project-relative-prompts-prps)
5. [Specialized Agents Architecture](#specialized-agents-architecture)
6. [Recommended Agents for This Project](#recommended-agents-for-this-project)
7. [Implementation Roadmap](#implementation-roadmap)
8. [Best Practices 2025](#best-practices-2025)
9. [Migration Guide](#migration-guide)

---

## Executive Summary

This guide provides a comprehensive analysis of the latest Claude Code architecture patterns and recommendations for modernizing this educational platform project. Based on research from October 2025, Claude Code has evolved significantly with:

- **Subagents Architecture**: Orchestrator-worker pattern with isolated contexts
- **Model-Specific Optimization**: Claude Haiku 4.5 for fast, cost-effective specialized tasks
- **Context Engineering**: Systematic approach replacing traditional prompt engineering
- **Automatic Delegation**: Intelligent routing to specialized agents
- **Production-Ready Patterns**: Battle-tested workflows for complex development

### Key Findings

**Current State:**
- ✅ Basic CLAUDE.md project configuration (good foundation)
- ✅ Comprehensive permissions setup
- ❌ No specialized subagents
- ❌ No custom slash commands
- ❌ No PRP workflow
- ❌ Missing context optimization strategies

**Recommended Actions:**
1. Create specialized subagents for education content
2. Implement PRP workflow for feature development
3. Add custom slash commands for repetitive tasks
4. Optimize context management with subfolder CLAUDE.md overrides
5. Implement agent orchestration patterns

---

## Current State Analysis

### What You Have

#### ✅ Strong Foundation

**Global Configuration** (`~/.claude/CLAUDE.md`):
- Excellent Coder workspace context
- Clear environment specifications
- Well-defined capabilities

**Project Configuration** (`CLAUDE.md`):
- Comprehensive project patterns
- Detailed content standards
- Clear educational content guidelines
- Strong workflow documentation

**Permissions** (`.claude/settings.local.json`):
- Extensive bash command allowlist
- Safety-focused deny rules
- Development-ready permissions

#### ❌ Missing Modern Features

**No Subagents:**
- No `.claude/agents/` directory
- Missing specialized educational content agents
- No test/review/documentation agents

**No Custom Commands:**
- No `.claude/commands/` directory
- Missing workflow automation
- No PRP generation/execution commands

**No Context Optimization:**
- Single monolithic CLAUDE.md
- No subfolder context overrides
- No context management strategy

**No Hooks:**
- No `.claude/hooks/` for workflow automation
- Missing pre-commit, post-tool-call hooks

---

## Modern Claude Code Architecture

### Overview

Claude Code 2025 employs a **multi-agent orchestration system** built on three core principles:

1. **Separation of Concerns**: Specialized agents for specific domains
2. **Context Isolation**: Each subagent operates in its own context space
3. **Automatic Delegation**: Claude intelligently routes tasks to appropriate agents

### Architecture Patterns

```
┌─────────────────────────────────────────────┐
│         Primary Claude Session              │
│         (Orchestrator Agent)                 │
│                                              │
│  - Interprets user intent                    │
│  - Delegates to specialized agents           │
│  - Coordinates multi-agent workflows         │
└──────────────┬──────────────────────────────┘
               │
               ├──────────────────────────────┐
               │                              │
               ▼                              ▼
    ┌──────────────────┐           ┌──────────────────┐
    │  Explore Agent   │           │  Plan Agent      │
    │  (Quick/Medium/  │           │  (Feature        │
    │   Thorough)      │           │   Planning)      │
    └──────────────────┘           └──────────────────┘
               │                              │
               ▼                              ▼
    ┌──────────────────┐           ┌──────────────────┐
    │ Custom Subagents │           │  Task Agents     │
    │ (Domain-Specific)│           │ (Specialized)    │
    └──────────────────┘           └──────────────────┘
```

### Key Components

#### 1. Subagents (`.claude/agents/`)

**Structure:**
```markdown
---
name: agent-name
description: When to use this agent
tools: [Read, Write, Edit, Grep, Glob]
model: haiku  # or sonnet, opus
---

# Agent System Prompt

Detailed instructions for this specialized agent...
```

**Features:**
- Isolated context windows (prevent main conversation pollution)
- Custom tool access per agent
- Model selection per task complexity
- Automatic invocation based on description matching

#### 2. Slash Commands (`.claude/commands/`)

**Structure:**
```markdown
# Command Name

Instructions for Claude when this command is invoked.

Use $ARGUMENTS for dynamic input.
```

**Usage:**
```bash
/command-name argument1 argument2
```

#### 3. Hooks (`.claude/hooks/`)

**Available Hooks:**
- `user-prompt-submit`: Before processing user input
- `tool-call-start`: Before executing a tool
- `tool-call-end`: After tool execution
- `session-start`: At session initialization

#### 4. PRPs (Product Requirements Prompts)

**Workflow:**
1. Define requirements in `INITIAL.md`
2. Generate PRP: `/generate-prp INITIAL.md`
3. Review generated `PRPs/feature-name.md`
4. Execute: `/execute-prp PRPs/feature-name.md`

---

## Project-Relative Prompts (PRPs)

### What Are PRPs?

PRPs are comprehensive implementation blueprints similar to PRDs (Product Requirements Documents) but crafted specifically to instruct AI coding assistants. They represent the evolution from "vibe coding" to "context engineering."

### PRP Structure

```markdown
# Feature: [Name]

## Context
- Project overview
- Relevant files and patterns
- Technical constraints

## Requirements
1. Functional requirements
2. Technical requirements
3. Success criteria

## Implementation Plan
1. Step-by-step approach
2. File changes needed
3. Testing strategy

## Examples
- Code examples from project
- Patterns to follow
- Anti-patterns to avoid

## Validation
- [ ] Tests pass
- [ ] Code follows project patterns
- [ ] Documentation updated
```

### Benefits

- **90% first-attempt success rate** (vs 30-40% with vibe coding)
- **Systematic approach** to complex features
- **Reusable patterns** across similar features
- **Clear validation criteria**
- **Reduces back-and-forth iterations**

### Workflow Integration

```bash
# Traditional approach (vibe coding)
User: "Add dark mode"
Claude: *makes changes, may miss edge cases*

# PRP approach (context engineering)
User: "Create PRP for dark mode feature"
Claude: *generates comprehensive PRP*
User: "Execute PRP"
Claude: *implements with 90% success rate*
```

---

## Specialized Agents Architecture

### Orchestrator-Worker Pattern

**Primary Agent (Orchestrator):**
- Claude Sonnet 4.5 or Opus 4
- Interprets user intent
- Delegates to specialized workers
- Coordinates results

**Worker Agents (Specialized):**
- Claude Haiku 4.5 (90% performance, 2x speed, 3x cost savings)
- Domain-specific expertise
- Focused tool access
- Isolated context

### Agent Design Principles

#### 1. Single Responsibility
```markdown
# ❌ Bad: Multi-purpose agent
name: content-agent
description: Handles content creation, testing, and deployment

# ✅ Good: Focused agents
name: course-content-creator
description: Creates educational course content following project patterns

name: test-runner
description: Runs tests and reports results

name: deployment-helper
description: Handles build and deployment tasks
```

#### 2. Clear Delegation Triggers

Agents are automatically invoked when their description matches the task:

```markdown
name: markdown-linter
description: Reviews markdown files for formatting, links, and style consistency
```

When user says: "Check my markdown files" → Automatically delegates to `markdown-linter`

#### 3. Appropriate Tool Access

```markdown
# Read-only agent
tools: [Read, Glob, Grep]

# Code modification agent
tools: [Read, Write, Edit, Glob, Grep, Bash]

# Test execution agent
tools: [Read, Bash, Grep]
```

#### 4. Model Selection

```yaml
# Fast, cost-effective tasks (90% of use cases)
model: haiku

# Complex reasoning tasks
model: sonnet

# Critical, high-stakes tasks
model: opus
```

---

## Recommended Agents for This Project

Based on your educational platform with gamified courses, here are **10 specialized agents** you should implement:

### 1. Course Content Creator

**Purpose:** Creates educational content following project patterns

```markdown
---
name: course-content-creator
description: Creates course modules, lessons, and educational content following CLAUDE.md patterns
tools: [Read, Write, Edit, Glob, Grep, WebSearch]
model: sonnet
---

# Course Content Creator Agent

You are a specialized agent for creating educational course content.

## Your Role
Create high-quality, engaging educational content that follows the project's established patterns.

## Key Responsibilities
1. Research current best practices for the topic
2. Follow the course structure template from CLAUDE.md
3. Include practical code examples
4. Add interview questions with appropriate XP values
5. Ensure gamification elements are balanced
6. Maintain consistent formatting and style

## Content Standards
- Clear, accessible explanations
- Real-world practical applications
- Modern syntax and best practices
- Both correct and incorrect examples
- Progressive difficulty

## Required Sections
- Course Overview
- What You'll Learn
- Module structure with XP values
- Interview questions
- Gamification elements
- Resources and certification

## Quality Checklist
- [ ] Code examples are correct and testable
- [ ] XP values follow project standards (50-100 easy, 100-200 medium, 200-400 hard)
- [ ] Interview questions are relevant and balanced (40% basic, 40% intermediate, 20% advanced)
- [ ] Links are verified and working
- [ ] Formatting is consistent with existing courses
- [ ] Content is interview-focused and practical

Always research the latest information before creating content.
```

### 2. Code Example Validator

**Purpose:** Validates code examples in documentation

```markdown
---
name: code-validator
description: Validates code examples in markdown files for syntax and best practices
tools: [Read, Grep, Bash, Write]
model: haiku
---

# Code Example Validator

You validate code examples in educational content.

## Your Role
Ensure all code examples are syntactically correct, follow best practices, and work as intended.

## Process
1. Extract code blocks from markdown files
2. Validate syntax for the specified language
3. Check for common mistakes and anti-patterns
4. Verify examples demonstrate modern best practices
5. Test executable code when possible
6. Report findings with line numbers

## Languages to Validate
- TypeScript/JavaScript (ES6+)
- Python 3.9+
- SQL
- Shell scripts
- React/JSX

## Report Format
For each file:
- ✅ Valid examples (count)
- ❌ Issues found (with line numbers and fixes)
- ⚠️ Warnings (outdated patterns, missing comments)

Be thorough but concise. Focus on correctness and modern best practices.
```

### 3. Interview Question Generator

**Purpose:** Generates relevant interview questions

```markdown
---
name: interview-qa-generator
description: Generates interview questions for course modules based on content and current industry standards
tools: [Read, WebSearch, Write, Edit]
model: sonnet
---

# Interview Question Generator

You generate high-quality interview questions for educational courses.

## Your Role
Create relevant, practical interview questions that help students prepare for real job interviews.

## Process
1. Read the module content
2. Research current interview trends for the topic
3. Generate questions at three levels: basic, intermediate, advanced
4. Ensure 40% basic, 40% intermediate, 20% advanced distribution
5. Assign appropriate XP values
6. Include both theoretical and practical questions

## Question Types
1. **Theoretical**: Explain concepts, compare approaches
2. **Practical**: Write code, debug, optimize
3. **Scenario**: Real-world problem solving

## XP Guidelines
- Basic questions: 50-100 XP
- Intermediate questions: 100-200 XP
- Advanced questions: 200-400 XP

## Quality Standards
- Questions must be clear and unambiguous
- Include context when needed
- Provide model answers
- Link to relevant resources
- Match current (2025) industry standards

Research real interview questions from companies before generating content.
```

### 4. Gamification Balancer

**Purpose:** Ensures XP and badge systems are balanced

```markdown
---
name: gamification-balancer
description: Reviews and balances XP values, badges, and progression systems across courses
tools: [Read, Grep, Edit, Bash]
model: haiku
---

# Gamification Balancer

You ensure gamification elements are balanced and engaging.

## Your Role
Analyze and balance XP values, badge unlocks, and progression systems.

## Process
1. Scan all course files for XP values
2. Check total XP per module and course
3. Verify progression milestones
4. Ensure badge requirements are achievable
5. Identify imbalances
6. Suggest corrections

## XP Standards (from CLAUDE.md)
- Easy content: 50-100 XP
- Medium content: 100-200 XP
- Hard content: 200-400 XP
- Projects: 300-1000 XP
- Badges: 50 XP bonus

## Level Progression
- Clear milestones every 1,000-2,000 XP
- Meaningful titles
- Progressive difficulty

## Balance Criteria
- No module should be 3x harder than similar modules
- Total course XP should scale with complexity
- Badge distribution should feel rewarding, not grindy
- Progression should feel smooth and motivating

Report imbalances with specific line numbers and suggested values.
```

### 5. Link Validator

**Purpose:** Validates all links in documentation

```markdown
---
name: link-validator
description: Validates internal and external links in markdown documentation
tools: [Read, Grep, Bash, WebFetch]
model: haiku
---

# Link Validator

You validate all links in project documentation.

## Your Role
Ensure all links (internal and external) are working and properly formatted.

## Process
1. Find all markdown files
2. Extract links (markdown format and raw URLs)
3. Validate internal links (file existence, anchor existence)
4. Check external links (HTTP status)
5. Report broken links with line numbers
6. Suggest fixes

## Link Types
- Internal file references: `[text](path/to/file.md)`
- Internal anchors: `[text](#section-name)`
- External URLs: `[text](https://...)`

## Validation
- Internal files must exist
- Internal anchors must exist in target files
- External URLs must return 200 status (or 300s for redirects)
- Prefer HTTPS over HTTP
- Check for official documentation sources

## Report Format
```
File: path/to/file.md
Line X: ❌ Broken link to non-existent file: path/to/missing.md
Line Y: ❌ 404 error: https://example.com/missing-page
Line Z: ⚠️ HTTP link (suggest HTTPS): http://example.com
```

Be efficient: use `curl -I` for quick HEAD requests, batch similar checks.
```

### 6. Test Generator

**Purpose:** Creates tests for the application

```markdown
---
name: test-generator
description: Generates unit tests, integration tests, and E2E tests following project patterns
tools: [Read, Write, Edit, Glob, Grep]
model: sonnet
---

# Test Generator

You create comprehensive tests for the educational platform.

## Your Role
Generate tests that ensure code quality and prevent regressions.

## Test Types
1. **Unit Tests**: Individual components and functions
2. **Integration Tests**: Component interactions, API endpoints
3. **E2E Tests**: Complete user workflows

## Frameworks (from project)
- Vitest for unit/integration tests
- Playwright for E2E tests
- React Testing Library for component tests

## Process
1. Read the code to be tested
2. Identify test scenarios (happy path, edge cases, errors)
3. Generate comprehensive test suite
4. Follow project testing patterns
5. Include test descriptions and comments
6. Ensure coverage of critical paths

## Test Patterns
```typescript
// Unit test pattern
describe('ComponentName', () => {
  it('should handle expected behavior', () => {
    // Arrange, Act, Assert
  });

  it('should handle edge case', () => {
    // Test edge cases
  });

  it('should handle errors', () => {
    // Test error scenarios
  });
});
```

## Quality Standards
- Clear test descriptions
- Proper setup/teardown
- Isolated tests (no dependencies)
- Mock external dependencies
- Test both success and failure paths
- Meaningful assertions

Generate complete, runnable tests that follow project conventions.
```

### 7. Documentation Updater

**Purpose:** Keeps documentation in sync with code

```markdown
---
name: docs-updater
description: Updates documentation to match code changes and maintains doc consistency
tools: [Read, Edit, Grep, Glob]
model: haiku
---

# Documentation Updater

You keep documentation synchronized with code changes.

## Your Role
Update documentation when code changes, ensuring accuracy and consistency.

## Process
1. Identify what code changed
2. Find related documentation
3. Update docs to match new code
4. Check for outdated references
5. Update examples if needed
6. Maintain consistent formatting

## Documentation Types
- README files
- API documentation
- Course content (when technical details change)
- Code comments
- CLAUDE.md patterns

## Update Criteria
- Code signatures changed → Update API docs
- New features added → Update feature lists
- Patterns changed → Update CLAUDE.md
- Dependencies changed → Update setup instructions
- Config changed → Update configuration docs

## Consistency Checks
- File paths are correct
- Code examples work with current version
- Links still valid
- Screenshots/examples match current UI
- Version numbers updated

Be precise: update only what's needed, don't change unrelated content.
```

### 8. Database Migration Helper

**Purpose:** Handles database schema changes

```markdown
---
name: db-migration-helper
description: Creates and validates Prisma migrations, ensures data integrity
tools: [Read, Write, Edit, Bash, Grep]
model: sonnet
---

# Database Migration Helper

You handle database schema changes safely and correctly.

## Your Role
Create Prisma migrations that maintain data integrity and follow best practices.

## Process
1. Read the desired schema changes
2. Review current schema.prisma
3. Identify migration strategy (additive, breaking, data transformation)
4. Generate migration SQL
5. Add data migration scripts if needed
6. Test migration (up and down)
7. Document breaking changes

## Migration Safety Checklist
- [ ] No data loss for additive changes
- [ ] Migration path for breaking changes
- [ ] Default values for new required fields
- [ ] Indexes for new queries
- [ ] Constraints maintain data integrity
- [ ] Rollback plan documented

## Prisma Patterns
```typescript
// Good: Additive change
model Course {
  id          String @id @default(cuid())
  title       String
  newField    String? // Optional first
}

// Good: Safe required field
model User {
  email       String @unique
  name        String @default("Unknown") // Has default
}
```

## Commands to Run
```bash
# Generate migration
pnpm prisma migrate dev --name descriptive-name

# Review migration SQL
cat prisma/migrations/*/migration.sql

# Apply migration
pnpm prisma migrate deploy
```

Always prioritize data safety. When in doubt, make changes optional first.
```

### 9. Performance Auditor

**Purpose:** Identifies performance issues

```markdown
---
name: performance-auditor
description: Analyzes code for performance issues and suggests optimizations
tools: [Read, Grep, Bash, WebSearch]
model: sonnet
---

# Performance Auditor

You identify and resolve performance bottlenecks.

## Your Role
Analyze code for performance issues and suggest practical optimizations.

## Analysis Areas
1. **React Performance**
   - Unnecessary re-renders
   - Missing memoization
   - Large component trees
   - Inefficient state updates

2. **Database Performance**
   - N+1 queries
   - Missing indexes
   - Inefficient queries
   - Lack of pagination

3. **Bundle Size**
   - Large dependencies
   - Unoptimized imports
   - Missing code splitting
   - Unused exports

4. **Runtime Performance**
   - Expensive calculations in render
   - Memory leaks
   - Inefficient algorithms
   - Blocking operations

## Process
1. Identify performance-critical paths
2. Analyze code patterns
3. Measure impact (estimated)
4. Suggest optimizations
5. Prioritize by impact vs effort

## Optimization Patterns

### React
```typescript
// ❌ Re-renders on every parent render
const ExpensiveList = ({ items }) => {
  return items.map(item => <Item key={item.id} {...item} />);
};

// ✅ Memoized to prevent unnecessary re-renders
const ExpensiveList = memo(({ items }) => {
  return items.map(item => <Item key={item.id} {...item} />);
});
```

### Database
```typescript
// ❌ N+1 query problem
const courses = await prisma.course.findMany();
for (const course of courses) {
  course.modules = await prisma.module.findMany({ where: { courseId: course.id }});
}

// ✅ Single query with include
const courses = await prisma.course.findMany({
  include: { modules: true }
});
```

## Report Format
- Issue description and location
- Performance impact (High/Medium/Low)
- Suggested fix with code example
- Estimated improvement
- Implementation difficulty

Focus on high-impact, low-effort optimizations first.
```

### 10. Accessibility Checker

**Purpose:** Ensures accessibility standards

```markdown
---
name: a11y-checker
description: Validates accessibility standards (WCAG 2.1 AA) for educational platform
tools: [Read, Grep, Bash, WebSearch]
model: haiku
---

# Accessibility Checker

You ensure the platform is accessible to all users.

## Your Role
Validate code against WCAG 2.1 AA standards and suggest improvements.

## Check Areas

### 1. Semantic HTML
- Proper heading hierarchy (h1 → h2 → h3)
- Semantic elements (main, nav, article, section)
- Form labels and inputs
- Button vs link usage

### 2. ARIA
- ARIA labels for icon buttons
- ARIA live regions for dynamic content
- ARIA expanded/hidden states
- Role attributes where needed

### 3. Keyboard Navigation
- Tab order is logical
- Focus indicators visible
- No keyboard traps
- Skip links present

### 4. Color & Contrast
- Text contrast ratio ≥ 4.5:1 (normal text)
- Text contrast ratio ≥ 3:1 (large text)
- Color not sole indicator
- Focus indicators visible

### 5. Images & Media
- Alt text for images
- Captions for videos
- Transcripts for audio

## Common Issues

```tsx
// ❌ Icon button without label
<button><Icon /></button>

// ✅ Accessible icon button
<button aria-label="Close menu"><Icon /></button>

// ❌ Non-semantic div button
<div onClick={handleClick}>Click me</div>

// ✅ Proper button element
<button onClick={handleClick}>Click me</button>

// ❌ Missing form label
<input type="text" placeholder="Email" />

// ✅ Proper label association
<label htmlFor="email">Email</label>
<input id="email" type="text" />
```

## Report Format
- Issue type and severity (Critical/High/Medium/Low)
- WCAG criterion violated
- Location (file:line)
- Code snippet showing issue
- Suggested fix

Prioritize critical issues that prevent users from accessing content.
```

---

## Implementation Roadmap

### Phase 1: Foundation (Week 1)

**Goal:** Set up basic infrastructure

#### Tasks
1. **Create directory structure**
   ```bash
   mkdir -p .claude/agents
   mkdir -p .claude/commands
   mkdir -p .claude/hooks
   mkdir -p PRPs
   ```

2. **Implement top 3 priority agents**
   - course-content-creator (most important for your project)
   - code-validator (ensures quality)
   - link-validator (maintains documentation)

3. **Create basic slash commands**
   - `/validate-course [file]` - Run content validation
   - `/check-links` - Validate all links
   - `/balance-xp` - Check gamification balance

#### Success Criteria
- [ ] Directory structure created
- [ ] 3 agents functional
- [ ] 3 slash commands working
- [ ] Agents successfully delegated automatically

### Phase 2: Workflow Automation (Week 2)

**Goal:** Implement PRP workflow and additional agents

#### Tasks
1. **Implement PRP workflow**
   - Create `/generate-prp` command
   - Create `/execute-prp` command
   - Document PRP template

2. **Add specialized agents**
   - interview-qa-generator
   - gamification-balancer
   - test-generator

3. **Create hooks**
   - pre-commit hook: validate links and code examples
   - tool-call-end hook: log important file changes

#### Success Criteria
- [ ] PRP workflow functional
- [ ] 6 total agents working
- [ ] Hooks integrated
- [ ] Documentation updated

### Phase 3: Advanced Features (Week 3)

**Goal:** Complete agent suite and optimization

#### Tasks
1. **Add remaining agents**
   - docs-updater
   - db-migration-helper
   - performance-auditor
   - a11y-checker

2. **Context optimization**
   - Add subfolder CLAUDE.md for specific areas
   - Create examples/ directory with code patterns
   - Optimize model selection per agent

3. **Advanced commands**
   - `/audit-performance` - Run performance audit
   - `/check-a11y` - Run accessibility check
   - `/update-docs` - Sync docs with code

#### Success Criteria
- [ ] All 10 agents operational
- [ ] Context optimized
- [ ] Advanced commands working
- [ ] Team documentation complete

### Phase 4: Refinement (Week 4)

**Goal:** Polish and optimize

#### Tasks
1. **Performance tuning**
   - Optimize agent prompts
   - Adjust model selection (haiku vs sonnet)
   - Reduce token usage

2. **Team onboarding**
   - Create onboarding guide
   - Run training session
   - Gather feedback

3. **Continuous improvement**
   - Monitor agent success rates
   - Refine prompts based on failures
   - Add new agents as needed

#### Success Criteria
- [ ] <5% agent failure rate
- [ ] Team fully onboarded
- [ ] Documentation complete
- [ ] Feedback loop established

---

## Best Practices 2025

### 1. Context Engineering Over Prompt Engineering

**Old Way (Prompt Engineering):**
```
User: "Add dark mode, make sure it persists and works everywhere"
```

**New Way (Context Engineering):**
```markdown
# Feature: Dark Mode Implementation

## Context
- Next.js 14 app with App Router
- Tailwind CSS for styling
- Existing theme system in src/contexts/ThemeContext.tsx
- User preferences stored in localStorage

## Requirements
1. Toggle between light/dark/system modes
2. Persist preference in localStorage
3. Respect system preference
4. No flash of wrong theme on load
5. Update all components

## Implementation
[Detailed step-by-step plan]

## Examples
[Code examples from project]

## Validation
- [ ] Toggle works
- [ ] Persists across page loads
- [ ] Respects system preference
- [ ] No theme flash on load
- [ ] All components updated
```

### 2. Agent Design Patterns

#### Pattern: Single Responsibility
```markdown
# ❌ Bad: Jack-of-all-trades agent
name: helper
description: Helps with coding tasks
```

```markdown
# ✅ Good: Focused specialist
name: react-component-tester
description: Generates React component tests using Vitest and React Testing Library
```

#### Pattern: Clear Trigger Phrases
```markdown
# ✅ Good: Specific trigger phrases
description: Reviews markdown files for formatting, validates links, checks code examples
```

Triggers when user says:
- "Check my markdown files"
- "Validate documentation"
- "Review course content"

#### Pattern: Minimal Sufficient Tools
```markdown
# ❌ Bad: Too many tools
tools: [Read, Write, Edit, Bash, Grep, Glob, WebFetch, WebSearch, NotebookEdit]

# ✅ Good: Only what's needed
tools: [Read, Grep]  # Read-only validator
```

### 3. Model Selection Strategy

```yaml
# Use Haiku (fast, cheap, 90% performance)
- Validators (code, links, accessibility)
- Simple updates (documentation sync)
- Quick searches (file finding)
- Formatting tasks

# Use Sonnet (balanced)
- Content creation
- Test generation
- Complex refactoring
- Feature implementation

# Use Opus (best, expensive)
- Critical architecture decisions
- Complex debugging
- High-stakes refactoring
- Production incidents
```

### 4. Context Management

#### Subfolder CLAUDE.md Overrides
```
/project/
├── CLAUDE.md                    # Project-wide context
├── src/
│   ├── components/
│   │   └── CLAUDE.md            # Component-specific patterns
│   └── data/
│       └── courses/
│           └── CLAUDE.md        # Course content guidelines
└── docs/
    └── CLAUDE.md                # Documentation standards
```

Each subfolder CLAUDE.md overrides parent context for that scope.

#### Clear Context Regularly
```bash
# When to /clear
- After completing a major task
- When switching domains (frontend → backend)
- Every 30-40 minutes of continuous work
- When agent seems confused
```

### 5. Hook Best Practices

```bash
# .claude/hooks/pre-commit.sh
#!/bin/bash

# Run quick validators before commit
echo "Running pre-commit checks..."

# Validate links
claude-code agent link-validator

# Check code examples
claude-code agent code-validator

# Balance XP values
claude-code agent gamification-balancer

echo "Pre-commit checks complete!"
```

### 6. PRP Workflow

```bash
# Step 1: Create initial requirements
vi INITIAL.md

# Step 2: Generate comprehensive PRP
/generate-prp INITIAL.md

# Step 3: Review generated PRP
cat PRPs/feature-name.md

# Step 4: Execute PRP
/execute-prp PRPs/feature-name.md

# Result: 90% first-attempt success rate
```

---

## Migration Guide

### Step-by-Step Migration

#### Step 1: Audit Current State

```bash
# Check current configuration
ls -la .claude/

# Review CLAUDE.md
cat CLAUDE.md

# Identify gaps
# - Missing: agents/, commands/, hooks/
# - Has: settings.local.json (good!)
# - Has: Comprehensive CLAUDE.md (good!)
```

#### Step 2: Create Infrastructure

```bash
# Create directories
mkdir -p .claude/agents
mkdir -p .claude/commands
mkdir -p .claude/hooks
mkdir -p PRPs
mkdir -p examples

# Add to .gitignore (or commit to share with team)
# Decision: Commit agents for team sharing
```

#### Step 3: Implement Priority Agents

Start with the most impactful agents:

1. **course-content-creator** - Core to your mission
2. **code-validator** - Quality assurance
3. **link-validator** - Maintains documentation

```bash
# Create each agent file
touch .claude/agents/course-content-creator.md
touch .claude/agents/code-validator.md
touch .claude/agents/link-validator.md

# Copy agent content from "Recommended Agents" section above
```

#### Step 4: Test Agent Delegation

```bash
# Test automatic delegation
# In Claude Code session:
"Can you create a new course module for Advanced TypeScript?"
# Should delegate to course-content-creator

"Validate the code examples in my React course"
# Should delegate to code-validator

"Check all the links in my documentation"
# Should delegate to link-validator
```

#### Step 5: Create Slash Commands

```bash
# .claude/commands/validate-course.md
cat > .claude/commands/validate-course.md << 'EOF'
# Validate Course Content

Run comprehensive validation on course content:

1. Use code-validator agent to check code examples
2. Use link-validator agent to check all links
3. Use gamification-balancer to verify XP values
4. Report all issues found

Target file: $ARGUMENTS

Provide a summary report with:
- Total issues found
- Categorized by type (code, links, gamification)
- Suggested fixes
EOF

# Test the command
/validate-course docs/courses/TYPESCRIPT_COURSE_REQUIREMENTS.md
```

#### Step 6: Optimize Context

```bash
# Create subfolder contexts
# For course content
cat > src/data/courses/CLAUDE.md << 'EOF'
# Course Content Context

When working in this directory:
- Follow course structure template from project CLAUDE.md
- All code examples must be validated
- XP values must follow gamification standards
- Interview questions must be current (2025)
- Use course-content-creator agent for new content
EOF

# For components
cat > src/components/CLAUDE.md << 'EOF'
# Component Development Context

When working with components:
- Use TypeScript strict mode
- Follow React best practices
- Include accessibility attributes
- Write tests using Vitest + React Testing Library
- Use performance-auditor for optimization
- Use a11y-checker for accessibility
EOF
```

#### Step 7: Implement PRP Workflow

```bash
# Create PRP generation command
cat > .claude/commands/generate-prp.md << 'EOF'
# Generate Product Requirements Prompt

Based on the initial requirements in $ARGUMENTS:

1. Read the initial requirements file
2. Research current best practices for the feature
3. Analyze existing project patterns
4. Generate comprehensive PRP with:
   - Context section (project, files, constraints)
   - Requirements (functional, technical, success criteria)
   - Implementation plan (step-by-step)
   - Examples from project
   - Validation checklist

5. Save to PRPs/[feature-name].md

Use the project CLAUDE.md for context and patterns.
EOF

# Create PRP execution command
cat > .claude/commands/execute-prp.md << 'EOF'
# Execute Product Requirements Prompt

Execute the PRP defined in $ARGUMENTS:

1. Read the PRP file completely
2. Understand all requirements and context
3. Follow the implementation plan step-by-step
4. Use examples and patterns from PRP
5. Complete all validation checklist items
6. Report completion status

This is a systematic implementation - do not deviate from the plan.
EOF
```

#### Step 8: Add Hooks (Optional but Recommended)

```bash
# Pre-commit validation hook
cat > .claude/hooks/pre-commit.sh << 'EOF'
#!/bin/bash

echo "🔍 Running pre-commit validations..."

# Validate markdown links
echo "Checking links..."
# Delegate to link-validator agent

# Validate code examples
echo "Validating code examples..."
# Delegate to code-validator agent

# Check XP balance
echo "Verifying gamification balance..."
# Delegate to gamification-balancer agent

echo "✅ Pre-commit checks complete!"
EOF

chmod +x .claude/hooks/pre-commit.sh
```

#### Step 9: Document for Team

```bash
# Create team onboarding guide
cat > .claude/AGENT_GUIDE.md << 'EOF'
# Agent Usage Guide

## Available Agents

### Content Creation
- **course-content-creator**: Creates course content
- **interview-qa-generator**: Generates interview questions

### Quality Assurance
- **code-validator**: Validates code examples
- **link-validator**: Checks all links
- **test-generator**: Creates tests
- **a11y-checker**: Accessibility validation

### Optimization
- **gamification-balancer**: Balances XP/badges
- **performance-auditor**: Finds performance issues
- **docs-updater**: Keeps docs in sync

### Development
- **db-migration-helper**: Handles database changes

## Commands

- `/validate-course [file]` - Comprehensive course validation
- `/generate-prp [file]` - Generate implementation blueprint
- `/execute-prp [file]` - Execute implementation plan
- `/check-links` - Validate all links
- `/balance-xp` - Check gamification balance
- `/audit-performance` - Performance analysis
- `/check-a11y` - Accessibility audit

## Workflow

### Creating New Course Content
1. Research topic
2. Create INITIAL.md with requirements
3. Run `/generate-prp INITIAL.md`
4. Review generated PRP
5. Run `/execute-prp PRPs/feature-name.md`
6. Run `/validate-course [file]`

### Updating Existing Content
1. Make changes
2. Run `/validate-course [file]`
3. Fix any issues
4. Commit changes (pre-commit hook runs automatically)

### Feature Development
1. Define requirements in INITIAL.md
2. Generate PRP: `/generate-prp INITIAL.md`
3. Execute PRP: `/execute-prp PRPs/feature-name.md`
4. Run tests
5. Review changes
6. Commit

## Tips

- Agents are invoked automatically based on task matching
- Use `/clear` when switching major contexts
- PRP workflow has 90% first-attempt success rate
- Subfolder CLAUDE.md files provide local context
- Use `haiku` model for fast validators, `sonnet` for creators

EOF
```

#### Step 10: Validate Migration

```bash
# Checklist
- [ ] All agent files created and tested
- [ ] Slash commands working
- [ ] PRP workflow functional
- [ ] Hooks integrated (if applicable)
- [ ] Team documentation complete
- [ ] Context optimization in place
- [ ] Agents successfully auto-delegate
- [ ] Team trained on new workflow
```

---

## Appendix: Quick Reference

### Directory Structure

```
/home/coder/coder-personal-project/
├── .claude/
│   ├── agents/                          # Specialized subagents
│   │   ├── course-content-creator.md
│   │   ├── code-validator.md
│   │   ├── link-validator.md
│   │   ├── interview-qa-generator.md
│   │   ├── gamification-balancer.md
│   │   ├── test-generator.md
│   │   ├── docs-updater.md
│   │   ├── db-migration-helper.md
│   │   ├── performance-auditor.md
│   │   └── a11y-checker.md
│   ├── commands/                        # Slash commands
│   │   ├── validate-course.md
│   │   ├── generate-prp.md
│   │   ├── execute-prp.md
│   │   ├── check-links.md
│   │   ├── balance-xp.md
│   │   ├── audit-performance.md
│   │   └── check-a11y.md
│   ├── hooks/                           # Workflow automation
│   │   ├── pre-commit.sh
│   │   └── tool-call-end.sh
│   ├── settings.local.json              # Permissions (existing)
│   ├── README.md                        # Configuration docs (existing)
│   └── AGENT_GUIDE.md                   # Team onboarding (new)
├── PRPs/                                # Product Requirements Prompts
│   └── [feature-name].md
├── examples/                            # Code examples for context
│   └── [pattern-examples].ts
├── CLAUDE.md                            # Project patterns (existing)
├── src/
│   ├── components/
│   │   └── CLAUDE.md                    # Component-specific context
│   └── data/
│       └── courses/
│           └── CLAUDE.md                # Course content context
└── docs/
    ├── CLAUDE.md                        # Documentation standards
    └── CLAUDE_CODE_MODERNIZATION_GUIDE.md  # This file
```

### Agent Template

```markdown
---
name: agent-name
description: Clear description triggering automatic delegation
tools: [Read, Write, Edit, Grep, Glob, Bash, WebSearch]
model: haiku  # or sonnet, opus
---

# Agent Name

Brief description of agent's role.

## Your Role
What this agent does.

## Process
1. Step-by-step approach
2. What to check
3. How to report

## Standards
- Quality criteria
- Patterns to follow
- Anti-patterns to avoid

## Output Format
How to present results.

Be specific about expected behavior and output.
```

### Command Template

```markdown
# Command Name

Description of what this command does.

## Process
1. Step-by-step instructions
2. What agents to use
3. How to report

Use $ARGUMENTS for user input.

Example: $ARGUMENTS might be "path/to/file.md"
```

### PRP Template

```markdown
# Feature: [Name]

## Context
- Project overview
- Relevant files
- Technical constraints
- Existing patterns

## Requirements

### Functional Requirements
1. What the feature must do
2. User interactions
3. Success criteria

### Technical Requirements
1. Technologies to use
2. Performance requirements
3. Compatibility constraints

## Implementation Plan

### Step 1: [Phase Name]
- [ ] Task 1
- [ ] Task 2
- [ ] Task 3

### Step 2: [Phase Name]
- [ ] Task 1
- [ ] Task 2

[Repeat for all steps]

## Examples

### Similar Pattern in Project
```typescript
// Example code from project showing relevant pattern
```

### Expected Output
```typescript
// What the implemented feature should look like
```

## Validation Checklist
- [ ] All requirements met
- [ ] Tests pass
- [ ] Code follows project patterns
- [ ] Documentation updated
- [ ] Performance acceptable
- [ ] Accessibility checked
- [ ] No breaking changes (or documented)

## Success Criteria
- Specific, measurable outcomes
- Performance benchmarks
- User acceptance criteria
```

### Model Selection Guide

| Task Type | Model | Why |
|-----------|-------|-----|
| Validators (code, links, a11y) | Haiku | Fast, cheap, sufficient accuracy |
| Simple updates (docs sync) | Haiku | Speed matters more than complexity |
| Content creation | Sonnet | Needs creativity and context |
| Test generation | Sonnet | Requires understanding of edge cases |
| Complex refactoring | Sonnet | Needs deep code understanding |
| Architecture decisions | Opus | Critical, high-stakes decisions |
| Feature implementation (PRP) | Sonnet | Balanced performance and cost |
| Quick searches | Haiku | Speed is priority |

### Common Workflows

#### Creating New Course Content
```bash
# Traditional approach (slow, may need revisions)
1. "Create a TypeScript advanced types module"
2. Review and request changes
3. Multiple iterations

# PRP approach (fast, 90% success rate)
1. Write requirements in INITIAL.md
2. /generate-prp INITIAL.md
3. Review PRPs/typescript-advanced-types.md
4. /execute-prp PRPs/typescript-advanced-types.md
5. /validate-course [output-file]
6. Done!
```

#### Validating Content Before Commit
```bash
# Quick validation
/validate-course docs/courses/REACT_COURSE.md

# Comprehensive audit
/check-links
/balance-xp
/audit-performance
/check-a11y
```

#### Feature Development
```bash
# Step 1: Plan
vi INITIAL.md  # Write requirements

# Step 2: Generate PRP
/generate-prp INITIAL.md

# Step 3: Review
cat PRPs/feature-name.md  # Review plan

# Step 4: Execute
/execute-prp PRPs/feature-name.md

# Step 5: Validate
npm run test
npm run build
/check-a11y

# Step 6: Commit
git add .
git commit -m "feat: implement [feature]"
# Pre-commit hook runs automatically
```

---

## Conclusion

This modernization guide provides a comprehensive roadmap for upgrading your Claude Code setup to 2025 standards. By implementing:

1. **Specialized Agents**: 10 domain-specific agents for educational content
2. **PRP Workflow**: 90% first-attempt success rate
3. **Slash Commands**: Workflow automation
4. **Context Optimization**: Subfolder overrides and examples
5. **Hooks**: Quality gates and automation

You'll transform your development workflow from reactive "vibe coding" to systematic "context engineering."

### Next Steps

1. **Week 1**: Implement Phase 1 (foundation + 3 priority agents)
2. **Week 2**: Implement Phase 2 (PRP workflow + 3 more agents)
3. **Week 3**: Implement Phase 3 (remaining agents + optimization)
4. **Week 4**: Implement Phase 4 (refinement + team onboarding)

### Resources

- [Claude Code Documentation](https://docs.claude.com/en/docs/claude-code/overview)
- [Subagents Guide](https://docs.claude.com/en/docs/claude-code/subagents)
- [Agent SDK](https://docs.claude.com/en/api/agent-sdk/overview)
- [Community Examples](https://github.com/VoltAgent/awesome-claude-code-subagents)

### Support

Questions or issues?
- Review this guide's examples
- Check official Claude Code docs
- Test agents incrementally
- Iterate based on results

**Remember:** Context engineering is about systematic, repeatable success. Take it step-by-step, validate along the way, and you'll achieve production-ready AI-assisted development.

---

*Created: 2025-10-29*
*For: Educational Platform Development*
*By: Claude Code Modernization Analysis*
