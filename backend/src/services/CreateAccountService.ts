import prismaClient from "../prisma";
import { CreateAccountDTO } from "../types/CreateAccountDTO";
import { AppError } from "../errors/AppError";

class CreateAccountService {
  async execute({ name, email, password, table_amount }: CreateAccountDTO) {
    
    const accountAlreadyExists = await prismaClient.account.findFirst({
      where: {
        email,
      },
    });

    
    if (!name || !email || !password || !table_amount) {
      throw new Error("Preencha todos os campos");
    }
    
    if (accountAlreadyExists) {
      throw new AppError("Account already exists!", 400)
    }
    
    const account = await prismaClient.account.create({
      data: {
        name,
        email,
        password,
        table_amount,
      },
    });

    return account;
  }
}

export { CreateAccountService };
