import React from "react";
import { FaCircle } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";
import { MdOutlineSpaceDashboard, MdListAlt, MdOutlineFastfood, MdOutlineTableBar } from "react-icons/md";
import { DMenu } from "./styles";
import { Outlet } from "react-router";

export function Menu() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (

    <DMenu menu={isMenuOpen}>
      <div className="header">
        <img src="https://t4.ftcdn.net/jpg/00/65/77/27/360_F_65772719_A1UV5kLi5nCEWI0BNLLiFaBPEkUbv5Fv.jpg" />

        <div className="profile">
          <h1>Lorem Ipsum</h1>
          <p>{isMenuOpen ? "Online" : "On"} <FaCircle color="#00e700" /></p>
        </div>

      </div>
      <div className="navigator">
        <a href="#">
          <span>
            <MdOutlineSpaceDashboard size={26} />
            Dashboard
          </span>
          <IoIosArrowForward />
        </a>
        <a href="#">
          <span>
            <MdListAlt size={26} />
            Pedidos
          </span>
          <IoIosArrowForward />
        </a>
        <a href="#">
          <span>
            <MdOutlineFastfood size={26} />
            Cardápio
          </span>
          <IoIosArrowForward />
        </a>
        <a href="#">
          <span>
            <MdOutlineTableBar size={26} />
            Mesas
          </span>
          <IoIosArrowForward />
        </a>
      </div>
      <div className="activeMenu" onClick={() => setIsMenuOpen(!isMenuOpen)}>
        <IoIosArrowForward size={40} />
      </div>
      <Outlet />
    </DMenu>

  );
}

export default Menu;