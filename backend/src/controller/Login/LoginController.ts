import { Request, Response } from "express";
import { AuthenticateUserService } from "../../services/loginServices/LoginService";

class LoginController {
  async handle(req: Request, res: Response) {

    const { loginEmail, loginPassword, accountType } = req.body;
    const authenticateUserService = new AuthenticateUserService();

    const { token, user } = await authenticateUserService.execute({
      loginEmail,
      loginPassword,
      accountType
    });

    return res.json({ token, user });
  }
}
export { LoginController };