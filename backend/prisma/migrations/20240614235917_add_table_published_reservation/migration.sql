-- CreateTable
CREATE TABLE "publishedReservation" (
    "id" SERIAL NOT NULL,
    "promotion_id" INTEGER,

    CONSTRAINT "publishedReservation_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "publishedReservation" ADD CONSTRAINT "publishedReservation_promotion_id_fkey" FOREIGN KEY ("promotion_id") REFERENCES "promotion"("id") ON DELETE SET NULL ON UPDATE CASCADE;
