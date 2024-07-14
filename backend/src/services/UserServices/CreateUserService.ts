import prismaClient from "../../prisma";
import { CreateUserDTO } from "../../DTOs/userDTO";

class CreateUserService {
  async execute({ userName, userEmail, userPassword, userDocument }: CreateUserDTO) {

    const accountType:string = "admin";

    if (!userName || !userEmail || !userPassword || !userDocument ) {
      throw new Error("Error: Please fill in all fields");
    }

    const [documentAlreadyExists, emailAlreadyExists] = await Promise.all([
      prismaClient.user.findFirst({
        where: { userDocument },
      }),
      prismaClient.user.findFirst({
        where: { userEmail },
      }),
    ]);

    if (documentAlreadyExists) {
      throw new Error("Error: This document is already in use.");
    }

    if (emailAlreadyExists) {
      throw new Error("Error: This email is already in use.");
    }

    const user = await prismaClient.user.create({
      data: {
        userName,
        userEmail,
        userPassword,
        userDocument,
        accountType,
      },
    });

    return user;
  }
}

export { CreateUserService };
