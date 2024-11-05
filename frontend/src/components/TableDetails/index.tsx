import { BiSolidCircleThreeQuarter } from "react-icons/bi";
import { FaRegCircle, FaCheckCircle } from "react-icons/fa";
import { Close, DetailsContainer, ItemPedido, ModalContainer, Total, FecharContaButton, ButtonsContainer } from "./styles"; // Adicione o FecharContaButton aqui
import { MdAttachMoney, MdOutlinePeopleAlt } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import { useState } from "react";
import { formatCurrency } from "../../utils/formatCurrency";

interface selectedTable {
  id: number;
  number: number;
  status: string;
  peopleCount: number;
  storeId: number;
  waiterId: number | null;
}
interface Order {
  id: number;
  itemName: string;
  itemImage: string;
  itemAmount: number;
  customerNote: string;
  price: string;
  status: string;
  createdAt: string;
  storeId: number;
  customerId: number;
  tableId: number;
  customerTabId: number;
  waiterId: null;
}

interface ModalOrderProps {
  closeModal: () => void;
  selectedTable: selectedTable | null;
  order: Order[];
}

function handleIcons(stts: string) {
  switch (stts) {
    case "waiting":
      return <FaRegCircle />;
    case "producing":
      return <BiSolidCircleThreeQuarter />;
    case "finished":
      return <FaCheckCircle />;
    default:
      return null;
  }
}

const MesaDetails = ({ selectedTable, closeModal, order }: ModalOrderProps,) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  if (!selectedTable) return null;

  const handleOutsideClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  const handleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  // const handleFecharConta = () => {
  //   // Adicione a lógica para fechar a conta aqui
  //   alert(`Conta da mesa ${selectedTable.number} fechada!`);
  //   closeModal(); // Fecha o modal após fechar a conta
  // };
  const total = order
  .filter(e => e.status === "finished")
  .reduce((acc, crr) => acc + parseFloat(crr.price), 0); // O acumulador é iniciado em 0

  return (
    <ModalContainer onClick={handleOutsideClick}>
      <DetailsContainer>
        <div className="details_header">
          <div className="title">
            <h2>MESA {selectedTable.number}</h2>
            <h2><MdOutlinePeopleAlt size={29} /> {selectedTable.peopleCount}</h2>
          </div>
          {/* <h3>Cliente: {}</h3> */}
        </div>
        {order &&
          <Total>
            <span>TOTAL: </span>
            <span>{formatCurrency(total)}</span>
          </Total>
        }


        <div className="item_list">

          {order.map(o => (
            <ItemPedido onClick={handleModal} status={selectedTable.status} key={selectedTable.id}>

              <div className="item_container">
                <img src="https://osterstatic.reciperm.com/webp/10334.webp" />
                <div className="item_info">
                  <span id="item_title">{o.quantity}x {o.itemName}</span>
                  <span id="text">R$ {formatCurrency(parseFloat(o.price))}</span>
                  <div>
                    <h4>Observações</h4>
                    <span id="text">
                      {o.customerNote !== "" ? o.customerNote : "sem observações."}
                    </span>
                  </div>
                </div>
              </div>
              <span id="icons">
                {handleIcons(o.status)}
              </span>



            </ItemPedido>
          ))
          }


        </div>

        {order &&
          <ButtonsContainer>
            {/* <FecharContaButton onClick={handleFecharConta}>
              <MdAttachMoney size={22} />
              Fechar Conta
            </FecharContaButton> */}
            <Close onClick={closeModal}>
              <span><IoClose size={28} /></span>
            </Close>
          </ButtonsContainer>

        }

      </DetailsContainer>
    </ModalContainer>
  );
};

export default MesaDetails;
