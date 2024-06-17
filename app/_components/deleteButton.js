"use client";
import Image from "next/image";
import trashIcon from "@/public/trashIcon.svg";
import { useState } from "react";
import DeleteModal from "./deleteModal";
import { deleteClient } from "../_utils/requests/clients";
import { deleteProduct } from "../_utils/requests/products";
import { useRouter } from "next/navigation";

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
    deleteClient(id);
    setDeleteModalOpen(false);
    router.refresh();
  };

  const deleteProductHandler = (id) => {
    deleteProduct(id);
    setDeleteModalOpen(false);
    router.refresh();
  };

  const deleteComponentMap = {
    client: {
      deleteFunction: deleteClientHandler,
    },
    product: {
      deleteFunction: deleteProductHandler,
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
