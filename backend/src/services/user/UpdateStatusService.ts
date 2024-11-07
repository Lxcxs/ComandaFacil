import prismaClient from "../../prisma";
import { UpdateUserDTO } from "../../DTOs/userDTO";

export class UpdateUserService {
  async execute({ id, email }: UpdateUserDTO) {
    try {
      const emailAlreadyExists = await prismaClient.user.findFirst({
        where: { email },
      });

      if (emailAlreadyExists) {
        throw new Error("Service: This email address is not available.");
      }

      await prismaClient.user.update({
        where: { id },
        data: { email },
      });

      return { message: "Email updated!" };
    } catch (error) {
      throw new Error(`Service: ${error instanceof Error ? error.message : 'error updating user'}`);
    }
  }
}
