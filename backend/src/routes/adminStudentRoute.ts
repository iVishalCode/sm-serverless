import { PrismaClient } from "@prisma/client/edge";

import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";

// Define Hono router
export const adminRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

adminRouter.post("/addstudent", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL, // Use `datasourceUrl` instead of `datasources`
  }).$extends(withAccelerate());

  const body = await c.req.json();
  const student = await prisma.student.create({
    data: {
      name: body.name,
      adhar_No: body.adhar_No,
      fatherName: body.fatherName,
      motherName: body.motherName,
      address: body.address,
      grade: body.grade,
      dob: body.dob,
      mobile_No: body.mobile_No,
      imageUrl: body.imageUrl,
    },
  });

  return c.json(
    {
      msg: "Student created successfully",
      student,
    },
    201
  );
});
adminRouter.get("/getstudent", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const body = await c.req.json();
  const student = await prisma.student.findMany();
  return c.json(student);
});
adminRouter.get("/getstudent/:adhar_No", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const adhar_No = c.req.param("adhar_No");

  const student = await prisma.student.findUnique({
    where: { adhar_No },
    include: {
      fees: true, // Fetch all fee records for the student
    },
  });

  if (!student) {
    return c.json({ error: "Student not found" }, 404);
  }

  return c.json(student);
});

adminRouter.delete("/deletestudent", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const student = await prisma.student.deleteMany({});
  return c.json(student);
});

adminRouter.post("/fee/add", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const body = await c.req.json();
  const { adhar_No, amount, dueDate } = body;
  if (!adhar_No || !amount || !dueDate) {
    return c.json(
      {
        err: " Missing the required Fields",
      },
      400
    );
  }
  try {
    const student = await prisma.student.findUnique({
      where: {
        adhar_No,
      },
    });
    if (!student) {
      return c.json(
        {
          err: " Student not found",
        },
        404
      );
    }
    // Add a new Fee
    const fee = await prisma.fee.create({
      data: {
        studentId: adhar_No,
        amount,
        dueDate: new dueDate(),
        status: "PENDING",
      },
    });
    return c.json(
      {
        msg: " fee added SuccessFully!",
        fee,
      },
      201
    );
  } catch (error) {
    return c.json(
      {
        err: "Error adding the fee",
      },
      500
    );
  }
});
adminRouter.put("/fee/update/:feeId", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const feeId = c.req.param("feeId");
  const body = await c.req.json();
  const { status } = body;

  if (!status || (status !== "paid" && status !== "pending")) {
    return c.json({ error: "Invalid status" }, 400);
  }

  try {
    const updatedFee = await prisma.fee.update({
      where: { id: feeId },
      data: {
        status,
        paidDate: status === "paid" ? new Date() : null,
      },
    });

    return c.json({ message: "Fee updated successfully", updatedFee });
  } catch (error) {
    return c.json({ error: "Error updating fee" }, 500);
  }
});

adminRouter.delete("/fee/delete/:feeId", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const feeId = c.req.param("feeId");

  try {
    await prisma.fee.delete({
      where: { id: feeId },
    });

    return c.json({ message: "Fee deleted successfully" });
  } catch (error) {
    return c.json({ error: "Error deleting fee" }, 500);
  }
});
