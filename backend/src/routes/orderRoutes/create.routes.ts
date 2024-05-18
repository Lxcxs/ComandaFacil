import { Router } from "express";
import { CreateOrderController } from "../../controller/order/CreateOrderController";

const createOrder = new CreateOrderController();

const createOrderRoute = Router();

createOrderRoute.post("/", createOrder.handle);

export { createOrderRoute };
