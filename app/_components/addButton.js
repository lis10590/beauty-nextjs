"use client";
import Image from "next/image";
import plusIcon from "@/public/plusIcon.svg";
import { useState } from "react";
import AddClient from "./addClient";
import { addNewClient } from "../_utils/requests/clients";
import { useRouter } from "next/navigation";
const AddButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  const handleClientAddition = (newClient) => {
    // setClients([...clients, newClient]);
    addNewClient(newClient);
    setIsOpen(false);
    router.refresh();
  };
  return (
    <>
      <button
        className="border-2 border-black rounded hover:bg-slate-50"
        onClick={handleOpenModal}
      >
        <Image src={plusIcon} height={40} alt="plus icon" />
      </button>
      {isOpen && (
        <AddClient
          addClient={handleClientAddition}
          isOpen={isOpen}
          onClose={handleCloseModal}
        />
      )}
    </>
  );
};

export default AddButton;
