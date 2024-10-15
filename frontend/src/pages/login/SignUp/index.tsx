import { Form, InputContent, NoticeError, TitleForm } from "../styles";
import Input from "../../../components/Forms/Input";
import useForm from "../../../components/Hooks/useForm";
import { RiAlertFill } from "react-icons/ri";
import * as React from "react";
import { Button } from "../../../styles/Button/styles";
import { useRegister } from "../../../components/Hooks/useRegister";

function SignUp() {
  const { registerAndLogin, error, loading } = useRegister();

  const fields = {
    username: useForm(null),
    email: useForm("email"),
    storeName: useForm(null),
    storeTable: useForm(null),
    document: useForm(null),
    password: useForm("password"),
    passwordCheck: useForm("password"),
  };

  async function handleForm(event: React.FormEvent) {
    event.preventDefault();

    const { username, password, storeTable, document, email, storeName } = fields;
    const userData = {
      userName: username.value,
      userEmail: email.value,
      userPassword: password.value,
      userDocument: document.value,
    };

    const storeData = {
      storeName: storeName.value,
      storeImage: "non", // Imagem estática por enquanto
      storeTableAmount: parseInt(storeTable.value), // Número de mesas
      userId: 0, // Será preenchido após criar o usuário
    };

    // Chamando a função registerAndLogin e criando as mesas após o registro
    await registerAndLogin(userData, storeData, email.value, password.value);

    // Limpar os campos após o envio
    Object.values(fields).forEach((field) => field.setValue(""));
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
      <Button type="submit" disabled={loading}>
        {loading ? "Carregando..." : "Continuar"}
      </Button>
    </Form>
  );
}

export default SignUp;
