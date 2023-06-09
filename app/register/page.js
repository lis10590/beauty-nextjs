"use client";
import { Card, Button } from "react-bootstrap";
import styles from "../_styles/register.module.css";
import { faEnvelope, faLock, faUser } from "@fortawesome/free-solid-svg-icons";
import InputComponent from "../_components/inputComponent";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import useInput from "../_hooks/useInput";
import { useRouter } from "next/navigation";
import { register, reset } from "../_utils/store/auth";
import { toast } from "react-toastify";

const Register = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  //distructuring of states from redux store
  const { user, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );
  //email validation
  let emailRegex = new RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,3}");

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess || Object.keys(user).length !== 0) {
      router.push("/home");
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, router, dispatch]);

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
    dispatch(register(user));
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
        {firstNameInputHasError && (
          <p className={`${styles.alert} text-danger text-center`}>
            First Name is required!
          </p>
        )}
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
        {lastNameInputHasError && (
          <p className={`${styles.alert} text-danger text-center`}>
            Last Name is required!
          </p>
        )}
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
        {emailInputHasError && (
          <p className={`${styles.alert} text-danger text-center`}>
            Enter a valid email!
          </p>
        )}
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
        {passwordInputHasError && (
          <p className={`${styles.alert} text-danger text-center`}>
            Password must be minimum 6 characters!
          </p>
        )}
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
        {password2InputHasError && (
          <p className={`${styles.alert} text-danger text-center`}>
            Password must be minimum 6 characters!
          </p>
        )}
        {!matchingPassword && (
          <p className={`${styles.alert} text-danger text-center`}>
            Password does not match!
          </p>
        )}
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
