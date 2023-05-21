import { Modal, Button } from "react-bootstrap";
import styles from "../_styles/modals.module.css";

const DeleteModal = (props) => {
  return (
    <Modal show={props.isOpen} onHide={props.onClose}>
      <Modal.Header closeButton />
      <Modal.Body>
        <p className="text-center">Are you sure you want to delete?</p>
        <div className="d-flex justify-content-evenly">
          <Button className={styles.saveButton} onClick={props.onYesClick}>
            Yes
          </Button>
          <Button variant="secondary" onClick={props.onNoClick}>
            No
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default DeleteModal;
