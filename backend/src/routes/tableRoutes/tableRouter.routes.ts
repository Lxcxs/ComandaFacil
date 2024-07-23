import { Router } from "express";

import { CreateTableController } from "../../controller/table/CreateTableController";
import { authenticateToken } from "../../middleware/autenticateToken";
import { GetTableController } from "../../controller/table/GetTableController";
import { GetStoreTableController } from "../../controller/table/GetStoreTableController";

const createTableCtrl = new CreateTableController();
const getTableCtrl = new GetTableController();
const getStoreTableCtrl = new GetStoreTableController();

const tableRouter = Router();

tableRouter.post("/", createTableCtrl.handle);
tableRouter.get("/", getTableCtrl.handle);
tableRouter.get("/:storeId", authenticateToken, getStoreTableCtrl.handle);

export { tableRouter };