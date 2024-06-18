/*
  Warnings:

  - You are about to drop the `Promotion` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Promotion";

-- CreateTable
CREATE TABLE "promotion" (
    "id" SERIAL NOT NULL,
    "discount" INTEGER NOT NULL,
    "type" "PromotionType" NOT NULL,
    "num_rooms" INTEGER,

    CONSTRAINT "promotion_pkey" PRIMARY KEY ("id")
);
