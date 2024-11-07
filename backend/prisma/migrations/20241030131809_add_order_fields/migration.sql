/*
  Warnings:

  - Added the required column `isIndividual` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `order` ADD COLUMN `guestName` VARCHAR(191) NULL,
    ADD COLUMN `isIndividual` BOOLEAN NOT NULL;
