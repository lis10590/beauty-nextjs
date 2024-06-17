"use client";
import Form from "../_components/form";

const Register = () => {
  const registerHandler = async (formData) => {
    try {
      const res = await fetch(`http://localhost:3000/api/auth/register`, {
        cache: "no-store",
        method: "POST",
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        throw new Error("Failed to fetch products");
      }

      return res.json();
    } catch (error) {
      console.log("Error loading products: ", error);
    }
  };

  let emailRegex = new RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,3}");
  const registerFields = [
    {
      name: "firstName",
      type: "text",
      placeholder: "Enter your First Name",
      defaultValue: "",
      validation: (firstName) => firstName.trim() !== "",
    },
    {
      name: "lastName",
      type: "text",
      placeholder: "Enter your Last Name",
      defaultValue: "",
      validation: (lastName) => lastName.trim() !== "",
    },
    {
      name: "email",
      type: "email",
      placeholder: "Enter your Email",
      defaultValue: "",
      validation: (email) => emailRegex.test(email),
    },
    {
      name: "password",
      type: "password",
      placeholder: "Enter your Password",
      defaultValue: "",
      validation: (password) => password.length > 5,
    },
    {
      name: "confirmPassword",
      type: "password",
      placeholder: "Confirm Password",
      defaultValue: "",
      validation: (password) => password.length > 5,
    },
  ];

  // let matchingPassword = true;
  // if (enteredPassword2 !== enteredPassword) {
  //   matchingPassword = false;
  // }

  return (
    <div className="flex justify-center mt-6">
      <div className="bg-white shadow-md rounded-lg w-96 p-8">
        <h2 className="text-2xl font-medium mb-6">Register</h2>
        <Form
          fields={registerFields}
          onSubmit={registerHandler}
          type="Register"
        />
      </div>
    </div>
  );
};

export default Register;
