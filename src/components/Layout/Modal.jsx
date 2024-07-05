import React from 'react';
import "../../styles/Modal.css"; 

const Modal = ({ show, onClose, children }) => {
  if (!show) {
    return null;
  }

  return (
    <div className="modal">
      <div className="modal-content">
        {children}
        <div className="modal-buttons">
          <button onClick={onClose}>취소</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;