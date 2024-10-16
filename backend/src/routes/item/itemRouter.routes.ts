import { Router } from "express";
import { CreateItemController } from "../../controller/item/Create";
import { authenticateToken } from "../../middleware/autenticateToken";
import { GetItemController } from "../../controller/item/Get";
import { DeleteItemController } from "../../controller/item/Delete";
import { GetStoreItemController } from "../../controller/item/GetByStore";
import { UpdateItemController } from "../../controller/item/Update";
import { UpdateItemStatusController } from "../../controller/item/UpdateStatus";


const createItemCtrl = new CreateItemController();
const getItemCtrl = new GetItemController();
const deleteItemCtrl = new DeleteItemController();
const getStoreItemCtrl = new GetStoreItemController();
const updateItemCtrl = new UpdateItemController();
const updateItemStatusCtrl = new UpdateItemStatusController();

const itemRouter = Router();

itemRouter.post("/", createItemCtrl.handle);
itemRouter.get("/", getItemCtrl.handle);
itemRouter.get("/:storeId", getStoreItemCtrl.handle);
itemRouter.delete("/:id", deleteItemCtrl.handle);
itemRouter.put("/:id", updateItemCtrl.handle);
itemRouter.put("/:id/status", updateItemStatusCtrl.handle);

export { itemRouter };