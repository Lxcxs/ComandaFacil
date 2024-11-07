import bcrypt from "bcrypt";
import prismaClient from "../../prisma";
import { CreateUserDTO } from "../../DTOs/userDTO";
import { validateFields } from "../../utils/validateFields";

export class CreateUserService {
  private static readonly SALT_ROUNDS = 10;
  private static readonly ACCOUNT_TYPE = "admin";

  async execute({
    name,
    email,
    password,
    document,
  }: CreateUserDTO) {
    try {
      validateFields({ name, email, password, document });

      const existingUser = await prismaClient.user.findFirst({
        where: { OR: [{ document }, { email }] },
      });

      if (existingUser) {
        if (existingUser.document === document) {
          throw new Error("Service: This document is already in use.");
        }
        if (existingUser.email === email) {
          throw new Error("Service: This email is already in use.");
        }
      }

      const hashedPassword = await bcrypt.hash(password, CreateUserService.SALT_ROUNDS);

      return await prismaClient.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
          document,
          accountType: CreateUserService.ACCOUNT_TYPE,
        },
      });
    } catch (error) {
      throw new Error(`Service: ${error instanceof Error ? error.message : 'error creating user'}`);
    }
  }
}
