# AUDIT TASK 01: Critical Authentication Issues

**Category:** FUNCTIONALITY
**Priority:** 🔴 CRITICAL
**Estimated Effort:** 8-12 hours
**Dependencies:** None - can start immediately

---

## Issues to Fix

### 1. Authentication System - Completely Non-Functional

**Location:** [src/stores/authStore.ts:25-47](src/stores/authStore.ts#L25-L47)

**Problem:**
```typescript
login: async (email) => {
  set({ isLoading: true });
  try {
    // TODO: Implement actual auth logic
    // This is a mock implementation
    const mockUser: User = {
      id: "be3d97ac-e48a-4c37-8c2b-5cff1710d785", // Demo User UUID
      email: "demo@example.com",
      displayName: "Demo User",
      role: "student",
      createdAt: new Date().toISOString(),
    };
    // ...
  }
}
```

**Issues:**
- Login function **ignores password parameter entirely**
- Signup function **ignores email, password, and displayName parameters**
- Both always return the same hardcoded "Demo User"
- No validation of credentials
- No actual database lookup
- No password hashing or security

**User Impact:** Anyone can "log in" with any credentials, completely defeating the authentication system.

---

### 4. Missing Page: Forgot Password

**Location:** [src/app/auth/login/page.tsx:70-75](src/app/auth/login/page.tsx#L70-L75)

**Problem:**
```typescript
<Link
  href="/auth/forgot-password"
  className="text-sm text-primary hover:underline"
>
  Forgot password?
</Link>
```

The login page links to `/auth/forgot-password` but this page **does not exist** in the application.

**User Impact:** 404 error when clicking "Forgot password?"

---

## Tasks to Complete

- [ ] Implement real authentication system (NextAuth.js or Clerk recommended)
- [ ] Add password hashing with bcrypt
- [ ] Implement proper credential validation
- [ ] Add database user lookup
- [ ] Implement JWT or session-based auth
- [ ] Create `/auth/forgot-password` page OR remove the link
- [ ] Add email verification flow
- [ ] Update login/signup pages to use real auth
- [ ] Add proper error handling for auth failures
- [ ] Add security middleware to protect routes

---

## Testing Requirements

### Manual Testing:
- [ ] Try logging in with valid credentials
- [ ] Try logging in with invalid credentials
- [ ] Try signing up with new email
- [ ] Try signing up with existing email
- [ ] Test forgot password flow (if implemented)
- [ ] Verify password hashing in database
- [ ] Test session persistence across page refreshes
- [ ] Test logout functionality

### Automated Testing:
- [ ] Add unit tests for auth functions
- [ ] Add integration tests for auth flow
- [ ] Test API endpoints with invalid tokens
- [ ] Test protected routes without authentication

---

## Success Criteria

- ✅ Users can only log in with valid credentials
- ✅ Passwords are hashed and never stored in plaintext
- ✅ Invalid credentials show appropriate error messages
- ✅ Sessions persist correctly
- ✅ Protected routes redirect unauthenticated users
- ✅ No hardcoded user credentials remain in code
- ✅ Forgot password link either works or is removed

---

## Recommended Approach

### Option 1: NextAuth.js (Recommended)
```bash
npm install next-auth @prisma/client bcrypt
```
- Integrate with existing Prisma schema
- Add credentials provider
- Configure session strategy
- Add forgot password flow

### Option 2: Clerk
```bash
npm install @clerk/nextjs
```
- Faster setup
- Built-in UI components
- Managed service (less code to maintain)

---

## Files to Modify

- [src/stores/authStore.ts](src/stores/authStore.ts) - Complete rewrite of auth logic
- [src/app/auth/login/page.tsx](src/app/auth/login/page.tsx) - Wire up real auth
- [src/app/auth/signup/page.tsx](src/app/auth/signup/page.tsx) - Wire up real auth
- [src/app/api/auth/](src/app/api/auth/) - Create auth API routes (if using NextAuth)
- [src/app/auth/forgot-password/page.tsx](src/app/auth/forgot-password/page.tsx) - CREATE NEW
- [src/middleware.ts](src/middleware.ts) - Add route protection (may need to create)

---

## Security Considerations

- Use environment variables for secrets
- Implement rate limiting on auth endpoints
- Add CSRF protection
- Use secure session cookies (httpOnly, secure, sameSite)
- Implement account lockout after failed attempts
- Add audit logging for security events
