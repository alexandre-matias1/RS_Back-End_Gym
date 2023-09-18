/*
  Warnings:

  - Added the required column `validated_at` to the `check_ins` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "check_ins" ADD COLUMN     "validated_at" TIMESTAMP(3) NOT NULL;
