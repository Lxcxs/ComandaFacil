import { Prisma } from "@prisma/client";
import prismaClient from "../../prisma";

export class UpdateTabStatusService {
  async execute(tabId: number, newStatus: string) {
    try {
      // Verifica se a comanda (tab) existe
      const currentTab = await prismaClient.customerTab.findFirst({
        where: { id: tabId },
      });
      if (!currentTab) throw new Error("Service: customer tab not found or does not exist.");

      // Busca a mesa associada à comanda
      const associatedTable = await prismaClient.table.findFirst({
        where: { id: currentTab.tableId as number },
      });
      if (!associatedTable) throw new Error("Service: associated table not found.");

      // Busca o cliente associado à mesa
      const associatedCustomer = await prismaClient.customer.findFirst({
        where: { tableId: currentTab.tableId },
      });
      if (!associatedCustomer) throw new Error("Service: associated customer not found.");

      // Atualiza o status da comanda e remove a associação da mesa
      const updatedTab = await prismaClient.customerTab.update({
        where: { id: tabId },
        data: { status: newStatus, tableId: null },
      });

      const updateTable = await prismaClient.table.update({
        where: { id: associatedTable.id},
        data: { status: "available"}
      })

      // Atualiza o cliente para "offline" e desassocia da mesa
      const desassociatedCustomer = await prismaClient.customer.update({
        where: { id: associatedCustomer.id },
        data: { tableId: null, status: "offline" },
      });

      return { updatedTab, desassociatedCustomer, updateTable };
    } catch (error) {
      throw new Error(`Service: ${error instanceof Error ? error.message : 'error updating tab'}`);
    }
  }
}
