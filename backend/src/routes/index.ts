import { Router } from "express";
import { userRouter } from "./UserRoutes/userRoutes.routes";
import { loginRouter } from "./LoginRoutes/login.routes";
import { storeRouter } from "./storeRoutes/storeRouter.routes";
import { waiterRouter } from "./WaiterRoutes/waiterRouter.routes";
import { categoryRouter } from "./categoryRoutes/categoryRouter.routes";


const routes = Router();

routes.use("/users", userRouter);
routes.use("/login", loginRouter);
routes.use("/waiters", waiterRouter);
routes.use("/categories", categoryRouter);

routes.use("/stores", storeRouter);

export { routes };
