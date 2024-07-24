import { Router } from "express";
import { userRouter } from "./UserRoutes/userRoutes.routes";
import { loginRouter } from "./LoginRoutes/login.routes";
import { storeRouter } from "./storeRoutes/storeRouter.routes";
import { waiterRouter } from "./WaiterRoutes/waiterRouter.routes";
import { categoryRouter } from "./categoryRoutes/categoryRouter.routes";
import { itemRouter } from "./itemRoutes/itemRouter.routes";
import { tableRouter } from "./tableRoutes/tableRouter.routes";
import { costumerRouter } from "./costumerRoutes/costumerRouter.routes";

const routes = Router();

routes.use("/users", userRouter);
routes.use("/stores", storeRouter);
routes.use("/login", loginRouter);
routes.use("/waiters", waiterRouter);
routes.use("/categories", categoryRouter);
routes.use("/items", itemRouter);
routes.use("/tables", tableRouter);
routes.use("/costumers", costumerRouter);

export { routes };
