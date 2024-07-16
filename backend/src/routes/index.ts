import { Router } from "express";
import { userRouter } from "./UserRoutes/userRoutes.routes";
import { loginRouter } from "./UserRoutes/login.routes";
import { storeRouter } from "./storeRoutes/storeRouter.routes";


const routes = Router();

routes.use("/users", userRouter);
routes.use("/login", loginRouter);

routes.use("/stores", storeRouter);

export { routes };
