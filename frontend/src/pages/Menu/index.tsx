import { useEffect, useState } from "react";
import AddItemModal from "../../components/AddItemModal";
import AddCategoryModal from "../../components/AddCategoryModal";
import {
    Container,
    Content,
    Title,
    Subtitle,
    AddCategoryButton,
    CategoryContainer,
    AddItemButton,
    ItemRow,
    ItemList,
    ItemName,
    ItemActions,
    EditButton,
    Switch,
    DeleteCategoryButton, // Criei este botão
} from './styles';
import { client } from "../../services/axios";
import { formatCurrency } from "../../utils/formatCurrency";
import { MdOutlineEdit } from "react-icons/md";
import ItemModal from "../../components/ItemModal";
import { useAuthorization } from "../../components/Hooks/useAuthorization";

type Category = {
    id: number;
    name: string;
    storeId: number;
    items: Item[];
};

type Item = {
    id: number;
    name: string;
    description: string;
    price: number;
    status: string;
    image: string;
    categoryId: number;
    storeId: number;
};

function Cardapio() {

    const [categories, setCategories] = useState<Category[]>([]);
    const [items, setItems] = useState<Item[]>([]);
    const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);

    const [isItemModalOpen, setIsItemModalOpen] = useState(false);
    const [selectedItemIndex, setSelectedItemIndex] = useState<number | null>(null);

    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);
    // const [selectedCategoryIndex, setSelectedCategoryIndex] = useState<number | null>(null);

    const token = localStorage.getItem('authorization');
    if (!token) throw new Error("token not found");
    // const payload = JSON.parse(atob(token.split('.')[1]));
    // const storeId = payload.storeId;

    const { storeId } = useAuthorization()
    useEffect(() => {
        const fetchCategoriesAndItems = async () => {
            try {
                const [categoriesResponse, itemsResponse] = await Promise.all([
                    client.get(`/categories/${storeId}`),
                    client.get(`/items/${storeId}`)
                ]);
                // console.log(categoriesResponse.data)
                setCategories(categoriesResponse.data);
                // console.log(itemsResponse.data)
                setItems(itemsResponse.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchCategoriesAndItems();
    }, [token, storeId]);

    const handleAddCategory = async (name: string) => {
        try {
            const categoryResponse = await client.post(`/categories`, {
                categoryName: name,
                storeId: storeId,
            });
            setCategories((prevCategories) => [...prevCategories, categoryResponse.data]);
        } catch (error) {
            console.error(error);
        }
    };
    const handleDeleteCategory = async (categoryId: number) => {
        try {
            const itemsInCategory = items.filter((item) => item.categoryId === categoryId);

            if (itemsInCategory.length > 0) {
                alert("Não é possível deletar a categoria, pois ainda há itens associados a ela. Exclua os itens primeiro.");
                return;
            }

            await client.delete(`/categories/${categoryId}`, {
                data: { id: categoryId },
            });

            setCategories((prevCategories) =>
                prevCategories.filter((category) => category.id !== categoryId)
            );
        } catch (error) {
            console.error("Erro ao deletar categoria:", error);
        }
    };


    const handleAddItem = async (itemName: string, itemDescription: string, itemValue: number, itemStatus: string) => {
        if (selectedCategoryId === null) return;
        try {
            const itemResponse = await client.post('/items', {
                itemName,
                itemDescription,
                itemValue,
                categoryId: selectedCategoryId,
                itemStatus,
                storeId: storeId
            }, {
                headers: {
                    authorization: token
                }
            });
            setSelectedCategoryId(null);
            setItems((prevItems) => [...prevItems, itemResponse.data]);
        } catch (error) {
            console.error(error);
        }
    };
    const fetchItems = async () => {
        try {
            const itemsResponse = await client.get(`/items/${storeId}`, {
                headers: { authorization: token }
            });
            setItems(itemsResponse.data);
        } catch (error) {
            console.error("Erro ao buscar itens:", error);
        }
    };

    const handleRemoveItem = async (itemId: number) => {
        try {
            await client.delete(`/items/${itemId}`, {
                data: { id: itemId, storeId: storeId }
            });
            fetchItems();
            setIsEditModalOpen(false);

        } catch (error) {
            console.error("Erro ao deletar item:", error);
        }
    };

    const handleEditItem = async (id: number, itemName: string, itemDescription: string, itemValue: number) => {
        try {
            await client.put(`/items/${id}`, {
                id,
                itemName: itemName,
                itemDescription: itemDescription,
                itemValue: itemValue,
                storeId: storeId,
            });
            fetchItems();
            setIsEditModalOpen(false);
        } catch (error) {
            console.error("Erro ao editar item:", error);
        }
    };
    const openEditModal = (item: Item) => {
        setSelectedItemIndex(item.id);
        setIsEditModalOpen(true);
    };

    const toggleItemActiveStatus = async (itemId: number) => {
        try {
            const itemToToggle = items.find(item => item.id === itemId);
            if (!itemToToggle) return;

            const newStatus = itemToToggle.status === "available" ? "sold out" : "available";

            await client.put(`/items/${itemId}/status`, {
                id: itemId,
                storeId: storeId,
                itemStatus: newStatus
            });

            fetchItems();

        } catch (error) {
            console.error("Erro ao alterar status do item:", error);
        }
    };

    const closeCategoryModal = () => setIsCategoryModalOpen(false);
    const closeItemModal = () => setIsItemModalOpen(false);
    const closeEditModal = () => {
        setIsEditModalOpen(false);
        setSelectedItemIndex(null);
    };

    return (
        <Container>
            <Content>
                <Title>Cardápio</Title>
                <Subtitle>Adicione os melhores pratos de seu restaurante</Subtitle>
                <AddCategoryButton onClick={() => setIsCategoryModalOpen(!isCategoryModalOpen)}>Adicionar Categoria</AddCategoryButton>
                {categories.map((category) => (
                    <CategoryContainer key={category.id}>
                        <div className="header" style={{ display: 'flex', justifyContent: 'space-between', cursor: "pointer" }}>
                            <h2>{category.name}</h2>
                            <DeleteCategoryButton onClick={() => handleDeleteCategory(category.id)}>
                                Excluir Categoria
                            </DeleteCategoryButton>
                        </div>

                        <ItemList>
                            {items && items.filter((item) => item.categoryId === category.id).map((item) => (
                                <ItemRow key={item.id}>
                                    <div className="mobile_field">
                                        <ItemName>{item.name}</ItemName>
                                        <span id="mobile_price">{formatCurrency(item.price)}</span>
                                    </div>

                                    <span id="price">{formatCurrency(item.price)}</span>

                                    {item.description === "no description" ? (
                                        <span id="no_description">Não possui descrição.</span>
                                    ) : (
                                        <span id="description">{item.description}</span>
                                    )}

                                    <ItemActions>
                                        <Switch
                                            isActive={item.status} // Converte para booleano
                                            onClick={() => toggleItemActiveStatus(item.id)}
                                        />
                                        <EditButton onClick={() => openEditModal(item)}>
                                            <MdOutlineEdit size={18} />
                                        </EditButton>
                                    </ItemActions>
                                </ItemRow>
                            ))}
                        </ItemList>

                        <AddItemButton onClick={() => {
                            setSelectedCategoryId(category.id);
                            setIsItemModalOpen(true);
                        }}>
                            Adicionar item
                        </AddItemButton>
                    </CategoryContainer>
                ))}

            </Content>

            <AddCategoryModal
                isOpen={isCategoryModalOpen}
                onClose={closeCategoryModal}
                onAddCategory={handleAddCategory}
            />

            <AddItemModal
                isOpen={isItemModalOpen}
                onClose={closeItemModal}
                onAddItem={handleAddItem}
                categoryId={selectedCategoryId as number}
            />
            {isEditModalOpen && (
                <ItemModal
                    isOpen={isEditModalOpen}
                    onClose={closeEditModal}
                    item={items.find(item => item.id === selectedItemIndex) || null}
                    onEditItem={(name, description, value) => handleEditItem(selectedItemIndex!, name, description, value)}
                    onRemoveItem={() => handleRemoveItem(selectedItemIndex!)}
                />
            )}

        </Container>
    );
}

export { Cardapio };
