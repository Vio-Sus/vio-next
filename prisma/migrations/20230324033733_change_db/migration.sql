/*
  Warnings:

  - You are about to drop the column `company_collaboration_id` on the `Entry` table. All the data in the column will be lost.
  - Added the required column `company_id` to the `Entry` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Entry" DROP CONSTRAINT "Entry_company_collaboration_id_fkey";

-- AlterTable
ALTER TABLE "Entry" DROP COLUMN "company_collaboration_id",
ADD COLUMN     "company_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Entry" ADD CONSTRAINT "Entry_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
