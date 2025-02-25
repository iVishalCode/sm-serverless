import prisma from "./config/db";

async function testDB() {
  try {
    await prisma.$connect();
    console.log("✅ Prisma connection successful!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Prisma connection failed:", error);
    process.exit(1);
  }
}

testDB();
