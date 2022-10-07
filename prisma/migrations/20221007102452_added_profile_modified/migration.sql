/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `bookmarks` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMALE', 'OTHER');

-- AlterTable
ALTER TABLE "bookmarks" ALTER COLUMN "published" SET DEFAULT false;

-- AlterTable
ALTER TABLE "profiles" ADD COLUMN     "avatar" TEXT,
ADD COLUMN     "gender" "Gender",
ALTER COLUMN "bio" DROP NOT NULL,
ALTER COLUMN "dob" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "bookmarks_userId_key" ON "bookmarks"("userId");
