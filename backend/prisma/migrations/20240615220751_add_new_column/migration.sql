/*
  Warnings:

  - Added the required column `airConditioner` to the `publishedReservation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `breakfast` to the `publishedReservation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hotelier_id` to the `publishedReservation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `publishedReservation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `new_price` to the `publishedReservation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `parking` to the `publishedReservation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `people` to the `publishedReservation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `publishedReservation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `room_service` to the `publishedReservation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rooms` to the `publishedReservation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `wifi` to the `publishedReservation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "publishedReservation" ADD COLUMN     "airConditioner" BOOLEAN NOT NULL,
ADD COLUMN     "breakfast" BOOLEAN NOT NULL,
ADD COLUMN     "hotelier_id" INTEGER NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "new_price" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "parking" BOOLEAN NOT NULL,
ADD COLUMN     "people" INTEGER NOT NULL,
ADD COLUMN     "price" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "room_service" BOOLEAN NOT NULL,
ADD COLUMN     "rooms" INTEGER NOT NULL,
ADD COLUMN     "wifi" BOOLEAN NOT NULL;

-- CreateTable
CREATE TABLE "hotelier" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "hotel" TEXT NOT NULL,
    "adress" TEXT NOT NULL,
    "cnpj" TEXT NOT NULL,

    CONSTRAINT "hotelier_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "publishedReservation" ADD CONSTRAINT "publishedReservation_hotelier_id_fkey" FOREIGN KEY ("hotelier_id") REFERENCES "hotelier"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
