# Claude Project Patterns & Guidelines

## Project Overview

This is a **comprehensive developer training curriculum** consisting of 10 research-backed, gamified courses designed to transform beginners into interview-ready professionals.

**Purpose:** Educational content creation and course requirement documentation
**Type:** Documentation repository
**Primary Language:** Markdown
**Target Audience:** Developers learning TypeScript, React, Git, Python, SQL, Testing, LeetCode, Command-Line tools

---

## Core Principles

### 1. Educational Content Standards
- **Clarity First:** Explanations must be clear, concise, and accessible
- **Practical Focus:** Emphasize real-world applications over theory
- **Interview-Ready:** Include interview questions and practical scenarios
- **Code Examples:** Always provide working code examples
- **Progressive Learning:** Build from fundamentals to advanced topics

### 2. Writing Style
- **Tone:** Professional but encouraging, motivational without being cheesy
- **Format:** GitHub-flavored Markdown
- **Structure:** Clear headings, bullet points, code blocks
- **Emojis:** Use sparingly for visual navigation (✅ ❌ 🎯 📚 etc.)
- **Length:** Comprehensive but scannable, use TOC for long documents

### 3. Code Standards
- Use modern syntax (ES6+, latest TypeScript, Python 3.9+)
- Include comments for complex logic
- Show both correct and incorrect examples
- Use meaningful variable names
- Include error handling where relevant

---

## File Structure

```
/home/coder/repo/
├── CLAUDE.md                                    # This file - project patterns
├── README_COURSES.md                            # Main README for courses
├── COMPLETE_CURRICULUM_GUIDE.md                 # Overview of all courses
├── MASTER_CURRICULUM_OVERVIEW.md                # Original master overview
├── TYPESCRIPT_COURSE_REQUIREMENTS.md            # TypeScript course
├── GIT_COURSE_REQUIREMENTS.md                   # Git course
├── REACT_COURSE_REQUIREMENTS.md                 # React course
├── ASYNC_PROGRAMMING_COURSE_REQUIREMENTS.md     # Async course
├── COMMAND_LINE_SEARCH_COURSE_REQUIREMENTS.md   # CLI tools course
├── LEETCODE_MASTERY_COURSE_REQUIREMENTS.md      # LeetCode course
├── SQL_ESSENTIALS_COURSE_REQUIREMENTS.md        # SQL course
├── JEST_TESTING_ESSENTIALS_COURSE_REQUIREMENTS.md  # Jest course
├── PYTHON_ESSENTIALS_COURSE_REQUIREMENTS.md     # Python course
└── src/                                         # Example code (if needed)
```

---

## Documentation Patterns

### Course Structure Template

All course documents should follow this structure:

```markdown
# [Course Name]
## [Tagline]

---

## Course Overview
- Target Audience
- Time Commitment
- Success Metrics

## What You'll Learn
- Core skills list

## Learning Path
### Module 1: [Name] (X hours)
**Level:** [Novice/Practitioner/Expert]

#### 1.1: [Topic]
**Essential Concepts:**
[Code examples with comments]

**Interview Questions (XP: X):**
1. Question 1
2. Question 2

### [Repeat for all modules]

## Gamification System
- XP & Levels
- Achievement Badges
- Progress Tracking

## Interview Preparation
- Common questions
- Mock interviews
- Practical assessments

## Resources
- Links to tools
- Practice platforms
- Community

## Certification
- Requirements
- Levels

## Conclusion
- Motivational closing
```

### Code Block Guidelines

**Always specify language:**
```javascript
// Good - language specified
const example = "code";
```

**Include comments for complex code:**
```typescript
// Bad: No explanation
const process = (data: unknown) => transform(validate(data));

// Good: Clear explanation
// Validate input data, transform it, and return result
// Throws ValidationError if data is invalid
const process = (data: unknown): ProcessedData => {
  const validated = validate(data);  // Step 1: Validate
  return transform(validated);        // Step 2: Transform
};
```

**Show both correct and incorrect:**
```python
# ❌ Bad: Mutable default argument
def add_item(item, items=[]):
    items.append(item)
    return items

# ✅ Good: None default with initialization
def add_item(item, items=None):
    if items is None:
        items = []
    items.append(item)
    return items
```

---

## Research & Planning Pattern

When adding new content or courses:

### Step 1: Research
```
1. Search for current industry standards (2025)
2. Find common interview questions
3. Identify most valuable skills
4. Check job market requirements
5. Review successful learning paths
```

### Step 2: Plan
```
1. Outline module structure
2. Identify key concepts
3. Select code examples
4. Choose gamification elements
5. Design progression path
```

