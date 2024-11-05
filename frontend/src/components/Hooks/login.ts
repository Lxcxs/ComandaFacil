import { useNavigate } from "react-router";
import { client } from "../../services/axios";
import React from "react";
import { JwtPayload, jwtDecode } from "jwt-decode";

interface ILogin {
  loginEmail: string;
  loginPassword: string;
  accountType: string;
}
interface DecodedToken extends JwtPayload {
  storeId: string; 
  userId: string; 
}

export function useLogin() {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const navigate = useNavigate();

  async function login(data: ILogin) {
    try {
      setLoading(true);
      setError(null);
      
      localStorage.removeItem('authorization');

      const response = await client.post('/login/', data);
      console.log("Login bem-sucedido");

      const token = response.data.token;
      console.log(token)
      const decodedtoken = jwtDecode<DecodedToken>(token);
      console.log(decodedtoken)
      const storeId = decodedtoken.storeId;
      localStorage.setItem('authorization', token);

      if (data.accountType === "admin") {
        navigate(`/${storeId}/dashboard`);
      }
    } catch (err) {
      console.error("Erro durante o login", err);
      setError("Erro ao fazer login. Verifique suas credenciais.");
    } finally {
      setLoading(false);
    }
  }

  return { login, loading, error };
}
