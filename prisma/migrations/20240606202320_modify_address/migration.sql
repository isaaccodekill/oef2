/*
  Warnings:

  - You are about to drop the column `city` on the `Address` table. All the data in the column will be lost.
  - You are about to drop the column `country` on the `Address` table. All the data in the column will be lost.
  - You are about to drop the column `state` on the `Address` table. All the data in the column will be lost.
  - Added the required column `height` to the `Tree` table without a default value. This is not possible if the table is not empty.
  - Added the required column `trunkCircumference` to the `Tree` table without a default value. This is not possible if the table is not empty.
  - Added the required column `yearPlanted` to the `Tree` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Address" DROP COLUMN "city",
DROP COLUMN "country",
DROP COLUMN "state";

-- AlterTable
ALTER TABLE "Tree" ADD COLUMN     "height" INTEGER NOT NULL,
ADD COLUMN     "trunkCircumference" INTEGER NOT NULL,
ADD COLUMN     "yearPlanted" TIMESTAMP(3) NOT NULL;
