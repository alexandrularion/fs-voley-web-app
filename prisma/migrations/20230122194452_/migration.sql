/*
  Warnings:

  - Made the column `createdAt` on table `sponsors` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updatedAt` on table `sponsors` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `sponsors` MODIFY `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `updatedAt` DATETIME(3) NOT NULL;

-- CreateTable
CREATE TABLE `players` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `first_name` VARCHAR(191) NOT NULL,
    `last_name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `role` INTEGER NULL DEFAULT 0,
    `height` DOUBLE NOT NULL,
    `position` VARCHAR(191) NULL,
    `birthday` DATETIME(3) NOT NULL,
    `nationality` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
