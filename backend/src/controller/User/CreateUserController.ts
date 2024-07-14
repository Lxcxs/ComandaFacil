import { Response, Request } from "express";
import { CreateUserService } from "../../services/UserServices/CreateUserService";

class CreateUserController {
  async handle(req: Request, res: Response) {
    const { userName, userEmail, userPassword, userDocument } = req.body;

    const accountService = new CreateUserService();

    const account = await accountService.execute({ userName, userEmail, userPassword, userDocument });

    return res.status(201).send(account)
  }
}

export { CreateUserController }