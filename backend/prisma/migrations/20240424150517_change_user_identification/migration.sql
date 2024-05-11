/*
  Warnings:

  - A unique constraint covering the columns `[userDocument]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `User_userDocument_key` ON `User`(`userDocument`);
