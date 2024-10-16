import { FormEvent, useEffect, useState } from "react";
import Input from "../../components/Forms/Input";
import { Button } from "../../styles/Button/styles";
import { Container, Content, FormContent } from "./styles";
import { FaCircle } from "react-icons/fa";
import { useParams, useNavigate } from "react-router-dom";
import { client } from "../../services/axios";

function CustomerSignup() {
    const { storeId } = useParams();
    const navigate = useNavigate();

    const [storeName, setStoreName] = useState("");
    const [storeStatus, setStoreStatus] = useState("");

    const [costumerName, setCostumerName] = useState("");
    const [costumerTable, setCostumerTable] = useState("");
    const [tablePeopleAmount, setTablePeopleAmount] = useState("");

    useEffect(() => {
        const fetchStoreData = async () => {
            try {
                const response = await client.get(`/stores/${storeId}`);
                setStoreName(response.data.storeName);
                setStoreStatus(response.data.storeStatus);
                console.log("Dados da loja:", response.data);
            } catch (error) {
                console.error("Erro ao buscar os dados da loja:", error);
            }
        };

        fetchStoreData();
    }, [storeId]);

    const handleForm = async (e: FormEvent) => {
        e.preventDefault();

        console.log("Dados do formulário:", {
            costumerName,
            costumerTable,
            tablePeopleAmount,
            storeId
        });

        try {
            const response = await client.post("/costumers", {
                costumerName,
                tableNumber: costumerTable,
                tablePeopleAmount,
                storeId: storeId,
                waiterId: null,
            });

            console.log("Resposta da API ao criar cliente:", response.data);

            // Desestruturar os dados retornados pela API
            const { token, table, costumer, tab } = response.data;

            // Log dos dados retornados
            console.log("Token:", token);
            console.log("Table:", table);
            console.log("Costumer:", costumer);
            console.log("Tab:", tab);

            // Armazenar os dados no localStorage
            localStorage.setItem("token", token);
            localStorage.setItem("costumer", JSON.stringify(costumer));
            localStorage.setItem("table", JSON.stringify(table));
            localStorage.setItem("tab", JSON.stringify(tab));

            // Redirecionar para a página do cardápio após criar o cliente
            const { id: costumerId } = costumer; // Pega o ID do cliente
            navigate(`/${storeId}/${costumerId}/cardapio`);
        } catch (error) {
            console.error("Erro ao criar o cliente:", error);
        }
    };

    return (
        <Container>
            <Content status={storeStatus}>
                <div className="header">
                    <h3>Bem vindo(a) ao</h3>
                    <div>
                        <h1>{storeName || "Nome do Restaurante"}</h1>
                        <span><FaCircle />{storeStatus === "online" ? "aberto" : "fechado"}</span>
                    </div>
                </div>
            </Content>

            <FormContent onSubmit={handleForm}>
                <Input
                    type="text"
                    name="name"
                    label="Nome"
                    required={true}
                    placeholder="Ex: Fulano da Silva"
                    value={costumerName}
                    onChange={(e) => setCostumerName(e.target.value)}
                />
                <Input
                    type="number"
                    name="table"
                    label="Qual o número da sua mesa?"
                    required={true}
                    placeholder="Ex: 15"
                    value={costumerTable}
                    onChange={(e) => setCostumerTable(e.target.value)}
                />
                <Input
                    type="number"
                    name="peopleAmount"
                    label="Quantas pessoas estão na mesa?"
                    required={true}
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
