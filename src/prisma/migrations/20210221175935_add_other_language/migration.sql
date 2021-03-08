-- AlterEnum
BEGIN;
ALTER TYPE "enum_Snippet_language" ADD VALUE 'other';
COMMIT;
BEGIN;
-- AlterTable
ALTER TABLE "Snippet" ALTER COLUMN "language" SET DEFAULT E'other';
COMMIT;