/*
  Warnings:

  - You are about to drop the column `accessToken` on the `User` table. All the data in the column will be lost.
  - The migration will add a unique constraint covering the columns `[gitHubId]` on the table `User`. If there are existing duplicate values, the migration will fail.
  - Added the required column `gitHubId` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "User.accessToken_unique";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "accessToken",
ADD COLUMN     "gitHubId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "User.gitHubId_unique" ON "User"("gitHubId");
