/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `testingData` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `name` to the `testingData` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "testingData" ADD COLUMN     "name" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "testingData_name_key" ON "testingData"("name");
