/*
  Warnings:

  - You are about to drop the `match_club` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `club_firstId` to the `matchs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `club_secondId` to the `matchs` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `match_club` DROP FOREIGN KEY `match_club_club_id_fkey`;

-- DropForeignKey
ALTER TABLE `match_club` DROP FOREIGN KEY `match_club_match_id_fkey`;

-- AlterTable
ALTER TABLE `matchs` ADD COLUMN `club_firstId` INTEGER NOT NULL,
    ADD COLUMN `club_secondId` INTEGER NOT NULL;

-- DropTable
DROP TABLE `match_club`;

-- AddForeignKey
ALTER TABLE `matchs` ADD CONSTRAINT `matchs_club_firstId_fkey` FOREIGN KEY (`club_firstId`) REFERENCES `clubs`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `matchs` ADD CONSTRAINT `matchs_club_secondId_fkey` FOREIGN KEY (`club_secondId`) REFERENCES `clubs`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
