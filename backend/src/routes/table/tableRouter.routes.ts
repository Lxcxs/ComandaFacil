import { Router } from "express";

import { CreateTableController } from "../../controller/table/Create";
import { authenticateToken } from "../../middleware/autenticateToken";
import { GetTableController } from "../../controller/table/Get";
import { GetStoreTableController } from "../../controller/table/GetByStore";
import { UpdateTableStatusController } from "../../controller/table/UpdataStatus";
import { UpdateTableAmountController } from "../../controller/table/UpdateTableAmountController";

const createTableCtrl = new CreateTableController();
const getTableCtrl = new GetTableController();
const getStoreTableCtrl = new GetStoreTableController();
const updateTableStatus = new UpdateTableStatusController();
const updateTableAmount = new UpdateTableAmountController();

const tableRouter = Router();

tableRouter.post("/", createTableCtrl.handle);
tableRouter.get("/", getTableCtrl.handle);
tableRouter.get("/:storeId", getStoreTableCtrl.handle);
tableRouter.put("/:storeId/:tableId", updateTableStatus.handle);
tableRouter.put("/amount/:storeId/:tableId", updateTableAmount.handle);

export { tableRouter };