"use client";
import Image from "next/image";
import trashIcon from "@/public/trashIcon.svg";
import { useState } from "react";
import DeleteModal from "./deleteModal";
import { useRouter } from "next/navigation";
import { deleteCustomer, deleteProduct, deleteTreatment } from "../actions";

const DeleteButton = ({ id, modal }) => {
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [chosenId, setChosenId] = useState("");
  const router = useRouter();

  const handleDeleteModalOpen = (id) => {
    setDeleteModalOpen(true);
    saveChosenId(id);
  };

  const handleDeleteModalClose = () => {
    setDeleteModalOpen(false);
  };

  const saveChosenId = (id) => {
    setChosenId(id);
  };

  const deleteClientHandler = (id) => {
    deleteCustomer(id);
    setDeleteModalOpen(false);
  };

  const deleteProductHandler = (id) => {
    deleteProduct(id);
    setDeleteModalOpen(false);
  };

  const deleteTreatmentHandler = (id) => {
    deleteTreatment(id);
    setDeleteModalOpen(false);
  };

  const deleteComponentMap = {
    client: {
      deleteFunction: deleteClientHandler,
    },
    product: {
      deleteFunction: deleteProductHandler,
    },
    treatment: {
      deleteFunction: deleteTreatmentHandler,
    },
  };

  // Function to get the add component and its function
  const getDeleteComponentData = () => {
    // Validate the modal prop for safety
    if (!modal || !deleteComponentMap[modal]) {
      console.error(`Invalid modal prop: "${modal}"`);
      return null;
    }

    return deleteComponentMap[modal];
  };

  const { deleteFunction } = getDeleteComponentData();

  return (
    <>
      <Image
        className="mr-4"
        src={trashIcon}
        height={30}
        alt="trash icon"
        onClick={() => handleDeleteModalOpen(id)}
      />

      {deleteModalOpen && (
        <DeleteModal
          isOpen={deleteModalOpen}
          onClose={handleDeleteModalClose}
          onYesClick={() => deleteFunction(chosenId)}
        />
      )}
    </>
  );
};

export default DeleteButton;
