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

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pack" (
    "id" SERIAL NOT NULL,
    "name" CITEXT NOT NULL,
    "description" TEXT NOT NULL,
    "language" "language" NOT NULL DEFAULT E'other',
    "upvotes" INTEGER NOT NULL DEFAULT 0,
    "author_id" INTEGER NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "github_id" INTEGER NOT NULL,
    "username" CITEXT NOT NULL,
    "bio" TEXT,
    "type" "user_type" NOT NULL DEFAULT E'user',
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "snippet.name_pack_id_unique" ON "snippet"("name", "pack_id");

-- CreateIndex
CREATE UNIQUE INDEX "pack.name_author_id_unique" ON "pack"("name", "author_id");

-- CreateIndex
CREATE UNIQUE INDEX "user.github_id_unique" ON "user"("github_id");

-- CreateIndex
CREATE UNIQUE INDEX "user.username_unique" ON "user"("username");

-- AddForeignKey
ALTER TABLE "snippet" ADD FOREIGN KEY ("pack_id") REFERENCES "pack"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pack" ADD FOREIGN KEY ("author_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
