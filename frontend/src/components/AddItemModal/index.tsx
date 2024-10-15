import React from "react";
import { ModalContainer, DetailsContainer, Close, Add } from './styles';

interface AddItemModalProps {
    isOpen: boolean;
    onClose: () => void;
    onAddItem: (itemName: string, itemDescription: string, itemValue: number, itemStatus: string, categoryId: number) => void; // Adicionando categoryId
    categoryId: number; // Nova propriedade
}

const AddItemModal: React.FC<AddItemModalProps> = ({ isOpen, onClose, onAddItem, categoryId }) => {
    const [itemName, setItemName] = React.useState("");
    const [itemDescription, setItemDescription] = React.useState("");
    const [itemValue, setItemValue] = React.useState<number | null>(null);
    const itemStatus = "available";

    if (!isOpen) return null;

    const handleOutsideClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    const handleAddItem = () => {
        if (itemName.trim() === "" || itemValue === null) {
            return;
        }
        onAddItem(itemName, itemDescription, itemValue, itemStatus, categoryId); // Passando o categoryId
        setItemName("");
        setItemValue(null);
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
                        value={itemValue !== null ? itemValue : ''} 
                        onChange={(e) => setItemValue(e.target.value ? parseFloat(e.target.value) : null)} 
                    />
                    <input
                        type="text"
                        placeholder="Descrição"
                        value={itemDescription !== null ? itemDescription : ''} 
                        onChange={(e) => setItemDescription(e.target.value)} 
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
