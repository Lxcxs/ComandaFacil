import React, { useState, useEffect } from 'react';
import {
    ModalContainer,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    Input,
    Textarea,
    ModalContent,
} from './styles';

interface ItemModalProps {
    isOpen: boolean;
    onClose: () => void;
    item: { name: string; description: string; price: number } | null;
    onEditItem: (name: string, description: string, price: number) => void;
    onRemoveItem: () => void;
}

const ItemModal: React.FC<ItemModalProps> = ({ onClose, item, onEditItem, onRemoveItem }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState(0);

    useEffect(() => {
        if (item) {
            setName(item.name);
            setDescription(item.description);
            setPrice(item.price);
        }
    }, [item]);

    const handleEdit = () => {
        onEditItem(name, description, price);
        onClose(); // Fechar o modal após editar
    };
    const handleOutsideClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      };

    return (
        <ModalContainer onClick={handleOutsideClick}>
            <ModalContent>
                <ModalHeader>
                    <h2>{item ? 'Editar Item' : 'Adicionar Item'}</h2>
                    <button onClick={onClose}>Fechar</button>
                </ModalHeader>
                <ModalBody>
                    <Input
                        type="text"
                        placeholder="Nome do item"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <Textarea
                        placeholder="Descrição do item"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <Input
                        type="number"
                        placeholder="Preço"
                        value={price}
                        onChange={(e) => setPrice(Number(e.target.value))}
                    />
                </ModalBody>
                <ModalFooter>
                    <Button onClick={handleEdit}>Salvar</Button>
                    <Button onClick={onRemoveItem} style={{ backgroundColor: '#ca463d' }}>Remover</Button>
                </ModalFooter>
            </ModalContent>
        </ModalContainer>
    );
};

export default ItemModal;
