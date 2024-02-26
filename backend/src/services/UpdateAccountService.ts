import { AppError } from "../errors/AppError";
import prismaClient from "../prisma";
import { UpdateAccountDTO } from "../types/UpdateAccountDTO";

class UpdateAccountService {
  async execute({ id, email }: UpdateAccountDTO) {
    
    const accountAlreadyExists = await prismaClient.account.findFirst({
      where: {
        email,
      },
    });

    if (accountAlreadyExists) {
      throw new AppError("This email adress is not available.", 400);
    }

    await prismaClient.account.update({
      where: {
        id,
      },
      data: {
        email,
      },
    });

    return {message: `Email updated for ${email}`};
  }
}

export { UpdateAccountService };
