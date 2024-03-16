import { IGetUsersRepository } from "../../controllers/get-users/protocols";
import { User } from "../../models/user";

export class MongoGetUsersRepository implements IGetUsersRepository {
  async getUsers(): Promise<User[]> {
    return [
      {
        userName: "Lucas",
        userEmail: "lucas@gmail.com",
        userPassword: "lukinhas123",
        userCommerceName: "Pastel do Lucas",
        userTableAmount: 12,
        userDocuments: [],
        userDetails: [],
        createdAt: new Date(Date.now()),
      },
    ]
  }
}
