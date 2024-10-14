import React from "react";
import {
  Container,
  Header,
  ItemList,
  Total,
  OrderItem,
  BtnPayment,
} from "./styles";
import { formatCurrency } from "../../utils/formatCurrency";
import { BiSolidCircleThreeQuarter } from "react-icons/bi";
import { FaRegCircle, FaCheckCircle } from "react-icons/fa";
import { MdBlock, MdOutlinePeopleAlt } from "react-icons/md";
import { MdAttachMoney } from "react-icons/md";
import ModalPayment from "../../components/ModalPayment";

const OrderPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const items = [
    {
      id: 1,
      quantity: 1,
      name: "Lorem Ipsum",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      price: 20.0,
      imageUrl:
        "https://images.tcdn.com.br/img/img_prod/832602/noticia_17733781276603f26fd6998.png",
      status: "waiting",
    },
    {
      id: 2,
      quantity: 2,
      name: "Lorem Ipsum",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      price: 50.0,
      imageUrl:
        "https://images.tcdn.com.br/img/img_prod/832602/noticia_17733781276603f26fd6998.png",
      status: "making",
    },
    {
      id: 3,
      quantity: 3,
      name: "Lorem Ipsum",
      description: "",
      price: 106.5,
      imageUrl:
        "https://images.tcdn.com.br/img/img_prod/832602/noticia_17733781276603f26fd6998.png",
      status: "finished",
    },
    {
      id: 4,
      quantity: 1,
      name: "Lorem Ipsum",
      description: "Lorem ipsum dolor sit amet.",
      price: 7.0,
      imageUrl:
        "https://images.tcdn.com.br/img/img_prod/832602/noticia_17733781276603f26fd6998.png",
      status: "canceled",
    },
  ];

  // Filtrar apenas os itens que estão "finished" ou "making"
  const cartItems = items.filter(
    (item) => item.status === "finished" || item.status === "making"
  );

  // Calcular o total
  const total = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  function handleIcons(stts: string) {
    switch (stts) {
      case "waiting":
        return <FaRegCircle />;
      case "making":
        return <BiSolidCircleThreeQuarter />;
      case "finished":
        return <FaCheckCircle />;
      case "canceled":
        return <MdBlock />;
      default:
        return null;
    }
  }

  function handleModal() {
    setIsModalOpen(!isModalOpen);
  }

  return (
    <Container>
      <Header>
        <div className="title">
          <h2>MESA 3</h2>
          <h2>
            <MdOutlinePeopleAlt size={29} /> 5
          </h2>
        </div>
        <h3>Cliente: Lucas</h3>
      </Header>
      <ItemList>
        {cartItems.map((order) => (
          <OrderItem key={order.id} status={order.status}>
            <div className="item_container">
              <img src={order.imageUrl} alt={order.name} />
              <div className="item_info">
                <span id="item_title">
                  {order.quantity}x {order.name}
                </span>
                <span id="text">R$ {(order.price * order.quantity).toFixed(2)}</span>
                <div>
                  <h4>Observações</h4>
                  <span id="text">
                    {order.description !== ""
                      ? order.description
                      : "sem observações."}
                  </span>
                </div>
              </div>
            </div>
            <span id="icons">{handleIcons(order.status)}</span>
          </OrderItem>
        ))}
      </ItemList>

      <div className="footer">
        <Total>
          <span>TOTAL:</span>
          <span>{formatCurrency(total)}</span>
        </Total>
        <BtnPayment onClick={handleModal}>
          <MdAttachMoney size={30} />
          Pagar
        </BtnPayment>
      </div>
      {isModalOpen && <ModalPayment onClose={handleModal} />}
    </Container>
  );
};

export default OrderPage;
