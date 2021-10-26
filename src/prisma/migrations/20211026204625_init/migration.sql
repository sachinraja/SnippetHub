-- CreateExtension
CREATE EXTENSION citext;

-- CreateEnum
CREATE TYPE "language" AS ENUM ('python', 'javascript', 'typescript', 'csharp', 'elixir', 'html', 'css', 'other');

-- CreateEnum
CREATE TYPE "user_type" AS ENUM ('user', 'admin');

-- CreateTable
CREATE TABLE "snippet" (
    "id" SERIAL NOT NULL,
    "name" CITEXT NOT NULL,
    "code" TEXT NOT NULL,
    "language" "language" NOT NULL DEFAULT E'other',
    "pack_id" INTEGER NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "snippet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pack" (
    "id" SERIAL NOT NULL,
    "name" CITEXT NOT NULL,
    "short_description" TEXT NOT NULL,
    "long_description" TEXT,
    "language" "language" NOT NULL DEFAULT E'other',
    "upvotes" INTEGER NOT NULL DEFAULT 0,
    "author_id" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "pack_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "username" CITEXT NOT NULL,
    "email" TEXT,
    "emailVerified" TIMESTAMP(3),
    "image" TEXT,
    "bio" TEXT,
    "type" "user_type" NOT NULL DEFAULT E'user',
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

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

    CONSTRAINT "account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_pack_upvote" (
    "user_id" TEXT NOT NULL,
    "pack_id" INTEGER NOT NULL,

    CONSTRAINT "user_pack_upvote_pkey" PRIMARY KEY ("user_id","pack_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "snippet_name_pack_id_key" ON "snippet"("name", "pack_id");

-- CreateIndex
CREATE UNIQUE INDEX "pack_name_author_id_key" ON "pack"("name", "author_id");

-- CreateIndex
CREATE UNIQUE INDEX "user_username_key" ON "user"("username");

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "account_provider_id_provider_account_id_key" ON "account"("provider_id", "provider_account_id");

-- AddForeignKey
ALTER TABLE "snippet" ADD CONSTRAINT "snippet_pack_id_fkey" FOREIGN KEY ("pack_id") REFERENCES "pack"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pack" ADD CONSTRAINT "pack_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "account" ADD CONSTRAINT "account_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_pack_upvote" ADD CONSTRAINT "user_pack_upvote_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_pack_upvote" ADD CONSTRAINT "user_pack_upvote_pack_id_fkey" FOREIGN KEY ("pack_id") REFERENCES "pack"("id") ON DELETE CASCADE ON UPDATE CASCADE;
