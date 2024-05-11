import { Router } from "express";
import { UpdateItemController } from "../../controller/Item/UpdateItemController";

const updateItemControllera = new UpdateItemController();

const updateItemRoute = Router();

updateItemRoute.put("/", updateItemControllera.handle);

export { updateItemRoute };
