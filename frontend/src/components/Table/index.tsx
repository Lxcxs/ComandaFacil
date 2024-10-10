import { GridContainer, MesaButton } from "./styles";

const MesaGrid = ({ mesas, onMesaClick }: { mesas: Array<{ numero: number; status: string, pessoas: number }>, onMesaClick: (numero: number, pessoas: number) => void }) => {
  return (
    <GridContainer>
      {mesas.map((mesa, index) => (
        <MesaButton
          key={index}
          status={mesa.status}
          onClick={() => onMesaClick(mesa.numero, mesa.pessoas)}
        >
          {mesa.numero}
        </MesaButton>
      ))}
    </GridContainer>
  );
};

export default MesaGrid;
