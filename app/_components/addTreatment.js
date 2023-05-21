"use client";
import { Modal, Button } from "react-bootstrap";
import InputComponent from "./inputComponent";
import { useDispatch } from "react-redux";
import useInput from "../_hooks/useInput";
import styles from "../_styles/modals.module.css";
import { treatmentAddition } from "../_utils/store/treatments";
import { faShoppingBag, faShekelSign } from "@fortawesome/free-solid-svg-icons";

const AddTreatment = (props) => {
  let treatmentRegex = new RegExp("[A-Za-z]{2,}");
  let priceRegex = new RegExp("[0-9]");

  const {
    value: treatmentName,
    hasError: treatmentNameInputHasError,
    valueChangeHandler: treatmentNameChangeHandler,
    inputBlurHandler: treatmentNameBlurHandler,
    reset: resetTreatmentName,
  } = useInput((value) => treatmentRegex.test(value));

  const {
    value: price,
    hasError: priceInputHasError,
    valueChangeHandler: priceChangeHandler,
    inputBlurHandler: priceBlurHandler,
    reset: resetPrice,
  } = useInput((value) => priceRegex.test(value));

  const dispatch = useDispatch();

  const addNewTreatmentHandler = (event) => {
    event.preventDefault();
    if (!treatmentNameInputHasError && !priceInputHasError) {
      const treatment = {
        treatmentName,
        price,
      };
      dispatch(treatmentAddition(treatment));
      props.onClose();
      resetTreatmentName();
      resetPrice();
    }
  };

  return (
    <Modal show={props.isOpen} onHide={props.onClose}>
      <Modal.Header className={styles.modalHeader} closeButton>
        <Modal.Title className={styles.modalTitle}>Add Treatment</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <InputComponent
          inputTextClass="mt-5 ms-4"
          icon={faShoppingBag}
          name="treatmentName"
          placeholder="Treatment Name"
          type="text"
          formControlClass="mt-5 me-4"
          value={treatmentName}
          onChange={treatmentNameChangeHandler}
          onBlur={treatmentNameBlurHandler}
        />
        <InputComponent
          inputTextClass="mb-5 mt-5 ms-4"
          icon={faShekelSign}
          name="price"
          placeholder="Price (ILS)"
          type="text"
          formControlClass="mb-5 mt-5 me-4"
          value={price}
          onChange={priceChangeHandler}
          onBlur={priceBlurHandler}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.onClose}>
          Close
        </Button>
        <Button className={styles.saveButton} onClick={addNewTreatmentHandler}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddTreatment;
