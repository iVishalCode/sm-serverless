import { Hono } from "hono";
import { adminRouter } from "./routes/adminRoutes";
// Create the main Hono app
const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();
app.use("*", async (c, next) => {
  await next();
  c.header("Access-Control-Allow-Origin", "*"); // Allow all origins
  c.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  c.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
});
app.route("/api/v1/admin", adminRouter);
export default app;
