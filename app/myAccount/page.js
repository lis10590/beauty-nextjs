"use client";

import { Card, Button } from "react-bootstrap";
import styles from "../_styles/account.module.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../_utils/store/auth";
import { useSession } from "next-auth/react";
const MyAccount = () => {
  const dispatch = useDispatch();
  const { data } = useSession();

  useEffect(() => {
    if (data && data.user) {
      dispatch(getUser(data.user.email));
    }
  }, [dispatch]);

  const userDetails = useSelector((state) => state.auth.user);
  console.log(userDetails);

  return (
    <div className="d-flex flex-column align-items-center">
      <Card className={`${styles.detailsCard} mt-5`}>
        <Card.Header
          className={`${styles.cardHeader} d-flex flex-column align-items-center`}
        >
          Account Details
        </Card.Header>
        <p className="ms-2 mt-3">
          First Name: {userDetails ? userDetails.firstName : null}
        </p>
        <p className="ms-2">
          Last Name: {userDetails ? userDetails.lastName : null}
        </p>
        <p className="ms-2">Email: {userDetails ? userDetails.email : null}</p>
      </Card>
    </div>
  );
};

export default MyAccount;
