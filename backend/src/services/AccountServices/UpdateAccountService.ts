import prismaClient from "../../prisma";
import { UpdateAccountDTO } from "../../types/UpdateAccountDTO";

class UpdateAccountService {

  async execute({ id, userEmail }: UpdateAccountDTO) {

    const emailAlreadyExists = await prismaClient.user.findFirst({
      where: {
        userEmail,
      },
    });

    if (emailAlreadyExists) {
      throw new Error("This email adress is not available.");

    } else {
      
      await prismaClient.user.update({
        where: {
          id,
        },
        data: {
          userEmail,
        },
      });

      return { message: "Email updated!" };
    }
  }
}

export { UpdateAccountService };
