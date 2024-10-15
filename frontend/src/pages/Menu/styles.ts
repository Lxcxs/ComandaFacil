import styled from 'styled-components';

export const Container = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #121212;

    @media (max-width: 768px) {
        padding-top: 10vh;
        height: auto;
    }

    @media (max-width: 480px) {
        flex-direction: column;
        justify-content: center;
        padding: 05px;
    }
`;

// Container principal da página
export const Content = styled.div`
    width: 850px;
    padding-left: 100px;
    color: #fff;
    font-family: 'Arial', sans-serif;

    @media (max-width: 1000px) {
        width: 100%;
        padding-right: 20px;
    }
    @media (max-width: 760px) {
        padding-left: 20px;
    }
    @media (max-width: 480px) {
        padding-top: 10vh;
        width: 100%;
        padding-left: 0;
        padding-right: 0;
        padding-bottom: 10vh;
    }
`;

// Título principal da página
export const Title = styled.h1`
    font-size: 24px;
    margin-bottom: 10px;

    @media (max-width: 768px) {
        font-size: 22px;
    }

    @media (max-width: 480px) {
        font-size: 20px;
    }
`;

// Subtítulo logo abaixo do título principal
export const Subtitle = styled.h3`
    margin-bottom: 20px;
    font-weight: 400;

    @media (max-width: 768px) {
        font-size: 18px;
    }

    @media (max-width: 480px) {
        font-size: 16px;
    }
`;

// Botão para adicionar categoria
export const AddCategoryButton = styled.button`
    background-color: #d6313b;
    color: white;
    border: none;
    padding: 10px 15px;
    font-size: 16px;
    cursor: pointer;
    border-radius: 10px;
    margin-bottom: 20px;
    
    &:hover {
        background-color: #a3262e;
    }

    @media (max-width: 768px) {
        width: 100%;
        font-size: 14px;
        padding: 12px 12px;
        border-radius: 10px;
    }

    @media (max-width: 480px) {
        font-size: 12px;
        padding: 12px 10px;
    }
`;

// Container de cada categoria (Entradas, Pratos Principais, etc.)
export const CategoryContainer = styled.div`
    background-color: #1e1e1e;
    border-radius: 15px;
    padding: 20px;
    margin-bottom: 20px;
    /* box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3); */

    div.header {
        display: flex;
        justify-content: space-between;
        padding: 5px;
        border-radius: 5px;

    }

    input.search {
        margin: 10px 0;
        width: 100%;
        padding: 7px 10px;
        border: 2px solid #444; /* Cor da borda */
        border-radius: 15px; /* Bordas arredondadas */
        font-size: 16px; /* Tamanho da fonte */
        color: #e3e3e3; /* Cor do texto */
        background-color: #222; /* Cor de fundo */
        transition: border-color 0.3s ease; /* Transição suave para mudança de borda */

    &:focus {
        border-color: #a3262e; /* Cor da borda ao focar */
        outline: none; /* Remove o contorno padrão do navegador */
        background-color: #333; /* Muda a cor de fundo ao focar */
    }

    &::placeholder {
        color: #aaa; /* Cor do texto do placeholder */
        opacity: 1; /* Garante que a opacidade do placeholder seja visível */
    }
    }

    @media (max-width: 768px) {
        padding: 15px;
        border-radius: 10px;
    }

    @media (max-width: 480px) {
        padding: 10px;
    }
`;

// Lista de itens de cada categoria
export const ItemList = styled.div`
    margin-top: 15px;
    transition: 1s ease;
    display: flex;
    flex-direction: column;
    gap: 3px;
