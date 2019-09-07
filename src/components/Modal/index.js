// React & Styling
import React from 'react';
import './Modal.scss';

const Modal = props => {
  return (
    <div className="modal-container">
      <div className="background-modal"></div>
      <div className="modal-info">
        <h1>
          <i className="far fa-star" />
          {props.txt}
          <i className="far fa-star" />
        </h1>
        <button className="modal-btn" onClick={props.toggleModal}>
          close
        </button>
      </div>
    </div>
  );
};

export default Modal;
