-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ROOT', 'ADMIN', 'USER', 'TEMP_');

-- CreateEnum
CREATE TYPE "WasteType" AS ENUM ('GENERAL_GARBAGE', 'FOODWASTE', 'GREENWASTE', 'CARDBOARD', 'CLEAN_WOOD', 'MIXED_PAPER', 'MIXED_CONTAINERS', 'STYROFOAM', 'SOFT_PLASTICS', 'OFPP_', 'APPLIANCES', 'E_WASTE', 'LIGHTS', 'BATTERIES', 'MATTRESSES', 'GLASS', 'NEW_GYPSUM', 'METAL', 'CONCRETE');

-- CreateEnum
CREATE TYPE "CompanyType" AS ENUM ('COLLECTOR', 'SOURCE');

-- CreateTable
CREATE TABLE "User" (
    "id" STRING NOT NULL,
    "name" STRING,
    "email" STRING,
    "emailVerified" TIMESTAMP(3),
    "password" STRING,
    "image" STRING,
    "role" "Role" NOT NULL DEFAULT 'TEMP_',
    "company_id" INT4,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Waste" (
    "id" INT4 NOT NULL DEFAULT unique_rowid(),
    "waste" STRING NOT NULL,
    "waste_type" "WasteType" NOT NULL,

    CONSTRAINT "Waste_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EntryFile" (
    "id" INT4 NOT NULL DEFAULT unique_rowid(),
    "name" STRING NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "user_id" STRING NOT NULL,

    CONSTRAINT "EntryFile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Entry" (
    "id" INT4 NOT NULL DEFAULT unique_rowid(),
    "collaborator" STRING NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "weight" FLOAT8 NOT NULL,
    "waste" STRING NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "user_id" STRING NOT NULL,
    "company_id" INT4 NOT NULL,
    "site" STRING NOT NULL,
    "entryFileId" INT4 NOT NULL,

    CONSTRAINT "Entry_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "companies" (
    "id" INT4 NOT NULL DEFAULT unique_rowid(),
    "company" STRING NOT NULL,
    "admin_code" STRING NOT NULL,
    "user_code" STRING NOT NULL,
    "address_line_1" STRING NOT NULL,
    "address_line_2" STRING NOT NULL,
    "email" STRING NOT NULL,
    "phone" STRING NOT NULL,
    "city_id" INT4 NOT NULL,
    "zip_code" STRING NOT NULL,
    "company_type" "CompanyType" NOT NULL,

    CONSTRAINT "companies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "company_collaborations" (
    "id" INT4 NOT NULL DEFAULT unique_rowid(),
    "source_id" INT4 NOT NULL,
    "collaborator_id" INT4 NOT NULL,

    CONSTRAINT "company_collaborations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Site" (
    "id" INT4 NOT NULL DEFAULT unique_rowid(),
    "site" STRING NOT NULL,

    CONSTRAINT "Site_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "City" (
    "id" INT4 NOT NULL DEFAULT unique_rowid(),
    "city" STRING NOT NULL,
    "province_id" INT4 NOT NULL,

    CONSTRAINT "City_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Province" (
    "id" INT4 NOT NULL DEFAULT unique_rowid(),
    "province" STRING NOT NULL,

    CONSTRAINT "Province_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Account" (
    "id" INT4 NOT NULL DEFAULT unique_rowid(),
    "userId" STRING NOT NULL,
    "type" STRING NOT NULL,
    "provider" STRING NOT NULL,
    "providerAccountId" STRING NOT NULL,
    "refresh_token" STRING,
    "access_token" STRING,
    "expires_at" INT4,
    "token_type" STRING,
    "scope" STRING,
    "id_token" STRING,
    "session_state" STRING,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" INT4 NOT NULL DEFAULT unique_rowid(),
    "sessionToken" STRING NOT NULL,
    "userId" STRING NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "testingData" (
    "id" INT4 NOT NULL DEFAULT unique_rowid(),
    "name" STRING NOT NULL,
    "creationTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "jsonArray" JSONB,

    CONSTRAINT "testingData_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VerificationToken" (
    "identifier" STRING NOT NULL,
    "token" STRING NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "companies_company_key" ON "companies"("company");

-- CreateIndex
CREATE UNIQUE INDEX "company_collaborations_source_id_collaborator_id_key" ON "company_collaborations"("source_id", "collaborator_id");

-- CreateIndex
CREATE UNIQUE INDEX "City_city_key" ON "City"("city");

-- CreateIndex
CREATE UNIQUE INDEX "Province_province_key" ON "Province"("province");

-- CreateIndex
CREATE UNIQUE INDEX "Account_provider_providerAccountId_key" ON "Account"("provider", "providerAccountId");

-- CreateIndex
CREATE UNIQUE INDEX "Session_sessionToken_key" ON "Session"("sessionToken");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_token_key" ON "VerificationToken"("token");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_identifier_token_key" ON "VerificationToken"("identifier", "token");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EntryFile" ADD CONSTRAINT "EntryFile_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Entry" ADD CONSTRAINT "Entry_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Entry" ADD CONSTRAINT "Entry_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Entry" ADD CONSTRAINT "Entry_entryFileId_fkey" FOREIGN KEY ("entryFileId") REFERENCES "EntryFile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "companies" ADD CONSTRAINT "companies_city_id_fkey" FOREIGN KEY ("city_id") REFERENCES "City"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "company_collaborations" ADD CONSTRAINT "company_collaborations_source_id_fkey" FOREIGN KEY ("source_id") REFERENCES "companies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "company_collaborations" ADD CONSTRAINT "company_collaborations_collaborator_id_fkey" FOREIGN KEY ("collaborator_id") REFERENCES "companies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "City" ADD CONSTRAINT "City_province_id_fkey" FOREIGN KEY ("province_id") REFERENCES "Province"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
