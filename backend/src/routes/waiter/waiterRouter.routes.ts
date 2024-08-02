import { Router } from "express";
import { CreateWaiterController } from "../../controller/waiter/Create";
import { GetWaiterController } from "../../controller/waiter/Get";
import { GetWaiterByStoreController } from "../../controller/waiter/GetByStore";
import { DeleteWaiterController } from "../../controller/waiter/Delete";
import { authenticateToken } from "../../middleware/autenticateToken";

const createWaiterCtrl = new CreateWaiterController();
const getWaiterCtrl = new GetWaiterController();
const getWaiterByStoreCtrl = new GetWaiterByStoreController();
const deleteWaiterCtrl = new DeleteWaiterController();

const waiterRouter = Router();

waiterRouter.post("/", authenticateToken, createWaiterCtrl.handle);
waiterRouter.get("/" , getWaiterCtrl.handle);
waiterRouter.get("/:userId", authenticateToken ,getWaiterByStoreCtrl.handle);
waiterRouter.delete("/", authenticateToken ,deleteWaiterCtrl.handle);

export { waiterRouter };
