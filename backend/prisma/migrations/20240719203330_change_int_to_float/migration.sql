/*
  Warnings:

  - You are about to alter the column `tabValue` on the `costumertab` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.
  - You are about to alter the column `itemValue` on the `item` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.
  - You are about to alter the column `orderValue` on the `order` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.

*/
-- AlterTable
ALTER TABLE `costumertab` MODIFY `tabValue` DOUBLE NOT NULL;

-- AlterTable
ALTER TABLE `item` MODIFY `itemValue` DOUBLE NOT NULL;

-- AlterTable
ALTER TABLE `order` MODIFY `orderValue` DOUBLE NOT NULL;
