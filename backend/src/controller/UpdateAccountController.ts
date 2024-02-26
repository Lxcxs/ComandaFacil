import { Request, Response } from "express";
import { UpdateAccountService } from "../services/UpdateAccountService";

class UpdateAccountController {
  async handle(req: Request, res: Response) {
    const { id, email } = req.body;

    const accountService = new UpdateAccountService();

    const result = await accountService.execute({ id, email });

    return result;
  }
}

export { UpdateAccountController };