### Step 3: Execute
```
1. Write module by module
2. Include code examples
3. Add interview questions
4. Create XP/badge system
5. Review and refine
```

### Step 4: Validate
```
1. Check for clarity
2. Verify code examples work
3. Ensure progressive difficulty
4. Validate interview relevance
5. Proofread for errors
```

---

## Gamification Patterns

### XP System Rules
- **Easy content:** 50-100 XP
- **Medium content:** 100-200 XP
- **Hard content:** 200-400 XP
- **Projects:** 300-1000 XP
- **Badges:** 50 XP bonus

### Badge Naming Convention
- **Foundational:** [Skill] Master/Expert/Hero
- **Advanced:** [Skill] Architect/Wizard/Guru
- **Special:** Interview Ready, Production Hero, etc.

### Level Progression
- Clear milestones every 1,000-2,000 XP
- Meaningful titles that reflect skill level
- Progressive difficulty in unlockables

---

## Content Quality Standards

### Must Include
- ✅ Clear learning objectives
- ✅ Practical code examples
- ✅ Interview preparation
- ✅ Real-world applications
- ✅ Common mistakes section
- ✅ Resource links

### Must Avoid
- ❌ Outdated syntax or practices
- ❌ Overly theoretical content
- ❌ Missing code examples
- ❌ Broken links
- ❌ Grammatical errors
- ❌ Inconsistent formatting

### Code Quality Checklist
- [ ] Syntax is correct
- [ ] Examples are testable
- [ ] Comments explain why, not what
- [ ] Error handling is included
- [ ] Modern best practices followed
- [ ] Type safety demonstrated (where applicable)

---

## Interview Content Guidelines

### Question Types to Include

**1. Theoretical Questions**
- Understanding of concepts
- Comparison questions (X vs Y)
- "Explain how X works"
- "When would you use X?"

**2. Practical Questions**
- Write code to solve X
- Debug this code
- Optimize this solution
- Design pattern questions

**3. Scenario Questions**
- Real-world problem solving
- System design basics
- Trade-off discussions
- Best practice application

### Interview Difficulty Balance
- 40% Basic (foundational understanding)
- 40% Intermediate (practical application)
- 20% Advanced (senior-level thinking)

---

## Link & Reference Standards

### External Links
- Use HTTPS links only
- Prefer official documentation
- Include link purpose in text
- Check links work before committing

**Format:**
```markdown
- [Official TypeScript Docs](https://www.typescriptlang.org/docs/)
- [React Documentation](https://react.dev/)
```

### Internal Links
- Use relative paths
- Link to specific sections where helpful
- Maintain link consistency across documents

**Format:**
```markdown
See [TypeScript Course](TYPESCRIPT_COURSE_REQUIREMENTS.md) for details.
Jump to [Module 2: Advanced Patterns](#module-2-advanced-patterns)
```

---

## Common Commands & Operations

### Creating New Course
```bash
# 1. Research the topic
# 2. Use this file as template guide
# 3. Follow structure pattern
# 4. Include all required sections
# 5. Add to COMPLETE_CURRICULUM_GUIDE.md
```

### Updating Existing Course
```bash
# 1. Read current content
# 2. Identify what needs updating
# 3. Research latest information
# 4. Update code examples if needed
# 5. Verify all links still work
# 6. Update XP/gamification if needed
```

### Adding Code Examples
```bash
# 1. Write working code
# 2. Test it (if possible)
# 3. Add helpful comments
# 4. Show common mistakes
# 5. Include output/result
```

---

## Workflow Best Practices

### When Working on This Project

**DO:**
- ✅ Read existing files before modifying
- ✅ Maintain consistent formatting
- ✅ Update multiple files if needed (e.g., guide + course)
- ✅ Use research for accuracy
- ✅ Include practical examples
- ✅ Think about student experience
- ✅ Keep gamification engaging

**DON'T:**
- ❌ Change structure without reason
- ❌ Remove working code examples
- ❌ Add outdated information
- ❌ Break existing links
- ❌ Ignore formatting guidelines
- ❌ Make courses too theoretical
- ❌ Forget interview preparation sections

---

## Special Patterns for Different Content Types

### For Technical Concepts
1. Start with "What" (definition)
2. Explain "Why" (motivation/use case)
3. Show "How" (code example)
4. Discuss "When" (best practices)
5. Include "Watch Out" (common pitfalls)

### For Code Patterns
1. Show the pattern
2. Explain when to use it
3. Provide complete example
4. Show variations
5. Include anti-patterns

### For Interview Prep
1. List common questions
2. Provide model answers
3. Include follow-up questions
4. Add practical coding challenges
5. Link to practice resources

