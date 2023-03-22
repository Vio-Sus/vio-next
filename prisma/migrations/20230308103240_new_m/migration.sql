-- CreateTable
CREATE TABLE "testingData" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "creationTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "jsonArray" JSONB,

    CONSTRAINT "testingData_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "testingData_name_key" ON "testingData"("name");
