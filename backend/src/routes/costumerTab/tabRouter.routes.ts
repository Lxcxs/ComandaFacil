import { Router } from "express";
import { authenticateToken } from "../../middleware/autenticateToken";
import { CreateTabController } from "../../controller/tab/Create";
import { UpdateTabValueController } from "../../controller/tab/UpdateTabValueController";

const tabRouter = Router();

const createTabCtrl = new CreateTabController();
const updateOrderCtrl = new UpdateTabValueController();

tabRouter.post("/", authenticateToken, createTabCtrl.handle);
tabRouter.put("/", authenticateToken, updateOrderCtrl.handle);


export { tabRouter };