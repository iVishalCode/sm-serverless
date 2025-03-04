import { PrismaClient } from '@prisma/client';

// Use Prisma Accelerator (Data Proxy)
const prisma = new PrismaClient();

export { prisma };
