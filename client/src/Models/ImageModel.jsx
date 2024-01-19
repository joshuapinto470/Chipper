import React from "react";
import { Modal, Button } from "flowbite-react";

function ImageModel({ visible, onClose, image_url }) {
  return (
    <Modal dismissible show={visible} size='7xl' onClose={onClose} className="bg-opacity-90 bg-black">
      <Modal.Header/>
      <Modal.Body>
        <img src={image_url}/>
      </Modal.Body>
    </Modal>
  );
}

export default ImageModel;
