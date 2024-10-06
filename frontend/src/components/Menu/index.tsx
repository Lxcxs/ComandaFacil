import React from "react";
import { FaCircle } from "react-icons/fa";
import { IoIosCheckmark } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";
import {
  MdOutlineSpaceDashboard,
  MdListAlt,
  MdOutlineFastfood,
  MdOutlineTableBar,
  MdLogout,
} from "react-icons/md";
import { IoIosArrowForward } from "react-icons/io";
import { DMenu } from "./styles";
import { NavLink } from "react-router-dom";

export function Menu() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <DMenu menu={isMenuOpen}>
      <div className="navigator">
        <div className="header" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <h4>Menu</h4>
          <div className="activeMenu">
            {isMenuOpen ? (
              <IoIosArrowBack size={26} />
            ) : (
              <IoIosArrowForward size={26} />
            )}
          </div>
        </div>
        <div className="list">
          <NavLink to="/">
            <MdOutlineSpaceDashboard size={26} />
            <span id="text">Dashboard</span>
          </NavLink>
          <NavLink to="/pedidos">
            <MdListAlt size={26} />
            <span id="text">Pedidos</span>
          </NavLink>
          <NavLink to="/cardapio">
            <MdOutlineFastfood size={26} />
            <span id="text">Cardápio</span>
          </NavLink>
          <NavLink to="/none">
            <MdOutlineTableBar size={26} />
            <span id="text">Mesas</span>
          </NavLink>
        </div>
      </div>
      {isMenuOpen ?
        <span id="comandafacil">Comanda Fácil<IoIosCheckmark size={30} /></span> :
        <img id="logo" alt="comanda fácil" src="src\assets\comandalogo.png" />
      }
      
      <div className="footer">
        <div id="profile">
          <img src="https://t4.ftcdn.net/jpg/00/65/77/27/360_F_65772719_A1UV5kLi5nCEWI0BNLLiFaBPEkUbv5Fv.jpg" />

          <div className="profile">
            <h4>Lorem Ipsum</h4>
            <p>
              Online <FaCircle color="#00e700" />
            </p>
          </div>
        </div>
        <NavLink to="/authentication" id="logout" style={{ color: "#fff" }}>
          <MdLogout size={24} />
        </NavLink>
      </div>

    </DMenu>
  );
}

export default Menu;
