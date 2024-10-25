import Modal from "./modal";
import Form from "./form";

const AddTreatment = ({ isOpen, onClose, onAdd }) => {
  let inputRegex = new RegExp("[A-Za-z]{2,}");
  let priceRegex = new RegExp("[0-9]");

  const treatmentFields = [
    {
      name: "treatmentName",
      type: "text",
      placeholder: "Treatment Name",
      defaultValue: "",
      validation: (treatmentName) => inputRegex.test(treatmentName),
    },
    {
      name: "price",
      type: "text",
      placeholder: "Price",
      defaultValue: "",
      validation: (price) => priceRegex.test(price),
    },
  ];

  const addNewTreatmentHandler = (formData) => {
    onAdd(formData);
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose} heading="Add Product">
      <Form
        fields={treatmentFields}
        onClose={onClose}
        onSubmit={addNewTreatmentHandler}
        action="addTreatment"
      />
    </Modal>
  );
};

export default AddTreatment;
