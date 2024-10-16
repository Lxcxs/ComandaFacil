import { Router } from "express";
import { authenticateToken } from "../../middleware/autenticateToken";
import { CreateOrderController } from "../../controller/order/Create";
import { UpdateOrderStatusController } from "../../controller/order/UpdateOrderStatus";
import { GetOrdersByStoreController } from "../../controller/order/GetOrdersByStoreController";

const orderRouter = Router();

const createOrderCtrl = new CreateOrderController();
const updateorderCtrl = new UpdateOrderStatusController();
const getOrdersByStoreCtrl = new GetOrdersByStoreController();


orderRouter.post("/", createOrderCtrl.handle);
orderRouter.get("/:storeId", getOrdersByStoreCtrl.handle);
orderRouter.put("/:orderId", updateorderCtrl.handle);

export { orderRouter };