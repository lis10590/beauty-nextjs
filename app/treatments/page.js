"use client";

import { Card, Button, Table } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllTreatments,
  selectAllTreatments,
  deleteOneTreatment,
  reset,
} from "../_utils/store/treatments";
import { modalActions } from "../_utils/store/modal";
import { useState, useEffect } from "react";
import DeleteModal from "../_components/deleteModal";
import AddTreatment from "../_components/addTreatment";
import styles from "../_styles/treatments.module.css";
import { getTreatments, deleteTreatment } from "../_utils/requests/treatments";

const Treatments = () => {
  const dispatch = useDispatch();
  const addModal = useSelector((state) => state.modal.addModalOpen);
  const deleteModal = useSelector((state) => state.modal.deleteModalOpen);
  const tableHeadings = ["Treatment Name", "Price (ILS)"];

  const [chosenTreatmentId, setChosenTreatmentId] = useState("");
  const [treatments, setTreatments] = useState([]);

  useEffect(() => {
    getAllTreatments();
    // dispatch(getAllTreatments());
    // return () => {
    //   dispatch(reset());
    // };
  }, [dispatch]);

  const getAllTreatments = async () => {
    try {
      const data = await getTreatments();
      setTreatments(data);
    } catch (error) {
      // Handle the error if needed
    }
  };

  // const treatments = useSelector(selectAllTreatments);

  const deleteTreatmentHandler = () => {
    // dispatch(deleteOneTreatment(chosenTreatmentId));
    const updatedTreatments = treatments.filter(
      (treatment) => treatment._id !== chosenTreatmentId
    );
    setTreatments(updatedTreatments);
    deleteTreatment(chosenTreatmentId);
    dispatch(modalActions.deleteModalClose());
  };

  const treatmentAdditionHandler = (newTreatment) => {
    setTreatments([...treatments, newTreatment]);
  };

  const saveTreatmentId = (id) => {
    setChosenTreatmentId(id);
  };
  const closeAddModalHandler = () => {
    dispatch(modalActions.addModalClose());
  };

  const openAddModalHandler = () => {
    dispatch(modalActions.addModalOpen());
  };

  const openDeleteModalHandler = (id) => {
    dispatch(modalActions.deleteModalOpen());
    saveTreatmentId(id);
  };

  const closeDeleteModalHandler = () => {
    dispatch(modalActions.deleteModalClose());
  };

  return (
    <div className="d-flex justify-content-center">
      <Card className="mt-5">
        <Card.Header
          className={`${styles.cardHeader} d-flex flex-column align-items-center`}
        >
          <Button
            className={`${styles.addButton} mb-1`}
            onClick={openAddModalHandler}
          >
            <FontAwesomeIcon icon={faPlus} />
          </Button>
          Treatments
        </Card.Header>
        <Card.Body>
          <Table>
            <thead>
              <tr>
                {tableHeadings.map((heading, index) => {
                  return <th key={index}>{heading}</th>;
                })}
              </tr>
            </thead>
            <tbody>
              {treatments.map((treatment) => {
                return (
                  <tr key={treatment._id}>
                    <td>{treatment.treatmentName}</td>
                    <td>{treatment.price}</td>
                    <td>
                      <FontAwesomeIcon
                        className={styles.deleteIcon}
                        icon={faTrashCan}
                        onClick={() => openDeleteModalHandler(treatment._id)}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
      <AddTreatment
        isOpen={addModal}
        onClose={closeAddModalHandler}
        addTreatment={treatmentAdditionHandler}
      />
      <DeleteModal
        isOpen={deleteModal}
        onClose={closeDeleteModalHandler}
        onNoClick={closeDeleteModalHandler}
        onYesClick={deleteTreatmentHandler}
      />
    </div>
  );
};

export default Treatments;
