import Modal from "./modal";
import Form from "./form";

const UpdateEvent = ({ isOpen, onClose, event, treatments, customers }) => {
  //   console.log(treatments);
  //   console.log(event);
  console.log(customers);
  let fullNameRegex = new RegExp("[A-Za-z]+\\s[A-Za-z]{2,}");

  const eventFields = [
    {
      name: "treatments",
      type: "select",
      options: treatments,
      // validation: (fullName) => fullNameRegex.test(fullName),
    },
    {
      name: "customers",
      type: "select",
      options: customers,
      // validation: (fullName) => fullNameRegex.test(fullName),
    },
    {
      name: "start",
      label: "Session Start Time:",
      type: "datetime-local",
      defaultValue:
        event.start !== undefined
          ? event.start.toISOString().slice(0, 16)
          : event.start,
      // validation: (fullName) => fullNameRegex.test(fullName),
    },
    {
      name: "end",
      label: "Session End Time:",
      type: "datetime-local",
      defaultValue:
        event.end !== undefined
          ? event.end.toISOString().slice(0, 16)
          : event.end,
      // validation: (fullName) => fullNameRegex.test(fullName),
    },
  ];

  return (
    <Modal isOpen={isOpen} onClose={onClose} heading="Event Details">
      <Form
        fields={eventFields}
        onClose={onClose}
        // onSubmit={addNewClientHandler}
        action="updateEvent"
        event={event}
        type="updateEvent"
      />
    </Modal>
  );
};

export default UpdateEvent;
