/*
  Warnings:

  - You are about to drop the column `imageUrl` on the `events` table. All the data in the column will be lost.
  - Added the required column `image_url` to the `events` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "events" DROP COLUMN "imageUrl",
ADD COLUMN     "image_url" TEXT NOT NULL;
