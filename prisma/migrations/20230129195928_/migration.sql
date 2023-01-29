
-- AlterTable
ALTER TABLE `players` ADD COLUMN `categoryId` INTEGER NOT NULL,
    ADD COLUMN `editionId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `players` ADD CONSTRAINT `players_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `categories`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `players` ADD CONSTRAINT `players_editionId_fkey` FOREIGN KEY (`editionId`) REFERENCES `editions`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
