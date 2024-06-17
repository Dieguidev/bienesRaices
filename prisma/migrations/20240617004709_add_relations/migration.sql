/*
  Warnings:

  - Added the required column `categoryId` to the `properties` table without a default value. This is not possible if the table is not empty.
  - Added the required column `priceId` to the `properties` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `properties` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `properties` ADD COLUMN `categoryId` VARCHAR(191) NOT NULL,
    ADD COLUMN `priceId` VARCHAR(191) NOT NULL,
    ADD COLUMN `userId` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `properties` ADD CONSTRAINT `properties_priceId_fkey` FOREIGN KEY (`priceId`) REFERENCES `prices`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `properties` ADD CONSTRAINT `properties_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `categories`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `properties` ADD CONSTRAINT `properties_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
