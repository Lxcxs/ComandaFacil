import { BiSolidCircleThreeQuarter } from "react-icons/bi";
import { FaRegCircle, FaCheckCircle } from "react-icons/fa";
import { Close, DetailsContainer, ItemPedido, ModalContainer, Total, FecharContaButton, ButtonsContainer } from "./styles"; // Adicione o FecharContaButton aqui
import { MdAttachMoney, MdOutlinePeopleAlt } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import { useState } from "react";
import { formatCurrency } from "../../utils/formatCurrency";

interface selectedTable {
  id: number;
  tableNumber: number;
  tableStatus: string;
  tablePeopleAmount: number;
  storeId: number;
  waiterId: number | null;
}
interface Order {
  id: number;
  itemName: string;
  itemImage: string;
  itemAmount: number;
  costumerNote: string;
  orderValue: string;
  orderStatus: string;
  createdAt: string;
  storeId: number;
  costumerId: number;
  tableId: number;
  costumerTabId: number;
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
  //   alert(`Conta da mesa ${selectedTable.tableNumber} fechada!`);
  //   closeModal(); // Fecha o modal após fechar a conta
  // };
  const total = order
  .filter(e => e.orderStatus === "finished")
  .reduce((acc, crr) => acc + parseFloat(crr.orderValue), 0); // O acumulador é iniciado em 0

  return (
    <ModalContainer onClick={handleOutsideClick}>
      <DetailsContainer>
        <div className="details_header">
          <div className="title">
            <h2>MESA {selectedTable.tableNumber}</h2>
            <h2><MdOutlinePeopleAlt size={29} /> {selectedTable.tablePeopleAmount}</h2>
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
            <ItemPedido onClick={handleModal} status={selectedTable.tableStatus} key={selectedTable.id}>

              <div className="item_container">
                <img src="https://osterstatic.reciperm.com/webp/10334.webp" />
                <div className="item_info">
                  <span id="item_title">{o.itemAmount}x {o.itemName}</span>
                  <span id="text">R$ {formatCurrency(parseFloat(o.orderValue))}</span>
                  <div>
                    <h4>Observações</h4>
                    <span id="text">
                      {o.costumerNote !== "" ? o.costumerNote : "sem observações."}
                    </span>
                  </div>
                </div>
              </div>
              <span id="icons">
                {handleIcons(o.orderStatus)}
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
