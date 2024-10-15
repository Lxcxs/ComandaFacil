import { validateFields } from "../../utils/validateFields";
import prismaClient from "../../prisma";

interface UpdateCostumerStatusDTO {
  costumerId: number;
}

export class UpdateCostumerStatusService {
  private static readonly COSTUMER_STATUS = "offline";

  async execute({ costumerId }: UpdateCostumerStatusDTO) {
    try {
      validateFields({ costumerId });

      const costumer = await prismaClient.costumer.findUnique({
        where: { id: costumerId },
      });

      if (!costumer) {
        throw new Error("Customer not found");
      }
      const findTable = await prismaClient.table.findFirst({
        where: {
          id: costumer.tableId as number,
        },
      });
      if (!findTable) {
        throw new Error("table not found");
      }

      const updatedCostumer = await prismaClient.costumer.update({
        where: { id: costumerId },
        data: {
          costumerStatus: UpdateCostumerStatusService.COSTUMER_STATUS,
          tableId: null,
        },
      });

      const findCostumerTab = await prismaClient.costumerTab.findFirst({
        where: {
          tableId: findTable.id,
        },
      });
      if (!findCostumerTab) {
        throw new Error("Order not found");
      }

      const updateCostumerTab = await prismaClient.costumerTab.update({
        where: { id: findCostumerTab.id },
        data: {
          tableId: null,
        },
      });
      const updateTable = await prismaClient.table.update({
        where: { id: findTable.id },
        data: {
          tableStatus: "available",
        },
      });

      return { updatedCostumer, updateTable, updateCostumerTab };
    } catch (error) {
      throw new Error(
        `Service: ${
          error instanceof Error
            ? error.message
            : "error updating customer status"
        }`
      );
    }
  }
}
