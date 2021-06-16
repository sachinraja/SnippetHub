/*
  Warnings:

  - The primary key for the `user` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `github_id` on the `user` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email]` on the table `user` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "pack" DROP CONSTRAINT "pack_author_id_fkey";

-- DropIndex
DROP INDEX "user.github_id_unique";

-- AlterTable
ALTER TABLE "pack" ALTER COLUMN "author_id" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "user" DROP CONSTRAINT "user_pkey",
DROP COLUMN "github_id",
ADD COLUMN     "email" TEXT,
ADD COLUMN     "emailVerified" TIMESTAMP(3),
ADD COLUMN     "image" TEXT,
ADD COLUMN     "name" TEXT,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "username" SET DATA TYPE TEXT,
ADD PRIMARY KEY ("id");
DROP SEQUENCE "user_id_seq";

-- CreateTable
CREATE TABLE "account" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "provider_type" TEXT NOT NULL,
    "provider_id" TEXT NOT NULL,
    "provider_account_id" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "access_token_expires" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "session" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,
    "session_token" TEXT NOT NULL,
    "access_token" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "verification_request" (
    "id" TEXT NOT NULL,
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user.email_unique" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "account.provider_id_provider_account_id_unique" ON "account"("provider_id", "provider_account_id");

-- CreateIndex
CREATE UNIQUE INDEX "session.session_token_unique" ON "session"("session_token");

-- CreateIndex
CREATE UNIQUE INDEX "session.access_token_unique" ON "session"("access_token");

-- CreateIndex
CREATE UNIQUE INDEX "verification_request.token_unique" ON "verification_request"("token");

-- CreateIndex
CREATE UNIQUE INDEX "verification_request.identifier_token_unique" ON "verification_request"("identifier", "token");

-- AddForeignKey
ALTER TABLE "pack" ADD FOREIGN KEY ("author_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "account" ADD FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "session" ADD FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
