import { useState } from "react";
// import GarconList from "../../components/Garçom";
import MesaGrid from "../../components/Table";
import MesaDetails from "../../components/TableDetails";
import { Container } from "./styles";
import GarconList from "../../components/Waiter";

interface Pedido {
  quantidade: number;
  item: string;
  preco: number;
  review: string;
  status: string;
}

interface MesaSelecionada {
  numero: number;
  pessoas: number;
  cliente: string;
  pedidos: Pedido[];
  total: number;
}

function Mesas() {
  const loremIpsum = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam lobortis, nulla sed commodo vehicula, lacus erat sagittis leo, in pharetra nisl odio non ipsum. Maecenas posuere, est non sagittis rutrum, orci sem rutrum erat, in aliquam nibh ante in odio. Sed malesuada lorem tristique tincidunt pretium.";
  const garcons = [
    { nome: "Marcio Canela", mesas: [3, 6, 7,] },
    { nome: "Vinicius Cranio", mesas: [1, 10] },
    { nome: "Eduardo Paes", mesas: [12] },
  ];
  const mesas = [
    { numero: 1, status: "ocupado", pessoas: 5 },
    { numero: 2, status: "disponivel", pessoas: 0 },
    { numero: 3, status: "ocupado", pessoas: 3 },
    { numero: 4, status: "disponivel", pessoas: 0 },
    { numero: 5, status: "disponivel", pessoas: 0 },
    { numero: 6, status: "ocupado", pessoas: 7 },
    { numero: 7, status: "ocupado", pessoas: 1 },
    { numero: 8, status: "disponivel", pessoas: 0 },
    { numero: 9, status: "disponivel", pessoas: 0 },
    { numero: 10, status: "ocupado", pessoas: 13 },
    { numero: 11, status: "ocupado", pessoas: 5 },
    { numero: 12, status: "ocupado", pessoas: 2 },
  ];

  const [mesaSelecionada, setMesaSelecionada] = useState<MesaSelecionada | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleMesaClick = (numero: number, pessoas: number) => {
    const mesa = mesas.find((m) => m.numero === numero && m.pessoas === pessoas);
    if (mesa && pessoas !== 0) {
      const pedidos: Pedido[] = [
        { quantidade: 2, item: "Pizza Margherita", preco: 39.90, review: "", status: "waiting" },
        { quantidade: 1, item: "Espaguete à Bolonhesa", preco: 29.90, review: loremIpsum, status: "making" },
        { quantidade: 3, item: "Cerveja Artesanal", preco: 12.50, review: "", status: "making" },
        { quantidade: 1, item: "Salada Caesar", preco: 25.00, review: "Uma salada refrescante.", status: "finished" },
        { quantidade: 2, item: "Tiramisu", preco: 15.00, review: "Uma sobremesa clássica.", status: "finished" },
        { quantidade: 4, item: "Água Mineral", preco: 3.00, review: "", status: "finished" },
      ];

      const total = pedidos.reduce((acc, pedido) => acc + pedido.preco * pedido.quantidade, 0);

      setMesaSelecionada({
        numero,
        pessoas,
        cliente: "Lucas Cupertino",
        pedidos,
        total,
      });
    } else {
      setMesaSelecionada(null);
    }
    setIsModalOpen(true);
  };

  const handleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <Container>
      <div className="content">
        <GarconList garcons={garcons} />
        <MesaGrid mesas={mesas} onMesaClick={handleMesaClick} />
      </div>
      {isModalOpen && (
        <div style={{ width: "auto", height: "100%" }}>
          <MesaDetails mesaSelecionada={mesaSelecionada} closeModal={handleModal} />
        </div>
      )}
    </Container>
  );
}

export default Mesas;
