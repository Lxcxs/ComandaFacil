import { validateFields } from "../../utils/validateFields";
import { CreateTableDTO } from "../../DTOs/tableDTO";
import prismaClient from "../../prisma";

class CreateTableService {
  private static readonly TABLE_STATUS = "occupied";
  
  async execute({ tableNumber, tablePeopleAmount, storeId, waiterId }: CreateTableDTO) {
    validateFields({ tableNumber, tablePeopleAmount, storeId });
    const store = await prismaClient.store.findUnique({
      where: { id: storeId }
    });
    if (!store) throw new Error("Service: store not found.");

    const tableData = {
      tableNumber,
      tablePeopleAmount,
      tableStatus: CreateTableService.TABLE_STATUS,
      storeId,
      waiterId,
    };

    const result = await prismaClient.table.create({ data: tableData });
    return result;
  }
}
export { CreateTableService };