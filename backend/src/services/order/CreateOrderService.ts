import { validateFields } from "../../utils/validateFields";
import prismaClient from "../../prisma";
import { validateStore } from "../../utils/validateStore";
import { Decimal } from "@prisma/client/runtime/library";
import { OrderDTO } from "../../DTOs/orderDTO";
import { UpdateTabValueService } from "../tab/UpdateTabValueService";

interface DTO {
  itemName: string;
  itemImage: string;
  quantity: number;
  customerNote: string;
  price: number;
  storeId: number;
  customerId: number;
  tableId: number;
  itemId: number;
  isIndividual: boolean;
  guestName: string | null;
}

export class CreateOrderService {
  private sumValues(items: OrderDTO[]): Decimal {
    return items.reduce(
      (total: Decimal, item) => total.plus(new Decimal(item.price)),
      new Decimal(0)
    );
  }

  async execute({
    itemName,
    itemImage,
    quantity,
    customerNote,
    itemId,
    storeId,
    customerId,
    tableId,
    isIndividual,
    guestName,
  }: DTO) {
    try {
      validateFields({ quantity, itemName, storeId, customerId, tableId, isIndividual });
      await validateStore(storeId);

      const customerTab = await prismaClient.customerTab.findFirst({
        where: { customerId },
      });
      const item = await prismaClient.item.findFirst({
        where: { id: itemId },
      });

      if (!item) throw new Error("Service: item not found.");
      if (!customerTab) throw new Error("Service: tab not found.");

      const newData = {
        itemName,
        itemImage,
        quantity,
        customerNote,
        status: "waiting",
        price: new Decimal(item.price).mul(new Decimal(quantity)),
        storeId,
        customerId,
        tableId,
        customerTabId: customerTab.id,
        isIndividual,
        guestName: isIndividual === true ? guestName : null,
      };

      const order = await prismaClient.order.create({ data: newData });
      if (!order) throw new Error("Service: error creating order.");

      return { order };
    } catch (error) {
      throw new Error(
        `Service: ${error instanceof Error ? error.message : "error creating order"}`
      );
    }
  }
}
