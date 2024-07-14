import { Request, Response } from "express";
import { UpdateUserService } from "../../services/UserServices/UpdateUserService";

class UpdateUserController {
  async handle(req: Request, res: Response) {
    const { id, userEmail } = req.body;

    const accountService = new UpdateUserService();

    const result = await accountService.execute({ id, userEmail });

    return result;
  }
}

export { UpdateUserController };
