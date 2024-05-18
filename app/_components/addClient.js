"use client";
import Modal from "./modal";
import Form from "./form";

const AddClient = ({ isOpen, onClose, addClient }) => {
  let fullNameRegex = new RegExp("[A-Za-z]+\\s[A-Za-z]{2,}");
  let phoneNumberRegex = new RegExp("^[0][5][0-9]{8}");

  const clientFields = [
    {
      name: "fullName",
      type: "text",
      placeholder: "Full Name",
      defaultValue: "",
      validation: (name) => fullNameRegex.test(name),
    },
    {
      name: "phoneNumber",
      type: "text",
      placeholder: "Phone Number",
      defaultValue: "",
      validation: (phoneNumber) => phoneNumberRegex.test(phoneNumber),
    },
  ];
  const addNewClientHandler = (formData) => {
    addClient(formData);
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose} heading="Add Client">
      <Form
        fields={clientFields}
        onClose={onClose}
        onSubmit={addNewClientHandler}
      />
    </Modal>
  );
};

export default AddClient;

// import { Modal, Button } from "react-bootstrap";
// import InputComponent from "./inputComponent";
// import { faUser, faMobilePhone } from "@fortawesome/free-solid-svg-icons";
// import { useDispatch } from "react-redux";
// import { clientAddition } from "../_utils/store/clients";
// import useInput from "../_hooks/useInput";
// import styles from "../_styles/modals.module.css";
// import { addNewClient } from "../_utils/requests/clients";

// const AddClient = (props) => {
//   const dispatch = useDispatch();

//   let fullNameRegex = new RegExp("[A-Za-z]+\\s[A-Za-z]{2,}");
//   let phoneNumberRegex = new RegExp("^[0][5][0-9]{8}");

//   const {
//     value: fullName,
//     hasError: fullNameInputHasError,
//     valueChangeHandler: fullNameChangeHandler,
//     inputBlurHandler: fullNameBlurHandler,
//     reset: resetFullName,
//   } = useInput((value) => fullNameRegex.test(value));

//   const {
//     value: phoneNumber,
//     hasError: phoneNumberInputHasError,
//     valueChangeHandler: phoneNumberChangeHandler,
//     inputBlurHandler: phoneNumberBlurHandler,
//     reset: resetPhoneNumber,
//   } = useInput((value) => phoneNumberRegex.test(value));

//   const addNewClientHandler = (event) => {
//     event.preventDefault();
//     if (!fullNameInputHasError && !phoneNumberInputHasError) {
//       const client = {
//         fullName,
//         phoneNumber,
//       };
//       // dispatch(clientAddition(client));
//       props.addClient(client);
//       addNewClient(client);
//       props.onClose();
//       resetFullName();
//       resetPhoneNumber();
//     }
//   };

//   return (
//     <Modal show={props.isOpen} onHide={props.onClose}>
//       <Modal.Header className={styles.modalHeader} closeButton>
//         <Modal.Title className={styles.modalTitle}>Add Client</Modal.Title>
//       </Modal.Header>
//       <Modal.Body>
//         <InputComponent
//           inputTextClass="mt-5 ms-4"
//           icon={faUser}
//           name="fullName"
//           placeholder="Full Name"
//           type="text"
//           formControlClass="mt-5 me-4"
//           value={fullName}
//           onChange={fullNameChangeHandler}
//           onBlur={fullNameBlurHandler}
//         />
//         {fullNameInputHasError && (
//           <p className={`${styles.alert} text-danger text-center`}>
//             Full Name is invalid!
//           </p>
//         )}
//         <InputComponent
//           inputTextClass="mb-5 mt-5 ms-4"
//           icon={faMobilePhone}
//           name="phoneNumber"
//           placeholder="Phone Number"
//           type="text"
//           formControlClass="mb-5 mt-5 me-4"
//           value={phoneNumber}
//           onChange={phoneNumberChangeHandler}
//           onBlur={phoneNumberBlurHandler}
//         />
//         {phoneNumberInputHasError && (
//           <p className={`${styles.alert} text-danger text-center`}>
//             phone Number is invalid!
//           </p>
//         )}
//       </Modal.Body>
//       <Modal.Footer>
//         <Button variant="secondary" onClick={props.onClose}>
//           Close
//         </Button>
//         <Button className={styles.saveButton} onClick={addNewClientHandler}>
//           Save
//         </Button>
//       </Modal.Footer>
//     </Modal>
//   );
// };

// export default AddClient;
