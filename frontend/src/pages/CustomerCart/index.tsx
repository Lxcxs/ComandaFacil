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

interface Costumer {
  id: number;
  costumerName: string;
  costumerTable: number;
  accountType: string;
  tableId: number;
  storeId: number;
  costumerStatus: string;
}

interface Table {
  id: number;
  tableNumber: number;
  tableStatus: string;
  tablePeopleAmount: number;
  storeId: number;
}

interface Tab {
  id: number;
  tabValue: string;
  tabStatus: string;
  costumerId: number;
  storeId: number;
  tableId: number;
}

const OrderPage: React.FC = () => {
  const [orders, setOrders] = React.useState<Order[] | null>([]);
  const [tables, setTables] = React.useState<Table[] | null>([]);
  const [costumer, setCostumer] = React.useState<Costumer | null>(null);
  const [costumerTab, setCostumerTab] = React.useState<Tab | null>(null);
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
            setCostumerTab(result.value.data);
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
    const localCostumer: Costumer | null = localStorage.getItem("costumer")
      ? JSON.parse(localStorage.getItem("costumer")!)
      : null;

    if (!localCostumer) {
      console.error("local costumer is null.");
      return;
    }
    setCostumer(localCostumer);
    fetchAllData(localCostumer.storeId, localCostumer.id);
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

  async function handleModal() {
    try {
      if (!costumerTab) {
        console.error("Erro ao encontrar comanda");
        return;
      }

      await client.put(`tabs/desassociate`, {
        tabId: costumerTab.id,
        newStatus: "closed",
      });

      navigate(`/${costumer?.storeId}/enter`);
    } catch (error) {
      console.error("Erro ao fechar conta:", error);
    }
  }

  const filteredTable = tables?.find((e) => e.id === costumer?.tableId);
  const isTabOpen = costumerTab && costumerTab.tableId === filteredTable?.id && costumerTab.tabStatus === "open";
  const total = orders
  ?.filter(e => e.orderStatus === "finished")
  .reduce((acc, crr) => acc + parseFloat(crr.orderValue), 0);

  return (
    <Container>
      <Header>
        <div className="title">
          <h2>MESA {filteredTable?.tableNumber}</h2>
          <h2>
            <MdOutlinePeopleAlt size={29} /> {filteredTable?.tablePeopleAmount}
          </h2>
        </div>
        <h3>Cliente: {costumer?.costumerName}</h3>
      </Header>
      <ItemList>
        {orders
          ?.filter((e) => e.orderStatus === "finished")
          .map((order) => (
            <OrderItem key={order.id} status={order.orderStatus}>
              <div className="item_container">
                <img
                  src={
                    "https://images.tcdn.com.br/img/img_prod/832602/noticia_17733781276603f26fd6998.png"
                  }
                  alt={order.itemName}
                />
                <div className="item_info">
                  <span id="item_title">
                    {order.itemAmount}x {order.itemName}
                  </span>
                  <span id="text">
                    R$ {formatCurrency(parseFloat(order.orderValue) * order.itemAmount)}
                  </span>
                  <div>
                    <h4>Observações</h4>
                    <span id="text">
                      {order.costumerNote !== ""
                        ? order.costumerNote
                        : "sem observações."}
                    </span>
                  </div>
                </div>
              </div>
              <span id="icons">{handleIcons(order.orderStatus)}</span>
            </OrderItem>
          ))}
      </ItemList>

      <div className="footer">
        <Total>
          <span>TOTAL:</span>
          <span>
            {formatCurrency(total)}
          </span>
        </Total>
        <BtnPayment onClick={handleModal}>
          <MdAttachMoney size={30} />
          Pagar
        </BtnPayment>
      </div>
    </Container>
  );
};

export default OrderPage;
