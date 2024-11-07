import React, { useEffect } from "react";
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
import { client } from "../../services/axios";
import { useNavigate } from "react-router";
import socket from "../../services/socket";
// import { BsPersonBoundingBox } from "react-icons/bs";

interface Order {
  id: number;
  itemName: string;
  itemImage: string;
  quantity: number;
  customerNote: string;
  price: string;
  status: string;
  createdAt: string;
  storeId: number;
  customerId: number;
  tableId: number;
  customerTabId: number;
  waiterId: null;
  guestName: string;
  isIndividual: boolean;
}

interface Costumer {
  id: number;
  name: string;
  tableNumber: number;
  accountType: string;
  tableId: number;
  storeId: number;
  status: string;
}

interface Table {
  id: number;
  number: number;
  status: string;
  peopleCount: number;
  storeId: number;
}

interface Tab {
  id: number;
  value: number;
  status: string;
  customerId: number;
  storeId: number;
  tableId: number;
}

const OrderPage: React.FC = () => {
  const [orders, setOrders] = React.useState<Order[] | null>([]);
  const [tables, setTables] = React.useState<Table[] | null>([]);
  const [customer, setCustomer] = React.useState<Costumer | null>(null);
  const [costumerTab, setCostumerTab] = React.useState<Tab | null>(null);
  console.log(costumerTab)
  const navigate = useNavigate();

  const fetchAllData = async (storeId: number | undefined, costumerId: number | undefined) => {
    const promises = [
      client.get(`/orders/${storeId}`),
      client.get(`/tables/${storeId}`),
      client.get(`/tabs/${costumerId}`),
    ];

    const results = await Promise.allSettled(promises);
    
    results.forEach((result, index) => {
      if (result.status === "fulfilled") {
        switch (index) {
          case 0:
            setOrders(result.value.data);
            break;
          case 1:
            setTables(result.value.data);
            break;
          case 2:
            setCostumerTab(result.value.data[0]);
            console.log(result.value.data)
            break;
          default:
            break;
        }
      } else {
        console.error("Erro ao buscar dados:", result.reason);
      }
    });
  };

  useEffect(() => {
    const localCustomer = JSON.parse(localStorage.getItem("customer") || '{}') as Costumer;

    console.log(costumerTab)
    if (!localCustomer) {
      console.error("local costumer is null.");
      return;
    }
    setCustomer(localCustomer);
    fetchAllData(localCustomer.storeId, localCustomer.id);
  }, []);

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

  async function handleCloseTab() {
    if(!costumerTab?.id) throw new Error("tab not found")
    const response = await client.put("/tabs/desassociate", {
      tabId: costumerTab.id,
      newStatus: "closed"
  });
  navigate(`/${costumerTab.storeId}/enter`)
  socket.emit("CustomerTabClosed", response.data);
  }

  // async function handleModal() {
  //   try {
  //     if (!costumerTab) {
  //       console.error("Erro ao encontrar comanda");
  //       return;
  //     }

  //     await client.put(`tabs/desassociate`, {
  //       tabId: costumerTab.id,
  //       newStatus: "closed",
  //     });

  //     navigate(`/${customer?.storeId}/enter`);
  //   } catch (error) {
  //     console.error("Erro ao fechar conta:", error);
  //   }
  // }

  const filteredTable = tables?.find((e) => e.id === customer?.tableId);
  // const isTabOpen = costumerTab && costumerTab.tableId === filteredTable?.id && costumerTab.tabStatus === "open";
  const total = orders
    ?.filter(e => e.status === "finished" && e.customerId === customer?.id)
    .reduce((acc, crr) => acc + parseFloat(crr.price), 0);

  return (
    <Container>
      <Header>
        <div className="title">
          <h2>MESA {filteredTable?.number}</h2>
          <h2>
            <MdOutlinePeopleAlt size={29} /> {filteredTable?.peopleCount}
          </h2>
        </div>
        <h3>Cliente: {customer?.name}</h3>
      </Header>
      <ItemList>
        {orders
          ?.filter((e) => e.status === "finished" && e.customerId === customer?.id)
          .map((order) => (
            <OrderItem key={order.id} status={order.status}>
              <div className="item_container">
                <img
                  src={
                    "https://images.tcdn.com.br/img/img_prod/832602/noticia_17733781276603f26fd6998.png"
                  }
                  alt={order.itemName}
                />
                <div className="item_info">
                  <span id="item_title">
                    {order.quantity}x {order.itemName}
                    {order.isIndividual && <p id="guestName">- {order.guestName}</p>}

                  </span>
                  <span id="text">
                    R$ {formatCurrency(parseFloat(order.price) * order.quantity)}
                  </span>
                  <div>
                    <h4>Observações</h4>
                    <span id="text">
                      {order.customerNote !== ""
                        ? order.customerNote
                        : "sem observações."}
                    </span>
                  </div>
                </div>
              </div>
              <div className="individual">
                <span id="icons">{handleIcons(order.status)}</span>
              </div>
            </OrderItem>
          ))}
      </ItemList>

      <div className="footer">
        <Total>
          <span>TOTAL:</span>
          <span>
            {formatCurrency(total as number)}
          </span>
        </Total>
        <BtnPayment onClick={handleCloseTab}>
          <MdAttachMoney size={30} />
          Pagar
        </BtnPayment>
      </div>
    </Container>
  );
};

export default OrderPage;
