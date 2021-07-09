-- DropIndex
DROP INDEX "user_pack_upvote.user_id_pack_id_unique";

-- AlterTable
ALTER TABLE "user_pack_upvote" ADD PRIMARY KEY ("user_id", "pack_id");
