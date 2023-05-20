import { createContext, useState } from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [modal, setModal] = useState({
    addModalOpen: false,
    deleteModalOpen: false,
  });

  // Define any functions to modify the global state
  const addModalOpen = () => {
    setModal((prevState) => ({
      ...prevState,
      addModalOpen: true,
    }));
  };

  const addModalClose = () => {
    setModal((prevState) => ({
      ...prevState,
      addModalOpen: false,
    }));
  };

  const deleteModalOpen = () => {
    setModal((prevState) => ({
      ...prevState,
      deleteModalOpen: true,
    }));
  };

  const deleteModalClose = () => {
    setModal((prevState) => ({
      ...prevState,
      deleteModalOpen: false,
    }));
  };

  const contextValue = {
    state: modal,
    actions: {
      addModalOpen,
      addModalClose,
      deleteModalOpen,
      deleteModalClose,
    },
  };

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};
