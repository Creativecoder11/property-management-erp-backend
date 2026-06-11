-- ============================================================
-- BuildEstate CRM v2 Migration
-- Run in Supabase SQL Editor — safe incremental update
-- ============================================================

-- 1. New enums
DO $$ BEGIN
  CREATE TYPE "LeadPriority" AS ENUM ('LOW', 'MEDIUM', 'HIGH', 'HOT');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE "FollowUpStatus" AS ENUM ('PENDING', 'COMPLETED', 'OVERDUE', 'SNOOZED', 'CANCELLED');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

-- 2. Add new values to existing enums (safe — PostgreSQL allows adding)
DO $$ BEGIN ALTER TYPE "LeadSource" ADD VALUE IF NOT EXISTS 'INSTAGRAM'; EXCEPTION WHEN others THEN NULL; END $$;
DO $$ BEGIN ALTER TYPE "LeadSource" ADD VALUE IF NOT EXISTS 'NEWSPAPER'; EXCEPTION WHEN others THEN NULL; END $$;
DO $$ BEGIN ALTER TYPE "LeadSource" ADD VALUE IF NOT EXISTS 'BILLBOARD'; EXCEPTION WHEN others THEN NULL; END $$;
DO $$ BEGIN ALTER TYPE "ActivityType" ADD VALUE IF NOT EXISTS 'STATUS_CHANGE'; EXCEPTION WHEN others THEN NULL; END $$;
DO $$ BEGIN ALTER TYPE "ActivityType" ADD VALUE IF NOT EXISTS 'ASSIGNMENT'; EXCEPTION WHEN others THEN NULL; END $$;
DO $$ BEGIN ALTER TYPE "ActivityType" ADD VALUE IF NOT EXISTS 'TASK'; EXCEPTION WHEN others THEN NULL; END $$;

-- 3. Replace LeadStage enum (add new values, migrate data, remove old values)
DO $$ BEGIN ALTER TYPE "LeadStage" ADD VALUE IF NOT EXISTS 'QUALIFIED'; EXCEPTION WHEN others THEN NULL; END $$;
DO $$ BEGIN ALTER TYPE "LeadStage" ADD VALUE IF NOT EXISTS 'SITE_VISIT_SCHEDULED'; EXCEPTION WHEN others THEN NULL; END $$;
DO $$ BEGIN ALTER TYPE "LeadStage" ADD VALUE IF NOT EXISTS 'SITE_VISIT_DONE'; EXCEPTION WHEN others THEN NULL; END $$;
DO $$ BEGIN ALTER TYPE "LeadStage" ADD VALUE IF NOT EXISTS 'BOOKING_PENDING'; EXCEPTION WHEN others THEN NULL; END $$;
DO $$ BEGIN ALTER TYPE "LeadStage" ADD VALUE IF NOT EXISTS 'WON'; EXCEPTION WHEN others THEN NULL; END $$;
DO $$ BEGIN ALTER TYPE "LeadStage" ADD VALUE IF NOT EXISTS 'HOLD'; EXCEPTION WHEN others THEN NULL; END $$;

-- Migrate old stage values to new ones
UPDATE "Lead" SET stage = 'QUALIFIED' WHERE stage = 'INTERESTED';
UPDATE "Lead" SET stage = 'SITE_VISIT_SCHEDULED' WHERE stage = 'SITE_VISIT';
UPDATE "Lead" SET stage = 'WON' WHERE stage = 'BOOKED';

-- 4. Add new columns to Lead (safe — using IF NOT EXISTS pattern)
DO $$ BEGIN
  ALTER TABLE "Lead" ADD COLUMN "priority" "LeadPriority" NOT NULL DEFAULT 'MEDIUM';
EXCEPTION WHEN duplicate_column THEN NULL; END $$;

DO $$ BEGIN ALTER TABLE "Lead" ADD COLUMN "budgetMin" DOUBLE PRECISION; EXCEPTION WHEN duplicate_column THEN NULL; END $$;
DO $$ BEGIN ALTER TABLE "Lead" ADD COLUMN "budgetMax" DOUBLE PRECISION; EXCEPTION WHEN duplicate_column THEN NULL; END $$;
DO $$ BEGIN ALTER TABLE "Lead" ADD COLUMN "locationPref" TEXT; EXCEPTION WHEN duplicate_column THEN NULL; END $$;
DO $$ BEGIN ALTER TABLE "Lead" ADD COLUMN "propertyType" TEXT; EXCEPTION WHEN duplicate_column THEN NULL; END $$;
DO $$ BEGIN ALTER TABLE "Lead" ADD COLUMN "bedrooms" INTEGER; EXCEPTION WHEN duplicate_column THEN NULL; END $$;
DO $$ BEGIN ALTER TABLE "Lead" ADD COLUMN "lastContactAt" TIMESTAMP(3); EXCEPTION WHEN duplicate_column THEN NULL; END $$;
DO $$ BEGIN ALTER TABLE "Lead" ADD COLUMN "tags" TEXT[] NOT NULL DEFAULT '{}'; EXCEPTION WHEN duplicate_column THEN NULL; END $$;

-- 5. Add new columns to LeadActivity
DO $$ BEGIN ALTER TABLE "LeadActivity" ADD COLUMN "outcome" TEXT; EXCEPTION WHEN duplicate_column THEN NULL; END $$;
DO $$ BEGIN ALTER TABLE "LeadActivity" ADD COLUMN "metadata" JSONB; EXCEPTION WHEN duplicate_column THEN NULL; END $$;

-- 6. Create FollowUp table
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

-- 7. Add foreign keys for FollowUp (safe)
DO $$ BEGIN
  ALTER TABLE "FollowUp" ADD CONSTRAINT "FollowUp_leadId_fkey"
    FOREIGN KEY ("leadId") REFERENCES "Lead"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  ALTER TABLE "FollowUp" ADD CONSTRAINT "FollowUp_userId_fkey"
    FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

-- 8. Indexes
CREATE INDEX IF NOT EXISTS "Lead_companyId_stage_idx" ON "Lead"("companyId", "stage");
CREATE INDEX IF NOT EXISTS "Lead_companyId_assignedToId_idx" ON "Lead"("companyId", "assignedToId");
CREATE INDEX IF NOT EXISTS "FollowUp_leadId_idx" ON "FollowUp"("leadId");
CREATE INDEX IF NOT EXISTS "FollowUp_userId_dueAt_idx" ON "FollowUp"("userId", "dueAt");
CREATE INDEX IF NOT EXISTS "FollowUp_status_dueAt_idx" ON "FollowUp"("status", "dueAt");

SELECT 'Migration complete ✓' as result;
