import { useNavigate } from "react-router";
import { client } from "../services/axios";
import React from "react";

interface ILogin {
  loginEmail: string;
  loginPassword: string;
  accountType: string;
}

export function useLogin() {
  const [loading, setLoading] = React.useState(false);
  const navigate = useNavigate();

  async function login(data: ILogin) {
    try {
      setLoading(true);
      const response = await client.post('/login/', data);
      console.log("login successful");
      const token = response.data.token;

      localStorage.setItem('authorization', token);
      navigate('/dashboard');
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  return { login, loading };
}