import {
  loginUser,
  addCustomer,
  addProduct,
  addTreatment,
  updateEvent,
} from "../actions";
import editIcon from "@/public/editIcon.svg";
import closeIcon from "@/public/closeIcon.svg";
import Image from "next/image";
// import { useState } from "react";

const Form = ({ fields, onSubmit, onClose, type, action, event }) => {
  // const [showEditTreatment, setShowEditTreatment] = useState(false);
  // const [showEditCustomer, setShowEditCustomer] = useState(false);

  // const handleShowEditTreatment = () => {
  //   setShowEditTreatment(!showEditTreatment);
  // };
  // const handleShowEditCustomer = () => {
  //   setShowEditCustomer(!showEditCustomer);
  // };
  // console.log(fields);
  // const [formData, setFormData] = useState(() =>
  //   fields.reduce(
  //     (acc, field) => ({ ...acc, [field.name]: field.defaultValue }),
  //     {}
  //   )
  // );

  // console.log(formData);

  // const handleChange = (event) => {
  //   setFormData({ ...formData, [event.target.name]: event.target.value });
  // };

  // Handle form submission
  // const handleSubmit = (event) => {
  //   event.preventDefault();

  //   // Validation logic
  //   const errors = fields.reduce((acc, field) => {
  //     if (field.validation && !field.validation(formData[field.name])) {
  //       acc[field.name] = "Validation error";
  //     }
  //     return acc;
  //   }, {});

  //   if (Object.keys(errors).length === 0) {
  //     // No errors, submit the form data
  //     onSubmit(formData);
  //   } else {
  //     // Display validation errors (optional)
  //     console.error("Form validation errors:", errors);
  //     // You can also display error messages to the user here
  //   }
  // };

  const handleAction = (formaData) => {
    if (action == "addCustomer") {
      addCustomer(formaData);
      onClose();
    }
    if (action === "login") {
      loginUser(formaData);
    }
    if (action === "addProduct") {
      addProduct(formaData);
      onClose();
    }

    if (action === "addTreatment") {
      addTreatment(formaData);
      onClose();
    }
    if (action == "updateEvent") {
      if (event !== undefined) {
        formaData.append("id", event.id);
      }

      updateEvent(formaData);
      onClose();
    }
  };
  return (
    <form action={handleAction} className="mx-4 my-4">
      {fields.map((field) => (
        <div key={field.name}>
          {field.type === "select" ? (
            <div>
              {field.name === "customers" && (
                <div className="flex">
                  <p className="me-2">
                    Customer Name:{" "}
                    {event._def !== undefined &&
                      event._def.extendedProps.customerId.fullName}
                  </p>
                  <Image
                    onClick={handleShowEditCustomer}
                    src={showEditCustomer ? closeIcon : editIcon}
                    alt="edit or close icon"
                    width={24}
                    height={24}
                  />
                </div>
              )}
              {field.name === "treatments" && (
                <div className="flex">
                  <p className="me-2">
                    Treatment:{" "}
                    {event._def !== undefined &&
                      event._def.extendedProps.treatmentId.treatmentName}
                  </p>
                  <Image
                    onClick={handleShowEditTreatment}
                    src={showEditTreatment ? closeIcon : editIcon}
                    alt="edit or close icon"
                    width={24}
                    height={24}
                  />
                </div>
              )}
              {(showEditCustomer && field.name === "customers" && (
                <select
                  id={field.name}
                  name={field.name}
                  //value={formData[field.name]}
                  //onChange={handleChange}
                >
                  {field.options.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              )) ||
                (showEditTreatment && field.name === "treatments" && (
                  <select
                    id={field.name}
                    name={field.name}
                    //value={formData[field.name]}
                    //onChange={handleChange}
                  >
                    {field.options.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                ))}
            </div>
          ) : (
            <>
              <label htmlFor={field.name}>{field.label}</label>
              <input
                className="mt-3 px-3 py-2 rounded-lg focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 block w-full border border-gray-300"
                id={field.name}
                name={field.name}
                type={field.type}
                defaultValue={field.defaultValue}
                // value={
                //   field.type === "datetime-local"
                //     ? formData[field.name]?.toISOString()
                //     : formData[field.name]
                // }
                // onChange={handleChange}
                placeholder={field.placeholder}
                required
              />
            </>
          )}
          {/* Optional: Display validation errors for this field */}
        </div>
      ))}
      {type === "Login" || type === "Register" ? (
        <div className="flex justify-center mt-5">
          <button
            type="submit"
            className="inline-flex items-center px-4 py-2 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-500 focus:ring-opacity-50"
          >
            {type}
          </button>
        </div>
      ) : (
        <div className="flex justify-end mt-5">
          <button
            className="bg-gray-300 rounded-md px-3 py-2 mx-2"
            onClick={onClose}
          >
            Close
          </button>
          <button className="bg-red-300 rounded-md px-3 py-2">
            {type === "updateEvent" ? "Update" : "Save"}
          </button>
        </div>
      )}
    </form>
  );
};

export default Form;
