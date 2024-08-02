import { Router } from "express";
import { CreateItemController } from "../../controller/item/Create";
import { authenticateToken } from "../../middleware/autenticateToken";
import { GetItemController } from "../../controller/item/Get";
import { DeleteItemController } from "../../controller/item/Delete";


const createItemCtrl = new CreateItemController();
const getItemCtrl = new GetItemController();
const deleteItemCtrl = new DeleteItemController();

const itemRouter = Router();

itemRouter.post("/", authenticateToken, createItemCtrl.handle);
itemRouter.get("/", getItemCtrl.handle);
itemRouter.get("/", authenticateToken, getItemCtrl.handle);
itemRouter.delete("/", authenticateToken, deleteItemCtrl.handle);

export { itemRouter };