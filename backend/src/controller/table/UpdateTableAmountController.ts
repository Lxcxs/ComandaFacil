import { Request, Response } from "express";
import { UpdateTableAmountService } from "../../services/table/UpdateTableAmountService";

export class UpdateTableAmountController {
  async handle(req: Request, res: Response) {
    const { storeId, tableId } = req.params; // Capturando storeId e tableId
    const { newAmountValue } = req.body;

    const service = new UpdateTableAmountService();

    try {
      const updatedTable = await service.execute(Number(storeId), Number(tableId), newAmountValue); // Passando storeId e tableId
      return res.json(updatedTable);
    } catch (error) {
      return res.status(400).json({
        message: `Controller: ${error instanceof Error ? error.message : 'error updating table status'}`,
      });
    }
  }
}
