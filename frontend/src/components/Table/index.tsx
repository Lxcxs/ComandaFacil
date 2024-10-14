import { GridContainer, MesaButton } from "./styles";

interface Mesa {
  numero: number;
  status: string;
  pessoas: number;
}

interface MesaGridProps {
  mesas: Mesa[];
  onMesaClick: (numero: number, pessoas: number) => void;
}

const MesaGrid: React.FC<MesaGridProps> = ({ mesas, onMesaClick }) => {
  return (
    <GridContainer>
      {mesas.map((mesa) => (
        <MesaButton
          key={mesa.numero} 
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
