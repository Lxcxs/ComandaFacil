import { Router } from "express";
import { authenticateToken } from "../../middleware/autenticateToken";
import { CreateOrderController } from "../../controller/order/Create";
import { UpdateOrderStatusController } from "../../controller/order/UpdateOrderStatus";

const orderRouter = Router();

const createOrderCtrl = new CreateOrderController();
const updateorderCtrl = new UpdateOrderStatusController();


orderRouter.post("/", authenticateToken, createOrderCtrl.handle);
orderRouter.put("/", authenticateToken, updateorderCtrl.handle);

export { orderRouter };