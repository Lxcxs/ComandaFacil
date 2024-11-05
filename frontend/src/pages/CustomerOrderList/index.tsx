import React, { useEffect, useState } from 'react';
import { OrderContainer, OrderItem, ModalContainer, ModalContent, CloseButton, Container } from './styles';
import { MdBlock } from "react-icons/md";
import { BiSolidCircleThreeQuarter } from 'react-icons/bi';
import { FaRegCircle, FaCheckCircle } from 'react-icons/fa';
import { IoIosClose } from "react-icons/io";
import { formatCurrency } from '../../utils/formatCurrency';
import { client } from '../../services/axios';
import { useSocket } from '../../context/SocketContext';
import { BsPersonBoundingBox } from 'react-icons/bs';

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

const OrderList: React.FC = () => {
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
    console.log(selectedOrder)
    const [orders, setOrders] = useState<Order[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [customer, setCustomer] = useState<Costumer | null>(null)
    const { socket } = useSocket();

    const fetchAllData = async () => {
        const localCustomer = JSON.parse(localStorage.getItem("customer") || '{}') as Costumer;

        if (!localCustomer) {
            console.error("storeId is null");
            return;
        }
        setCustomer(localCustomer);
        try {
            const orderResponse = await client.get(`/orders/${localCustomer?.storeId}`);
            setOrders(orderResponse.data);
        } catch (error) {
            console.error("Erro ao buscar os dados:", error);
        }
    };
    useEffect(() => {
        fetchAllData();
    }, []);

    useEffect(() => {
        socket.on("orderUpdated", () => fetchAllData());

    }, [socket])
    if (customer === null) return;

    function handleIcons(stts: string) {
        switch (stts) {
            case "waiting":
                return <FaRegCircle />;
            case "producing":
                return <BiSolidCircleThreeQuarter />;
            case "finished":
                return <FaCheckCircle />;
            case "canceled":
                return <MdBlock />;
            default:
                return null;
        }
    }

    function handleStatus(stts: string) {
        switch (stts) {
            case "waiting":
                return "Aguardando Confirmação...";
            case "producing":
                return "Em produção...";
            case "finished":
                return "Finalizado!";
            case "canceled":
                return "Cancelado.";
            default:
                return null;
        }
    }

    function handleCloseModal() {
        setSelectedOrder(null);
    }

    const filteredOrders = orders.filter(order =>
        order.itemName.toLowerCase().includes(searchTerm.toLowerCase()) && order.customerId === customer.id
    );

    return (
        <Container>
            <div className='searchBar'>
                <input
                    type="text"
                    placeholder="Pesquisar por item..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            <OrderContainer>
                {filteredOrders.map(order => (
                    <OrderItem key={order.id} status={order.status} onClick={() => setSelectedOrder(order)}>
                        <div className="item_container">
                            <img src="https://images.tcdn.com.br/img/img_prod/832602/noticia_17733781276603f26fd6998.png" alt={order.itemName} />
                            <div className="item_info">
                                <span id="item_title">{order.quantity}x {order.itemName}</span>
                                <span id="text">{formatCurrency(parseFloat(order.price))}</span>
                                <div>
                                    <h4>Observações</h4>
                                    <span id="text">
                                        {order.customerNote !== "" ? order.customerNote : "sem observações."}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className='individual'>
                            {order.isIndividual &&
                                <>
                                    <span id='iperson'><BsPersonBoundingBox /></span>
                                </>

                            }
                            <span id="icons">
                                {handleIcons(order.status)}
                            </span>
                        </div>
                    </OrderItem>
                ))}
            </OrderContainer>

            {selectedOrder && (
                <ModalContainer onClick={handleCloseModal}>
                    <ModalContent onClick={(e) => e.stopPropagation()} itemImage="https://images.tcdn.com.br/img/img_prod/832602/noticia_17733781276603f26fd6998.png" status={selectedOrder.status}>
                        <CloseButton onClick={handleCloseModal}><IoIosClose size={32} /></CloseButton>
                        <div className='itemImage' />
                        <div className='itemInfo'>
                            <h4>Pedido de: <span>{selectedOrder.guestName}</span></h4>
                            <h3><span>{selectedOrder.quantity}x {selectedOrder.itemName}</span> <span id='status'>{handleIcons(selectedOrder.status)}{handleStatus(selectedOrder.status)}</span></h3>
                            <p>{formatCurrency((parseFloat(selectedOrder.price)))}</p>
                            <p>{selectedOrder.customerNote}</p>
                        </div>
                    </ModalContent>
                </ModalContainer>
            )}
        </Container>
    );
};

export default OrderList;
