# AUDIT TASK 05: Medium Priority UX & Navigation

**Category:** FUNCTIONALITY
**Priority:** 🟠 MEDIUM
**Estimated Effort:** 8-12 hours
**Dependencies:** None (can work in parallel with other tasks)

---

## Issues to Fix

### 5. Course Filter Buttons Do Nothing

**Location:** [src/app/courses/page.tsx:28-35](src/app/courses/page.tsx#L28-L35)

**Problem:**
```typescript
<Button variant="outline" size="sm">All Categories</Button>
<Button variant="ghost" size="sm">Web Development</Button>
<Button variant="ghost" size="sm">Data Science</Button>
<Button variant="ghost" size="sm">Design</Button>
<Button variant="ghost" size="sm">Business</Button>
<Button variant="ghost" size="sm">Marketing</Button>
```

**Issues:**
- No `onClick` handlers
- No filtering logic
- No state management
- Just decorative buttons

**User Impact:** Users cannot filter courses by category.

---

### 17. No Global Navigation Bar

**Affected:** All pages

**Problem:**
- No consistent header/navigation bar across pages
- No way to get from course pages back to home easily
- Only some pages have "back" buttons
- No user profile link
- No dashboard link from course pages

**User Impact:** Poor navigation UX. Users get stuck on pages with no clear way to navigate.

---

### 15. Leaderboard Component Exists But Is Hidden

**Locations:**
- Component: [src/components/gamification/Leaderboard.tsx](src/components/gamification/Leaderboard.tsx)
- API: [src/app/api/leaderboard/route.ts](src/app/api/leaderboard/route.ts)

**Problem:**
- Leaderboard component is fully built and styled
- API endpoint exists and returns data correctly
- But it's not displayed anywhere in the application
- Not linked in any navigation

**User Impact:** A complete gamification feature is invisible to users.

---

### 16. BadgeShowcase Component Built But Never Used

**Location:** [src/components/gamification/BadgeShowcase.tsx](src/components/gamification/BadgeShowcase.tsx)

**Problem:**
- Component is fully implemented
- Never imported or rendered anywhere
- No page displays user badges

**User Impact:** Users earn badges but can't see them.

---

### 18. Course Progress API Endpoint Underutilized

**Location:** [src/app/api/progress/course/[courseId]/route.ts](src/app/api/progress/course/[courseId]/route.ts)

**Problem:**
- Well-designed API endpoint exists
- Returns comprehensive progress data
- Only called in one place
- Dashboard doesn't use it
- Course pages don't use it consistently

---

## Tasks to Complete

### Phase 1: Implement Course Filtering
- [ ] Add state management for selected category
- [ ] Add onClick handlers to filter buttons
- [ ] Implement filter logic
- [ ] Update UI to show active filter
- [ ] Add "Clear filters" option
- [ ] Consider adding search functionality
- [ ] Add course tags/categories to database

### Phase 2: Create Global Navigation
- [ ] Design navigation bar component
- [ ] Add logo and home link
- [ ] Add course catalog link
- [ ] Add dashboard link
- [ ] Add user profile dropdown
- [ ] Add sign in/out button
- [ ] Make responsive for mobile
- [ ] Add to all pages via layout

### Phase 3: Add Leaderboard Page
- [ ] Create `/leaderboard` page
- [ ] Import and use Leaderboard component
- [ ] Add link in navigation
- [ ] Add filters (global, course-specific, friends)
- [ ] Show user's position
- [ ] Add refresh functionality
- [ ] Make it engaging and motivating

### Phase 4: Add Badge Showcase
- [ ] Create user profile page
- [ ] Add BadgeShowcase component to profile
- [ ] Show earned and locked badges
- [ ] Add badge descriptions
- [ ] Add share functionality
- [ ] Link from navigation

### Phase 5: Utilize Progress API Better
- [ ] Call progress API from dashboard
- [ ] Show course progress on course cards
- [ ] Add progress indicators throughout app
- [ ] Cache progress data appropriately
- [ ] Add real-time progress updates

---

## Files to Modify

### Navigation
- [src/components/layout/Navbar.tsx](src/components/layout/Navbar.tsx) - CREATE NEW
- [src/app/layout.tsx](src/app/layout.tsx) - Add Navbar
- [src/components/layout/UserMenu.tsx](src/components/layout/UserMenu.tsx) - CREATE NEW

### Course Filtering
- [src/app/courses/page.tsx](src/app/courses/page.tsx) - Add filter logic
- [src/hooks/useCourseFilter.ts](src/hooks/useCourseFilter.ts) - CREATE NEW
- [prisma/schema.prisma](prisma/schema.prisma) - Add categories

### Leaderboard
- [src/app/leaderboard/page.tsx](src/app/leaderboard/page.tsx) - CREATE NEW
- [src/components/gamification/Leaderboard.tsx](src/components/gamification/Leaderboard.tsx) - Use existing

### Profile/Badges
- [src/app/profile/page.tsx](src/app/profile/page.tsx) - CREATE NEW
- [src/components/gamification/BadgeShowcase.tsx](src/components/gamification/BadgeShowcase.tsx) - Use existing
- [src/components/profile/UserStats.tsx](src/components/profile/UserStats.tsx) - CREATE NEW

### Progress Integration
- [src/app/dashboard/page.tsx](src/app/dashboard/page.tsx) - Use progress API
- [src/components/course/CourseCard.tsx](src/components/course/CourseCard.tsx) - Show progress

---

## Testing Requirements

### Manual Testing - Navigation:
- [ ] Navigation appears on all pages
- [ ] All nav links work correctly
- [ ] User menu works (logged in and out)
- [ ] Mobile menu works
- [ ] Active page is highlighted
- [ ] Logo links to home

### Manual Testing - Filtering:
- [ ] Click filter buttons
- [ ] Courses filter correctly
- [ ] Active filter is highlighted
- [ ] Clear filters works
- [ ] Multiple filters work (if implemented)

### Manual Testing - Leaderboard:
- [ ] Leaderboard page loads
- [ ] Shows top users
- [ ] Shows current user position
- [ ] Filters work (if added)
- [ ] Updates when user completes work

### Manual Testing - Badges:
- [ ] Profile page loads
- [ ] Earned badges are shown
- [ ] Locked badges are shown
- [ ] Badge descriptions display
- [ ] Progress toward badges shown

### Automated Testing:
- [ ] Test filter logic with various inputs
- [ ] Test navigation links
- [ ] Test leaderboard data fetching
- [ ] Test badge display logic

---

## Success Criteria

- ✅ Global navigation appears on all pages
- ✅ Users can easily navigate between sections
- ✅ Course filtering works and is intuitive
- ✅ Leaderboard is visible and engaging
- ✅ Badge showcase displays user achievements
- ✅ Progress is shown consistently across app
- ✅ Mobile navigation works well

---

## Design Considerations

### Navigation Bar:
```
[Logo] [Courses] [Leaderboard] [Dashboard] ... [Search] [Profile ▼] [Notifications]
```

### Course Filters:
- Use pills/tabs for categories
- Show active state clearly
- Consider collapsible filters on mobile
- Add course count per category

### Leaderboard Design:
- Top 3 should stand out (podium)
- Current user always visible
- Show rank change (↑↓)
- Add time period filters (daily, weekly, all-time)

### Badge Showcase:
- Grid layout
- Locked badges are grayed out
- Click for details
- Progress bar for in-progress badges
- Celebrate rare badges
