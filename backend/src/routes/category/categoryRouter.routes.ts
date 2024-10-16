import { Router } from "express";
import { CreateCategoryController } from "../../controller/category/Create";
import { authenticateToken } from "../../middleware/autenticateToken";
import { DeleteCategoryController } from "../../controller/category/Delete";
import { GetCategoryController } from "../../controller/category/Get";
import { GetStoreCategoryController } from "../../controller/category/GetByStore";

const categoryRouter = Router();

const createCategoryCtrl = new CreateCategoryController();
const deleteCategoryCtrl = new DeleteCategoryController();
const getCategoryCtrl = new GetCategoryController();
const getStoreCategoryCtrl = new GetStoreCategoryController();

categoryRouter.post("/", createCategoryCtrl.handle);
categoryRouter.delete("/:id", deleteCategoryCtrl.handle);
categoryRouter.get("/", getCategoryCtrl.handle);
categoryRouter.get("/:storeId", getStoreCategoryCtrl.handle);

export { categoryRouter };