-- CreateEnum
CREATE TYPE "CardType" AS ENUM ('CREDITO', 'DEBITO');

-- CreateTable
CREATE TABLE "reservation" (
    "id" SERIAL NOT NULL,
    "Nome" TEXT NOT NULL,

    CONSTRAINT "reservation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserReservation" (
    "user_id" INTEGER NOT NULL,
    "reservation_id" INTEGER NOT NULL,

    CONSTRAINT "UserReservation_pkey" PRIMARY KEY ("user_id","reservation_id")
);

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

-- CreateTable
CREATE TABLE "publishedReservation" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "rooms" INTEGER NOT NULL,
    "people" INTEGER NOT NULL,
    "wifi" BOOLEAN NOT NULL,
    "breakfast" BOOLEAN NOT NULL,
    "airConditioner" BOOLEAN NOT NULL,
    "parking" BOOLEAN NOT NULL,
    "room_service" BOOLEAN NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "new_price" DOUBLE PRECISION NOT NULL,
    "promotion_id" INTEGER,
    "hotelier_id" INTEGER NOT NULL,

    CONSTRAINT "publishedReservation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Client" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "birthDate" TEXT NOT NULL,

    CONSTRAINT "Client_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PaymentMethod" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "cvv" INTEGER NOT NULL,
    "expiryDate" TEXT NOT NULL,
    "type" "CardType" NOT NULL,
    "clientId" INTEGER NOT NULL,

    CONSTRAINT "PaymentMethod_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Reserve" (
    "id" SERIAL NOT NULL,
    "num_rooms" INTEGER NOT NULL,
    "checkin" TEXT NOT NULL,
    "checkout" TEXT NOT NULL,
    "num_adults" INTEGER NOT NULL,
    "num_children" INTEGER NOT NULL,
    "paymentMethodName" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "publishedReservationId" INTEGER NOT NULL,
    "clientId" INTEGER NOT NULL,
    "paymentMethodId" INTEGER NOT NULL,

    CONSTRAINT "Reserve_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Client_email_key" ON "Client"("email");

-- AddForeignKey
ALTER TABLE "UserReservation" ADD CONSTRAINT "UserReservation_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserReservation" ADD CONSTRAINT "UserReservation_reservation_id_fkey" FOREIGN KEY ("reservation_id") REFERENCES "reservation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "publishedReservation" ADD CONSTRAINT "publishedReservation_promotion_id_fkey" FOREIGN KEY ("promotion_id") REFERENCES "promotion"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "publishedReservation" ADD CONSTRAINT "publishedReservation_hotelier_id_fkey" FOREIGN KEY ("hotelier_id") REFERENCES "hotelier"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PaymentMethod" ADD CONSTRAINT "PaymentMethod_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reserve" ADD CONSTRAINT "Reserve_publishedReservationId_fkey" FOREIGN KEY ("publishedReservationId") REFERENCES "publishedReservation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reserve" ADD CONSTRAINT "Reserve_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reserve" ADD CONSTRAINT "Reserve_paymentMethodId_fkey" FOREIGN KEY ("paymentMethodId") REFERENCES "PaymentMethod"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
