-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ROOT', 'ADMIN', 'USER', 'TEMP_');

-- CreateEnum
CREATE TYPE "WasteType" AS ENUM ('GENERAL_GARBAGE', 'FOODWASTE', 'GREENWASTE', 'CARDBOARD', 'CLEAN_WOOD', 'MIXED_PAPER', 'MIXED_CONTAINERS', 'STYROFOAM', 'SOFT_PLASTICS', 'OFPP_', 'APPLIANCES', 'E_WASTE', 'LIGHTS', 'BATTERIES', 'MATTRESSES', 'GLASS', 'NEW_GYPSUM', 'METAL', 'CONCRETE');

-- CreateEnum
CREATE TYPE "CompanyType" AS ENUM ('COLLECTOR', 'SOURCE');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT,
    "emailVerified" TIMESTAMP(3),
    "password" TEXT,
    "image" TEXT,
    "role" "Role" NOT NULL DEFAULT 'TEMP_',
    "company_id" INTEGER,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Waste" (
    "id" SERIAL NOT NULL,
    "waste" TEXT NOT NULL,
    "waste_type" "WasteType" NOT NULL,

    CONSTRAINT "Waste_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Entry" (
    "id" SERIAL NOT NULL,
    "collaborator" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "weight" DOUBLE PRECISION NOT NULL,
    "waste" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "user_id" TEXT NOT NULL,
    "company_id" INTEGER NOT NULL,
    "site" TEXT NOT NULL,

    CONSTRAINT "Entry_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "companies" (
    "id" SERIAL NOT NULL,
    "company" TEXT NOT NULL,
    "admin_code" TEXT NOT NULL,
    "user_code" TEXT NOT NULL,
    "address_line_1" TEXT NOT NULL,
    "address_line_2" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "city_id" INTEGER NOT NULL,
    "zip_code" TEXT NOT NULL,
    "company_type" "CompanyType" NOT NULL,

    CONSTRAINT "companies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "company_collaborations" (
    "id" SERIAL NOT NULL,
    "source_id" INTEGER NOT NULL,
    "collaborator_id" INTEGER NOT NULL,

    CONSTRAINT "company_collaborations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Site" (
    "id" SERIAL NOT NULL,
    "site" TEXT NOT NULL,

    CONSTRAINT "Site_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "City" (
    "id" SERIAL NOT NULL,
    "city" TEXT NOT NULL,
    "province_id" INTEGER NOT NULL,

    CONSTRAINT "City_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Province" (
    "id" SERIAL NOT NULL,
    "province" TEXT NOT NULL,

    CONSTRAINT "Province_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Account" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" SERIAL NOT NULL,
    "sessionToken" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "testingData" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "creationTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "jsonArray" JSONB,

    CONSTRAINT "testingData_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VerificationToken" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
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
ALTER TABLE "Entry" ADD CONSTRAINT "Entry_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Entry" ADD CONSTRAINT "Entry_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

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
