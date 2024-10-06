import React, { useState } from "react";
import GarconList from "../../components/Garçom";
import MesaGrid from "../../components/Mesa";
import MesaDetails from "../../components/MesaDetails";

function Cardapio() {
  const garcons = [
    { nome: "Garçom 01", mesas: 2 },
    { nome: "Garçom 02", mesas: 5 },
    { nome: "Garçom 03", mesas: 1 },
  ];

  const [mesas, setMesas] = useState([
    { numero: 1, status: "ocupado" },
    { numero: 2, status: "disponivel" },
    { numero: 3, status: "ocupado" },
    { numero: 4, status: "disponivel" },
    { numero: 5, status: "disponivel" },
    { numero: 6, status: "ocupado" },
    { numero: 7, status: "disponivel" },
    { numero: 8, status: "ocupado" },
    { numero: 9, status: "ocupado" },

  ]);

  const [mesaSelecionada, setMesaSelecionada] = useState<any>(null);

  const handleMesaClick = (numero: number) => {
    const mesa = mesas.find((m) => m.numero === numero);
    setMesaSelecionada({ numero, cliente: "Nome do Cliente", pedidos: [{ quantidade: 1, item: "Lorem ipsum", preco: 45.00 }, { quantidade: 3, item: "Dolor sit", preco: 29.90 }], total: 171.50 });
  };

  return (
    <div style={{ width:"100%", height: "100vh", paddingLeft: "80px",display: "flex" }}>
      <div style={{ width: "70%" }}>
        <GarconList garcons={garcons} />
        <MesaGrid mesas={mesas} onMesaClick={handleMesaClick} />
      </div>
      <div style={{ width: "30%", height: "100%" }}>
        <MesaDetails mesaSelecionada={mesaSelecionada} />
      </div>
    </div>
  );
}

export default Cardapio;
