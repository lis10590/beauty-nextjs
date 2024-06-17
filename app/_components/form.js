// "use client";
// import { useState } from "react";
import { signIn } from "@/auth";
import { loginUser, addCustomer } from "../actions";

const Form = ({ fields, onSubmit, onClose, type, action }) => {
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
      onSubmit(formaData);
    }
    if (action == "login") {
      loginUser(formaData);
    }
  };

  return (
    <form action={handleAction} className="mx-4 my-4">
      {fields.map((field) => (
        <div key={field.name}>
          {field.type === "select" ? (
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
          ) : (
            <input
              className="mt-3 px-3 py-2 rounded-lg focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 block w-full border border-gray-300"
              id={field.name}
              name={field.name}
              type={field.type}
              //value={formData[field.name]}
              //onChange={handleChange}
              placeholder={field.placeholder}
              required
            />
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
          <button className="bg-red-300 rounded-md px-3 py-2">Save</button>
        </div>
      )}
    </form>
  );
};

export default Form;
