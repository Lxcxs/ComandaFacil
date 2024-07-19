import { Router } from "express";
import { CreateCategoryController } from "../../controller/category/CreateCategoryController";
import { authenticateToken } from "../../middleware/autenticateToken";
import { DeleteCategoryController } from "../../controller/category/DeleteCategoryController";
import { GetCategoryController } from "../../controller/category/GetCategoryController";
import { GetStoreCategoryController } from "../../controller/category/GetStoreCategoryController";

const categoryRouter = Router();

const createCategoryCtrl = new CreateCategoryController();
const deleteCategoryCtrl = new DeleteCategoryController();
const getCategoryCtrl = new GetCategoryController();
const getStoreCategoryCtrl = new GetStoreCategoryController();

categoryRouter.post("/", authenticateToken, createCategoryCtrl.handle);
categoryRouter.delete("/", authenticateToken, deleteCategoryCtrl.handle);
categoryRouter.get("/", getCategoryCtrl.handle);
categoryRouter.get("/", authenticateToken, getStoreCategoryCtrl.handle);


export { categoryRouter };