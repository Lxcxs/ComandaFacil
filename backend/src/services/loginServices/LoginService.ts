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
  async execute({ loginEmail, loginPassword,accountType }: AuthenticateUserServiceParams) {

    if (!loginEmail || !loginPassword || !accountType) {
      throw new Error("Please fill in all fields");
    }

    let user;
    let userPassword;
    let userType;

    switch (accountType) {
      case "admin":
        user = await prismaClient.user.findUnique({
          where: { userEmail: loginEmail },
        });
        userPassword = user?.userPassword;
        userType = "admin";
        break;

      case "employee":
        user = await prismaClient.waiter.findUnique({
          where: { waiterEmail: loginEmail },
        });
        userPassword = user?.waiterPassword;
        userType = "employee";
        break;

      default:
        throw new Error("Invalid account type");
    }

    if (!user || !userPassword) {
      throw new Error("Invalid email or password");
    }

    const passwordMatch = await bcrypt.compare(loginPassword, userPassword);
    if (!passwordMatch) {
      throw new Error("Invalid password");
    }

    const token = jwt.sign({ userId: user.id, userType }, SECRET_KEY, {
      expiresIn: "5m",
    });

    return { token, user };
  }
}
export { AuthenticateUserService };