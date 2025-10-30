# Testing Answer Submission Tracking

## ✅ Changes Made

### 1. **API Endpoint Fixed**
- Now handles both authenticated and anonymous users
- Auto-creates "Anonymous User" if no user is logged in
- Stores all submissions regardless of auth status

### 2. **Component Updated**
- Uses auth store to get user ID
- Falls back to 'anonymous' if not logged in
- Added console logging for debugging
- Shows detailed error messages

### 3. **Key Features**
- ✅ Works for logged-in users
- ✅ Works for anonymous users
- ✅ Tracks all submissions automatically
- ✅ No action required from students

---

## 🧪 How to Test

### Step 1: Start the Application

```bash
# Make sure dev server is running
npm run dev
```

### Step 2: Navigate to an Interactive Lesson

**React Lesson:**
- Go to: http://localhost:3000/lessons/react-basics-01

**TypeScript Lesson:**
- Go to: http://localhost:3000/lessons/ts-basics-01

### Step 3: Submit an Answer

1. **Write some code** in the editor
2. **Click "Run Tests"**
3. **Check browser console** (F12 → Console tab)

You should see:
```
Submitting answer: { userId: "anonymous", lessonId: "react-basics-01", ... }
Submission response: { success: true, data: { submissionId: "...", ... } }
Submission saved successfully! { submissionId: "...", attempts: 1, passed: true }
```

### Step 4: Verify in Database

**Option A: Using SQL**
```bash
sqlite3 prisma/dev.db "SELECT * FROM LessonSubmission ORDER BY submittedAt DESC LIMIT 5;"
```

**Option B: Using Prisma Studio**
- Already running at: http://localhost:5555
- Navigate to `LessonSubmission` table
- You should see your new submission

**Option C: Using Admin Dashboard**
- Go to: http://localhost:3000/admin/submissions
- You should see your submission listed

---

## 📝 Test Scenarios

### Scenario 1: Anonymous User (Not Logged In)

**Steps:**
1. Make sure you're NOT logged in
2. Go to any interactive lesson
3. Write code and click "Run Tests"
4. Check database

**Expected Result:**
- Submission saved under "Anonymous User" (anonymous@example.com)
- userId = "anonymous-user"
- Full code captured
- Test results saved

### Scenario 2: Logged-In User

**Steps:**
1. Log in with a test account
2. Go to any interactive lesson
3. Write code and click "Run Tests"
4. Check database

**Expected Result:**
- Submission saved under your actual user account
- userId = your actual user ID
- XP credited to your account (if passed)
- Full code captured

### Scenario 3: Multiple Attempts

**Steps:**
1. Submit wrong answer (fail tests)
2. Fix code and submit again (pass tests)
3. Check database

**Expected Result:**
- 2 submissions recorded
- First: passed = false, attempts = 1
- Second: passed = true, attempts = 2

### Scenario 4: Different Lessons

**Steps:**
1. Submit answer to react-basics-01
2. Submit answer to ts-basics-01
3. Check database

**Expected Result:**
- 2 separate submissions
- Different lessonIds
- Both tracked correctly

---

## 🔍 Debugging

### If Submissions Don't Appear

**Check 1: Console Logs**
```
Open browser console (F12)
Look for:
- "Submitting answer: ..."
- "Submission response: ..."
- Any error messages
```

**Check 2: API Endpoint**
```bash
# Test API directly
curl -X POST http://localhost:3000/api/lessons/submit \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "anonymous",
    "lessonId": "test-lesson",
    "stepId": "test-step",
    "code": "console.log(\"test\");",
    "passed": true,
    "language": "javascript"
  }'
```

**Check 3: Database**
```bash
# Check if anonymous user was created
sqlite3 prisma/dev.db "SELECT * FROM User WHERE email = 'anonymous@example.com';"

# Check submissions table exists
sqlite3 prisma/dev.db ".schema LessonSubmission"

# Count submissions
sqlite3 prisma/dev.db "SELECT COUNT(*) FROM LessonSubmission;"
```

**Check 4: Network Tab**
```
1. Open browser DevTools (F12)
2. Go to Network tab
3. Click "Run Tests"
4. Look for POST to /api/lessons/submit
5. Check request payload and response
```

