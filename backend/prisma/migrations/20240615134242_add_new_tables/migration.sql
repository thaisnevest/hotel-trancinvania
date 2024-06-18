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

-- AddForeignKey
ALTER TABLE "UserReservation" ADD CONSTRAINT "UserReservation_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserReservation" ADD CONSTRAINT "UserReservation_reservation_id_fkey" FOREIGN KEY ("reservation_id") REFERENCES "reservation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
