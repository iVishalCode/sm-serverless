import { Hono } from "hono";
import adminRouter from "./routes/admin.route";

const app = new Hono();
app.route("/admin", adminRouter);

// Export Hono app for Cloudflare Workers
export default app;
