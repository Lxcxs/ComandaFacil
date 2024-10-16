import { CreateCostumerDTO } from "../../DTOs/costumerDTO";
import { validateFields } from "../../utils/validateFields";
import { validateStore } from "../../utils/validateStore";
import prismaClient from "../../prisma";
import jwt from "jsonwebtoken";
import { CreateTabService } from "../tab/CreateService";
import { UpdateTableStatusService } from "../table/UpdateStatusService";

const SECRET_KEY = process.env.JWT_SECRET_KEY || "";

export class SigninCostumerService {
  private static readonly ACCOUNT_TYPE = "costumer";
  private static readonly COSTUMER_STATUS = "online";

  async execute({
    tableNumber,
    tablePeopleAmount,
    waiterId,
    storeId,
    costumerName,
  }: CreateCostumerDTO) {
    try {
      const store = await validateStore(storeId);
      const tabService = new CreateTabService();
      const updateTableStatusService = new UpdateTableStatusService(); // Instanciar o serviço de atualização

      const table = await prismaClient.table.findFirst({
        where: {
          tableNumber,
        },
      });

      if (!table || table.tableStatus === "occupied") {
        throw new Error("error finding table or table occupied.");
      }

      // Criar Costumer
      const costumer = await prismaClient.costumer.create({
        data: {
          costumerName,
          costumerTable: table.tableNumber,
          costumerStatus: SigninCostumerService.COSTUMER_STATUS,
          accountType: SigninCostumerService.ACCOUNT_TYPE,
          tableId: table.id,
          storeId: store.id,
        },
      });

      // Atualizar o status da mesa para "ocupada"
      await updateTableStatusService.execute(store.id, table.id, "occupied");

      // Criar Comanda (costumerTab)
      const tab = await tabService.execute(costumer.id, storeId, table.id);
      
      // Procurar Comanda
      const findTab = await prismaClient.costumerTab.findFirst({
        where: { id: tab.id },
      });
      if (findTab) console.log("comanda criada.");
      if (!findTab) console.log("erro ao criar comanda");

      // Criar token login
      const token = jwt.sign(
        {
          costumerId: costumer.id,
          costumerName: costumerName,
          table: table.id,
          peopleAmount: tablePeopleAmount,
        },
        SECRET_KEY,
        { expiresIn: "2h" }
      );

      return { token, table, costumer, tab };
    } catch (error) {
      throw new Error(
        `Service: ${
          error instanceof Error ? error.message : "error signing in customer"
        }`
      );
    }
  }
}
