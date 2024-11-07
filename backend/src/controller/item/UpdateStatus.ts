import { Request, Response } from "express";
import { UpdateItemStatusService } from "../../services/item/UpdateItemStatusService";

class UpdateItemStatusController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id, storeId, itemStatus } = req.body;
    const updatedItem = new UpdateItemStatusService();

    try {
      const result = updatedItem.execute({
        id: id,
        storeId: storeId,
        status: itemStatus,
      });
      return res.status(200).json(result);
    } catch (error) {
      return res
        .status(400)
        .json({
          error:
            error instanceof Error
              ? error.message
              : "Error updating item status",
        });
    }
  }
}

export { UpdateItemStatusController };
