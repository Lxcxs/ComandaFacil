import { Router } from "express";
import { DeleteCategoryController } from "../../controller/Category/DeleteCategoryController";

const deleteCategory = new DeleteCategoryController();

const deleteCategoryRoute = Router();

deleteCategoryRoute.delete("/", deleteCategory.handle);

export { deleteCategoryRoute };
