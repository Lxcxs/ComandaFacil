import prismaClient from "../prisma";
import { CreateAccountProps } from "../types/CreateAccountProps";


class CreateAccountService{
  async execute({ name, email, password, table_amount }: CreateAccountProps) {

    if (!name || !email || !password || !table_amount) {
      throw new Error("Preencha todos os campos")
    }

    const account = await prismaClient.account.create({
      data: {
        name,
        email,
        password,
        table_amount
      }
    })

    return account
  }
}

export { CreateAccountService }