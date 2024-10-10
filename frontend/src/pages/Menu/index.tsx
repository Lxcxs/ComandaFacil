import { useState } from "react";
import AddItemModal from "../../components/AddItemModal";
import AddCategoryModal from "../../components/AddCategoryModal";
import ItemModal from "../../components/ItemModal"; // Novo modal para editar/remover
import { MdOutlineEdit } from "react-icons/md";
import {
    Container,
    Content,
    Title,
    Subtitle,
    AddCategoryButton,
    CategoryContainer,
    ItemList,
    ItemRow,
    ItemActions,
    AddItemButton,
    Switch,
    EditButton,
    ExpandButton,
    ItemName,
} from './styles';
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { formatCurrency } from "../../utils/formatCurrency";

function Cardapio() {
    const [categories, setCategories] = useState([
        {
            name: 'Entradas',
            items: [
                { name: 'Iscas de Frango', price: 7.50, description: "", isActive: true },
                { name: 'Pastel de Carne', price: 15.90, description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", isActive: false },
                { name: 'Pão Artesanal', price: 4.50, description: "Lorem ipsum dolor sit amet.", isActive: false }
            ],
            expanded: true,
            searchTerm: '',
        },
        {
            name: 'Pratos Principais',
            items: [
                { name: 'Picanha', price: 87.50, description: "", isActive: true },
                { name: 'Moqueca', price: 45.90, description: "Lorem ipsum dolor sit amet.", isActive: false },
                { name: 'Cupim Assado', price: 64.50, description: "", isActive: true },
                { name: 'Filé de Tilapia', price: 37.90, description: "", isActive: true }
            ],
            expanded: true,
            searchTerm: '',
        },
        {
            name: 'Sobremesas',
            items: [],
            expanded: false,
            searchTerm: '',
        },
    ]);

    const [isItemModalOpen, setIsItemModalOpen] = useState(false);
    const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false); // Novo estado para o modal de edição
    const [selectedCategoryIndex, setSelectedCategoryIndex] = useState<number | null>(null);
    const [selectedItemIndex, setSelectedItemIndex] = useState<number | null>(null); // Para armazenar o índice do item selecionado

    const toggleCategory = (index: number) => {
        const newCategories = [...categories];
        newCategories[index].expanded = !newCategories[index].expanded;
        setCategories(newCategories);
    };

    const openItemModal = (categoryIndex: number) => {
        setSelectedCategoryIndex(categoryIndex);
        setIsItemModalOpen(true);
    };

    const closeItemModal = () => {
        setIsItemModalOpen(false);
    };

    const openCategoryModal = () => {
        setIsCategoryModalOpen(true);
    };

    const closeCategoryModal = () => {
        setIsCategoryModalOpen(false);
    };

    const handleAddItem = (name: string, description: string, price: number) => {
        if (selectedCategoryIndex !== null) {
            const newCategories = [...categories];
            newCategories[selectedCategoryIndex].items.push({ name, price, description, isActive: true });
            setCategories(newCategories);
        }
    };

    const handleAddCategory = (name: string) => {
        const newCategory = {
            name,
            items: [],
            expanded: false,
            searchTerm: '',
        };
        setCategories((prevCategories) => [...prevCategories, newCategory]);
    };

    const handleSearchChange = (categoryIndex: number, searchTerm: string) => {
        const newCategories = [...categories];
        newCategories[categoryIndex].searchTerm = searchTerm;
        setCategories(newCategories);
    };

    const toggleItemActiveStatus = (categoryIndex: number, itemIndex: number) => {
        const newCategories = [...categories];
        newCategories[categoryIndex].items[itemIndex].isActive = !newCategories[categoryIndex].items[itemIndex].isActive;
        setCategories(newCategories);
    };

    const openEditModal = (categoryIndex: number, itemIndex: number) => {
        setSelectedCategoryIndex(categoryIndex);
        setSelectedItemIndex(itemIndex);
        setIsEditModalOpen(true);
    };

    const closeEditModal = () => {
        setIsEditModalOpen(false);
        setSelectedItemIndex(null);
    };

    const handleEditItem = (name: string, description: string, price: number) => {
        if (selectedCategoryIndex !== null && selectedItemIndex !== null) {
            const newCategories = [...categories];
            newCategories[selectedCategoryIndex].items[selectedItemIndex] = { name, price, description, isActive: true };
            setCategories(newCategories);
            closeEditModal();
        }
    };

    const handleRemoveItem = () => {
        if (selectedCategoryIndex !== null && selectedItemIndex !== null) {
            const newCategories = [...categories];
            newCategories[selectedCategoryIndex].items.splice(selectedItemIndex, 1);
            setCategories(newCategories);
            closeEditModal();
        }
    };

    return (
        <Container>
            <Content>
                <Title>Cardápio</Title>
                <Subtitle>Adicione os melhores pratos de seu restaurante</Subtitle>
                <AddCategoryButton onClick={openCategoryModal}>Adicionar Categoria</AddCategoryButton>

                {categories.map((category, categoryIndex) => (
                    <CategoryContainer key={category.name}>
                        <div className="header" onClick={() => toggleCategory(categoryIndex)} style={{ display: 'flex', justifyContent: 'space-between', cursor: "pointer" }}>
                            <h2>{category.name}</h2>
                            <ExpandButton>
                                {category.expanded ? <IoIosArrowUp /> : <IoIosArrowDown />}
                            </ExpandButton>
                        </div>

                        {category.expanded && (
                            <>
                                {category.items.length > 0 && (
                                    <input
                                        type="text"
                                        placeholder="Pesquisar item..."
                                        value={category.searchTerm}
                                        onChange={(e) => handleSearchChange(categoryIndex, e.target.value)}
                                        className="search"
                                    />
                                )}
                                <ItemList>
                                    {category.items
                                        .filter(item => item.name.toLowerCase().includes(category.searchTerm.toLowerCase()))
                                        .map((item, itemIndex) => (
                                            <ItemRow key={item.name}>
                                                <div className="mobile_field">
                                                    <ItemName>{item.name}</ItemName>
                                                    <span id="mobile_price">{formatCurrency(item.price)}</span>
                                                </div>
                                                <span id="price">{formatCurrency(item.price)}</span>

                                                {item.description === "" ? (
                                                    <span id="no_description">Não possui descrição.</span>
                                                ) : (
                                                    <span id="description">{item.description}</span>
                                                )}

                                                <ItemActions>
                                                    <Switch isActive={item.isActive} onClick={() => toggleItemActiveStatus(categoryIndex, itemIndex)} />
                                                    <EditButton onClick={() => openEditModal(categoryIndex, itemIndex)}>
                                                        <MdOutlineEdit size={18} />
                                                    </EditButton>
                                                </ItemActions>
                                            </ItemRow>
                                        ))}
                                </ItemList>
                                <AddItemButton onClick={() => openItemModal(categoryIndex)}>Adicionar item</AddItemButton>
                            </>
                        )}
                    </CategoryContainer>
                ))}
            </Content>

            <AddItemModal
                isOpen={isItemModalOpen}
                onClose={closeItemModal}
                onAddItem={handleAddItem}
            />

            <AddCategoryModal
                isOpen={isCategoryModalOpen}
                onClose={closeCategoryModal}
                onAddCategory={handleAddCategory}
            />
            {isEditModalOpen &&
            <ItemModal
                isOpen={isEditModalOpen}
                onClose={closeEditModal}
                item={selectedItemIndex !== null && selectedCategoryIndex !== null ? categories[selectedCategoryIndex].items[selectedItemIndex] : null}
                onEditItem={handleEditItem}
                onRemoveItem={handleRemoveItem}
            />
            }
        </Container>
    );
}

export { Cardapio };
