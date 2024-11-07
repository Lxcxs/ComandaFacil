import { TfiPanel } from "react-icons/tfi"
import { Container, Content } from "./styles"
import { MdOutlineRestaurantMenu } from "react-icons/md"
import { useNavigate } from "react-router"


function Wellcome() {
  const navigate = useNavigate();
  function handleClickManager() {
    navigate('/enter')
  }
  function handleClickUser() {
    navigate('/57/enter')
  }

  return (
    <Container>
      <Content>
        <img src="src\assets\comandalogo.png" />
        <h1>Bem Vindo(a)</h1>
        <h3>ao Comanda <span id="cf">Fácil</span></h3>
        <div className="container">
          <div>
            <p>Quer ver como funciona nosso gerenciador de Restaurantes?</p>
            <button onClick={handleClickManager}><TfiPanel size={18} />Clique Aqui</button>
          </div>
          <div>
            <p>Quer ver como os clientes veem seu restaurante pelo nosso site?<span id="warn">(Recomendamos acessar por celular, ou aplicar pelo navegador uma interface mobile)</span></p>
            <button onClick={handleClickUser}><MdOutlineRestaurantMenu size={18} />Clique Aqui</button>
          </div>
        </div>
      </Content>
    </Container>
  )
}

export default Wellcome