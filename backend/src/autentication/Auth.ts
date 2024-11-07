import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET_KEY || "";

interface JwtPayload {
  id: string;
}

export const generateToken = (user: JwtPayload): string => {
  if (SECRET_KEY === "") {
    throw new Error("chave de autenticação não encontrada.");
  }
  // console.log(user)
  return jwt.sign(user, SECRET_KEY, { expiresIn: "1h" });
};

export const verifyToken = (token: string): JwtPayload | null => {
  if (SECRET_KEY === "") {
    throw new Error("chave de autenticação não encontrada.");
  }

  try {
    const decodedToken = jwt.verify(token, SECRET_KEY) as JwtPayload;
    // console.log(decodedToken)
    return decodedToken;
  } catch (error) {
    console.error("Token inválido:", error);
    return null;
  }
};
