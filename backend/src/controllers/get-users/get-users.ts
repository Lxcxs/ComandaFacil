import { IGetUserController, IGetUsersRepository } from "./protocols";

export class GetUserController implements IGetUserController {
  constructor(private readonly getUserRepository: IGetUsersRepository) {
    this.getUserRepository = getUserRepository;
  }
  async handle() {
    try {
      const users = await this.getUserRepository.getUsers();

      return {
        statusCode: 200,
        body: users,
      };
    } catch (err) {
      return {
        statusCode: 500,
        body: "Something went wrong.",
      };
    }
  }
}
