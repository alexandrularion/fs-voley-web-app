/*
  Warnings:

  - You are about to drop the column `categoryId` on the `clubs` table. All the data in the column will be lost.
  - Added the required column `championshipId` to the `clubs` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `clubs` DROP FOREIGN KEY `clubs_categoryId_fkey`;

-- AlterTable
ALTER TABLE `clubs` DROP COLUMN `categoryId`,
    ADD COLUMN `championshipId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `clubs` ADD CONSTRAINT `clubs_championshipId_fkey` FOREIGN KEY (`championshipId`) REFERENCES `championships`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
