-- Run this in Supabase SQL Editor
-- Adds only the missing columns/table — no enum creation

ALTER TABLE "Lead" ADD COLUMN IF NOT EXISTS "priority" "LeadPriority" NOT NULL DEFAULT 'MEDIUM';
ALTER TABLE "Lead" ADD COLUMN IF NOT EXISTS "budgetMin" DOUBLE PRECISION;
ALTER TABLE "Lead" ADD COLUMN IF NOT EXISTS "budgetMax" DOUBLE PRECISION;
ALTER TABLE "Lead" ADD COLUMN IF NOT EXISTS "locationPref" TEXT;
ALTER TABLE "Lead" ADD COLUMN IF NOT EXISTS "propertyType" TEXT;
ALTER TABLE "Lead" ADD COLUMN IF NOT EXISTS "bedrooms" INTEGER;
ALTER TABLE "Lead" ADD COLUMN IF NOT EXISTS "lastContactAt" TIMESTAMP(3);
ALTER TABLE "Lead" ADD COLUMN IF NOT EXISTS "tags" TEXT[] NOT NULL DEFAULT '{}';
ALTER TABLE "LeadActivity" ADD COLUMN IF NOT EXISTS "outcome" TEXT;
ALTER TABLE "LeadActivity" ADD COLUMN IF NOT EXISTS "metadata" JSONB;

CREATE TABLE IF NOT EXISTS "FollowUp" (
    "id"          TEXT NOT NULL,
    "leadId"      TEXT NOT NULL,
    "userId"      TEXT NOT NULL,
    "title"       TEXT NOT NULL,
    "description" TEXT,
    "dueAt"       TIMESTAMP(3) NOT NULL,
    "completedAt" TIMESTAMP(3),
    "status"      "FollowUpStatus" NOT NULL DEFAULT 'PENDING',
    "type"        "ActivityType" NOT NULL DEFAULT 'FOLLOW_UP',
    "outcome"     TEXT,
    "createdAt"   TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt"   TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "FollowUp_pkey" PRIMARY KEY ("id")
);

ALTER TABLE "FollowUp" ADD CONSTRAINT "FollowUp_leadId_fkey"
    FOREIGN KEY ("leadId") REFERENCES "Lead"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "FollowUp" ADD CONSTRAINT "FollowUp_userId_fkey"
    FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

CREATE INDEX IF NOT EXISTS "FollowUp_leadId_idx" ON "FollowUp"("leadId");
CREATE INDEX IF NOT EXISTS "FollowUp_userId_dueAt_idx" ON "FollowUp"("userId", "dueAt");
CREATE INDEX IF NOT EXISTS "FollowUp_status_dueAt_idx" ON "FollowUp"("status", "dueAt");

SELECT 'Columns added ✓' AS result;
