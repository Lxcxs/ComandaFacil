import React, { useState } from "react";
import { FaCircle } from "react-icons/fa";
import { Container, Header, MenuContent, Categories, SearchBar, MenuList, Item, CategoryLink } from "./styles";
import ModalSelectItem from "../../components/ModalSelectItem";
import { formatCurrency } from "../../utils/formatCurrency";

interface MenuItem {
    id: number;
    name: string;
    description: string;
    price: number;
    imageUrl: string;
}

interface Category {
    id: number;
    name: string;
    items: MenuItem[];
}

const categories: Category[] = [
    {
        id: 1,
        name: "Burgers",
        items: [
            {
                id: 1,
                name: "Classic Cheeseburger",
                description: "A juicy beef patty with melted cheddar cheese, lettuce, tomato, and our special sauce.",
                price: 24.90,
                imageUrl: "https://images.tcdn.com.br/img/img_prod/832602/noticia_17733781276603f26fd6998.png",
            },
            {
                id: 2,
                name: "Bacon Deluxe",
                description: "A double patty burger with crispy bacon, cheddar cheese, and BBQ sauce.",
                price: 29.90,
                imageUrl: "https://images.tcdn.com.br/img/img_prod/832602/noticia_17733781276603f26fd6998.png",
            },
            {
                id: 3,
                name: "Veggie Burger",
                description: "A grilled vegetable patty with avocado, lettuce, and tomato.",
                price: 22.90,
                imageUrl: "https://images.tcdn.com.br/img/img_prod/832602/noticia_17733781276603f26fd6998.png",
            },
            {
                id: 4,
                name: "BBQ Chicken Burger",
                description: "Grilled chicken breast topped with BBQ sauce and crispy onions.",
                price: 27.90,
                imageUrl: "https://images.tcdn.com.br/img/img_prod/832602/noticia_17733781276603f26fd6998.png",
            },
        ],
    },
    {
        id: 2,
        name: "Pizzas",
        items: [
            {
                id: 5,
                name: "Pepperoni Pizza",
                description: "A classic pepperoni pizza with a crispy crust and a rich tomato sauce.",
                price: 39.90,
                imageUrl: "https://images.tcdn.com.br/img/img_prod/832602/noticia_17733781276603f26fd6998.png",
            },
            {
                id: 6,
                name: "Margarita Pizza",
                description: "Fresh mozzarella, basil, and tomato on a thin, crispy crust.",
                price: 35.90,
                imageUrl: "https://images.tcdn.com.br/img/img_prod/832602/noticia_17733781276603f26fd6998.png",
            },
            {
                id: 7,
                name: "Hawaiian Pizza",
                description: "Pizza topped with ham and pineapple.",
                price: 37.90,
                imageUrl: "https://images.tcdn.com.br/img/img_prod/832602/noticia_17733781276603f26fd6998.png",
            },
            {
                id: 8,
                name: "Four Cheese Pizza",
                description: "A blend of mozzarella, cheddar, gorgonzola, and parmesan.",
                price: 42.90,
                imageUrl: "https://images.tcdn.com.br/img/img_prod/832602/noticia_17733781276603f26fd6998.png",
            },
        ],
    },
    {
        id: 3,
        name: "Beverages",
        items: [
            {
                id: 9,
                name: "Coca-Cola",
                description: "A refreshing 350ml can of Coca-Cola.",
                price: 5.90,
                imageUrl: "https://images.tcdn.com.br/img/img_prod/832602/noticia_17733781276603f26fd6998.png",
            },
            {
                id: 10,
                name: "Orange Juice",
                description: "Freshly squeezed orange juice, served chilled.",
                price: 8.90,
                imageUrl: "https://images.tcdn.com.br/img/img_prod/832602/noticia_17733781276603f26fd6998.png",
            },
            {
                id: 11,
                name: "Lemonade",
                description: "A refreshing lemonade made with fresh lemons.",
                price: 6.90,
                imageUrl: "https://images.tcdn.com.br/img/img_prod/832602/noticia_17733781276603f26fd6998.png",
            },
            {
                id: 12,
                name: "Iced Tea",
                description: "Chilled iced tea with a hint of lemon.",
                price: 5.50,
                imageUrl: "https://images.tcdn.com.br/img/img_prod/832602/noticia_17733781276603f26fd6998.png",
            },
        ],
    },
    {
        id: 4,
        name: "Desserts",
        items: [
            {
                id: 13,
                name: "Chocolate Cake",
                description: "A rich and moist chocolate cake topped with chocolate ganache.",
                price: 12.90,
                imageUrl: "https://images.tcdn.com.br/img/img_prod/832602/noticia_17733781276603f26fd6998.png",
            },
            {
                id: 14,
                name: "Cheesecake",
                description: "Creamy cheesecake with a graham cracker crust.",
                price: 14.90,
                imageUrl: "https://images.tcdn.com.br/img/img_prod/832602/noticia_17733781276603f26fd6998.png",
            },
        ],
    },
    {
        id: 5,
        name: "Salads",
        items: [
            {
                id: 15,
                name: "Caesar Salad",
                description: "Romaine lettuce, croutons, and parmesan cheese tossed in Caesar dressing.",
                price: 15.90,
                imageUrl: "https://images.tcdn.com.br/img/img_prod/832602/noticia_17733781276603f26fd6998.png",
            },
            {
                id: 16,
                name: "Greek Salad",
                description: "Mixed greens, tomatoes, cucumbers, olives, and feta cheese with olive oil dressing.",
                price: 16.90,
                imageUrl: "https://images.tcdn.com.br/img/img_prod/832602/noticia_17733781276603f26fd6998.png",
            },
        ],
    },
];

