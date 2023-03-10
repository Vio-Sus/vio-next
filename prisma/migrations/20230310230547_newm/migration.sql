/*
  Warnings:

  - Made the column `name` on table `testingData` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX "testingData_name_key";

-- AlterTable
ALTER TABLE "testingData" ALTER COLUMN "name" SET NOT NULL;
