"use client";
import { Card, Button } from "react-bootstrap";
import styles from "../_styles/register.module.css";
import { faEnvelope, faLock, faUser } from "@fortawesome/free-solid-svg-icons";
import InputComponent from "../_components/inputComponent";
import useInput from "../_hooks/useInput";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const Register = () => {
  const router = useRouter();

  //email validation
  let emailRegex = new RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,3}");

  //inputs distructuring for validation using custom hook useInput
  const {
    value: enteredFirstName,
    hasError: firstNameInputHasError,
    valueChangeHandler: firstNameChangeHandler,
    inputBlurHandler: firstNameBlurHandler,
  } = useInput((value) => value.trim() !== "");

  const {
    value: enteredLastName,
    hasError: lastNameInputHasError,
    valueChangeHandler: lastNameChangeHandler,
    inputBlurHandler: lastNameBlurHandler,
  } = useInput((value) => value.trim() !== "");

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

  const {
    value: enteredPassword2,
    hasError: password2InputHasError,
    valueChangeHandler: password2ChangeHandler,
    inputBlurHandler: password2BlurHandler,
  } = useInput((value) => value.length > 5);

  let matchingPassword = true;
  if (enteredPassword2 !== enteredPassword) {
    matchingPassword = false;
  }

  //user registration function
  const formSubmissionHandler = (event) => {
    event.preventDefault();
    if (
      firstNameInputHasError ||
      lastNameInputHasError ||
      emailInputHasError ||
      passwordInputHasError ||
      password2InputHasError ||
      !matchingPassword
    ) {
      return;
    }

    const user = {
      firstName: enteredFirstName,
      lastName: enteredLastName,
      email: enteredEmail,
      password: enteredPassword,
    };
    // dispatch(register(user));
  };

  return (
    <div className="d-flex flex-column align-items-center">
      <p className={`${styles.heading} display-1`}>Register Page</p>
      <Card className={`${styles.regCard} mt-3`}>
        <InputComponent
          inputTextClass="mt-5 ms-4"
          icon={faUser}
          name="firstName"
          placeholder="First Name"
          type="text"
          formControlClass="mt-5 me-4"
          value={enteredFirstName}
          onChange={firstNameChangeHandler}
          onBlur={firstNameBlurHandler}
        />
        <InputComponent
          inputTextClass="mt-4 ms-4"
          icon={faUser}
          name="lastName"
          placeholder="Last Name"
          type="text"
          formControlClass="mt-4 me-4"
          value={enteredLastName}
          onChange={lastNameChangeHandler}
          onBlur={lastNameBlurHandler}
        />
        <InputComponent
          inputTextClass="mt-4 ms-4"
          icon={faEnvelope}
          name="email"
          placeholder="Email"
          type="email"
          formControlClass="mt-4 me-4"
          value={enteredEmail}
          onChange={emailChangeHandler}
          onBlur={emailBlurHandler}
        />
        <InputComponent
          inputTextClass="mt-4 ms-4"
          icon={faLock}
          name="password"
          placeholder="Password"
          type="password"
          formControlClass="mt-4 me-4"
          value={enteredPassword}
          onChange={passwordChangeHandler}
          onBlur={passwordBlurHandler}
        />
        <InputComponent
          inputTextClass="mb-3 mt-4 ms-4"
          icon={faLock}
          name="password2"
          placeholder="Confirm Password"
          type="password2"
          formControlClass="mb-3 mt-4 me-4"
          value={enteredPassword2}
          onChange={password2ChangeHandler}
          onBlur={password2BlurHandler}
        />
        <div className="d-flex justify-content-center mb-3">
          <Button className={styles.saveButton} onClick={formSubmissionHandler}>
            Register
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default Register;
