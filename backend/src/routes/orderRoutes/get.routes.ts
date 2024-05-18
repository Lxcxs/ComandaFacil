import { Router } from "express";
import { GetOrderController } from "../../controller/order/GetTabController";

const getOrder = new GetOrderController()

const getOrderRoute = Router();

getOrderRoute.get("/", getOrder.handle);

export { getOrderRoute };
