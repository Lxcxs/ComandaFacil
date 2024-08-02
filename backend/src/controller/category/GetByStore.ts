import { Request, Response } from "express";
import { GetStoreCategoryService } from "../../services/category/GetByStoreService";
import { findHeaders } from "../../utils/findHeaders";

export class GetStoreCategoryController {
  async handle(req: Request, res: Response) {
    try {
      const categoryService = new GetStoreCategoryService();
      const token = findHeaders(req, "authorization");
      const storeId = token.storeId;
      const result = await categoryService.execute(storeId);
      
      return res.status(200).json(result);
    } catch (error) {
      return res.status(400).json({ error: `Controller: ${error instanceof Error ? error.message : 'error getting store categories'}` });
    }
  }
}
