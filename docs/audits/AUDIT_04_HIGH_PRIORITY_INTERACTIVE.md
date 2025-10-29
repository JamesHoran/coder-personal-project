# AUDIT TASK 04: Interactive Learning Components

**Category:** FUNCTIONALITY
**Priority:** 🟡 HIGH
**Estimated Effort:** 16-24 hours
**Dependencies:** AUDIT_01, AUDIT_02 (Need auth and user context)

---

## Issues to Fix

### 8. Project Buttons Don't Open Project Interfaces

**Location:** [src/components/course/ProjectButton.tsx:16-20](src/components/course/ProjectButton.tsx#L16-L20)

**Problem:**
```typescript
const handleClick = async () => {
  if (!isCompleted) {
    await markProjectComplete(projectId, projectXP)
  }
}
```

**Issues:**
- Clicking "Start Project" **immediately marks it as complete**
- No actual project interface opens
- No instructions modal
- No submission form
- No validation of work
- No code editor
- No deliverables check

**User Impact:** Users can't actually DO the projects - they just mark them as done without any work.

---

### 9. Challenge Buttons Don't Open Challenge Interfaces

**Location:** [src/components/course/ChallengeButton.tsx:27-31](src/components/course/ChallengeButton.tsx#L27-L31)

**Problem:**
Same issue as projects:

```typescript
const handleClick = async () => {
  if (!isCompleted) {
    await markChallengeComplete(challengeId, challengeXP)
  }
}
```

**Issues:**
- Clicking "Start" just marks challenge as complete
- No code editor modal
- No challenge description shown
- No test cases to pass
- No actual work required

---

### 10. Interactive Lesson Progress Never Persists

**Location:** [src/hooks/useInteractiveLessonProgress.ts:50-55](src/hooks/useInteractiveLessonProgress.ts#L50-L55)

**Problem:**
```typescript
const completeLesson = useCallback(
  (xpReward: number) => {
    // ...

    // In a real app, you would call an API here to:
    // 1. Update user's total XP in database
    // 2. Check for level ups
    // 3. Check for badge/achievement unlocks
    // 4. Update leaderboard
    console.log(`Lesson completed! +${xpReward} XP earned`);

    // ...
  },
  []
);
```

**Issues:**
- Only logs to console
- Never calls API endpoint
- Progress lost on page refresh

---

### 12. "Start Project" Buttons on Git Course Page Do Nothing

**Location:** [src/app/courses/git/page.tsx:232-235](src/app/courses/git/page.tsx#L232-L235)

**Problem:**
```typescript
<Button size="sm" variant="outline">
  Start Project
</Button>
```

No onClick handlers.

---

### 13. Challenge "Attempt" Buttons on Git Course Page Do Nothing

**Location:** [src/app/courses/git/page.tsx:278-280](src/app/courses/git/page.tsx#L278-L280)

**Problem:**
```typescript
<Button size="sm" variant="ghost" className="h-7 text-xs">
  Attempt
</Button>
```

No functionality.

---

## Tasks to Complete

### Phase 1: Design Project Interface
- [ ] Create project modal/page component
- [ ] Design project instruction view
- [ ] Add deliverables checklist
- [ ] Add file upload capability (if needed)
- [ ] Add code submission form
- [ ] Add validation rules
- [ ] Design success/completion screen

### Phase 2: Implement Project Functionality
- [ ] Update ProjectButton to open modal instead of marking complete
- [ ] Create ProjectModal component
- [ ] Add project API endpoints for submission
- [ ] Add validation logic for project completion
- [ ] Add file storage (if projects require file uploads)
- [ ] Implement peer review system (future enhancement)
- [ ] Add "Skip for now" option

### Phase 3: Design Challenge Interface
- [ ] Create challenge code editor modal
- [ ] Integrate Monaco Editor or CodeMirror
- [ ] Add test runner UI
- [ ] Show test results in real-time
- [ ] Add hint system
- [ ] Add solution reveal (after attempts)
- [ ] Design success screen

### Phase 4: Implement Challenge Functionality
- [ ] Update ChallengeButton to open editor modal
- [ ] Create ChallengeEditorModal component
- [ ] Add challenge API endpoint for code submission
- [ ] Implement test runner on backend
- [ ] Add code validation
- [ ] Track number of attempts
- [ ] Award XP only on successful completion

### Phase 5: Fix Interactive Lesson Persistence
- [ ] Create API endpoint for lesson completion (may exist)
- [ ] Update useInteractiveLessonProgress to call API
- [ ] Save progress to database
- [ ] Update user XP in database
- [ ] Check for level-ups server-side
- [ ] Unlock achievements server-side
- [ ] Return complete state to client
- [ ] Handle errors gracefully

### Phase 6: Wire Up Git Course Page Buttons
- [ ] Add onClick handlers to all project buttons
- [ ] Add onClick handlers to all challenge buttons
- [ ] Integrate with project/challenge modals
- [ ] Test all interactions

---

## Files to Modify

### Projects
- [src/components/course/ProjectButton.tsx](src/components/course/ProjectButton.tsx) - Update click handler
- [src/components/modals/ProjectModal.tsx](src/components/modals/ProjectModal.tsx) - CREATE NEW
- [src/components/projects/ProjectInstructions.tsx](src/components/projects/ProjectInstructions.tsx) - CREATE NEW
- [src/components/projects/ProjectSubmission.tsx](src/components/projects/ProjectSubmission.tsx) - CREATE NEW
- [src/app/api/projects/submit/route.ts](src/app/api/projects/submit/route.ts) - CREATE NEW

### Challenges
- [src/components/course/ChallengeButton.tsx](src/components/course/ChallengeButton.tsx) - Update click handler
- [src/components/modals/ChallengeEditorModal.tsx](src/components/modals/ChallengeEditorModal.tsx) - CREATE NEW
- [src/components/challenges/CodeEditor.tsx](src/components/challenges/CodeEditor.tsx) - CREATE NEW
- [src/components/challenges/TestResults.tsx](src/components/challenges/TestResults.tsx) - CREATE NEW
- [src/app/api/challenges/submit/route.ts](src/app/api/challenges/submit/route.ts) - UPDATE or CREATE

### Interactive Lessons
- [src/hooks/useInteractiveLessonProgress.ts](src/hooks/useInteractiveLessonProgress.ts) - Add API calls
- [src/app/api/lessons/complete/route.ts](src/app/api/lessons/complete/route.ts) - CREATE NEW

### Git Course Page
- [src/app/courses/git/page.tsx](src/app/courses/git/page.tsx) - Add onClick handlers

---

## NPM Packages Needed

```bash
# Code editor
npm install @monaco-editor/react
# OR
npm install @uiw/react-codemirror

# Code execution/testing (backend)
npm install vm2  # Sandboxed code execution
# OR use Docker containers for isolation

# File uploads (if needed)
npm install react-dropzone
```

---

## Testing Requirements

### Manual Testing - Projects:
- [ ] Click "Start Project" button
- [ ] Modal opens with instructions
- [ ] Submit project deliverables
- [ ] Validation works correctly
- [ ] XP awarded on completion
- [ ] Project marked as complete
- [ ] Cannot re-complete same project

### Manual Testing - Challenges:
- [ ] Click "Start Challenge" button
- [ ] Code editor opens with starter code
- [ ] Can type code in editor
- [ ] Run tests shows results
- [ ] Failing tests show clear feedback
- [ ] Passing all tests awards XP
- [ ] Challenge marked as complete
- [ ] Hints work correctly

### Manual Testing - Interactive Lessons:
- [ ] Complete interactive lesson
- [ ] Progress saves to database
- [ ] Page refresh maintains progress
- [ ] XP updates globally
- [ ] Level-up triggers correctly
- [ ] Achievements unlock

### Automated Testing:
- [ ] Test project submission API
- [ ] Test challenge submission API
- [ ] Test code runner with various inputs
- [ ] Test lesson completion API
- [ ] Test XP calculations
- [ ] Add E2E tests for complete flows

---

## Success Criteria

- ✅ Projects open in modal/page with full instructions
- ✅ Users must complete deliverables to mark project done
- ✅ Challenges open code editor with test runner
- ✅ Users must pass all tests to complete challenge
- ✅ Interactive lesson progress persists in database
- ✅ XP is awarded and saved correctly
- ✅ No way to "cheat" by marking incomplete work as done
- ✅ All buttons on Git course page are functional
- ✅ User experience is smooth and intuitive

---

## Security Considerations

### Code Execution Safety:
- Use sandboxed environments (vm2 or Docker containers)
- Set execution timeouts
- Limit memory usage
- Prevent infinite loops
- Validate code before execution
- Never use `eval()` directly

### Project Submissions:
- Validate file types
- Scan for malware
- Limit file sizes
- Use secure file storage
- Sanitize all inputs
