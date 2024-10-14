import React, { useState } from 'react';
import { OrderContainer, OrderItem, ModalContainer, ModalContent, CloseButton } from './styles';
import { MdBlock } from "react-icons/md";
import { BiSolidCircleThreeQuarter } from 'react-icons/bi';
import { FaRegCircle, FaCheckCircle } from 'react-icons/fa';
import { IoIosClose } from "react-icons/io";
import { formatCurrency } from '../../utils/formatCurrency';

const orders = [
    {
        id: 1,
        quantity: 1,
        name: "Lorem Ipsum",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        price: 20.00,
        imageUrl: "https://images.tcdn.com.br/img/img_prod/832602/noticia_17733781276603f26fd6998.png",
        status: "waiting",
    },
    {
        id: 2,
        quantity: 2,
        name: "Lorem Ipsum",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        price: 45.00,
        imageUrl: "https://images.tcdn.com.br/img/img_prod/832602/noticia_17733781276603f26fd6998.png",
        status: "making",
    },
    {
        id: 3,
        quantity: 3,
        name: "Lorem Ipsum",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sed bibendum neque.",
        price: 106.50,
        imageUrl: "https://images.tcdn.com.br/img/img_prod/832602/noticia_17733781276603f26fd6998.png",
        status: "finished",
    },
    {
        id: 4,
        quantity: 1,
        name: "Lorem Ipsum",
        description: "Lorem ipsum dolor sit amet.",
        price: 7.00,
        imageUrl: "https://images.tcdn.com.br/img/img_prod/832602/noticia_17733781276603f26fd6998.png",
        status: "canceled",
    },
];

const OrderList: React.FC = () => {
    const [selectedOrder, setSelectedOrder] = useState<any | null>(null);

    function handleIcons(stts: string) {
        switch (stts) {
            case "waiting":
                return <FaRegCircle />;
            case "making":
                return <BiSolidCircleThreeQuarter />;
            case "finished":
                return <FaCheckCircle />;
            case "canceled":
                return <MdBlock />
            default:
                return null;
        }
    }
    function handleStatus(stts: string) {
        switch (stts) {
            case "waiting":
                return "Aguardando Confirmação...";
            case "making":
                return "Em produção...";
            case "finished":
                return "Finalizado!";
            case "canceled":
                return "Cancelado."
            default:
                return null;
        }
    }

    function handleCloseModal() {
        setSelectedOrder(null);
    }

    return (
        <>
            <OrderContainer>
                {orders.map(order => (
                    <OrderItem key={order.id} status={order.status} onClick={() => setSelectedOrder(order)}>
                        <div className="item_container">
                            <img src={order.imageUrl} alt={order.name} />
                            <div className="item_info">
                                <span id="item_title">{order.quantity}x {order.name}</span>
                                <span id="text">R$ {(order.price * order.quantity).toFixed(2)}</span>
                                <div>
                                    <h4>Observações</h4>
                                    <span id="text">
                                        {order.description !== "" ? order.description : "sem observações."}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <span id="icons">
                            {handleIcons(order.status)}
                        </span>
                    </OrderItem>
                ))}
            </OrderContainer>

            {selectedOrder && (
                <ModalContainer onClick={handleCloseModal}>
                    <ModalContent onClick={(e) => e.stopPropagation()} itemImage={selectedOrder.imageUrl as string} status={selectedOrder.status as string}>
                        <CloseButton onClick={handleCloseModal}><IoIosClose size={32}/></CloseButton>
                        <div className='itemImage' />
                        <div className='itemInfo'>
                            <h3><span>{selectedOrder.quantity}x {selectedOrder.name}</span> <span id='status'>{handleIcons(selectedOrder.status)}{handleStatus(selectedOrder.status)}</span></h3>
                            <p>{formatCurrency((selectedOrder.price * selectedOrder.quantity))}</p>
                            <p>{selectedOrder.description}</p>

                        </div>
                    </ModalContent>
                </ModalContainer>
            )}
        </>
    );
};

export default OrderList;
