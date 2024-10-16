import { useEffect, useState } from "react";
import { JwtPayload, jwtDecode } from "jwt-decode";

interface DecodedToken extends JwtPayload {
  storeId: number;
  userId: number; 
}

export function useAuthorization() {
  const [token, setToken] = useState<string | null>(null);
  const [storeId, setStoreId] = useState<number | null>(null);
  const [userId, setUserId] = useState<number | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("authorization");
    if (storedToken) {
      try {
        const decodedToken = jwtDecode<DecodedToken>(storedToken);
        const decodedUserId = decodedToken.userId;
        const decodedStoreId = decodedToken.storeId;
        
        setToken(storedToken);
        setStoreId(Number(decodedStoreId));
        setUserId(Number(decodedUserId));
      } catch (error) {
        console.error("Erro ao decodificar o token", error);
        localStorage.removeItem("authorization");
      }
    }
  }, []);

  return { token, storeId, userId };
}
