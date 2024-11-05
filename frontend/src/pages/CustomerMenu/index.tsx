import React, { useEffect, useState } from "react";
import { FaCircle } from "react-icons/fa";
import { Container, Header, MenuContent, Categories, MenuList, ItemSelf } from "./styles";
import { client } from "../../services/axios";
import { formatCurrency } from "../../utils/formatCurrency";
import ModalSelectItem from "../../components/ModalSelectItem";
import socket from "../../services/socket";
interface Costumer {
    accountType: string;
    name: string;
    status: string;
    tableNumber: number;
    id: number;
    storeId: number;
    tableId: number;
}

interface Store {
    id: number;
    image: string;
    name: string;
    status: string;
    tableCount: number;
    userId: number;
}

type Category = {
    id: number;
    name: string;
    storeId: number;
};

interface Item {
    id: number;
    name: string;
    description: string;
    price: number;
    status: string;
    image: string;
    categoryId: number;
    storeId: number;
}

function CustomerMenu() {
    const [store, setStore] = useState<Store | null>(null);
    const [categories, setCategories] = useState<Category[]>([]);
    const [items, setItems] = useState<Item[]>([]);
    const [selectedItem, setSelectedItem] = useState<Item | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const customer = JSON.parse(localStorage.getItem("customer") || '{}') as Costumer;

    useEffect(() => {

        if (customer) {
            const fetchAllData = async () => {
                try {
                    const [storeResponse, categoryResponse, itemResponse] = await Promise.all([
                        client.get(`/stores/${customer.storeId}`),
                        client.get(`/categories/${customer.storeId}`),
                        client.get(`/items/${customer.storeId}`)
                    ]);
                    setStore(storeResponse.data);
                    setCategories(categoryResponse.data);
                    setItems(itemResponse.data);
                } catch (error) {
                    console.error("Erro ao buscar os dados:", error);
                }
            };

            fetchAllData();
        }
    }, []);

    const handleAddItem = async (item: Item, quantity: number, costumerNote: string, guestName?: string) => {
        try {
            const response = await client.post("/orders", {
                itemName: item.name,
                itemImage: item.image,
                itemAmount: quantity,
                price: item.price * quantity,
                customerNote: costumerNote,
                customerId: customer.id,
                storeId: customer.storeId,
                itemId: item.id,
                tableId: customer.tableId,
                isIndividual: guestName !== "" ? true : false,
                guestName: guestName
            });
            console.log("Pedido criado com sucesso:", response.data.order);
            
            socket.emit("newOrder", response.data);
        } catch (error) {
            console.error("Erro ao criar o pedido:", error);
        }
    };

    const openModal = (item: Item) => {
        setSelectedItem(item);
        setIsModalOpen(true);
    };

    const handleModalItem = (status: string, item: Item) => {
        if (status === "available") {
            openModal(item);
        }
    };

    const handleItemAction = (storeStatus: string | undefined, itemStatus: string, item: Item) => {
        if (storeStatus === undefined) return;
        if (storeStatus === "online") {
            handleModalItem(itemStatus, item);
        } else {
            alert("A loja está offline no momento. Não é possível realizar ações com itens.");
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedItem(null);
    };

    return (
        <Container>
            <Header status={store?.status}>
                <img src="https://www.shutterstock.com/image-vector/image-icon-600nw-211642900.jpg" alt="Restaurant Logo" />
                <div className="header_info">
                    <h3>{store?.name}</h3>
                    <span id="storeStatus"><FaCircle /> {store?.status === "online" ? "Aberto" : "Fechado"}</span>
                </div>
            </Header>

            <Categories>
                {categories.map(category => (
                    <a key={category.id} href={`#category${category.id}`}>
                        {category.name}
                    </a>
                ))}
            </Categories>

            <MenuContent>
                <MenuList>
                    {categories.map(category => (
                        <div id={`category${category.id}`} className="categories" key={category.id}>
                            <h2>{category.name}</h2>
                            <div className="section">
                                {items
                                    .filter(item => item.categoryId === category.id)
                                    .map(item => (
                                        <ItemSelf itemStatus={item.status} key={item.id} onClick={() => handleItemAction(store?.status, item.status, item)}>
                                            <div className="item_info">
                                                <h3>{item.name} <span id="sold_out">Esgotado</span></h3>
                                                <p>{item.description === "no description" ? "Sem descrição" : item.description}</p>
                                                <h3 id="price">{formatCurrency(item.price)}</h3>
                                            </div>
                                            <img src="https://images.tcdn.com.br/img/img_prod/832602/noticia_17733781276603f26fd6998.png" alt={item.name} />
                                        </ItemSelf>
                                    ))}
                            </div>
                        </div>
                    ))}
                </MenuList>
            </MenuContent>

            {selectedItem && (
                <ModalSelectItem 
                    item={selectedItem}
                    isOpen={isModalOpen}
                    onClose={closeModal}
                    onAddItem={handleAddItem}
                />
            )}
        </Container>
    );
}

export { CustomerMenu };
