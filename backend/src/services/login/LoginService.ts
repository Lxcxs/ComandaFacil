import prismaClient from "../../prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { validateFields } from "../../utils/validateFields";

const SECRET_KEY = process.env.JWT_SECRET_KEY || "";

if (!SECRET_KEY) {
  throw new Error("JWT Secret Key is not defined");
}

interface AuthenticateUserServiceParams {
  loginEmail: string;
  loginPassword: string;
  accountType: "admin" | "employee";
}

class AuthenticateUserService {

  private async findUserByEmail(accountType: "admin" | "employee", email: string) {
    if (accountType === "admin") {
      return prismaClient.user.findUnique({ where: { userEmail: email } });
    } else if (accountType === "employee") {
      return prismaClient.waiter.findUnique({ where: { waiterEmail: email } });
    }
    throw new Error("Invalid account type");
  }

  async execute({ loginEmail, loginPassword, accountType }: AuthenticateUserServiceParams) {
    validateFields({ loginEmail, loginPassword, accountType });

    const user = await this.findUserByEmail(accountType, loginEmail);

    if (!user) {
      throw new Error("Invalid email or password");
    }

    const passwordEntered = accountType === "admin" ? (user as any).userPassword : (user as any).waiterPassword;

    if (!passwordEntered || !(await bcrypt.compare(loginPassword, passwordEntered))) {
      throw new Error("Invalid password");
    }

    const userId = accountType === "admin" ? user.id : (user as any).storeId;
    const findStore = await prismaClient.store.findFirst({ where: { userId } });
    const storeId = findStore?.id;

    const token = jwt.sign({ userId, storeId }, SECRET_KEY, {
      expiresIn: "12h",
    });

    return { token, user };
  }
}

export { AuthenticateUserService };