function CustomerMenu() {
    const [searchTerm, setSearchTerm] = React.useState("");
    const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null); 
    const [isModalOpen, setIsModalOpen] = useState(false); 
    const [activeCategory, setActiveCategory] = useState<number | null>(null); // Adiciona estado para categoria ativa

    const openModal = (item: MenuItem) => {
        setSelectedItem(item);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setSelectedItem(null);
        setIsModalOpen(false);
    };

    const handleCategoryClick = (categoryId: number) => {
        setActiveCategory(categoryId); // Atualiza a categoria ativa
    };

    const filteredCategories = categories
        .map(category => ({
            ...category,
            items: category.items.filter(item =>
                item.name.toLowerCase().includes(searchTerm.toLowerCase())
            ),
        }))
        .filter(category => category.items.length > 0);

    return (
        <Container>
            <Header>
                <img src="https://www.shutterstock.com/image-vector/image-icon-600nw-211642900.jpg" alt="Restaurant Logo" />
                <div className="header_info">
                    <h3>Lorem Ipsum</h3>
                    <span><FaCircle /> Aberto</span>
                </div>
            </Header>

            <Categories>
                {categories.map(category => (
                    <CategoryLink
                        key={category.id}
                        href={`#category${category.id}`}
                        onClick={() => handleCategoryClick(category.id)} // Define a categoria ativa ao clicar
                        active={activeCategory === category.id} // Define a classe de estilo com base no estado
                    >
                        {category.name}
                    </CategoryLink>
                ))}
            </Categories>

            <MenuContent>
                <SearchBar
                    type="text"
                    placeholder="Buscar itens..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />

                <MenuList>
                    {filteredCategories.map(category => (
                        <div className="categories" key={category.id}>
                            <h2 id={`category${category.id}`}>{category.name}</h2>
                            <div className="section">
                                {category.items.map(item => (
                                    <Item key={item.id} onClick={() => openModal(item)}>
                                        <div className="item_info">
                                            <h4>{item.name}</h4>
                                            <p>{item.description}</p>
                                            <h4 id="price">{formatCurrency(item.price)}</h4>
                                        </div>
                                        <img src={item.imageUrl} alt={item.name} />
                                    </Item>
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
                />
            )}
        </Container>
    );
}

export { CustomerMenu };
