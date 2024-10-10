import { BiFoodMenu } from "react-icons/bi";
import { IoCartOutline } from "react-icons/io5";
import { MdReorder } from "react-icons/md";
import { Container } from "./styles";
import { NavLink } from "react-router-dom";

export function NavigationMenu() {

  return (
    <Container>
      <div className="navigator">
        <div className="list">
          <NavLink to="/restaurante/cardapio">
            <BiFoodMenu className="icon" />
            <span id="text">Cardápio</span>
          </NavLink>
          <NavLink to="/restaurante/pedidos">
            <MdReorder className="icon" />
            <span id="text">Pedidos</span>
          </NavLink>
          <NavLink to="/restaurante/carrinho">
            <IoCartOutline className="icon" />
            <span id="text">Carrinho</span>
          </NavLink>
        </div>
      </div>
    </Container>
  );
}

export default NavigationMenu;
