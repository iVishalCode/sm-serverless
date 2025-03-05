import { Hono } from "hono";
import { adminRouter } from "./routes/adminRoutes";
// Create the main Hono app
const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();
app.route("/api/v1/admin", adminRouter);
export default app;
