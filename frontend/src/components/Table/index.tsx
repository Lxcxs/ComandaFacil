import { GridContainer, MesaButton } from "./styles";

interface Table {
  id: number;
  tableNumber: number;
  tableStatus: string;
  tablePeopleAmount: number;
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
          status={table.tableStatus}
          onClick={() => onMesaClick(table.tableNumber, table.tablePeopleAmount, table.tableStatus)}
        >
          {table.tableNumber}
        </MesaButton>
      ))}
    </GridContainer>
  );
};

export default MesaGrid;
