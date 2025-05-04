/*
  Warnings:

  - The primary key for the `subscribed_users` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[email,event_id]` on the table `subscribed_users` will be added. If there are existing duplicate values, this will fail.
  - The required column `id` was added to the `subscribed_users` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE "subscribed_users" DROP CONSTRAINT "subscribed_users_pkey",
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "subscribed_users_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE UNIQUE INDEX "subscribed_users_email_event_id_key" ON "subscribed_users"("email", "event_id");
