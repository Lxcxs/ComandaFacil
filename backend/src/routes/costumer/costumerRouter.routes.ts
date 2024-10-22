import { Router } from "express";
import { CreateCostumerController } from "../../controller/costumer/Create";
import { UpdateCostumerStatusController } from "../../controller/costumer/UpdateStatus";
import { GetStoreCostumerController } from "../../controller/costumer/GetStoreCostumerController";

const costumerRouter = Router();

const createCostumerCtrl = new CreateCostumerController();
const updateCostumerStatus = new UpdateCostumerStatusController();
const getStoreCostumerCtrl = new GetStoreCostumerController();

costumerRouter.post("/", createCostumerCtrl.handle);
costumerRouter.get("/:storeId", getStoreCostumerCtrl.handle);
costumerRouter.put("/:costumerId", updateCostumerStatus.handle);

export { costumerRouter };