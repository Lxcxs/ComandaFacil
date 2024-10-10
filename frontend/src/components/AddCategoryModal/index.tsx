import React from "react";
import { ModalContainer, DetailsContainer, Close, Add } from './styles'; // Importando os estilos do modal

interface AddCategoryModalProps {
    isOpen: boolean;
    onClose: () => void;
    onAddCategory: (name: string) => void;
}

const AddCategoryModal: React.FC<AddCategoryModalProps> = ({ isOpen, onClose, onAddCategory }) => {
    const [categoryName, setCategoryName] = React.useState("");

    if (!isOpen) return null;
    const handleOutsideClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };
    const handleAddCategory = () => {
        if (categoryName.trim() === "") {
            // Aqui você pode adicionar um alerta ou feedback para o usuário
            return; // Previne a adição de categorias inválidas
        }
        onAddCategory(categoryName);
        setCategoryName("");
        onClose();
    };

    return (
        <ModalContainer onClick={handleOutsideClick}>
            <DetailsContainer>
                <div className="details_header">
                    <h2>Adicionar Categoria</h2>
                </div>
                <div className="item_list">
                    <input
                        type="text"
                        placeholder="Nome da categoria"
                        value={categoryName}
                        onChange={(e) => setCategoryName(e.target.value)}
                    />
                </div>
                <div className="footer">
                    <Add onClick={handleAddCategory}>Adicionar</Add>
                    <Close onClick={onClose}>Fechar</Close>
                </div>
            </DetailsContainer>
        </ModalContainer>
    );
};

export default AddCategoryModal;
