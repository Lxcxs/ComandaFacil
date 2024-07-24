import { validateFields } from "../../utils/validateFields";
import { CreateTableDTO } from "../../DTOs/tableDTO";
import prismaClient from "../../prisma";
import { validateStore } from "../../utils/validateStore";
import { validateTable } from "../../utils/validateTable";

class CreateTableService {
  private static readonly TABLE_STATUS = "occupied";
  
  async execute({ tableNumber, tablePeopleAmount, storeId, waiterId }: CreateTableDTO) {

    validateFields({ tableNumber, tablePeopleAmount, storeId });

    const existingStore = await validateStore(storeId);
    validateTable(tableNumber, 1, existingStore.storeTableAmount);
    
    const occupiedTable = await prismaClient.table.findFirst({
      where: {
        tableNumber,
        tableStatus: CreateTableService.TABLE_STATUS,
      }
    })
    if (occupiedTable) throw new Error("Service: this table is already occupied.");

    const tableData = {
      tableNumber,
      tablePeopleAmount,
      tableStatus: CreateTableService.TABLE_STATUS,
      storeId: existingStore.id,
      waiterId,
    };

    const result = await prismaClient.table.create({ data: tableData });
    return result;
  }
}
export { CreateTableService };