/*
  Warnings:

  - Made the column `language` on table `Snippet` required. The migration will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Snippet" ALTER COLUMN "language" SET NOT NULL;
