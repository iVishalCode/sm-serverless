import { Hono } from "hono";
import { addStudent } from "../controllers/admin.controllers";

const adminRouter = new Hono();

adminRouter.post("/add_student", addStudent);

export default adminRouter;
