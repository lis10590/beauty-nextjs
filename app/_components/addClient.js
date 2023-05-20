import { Modal, Button } from "react-bootstrap";
import InputComponent from "./inputComponent";
import { faUser, faMobilePhone } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { clientAddition } from "../store/clients";
import useInput from "../_hooks/useInput";
import styles from "../_styles/modals.module.css";

const AddClient = (props) => {
  const dispatch = useDispatch();

  let fullNameRegex = new RegExp("[A-Za-z]+\\s[A-Za-z]{2,}");
  let phoneNumberRegex = new RegExp("^[0][5][0-9]{8}");

  const {
    value: fullName,
    hasError: fullNameInputHasError,
    valueChangeHandler: fullNameChangeHandler,
    inputBlurHandler: fullNameBlurHandler,
    reset: resetFullName,
  } = useInput((value) => fullNameRegex.test(value));

  const {
    value: phoneNumber,
    hasError: phoneNumberInputHasError,
    valueChangeHandler: phoneNumberChangeHandler,
    inputBlurHandler: phoneNumberBlurHandler,
    reset: resetPhoneNumber,
  } = useInput((value) => phoneNumberRegex.test(value));

  const addNewClientHandler = (event) => {
    event.preventDefault();
    if (!fullNameInputHasError && !phoneNumberInputHasError) {
      const client = {
        fullName,
        phoneNumber,
      };
      dispatch(clientAddition(client));
      props.onClose();
      resetFullName();
      resetPhoneNumber();
    }
  };

  return (
    <Modal show={props.isOpen} onHide={props.onClose}>
      <Modal.Header className={styles.modalHeader} closeButton>
        <Modal.Title className={styles.modalTitle}>Add Client</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <InputComponent
          inputTextClass="mt-5 ms-4"
          icon={faUser}
          name="fullName"
          placeholder="Full Name"
          type="text"
          formControlClass="mt-5 me-4"
          value={fullName}
          onChange={fullNameChangeHandler}
          onBlur={fullNameBlurHandler}
        />
        <InputComponent
          inputTextClass="mb-5 mt-5 ms-4"
          icon={faMobilePhone}
          name="phoneNumber"
          placeholder="Phone Number"
          type="text"
          formControlClass="mb-5 mt-5 me-4"
          value={phoneNumber}
          onChange={phoneNumberChangeHandler}
          onBlur={phoneNumberBlurHandler}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.onClose}>
          Close
        </Button>
        <Button className={styles.saveButton} onClick={addNewClientHandler}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddClient;
