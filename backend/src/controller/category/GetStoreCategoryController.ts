import { Request, Response } from "express";
import { GetStoreCategoryService } from "../../services/categoryServices/GetStoreCategoryService";
import { verifyToken } from "../../autentication/Auth";
import { JwtPayload } from "jsonwebtoken";

class GetStoreCategoryController {
  async handle(req: Request, res: Response) {
    const token = req.headers["authorization"]?.replace("Bearer ", "");
    const categoryService = new GetStoreCategoryService();

    const decodedToken: JwtPayload | null = verifyToken(token as any);
    const result = await categoryService.execute({ storeId: decodedToken?.storeId });
    return res.status(201).json(result);
  }
};
export { GetStoreCategoryController };