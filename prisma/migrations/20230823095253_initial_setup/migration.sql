/*
  Warnings:

  - You are about to drop the column `Cooperative` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `Process` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `Producer` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `Varietals` on the `Product` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Product` DROP COLUMN `Cooperative`,
    DROP COLUMN `Process`,
    DROP COLUMN `Producer`,
    DROP COLUMN `Varietals`,
    ADD COLUMN `cooperative` VARCHAR(191) NULL,
    ADD COLUMN `process` VARCHAR(191) NULL,
    ADD COLUMN `producer` VARCHAR(191) NULL,
    ADD COLUMN `varietals` VARCHAR(191) NULL;
