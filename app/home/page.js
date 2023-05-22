"use client";
import BigCalendar from "../_components/calendar";
import { Button } from "react-bootstrap";
import styles from "../_styles/home.module.css";
import AddEvent from "../_components/addEvent";
import { modalActions } from "../_utils/store/modal";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import DeleteModal from "../_components/deleteModal";
import { deleteOneEvent } from "../_utils/store/events";
const Home = () => {
  const dispatch = useDispatch();
  const [chosenEvent, setChosenEvent] = useState("");

  const addModal = useSelector((state) => state.modal.addModalOpen);
  const deleteModal = useSelector((state) => state.modal.deleteModalOpen);

  const saveChosenEvent = (id) => {
    setChosenEvent(id);
  };

  const deleteEventHandler = (id) => {
    console.log(id);
    dispatch(deleteOneEvent(id));
    dispatch(modalActions.deleteModalClose());
  };
  const closeAddModalHandler = () => {
    dispatch(modalActions.addModalClose());
  };

  const openAddModalHandler = () => {
    dispatch(modalActions.addModalOpen());
  };

  const openDeleteModalHandler = (id) => {
    dispatch(modalActions.deleteModalOpen());
    saveChosenEvent(id);
  };

  const closeDeleteModalHandler = () => {
    dispatch(modalActions.deleteModalClose());
  };
  return (
    <div>
      <div className="d-flex justify-content-center my-3">
        <Button onClick={openAddModalHandler} className={styles.addButton}>
          Add Appointment
        </Button>
      </div>
      <BigCalendar deleteModal={openDeleteModalHandler} />
      <AddEvent isOpen={addModal} onClose={closeAddModalHandler} />
      <DeleteModal
        isOpen={deleteModal}
        onClose={closeDeleteModalHandler}
        onNoClick={closeDeleteModalHandler}
        onYesClick={() => deleteEventHandler(chosenEvent)}
      />
    </div>
  );
};

export default Home;
