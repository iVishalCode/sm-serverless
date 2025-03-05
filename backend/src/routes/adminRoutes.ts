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
