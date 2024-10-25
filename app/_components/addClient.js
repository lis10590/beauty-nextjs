import Modal from "./modal";
import Form from "./form";

const AddClient = ({ isOpen, onClose, onAdd }) => {
  let fullNameRegex = new RegExp("[A-Za-z]+\\s[A-Za-z]{2,}");
  let phoneNumberRegex = new RegExp("^[0][5][0-9]{8}");

  const clientFields = [
    {
      name: "fullName",
      type: "text",
      placeholder: "Full Name",
      defaultValue: "",
      validation: (fullName) => fullNameRegex.test(fullName),
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
    onAdd(formData);
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose} heading="Add Client">
      <Form
        fields={clientFields}
        onClose={onClose}
        onSubmit={addNewClientHandler}
        action="addCustomer"
      />
    </Modal>
  );
};

export default AddClient;
