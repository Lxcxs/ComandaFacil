/*
  Warnings:

  - You are about to drop the column `userId` on the `category` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `costumer` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `item` table. All the data in the column will be lost.
  - You are about to drop the column `costumerName` on the `order` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `order` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `order` table. All the data in the column will be lost.
  - You are about to drop the column `note` on the `order` table. All the data in the column will be lost.
  - You are about to drop the column `quantity` on the `order` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `order` table. All the data in the column will be lost.
  - You are about to drop the column `value` on the `order` table. All the data in the column will be lost.
  - You are about to drop the column `userBrand` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `userTableAmount` on the `user` table. All the data in the column will be lost.
  - Added the required column `storeId` to the `category` table without a default value. This is not possible if the table is not empty.
  - Added the required column `accountType` to the `costumer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `storeId` to the `costumer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tableId` to the `costumer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `itemImage` to the `item` table without a default value. This is not possible if the table is not empty.
  - Added the required column `itemStatus` to the `item` table without a default value. This is not possible if the table is not empty.
  - Added the required column `storeId` to the `item` table without a default value. This is not possible if the table is not empty.
  - Made the column `categoryId` on table `item` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `costumerNote` to the `order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `itemAmount` to the `order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `itemImage` to the `order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `itemName` to the `order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `orderStatus` to the `order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `orderValue` to the `order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `storeId` to the `order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tableId` to the `order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `accountType` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `category` DROP FOREIGN KEY `Category_userId_fkey`;

-- DropForeignKey
ALTER TABLE `costumer` DROP FOREIGN KEY `Costumer_userId_fkey`;

-- DropForeignKey
ALTER TABLE `item` DROP FOREIGN KEY `Item_categoryId_fkey`;

-- DropForeignKey
ALTER TABLE `item` DROP FOREIGN KEY `Item_userId_fkey`;

-- DropForeignKey
ALTER TABLE `order` DROP FOREIGN KEY `order_userId_fkey`;

-- AlterTable
ALTER TABLE `category` DROP COLUMN `userId`,
    ADD COLUMN `storeId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `costumer` DROP COLUMN `userId`,
    ADD COLUMN `accountType` VARCHAR(191) NOT NULL,
    ADD COLUMN `storeId` INTEGER NOT NULL,
    ADD COLUMN `tableId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `item` DROP COLUMN `userId`,
    ADD COLUMN `itemImage` VARCHAR(191) NOT NULL,
    ADD COLUMN `itemStatus` VARCHAR(191) NOT NULL,
    ADD COLUMN `storeId` INTEGER NOT NULL,
    MODIFY `categoryId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `order` DROP COLUMN `costumerName`,
    DROP COLUMN `description`,
    DROP COLUMN `name`,
    DROP COLUMN `note`,
    DROP COLUMN `quantity`,
    DROP COLUMN `userId`,
    DROP COLUMN `value`,
    ADD COLUMN `costumerNote` VARCHAR(191) NOT NULL,
    ADD COLUMN `costumerTabId` INTEGER NULL,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `itemAmount` INTEGER NOT NULL,
    ADD COLUMN `itemImage` VARCHAR(191) NOT NULL,
    ADD COLUMN `itemName` VARCHAR(191) NOT NULL,
    ADD COLUMN `orderStatus` VARCHAR(191) NOT NULL,
    ADD COLUMN `orderValue` INTEGER NOT NULL,
    ADD COLUMN `storeId` INTEGER NOT NULL,
    ADD COLUMN `tableId` INTEGER NOT NULL,
    ADD COLUMN `waiterId` INTEGER NULL;

-- AlterTable
ALTER TABLE `user` DROP COLUMN `userBrand`,
    DROP COLUMN `userTableAmount`,
    ADD COLUMN `accountType` VARCHAR(191) NOT NULL;

-- CreateTable
CREATE TABLE `waiter` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `waiterName` VARCHAR(191) NOT NULL,
    `waiterEmail` VARCHAR(191) NOT NULL,
    `waiterPassword` VARCHAR(191) NOT NULL,
    `accountType` VARCHAR(191) NOT NULL,
    `storeId` INTEGER NOT NULL,
    `tableId` INTEGER NOT NULL,

    UNIQUE INDEX `waiter_waiterEmail_key`(`waiterEmail`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `store` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `storeName` VARCHAR(191) NOT NULL,
    `storeStatus` VARCHAR(191) NOT NULL,
    `storeImage` VARCHAR(191) NOT NULL,
    `storeTableAmount` INTEGER NOT NULL,
    `userId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `table` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `tableNumber` VARCHAR(191) NOT NULL,
    `tableStatus` VARCHAR(191) NOT NULL,
    `tablePeopleAmount` INTEGER NOT NULL,
    `storeId` INTEGER NOT NULL,
    `waiterId` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `costumerTab` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `tabValue` INTEGER NOT NULL,
    `tabStatus` VARCHAR(191) NOT NULL,
    `costumerId` INTEGER NOT NULL,
    `storeId` INTEGER NOT NULL,
    `tableId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE INDEX `Category_storeId_fkey` ON `category`(`storeId`);

-- CreateIndex
CREATE INDEX `Costumer_storeId_fkey` ON `costumer`(`storeId`);

-- CreateIndex
CREATE INDEX `Item_storeId_fkey` ON `item`(`storeId`);

-- CreateIndex
CREATE INDEX `order_storeId_fkey` ON `order`(`storeId`);

-- AddForeignKey
ALTER TABLE `waiter` ADD CONSTRAINT `waiter_storeId_fkey` FOREIGN KEY (`storeId`) REFERENCES `store`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `store` ADD CONSTRAINT `store_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `category` ADD CONSTRAINT `Category_storeId_fkey` FOREIGN KEY (`storeId`) REFERENCES `store`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `item` ADD CONSTRAINT `Item_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `category`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `item` ADD CONSTRAINT `Item_storeId_fkey` FOREIGN KEY (`storeId`) REFERENCES `store`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `table` ADD CONSTRAINT `table_storeId_fkey` FOREIGN KEY (`storeId`) REFERENCES `store`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `table` ADD CONSTRAINT `table_waiterId_fkey` FOREIGN KEY (`waiterId`) REFERENCES `waiter`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `costumer` ADD CONSTRAINT `costumer_tableId_fkey` FOREIGN KEY (`tableId`) REFERENCES `table`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `costumer` ADD CONSTRAINT `Costumer_storeId_fkey` FOREIGN KEY (`storeId`) REFERENCES `store`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `costumerTab` ADD CONSTRAINT `costumerTab_tableId_fkey` FOREIGN KEY (`tableId`) REFERENCES `table`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `costumerTab` ADD CONSTRAINT `costumerTab_costumerId_fkey` FOREIGN KEY (`costumerId`) REFERENCES `costumer`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `costumerTab` ADD CONSTRAINT `costumerTab_storeId_fkey` FOREIGN KEY (`storeId`) REFERENCES `store`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `order` ADD CONSTRAINT `order_tableId_fkey` FOREIGN KEY (`tableId`) REFERENCES `table`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `order` ADD CONSTRAINT `order_storeId_fkey` FOREIGN KEY (`storeId`) REFERENCES `store`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `order` ADD CONSTRAINT `order_costumerTabId_fkey` FOREIGN KEY (`costumerTabId`) REFERENCES `costumerTab`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `order` ADD CONSTRAINT `order_waiterId_fkey` FOREIGN KEY (`waiterId`) REFERENCES `waiter`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
