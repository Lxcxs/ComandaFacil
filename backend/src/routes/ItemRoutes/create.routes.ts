import { Router } from "express";
import { CreateItemController } from "../../controller/Item/CreateItemController";


const createItem = new CreateItemController();

const createItemRoute = Router();

createItemRoute.post("/", createItem.handle);

export { createItemRoute };
