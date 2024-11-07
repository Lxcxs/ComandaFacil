import { validateFields } from "../../utils/validateFields";
import prismaClient from "../../prisma";

interface UpdateCustomerStatusDTO {
  customerId: number;
}

export class UpdateCustomerStatusService {
  private static readonly CuSToMER_STATUS = "offline";

  async execute({ customerId }: UpdateCustomerStatusDTO) {
    try {
      validateFields({ customerId });

      const customer = await prismaClient.customer.findUnique({
        where: { id: customerId },
      });

      if (!customer) {
        throw new Error("Customer not found");
      }
      const findTable = await prismaClient.table.findFirst({
        where: {
          id: customer.tableId as number,
        },
      });
      if (!findTable) {
        throw new Error("table not found");
      }

      const updatedCustomer = await prismaClient.customer.update({
        where: { id: customerId },
        data: {
          status: UpdateCustomerStatusService.CuSToMER_STATUS,
          tableId: null,
        },
      });

      const findCustomerTab = await prismaClient.customerTab.findFirst({
        where: {
          tableId: findTable.id,
        },
      });
      if (!findCustomerTab) {
        throw new Error("Order not found");
      }

      const updateCustomerTab = await prismaClient.customerTab.update({
        where: { id: findCustomerTab.id },
        data: {
          tableId: null,
        },
      });
      const updateTable = await prismaClient.table.update({
        where: { id: findTable.id },
        data: {
          status: "available",
        },
      });

      return { updatedCustomer, updateTable, updateCustomerTab };
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
