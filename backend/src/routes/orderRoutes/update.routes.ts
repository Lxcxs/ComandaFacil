import { Router } from "express";
import { UpdateCategoryController } from "../../controller/Category/UpdateCategoryController";

const updateCategoryControllera = new UpdateCategoryController();

const updateCategoryRoute = Router();

updateCategoryRoute.put("/", updateCategoryControllera.handle);

export { updateCategoryRoute };