---

## Error Prevention

### Before Committing
- [ ] Spell check completed
- [ ] Links verified
- [ ] Code examples work
- [ ] Formatting consistent
- [ ] XP values make sense
- [ ] Interview questions relevant
- [ ] No outdated information

### Common Mistakes to Avoid
- Using outdated syntax (pre-ES6, old React patterns)
- Missing code examples
- Broken internal links
- Inconsistent XP values
- Missing interview sections
- No gamification elements
- Overly long without structure

---

## Context Management

### When to Clear Context
- Switching between different courses
- After completing a major update
- When response quality decreases
- Every 30-40 minutes of continuous work

### What to Keep in Context
- CLAUDE.md (this file)
- Relevant course document being worked on
- COMPLETE_CURRICULUM_GUIDE.md (for cross-references)
- Any code examples being tested

---

## Communication Style

### With Users (in Documentation)
- Friendly but professional
- Encouraging without being condescending
- Direct and practical
- Use "you" for engagement
- Celebrate progress ("You've mastered X!")

### Technical Explanations
- Start simple, build complexity
- Use analogies when helpful
- Define jargon when first used
- Link to deeper explanations
- Provide multiple examples

### Motivational Elements
- Acknowledge difficulty
- Celebrate milestones
- Remind of end goal
- Share success stories
- Keep realistic expectations

---

## Updates & Maintenance

### Quarterly Reviews
- Check for outdated information
- Update to latest versions
- Refresh interview questions
- Verify all links
- Update XP balance if needed

### When Technology Updates
- Research new features
- Update code examples
- Add migration notes if needed
- Update best practices
- Revise interview questions

---

## Success Metrics

### Course Quality Indicators
- Clear progression path
- Balanced difficulty
- Practical examples throughout
- Strong interview preparation
- Engaging gamification
- Active community feedback
- High completion rates

### Content Quality Indicators
- Zero broken links
- All code examples work
- Consistent formatting
- Up-to-date information
- Comprehensive coverage
- Clear explanations

---

## Claude-Specific Instructions

### When Creating Content
1. Research latest information (use WebSearch)
2. Plan structure before writing
3. Write in chunks (module by module)
4. Include all required sections
5. Verify links and code examples
6. Proofread before finishing

### When Updating Content
1. Read existing content fully
2. Identify specific areas to update
3. Research current best practices
4. Make changes incrementally
5. Verify consistency with other files
6. Update cross-references if needed

### When Helping Users
1. Understand their learning path
2. Point to relevant courses
3. Suggest prerequisites if needed
4. Encourage consistent practice
5. Provide concrete next steps

---

## Critical-Auditor Agent Usage

### IMPORTANT: When to Use the Critical-Auditor

The **critical-auditor** agent is your truth-telling quality guardian. You MUST use it proactively in these situations:

**Automatic Triggers - Use the Task tool with `subagent_type: "critical-auditor"` when you see:**

| User Says | What They Mean | Action Required |
|-----------|----------------|-----------------|
| "audit" | Run critical audit | ✅ Invoke critical-auditor |
| "critically review" | Deep quality check | ✅ Invoke critical-auditor |
| "is this production ready?" | Final verification | ✅ Invoke critical-auditor |
| "what could go wrong?" | Risk assessment | ✅ Invoke critical-auditor |
| "tell me the truth" | Honest evaluation | ✅ Invoke critical-auditor |
| "review this like a detective" | Skeptical analysis | ✅ Invoke critical-auditor |
| "what security issues exist?" | Security audit | ✅ Invoke critical-auditor |

**Proactive Usage - Use WITHOUT being asked when:**

1. **Before finalizing major course content** - Ensure educational quality meets standards
2. **After another agent completes work** - Verify claims and check for missed issues
3. **Before production deployment** - Final safety check
4. **When implementing feedback loops** - Round 1 audit → fixes → Round 2 audit → Round 3 final
5. **After significant refactoring** - Ensure quality didn't degrade

### Critical-Auditor Invocation Pattern

**Correct way to invoke:**
```
Use the Task tool with these parameters:
- subagent_type: "critical-auditor"
- description: "Audit [specific thing]"
- prompt: "[Detailed prompt explaining what to audit and what to focus on]"
```

**Example invocations:**
```
Task(
  subagent_type="critical-auditor",
  description="Audit React course quality",
  prompt="Perform a critical audit of the React course at REACT_COURSE_REQUIREMENTS.md.
         Focus on: 1) Code example accuracy, 2) Interview question relevance,
         3) Modern React patterns (2025), 4) Missing error handling patterns.
         Provide specific line numbers for all issues found."
)
```

