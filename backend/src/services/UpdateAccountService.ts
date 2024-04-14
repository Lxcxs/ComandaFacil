import prismaClient from "../prisma";
import { UpdateAccountDTO } from "../types/UpdateAccountDTO";

class UpdateAccountService {
  async execute({ id, userEmail }: UpdateAccountDTO) {
    
    const accountAlreadyExists = await prismaClient.user.findFirst({
      where: {
        userEmail,
      },
    });

    if (accountAlreadyExists) {
      throw new Error("This email adress is not available.");
    }

    await prismaClient.user.update({
      where: {
        id,
      },
      data: {
        userEmail,
      },
    });

    return {message: `Email updated for ${userEmail}`};
  }
}

export { UpdateAccountService };
