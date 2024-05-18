import { Router } from "express";
import { GetCostumerController } from "../../controller/costumer/GetCostumerController";

const getCostumer = new GetCostumerController()

const getCostumerRoute = Router();

getCostumerRoute.get("/", getCostumer.handle);

export { getCostumerRoute };
