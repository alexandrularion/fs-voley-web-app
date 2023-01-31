-- CreateTable
CREATE TABLE `ranks` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `position` INTEGER NOT NULL,
    `image` LONGTEXT NULL,
    `points` INTEGER NOT NULL,
    `played` INTEGER NOT NULL,
    `wins` INTEGER NOT NULL,
    `losings` INTEGER NOT NULL,
    `winnedSets` INTEGER NOT NULL,
    `losedSets` INTEGER NOT NULL,
    `winnedPoints` INTEGER NOT NULL,
    `losedPoints` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
