import { Request, Response } from "express";
import { UpdateUserService } from "../../services/user/UpdateStatusService";

export class UpdateUserController {
  async handle(req: Request, res: Response) {
    try {
      const { id, userEmail } = req.body;
      const accountService = new UpdateUserService();
      const result = await accountService.execute({ id, userEmail });

      return res.status(200).json(result);
    } catch (error) {
      return res.status(400).json({ error: `Controller: ${error instanceof Error ? error.message : 'error updating user.'}` });
    }
  }
}