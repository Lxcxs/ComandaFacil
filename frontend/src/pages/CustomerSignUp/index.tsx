import { FormEvent, useEffect, useState } from "react";
import Input from "../../components/Forms/Input";
import { Button } from "../../styles/Button/styles";
import { Container, Content, FormContent } from "./styles";
import { FaCircle } from "react-icons/fa";
import { useParams, useNavigate } from "react-router-dom";
import { client } from "../../services/axios";
import { useSocket } from "../../context/SocketContext";

interface Table {
  id: number;
  tableNumber: number;
  tableStatus: string;
  tablePeopleAmount: number;
  storeId: number;
}

interface Store {
  id: number;
  storeName: string;
  storeStatus: string;
  storeImage: string;
  storeTableAmount: number;
  userId: number;
}

function CustomerSignup() {
  const { storeId } = useParams();
  const navigate = useNavigate();
  const { socket } = useSocket();

  const [store, setStore] = useState<Store | null>(null);
  const [tables, setTables] = useState<Table[]>([]);
  const [costumerName, setCostumerName] = useState("");
  const [costumerTable, setCostumerTable] = useState("");
  const [tablePeopleAmount, setTablePeopleAmount] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [storeRes, tableRes] = await Promise.all([
          client.get(`/stores/${storeId}`),
          client.get(`/tables/${storeId}`)
        ]);
        setStore(storeRes.data);
        setTables(tableRes.data);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    };

    fetchData();
  }, [storeId]);

  const handleForm = async (e: FormEvent) => {
    e.preventDefault();

    const tableNumber = parseInt(costumerTable);
    const peopleAmount = parseInt(tablePeopleAmount);
    const selectedTable = tables.find(table => table.tableNumber === tableNumber);

    if (!selectedTable) {
      console.error("Mesa não encontrada.");
      return;
    }

    try {
      const { data: costumerData } = await client.post("/costumers", {
        costumerName,
        tableNumber,
        tablePeopleAmount: peopleAmount,
        storeId: Number(storeId),
        waiterId: null,
      });

      await client.put(`/tables/amount/${storeId}/${selectedTable.id}`, {
        newAmountValue: peopleAmount,
      });

      const { token, table, costumer, tab } = costumerData;
      localStorage.setItem("token", token);
      localStorage.setItem("costumer", JSON.stringify(costumer));
      localStorage.setItem("table", JSON.stringify(table));
      localStorage.setItem("tab", JSON.stringify(tab));

      socket.emit("newCustomerCreated", { costumerId: costumer.id, storeId });

      navigate(`/${storeId}/${costumer.id}/cardapio`);
    } catch (error) {
      console.error("Erro ao criar cliente ou atualizar mesa:", error);
    }
  };

  return (
    <Container>
      <Content status={store?.storeStatus || "offline"}>
        <div className="header">
          <h3>Bem vindo(a) ao</h3>
          <div>
            <h1>{store?.storeName || "Nome do Restaurante"}</h1>
            <span>
              <FaCircle /> {store?.storeStatus === "online" ? "aberto" : "fechado"}
            </span>
          </div>
        </div>
      </Content>

      <FormContent onSubmit={handleForm}>
        <Input
          type="text"
          name="name"
          label="Nome"
          required
          placeholder="Ex: Fulano da Silva"
          value={costumerName}
          onChange={(e) => setCostumerName(e.target.value)}
        />
        <Input
          type="number"
          name="table"
          label="Qual o número da sua mesa?"
          required
          placeholder="Ex: 15"
          value={costumerTable}
          onChange={(e) => setCostumerTable(e.target.value)}
        />
        <Input
          type="number"
          name="peopleAmount"
          label="Quantas pessoas estão na mesa?"
          required
          placeholder="Ex: 4"
          value={tablePeopleAmount}
          onChange={(e) => setTablePeopleAmount(e.target.value)}
        />
        <Button type="submit">Acessar</Button>
      </FormContent>
    </Container>
  );
}

export { CustomerSignup };
