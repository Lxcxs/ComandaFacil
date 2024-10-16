import { Request, Response } from "express";
import { GetStoreCategoryService } from "../../services/category/GetByStoreService";
import { findHeaders } from "../../utils/findHeaders";

export class GetStoreCategoryController {
  async handle(req: Request, res: Response) {
    try {
      const { storeId } = req.params; // Obtém o storeId do params
      const id = Number(storeId); // Converte storeId para um número

      if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid store ID." });
      }

      const categoryService = new GetStoreCategoryService();
      const result = await categoryService.execute({ storeId: id });

      return res.status(200).json(result);
    } catch (error) {
      return res.status(400).json({ error: `Controller: ${error instanceof Error ? error.message : 'error getting store categories'}` });
    }
  }
}
