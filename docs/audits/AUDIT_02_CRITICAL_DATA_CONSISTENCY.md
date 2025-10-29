# AUDIT TASK 02: Critical Data Consistency Issues

**Category:** FUNCTIONALITY
**Priority:** 🔴 CRITICAL
**Estimated Effort:** 4-6 hours
**Dependencies:** AUDIT_01 (Auth must be fixed first)

---

## Issues to Fix

### 2. Multiple Conflicting User IDs Throughout App

**Locations:** Multiple files

**Problem:**
The app uses **3 different hardcoded user IDs** in different places:

| Location | User ID | File |
|----------|---------|------|
| Auth Store | `be3d97ac-e48a-4c37-8c2b-5cff1710d785` | [src/stores/authStore.ts:31](src/stores/authStore.ts#L31) |
| Learn Page | `be3d97ac-e48a-4c37-8c2b-5cff1710d785` | [src/app/courses/[id]/learn/page.tsx:102](src/app/courses/[id]/learn/page.tsx#L102) |
| Progress Context | `e944cde4-af3a-4133-833c-fdbc3846af81` | [src/contexts/ProgressContext.tsx:28](src/contexts/ProgressContext.tsx#L28) |
| Lessons Page | `mock-user-1` | [src/app/lessons/[lessonId]/page.tsx:22](src/app/lessons/[lessonId]/page.tsx#L22) |

**User Impact:** Progress tracking won't work correctly - users completing lessons may not see their XP/progress update elsewhere in the app.

---

### 3. Dashboard Stats Are Completely Fake

**Location:** [src/app/dashboard/page.tsx:44-104](src/app/dashboard/page.tsx#L44-L104)

**Problem:**
All dashboard metrics are hardcoded:

```typescript
<div className="text-2xl font-bold">3</div>  // Enrolled Courses
<div className="text-2xl font-bold">24.5</div>  // Hours Learned
<div className="text-2xl font-bold">67%</div>  // Completion Rate
<div className="text-2xl font-bold">2</div>  // Certificates
```

Additionally:
- "Continue Learning" courses - hardcoded array (lines 172-191)
- "Recommended Courses" - hardcoded array (lines 193-212)
- No data fetched from database
- No real user progress shown

**User Impact:** Users cannot see their actual progress, enrolled courses, or certificates.

---

### 19. Hardcoded Course ID in ModuleContent

**Location:** [src/components/course/ModuleContent.tsx:22](src/components/course/ModuleContent.tsx#L22)

**Problem:**
```typescript
useEffect(() => {
  // Load progress for the React course
  loadProgress('react-course')
}, [loadProgress])
```

Always loads progress for 'react-course' regardless of which course is actually being viewed.

**User Impact:** Progress tracking is broken for all non-React courses.

---

## Tasks to Complete

### Phase 1: Centralize User Context
- [ ] Create single source of truth for authenticated user
- [ ] Update all components to use auth context consistently
- [ ] Remove ALL hardcoded user IDs from codebase
- [ ] Add TypeScript strict checks for user ID usage

### Phase 2: Fix Dashboard Data Fetching
- [ ] Create API endpoint for dashboard stats (or use existing)
- [ ] Fetch real enrolled courses from database
- [ ] Calculate actual hours learned from progress data
- [ ] Calculate real completion rate from enrollments
- [ ] Query actual certificates earned
- [ ] Replace "Continue Learning" with real user enrollments
- [ ] Generate personalized course recommendations

### Phase 3: Fix Module Content
- [ ] Accept courseId as prop in ModuleContent component
- [ ] Remove hardcoded 'react-course' reference
- [ ] Load progress dynamically based on actual course
- [ ] Test with multiple courses

---

## Files to Modify

- [src/stores/authStore.ts](src/stores/authStore.ts) - Remove hardcoded user ID
- [src/contexts/ProgressContext.tsx](src/contexts/ProgressContext.tsx) - Use auth context
- [src/app/courses/[id]/learn/page.tsx](src/app/courses/[id]/learn/page.tsx) - Use auth context
- [src/app/lessons/[lessonId]/page.tsx](src/app/lessons/[lessonId]/page.tsx) - Use auth context
- [src/app/dashboard/page.tsx](src/app/dashboard/page.tsx) - Fetch real data
- [src/components/course/ModuleContent.tsx](src/components/course/ModuleContent.tsx) - Accept courseId prop
- [src/app/api/dashboard/stats/route.ts](src/app/api/dashboard/stats/route.ts) - CREATE NEW (optional)

---

## Testing Requirements

### Manual Testing:
- [ ] Log in as different users, verify correct user ID used everywhere
- [ ] Complete a lesson, check progress appears correctly
- [ ] Check dashboard shows real user data
- [ ] Enroll in course, verify it appears on dashboard
- [ ] Test progress tracking across multiple courses
- [ ] Verify all stats update in real-time

### Automated Testing:
- [ ] Add tests for user context propagation
- [ ] Test dashboard data fetching with different users
- [ ] Test progress tracking with multiple courses
- [ ] Add E2E test for complete user flow

---

## Success Criteria

- ✅ Only ONE user ID exists at runtime (from auth context)
- ✅ Dashboard shows real user data from database
- ✅ All stats are calculated dynamically
- ✅ Progress tracking works for all courses
- ✅ No hardcoded user IDs anywhere in codebase
- ✅ User data is consistent across all pages

---

## Search Commands for Verification

After fixes, run these to verify all hardcoded IDs are removed:

```bash
grep -r "be3d97ac-e48a-4c37-8c2b-5cff1710d785" src/
grep -r "e944cde4-af3a-4133-833c-fdbc3846af81" src/
grep -r "mock-user-1" src/
grep -r "react-course" src/
```

All should return no results (or only in comments/tests).
