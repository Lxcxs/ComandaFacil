declare class GetUserService {
    execute(): Promise<{
        id: number;
        userName: string;
        userEmail: string;
        userPassword: string;
        userDocument: string;
        accountType: string;
        createdAt: Date | null;
    }[]>;
}
export { GetUserService };
//# sourceMappingURL=GetUserService.d.ts.map