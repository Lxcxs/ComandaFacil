import { Request, Response } from "express";
import { DeleteAccountServive } from "../services/DeleteAccountService";

class DeleteAccountController {
  async handle(req: Request, res: Response) {
    const { id } = req.query as { id: string };

    const accountService = new DeleteAccountServive();

    const result = await accountService.execute({ id });

    res.status(200).send(result);
  }
}

export { DeleteAccountController };
