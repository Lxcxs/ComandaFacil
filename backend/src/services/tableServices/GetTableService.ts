import prismaClient from "../../prisma";

class GetTableService {

  async execute() {
    return await prismaClient.table.findMany();
  }
}
export { GetTableService };