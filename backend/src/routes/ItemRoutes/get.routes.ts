import { Router } from "express";
import { GetItemController } from "../../controller/Item/GetItemController";

const getItemController = new GetItemController()

const getItemRoute = Router();

getItemRoute.get("/", getItemController.handle);

export { getItemRoute };
