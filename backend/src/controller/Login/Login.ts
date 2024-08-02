import { Request, Response } from "express";
import { AuthenticateUserService } from "../../services/login/LoginService";

export class LoginController {
  async handle(req: Request, res: Response) {
    try {
      const { loginEmail, loginPassword, accountType } = req.body;
      const authenticateUserService = new AuthenticateUserService();
      const { token, user } = await authenticateUserService.execute({
        loginEmail,
        loginPassword,
        accountType
      });

      return res.json({ token, user });
    } catch (error) {
      return res.status(400).json({ error: `Controller: ${error instanceof Error ? error.message : 'login error'}` });
    }
  }
}