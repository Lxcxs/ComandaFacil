import { CreateUserDTO } from "../../DTOs/userDTO";
declare class CreateUserService {
    execute({ userName, userEmail, userPassword, userDocument }: CreateUserDTO): Promise<{
        id: number;
        userName: string;
        userEmail: string;
        userPassword: string;
        userDocument: string;
        accountType: string;
        createdAt: Date | null;
    }>;
}
export { CreateUserService };
//# sourceMappingURL=CreateUserService.d.ts.map