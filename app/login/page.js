// import { signIn } from "next-auth/react";

import Form from "../_components/form";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

const Login = async () => {
  const session = await auth();
  if (session?.user) redirect("/home");
  let emailRegex = new RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,3}");
  const loginFields = [
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
  ];

  // const onLoginHandler = async (formData) => {
  //   try {
  //     const data = await signIn("credentials", {
  //       redirect: true,
  //       email: formData.email,
  //       password: formData.password,
  //       callbackUrl: "/home",
  //     });
  //     console.log(data);
  //     //   router.push("/home");
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  return (
    <div className="flex justify-center mt-6">
      <div className="bg-white shadow-md rounded-lg w-96 p-8">
        <h2 className="text-2xl font-medium mb-6">Login</h2>
        <Form fields={loginFields} /*onSubmit={onLoginHandler}*/ type="Login" />
      </div>
    </div>
  );
};

export default Login;

// "use client";
// import { Card, Button, Spinner } from "react-bootstrap";
// import styles from "../_styles/register.module.css";
// import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
// import InputComponent from "../_components/inputComponent";
// import useInput from "../_hooks/useInput";
// import { useRouter } from "next/navigation";
// import { toast } from "react-toastify";
// import { signIn } from "next-auth/react";
// import { useState } from "react";

// const Login = () => {
//   const router = useRouter();
//   const [isLoading, setIsLoading] = useState(false);

//   let emailRegex = new RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,3}");

//   const {
//     value: enteredEmail,
//     hasError: emailInputHasError,
//     valueChangeHandler: emailChangeHandler,
//     inputBlurHandler: emailBlurHandler,
//   } = useInput((value) => emailRegex.test(value));

//   const {
//     value: enteredPassword,
//     hasError: passwordInputHasError,
//     valueChangeHandler: passwordChangeHandler,
//     inputBlurHandler: passwordBlurHandler,
//   } = useInput((value) => value.length > 5);

//   const loginHandler = async (event) => {
//     event.preventDefault();

//     if (emailInputHasError || passwordInputHasError) {
//       return;
//     }

//     // const user = {
//     //   email: enteredEmail,
//     //   password: enteredPassword,
//     // };
//     // dispatch(login(user));

//     try {
//       setIsLoading(true);
//       const data = await signIn("credentials", {
//         redirect: false,
//         email: enteredEmail,
//         password: enteredPassword,
//       });

//       if (data.error !== null) {
//         setIsLoading(false);
//         toast.error("wrong email or password!");
//         console.log(data);
//       } else {
//         router.push("/home");
//       }
//     } catch (error) {
//       setIsLoading(false);
//       toast.error(error);
//     }
//   };

//   return (
//     <div className="d-flex flex-column align-items-center">
//       <p className={`${styles.heading} display-1`}>Login Page</p>
//       <Card className={`${styles.regCard} mt-3`}>
//         <InputComponent
//           inputTextClass="mt-5 ms-4"
//           icon={faEnvelope}
//           name="email"
//           placeholder="Email"
//           type="email"
//           formControlClass="mt-5 me-4"
//           value={enteredEmail}
//           onChange={emailChangeHandler}
//           onBlur={emailBlurHandler}
//         />
//         {emailInputHasError && (
//           <p className={`${styles.alert} text-danger text-center`}>
//             Please enter a valid Email!
//           </p>
//         )}
//         <InputComponent
//           inputTextClass="mb-3 mt-5 ms-4"
//           icon={faLock}
//           name="password"
//           placeholder="Password"
//           type="password"
//           formControlClass="mb-3 mt-5 me-4"
//           value={enteredPassword}
//           onChange={passwordChangeHandler}
//           onBlur={passwordBlurHandler}
//         />
//         {passwordInputHasError && (
//           <p className={`${styles.alert} text-danger text-center`}>
//             Password must have minimum 6 characters!
//           </p>
//         )}
//         <div className="d-flex justify-content-center mb-3">
//           <Button onClick={loginHandler} className={styles.saveButton}>
//             {isLoading ? (
//               <Spinner
//                 as="span"
//                 animation="border"
//                 size="sm"
//                 role="status"
//                 aria-hidden="true"
//               />
//             ) : (
//               "Login"
//             )}
//           </Button>
//         </div>
//       </Card>
//     </div>
//   );
// };

// export default Login;
