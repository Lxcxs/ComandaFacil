import React from "react";
import { ModalContainer, DetailsContainer, Close, Add } from './styles'; // Importando os estilos do modal

interface AddItemModalProps {
    isOpen: boolean;
    onClose: () => void;
    onAddItem: (name: string, description: string, price: number) => void;
}

const AddItemModal: React.FC<AddItemModalProps> = ({ isOpen, onClose, onAddItem }) => {
    const [itemName, setItemName] = React.useState("");
    const [itemDescription, setItemDescription] = React.useState("");
    const [itemPrice, setItemPrice] = React.useState<number | null>(null); // Inicia como null

    if (!isOpen) return null;
    const handleOutsideClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };
    const handleAddItem = () => {
        if (itemName.trim() === "" || itemPrice === null) {
            return;
        }
        onAddItem(itemName, itemDescription, itemPrice);
        setItemName("");
        setItemPrice(null);
        setItemDescription("");
        onClose();
    };

    return (
        <ModalContainer onClick={handleOutsideClick}>
            <DetailsContainer>
                <div className="details_header">
                    <h2>Adicionar Item</h2>
                </div>
                <div className="item_list">
                    <input
                        type="text"
                        placeholder="Nome do item"
                        value={itemName}
                        onChange={(e) => setItemName(e.target.value)}
                    />
                    <input
                        type="number"
                        placeholder="Preço do item"
                        value={itemPrice !== null ? itemPrice : ''} // Converte null para string vazia
                        onChange={(e) => setItemPrice(e.target.value ? parseFloat(e.target.value) : null)} // Converte string para número
                    />
                                        <input
                        type="text"
                        placeholder="Descrição"
                        value={itemDescription !== null ? itemDescription : ''} // Converte null para string vazia
                        onChange={(e) => setItemDescription(e.target.value)} // Converte string para número
                    />
                </div>
                <div className="footer">
                    <Add onClick={handleAddItem}>Adicionar</Add>
                    <Close onClick={onClose}>Fechar</Close>
                </div>
            </DetailsContainer>
        </ModalContainer>
    );
};

export default AddItemModal;
