import prismaClient from "../prisma";
// import { CreateAccountProps } from "../types/CreateAccountProps";

interface DeleteAccountProp {
  id: string;
}

class DeleteAccountService {

  async execute({ id }: DeleteAccountProp) {

    if (!id) {
      throw new Error("Não encontrado")
    }

    const findAccount = await prismaClient.account.findFirst({
      where: {
        id: id
      },
    });

    await prismaClient.account.delete({
      where: {
        id: findAccount?.id,
      },
    });

    
    return { message: "deletado" };
  }
}

export { DeleteAccountService };
