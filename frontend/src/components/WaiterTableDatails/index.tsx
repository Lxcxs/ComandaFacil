import { BiSolidCircleThreeQuarter } from "react-icons/bi";
import { FaRegCircle, FaCheckCircle } from "react-icons/fa";
import { Close, DetailsContainer, ItemPedido, ModalContainer, Total, FecharContaButton, ButtonsContainer, AddItem } from "./styles"; // Adicione o FecharContaButton aqui
import { MdOutlinePeopleAlt } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import { useState } from "react";
import { MdAttachMoney } from "react-icons/md";
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

interface ModalOrderProps {
  closeModal: () => void;
  mesaSelecionada: MesaSelecionada | null;
}

function handleIcons(stts: string) {
  switch (stts) {
    case "waiting":
      return <FaRegCircle />;
    case "making":
      return <BiSolidCircleThreeQuarter />;
    case "finished":
      return <FaCheckCircle />;
    default:
      return null;
  }
}

const WaiterTableDetails = ({ mesaSelecionada, closeModal }: ModalOrderProps, ) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  if (!mesaSelecionada) return null;

  const handleOutsideClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  const handleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleFecharConta = () => {
    // Adicione a lógica para fechar a conta aqui
    alert(`Conta da mesa ${mesaSelecionada.numero} fechada!`);
    closeModal(); // Fecha o modal após fechar a conta
  };

  return (
    <ModalContainer onClick={handleOutsideClick}>
      <DetailsContainer>
        <div className="details_header">
          <div className="title">
            <h2>MESA {mesaSelecionada.numero}</h2>
            <h2><MdOutlinePeopleAlt size={29} /> {mesaSelecionada.pessoas}</h2>
          </div>
          <h3>Cliente: {mesaSelecionada.cliente}</h3>
        </div>

        <Total>
          <span>TOTAL: </span>
          <span>R$ {mesaSelecionada.total.toFixed(2)}</span>
        </Total>

        <div className="item_list">
          {mesaSelecionada.pedidos.map((pedido, index) => (
            <ItemPedido onClick={handleModal} status={pedido.status} key={index}>
              <div className="item_container">
                <img src="https://osterstatic.reciperm.com/webp/10334.webp" alt={pedido.item} />
                <div className="item_info">
                  <span id="item_title">{pedido.quantidade}x {pedido.item}</span>
                  <span id="text">R$ {(pedido.preco * pedido.quantidade).toFixed(2)}</span>
                  <div>
                    <h4>Observações</h4>
                    <span id="text">
                      {pedido.review !== "" ? pedido.review : "sem observações."}
                    </span>
                  </div>
                </div>
              </div>
              <span id="icons">
                {handleIcons(pedido.status)}
              </span>
            </ItemPedido>
          ))}

        </div>


        <ButtonsContainer>
          <FecharContaButton onClick={handleFecharConta}>
            <MdAttachMoney size={22}/>
            Fechar Conta
          </FecharContaButton>
          <Close onClick={closeModal}>
            <span><IoClose size={28} /></span>
          </Close>
          <AddItem>
            +
          </AddItem>
        </ButtonsContainer>

      </DetailsContainer>
    </ModalContainer>
  );
};

export default WaiterTableDetails;
