import { Router } from "express";
import { CreateAccountController } from "../../controller/User/CreateAccountController";

const createAccountController = new CreateAccountController();

const accountRoutes = Router();

accountRoutes.post("/", createAccountController.handle);

export { accountRoutes };
