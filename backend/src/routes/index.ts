import { Router } from "express";
import { userRouter } from "./UserRoutes/userRoutes.routes";


const routes = Router();

routes.use("/users", userRouter);

export { routes };
