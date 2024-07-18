import { Router } from "express";
import { userRouter } from "./UserRoutes/userRoutes.routes";
import { loginRouter } from "./LoginRoutes/login.routes";
import { storeRouter } from "./storeRoutes/storeRouter.routes";
import { waiterRouter } from "./waiterRoutes/waiterRouter.routes";


const routes = Router();

routes.use("/users", userRouter);
routes.use("/login", loginRouter);
routes.use("/waiter", waiterRouter);

routes.use("/stores", storeRouter);

export { routes };
