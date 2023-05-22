"use client";

import { Modal, Button } from "react-bootstrap";
import { clientAdditionFromCalendar } from "../_utils/store/clients";
import { eventAddition } from "../_utils/store/events";
import { useDispatch } from "react-redux";
import { useState } from "react";
import InputComponent from "./inputComponent";
import DatePicker from "react-datepicker";
import styles from "../_styles/modals.module.css";
import {
  faUser,
  faMobilePhone,
  faCalendarPlus,
} from "@fortawesome/free-solid-svg-icons";

const AddEvent = (props) => {
  const [newEvent, setNewEvent] = useState({
    title: "",
    fullName: "",
    phoneNumber: "",
    start: "",
    end: "",
  });
  const [titleIsTouched, setTitleIsTouched] = useState(false);
  const [fullNameIsTouched, setFullNameIsTouched] = useState(false);
  const [phoneNumberIsTouched, setPhoneNumberIsTouched] = useState(false);

  const titleBlurHandler = () => {
    setTitleIsTouched(true);
  };
  const fullNameBlurHandler = () => {
    setFullNameIsTouched(true);
  };

  const phoneNumberBlurHandler = () => {
    setPhoneNumberIsTouched(true);
  };

  let fullNameRegex = new RegExp("[A-Za-z]+\\s[A-Za-z]{2,}");
  let phoneNumberRegex = new RegExp("^[0][5][0-9]{8}");
  let titleRegex = new RegExp("[A-Za-z]{2,}");
  const dispatch = useDispatch();
  const onChangeEventHandler = (event) => {
    const { name, value } = event.target;
    setNewEvent((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onAddEvent = (event) => {
    event.preventDefault();
    if (
      newEvent.title &&
      newEvent.start &&
      newEvent.end &&
      newEvent.fullName &&
      newEvent.phoneNumber
    ) {
      dispatch(eventAddition(newEvent));
      dispatch(clientAdditionFromCalendar(newEvent));
    }

    props.onClose();
    setNewEvent({
      title: "",
      fullName: "",
      phoneNumber: "",
      start: "",
      end: "",
    });
  };

  return (
    <Modal show={props.isOpen} onHide={props.onClose}>
      <Modal.Header className={styles.modalHeader} closeButton>
        <Modal.Title className={styles.modalTitle}>Add Event</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <InputComponent
          inputTextClass="mt-5 ms-4"
          icon={faCalendarPlus}
          name="title"
          placeholder="Treatments Details"
          type="text"
          formControlClass="mt-5 me-4"
          value={newEvent.title}
          onChange={onChangeEventHandler}
          onBlur={titleBlurHandler}
        />
        <InputComponent
          inputTextClass="mt-3 ms-4"
          icon={faUser}
          name="fullName"
          placeholder="Client Name"
          type="text"
          formControlClass="mt-3 me-4"
          value={newEvent.fullName}
          onChange={onChangeEventHandler}
          onBlur={fullNameBlurHandler}
        />
        <InputComponent
          inputTextClass="mb-3 mt-3 ms-4"
          icon={faMobilePhone}
          name="phoneNumber"
          placeholder="Phone Number"
          type="text"
          formControlClass="mb-3 mt-3 me-4"
          value={newEvent.phoneNumber}
          onChange={onChangeEventHandler}
          onBlur={phoneNumberBlurHandler}
        />
        <div className="d-flex justify-content-around">
          <DatePicker
            placeholderText="Start Date"
            selected={newEvent.start}
            onChange={(start) => setNewEvent({ ...newEvent, start })}
            showTimeSelect
          />
          <DatePicker
            placeholderText="End Date"
            selected={newEvent.end}
            onChange={(end) => setNewEvent({ ...newEvent, end })}
            showTimeSelect
          />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.onClose}>
          Close
        </Button>
        <Button className={styles.saveButton} onClick={onAddEvent}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddEvent;
