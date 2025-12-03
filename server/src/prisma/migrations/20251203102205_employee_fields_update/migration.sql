/*
  Warnings:

  - You are about to drop the column `age` on the `Employee` table. All the data in the column will be lost.
  - You are about to drop the column `class` on the `Employee` table. All the data in the column will be lost.
  - You are about to drop the column `subjects` on the `Employee` table. All the data in the column will be lost.
  - Added the required column `department` to the `Employee` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hireDate` to the `Employee` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone` to the `Employee` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `Employee` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Employee" DROP COLUMN "age",
DROP COLUMN "class",
DROP COLUMN "subjects",
ADD COLUMN     "department" TEXT NOT NULL,
ADD COLUMN     "hireDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "phone" TEXT NOT NULL,
ADD COLUMN     "status" TEXT NOT NULL;
