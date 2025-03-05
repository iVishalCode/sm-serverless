import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";

export const getPrisma = (env: { DATABASE_URL: string }) => {
  const prisma = new PrismaClient({
    datasources: {
      db: {
        url: env.DATABASE_URL, // Use env variable from Cloudflare Workers
      },
    },
  }).$extends(withAccelerate());

  return prisma;
};
