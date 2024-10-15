import React, { useContext, useEffect } from "react";
import { Content } from "./styles";
import { AdminContext } from "../../context/AdminContext";

function Dashboard() {
  const context = useContext(AdminContext);

  if (!context) {
    throw new Error("useAdminToken must be used within an AdminProvider");
  }

  const { userData, storeData, loading, fetchData } = context;

  useEffect(() => {
    const loadData = async () => {
      await fetchData(); // Chama a função que busca os dados
    };

    loadData();
  }, [fetchData]); // Dependência para garantir que o efeito não entre em loop

  if (loading) return <p>Loading...</p>;

  return (
    <Content>
      <div className="introduce">
        <h2>Olá {userData?.userName}</h2>
        <p>
          Acompanhe suas estatísticas de hoje no(a) <span id="storeName">{storeData?.storeName}</span>.
        </p>
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
