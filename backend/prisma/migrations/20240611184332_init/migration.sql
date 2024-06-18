-- CreateEnum
CREATE TYPE "PromotionType" AS ENUM ('ILIMITADA', 'LIMITE_QUARTO');

-- CreateTable
CREATE TABLE "Promotion" (
    "id" SERIAL NOT NULL,
    "discount" INTEGER NOT NULL,
    "type" "PromotionType" NOT NULL,
    "num_rooms" INTEGER,

    CONSTRAINT "Promotion_pkey" PRIMARY KEY ("id")
);

