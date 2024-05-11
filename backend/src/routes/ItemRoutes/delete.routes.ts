import { Router } from "express";
import { DeleteItemController } from "../../controller/Item/DeleteItemController";

const deleteItem = new DeleteItemController();

const deletItemRoute = Router();

deletItemRoute.delete("/", deleteItem.handle);

export { deletItemRoute };
