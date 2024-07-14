import prismaClient from "../../prisma";
import { UpdateUserDTO } from "../../DTOs/userDTO";

class UpdateUserService {

  async execute({ id, userEmail }: UpdateUserDTO) {

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

export { UpdateUserService };
