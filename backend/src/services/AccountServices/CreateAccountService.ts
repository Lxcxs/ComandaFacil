import prismaClient from "../../prisma";
import { CreateAccountDTO } from "../../types/CreateAccountDTO";

class CreateAccountService {
  async execute({ userName, userEmail, userPassword, userBrand, userTableAmount, userDocument }: CreateAccountDTO) {

    const accountAlreadyExists = await prismaClient.user.findFirst({
      where: {
        userDocument,
      },
    });

    if ( !userName || !userEmail || !userPassword || !userTableAmount || !userBrand || !userDocument ) {
      throw new Error("Preencha todos os campos");
    }

    if (accountAlreadyExists) {
      throw new Error("Documento inválido.");
    } else {
      const user = await prismaClient.user.create({
        data: {
          userName,
          userEmail,
          userPassword,
          userBrand,
          userTableAmount,
          userDocument
        },
      });

      return user;
    }
  }
}

export { CreateAccountService };
