import { validateFields } from "../../utils/validateFields";
import prismaClient from "../../prisma";
import { validateStore } from "../../utils/validateStore";
import { Decimal } from "@prisma/client/runtime/library";

interface DTO {
  itemName: string;
  itemImage: string | null;
  itemAmount: number;
  costumerNote: string | null;
  orderValue: Decimal;
  storeId: number;
  costumerId: number;
  tableId: number;
  costumerTabId: number;
}

class CreateOrderService {
  async execute({
    itemName,
    itemImage,
    itemAmount,
    costumerNote,
    storeId,
    costumerId,
    tableId,
  }: DTO) {
    validateFields({ itemAmount, itemName, storeId, costumerId, tableId });

    validateStore(storeId);

    const tab = await prismaClient.costumerTab.findFirst({
      where: {
        costumerId,
      },
    });
    const item = await prismaClient.item.findFirst({
      where: {
        itemName,
      },
    });
    if (!item) throw new Error("Service: item not found.");

    if (!tab) throw new Error("Service: tab not found.");
    const data = {
      itemName,
      itemImage,
      itemAmount,
      costumerNote,
      orderValue: item.itemValue.mul(itemAmount),
      storeId,
      costumerId,
      tableId,
      costumerTabId: tab.id,
    };

    return data;
  }
}
export { CreateOrderService };