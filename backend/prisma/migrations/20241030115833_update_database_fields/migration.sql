/*
  Warnings:

  - You are about to drop the column `categoryName` on the `category` table. All the data in the column will be lost.
  - You are about to drop the column `itemDescription` on the `item` table. All the data in the column will be lost.
  - You are about to drop the column `itemImage` on the `item` table. All the data in the column will be lost.
  - You are about to drop the column `itemName` on the `item` table. All the data in the column will be lost.
  - You are about to drop the column `itemStatus` on the `item` table. All the data in the column will be lost.
  - You are about to drop the column `itemValue` on the `item` table. All the data in the column will be lost.
  - You are about to drop the column `costumerId` on the `order` table. All the data in the column will be lost.
  - You are about to drop the column `costumerNote` on the `order` table. All the data in the column will be lost.
  - You are about to drop the column `costumerTabId` on the `order` table. All the data in the column will be lost.
  - You are about to drop the column `itemAmount` on the `order` table. All the data in the column will be lost.
  - You are about to drop the column `orderStatus` on the `order` table. All the data in the column will be lost.
  - You are about to drop the column `orderValue` on the `order` table. All the data in the column will be lost.
  - You are about to drop the column `storeImage` on the `store` table. All the data in the column will be lost.
  - You are about to drop the column `storeName` on the `store` table. All the data in the column will be lost.
  - You are about to drop the column `storeStatus` on the `store` table. All the data in the column will be lost.
  - You are about to drop the column `storeTableAmount` on the `store` table. All the data in the column will be lost.
  - You are about to drop the column `tableNumber` on the `table` table. All the data in the column will be lost.
  - You are about to drop the column `tablePeopleAmount` on the `table` table. All the data in the column will be lost.
  - You are about to drop the column `tableStatus` on the `table` table. All the data in the column will be lost.
  - You are about to drop the column `userDocument` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `userEmail` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `userName` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `userPassword` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `waiterEmail` on the `waiter` table. All the data in the column will be lost.
  - You are about to drop the column `waiterName` on the `waiter` table. All the data in the column will be lost.
  - You are about to drop the column `waiterPassword` on the `waiter` table. All the data in the column will be lost.
  - You are about to drop the `costumer` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `costumertab` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[email]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[document]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `Waiter` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `name` to the `Category` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `Item` table without a default value. This is not possible if the table is not empty.
  - Added the required column `image` to the `Item` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Item` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `Item` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `Item` table without a default value. This is not possible if the table is not empty.
  - Added the required column `customerId` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `customerNote` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quantity` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `image` to the `Store` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Store` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `Store` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tableCount` to the `Store` table without a default value. This is not possible if the table is not empty.
  - Added the required column `number` to the `Table` table without a default value. This is not possible if the table is not empty.
  - Added the required column `peopleCount` to the `Table` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `Table` table without a default value. This is not possible if the table is not empty.
  - Added the required column `document` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `Waiter` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Waiter` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `Waiter` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `costumer` DROP FOREIGN KEY `Costumer_storeId_fkey`;

-- DropForeignKey
ALTER TABLE `costumer` DROP FOREIGN KEY `costumer_tableId_fkey`;

-- DropForeignKey
ALTER TABLE `costumertab` DROP FOREIGN KEY `costumerTab_costumerId_fkey`;

-- DropForeignKey
ALTER TABLE `costumertab` DROP FOREIGN KEY `costumerTab_storeId_fkey`;

-- DropForeignKey
ALTER TABLE `costumertab` DROP FOREIGN KEY `costumerTab_tableId_fkey`;

-- DropForeignKey
ALTER TABLE `order` DROP FOREIGN KEY `order_costumerId_fkey`;

-- DropForeignKey
ALTER TABLE `order` DROP FOREIGN KEY `order_costumerTabId_fkey`;

-- DropForeignKey
ALTER TABLE `order` DROP FOREIGN KEY `order_storeId_fkey`;

-- DropForeignKey
ALTER TABLE `order` DROP FOREIGN KEY `order_tableId_fkey`;

-- DropForeignKey
ALTER TABLE `order` DROP FOREIGN KEY `order_waiterId_fkey`;

-- DropForeignKey
ALTER TABLE `store` DROP FOREIGN KEY `store_userId_fkey`;

-- DropForeignKey
ALTER TABLE `table` DROP FOREIGN KEY `table_storeId_fkey`;

-- DropForeignKey
ALTER TABLE `table` DROP FOREIGN KEY `table_waiterId_fkey`;

-- DropForeignKey
ALTER TABLE `waiter` DROP FOREIGN KEY `waiter_storeId_fkey`;

-- DropIndex
DROP INDEX `User_userDocument_key` ON `user`;

-- DropIndex
DROP INDEX `User_userEmail_key` ON `user`;

-- DropIndex
DROP INDEX `waiter_waiterEmail_key` ON `waiter`;

-- AlterTable
ALTER TABLE `category` DROP COLUMN `categoryName`,
    ADD COLUMN `name` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `item` DROP COLUMN `itemDescription`,
    DROP COLUMN `itemImage`,
    DROP COLUMN `itemName`,
    DROP COLUMN `itemStatus`,
    DROP COLUMN `itemValue`,
    ADD COLUMN `description` VARCHAR(191) NOT NULL,
    ADD COLUMN `image` VARCHAR(191) NOT NULL,
    ADD COLUMN `name` VARCHAR(191) NOT NULL,
    ADD COLUMN `price` DECIMAL(10, 2) NOT NULL,
    ADD COLUMN `status` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `order` DROP COLUMN `costumerId`,
    DROP COLUMN `costumerNote`,
    DROP COLUMN `costumerTabId`,
    DROP COLUMN `itemAmount`,
    DROP COLUMN `orderStatus`,
    DROP COLUMN `orderValue`,
    ADD COLUMN `customerId` INTEGER NOT NULL,
    ADD COLUMN `customerNote` VARCHAR(191) NOT NULL,
    ADD COLUMN `customerTabId` INTEGER NULL,
    ADD COLUMN `price` DECIMAL(10, 2) NOT NULL,
    ADD COLUMN `quantity` INTEGER NOT NULL,
    ADD COLUMN `status` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `store` DROP COLUMN `storeImage`,
    DROP COLUMN `storeName`,
    DROP COLUMN `storeStatus`,
    DROP COLUMN `storeTableAmount`,
    ADD COLUMN `image` VARCHAR(191) NOT NULL,
    ADD COLUMN `name` VARCHAR(191) NOT NULL,
    ADD COLUMN `status` VARCHAR(191) NOT NULL,
    ADD COLUMN `tableCount` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `table` DROP COLUMN `tableNumber`,
    DROP COLUMN `tablePeopleAmount`,
    DROP COLUMN `tableStatus`,
    ADD COLUMN `number` INTEGER NOT NULL,
    ADD COLUMN `peopleCount` INTEGER NOT NULL,
    ADD COLUMN `status` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `user` DROP COLUMN `userDocument`,
    DROP COLUMN `userEmail`,
    DROP COLUMN `userName`,
    DROP COLUMN `userPassword`,
    ADD COLUMN `document` VARCHAR(191) NOT NULL,
    ADD COLUMN `email` VARCHAR(191) NOT NULL,
    ADD COLUMN `name` VARCHAR(191) NOT NULL,
    ADD COLUMN `password` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `waiter` DROP COLUMN `waiterEmail`,
    DROP COLUMN `waiterName`,
    DROP COLUMN `waiterPassword`,
    ADD COLUMN `email` VARCHAR(191) NOT NULL,
    ADD COLUMN `name` VARCHAR(191) NOT NULL,
    ADD COLUMN `password` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `costumer`;

-- DropTable
DROP TABLE `costumertab`;

-- CreateTable
CREATE TABLE `Customer` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `tableNumber` INTEGER NOT NULL,
    `accountType` VARCHAR(191) NOT NULL,
    `tableId` INTEGER NULL,
    `storeId` INTEGER NOT NULL,
    `status` VARCHAR(191) NOT NULL,

    INDEX `Customer_storeId_idx`(`storeId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CustomerTab` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `value` DECIMAL(10, 2) NOT NULL,
    `status` VARCHAR(191) NOT NULL,
    `customerId` INTEGER NOT NULL,
    `storeId` INTEGER NOT NULL,
    `tableId` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE INDEX `Order_customerId_idx` ON `Order`(`customerId`);

-- CreateIndex
CREATE UNIQUE INDEX `User_email_key` ON `User`(`email`);

-- CreateIndex
CREATE UNIQUE INDEX `User_document_key` ON `User`(`document`);

-- CreateIndex
CREATE UNIQUE INDEX `Waiter_email_key` ON `Waiter`(`email`);

-- AddForeignKey
ALTER TABLE `Waiter` ADD CONSTRAINT `Waiter_storeId_fkey` FOREIGN KEY (`storeId`) REFERENCES `Store`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Store` ADD CONSTRAINT `Store_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Table` ADD CONSTRAINT `Table_storeId_fkey` FOREIGN KEY (`storeId`) REFERENCES `Store`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Table` ADD CONSTRAINT `Table_waiterId_fkey` FOREIGN KEY (`waiterId`) REFERENCES `Waiter`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Customer` ADD CONSTRAINT `Customer_tableId_fkey` FOREIGN KEY (`tableId`) REFERENCES `Table`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Customer` ADD CONSTRAINT `Customer_storeId_fkey` FOREIGN KEY (`storeId`) REFERENCES `Store`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CustomerTab` ADD CONSTRAINT `CustomerTab_tableId_fkey` FOREIGN KEY (`tableId`) REFERENCES `Table`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CustomerTab` ADD CONSTRAINT `CustomerTab_customerId_fkey` FOREIGN KEY (`customerId`) REFERENCES `Customer`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CustomerTab` ADD CONSTRAINT `CustomerTab_storeId_fkey` FOREIGN KEY (`storeId`) REFERENCES `Store`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Order` ADD CONSTRAINT `Order_customerId_fkey` FOREIGN KEY (`customerId`) REFERENCES `Customer`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Order` ADD CONSTRAINT `Order_tableId_fkey` FOREIGN KEY (`tableId`) REFERENCES `Table`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Order` ADD CONSTRAINT `Order_storeId_fkey` FOREIGN KEY (`storeId`) REFERENCES `Store`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Order` ADD CONSTRAINT `Order_customerTabId_fkey` FOREIGN KEY (`customerTabId`) REFERENCES `CustomerTab`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Order` ADD CONSTRAINT `Order_waiterId_fkey` FOREIGN KEY (`waiterId`) REFERENCES `Waiter`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- RenameIndex
ALTER TABLE `category` RENAME INDEX `Category_storeId_fkey` TO `Category_storeId_idx`;

-- RenameIndex
ALTER TABLE `item` RENAME INDEX `Item_categoryId_fkey` TO `Item_categoryId_idx`;

-- RenameIndex
ALTER TABLE `item` RENAME INDEX `Item_storeId_fkey` TO `Item_storeId_idx`;

-- RenameIndex
ALTER TABLE `order` RENAME INDEX `order_storeId_fkey` TO `Order_storeId_idx`;
