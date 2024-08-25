import React from "react";
import { Content, Menu } from "./styles";
import { FaCircle } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";
import { MdListAlt, MdOutlineFastfood, MdOutlineSpaceDashboard, MdOutlineTableBar } from "react-icons/md";

function Dashboard() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <>
      <Menu menu={isMenuOpen}>
        <div className="header">
          <img src="https://t4.ftcdn.net/jpg/00/65/77/27/360_F_65772719_A1UV5kLi5nCEWI0BNLLiFaBPEkUbv5Fv.jpg" />

          <div className="profile">
            <h1>Lorem Ipsum</h1>
            <p>On <FaCircle color="#00e700" /></p>
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
      </Menu>
      <Content>
        <div className="introduce">
          <h2>Olá "Nome de Usuário</h2>
          <p>Acompanhe suas estatísticas de hoje.</p>
        </div>

        <div className="container">
          <div className="performance">
            <h2>Meu desempenho</h2>

            <div className="statistics">
              <div className="bloco1">
                <div className="header">
                  <p>Número de pedidos:</p>
                </div>
                <div className="content">
                  <p>10</p>
                </div>
              </div>
              <div className="bloco2">
                <div className="header">
                  <p>Faturamento:</p>
                </div>
                <div className="content">
                  <p>10</p>
                </div>
              </div>
              <div className="bloco3">
                <div className="header">
                  <p>Total de clientes:</p>
                </div>
                <div className="content">
                  <p>10</p>
                </div>
              </div>
              <div className="bloco4">
                <div className="header">
                  <p>Mesas disponíveis:</p>
                </div>
                <div className="content">
                  <p>10</p>
                </div>
              </div>
            </div>
          </div>

          <div className="orders">
            <h2>Meus pedidos</h2>

            <div className="statistics">
              <div className="bloco1">
                <div className="header">
                  <p>Em análise:</p>
                </div>
                <div className="content">
                  <p>10</p>
                </div>
              </div>
              <div className="bloco2">
                <div className="header">
                  <p>Em produção:</p>
                </div>
                <div className="content">
                  <p>10</p>
                </div>
              </div>
              <div className="bloco3">
                <div className="header">
                  <p>Finalizados:</p>
                </div>
                <div className="content">
                  <p>10</p>
                </div>
              </div>
              <div className="bloco4">
                <div className="header">
                  <p>Comandas em aberto:</p>
                </div>
                <div className="content">
                  <p>10</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Content>
    </>
  );
}

export default Dashboard;