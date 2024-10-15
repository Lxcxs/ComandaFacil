import { useState, useEffect } from "react";
import { client } from "../../services/axios";
import MesaGrid from "../../components/Table";
import MesaDetails from "../../components/TableDetails";
import { Container } from "./styles";
import TableAvailable from "../../components/TableAvailable";

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
  const [isAvailableOpen, setIsAvailableOpen] = useState<boolean>(false);

  useEffect(() => {
    const fetchTables = async () => {
      try {
        setLoading(true);
        const response = await client.get("/tables");
        setTables(response.data); // Armazenando as mesas no estado
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error("Erro ao buscar mesas:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTables();

  }, [])

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

    if (mesa?.tableStatus === "available") {
      setIsAvailableOpen(true)
    }
  };

  const handleDetailsModal = () => {
    setIsDetailsOpen(!isDetailsOpen);
  };

  const handleAvailableModal = () => {
    setIsAvailableOpen(!isAvailableOpen);
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
      {isAvailableOpen && (
        <TableAvailable selectedTable={selectedTable} closeModal={handleAvailableModal} />
      )}
    </Container>
  );
}

export default Mesas;
