import { UpdateUserDTO } from "../../DTOs/userDTO";
declare class UpdateUserService {
    execute({ id, userEmail }: UpdateUserDTO): Promise<{
        message: string;
    }>;
}
export { UpdateUserService };
//# sourceMappingURL=UpdateUserService.d.ts.map