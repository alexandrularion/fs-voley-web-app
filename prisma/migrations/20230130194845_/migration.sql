-- AlterTable
ALTER TABLE `editions` MODIFY `updatedAt` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `players` ADD COLUMN `slug` VARCHAR(191) NULL;
