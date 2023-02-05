/*
  Warnings:

  - You are about to drop the column `description` on the `posts` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `posts` table. All the data in the column will be lost.
  - Added the required column `content` to the `posts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `posts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `posts` DROP COLUMN `description`,
    DROP COLUMN `type`,
    ADD COLUMN `content` LONGTEXT NOT NULL,
    ADD COLUMN `title` VARCHAR(191) NOT NULL;
