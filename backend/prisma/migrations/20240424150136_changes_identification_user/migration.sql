/*
  Warnings:

  - You are about to drop the `identification` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `userDocument` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `identification` DROP FOREIGN KEY `Identification_userId_fkey`;

-- AlterTable
ALTER TABLE `user` ADD COLUMN `userDocument` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `identification`;
