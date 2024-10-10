import { useState } from 'react';
import { client } from '../../services/axios';

interface CreateUserResponse {
  id: number;
}

export function useRegister() {
  const [isUserCreated, setIsUserCreated] = useState(false);
  const [isStoreCreated, setIsStoreCreated] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function createUser(data: unknown): Promise<CreateUserResponse | null> {
    try {
      setLoading(true);
      const response = await client.post('/users', data);
      setIsUserCreated(true);
      console.log("user created")
      return response.data;
    } catch (err) {
      setError("Erro ao criar usuário");
      return null;
    } finally {
      setLoading(false);
    }
  }

  async function createStore(data: unknown): Promise<void> {
    try {
      setLoading(true);
      await client.post('/stores', data);
      setIsStoreCreated(true);
      console.log("store created")
    } catch (err) {
      setError("Erro ao criar loja");
    } finally {
      setLoading(false);
    }
  }

  return {
    isUserCreated,
    isStoreCreated,
    error,
    loading,
    createUser,
    createStore,
  };
}
