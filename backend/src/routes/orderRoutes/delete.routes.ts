import { Router } from "express";
import { DeleteOrderController } from "../../controller/order/DeleteTabController";

const deleteOrder = new DeleteOrderController();

const deleteOrderRoute = Router();

deleteOrderRoute.delete("/", deleteOrder.handle);

export { deleteOrderRoute };
