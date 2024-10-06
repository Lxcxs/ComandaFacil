import React from "react";
import { GridContainer, MesaButton } from "./styles";

const MesaGrid = ({ mesas, onMesaClick }: { mesas: Array<{ numero: number; status: string }>, onMesaClick: (numero: number) => void }) => {
  return (
    <GridContainer>
      {mesas.map((mesa, index) => (
        <MesaButton
          key={index}
          status={mesa.status}
          onClick={() => onMesaClick(mesa.numero)}
        >
          {mesa.numero}
        </MesaButton>
      ))}
    </GridContainer>
  );
};

export default MesaGrid;
