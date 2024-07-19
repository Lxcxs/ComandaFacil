import { Router } from "express";
import { CreateItemController } from "../../controller/item/CreateItemController";
import { authenticateToken } from "../../middleware/autenticateToken";
import { GetItemController } from "../../controller/item/GetItemController";
import { DeleteItemController } from "../../controller/item/DeleteItemController";


const createItemCtrl = new CreateItemController();
const getItemCtrl = new GetItemController();
const deleteItemCtrl = new DeleteItemController();

const itemRouter = Router();

itemRouter.post("/", authenticateToken, createItemCtrl.handle);
itemRouter.get("/", getItemCtrl.handle);
itemRouter.get("/", authenticateToken, getItemCtrl.handle);
itemRouter.delete("/", authenticateToken, deleteItemCtrl.handle);

export { itemRouter };