import { Router } from "express";
import { GetCategoryController } from "../../controller/Category/GetCategoryController";

const getCategoryController = new GetCategoryController()

const getCategoryRoute = Router();

getCategoryRoute.get("/", getCategoryController.handle);

export { getCategoryRoute };
