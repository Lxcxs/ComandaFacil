import { Router } from "express";
import { CreateCostumerController } from "../../controller/costumer/Create";
import { UpdateCostumerStatusController } from "../../controller/costumer/UpdateStatus";

const costumerRouter = Router();

const createCostumerCtrl = new CreateCostumerController();
const updateCostumerStatus = new UpdateCostumerStatusController();

costumerRouter.post("/", createCostumerCtrl.handle);
costumerRouter.put("/:costumerId", updateCostumerStatus.handle);

export { costumerRouter };