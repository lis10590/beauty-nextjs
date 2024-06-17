"use client";
import Image from "next/image";
import plusIcon from "@/public/plusIcon.svg";
import { useState } from "react";
import AddClient from "./addClient";
import AddProduct from "./addProduct";
// import { addNewClient } from "../_utils/requests/clients";
import { addNewProduct } from "../_utils/requests/products";
import { useRouter } from "next/navigation";
const AddButton = ({ modal }) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const addNewClient = async (newClient) => {
    try {
      const res = await fetch("http://localhost:3000/api/clients/newClient", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(newClient),
      });

      if (res.ok) {
        router.refresh();
      } else {
        throw new Error("Failed to create a Product");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  const handleClientAddition = (newClient) => {
    // setClients([...clients, newClient]);

    setIsOpen(false);
  };

  const handleProductAddition = (newProduct) => {
    addNewProduct(newProduct);
    setIsOpen(false);
    router.refresh();
  };

  const addComponentMap = {
    client: {
      component: AddClient,
      addFunction: handleClientAddition,
    },
    product: {
      component: AddProduct,
      addFunction: handleProductAddition,
    },
  };

  // Function to get the add component and its function
  const getAddComponentData = () => {
    // Validate the modal prop for safety
    if (!modal || !addComponentMap[modal]) {
      console.error(`Invalid modal prop: "${modal}"`);
      return null;
    }

    return addComponentMap[modal];
  };

  const { component: AddComponent, addFunction } = getAddComponentData();
  return (
    <>
      <button
        className="border-2 border-black rounded hover:bg-slate-50"
        onClick={handleOpenModal}
      >
        <Image src={plusIcon} height={40} alt="plus icon" />
      </button>
      {isOpen && (
        <AddComponent
          onAdd={addFunction}
          isOpen={isOpen}
          onClose={handleCloseModal}
        />
      )}
    </>
  );
};

export default AddButton;
