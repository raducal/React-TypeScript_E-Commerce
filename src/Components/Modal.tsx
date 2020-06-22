import React from "react";

interface IProps {
  closeModal: () => void;
}

const Modal: React.FC<IProps> = ({ closeModal, children }) => {
  return (
    <div className="modalOverlay">
      <div className="modal">
        <button className="closeModalBtn" onClick={closeModal}>
          X
        </button>
        <div className="modalContent">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
