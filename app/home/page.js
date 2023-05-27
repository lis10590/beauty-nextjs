"use client";
import BigCalendar from "../_components/calendar";
import { Button } from "react-bootstrap";
import styles from "../_styles/home.module.css";
import AddEvent from "../_components/addEvent";
import { modalActions } from "../_utils/store/modal";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import DeleteModal from "../_components/deleteModal";
import { deleteOneEvent } from "../_utils/store/events";
import { getEvents, deleteEvent } from "../_utils/requests/events";
import Skeleton from "react-loading-skeleton";

const Home = () => {
  const dispatch = useDispatch();
  const [chosenEvent, setChosenEvent] = useState("");

  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // dispatch(getAllEvents());

    getAllEvents();
  }, []);

  const getAllEvents = async () => {
    setIsLoading(true);
    try {
      const data = await getEvents();
      setEvents(data);
      setIsLoading(false);
    } catch (error) {
      // Handle the error if needed
    }
  };

  const handleEventAddition = (newEvent) => {
    setEvents([...events, newEvent]);
  };

  const addModal = useSelector((state) => state.modal.addModalOpen);
  const deleteModal = useSelector((state) => state.modal.deleteModalOpen);

  const saveChosenEvent = (id) => {
    setChosenEvent(id);
  };

  const deleteEventHandler = (id) => {
    console.log(id);
    // dispatch(deleteOneEvent(id));
    const updatedEvents = events.filter((event) => event._id !== id);
    setEvents(updatedEvents);
    deleteEvent(id);
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
      {!isLoading ? (
        <BigCalendar deleteModal={openDeleteModalHandler} events={events} />
      ) : (
        <Skeleton count={10} />
      )}
      <AddEvent
        isOpen={addModal}
        onClose={closeAddModalHandler}
        addEvent={handleEventAddition}
      />
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
