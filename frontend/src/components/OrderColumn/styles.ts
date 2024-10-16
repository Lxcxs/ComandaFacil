// styles.ts
import styled from 'styled-components';

export const Column = styled.div`
  min-width: 450px; /* Largura da coluna */
  height: 90vh;
  padding: 0; /* Padding interno */
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); /* Sombra da coluna */
  display: flex;
  flex-direction: column;
  flex: 1;

  @media (max-width: 760px) {
    width: 100%;
    height: auto;
  }

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-weight: bold;
    margin-bottom: 10px;
    background-color: #00000063;
    padding: 10px;
    position: sticky;
    top: 0;
    width: 100%;

    .title {
      display: flex;
      align-items: center;

      span {
        margin-left: 5px; /* Espaçamento entre o ícone e o texto */
      }
    }

    #quantity {
      background: #00000063; /* Fundo branco para o contador */
      border-radius: 7px; /* Arredondado */
      padding: 5px 10px; /* Padding interno */
      font-size: 14px; /* Tamanho da fonte */
    }
  }

  .drag_box {
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 10px;
    flex-grow: 1; /* Permite que a caixa de drag cresça */
    overflow-y: auto; /* Rolagem vertical se necessário */

    span#time {
      padding: 0 3px;
      border: 1px solid #289adb;
      background: #2899db56;
      border-radius: 5px;
    }
    span#table {
      padding: 0 3px;
      border: 1px solid #db2828;
      background: #db282856;
      border-radius: 5px;
    }
  }
`;

export const Item = styled.div`
  background: #222; /* Fundo branco para os itens */
  padding: 10px;
  border-radius: 5px; /* Bordas arredondadas */
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1); /* Sombra dos itens */
  cursor: default; /* Cursor de "pegar" para itens arrastáveis */

  &:hover {
    background: #333; /* Fundo ao passar o mouse */
  }

  .order_header {
    display: flex;
    justify-content: space-between; /* Espaço entre os elementos */
    margin-bottom: 5px; /* Margem abaixo do cabeçalho */
  }

  .item_box {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 3px;
    padding: 10px 0;
    
    div.item {
      display: flex;
      justify-content: space-between;
      font-size: 14px;
    }
    .list {
      padding: 0 20px;
      color: #c0c0c0;
    }
    .obs {
      padding-top: 1em;
    }
  }

  .footer {
    display: flex;
    justify-content: space-between; /* Espaço entre os botões */
  }

  button {
    padding: 5px 10px; /* Padding dos botões */
    border: none; /* Sem bordas */
    border-radius: 5px; /* Bordas arredondadas */
    cursor: pointer; /* Cursor de ponteiro */
    transition: background 0.2s; /* Efeito de transição ao passar o mouse */

    &:hover {
      background: #007bff; /* Cor ao passar o mouse */
      color: white; /* Cor do texto ao passar o mouse */
    }
  }
`;
