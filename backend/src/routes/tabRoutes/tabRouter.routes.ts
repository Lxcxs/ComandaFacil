import { Router } from "express";
import { authenticateToken } from "../../middleware/autenticateToken";
import { CreateTabController } from "../../controller/tab/CreateTabController";

const tabRouter = Router();

const createTabCtrl = new CreateTabController();

tabRouter.post("/", authenticateToken, createTabCtrl.handle);

export { tabRouter };