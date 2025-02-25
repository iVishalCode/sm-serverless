import { Context } from "hono";
import prisma from "../config/db";

export const addStudent = async (c: Context) => {
  try {
    const body = await c.req.json();
    const {
      name,
      fatherName,
      motherName,
      gender,
      grade,
      address,
      prifilePic,
      rollNumber,
      bloodGroup,
      mobileNumber,
      feeStructureId,
    } = body;
  } catch (error) {}
};
