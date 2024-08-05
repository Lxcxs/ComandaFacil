import { Link } from "react-router-dom";

function Home() {
  return ( 
    <>
      <nav>
        <Link to="Login">Cadastrar</Link>
        <Link to="Dashboard">Dashboard</Link>
      </nav>
    </>
   );
}

export default Home;