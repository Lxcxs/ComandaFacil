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
} from './styles';
import { client } from "../../services/axios";

type Category = {
    id: number;
    categoryName: string;
    storeId: number;
    items: Item[];
};

type Item = {
    id: number;
    itemName: string;
    itemDescription: string;
    itemValue: string; // Alterado para string para representar Decimal
    itemStatus: string;
    itemImage: string;
    categoryId: number;
    storeId: number;
};

function Cardapio() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [items, setItems] = useState<Item[]>([]);
    const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
    const [isItemModalOpen, setIsItemModalOpen] = useState(false);
    const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);
    const token = localStorage.getItem('authorization');
    if (!token) throw new Error("token not found");
    const payload = JSON.parse(atob(token.split('.')[1]));
    const storeId = payload.storeId;

    useEffect(() => {
        const fetchCategoriesAndItems = async () => {
            try {
                const [categoriesResponse, itemsResponse] = await Promise.all([
                    client.get('/categories', {
                        headers: { authorization: token }
                    }),
                    client.get(`/items/${storeId}`, {
                        headers: { authorization: token }
                    })
                ]);
                setCategories(categoriesResponse.data);
                setItems(itemsResponse.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchCategoriesAndItems();
    }, [token, storeId]);

    const handleAddCategory = async (name: string) => {
        try {
            const categoryResponse = await client.post('/categories', {
                categoryName: name,
                storeId: payload.storeId,
            });
            setCategories((prevCategories) => [...prevCategories, categoryResponse.data]);
        } catch (error) {
            console.error(error);
        }
    };

    const handleAddItem = async (itemName: string, itemDescription: string, itemValue: string, itemStatus: string) => {
        if (selectedCategoryId === null) return;
        try {
            const itemResponse = await client.post('/items', {
                itemName,
                itemDescription,
                itemValue, // Mantendo como string para representar Decimal
                categoryId: selectedCategoryId,
                itemStatus,
                storeId: payload.storeId
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

    const closeCategoryModal = () => setIsCategoryModalOpen(false);
    const closeItemModal = () => setIsItemModalOpen(false);

    return (
        <Container>
            <Content>
                <Title>Cardápio</Title>
                <Subtitle>Adicione os melhores pratos de seu restaurante</Subtitle>
                <AddCategoryButton onClick={() => setIsCategoryModalOpen(!isCategoryModalOpen)}>Adicionar Categoria</AddCategoryButton>
                <CategoryContainer>
                    {categories.map((category) => (
                        <div className="header" style={{ display: 'flex', justifyContent: 'space-between', cursor: "pointer" }} key={category.id}>
                            <h2>{category.categoryName}</h2>
                            <AddItemButton onClick={() => {
                                setSelectedCategoryId(category.id);
                                setIsItemModalOpen(true);
                            }}>
                                Adicionar item
                            </AddItemButton>
                        </div>
                    ))}
                </CategoryContainer>
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
                categoryId={selectedCategoryId as number} // Passando o categoryId
            />
        </Container>
    );
}

export { Cardapio };
