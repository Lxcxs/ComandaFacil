import { GarconContainer, GarconButton, AddGarconButton } from "./styles";

const GarconList = ({ garcons }: { garcons: Array<{ nome: string; mesas: number }> }) => {
  return (
    <GarconContainer>
      {garcons.map((garcon, index) => (
        <GarconButton key={index}>
          {garcon.nome}
          <span>{garcon.mesas}</span>
        </GarconButton>
      ))}
      <AddGarconButton>Adicionar Garçom</AddGarconButton>
    </GarconContainer>
  );
};

export default GarconList;
