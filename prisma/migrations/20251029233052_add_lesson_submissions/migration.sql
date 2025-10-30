-- CreateTable
CREATE TABLE "LessonSubmission" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "lessonId" TEXT NOT NULL,
    "stepId" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "passed" BOOLEAN NOT NULL DEFAULT false,
    "testResults" TEXT,
    "attempts" INTEGER NOT NULL DEFAULT 1,
    "xpEarned" INTEGER NOT NULL DEFAULT 0,
    "language" TEXT NOT NULL,
    "submittedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "LessonSubmission_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE INDEX "LessonSubmission_userId_idx" ON "LessonSubmission"("userId");

-- CreateIndex
CREATE INDEX "LessonSubmission_lessonId_idx" ON "LessonSubmission"("lessonId");

-- CreateIndex
CREATE INDEX "LessonSubmission_stepId_idx" ON "LessonSubmission"("stepId");

-- CreateIndex
CREATE INDEX "LessonSubmission_passed_idx" ON "LessonSubmission"("passed");

-- CreateIndex
CREATE INDEX "LessonSubmission_submittedAt_idx" ON "LessonSubmission"("submittedAt");
