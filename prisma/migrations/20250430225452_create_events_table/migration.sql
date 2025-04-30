-- CreateTable
CREATE TABLE "newsletters" (
    "email" TEXT NOT NULL,

    CONSTRAINT "newsletters_pkey" PRIMARY KEY ("email")
);

-- CreateTable
CREATE TABLE "subscribed_users" (
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "cellphone" TEXT NOT NULL,
    "birthdate" TIMESTAMP(3) NOT NULL,
    "entity" TEXT NOT NULL,

    CONSTRAINT "subscribed_users_pkey" PRIMARY KEY ("email")
);

-- CreateTable
CREATE TABLE "events" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "tag" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "event_date" TIMESTAMP(3) NOT NULL,
    "address" TEXT NOT NULL,
    "max_participants" INTEGER,
    "subscribed_users_email" TEXT NOT NULL,

    CONSTRAINT "events_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "events" ADD CONSTRAINT "events_subscribed_users_email_fkey" FOREIGN KEY ("subscribed_users_email") REFERENCES "subscribed_users"("email") ON DELETE RESTRICT ON UPDATE CASCADE;
