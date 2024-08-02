import bcrypt from "bcrypt";
import prismaClient from "../../prisma";
import { CreateUserDTO } from "../../DTOs/userDTO";
import { validateFields } from "../../utils/validateFields";

export class CreateUserService {
  private static readonly SALT_ROUNDS = 10;
  private static readonly ACCOUNT_TYPE = "admin";

  async execute({
    userName,
    userEmail,
    userPassword,
    userDocument,
  }: CreateUserDTO) {
    try {
      validateFields({ userName, userEmail, userPassword, userDocument });

      const existingUser = await prismaClient.user.findFirst({
        where: { OR: [{ userDocument }, { userEmail }] },
      });

      if (existingUser) {
        if (existingUser.userDocument === userDocument) {
          throw new Error("Service: This document is already in use.");
        }
        if (existingUser.userEmail === userEmail) {
          throw new Error("Service: This email is already in use.");
        }
      }

      const hashedPassword = await bcrypt.hash(userPassword, CreateUserService.SALT_ROUNDS);

      return await prismaClient.user.create({
        data: {
          userName,
          userEmail,
          userPassword: hashedPassword,
          userDocument,
          accountType: CreateUserService.ACCOUNT_TYPE,
        },
      });
    } catch (error) {
      throw new Error(`Service: ${error instanceof Error ? error.message : 'error creating user'}`);
    }
  }
}
