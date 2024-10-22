import { Router } from "express";
import { authenticateToken } from "../../middleware/autenticateToken";
import { CreateTabController } from "../../controller/tab/Create";
import { UpdateTabValueController } from "../../controller/tab/UpdateTabValueController";
import { GetCostumerTabController } from "../../controller/tab/GetCostumerTabController";
import { UpdateTabStatusController } from "../../controller/tab/UpdateTabStatusController";
import { GetStoreTabController } from "../../controller/tab/GetStoreTabController";

const tabRouter = Router();

const createTabCtrl = new CreateTabController();
const updateTabValueCtrl = new UpdateTabValueController();
const getCostumertabCtrl = new GetCostumerTabController();
const updateTabStatusCtrl = new UpdateTabStatusController();
const getStoreTabCtrl = new GetStoreTabController();

tabRouter.post("/", createTabCtrl.handle);
tabRouter.get("/:costumerId", getCostumertabCtrl.handle);
tabRouter.get("/store/:storeId", getStoreTabCtrl.handle);
tabRouter.put("/", updateTabValueCtrl.handle);
tabRouter.put("/desassociate", updateTabStatusCtrl.handle);

export { tabRouter };