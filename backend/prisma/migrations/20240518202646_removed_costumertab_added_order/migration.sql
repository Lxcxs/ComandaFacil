/*
  Warnings:

  - You are about to drop the `costumertab` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `costumertab` DROP FOREIGN KEY `CostumerTab_costumerId_fkey`;

-- DropForeignKey
ALTER TABLE `costumertab` DROP FOREIGN KEY `CostumerTab_userId_fkey`;

-- DropTable
DROP TABLE `costumertab`;

-- CreateTable
CREATE TABLE `order` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `value` INTEGER NOT NULL,
    `quantity` INTEGER NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `note` VARCHAR(191) NOT NULL,
    `costumerName` VARCHAR(191) NOT NULL,
    `userId` INTEGER NOT NULL,
    `costumerId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `order` ADD CONSTRAINT `order_costumerId_fkey` FOREIGN KEY (`costumerId`) REFERENCES `costumer`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `order` ADD CONSTRAINT `order_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
