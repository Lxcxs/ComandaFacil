import { TiWarning } from "react-icons/ti";
import { Button } from "../../../styles/Button/styles";
import { Modal } from "../styles";
import myImage from "../../../assets/image.jpg";
import React from "react";
import { IoClose } from "react-icons/io5";

interface IImage {
  preview: string;
  raw: File;
}

interface AddPhotoModalProps {
  isOpen: boolean;
  onClose: () => void;
  handleSubmit: () => void;
}

function AddPhotoModal({ isOpen, onClose, handleSubmit }: AddPhotoModalProps) {

  const [img, setImg] = React.useState<IImage>({
    preview: '',
    raw: new File([], ''),
  });

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
    handleSubmit();
  };

  function handleImgChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (file) {
      setImg({
        preview: URL.createObjectURL(file),
        raw: file,
      });
    }
  }
  if (!isOpen) {
    return null;
  }

  return (
    <Modal onClick={handleOverlayClick}>
      <div id="modal-content">
        <div onClick={onClose} className="closeModal">
          <IoClose size={22} />
        </div>

        <div className="select-image">
          {img.preview ? (
            <img className="image" src={img.preview} alt="Preview" />
          ) : (
            <img className="image" src={myImage} alt="Default" />
          )}

          <input
            type="file"
            name="myImage"
            accept=".png,.jpeg,.jpg"
            className="file"
            onChange={handleImgChange} />

          <p>Clique para selecionar uma foto de perfil.</p>
        </div>
        <div>
          <p style={{ textAlign: 'center', color: 'yellow' }}>
            <TiWarning color="yellow" size={25} />
            Esta imagem será exibida para os clientes!
          </p>
          <Button>
            Finalizar
          </Button>
        </div>
      </div>
    </Modal>
  );
}

export { AddPhotoModal };