### Common Issues

**Issue: "User not found" error**
- **Fix:** Updated API to create anonymous user automatically

**Issue: userId is null**
- **Fix:** Component now uses auth store and falls back to 'anonymous'

**Issue: No console logs**
- **Cause:** Dev server not running or wrong URL
- **Fix:** Restart dev server with `npm run dev`

**Issue: Submission not in database**
- **Check:** Run `npx prisma studio` and browse LessonSubmission table
- **Check:** Make sure migration ran: `npx prisma migrate dev`

---

## 📊 Verify Submissions

### Quick Check Script

```bash
#!/bin/bash
# Save as check-submissions.sh

echo "=== SUBMISSION COUNT ==="
sqlite3 prisma/dev.db "SELECT COUNT(*) as total FROM LessonSubmission;"

echo ""
echo "=== LATEST 5 SUBMISSIONS ==="
sqlite3 prisma/dev.db << 'EOF'
.mode table
.headers on
SELECT
  id,
  userId,
  lessonId,
  CASE WHEN passed = 1 THEN '✅' ELSE '❌' END as status,
  datetime(submittedAt, 'localtime') as submitted
FROM LessonSubmission
ORDER BY submittedAt DESC
LIMIT 5;
EOF

echo ""
echo "=== BY USER ==="
sqlite3 prisma/dev.db << 'EOF'
SELECT
  u.name,
  u.email,
  COUNT(*) as submissions
FROM LessonSubmission ls
JOIN User u ON ls.userId = u.id
GROUP BY ls.userId;
EOF
```

**Run it:**
```bash
chmod +x check-submissions.sh
./check-submissions.sh
```

---

## ✅ Success Indicators

You'll know it's working when:

1. **Console logs show:**
   ```
   Submitting answer: { userId: "...", ... }
   Submission saved successfully!
   ```

2. **Database shows:**
   - New row in `LessonSubmission` table
   - Correct userId, lessonId, stepId
   - Full code captured
   - Timestamp is recent

3. **Admin dashboard shows:**
   - New submission appears in list
   - Can filter and view it
   - Code is displayed correctly

4. **Prisma Studio shows:**
   - LessonSubmission table has new entries
   - All fields populated correctly

---

## 🎯 Test Cases

### Test Case 1: First Submission
- **Input:** Submit correct answer to react-basics-01
- **Expected:**
  - passed = true
  - attempts = 1
  - xpEarned = 50
  - code saved correctly

### Test Case 2: Failed Then Success
- **Input:**
  1. Submit wrong answer
  2. Submit correct answer
- **Expected:**
  - First: passed = false, attempts = 1
  - Second: passed = true, attempts = 2

### Test Case 3: Multiple Lessons
- **Input:** Submit to 3 different lessons
- **Expected:** 3 separate entries with different lessonIds

### Test Case 4: Anonymous User
- **Input:** Submit without logging in
- **Expected:** userId = "anonymous-user", submission saved

### Test Case 5: Logged In User
- **Input:** Log in, then submit
- **Expected:** userId = actual user ID, XP credited

---

## 🐛 Known Issues

### Issue: Submissions Not Counting Attempts Correctly
- **Status:** Fixed - Now checks previous submissions per user/lesson/step

### Issue: Anonymous User XP Not Tracked
- **Status:** Expected behavior - Anonymous users don't get XP
- **Reason:** XP should only go to real accounts

---

## 📈 What to Look For

After testing, check:

1. **All submissions saved?** ✅
2. **Code captured correctly?** ✅
3. **Test results stored?** ✅
4. **Attempts counted right?** ✅
5. **Works for anonymous users?** ✅
6. **Works for logged-in users?** ✅
7. **Console logs clear?** ✅
8. **No errors in terminal?** ✅

---

## 🎉 Success!

If all tests pass, the submission tracking system is fully operational!

**Next Steps:**
1. Test with real students
2. Monitor admin dashboard
3. Analyze submission data
4. Identify difficult lessons
5. Review common mistakes

---

*Last Updated: 2025-10-29*
*Status: Ready for Testing*
