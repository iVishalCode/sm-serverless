-- CreateTable
CREATE TABLE "Student" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "adhar_No" TEXT NOT NULL,
    "fatherName" TEXT NOT NULL,
    "motherName" TEXT NOT NULL,
    "dob" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "grade" TEXT NOT NULL,
    "mobile_No" TEXT NOT NULL,

    CONSTRAINT "Student_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Student_adhar_No_key" ON "Student"("adhar_No");
