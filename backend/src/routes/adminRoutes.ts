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

  const adhar_No = c.req.param("adhar_No"); // Correct way to get URL params in Hono

  const student = await prisma.student.findUnique({
    where: {
      adhar_No,
    },
  });

  return c.json(student); // Ensure a response is returned
});

adminRouter.delete("/deletestudent", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const student = await prisma.student.deleteMany({});
  return c.json(student);
});
