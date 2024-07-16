import prismaClient from "../../prisma";
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET_KEY || ""

interface AuthenticateUserServiceParams {
  userEmail: string;
  userPassword: string;
}

class AuthenticateUserService {
  async execute({ userEmail, userPassword }: AuthenticateUserServiceParams) {

    const user = await prismaClient.user.findUnique({ where: { userEmail } });

    if (!user) {
      throw new Error("Invalid email or password");
    }

    const passwordMatch:boolean = await bcrypt.compare(userPassword, user.userPassword)
    // console.log(passwordMatch)

    if (!passwordMatch) {
      throw new Error("Invalid password");
    }

    const token = jwt.sign({ userId: user.id }, SECRET_KEY as string, {
      expiresIn: "5m",
    });
    // console.log(jwt.verify(token, SECRET_KEY) as JwtPayload)

    return { token, user };
  }
}

export { AuthenticateUserService };
