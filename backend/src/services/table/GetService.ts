import prismaClient from "../../prisma";

export class GetTableService {
  async execute() {
    try {
      return await prismaClient.table.findMany();
    } catch (error) {
      throw new Error(`Service: ${error instanceof Error ? error.message : 'error getting tables'}`);
    }
  }
}
