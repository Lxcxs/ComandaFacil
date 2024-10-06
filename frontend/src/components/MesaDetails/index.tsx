import React from "react";
import { DetailsContainer, ItemPedido, Total } from "./styles";

const MesaDetails = ({ mesaSelecionada }: { mesaSelecionada: any }) => {
  if (!mesaSelecionada) return <DetailsContainer>Selecione uma mesa</DetailsContainer>;

  return (
    <DetailsContainer>
      <h2>MESA {mesaSelecionada.numero}</h2>
      <h3>Nome do Cliente: {mesaSelecionada.cliente}</h3>
      {mesaSelecionada.pedidos.map((pedido: any, index: number) => (
        <ItemPedido key={index}>
          <span>{pedido.quantidade}x {pedido.item}</span>
          <span>{pedido.preco}</span>
        </ItemPedido>
      ))}
      <Total>
        <span>TOTAL: </span>
        <span>R$ {mesaSelecionada.total.toFixed(2)}</span>
      </Total>
    </DetailsContainer>
  );
};

export default MesaDetails;
