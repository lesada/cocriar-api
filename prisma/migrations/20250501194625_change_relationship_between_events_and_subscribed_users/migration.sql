/*
  Warnings:

  - You are about to drop the column `subscribed_users_email` on the `events` table. All the data in the column will be lost.
  - Added the required column `event_id` to the `subscribed_users` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "events" DROP CONSTRAINT "events_subscribed_users_email_fkey";

-- AlterTable
ALTER TABLE "events" DROP COLUMN "subscribed_users_email";

-- AlterTable
ALTER TABLE "subscribed_users" ADD COLUMN     "event_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "subscribed_users" ADD CONSTRAINT "subscribed_users_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "events"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
