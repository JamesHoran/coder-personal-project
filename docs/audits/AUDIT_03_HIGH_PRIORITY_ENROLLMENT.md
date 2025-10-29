# AUDIT TASK 03: Enrollment Flow & Course Data Issues

**Category:** FUNCTIONALITY
**Priority:** 🟡 HIGH
**Estimated Effort:** 6-10 hours
**Dependencies:** AUDIT_01, AUDIT_02 (Need auth and user context)

---

## Issues to Fix

### 6. Enrollment Buttons Don't Actually Enroll

**Location:** [src/app/courses/git/page.tsx:44-49](src/app/courses/git/page.tsx#L44-L49)

**Problem:**
```typescript
<Button size="lg" className="text-lg px-8">
  Enroll Now - ${gitCourse.price}
</Button>
<Button size="lg" variant="outline" className="text-lg">
  Preview Course
</Button>
```

**Issues:**
- "Enroll Now" button has no onClick handler
- "Preview Course" button has no onClick handler
- No enrollment API call
- No payment processing
- No enrollment confirmation

---

### 11. Course Detail Page Enrollment Flow Incomplete

**Location:** [src/app/courses/[id]/page.tsx:108-118](src/app/courses/[id]/page.tsx#L108-L118)

**Problem:**
```typescript
const handleEnroll = async () => {
  // For now, just navigate to first lesson
  // In production, create enrollment first
  if (course && course.phases.length > 0) {
    const firstModule = course.phases[0].modules[0]
    const firstLesson = firstModule?.lessons[0]
    if (firstLesson) {
      router.push(`/courses/${course.id}/learn?lesson=${firstLesson.id}`)
    }
  }
}
```

**Issues:**
- Comment explicitly says "In production, create enrollment first"
- Never creates enrollment record in database
- Just jumps directly to first lesson

---

### 20. Enrollment API Never Called from UI

**Location:** [src/app/api/enrollments/route.ts](src/app/api/enrollments/route.ts)

**Problem:**
- POST `/api/enrollments` endpoint is fully implemented
- Handles enrollment creation correctly
- Updates course student count
- But it's **never called** from any UI component

---

### 7. Home Page Featured Courses Lead to 404s

**Location:** [src/app/page.tsx:94-96](src/app/page.tsx#L94-L96)

**Problem:**
The home page displays "Popular Courses" with hardcoded course objects:

```typescript
const popularCourses = [
  {
    id: "1",
    title: "Complete Web Development Bootcamp",
    instructor: "Dr. Angela Yu",
    // ...
  },
  // ...
];
```

When clicked, these route to `/courses/1`, `/courses/2`, `/courses/3` which **don't exist**.

---

### 21. Dashboard "Continue" Buttons Route to Fake Courses

**Location:** [src/app/dashboard/page.tsx:130-132](src/app/dashboard/page.tsx#L130-L132)

**Problem:**
```typescript
<Link href={`/courses/${course.id}/learn`}>
  <Button className="w-full">Continue</Button>
</Link>
```

Routes to `/courses/1/learn`, `/courses/2/learn`, `/courses/3/learn` - all non-existent.

---

### 14. Course Routing Inconsistency

**Affected Pages:** Multiple

**Problem:**
Two different routing patterns exist simultaneously:

1. **Static routes:** `/courses/react`, `/courses/git`, `/courses/typescript`
2. **Dynamic routes:** `/courses/[id]`

Some courses use IDs, some use slugs.

---

## Tasks to Complete

### Phase 1: Implement Enrollment Flow
- [ ] Create enrollment modal/confirmation dialog
- [ ] Wire up "Enroll Now" buttons to call API
- [ ] Add enrollment success/error handling
- [ ] Update course student count after enrollment
- [ ] Add enrollment record to database
- [ ] Show enrollment confirmation to user
- [ ] Redirect to course content after enrollment

### Phase 2: Fix Course Data & Routing
- [ ] Replace hardcoded "Popular Courses" on home page with real courses from DB
- [ ] Decide on routing strategy: IDs vs slugs (recommend UUIDs)
- [ ] Update all course links to use consistent routing
- [ ] Add course slug field to database (if using slugs)
- [ ] Create redirect from old routes to new routes
- [ ] Test all course navigation paths

### Phase 3: Dashboard Integration
- [ ] Fetch real enrolled courses for "Continue Learning"
- [ ] Link to actual courses (not IDs 1, 2, 3)
- [ ] Add last accessed timestamp to enrollments
- [ ] Sort by most recently accessed
- [ ] Add "View All Courses" link

### Phase 4: Preview Functionality
- [ ] Implement course preview modal or page
- [ ] Allow viewing first lesson without enrollment
- [ ] Show course syllabus preview
- [ ] Add "Preview" button functionality

---

## Files to Modify

- [src/app/courses/git/page.tsx](src/app/courses/git/page.tsx) - Add enrollment handlers
- [src/app/courses/react/page.tsx](src/app/courses/react/page.tsx) - Add enrollment handlers
- [src/app/courses/typescript/page.tsx](src/app/courses/typescript/page.tsx) - Add enrollment handlers
- [src/app/courses/[id]/page.tsx](src/app/courses/[id]/page.tsx) - Complete enrollment flow
- [src/app/page.tsx](src/app/page.tsx) - Fetch real courses
- [src/app/dashboard/page.tsx](src/app/dashboard/page.tsx) - Fetch real enrollments
- [src/components/modals/EnrollmentModal.tsx](src/components/modals/EnrollmentModal.tsx) - CREATE NEW
- [src/hooks/useEnrollment.ts](src/hooks/useEnrollment.ts) - CREATE NEW
- [prisma/schema.prisma](prisma/schema.prisma) - Add lastAccessedAt field to Enrollment

---

## Testing Requirements

### Manual Testing:
- [ ] Click "Enroll Now" on different courses
- [ ] Verify enrollment appears on dashboard
- [ ] Test duplicate enrollment prevention
- [ ] Test "Continue Learning" links work
- [ ] Click featured courses on home page
- [ ] Verify course routing is consistent
- [ ] Test preview functionality (if implemented)
- [ ] Verify student count updates

### Automated Testing:
- [ ] Test enrollment API with valid user
- [ ] Test enrollment API with already-enrolled user
- [ ] Test course fetching from database
- [ ] Add E2E test: home → course → enroll → dashboard

---

## Success Criteria

- ✅ All "Enroll Now" buttons create actual enrollments
- ✅ Enrollments persist in database
- ✅ Dashboard shows real enrolled courses
- ✅ All course links route to existing courses
- ✅ Routing is consistent (either all IDs or all slugs)
- ✅ No hardcoded course IDs in UI
- ✅ Preview functionality works (or button removed)
- ✅ Student count updates when users enroll

---

## Database Changes Needed

```prisma
model Enrollment {
  // ... existing fields
  lastAccessedAt DateTime @default(now())
}
```

Run migration:
```bash
npx prisma migrate dev --name add-last-accessed
```
