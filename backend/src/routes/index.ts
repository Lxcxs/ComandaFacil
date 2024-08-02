import { Router } from "express";
import { userRouter } from "./user/userRoutes.routes";
import { loginRouter } from "./login/login.routes";
import { storeRouter } from "./store/storeRouter.routes";
import { waiterRouter } from "./waiter/waiterRouter.routes";
import { categoryRouter } from "./category/categoryRouter.routes";
import { itemRouter } from "./item/itemRouter.routes";
import { tableRouter } from "./table/tableRouter.routes";
import { costumerRouter } from "./costumer/costumerRouter.routes";
import { tabRouter } from "./costumerTab/tabRouter.routes";
import { orderRouter } from "./order/orderRouter.routes";

const routes = Router();

routes.use("/users", userRouter);
routes.use("/stores", storeRouter);
routes.use("/login", loginRouter);
routes.use("/waiters", waiterRouter);
routes.use("/categories", categoryRouter);
routes.use("/items", itemRouter);
routes.use("/tables", tableRouter);
routes.use("/costumers", costumerRouter);
routes.use("/tabs", tabRouter);
routes.use("/orders", orderRouter);

export { routes };