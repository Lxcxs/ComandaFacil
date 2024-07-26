import { CreateCostumerDTO } from "../../DTOs/costumerDTO";
import { validateFields } from "../../utils/validateFields";
import { validateStore } from "../../utils/validateStore";
import prismaClient from "../../prisma";
import { CreateTableService } from "../tableServices/CreateTableService";
import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET_KEY || "";

class SigninCostumerService {
  private static readonly ACCOUNT_TYPE = "costumer";

  async execute({
    tableNumber,
    tablePeopleAmount,
    waiterId,
    storeId,
    costumerName,
  }: CreateCostumerDTO) {
    validateFields({ tableNumber, tablePeopleAmount, storeId, costumerName });

    const store = await validateStore(storeId);

    const tableService = new CreateTableService();
    const table = await tableService.execute({
      tableNumber,
      tablePeopleAmount,
      storeId,
      waiterId,
    });

    const costumer = await prismaClient.costumer.create({
      data: {
        costumerName,
        costumerTable: table.tableNumber,
        accountType: SigninCostumerService.ACCOUNT_TYPE,
        tableId: table.id,
        storeId: store.id,
      },
    });

    const token = jwt.sign(
      {
        costumerId: costumer.id,
        costumerName: costumerName,
        table: table.tableNumber,
        peopleAmount: table.tablePeopleAmount,
      },
      SECRET_KEY,
      { expiresIn: "1h" }
    );

    return { token, table, costumer };
  }
}

export { SigninCostumerService };
