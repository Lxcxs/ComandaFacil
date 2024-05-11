import { Router } from "express";
import { CreateCategoryController } from "../../controller/Category/CreateCategoryController";

const createCategoryController = new CreateCategoryController();

const createCategory = Router();

createCategory.post("/", createCategoryController.handle);

export { createCategory };
