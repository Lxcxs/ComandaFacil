import { useNavigate } from "react-router";
import { client } from "../../services/axios";
import React from "react";

interface ILogin {
  loginEmail: string;
  loginPassword: string;
  accountType: string;
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
      localStorage.setItem('authorization', token);

      if (data.accountType === "admin") {
        navigate('/');
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
