import { Request, Response } from "express";
import { UpdateTableStatusService } from "../../services/table/UpdateStatusService";

export class UpdateTableStatusController {
  async handle(req: Request, res: Response) {
    const { storeId, tableId } = req.params; // Capturando storeId e tableId
    const { status } = req.body;

    const service = new UpdateTableStatusService();

    try {
      const updatedTable = await service.execute(Number(storeId), Number(tableId), status); // Passando storeId e tableId
      return res.json(updatedTable);
    } catch (error) {
      return res.status(400).json({
        message: `Controller: ${error instanceof Error ? error.message : 'error updating table status'}`,
      });
    }
  }
}
