import bcrypt from "bcrypt";
import prismaClient from "../../prisma";
import { CreateUserDTO } from "../../DTOs/userDTO";

class CreateUserService {
  async execute({
    userName,
    userEmail,
    userPassword,
    userDocument,
  }: CreateUserDTO) {
    const accountType: string = "admin";

    if (!userName || !userEmail || !userPassword || !userDocument) {
      throw new Error("Error: Please fill in all fields");
    }

    const existingUser = await prismaClient.user.findFirst({
      where: {
        OR: [{ userDocument }, { userEmail }],
      },
    });

    if (existingUser) {
      if (existingUser.userDocument === userDocument) {
        throw new Error("Error: This document is already in use.");
      }
      if (existingUser.userEmail === userEmail) {
        throw new Error("Error: This email is already in use.");
      }
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(userPassword, saltRounds);

    const user = await prismaClient.user.create({
      data: {
        userName,
        userEmail,
        userPassword: hashedPassword,
        userDocument,
        accountType,
      },
    });

    return user;
  }
}

export { CreateUserService };
