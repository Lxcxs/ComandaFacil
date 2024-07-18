import { Response, Request } from "express";
import { CreateWaiterService } from "../../services/wainterServices/CreateWaiterService";

class CreateWaiterController {
  async handle(req: Request, res: Response) {
    const token = req.headers["authorization"]?.replace("Bearer ", "")
    if (!token) {
      throw new Error("controller: Invalid token.")
    }
    const { waiterName, waiterEmail, waiterPassword, storeId } = req.body;

    const waiterService = new CreateWaiterService();

    const result = await waiterService.execute({ token, waiterName, waiterEmail, waiterPassword, storeId });

    return res.status(201).send(result)
  }
}

export { CreateWaiterController }