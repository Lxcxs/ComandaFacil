import { Request, Response } from "express";
import { UpdateCostumerStatusService } from "../../services/costumer/UpdateService";

interface UpdateCostumerStatusDTO {
  costumerId: number;
}

export class UpdateCostumerStatusController {
  private updateCostumerStatusService: UpdateCostumerStatusService;

  constructor() {
    this.updateCostumerStatusService = new UpdateCostumerStatusService();
  }

  async handle(req: Request, res: Response) {
    const { costumerId }: UpdateCostumerStatusDTO = req.body;

    try {
      const updatedCostumer = await this.updateCostumerStatusService.execute({ costumerId });
      return res.status(200).json(updatedCostumer);
    } catch (error) {
      return res.status(400).json({ message: `Service: ${error instanceof Error ? error.message : 'error updating customer status'}` });
    }
  }
}
