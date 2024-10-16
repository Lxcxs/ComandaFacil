import Input from "../../../components/Forms/Input";
import { useLogin } from "../../../components/Hooks/login";
import useForm from "../../../components/Hooks/useForm";
import { TitleForm, Form, InputContent, NoticeError, Button } from "../styles";
import React from "react";

function SignIn() {
  const { login, loading } = useLogin();
  const [error, setNewError] = React.useState<string | null>(null);
  const [accountType, setAccountType] = React.useState<string>('admin');
  const handleAccountTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setAccountType(event.target.value);
  };
  const fields = {
    email: useForm(null),
    password: useForm(null),
    accountType: useForm(null)
  };

  async function handleForm(event: React.FormEvent) {
    event.preventDefault();
    const { email, password } = fields;

    if (email.error || password.error) {
      setNewError("Preencha os campos corretamente.");
      // console.log(email, password)
      return
    }
    const data = {
      loginEmail: email.value,
      loginPassword: password.value,
      accountType,
    }
    login(data)
    setNewError(null)
  }

  return (

    <Form onSubmit={handleForm}>
      <TitleForm>
        <h1>Acesse sua Loja</h1>
      </TitleForm>

      <div style={{ color: "yellow", fontStyle: "italic", fontSize: "12px" }}>
        O acesso à garçons apenas se o estabelecimento estiver online no sistema!
      </div>

      <InputContent>
        <Input type="email" label="Email" name="email" placeholder="Ex: email@gmail.com" required {...fields.email} />
        <Input type="password" label="Senha" name="senha" placeholder="Entre com sua senha" required {...fields.password} />
        {error && <NoticeError>{error}</NoticeError>}
      </InputContent>

      <div id="select">
        <h3>Você é:</h3>
        <select
          name="account"
          id="account-type-select"
          value={accountType}
          onChange={handleAccountTypeChange}>
          <option value="admin" selected>Proprietário</option>
          <option value="employee">Funcionário</option>
        </select>


      </div>

      <Button type="submit">
        {loading ? "Entrando" : "Entrar"}
      </Button>
    </Form>

  )
}

export default SignIn;