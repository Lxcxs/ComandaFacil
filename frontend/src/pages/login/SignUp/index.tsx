import { Button, Form, InputContent, NoticeError, TitleForm } from "../styles";
import Input from "../../../components/Forms/Input";
import useForm from "../../../Hooks/useForm";
import { RiAlertFill } from "react-icons/ri";
import * as React from "react";

function SignUp() {

  const fields = {
    username: useForm(null),
    email: useForm("email"),
    storeName: useForm(null),
    storeTable: useForm(null),
    document: useForm(null),
    password: useForm("password"),
    passwordCheck: useForm("password"),
  };

  const [error, setError] = React.useState<string | null>(null);

  function handleForm(event: React.FormEvent) {
    event.preventDefault();

    const { username, password, passwordCheck, storeTable, document, email, storeName } = fields;

    if (Object.values(fields).some((field) => !field.value)) {
      setError("Preencha todos os campos!");
      return;
    }

    if (password.value !== passwordCheck.value) {
      setError("As senhas não são iguais!");
      return;
    }

    const userData = {
      userName: username.value,
      userEmail: email.value,
      userPassword: password.value,
      userDocument: document.value,
    };
    const storeData = {
      storeName: storeName.value,
      storeImage: "",
      storeTableAmount: parseInt(storeTable.value),
    }

    localStorage.setItem('userData', JSON.stringify(userData));
    localStorage.setItem('storeData', JSON.stringify(storeData));
    Object.values(fields).forEach((field) => field.setValue(""));
    setError(null);
  }

  return (

    <Form onSubmit={handleForm}>
      <TitleForm>
        <h1>Cadastre sua Loja</h1>
      </TitleForm>

      <InputContent>
        <Input type="text" label="Nome" name="username" placeholder="Digite seu nome" required {...fields.username} />
        <Input type="email" label="Email" name="email" placeholder="Ex: email@gmail.com" required {...fields.email} />
        <Input type="text" label="Qual o nome da sua loja?" name="loja" placeholder="Ex: Restaurante Bacana" required {...fields.storeName} />
        <Input type="number" label="Quantas mesas possui no local?" name="mesas" placeholder="Ex: 14" required {...fields.storeTable} />
        <Input type="number" label="CPF/CNPJ" name="documento" placeholder="Ex: 000.000.000-00" required {...fields.document} />
        <Input type="password" label="Senha" name="senha" placeholder="Entre com sua senha" required {...fields.password} />
        <Input type="password" label="Confirmar senha" name="senha2" placeholder="Confirme sua senha" required {...fields.passwordCheck} />
        {error && <NoticeError><RiAlertFill color="red" /> {error}</NoticeError>}
      </InputContent>

      <Button type="submit">
        Cadastrar
      </Button>
    </Form>
  );
}

export default SignUp;