### The 3-Round Feedback Loop Pattern

When quality is critical, use this proven pattern:

**Round 1: Initial Critical Audit**
1. Invoke critical-auditor to identify ALL issues
2. Create PRPs (Product Requirements Prompts) from findings
3. Group issues by priority: CRITICAL → HIGH → MEDIUM → LOW

**Round 2: Verification Audit**
1. Fix Priority 1 issues
2. Invoke critical-auditor again to verify fixes
3. Identify remaining issues and regression problems

**Round 3: Final Production Audit**
1. Fix all remaining issues
2. Final critical-auditor audit for production readiness
3. Get "SHIP IT" verdict or iterate further

**Success metrics from React course example:**
- Quality improved from 3.5/10 → 10/10
- Time investment: 28.5 hours vs 40-60 hours without feedback loop
- Success probability: 99% vs 40% without systematic auditing

### What the Critical-Auditor Checks

**Code Quality:**
- Anti-patterns (index keys, missing cleanup, memory leaks)
- Security vulnerabilities (XSS, SQL injection, auth issues)
- Performance killers (N+1 queries, blocking operations)
- Type safety issues (improper `any` usage, missing error handling)
- Maintainability concerns

**Educational Content:**
- Accuracy of code examples (do they actually work?)
- Modern best practices (2025 standards)
- Interview question relevance
- Missing critical concepts
- Outdated or deprecated patterns

**Architecture & Design:**
- Scalability concerns
- Technical debt
- Over-engineering
- Coupling issues
- Missing abstractions

**Documentation:**
- Accuracy vs reality
- Completeness
- Outdated information
- False claims
- Missing warnings

### Agent Output Location

Critical-auditor generates reports saved to:
- `/audits/` directory
- Naming pattern: `[TOPIC]_CRITICAL_AUDIT_ROUND_[N].md`
- Each report includes: Executive Summary, Critical Issues, High Priority Issues, Overall Assessment

### Red Flags That Require Critical-Auditor

**Immediate audit required when you see:**
- ❌ Claims of "production ready" without error handling
- ❌ "It's fully tested" without actual test coverage verification
- ❌ Code examples teaching anti-patterns
- ❌ Security considerations marked "TODO"
- ❌ Performance claims without benchmarks
- ❌ Another agent claims "fixed" without verification
- ❌ Unbounded recursion or memory leaks
- ❌ Missing type safety
- ❌ Outdated dependencies with known vulnerabilities

### Critical-Auditor Communication Style

The agent is configured to be:
- **Direct and honest** - No sugar-coating
- **Evidence-based** - Backs up claims with file paths and line numbers
- **Skeptical** - Questions all claims, even from other agents
- **Risk-focused** - Identifies what WILL break, not what "might be concerning"
- **Actionable** - Provides concrete fixes, not vague suggestions

**Example output format:**
```markdown
🚨 **CRITICAL: Index Key Anti-Pattern** - Severity: CRITICAL
- **Location**: src/lessons/1.2.tsx:45
- **Problem**: Using array index as React key in TodoList example
- **Evidence**: `{todos.map((todo, i) => <Todo key={i} />)}`
- **Impact**: Will cause state bugs when users reorder todos
- **Fix**: Use unique ID: `<Todo key={todo.id} />`
```

### Documentation References

For complete details, see:
- **Agent definition**: `.claude/agents/critical-auditor.md`
- **Comprehensive guide**: `docs/AGENT_FEEDBACK_LOOP_DOCUMENTATION.md`
- **Enhancement summary**: `docs/implementation-reports/CRITICAL_AUDITOR_ADDITION.md`
- **Example audits**: `audits/REACT_COURSE_CRITICAL_AUDIT_ROUND_[1-3].md`

### Summary: Your Responsibility

**You MUST proactively use the critical-auditor when:**
1. User says any variation of "audit", "review critically", or "is this ready?"
2. Before finalizing any major course content or code
3. After other agents complete work (verify their claims)
4. When quality and accuracy are mission-critical

**Remember:** The critical-auditor prevents production disasters and maintains the highest quality standards. Use it liberally. Trust, but verify. Then verify again.

---

**Remember:** This curriculum is designed to change lives. Every improvement makes a difference. Every clear explanation helps someone succeed. Every accurate code example prevents frustration.

**Your role:** Maintain the highest quality standards, keep content current, ensure clarity, and help learners succeed.

**When in doubt:** Research, verify, test, and always prioritize the learner's success.

---

*Last Updated: 2025-01-20*
*Version: 1.0*
*Maintained for: Claude Code & Claude AI assistants*
