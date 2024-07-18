import bcrypt from "bcrypt";
import prismaClient from "../../prisma";
import { CreateUserDTO } from "../../DTOs/userDTO";
import { validateFields } from "../../utils/validateFields";

class CreateUserService {
  private static readonly SALT_ROUNDS = 10;
  private static readonly ACCOUNT_TYPE = "admin";

  async execute({
    userName,
    userEmail,
    userPassword,
    userDocument,
  }: CreateUserDTO) {
    // Validação dos campos obrigatórios
    validateFields({ userName, userEmail, userPassword, userDocument }, ['userName', 'userEmail', 'userPassword', 'userDocument']);

    // Verifica se o usuário já existe
    const existingUser = await prismaClient.user.findFirst({
      where: { OR: [{ userDocument }, { userEmail }] },
    });

    if (existingUser) {
      if (existingUser.userDocument === userDocument) {
        throw new Error("This document is already in use.");
      }
      if (existingUser.userEmail === userEmail) {
        throw new Error("This email is already in use.");
      }
    }

    // Criptografa a senha
    const hashedPassword = await bcrypt.hash(userPassword, CreateUserService.SALT_ROUNDS);

    // Cria o usuário
    return prismaClient.user.create({
      data: {
        userName,
        userEmail,
        userPassword: hashedPassword,
        userDocument,
        accountType: CreateUserService.ACCOUNT_TYPE,
      },
    });
  }
}

export { CreateUserService };
