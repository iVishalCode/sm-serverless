import { Context } from "hono";
import prisma from "../config/db";

export const addStudent = async (c: Context): Promise<any> => {
  try {
    const body = await c.req.json();
    const {
      name,
      fatherName,
      motherName,
      gender,
      grade,
      address,
      profilePic,
      rollNumber,
      bloodGroup,
      mobileNumber,
    } = body;

    // 🛠️ Ensure Required Fields Exist (Basic Validation)
    if (!name || !rollNumber || !grade || !mobileNumber) {
      return c.json({ error: "Missing required fields!" }, { status: 400 });
    }

    // 🚀 Create Student Entry in Database
    const student = await prisma.student.create({
      data: {
        name,
        fatherName,
        motherName,
        gender,
        grade,
        address,
        profilePic,
        rollNumber,
        bloodGroup,
        mobileNumber,
      },
    });

    // ✅ Return Success Response
    return c.json(
      { msg: "Student created successfully!", student },
      { status: 201 }
    );
  } catch (error) {
    console.error("❌ Error adding student:", error);

    return c.json(
      { error: "Something went wrong, please try again later!" },
      { status: 500 }
    );
  }
};
