import { Response, Request } from "express";
import { CreateAccountDTO } from "../types/CreateAccountDTO";
import { CreateAccountService } from "../services/CreateAccountService";

class CreateAccountController {
  async handle(req: Request, res: Response) {
    const { name, email, password, table_amount } = req.body;

    const accountService = new CreateAccountService();

    const account = await accountService.execute({ name, email, password, table_amount });

    return res.status(201).send(account)
  }
}

export { CreateAccountController }