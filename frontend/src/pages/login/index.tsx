import React from "react";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import { Container, Content, ToggleBtn } from "./styles";


function Login() {

  const [accessType, setAccessType] = React.useState<true | false>(true);

  function toggleAccess() {
    setAccessType(!accessType);
  }

  return (
    <Container>
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