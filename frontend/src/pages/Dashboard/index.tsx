import React, { useContext, useEffect, useState } from "react";
import { ButtonStatus, Content } from "./styles";
import { AdminContext } from "../../context/AdminContext";
import { client } from "../../services/axios"; 
import { useAuthorization } from "../../components/Hooks/useAuthorization";
import socket from "../../services/socket";

function Dashboard() {
  const context = useContext(AdminContext);
  const [status, setStatus] = useState("offline");
  const [isUpdating, setIsUpdating] = useState(false);

  if (!context) {
    throw new Error("useAdminToken must be used within an AdminProvider");
  }

  const { userData, storeData, loading, fetchData } = context;
  const { storeId, token } = useAuthorization();

  useEffect(() => {
    const loadData = async () => {
      if (token) {
        await fetchData();
      }
      if (storeData) {
        setStatus(storeData.storeStatus);
      }
    };

    loadData();
  }, [fetchData, storeData]);

  useEffect(() => {
    socket.on("updateStoreStatus", (data) => {
      console.log("Status da loja atualizado recebido: ", data);
    });

    return () => {
      socket.off("updateStoreStatus");
    };
  }, []);

  const handleToggleStatus = async () => {
    const newStatus = status === "online" ? "offline" : "online";

    try {
      setIsUpdating(true);
      await client.put(`/stores/${storeId}`, { storeStatus: newStatus, storeId: storeId });
      setStatus(newStatus); 

      socket.emit("updateStoreStatus", { storeId, storeStatus: newStatus });
    } catch (error) {
      console.error("Erro ao atualizar status da loja:", error);
    } finally {
      setIsUpdating(false);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <Content>
      <div className="introduce">
        <h2>Olá {userData?.userName}</h2>
        <span>Sua loja está: {status}</span>
        <ButtonStatus storeStatus={status} onClick={handleToggleStatus} disabled={isUpdating}>
          {isUpdating ? "Aguarde..." : status === "online" ? "Ficar Offline" : "Ficar Online"}
        </ButtonStatus>
      </div>
      <div className="container">
        <div className="performance">
          <h2>Meu desempenho</h2>
          <div className="statistics">
            <div className="bloco1">
              <div className="header">
                <p>Número de pedidos:</p>
              </div>
              <div className="content">
                <p>10</p>
              </div>
            </div>
            <div className="bloco2">
              <div className="header">
                <p>Faturamento:</p>
              </div>
              <div className="content">
                <p>10</p>
              </div>
            </div>
            <div className="bloco3">
              <div className="header">
                <p>Total de clientes:</p>
              </div>
              <div className="content">
                <p>10</p>
              </div>
            </div>
            <div className="bloco4">
              <div className="header">
                <p>Mesas disponíveis:</p>
              </div>
              <div className="content">
                <p>10</p>
              </div>
            </div>
          </div>
        </div>

        <div className="orders">
          <h2>Meus pedidos</h2>
          <div className="statistics">
            <div className="bloco1">
              <div className="header">
                <p>Em análise:</p>
              </div>
              <div className="content">
                <p>10</p>
              </div>
            </div>
            <div className="bloco2">
              <div className="header">
                <p>Em produção:</p>
              </div>
              <div className="content">
                <p>10</p>
              </div>
            </div>
            <div className="bloco3">
              <div className="header">
                <p>Finalizados:</p>
              </div>
              <div className="content">
                <p>10</p>
              </div>
            </div>
            <div className="bloco4">
              <div className="header">
                <p>Comandas em aberto:</p>
              </div>
              <div className="content">
                <p>10</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Content>
  );
}

export default Dashboard;
