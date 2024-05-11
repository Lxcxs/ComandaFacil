import { Response, Request } from "express";
import { CreateAccountService } from "../../services/AccountServices/CreateAccountService";

class CreateAccountController {
  async handle(req: Request, res: Response) {
    const { userName, userEmail, userPassword, userBrand, userTableAmount, userDocument } = req.body;

    const accountService = new CreateAccountService();

    const account = await accountService.execute({ userName, userEmail, userPassword, userBrand, userTableAmount, userDocument });

    return res.status(201).send(account)
  }
}

export { CreateAccountController }