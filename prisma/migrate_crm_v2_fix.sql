-- ============================================================
-- BuildEstate CRM v2 Fix — Run in Supabase SQL Editor
-- ============================================================

-- Step 1: Create new enum types
CREATE TYPE "LeadPriority" AS ENUM ('LOW', 'MEDIUM', 'HIGH', 'HOT');
CREATE TYPE "FollowUpStatus" AS ENUM ('PENDING', 'COMPLETED', 'OVERDUE', 'SNOOZED', 'CANCELLED');

-- Step 2: Add new LeadSource values
ALTER TYPE "LeadSource" ADD VALUE IF NOT EXISTS 'INSTAGRAM';
ALTER TYPE "LeadSource" ADD VALUE IF NOT EXISTS 'NEWSPAPER';
ALTER TYPE "LeadSource" ADD VALUE IF NOT EXISTS 'BILLBOARD';

-- Step 3: Add new ActivityType values
ALTER TYPE "ActivityType" ADD VALUE IF NOT EXISTS 'STATUS_CHANGE';
ALTER TYPE "ActivityType" ADD VALUE IF NOT EXISTS 'ASSIGNMENT';
ALTER TYPE "ActivityType" ADD VALUE IF NOT EXISTS 'TASK';

-- Step 4: Add new LeadStage values
ALTER TYPE "LeadStage" ADD VALUE IF NOT EXISTS 'QUALIFIED';
ALTER TYPE "LeadStage" ADD VALUE IF NOT EXISTS 'SITE_VISIT_SCHEDULED';
ALTER TYPE "LeadStage" ADD VALUE IF NOT EXISTS 'SITE_VISIT_DONE';
ALTER TYPE "LeadStage" ADD VALUE IF NOT EXISTS 'BOOKING_PENDING';
ALTER TYPE "LeadStage" ADD VALUE IF NOT EXISTS 'WON';
ALTER TYPE "LeadStage" ADD VALUE IF NOT EXISTS 'HOLD';

-- Step 5: Migrate old stage values
UPDATE "Lead" SET stage = 'QUALIFIED' WHERE stage = 'INTERESTED';
UPDATE "Lead" SET stage = 'SITE_VISIT_SCHEDULED' WHERE stage = 'SITE_VISIT';
UPDATE "Lead" SET stage = 'WON' WHERE stage = 'BOOKED';

-- Step 6: Add new columns to Lead table
ALTER TABLE "Lead" ADD COLUMN IF NOT EXISTS "priority" "LeadPriority" NOT NULL DEFAULT 'MEDIUM';
ALTER TABLE "Lead" ADD COLUMN IF NOT EXISTS "budgetMin" DOUBLE PRECISION;
ALTER TABLE "Lead" ADD COLUMN IF NOT EXISTS "budgetMax" DOUBLE PRECISION;
ALTER TABLE "Lead" ADD COLUMN IF NOT EXISTS "locationPref" TEXT;
ALTER TABLE "Lead" ADD COLUMN IF NOT EXISTS "propertyType" TEXT;
ALTER TABLE "Lead" ADD COLUMN IF NOT EXISTS "bedrooms" INTEGER;
ALTER TABLE "Lead" ADD COLUMN IF NOT EXISTS "lastContactAt" TIMESTAMP(3);
ALTER TABLE "Lead" ADD COLUMN IF NOT EXISTS "tags" TEXT[] NOT NULL DEFAULT '{}';

-- Step 7: Add new columns to LeadActivity table
ALTER TABLE "LeadActivity" ADD COLUMN IF NOT EXISTS "outcome" TEXT;
ALTER TABLE "LeadActivity" ADD COLUMN IF NOT EXISTS "metadata" JSONB;

-- Step 8: Create FollowUp table
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

-- Step 9: Foreign keys for FollowUp
ALTER TABLE "FollowUp" ADD CONSTRAINT "FollowUp_leadId_fkey"
    FOREIGN KEY ("leadId") REFERENCES "Lead"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "FollowUp" ADD CONSTRAINT "FollowUp_userId_fkey"
    FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- Step 10: Indexes
CREATE INDEX IF NOT EXISTS "Lead_companyId_stage_idx" ON "Lead"("companyId", "stage");
CREATE INDEX IF NOT EXISTS "Lead_companyId_assignedToId_idx" ON "Lead"("companyId", "assignedToId");
CREATE INDEX IF NOT EXISTS "FollowUp_leadId_idx" ON "FollowUp"("leadId");
CREATE INDEX IF NOT EXISTS "FollowUp_userId_dueAt_idx" ON "FollowUp"("userId", "dueAt");
CREATE INDEX IF NOT EXISTS "FollowUp_status_dueAt_idx" ON "FollowUp"("status", "dueAt");

SELECT 'Migration v2 complete ✓' AS result;
