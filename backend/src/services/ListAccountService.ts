import prismaClient from "../prisma";

class ListAccountService{

  async execute() {
    const account = await prismaClient.account.findMany()

    return account;
  }
}

export { ListAccountService }