import { useEffect, useState } from "react";
import { BiFoodMenu } from "react-icons/bi";
import { IoCartOutline } from "react-icons/io5";
import { MdReorder } from "react-icons/md";
import { Container } from "./styles";
import { NavLink } from "react-router-dom";

// Interfaces para tipagem
interface Costumer {
  accountType: string;
  costumerName: string;
  costumerStatus: string;
  costumerTable: number;
  id: number;
  storeId: number;
  tableId: number;
}

export function NavigationMenu() {
  const [costumer, setCostumer] = useState<Costumer>({} as Costumer);

  useEffect(() => {
    // Acessar e armazenar os dados do localStorage quando o componente carregar
    const localCostumer = JSON.parse(localStorage.getItem("costumer") || '{}') as Costumer;

    // Atualizar os estados com os dados obtidos
    setCostumer(localCostumer);
  }, []);

  return (
    <Container>
      <div className="navigator">
        <div className="list">
          <NavLink to={`/${costumer.storeId}/${costumer.id}/cardapio`}>
            <BiFoodMenu className="icon" />
            <span id="text">Cardápio</span>
          </NavLink>
          <NavLink to="pedidos">
            <MdReorder className="icon" />
            <span id="text">Pedidos</span>
          </NavLink>
          <NavLink to="carrinho">
            <IoCartOutline className="icon" />
            <span id="text">Carrinho</span>
          </NavLink>
        </div>
      </div>
    </Container>
  );
}

export default NavigationMenu;
