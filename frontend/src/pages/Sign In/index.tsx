import { Button, Container, Content, Form, Header, InputContent, NoticeError, TitleForm } from "./styles";
import Input from "../../components/Forms/Input";
import useForm from "../../Hooks/useForm";
import React from "react";
import { Link } from "react-router-dom";

function SignIn() {


  const fields = {
    username: useForm(null),
    password: useForm("password"),
    passwordCheck: useForm("password"),
    telefone: useForm(null),
    email: useForm("email"),
    storeName: useForm(null),
  };

  const [error, setError] = React.useState<string | null>(null)

  function handleForm() {
    // event.preventDefault();

    const { username, password, passwordCheck, telefone, email, storeName } = fields;

    if (Object.values(fields).some((field) => !field.value)) {
      setError("Preencha todos os campos!");

      return;
    }

    if (password.value !== passwordCheck.value) {
      setError("As senhas não são iguais");

      return;
    }

    const data = {
      name: username.value,
      email: email.value,
      password: password.value,
      telefone: telefone.value,
      storeName: storeName.value,
    };

    console.log(data);

    Object.values(fields).forEach((field) => field.setValue(""));
    setError(null);
  }

  return (
    <Container>

      <Header>
        <h1>COMANDA FÁCIL</h1>
      </Header>

      <Content>
        <Form>
          <TitleForm>
            <h1>Cadastre sua Loja</h1>
          </TitleForm>

          <InputContent>
            <Input type="text" name="username" placeholder="Nome" required {...fields.username} />
            <Input type="email" name="email" placeholder="Email" required {...fields.email} />
            <Input type="password" name="senha" placeholder="Senha" required {...fields.password} />
            <Input type="password" name="confirmarsenha" placeholder="Confirmar Senha" required {...fields.passwordCheck} />
            <Input type="tel" name="telefone" placeholder="Telefone (00) 00000 0000" required {...fields.telefone} />
            <Input type="text" name="loja" placeholder="Nome da Loja" required {...fields.storeName} />
            {error && <NoticeError>{error}</NoticeError>}
          </InputContent>

          <Link to={"/Dashboard"} onClick={handleForm}>
            <Button>
              Cadastrar
            </Button>
          </Link>
        </Form>
      </Content>

    </Container>
  );
}

export default SignIn;