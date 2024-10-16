import React, { useEffect, useState } from 'react';
import { OrderContainer, OrderItem, ModalContainer, ModalContent, CloseButton, Container } from './styles';
import { MdBlock } from "react-icons/md";
import { BiSolidCircleThreeQuarter } from 'react-icons/bi';
import { FaRegCircle, FaCheckCircle } from 'react-icons/fa';
import { IoIosClose } from "react-icons/io";
import { formatCurrency } from '../../utils/formatCurrency';
import { useAuthorization } from '../../components/Hooks/useAuthorization';
import { client } from '../../services/axios';

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

const OrderList: React.FC = () => {
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
    const [orders, setOrders] = useState<Order[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>(''); // Estado para armazenar o termo de pesquisa
    const { storeId } = useAuthorization();

    useEffect(() => {
        const fetchAllData = async () => {
            if (!storeId) {
                console.error("storeId is null");
                return;
            }

            try {
                const orderResponse = await client.get(`/orders/${storeId}`);
                setOrders(orderResponse.data);
            } catch (error) {
                console.error("Erro ao buscar os dados:", error);
            }
        };

        // Chame fetchAllData quando storeId for atualizado
        fetchAllData();
    }, [storeId]); // Dependência adicionada

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

    // Filtra os pedidos com base no termo de pesquisa
    const filteredOrders = orders.filter(order =>
        order.itemName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <Container>
            <div className='searchBar'>
                <input
                    type="text"
                    placeholder="Pesquisar por item..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)} // Atualiza o termo de pesquisa
                />
            </div>
            <OrderContainer>
                {filteredOrders.map(order => (
                    <OrderItem key={order.id} status={order.orderStatus} onClick={() => setSelectedOrder(order)}>
                        <div className="item_container">
                            <img src="https://images.tcdn.com.br/img/img_prod/832602/noticia_17733781276603f26fd6998.png" alt={order.itemName} />
                            <div className="item_info">
                                <span id="item_title">{order.itemAmount}x {order.itemName}</span>
                                <span id="text">{formatCurrency(parseFloat(order.orderValue))}</span>
                                <div>
                                    <h4>Observações</h4>
                                    <span id="text">
                                        {order.costumerNote !== "" ? order.costumerNote : "sem observações."}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <span id="icons">
                            {handleIcons(order.orderStatus)}
                        </span>
                    </OrderItem>
                ))}
            </OrderContainer>

            {selectedOrder && (
                <ModalContainer onClick={handleCloseModal}>
                    <ModalContent onClick={(e) => e.stopPropagation()} itemImage="https://images.tcdn.com.br/img/img_prod/832602/noticia_17733781276603f26fd6998.png" status={selectedOrder.orderStatus}>
                        <CloseButton onClick={handleCloseModal}><IoIosClose size={32} /></CloseButton>
                        <div className='itemImage' />
                        <div className='itemInfo'>
                            <h3><span>{selectedOrder.itemAmount}x {selectedOrder.itemName}</span> <span id='status'>{handleIcons(selectedOrder.orderStatus)}{handleStatus(selectedOrder.orderStatus)}</span></h3>
                            <p>{formatCurrency((parseFloat(selectedOrder.orderValue)))}</p>
                            <p>{selectedOrder.costumerNote}</p>
                        </div>
                    </ModalContent>
                </ModalContainer>
            )}
        </Container>
    );
};

export default OrderList;
