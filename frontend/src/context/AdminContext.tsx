import React, { createContext, useEffect, useState } from 'react';
import { client } from '../services/axios';

interface Store {
  storeName: string;
  storeStatus: string;
  storeImage: string;
  storeTableAmount: number;
  userId: number;
}

interface User {
  id: number;
  userName: string;
  userEmail: string;
  userPassword: string;
  userDocument: string;
  accountType: string;
  createdAt: string;
}

interface AdminContextType {
  userData: User | null;
  storeData: Store | null;
  loading: boolean;
  fetchData: () => Promise<void>;
}

export const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userData, setUserData] = useState<User | null>(null);
  const [storeData, setStoreData] = useState<Store | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    const token = localStorage.getItem('authorization');

    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));

      try {
        const userResponse = await client.get(`/users`);
        const realUser = userResponse.data.find((e: { id: number }) => e.id === payload.userId);
        setUserData(realUser);

        const storeResponse = await client.get(`/stores/${payload.userId}`, {
          headers: {
            Authorization: token,
          },
        });
        setStoreData(storeResponse.data[0]);
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
      } finally {
        setLoading(false);
      }
    } else {
      console.log('Token não encontrado no localStorage.');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <AdminContext.Provider value={{ userData, storeData, loading, fetchData }}>
      {children}
    </AdminContext.Provider>
  );
};
