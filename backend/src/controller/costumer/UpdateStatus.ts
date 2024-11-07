import { Request, Response } from "express";
import { UpdateCustomerStatusService } from "../../services/customer/UpdateService";

interface UpdateCostumerStatusDTO {
  costumerId: number;
}

export class UpdateCostumerStatusController {
  private updateCostumerStatusService: UpdateCustomerStatusService;

  constructor() {
    this.updateCostumerStatusService = new UpdateCustomerStatusService();
  }

  async handle(req: Request, res: Response) {
    const { costumerId }: UpdateCostumerStatusDTO = req.body;

    try {
      const updatedCostumer = await this.updateCostumerStatusService.execute({ customerId: costumerId });
      return res.status(200).json(updatedCostumer);
    } catch (error) {
      return res.status(400).json({ message: `Service: ${error instanceof Error ? error.message : 'error updating customer status'}` });
    }
  }
}