`;

// Cada linha de item dentro da lista
export const ItemRow = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    align-items: center;
    padding: 10px;
    gap: 5px;
    /* border-bottom: 1px solid #333; */
    background: #333;
    border-radius: 4px;
    transition: all ease-in-out .1s;
    &:hover {
        background: #444;
    }
    span {
        cursor: default;
        font-size: 14px;
        color: #e3e3e3;
    }

    span#mobile_price {
        display: none;
    }
    span#price {
        justify-self: center;
    }

    span#description {
        white-space: nowrap; 
        overflow: hidden; 
        text-overflow: ellipsis; 
        max-width: 200px; 
        display: block; 
    }
    span#no_description {
        color: #929292;
        font-style: italic;
        font-weight: 200;
    }

    @media (max-width: 768px) {
        align-items: center;
        padding: 8px;
        font-size: 14px;
        grid-template-columns: 1fr 1fr 1fr;
        span {
            font-size: 12px;
        }
        span#description {
            display: block;
        }
        span#no_description {
            color: #777;
        }
        span#price {
            display: none;
        }
        span#mobile_price {
            display: block;
            font-size: 10px;
        }
    }

    @media (max-width: 480px) {
        padding: 8px 6px;
        font-size: 12px;
        span#no_description {
            font-size: 12px;
        }

    }
`;
export const ItemName = styled.span`
    white-space: nowrap; /* Não permite quebra de linha */
    overflow: hidden; /* Esconde o que não cabe */
    text-overflow: ellipsis; /* Adiciona os três pontinhos */
    max-width: 200px; /* Define a largura máxima do item */
    display: block; /* Necessário para o text-overflow funcionar corretamente */

    @media (max-width: 480px) {
        max-width: 100px;
        font-size: 10px;
    }
`;

// Ações para editar e remover o item
export const ItemActions = styled.div`
    display: flex;
    justify-content: flex-end;
    justify-self: flex-end;
    gap: 2vw;

    @media (max-width: 768px) {
        gap: 12px;
    }

    @media (max-width: 480px) {
        gap: 10px;
    }
`;

// Botão para adicionar um novo item
export const AddItemButton = styled.button`
    background-color: #d6313b;
    color: white;
    border: none;
    padding: 10px 15px;
    font-size: 14px;
    cursor: pointer;
    border-radius: 8px;
    margin-top: 10px;
    
    &:hover {
        background-color: #a3262e;
    }

    @media (max-width: 768px) {
        font-size: 12px;
        padding: 10px 12px;
    }

    @media (max-width: 480px) {
        width: 100%;
        font-size: 10px;
        padding: 10px 0;
    }
`;

// Botão de edição
export const EditButton = styled.button`
    background-color: #ffffff21;
    color: white;
    border: none;
    font-size: 14px;
    cursor: pointer;
    border-radius: 4px;
    display: flex;
    align-items: center;
    height: 100%;
    padding: 5px;
    
    &:hover {
        background-color: #ffffff38;
    }

    @media (max-width: 768px) {
        font-size: 12px;
        padding: 4px 8px;
    }

    @media (max-width: 480px) {
        font-size: 10px;
        padding: 3px 6px;
    }
`;

// Botão de remoção
export const RemoveButton = styled.button`
    background-color: #2c2c2c;
    color: white;
    border: none;
    padding: 5px 10px;
    font-size: 14px;
    cursor: pointer;
    border-radius: 4px;
    
    &:hover {
        background-color: #b71c1c;
    }

    @media (max-width: 768px) {
        font-size: 12px;
        padding: 4px 8px;
    }

    @media (max-width: 480px) {
        font-size: 10px;
        padding: 3px 6px;
    }
`;

// Componente do botão de expandir/recolher
export const ExpandButton = styled.button`
    background: transparent;
    color: white;
    border: none;
    cursor: pointer;
    font-size: 20px;

    @media (max-width: 768px) {
        font-size: 18px;
    }

    @media (max-width: 480px) {
        font-size: 16px;
    }
`;

// Switch de ativar/desativar
export const Switch = styled.button<{ isActive: boolean }>`
    background-color: ${(props) => (props.isActive ? '#3f97df' : '#cf4d43')};
    border: none;
    width: 40px;
    height: 20px;
    border-radius: 10px;
    cursor: pointer;
    position: relative;
    justify-self: center;
    top: 8px;

    &:before {
        content: '';
        position: absolute;
        width: 18px;
        height: 18px;
        background-color: white;
        border-radius: 50%;
        top: 1px;
        left: ${(props) => (props.isActive ? '20px' : '1px')};
        transition: left 0.2s;
    }
    &:after {
        content: "Disponível";
        display: block;
        position: absolute;
        top: -12px;
        left: -5px;
        color: #777;
        font-style: italic;
        font-size: 8px;
    }

    @media (max-width: 768px) {
        width: 36px;
        height: 18px;

        &:before {
            width: 16px;
            height: 16px;
            left: ${(props) => (props.isActive ? '18px' : '1px')};
        }
    }

    @media (max-width: 480px) {
        width: 30px;
        height: 16px;

        &:before {
            width: 14px;
            height: 14px;
            left: ${(props) => (props.isActive ? '16px' : '1px')};
        }
    }
`;
