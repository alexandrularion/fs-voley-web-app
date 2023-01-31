-- CreateTable
CREATE TABLE `matchs` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `dateTime` DATETIME(3) NULL,
    `link` LONGTEXT NULL,
    `editionId` INTEGER NOT NULL,
    `championshipId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `match_club` (
    `match_id` INTEGER NOT NULL,
    `club_id` INTEGER NOT NULL,

    PRIMARY KEY (`match_id`, `club_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `matchs` ADD CONSTRAINT `matchs_editionId_fkey` FOREIGN KEY (`editionId`) REFERENCES `editions`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `matchs` ADD CONSTRAINT `matchs_championshipId_fkey` FOREIGN KEY (`championshipId`) REFERENCES `championships`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `match_club` ADD CONSTRAINT `match_club_match_id_fkey` FOREIGN KEY (`match_id`) REFERENCES `matchs`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `match_club` ADD CONSTRAINT `match_club_club_id_fkey` FOREIGN KEY (`club_id`) REFERENCES `clubs`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
