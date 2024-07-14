"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.generateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const SECRET_KEY = process.env.JWT_SECRET_KEY || "";
const generateToken = (user) => {
    if (SECRET_KEY === "") {
        throw new Error("chave de autenticação não encontrada.");
    }
    return jsonwebtoken_1.default.sign(user, SECRET_KEY, { expiresIn: '1h' });
};
exports.generateToken = generateToken;
const verifyToken = (token) => {
    if (SECRET_KEY === "") {
        throw new Error("chave de autenticação não encontrada.");
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, SECRET_KEY);
        return decoded;
    }
    catch (error) {
        console.error('Token inválido:', error);
        return null;
    }
};
exports.verifyToken = verifyToken;
//# sourceMappingURL=Auth.js.map