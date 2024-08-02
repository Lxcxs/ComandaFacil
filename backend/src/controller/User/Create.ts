import { Response, Request } from "express";
import { CreateUserService } from "../../services/user/CreateService";

export class CreateUserController {
  async handle(req: Request, res: Response) {
    try {
      const { userName, userEmail, userPassword, userDocument } = req.body;
      const accountService = new CreateUserService();
      const account = await accountService.execute({ userName, userEmail, userPassword, userDocument });

      return res.status(201).json(account);
    } catch (error) {
      return res.status(400).json({ error: `Controller: ${error instanceof Error ? error.message : 'error creating user.'}` });
    }
  }
}