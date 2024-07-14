interface JwtPayload {
    id: string;
    email: string;
}
export declare const generateToken: (user: JwtPayload) => string;
export declare const verifyToken: (token: string) => JwtPayload | null;
export {};
//# sourceMappingURL=Auth.d.ts.map