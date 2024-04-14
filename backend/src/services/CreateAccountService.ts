import prismaClient from "../prisma";
import { CreateAccountDTO } from "../types/CreateAccountDTO";

class CreateAccountService {
  async execute({ userName, userEmail, userPassword, userBrand, userTableAmount }: CreateAccountDTO) {
    
    const accountAlreadyExists = await prismaClient.user.findFirst({
      where: {
        userEmail,
      },
    });
    
    if (!userName || !userEmail || !userPassword || !userTableAmount || !userBrand) {
      throw new Error("Preencha todos os campos");
    }
    const findUser = await prismaClient.user.findFirst({
      where: {
        userEmail,
      },
    });
    
    const user = await prismaClient.user.create({
      data: {
        userName,
        userEmail,
        userPassword,
        userBrand,
        userTableAmount,
      },
    });

    return user;
  }
}

export { CreateAccountService };
