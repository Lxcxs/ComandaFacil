import prismaClient from "../../prisma";
import { DeleteUserDTO } from "../../DTOs/userDTO";

export class DeleteUserService {
  async execute({ id }: DeleteUserDTO) {
    try {
      if (!id) {
        throw new Error("Service: ID was not provided.");
      }

      const findUser = await prismaClient.user.findUnique({
        where: { id },
      });

      if (!findUser) {
        throw new Error("Service: User not found.");
      }

      await prismaClient.user.delete({
        where: { id },
      });

      return { message: "Account deleted successfully!" };
    } catch (error) {
      throw new Error(`Service: ${error instanceof Error ? error.message : 'error deleting user'}`);
    }
  }
}
