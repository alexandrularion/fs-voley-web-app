/*
  Warnings:

  - You are about to drop the column `period` on the `sponsors` table. All the data in the column will be lost.
  - Added the required column `date_end` to the `sponsors` table without a default value. This is not possible if the table is not empty.
  - Added the required column `date_start` to the `sponsors` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `sponsors` DROP COLUMN `period`,
    ADD COLUMN `date_end` VARCHAR(191) NOT NULL,
    ADD COLUMN `date_start` VARCHAR(191) NOT NULL;
ALTER TABLE sponsors MODIFY createdAt datetime NULL DEFAULT '2023-01-17';
ALTER TABLE sponsors MODIFY updatedAt datetime NULL DEFAULT '2023-01-17';
