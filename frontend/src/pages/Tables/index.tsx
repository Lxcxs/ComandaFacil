import { useState, useEffect } from "react";
import { client } from "../../services/axios";
import MesaGrid from "../../components/Table";
import MesaDetails from "../../components/TableDetails";
import { Container } from "./styles";
import { useAuthorization } from "../../components/Hooks/useAuthorization";
interface ITable {
  id: number;
  tableNumber: number;
  tableStatus: string;
  tablePeopleAmount: number;
  storeId: number;
  waiterId: number | null;
}

function Mesas() {
  const [tables, setTables] = useState<ITable[]>([]);
  const [loading, setLoading] = useState<true | false>(false);
  const [selectedTable, setSelectedTable] = useState<ITable | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState<boolean>(false);

  const { storeId } = useAuthorization();

  useEffect(() => {
    const fetchTables = async () => {
      try {
        setLoading(true);
        const response = await client.get(`/tables/${storeId}`);
        setTables(response.data);
      } catch (error) {
        console.error("Erro ao buscar mesas:", error);
      } finally {
        setLoading(false);
      }
    };
  
    if (storeId) {
      fetchTables();
    }
  }, [storeId]);
  

  const handleMesaClick = (tableNumber: number, tablePeopleAmount: number) => {
    const mesa = tables.find((m) => m.tableNumber === tableNumber && m.tablePeopleAmount === tablePeopleAmount);
    if (mesa && tablePeopleAmount !== 0) {

      setSelectedTable({
        id: mesa.id,
        tableNumber: mesa.tableNumber,
        tableStatus: mesa.tableStatus,
        tablePeopleAmount: mesa.tablePeopleAmount,
        storeId: mesa.storeId,
        waiterId: null,
      });
    } else {
      setSelectedTable(null);
    }
    setIsDetailsOpen(true);
  };

  const handleDetailsModal = () => {
    setIsDetailsOpen(!isDetailsOpen);
  };

  return (
    <Container>
      <div className="content">
        {
          loading === true ? <span>Carregando...</span> :
            <MesaGrid mesas={tables} onMesaClick={handleMesaClick} />
        }
      </div>
      {isDetailsOpen && (
        <div style={{ width: "auto", height: "100%" }}>
          <MesaDetails
            selectedTable={selectedTable}
            closeModal={handleDetailsModal}
          />
        </div>
      )}
    </Container>
  );
}

export default Mesas;
