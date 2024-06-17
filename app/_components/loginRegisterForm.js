"use client";
import { useState } from "react";

const LoginRegisterForm = ({ fields, onSubmit, type }) => {
  const [formData, setFormData] = useState(() =>
    fields.reduce(
      (acc, field) => ({ ...acc, [field.name]: field.defaultValue }),
      {}
    )
  );

  console.log(formData);

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();

    // Validation logic
    const errors = fields.reduce((acc, field) => {
      if (field.validation && !field.validation(formData[field.name])) {
        acc[field.name] = "Validation error";
      }
      return acc;
    }, {});

    if (Object.keys(errors).length === 0) {
      // No errors, submit the form data
      onSubmit(formData);
    } else {
      // Display validation errors (optional)
      console.error("Form validation errors:", errors);
      // You can also display error messages to the user here
    }
  };

  return (
    <div className="flex justify-center mt-6">
      <div className="bg-white shadow-md rounded-lg w-96 p-8">
        <h2 className="text-2xl font-medium mb-6">Login</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          {fields.map((field) => (
            <div key={field.name}>
              {field.type === "select" ? (
                <select
                  id={field.name}
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
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
                  value={formData[field.name]}
                  onChange={handleChange}
                  placeholder={field.placeholder}
                  required
                />
              )}
              {/* Optional: Display validation errors for this field */}
            </div>
          ))}
          <div className="flex justify-center">
            <button
              type="submit"
              className="inline-flex items-center px-4 py-2 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-500 focus:ring-opacity-50"
            >
              {type}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginRegisterForm;
