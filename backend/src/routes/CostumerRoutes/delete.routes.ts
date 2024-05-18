import { Router } from "express";
import { DeleteCostumerController } from "../../controller/costumer/DeleteCostumerController";

const deleteCostumer = new DeleteCostumerController();

const deleteCostumerRoute = Router();

deleteCostumerRoute.delete("/", deleteCostumer.handle);

export { deleteCostumerRoute };
