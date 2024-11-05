import { GridContainer, MesaButton } from "./styles";

interface Table {
  id: number;
  number: number;
  status: string;
  peopleCount: number;
  storeId: number;
  waiterId: number | null;
}

interface tableGridProps {
  mesas: Table[];
  onMesaClick: (tableNumber: number, tablePeopleAmount: number, tableStatus: string) => void;
}

const MesaGrid: React.FC<tableGridProps> = ({ mesas, onMesaClick }) => {
  return (
    <GridContainer>
      {mesas.map((table) => (
        <MesaButton
          key={table.id} 
          status={table.status}
          onClick={() => onMesaClick(table.number, table.peopleCount, table.status)}
        >
          {table.number}
        </MesaButton>
      ))}
    </GridContainer>
  );
};

export default MesaGrid;
