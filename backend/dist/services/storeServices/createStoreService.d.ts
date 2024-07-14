interface CreateStoreDTO {
    storeName: string;
    storeImage: string;
    storeTableAmount: number;
    userId: number;
}
declare class CreateStoreService {
    execute({ storeName, storeImage, storeTableAmount, userId }: CreateStoreDTO): Promise<{
        id: number;
        storeName: string;
        storeStatus: string;
        storeImage: string;
        storeTableAmount: number;
        userId: number;
    }>;
}
export { CreateStoreService };
//# sourceMappingURL=createStoreService.d.ts.map