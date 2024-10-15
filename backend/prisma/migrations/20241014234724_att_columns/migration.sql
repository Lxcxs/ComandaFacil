/*
  Warnings:

  - Added the required column `costumerStatus` to the `costumer` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `costumer` DROP FOREIGN KEY `costumer_tableId_fkey`;

-- DropForeignKey
ALTER TABLE `costumertab` DROP FOREIGN KEY `costumerTab_tableId_fkey`;

-- DropForeignKey
ALTER TABLE `order` DROP FOREIGN KEY `order_tableId_fkey`;

-- AlterTable
ALTER TABLE `costumer` ADD COLUMN `costumerStatus` VARCHAR(191) NOT NULL,
    MODIFY `tableId` INTEGER NULL;

-- AlterTable
ALTER TABLE `costumertab` MODIFY `tableId` INTEGER NULL;

-- AlterTable
ALTER TABLE `order` MODIFY `tableId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `costumer` ADD CONSTRAINT `costumer_tableId_fkey` FOREIGN KEY (`tableId`) REFERENCES `table`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `costumerTab` ADD CONSTRAINT `costumerTab_tableId_fkey` FOREIGN KEY (`tableId`) REFERENCES `table`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `order` ADD CONSTRAINT `order_tableId_fkey` FOREIGN KEY (`tableId`) REFERENCES `table`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
