import React, { useEffect, useState } from "react";
import { FaCircle } from "react-icons/fa";
import { Container, Header, MenuContent, Categories, MenuList, ItemSelf } from "./styles";
import { client } from "../../services/axios";
import { formatCurrency } from "../../utils/formatCurrency";
import ModalSelectItem from "../../components/ModalSelectItem";
import socket from "../../services/socket"; // Importando o socket

// Interfaces
interface Costumer {
    accountType: string;
    costumerName: string;
    costumerStatus: string;
    costumerTable: number;
    id: number;
    storeId: number;
    tableId: number;
}

interface Store {
    id: number;
    storeImage: string;
    storeName: string;
    storeStatus: string;
    storeTableAmount: number;
    userId: number;
}

type Category = {
    id: number;
    categoryName: string;
    storeId: number;
};

interface Item {
    id: number;
    itemName: string;
    itemDescription: string;
    itemValue: number;
    itemStatus: string;
    itemImage: string;
    categoryId: number;
    storeId: number;
}

function CustomerMenu() {
    const [costumer, setCostumer] = useState<Costumer>({} as Costumer);
    const [store, setStore] = useState<Store | null>(null);
    const [categories, setCategories] = useState<Category[]>([]);
    const [items, setItems] = useState<Item[]>([]);
    const [selectedItem, setSelectedItem] = useState<Item | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const localCostumer = JSON.parse(localStorage.getItem("costumer") || '{}') as Costumer;
        setCostumer(localCostumer);

        if (localCostumer.storeId) {
            const fetchAllData = async () => {
                try {
                    const [storeResponse, categoryResponse, itemResponse] = await Promise.all([
                        client.get(`/stores/${localCostumer.storeId}`),
                        client.get(`/categories/${localCostumer.storeId}`),
                        client.get(`/items/${localCostumer.storeId}`)
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

    const handleAddItem = async (item: Item, quantity: number, costumerNote: string) => {
        try {
            const response = await client.post("/orders", {
                itemName: item.itemName,
                itemImage: item.itemImage,
                itemAmount: quantity,
                orderValue: item.itemValue * quantity,
                costumerNote: costumerNote,
                costumerId: costumer.id,
                storeId: costumer.storeId,
                itemId: item.id,
                tableId: costumer.tableId,
            });
            console.log("Pedido criado com sucesso:", response.data);
            
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
            <Header status={store?.storeStatus}>
                <img src="https://www.shutterstock.com/image-vector/image-icon-600nw-211642900.jpg" alt="Restaurant Logo" />
                <div className="header_info">
                    <h3>{store?.storeName}</h3>
                    <span id="storeStatus"><FaCircle /> {store?.storeStatus === "online" ? "Aberto" : "Fechado"}</span>
                </div>
            </Header>

            <Categories>
                {categories.map(category => (
                    <a key={category.id} href={`#category${category.id}`}>
                        {category.categoryName}
                    </a>
                ))}
            </Categories>

            <MenuContent>
                <MenuList>
                    {categories.map(category => (
                        <div id={`category${category.id}`} className="categories" key={category.id}>
                            <h2>{category.categoryName}</h2>
                            <div className="section">
                                {items
                                    .filter(item => item.categoryId === category.id)
                                    .map(item => (
                                        <ItemSelf itemStatus={item.itemStatus} key={item.id} onClick={() => handleItemAction(store?.storeStatus, item.itemStatus, item)}>
                                            <div className="item_info">
                                                <h3>{item.itemName} <span id="sold_out">Esgotado</span></h3>
                                                <p>{item.itemDescription === "no description" ? "Sem descrição" : item.itemDescription}</p>
                                                <h3 id="price">{formatCurrency(item.itemValue)}</h3>
                                            </div>
                                            <img src="https://images.tcdn.com.br/img/img_prod/832602/noticia_17733781276603f26fd6998.png" alt={item.itemName} />
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
