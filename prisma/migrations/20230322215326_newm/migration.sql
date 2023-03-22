/*
  Warnings:

  - The primary key for the `testingData` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "testingData" DROP CONSTRAINT "testingData_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "testingData_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "testingData_id_seq";
