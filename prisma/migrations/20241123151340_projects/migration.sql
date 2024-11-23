/*
  Warnings:

  - You are about to drop the column `projectId` on the `User` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_projectId_fkey";

-- DropIndex
DROP INDEX "User_projectId_idx";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "projectId";

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
