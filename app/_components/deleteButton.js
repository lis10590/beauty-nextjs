"use client";
import Image from "next/image";
import trashIcon from "@/public/trashIcon.svg";
import { useState } from "react";
import DeleteModal from "./deleteModal";
import { deleteClient } from "../_utils/requests/clients";
import { useRouter } from "next/navigation";

const DeleteButton = ({ clientId }) => {
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [chosenClientId, setChosenClientId] = useState("");
  const router = useRouter();

  const handleDeleteModalOpen = (id) => {
    setDeleteModalOpen(true);
    saveChosenClientId(id);
  };

  const handleDeleteModalClose = () => {
    setDeleteModalOpen(false);
  };

  const saveChosenClientId = (id) => {
    setChosenClientId(id);
  };

  const deleteClientHandler = (clientId) => {
    deleteClient(clientId);
    setDeleteModalOpen(false);
    router.refresh();
  };

  return (
    <>
      <Image
        className="mr-4"
        src={trashIcon}
        height={30}
        alt="trash icon"
        onClick={() => handleDeleteModalOpen(clientId)}
      />

      {deleteModalOpen && (
        <DeleteModal
          isOpen={deleteModalOpen}
          onClose={handleDeleteModalClose}
          onYesClick={() => deleteClientHandler(chosenClientId)}
        />
      )}
    </>
  );
};

export default DeleteButton;
