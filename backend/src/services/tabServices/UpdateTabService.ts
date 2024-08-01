import { Decimal } from "@prisma/client/runtime/library";
import { OrderDTO } from "../../DTOs/orderDTO";
import prismaClient from "../../prisma";

class UpdateTabService {
  sumValues(items: OrderDTO[]): Decimal {
    return items.reduce(
      (total: Decimal, item) => total.plus(item.orderValue),
      new Decimal(0)
    );
  }
  async execute(costumerId: number) {
    const items = await prismaClient.order.findMany({
      where: {
        costumerId,
      },
    });
    const item = await prismaClient.order.findFirst({
      where: {
        costumerId
      }
    })
    if(!item) throw new Error("errorrrrr")
    const result = await prismaClient.costumerTab.update({
      where: {
        id: item.costumerTabId as number,
      },
      data: {
        tabValue: this.sumValues(items),
      },
    });

    return result;
  }
}
export { UpdateTabService };