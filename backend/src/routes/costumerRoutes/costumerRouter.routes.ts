import { Router } from "express";
import { CreateCostumerController } from "../../controller/costumer/CreateCostumerController";

const costumerRouter = Router();

const createCostumerCtrl = new CreateCostumerController();

costumerRouter.post("/", createCostumerCtrl.handle);

export { costumerRouter };