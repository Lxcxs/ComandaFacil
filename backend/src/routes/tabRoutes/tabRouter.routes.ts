import { Router } from "express";
import { authenticateToken } from "../../middleware/autenticateToken";
import { CreateTabController } from "../../controller/tab/CreateTabController";
import { UpdateOrderController } from "../../controller/order/UpdateOrderController";

const tabRouter = Router();

const createTabCtrl = new CreateTabController();
const updateOrderCtrl = new UpdateOrderController();

tabRouter.post("/", authenticateToken, createTabCtrl.handle);
tabRouter.put("/", authenticateToken, updateOrderCtrl.handle);


export { tabRouter };