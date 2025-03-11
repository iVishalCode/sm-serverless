-- CreateEnum
CREATE TYPE "FeeStatus" AS ENUM ('PENDING', 'PAID');

-- CreateTable
CREATE TABLE "Fee" (
    "id" TEXT NOT NULL,
    "amout" INTEGER NOT NULL,
    "status" "FeeStatus" NOT NULL DEFAULT 'PENDING',
    "dueDate" TIMESTAMP(3) NOT NULL,
    "paidDate" TIMESTAMP(3),
    "studentId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Fee_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Fee" ADD CONSTRAINT "Fee_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE SET NULL ON UPDATE CASCADE;
