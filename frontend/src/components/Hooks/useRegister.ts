import { useState } from 'react';
import { useNavigate } from 'react-router';
import { client } from '../../services/axios';
import { useLogin } from './login';

interface Store {
  storeName: string;
  storeImage: string;
  storeTableAmount: number;
  userId: number;
}
interface CreateUserResponse {
  id: number;
}

export function useRegister() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useLogin(); 

  async function createUser(data: unknown): Promise<CreateUserResponse | null> {
    try {
      setLoading(true);
      const response = await client.post('/users', data);
      console.log("Usuário criado com sucesso");
      return response.data;
    } catch (err) {
      setError("Erro ao criar usuário");
      return null;
    } finally {
      setLoading(false);
    }
  }

  async function createStore(data: unknown): Promise<number | null> {
    try {
      setLoading(true);
      const response = await client.post('/stores', data);
      console.log("Loja criada com sucesso");
      console.log(response.data);
      return response.data.id; // Retorna o ID da loja para ser usado nas mesas
    } catch (err) {
      setError("Erro ao criar loja");
      return null;
    } finally {
      setLoading(false);
    }
  }

  async function createTables(storeId: number, tableAmount: number) {
    try {
      for (let i = 1; i <= tableAmount; i++) {
        await client.post('/tables', {
          tableNumber: i,
          tablePeopleAmount: 0, // Inicializa com 0 pessoas na mesa
          waiterId: null, // Pode ser nulo no início
          storeId: storeId
        });
        console.log(`Mesa ${i} criada com sucesso.`);
      }
      console.log(`${tableAmount} mesas criadas com sucesso.`);
    } catch (err) {
      console.error(`Erro ao criar mesa: `, err);
      setError(`Erro ao criar mesas para a loja ID ${storeId}`);
    }
  }

  async function registerAndLogin(userData: unknown, storeData: Store, email: string, password: string) {
    const userResponse = await createUser(userData);
    if (!userResponse) return;

    storeData = { ...storeData, userId: userResponse.id };

    const storeId = await createStore(storeData);
    const tableAmount = storeData.storeTableAmount;
    console.log("storeId: ", storeId);
    console.log("storeTableAmount: ", tableAmount);

    if (!storeId) {
      console.error('Store ID inválido, mesas não serão criadas');
      return;
    }

    // Cria as mesas após criar a loja
    await createTables(storeId, tableAmount);

    // Faz o login após criar o usuário, loja e mesas
    await login({
      loginEmail: email,
      loginPassword: password,
      accountType: 'admin',
    });

    navigate(`/${storeId}/dashboard`);
  }

  return {
    error,
    loading,
    registerAndLogin,
  };
}
