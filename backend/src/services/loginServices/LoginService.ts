import prismaClient from "../../prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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
    if (!loginEmail || !loginPassword || !accountType) {
      throw new Error("Please fill in all fields");
    }

    const user = await this.findUserByEmail(accountType, loginEmail);

    if (!user) {
      throw new Error("Invalid email or password");
    }

    let userPassword: string | undefined;
    if (accountType === "admin") {
      userPassword = (user as any).userPassword;

    } else if (accountType === "employee") {
      userPassword = (user as any).waiterPassword; 

    } else {
      throw new Error("Invalid account type");
    }

    if (!userPassword || !(await bcrypt.compare(loginPassword, userPassword))) {
      throw new Error("Invalid password");
    }

    const userId = accountType === "admin" ? user.id : (user as any).storeId;

    const token = jwt.sign({ userId, userType: accountType }, SECRET_KEY, {
      expiresIn: "5m",
    });

    return { token, user };
  }
}
export { AuthenticateUserService };