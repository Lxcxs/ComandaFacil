import { Router } from "express";
import { CreateWaiterController } from "../../controller/waiter/CreateWaiterController";
import { GetWaiterController } from "../../controller/waiter/GetWaiterController";
import { GetWaiterByStoreController } from "../../controller/waiter/GetWaiterByStoreController";
import { DeleteWaiterController } from "../../controller/waiter/DeleteWaiterController";
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
