"use client";
import { Card, Button } from "react-bootstrap";
import styles from "../_styles/register.module.css";
import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import InputComponent from "../_components/inputComponent";
import useInput from "../_hooks/useInput";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { signIn } from "next-auth/react";

const Login = () => {
  const router = useRouter();

  let emailRegex = new RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,3}");

  const {
    value: enteredEmail,
    hasError: emailInputHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
  } = useInput((value) => emailRegex.test(value));

  const {
    value: enteredPassword,
    hasError: passwordInputHasError,
    valueChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
  } = useInput((value) => value.length > 5);

  const loginHandler = async (event) => {
    event.preventDefault();

    if (emailInputHasError || passwordInputHasError) {
      return;
    }

    // const user = {
    //   email: enteredEmail,
    //   password: enteredPassword,
    // };
    // dispatch(login(user));

    try {
      const data = await signIn("credentials", {
        redirect: false,
        email: enteredEmail,
        password: enteredPassword,
      });

      if (data.error !== null) {
        toast.error("wrong email or password!");
        console.log(data);
      } else {
        router.push("/Home");
      }
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <div className="d-flex flex-column align-items-center">
      <p className={`${styles.heading} display-1`}>Login Page</p>
      <Card className={`${styles.regCard} mt-3`}>
        <InputComponent
          inputTextClass="mt-5 ms-4"
          icon={faEnvelope}
          name="email"
          placeholder="Email"
          type="email"
          formControlClass="mt-5 me-4"
          value={enteredEmail}
          onChange={emailChangeHandler}
          onBlur={emailBlurHandler}
        />
        <InputComponent
          inputTextClass="mb-3 mt-5 ms-4"
          icon={faLock}
          name="password"
          placeholder="Password"
          type="password"
          formControlClass="mb-3 mt-5 me-4"
          value={enteredPassword}
          onChange={passwordChangeHandler}
          onBlur={passwordBlurHandler}
        />
        <div className="d-flex justify-content-center mb-3">
          <Button onClick={loginHandler} className={styles.saveButton}>
            Login
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default Login;
