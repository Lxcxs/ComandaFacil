import React from "react";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import { Container, Content, Header, ToggleBtn } from "./styles";


function Login() {

  const [accessType, setAccessType] = React.useState<true | false>(false);

  function toggleAccess() {
    setAccessType(!accessType);
  }

  return (
    <Container>
        <Header>Comanda Facil</Header>
      <Content>
        <ToggleBtn status={accessType} onClick={toggleAccess}>
          <div>
            <p>Entrar</p>
          </div>
          <div>
            <p>Cadastrar</p>
          </div>
          <div className="bg"></div>
        </ToggleBtn>
        {accessType ? (
          <SignIn />
        ) : (
          <SignUp />
        )}
      </Content>
    </Container>
  )
}

export default Login;