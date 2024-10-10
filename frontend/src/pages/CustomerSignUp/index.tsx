import { FormEvent } from "react";
import Input from "../../components/Forms/Input";
import { Button } from "../../styles/Button/styles";
import { Container, Content, FormContent } from "./styles";
import { FaCircle } from "react-icons/fa";
import { NavLink } from "react-router-dom";

function CustomerSignup() {

    function handleForm(e: FormEvent) {
        e.preventDefault();
    }

    return (
        <Container>
            <Content>
                <div className="header">
                    <h3>Bem vindo(a) ao</h3>
                    <div>
                        <h1>Nome do Restaurante</h1>
                        <span><FaCircle />Aberto</span>
                    </div>
                </div>
            </Content>

            <FormContent>
                <Input type="text" name="name" label="Nome" required={true} placeholder="Ex: Fulano da Silva" />
                <Input type="number" name="table" label="Qual o número da sua mesa?" required={true} placeholder="Ex: 15" />
                <Input type="number" name="peopleAmount" label="Quantas pessoas estão na mesa?" required={true} placeholder="Ex: 4" />

                <NavLink to="/restaurante/cardapio" id="logout" style={{ color: "#fff" }}>
                    <Button onSubmit={() => handleForm} type="submit">Acessar</Button>
                </NavLink>
            </FormContent>
        </Container>
    )
}

export { CustomerSignup };