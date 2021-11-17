import Modal from "react-modal";

type TaskModalProps = {
  modalIsOpen: boolean;
  closeModal: () => void;
  description: string;
  setDescription: (description: string) => void;
  status: string;
  setStatus: (state: string) => void;
  saveTask: () => void;
  // setName: (name: string) => void;
};

export function TaskModal({ modalIsOpen, closeModal, description, setDescription, status, setStatus, saveTask }: TaskModalProps) {
  Modal.setAppElement("#modal-root");

  return (
    <Modal isOpen={modalIsOpen} onRequestClose={closeModal}>
      <header className="d-flex justify-content-between border-bottom pb-2">
        <h3>Tarefa</h3>
        <div>
          <button type="button" className="btn btn-outline-danger btn-sm" onClick={() => closeModal()}>
            Fechar
          </button>
        </div>
      </header>
      <div className="mb-3 mt-3">
        <label className="form-label" htmlFor="name">
          Descrição
        </label>
        <input
          type="text"
          className="form-control"
          id="name"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>
      <div className="mb-3">
        <label className="form-label" htmlFor="state">
          Status
        </label>
        <select className="form-select" id="state" onChange={(e) => setStatus(e.target.value)} value={status}>
          <option value="pendente">Pendente</option>
          <option value="feito">Feito</option>
        </select>
      </div>
      <div>
        <button type="button" className="btn btn-outline-primary btn-sm me-3" onClick={() => saveTask()}>
          Salvar tarefa
        </button>
      </div>
    </Modal>
  );
}
