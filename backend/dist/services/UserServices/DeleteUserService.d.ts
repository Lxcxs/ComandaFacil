import { DeleteUserDTO } from "../../DTOs/userDTO";
declare class DeleteUserService {
    execute({ id }: DeleteUserDTO): Promise<{
        message: string;
    }>;
}
export { DeleteUserService };
//# sourceMappingURL=DeleteUserService.d.ts.map