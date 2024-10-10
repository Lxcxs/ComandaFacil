import { useState } from "react";
import {
  GarconContainer,
  GarconCard,
  AddGarconButton,
  ModalOverlay,
  ModalContent,
} from "./styles";
import { MdTableBar } from "react-icons/md";

interface Garcon {
  nome: string;
  mesas: number[];
}

const GarconList = ({ garcons }: { garcons: Garcon[] }) => {
  const [showModal, setShowModal] = useState(false);
  const [newGarconName, setNewGarconName] = useState("");
  const [garconList, setGarconList] = useState<Garcon[]>(garcons);

  const handleAddGarcon = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setNewGarconName(""); // Resetar o nome do garçom
  };

  const handleSaveGarcon = () => {
    if (newGarconName) {
      setGarconList([...garconList, { nome: newGarconName, mesas: [] }]);
      handleCloseModal();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewGarconName(e.target.value);
  };

  return (
    <>
      <GarconContainer>
        <AddGarconButton onClick={handleAddGarcon}>Adicionar Garçom</AddGarconButton>
        <div className="garcon-grid">
          {garconList.map((garcon, index) => (
            <GarconCard key={index}>
              <div className="garcon-info">
                <h3>{garcon.nome}</h3>
                {/* <span id="calling">Atendendo: {garcon.mesas.length} mesa(s)</span> */}
              </div>
              <div className="mesas">
                {garcon.mesas.length > 0 ? (
                  garcon.mesas.map((mesa, i) => (
                    <span key={i}>
                      <MdTableBar size={20} /> {mesa}
                    </span>
                  ))
                ) : (
                  <span>...</span>
                )}
              </div>
            </GarconCard>
          ))}
        </div>
      </GarconContainer>

      {showModal && (
        <ModalOverlay onClick={handleCloseModal}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <h2>Adicionar Novo Garçom</h2>
            <input
              type="text"
              value={newGarconName}
              onChange={handleInputChange}
              placeholder="Nome do Garçom"
            />
            <div>
              <button onClick={handleSaveGarcon}>Salvar</button>
              <button onClick={handleCloseModal}>Fechar</button>
            </div>
          </ModalContent>
        </ModalOverlay>
      )}
    </>
  );
};

export default GarconList;
