import { Router } from "express";
import { authenticateToken } from "../../middleware/autenticateToken";
import { CreateOrderController } from "../../controller/order/CreateOrderController";

const orderRouter = Router();

const createOrderCtrl = new CreateOrderController();


orderRouter.post("/", authenticateToken, createOrderCtrl.handle);


export { orderRouter };