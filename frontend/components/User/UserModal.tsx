import Modal from "react-modal";

type ModalUserProps = {
  modalIsOpen: boolean;
  closeModal: () => void;
  name: string;
  saveUser: () => void;
  setName: (name: string) => void;
};

export function UserModal({ modalIsOpen, closeModal, name, saveUser, setName}: ModalUserProps) {
  Modal.setAppElement("#modal-root");

  return (
    <Modal isOpen={modalIsOpen} onRequestClose={closeModal}>
      <header className="d-flex justify-content-between border-bottom pb-2">
        <h3>Usuários</h3>
        <div>
          <button type="button" className="btn btn-outline-danger btn-sm" onClick={() => closeModal()}>
            Fechar
          </button>
        </div>
      </header>
      <div className="mb-3 mt-3">
        <label className="form-label" htmlFor="name">
          Nome
        </label>
        <input type="text" className="form-control" id="name" value={name} onChange={(e) => setName(e.target.value)}  required/>
      </div>
      <div>
        <button type="button" className="btn btn-outline-primary btn-sm me-3" onClick={() => saveUser()}>
          Salvar usuário
        </button>
      </div>
    </Modal>
  );
}
