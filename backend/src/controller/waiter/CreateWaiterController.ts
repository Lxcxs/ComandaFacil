import { Response, Request } from "express";
import { CreateWaiterService } from "../../services/waiterServices/CreateWaiterService";
import { findHeaders } from "../../utils/findHeaders";

class CreateWaiterController {
  async handle(req: Request, res: Response) {
    const token = findHeaders(req, "authorization");
    const { waiterName, waiterEmail, waiterPassword, storeId } = req.body;

    const waiterService = new CreateWaiterService();

    const result = await waiterService.execute({ token, waiterName, waiterEmail, waiterPassword, storeId });

    return res.status(201).send(result)
  }
}

export { CreateWaiterController }