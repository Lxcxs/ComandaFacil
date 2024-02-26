import { Router } from "express";
import { ListAccountController } from "../controller/ListAccountController";

const listAccountController = new ListAccountController()

const listAccountRoutes = Router();

listAccountRoutes.get("/", listAccountController.handle);

export { listAccountRoutes };
