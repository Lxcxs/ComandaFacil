import { Request, Response } from "express";
import { UpdateAccountService } from "../../services/AccountServices/UpdateAccountService";

class UpdateAccountController {
  async handle(req: Request, res: Response) {
    const { id, userEmail } = req.body;

    const accountService = new UpdateAccountService();

    const result = await accountService.execute({ id, userEmail });

    return result;
  }
}

export { UpdateAccountController };
