import { validateFields } from "../../utils/validateFields";
import prismaClient from "../../prisma";
import { validateStore } from "../../utils/validateStore";
import { Decimal } from "@prisma/client/runtime/library";
import { UpdateTabService } from "../tabServices/UpdateTabService";
import { OrderDTO } from "../../DTOs/orderDTO";

interface DTO {
  itemName: string;
  itemImage: string;
  itemAmount: number;
  costumerNote: string;
  orderValue: Decimal;
  storeId: number;
  costumerId: number;
  tableId: number;
  costumerTabId: number;
}

class CreateOrderService {
  sumValues(items: OrderDTO[]): Decimal {
    return items.reduce(
      (total: Decimal, item) => total.plus(new Decimal(item.orderValue)),
      new Decimal(0)
    );
  }
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
    const newData = {
      itemName,
      itemImage,
      itemAmount,
      costumerNote,
      orderStatus: "waiting",
      orderValue: new Decimal(item.itemValue).mul(new Decimal(itemAmount)),
      storeId,
      costumerId,
      tableId,
      costumerTabId: tab.id,
    };
    const order = await prismaClient.order.create({
      data: newData,
    });

    return order;
  }
}
export { CreateOrderService };