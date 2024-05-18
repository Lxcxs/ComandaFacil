/*
  Warnings:

  - You are about to drop the column `userTable` on the `costumer` table. All the data in the column will be lost.
  - You are about to drop the column `userTableAmount` on the `costumer` table. All the data in the column will be lost.
  - You are about to drop the column `tabStatus` on the `costumertab` table. All the data in the column will be lost.
  - Added the required column `costumerTable` to the `Costumer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quantity` to the `CostumerTab` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `CostumerTab` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tabValue` to the `CostumerTab` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `costumer` DROP COLUMN `userTable`,
    DROP COLUMN `userTableAmount`,
    ADD COLUMN `costumerTable` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `costumertab` DROP COLUMN `tabStatus`,
    ADD COLUMN `createdAt` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `quantity` INTEGER NOT NULL,
    ADD COLUMN `status` VARCHAR(191) NOT NULL,
    ADD COLUMN `tabValue` INTEGER NOT NULL;
