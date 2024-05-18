import { Router } from "express";
import { CreateCostumerController } from "../../controller/costumer/CreateCostumerController";


const createCostumer = new CreateCostumerController();

const createCostumerRoute = Router();

createCostumerRoute.post("/", createCostumer.handle);

export { createCostumerRoute };
