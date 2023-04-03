/*
  Warnings:

  - You are about to drop the column `entryFileId` on the `Entry` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Entry" DROP CONSTRAINT "Entry_entryFileId_fkey";

-- AlterTable
ALTER TABLE "Entry" DROP COLUMN "entryFileId";
