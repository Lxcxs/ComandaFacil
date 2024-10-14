import { BiFoodMenu } from "react-icons/bi";
import { MdReorder } from "react-icons/md";
import { Container } from "./styles";
import { NavLink } from "react-router-dom";

export function WaiterMenu() {

  return (
    <Container>
      <div className="navigator">
        <div className="list">
          <NavLink to="/waiter/cardapio">
            <BiFoodMenu className="icon" />
            <span id="text">Cardápio</span>
          </NavLink>
          <NavLink to="tables">
            <MdReorder className="icon" />
            <span id="text">Mesas</span>
          </NavLink>
        </div>
      </div>
    </Container>
  );
}

export default WaiterMenu;
