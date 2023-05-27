"use client";
import {
  Card,
  ListGroup,
  Button,
  Container,
  Pagination,
} from "react-bootstrap";
import styles from "../_styles/clients.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { modalActions } from "../_utils/store/modal";
import {
  selectAllClients,
  getAllClients,
  deleteOneClient,
} from "../_utils/store/clients";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import AddClient from "../_components/addClient";
import DeleteModal from "../_components/deleteModal";
import Link from "next/link";
import { getClients, deleteClient } from "../_utils/requests/clients";
import Skeleton from "react-loading-skeleton";

const Clients = () => {
  const dispatch = useDispatch();
  const addModal = useSelector((state) => state.modal.addModalOpen);
  const deleteModal = useSelector((state) => state.modal.deleteModalOpen);

  const [chosenClientId, setChosenClientId] = useState("");
  const [clients, setClients] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // const clients = useSelector(selectAllClients);

  const [currentPage, setCurrentPage] = useState(1);
  const [clientsPerPage] = useState(5);

  useEffect(() => {
    // dispatch(getAllClients());
    getAllClients();
  }, []);

  const getAllClients = async () => {
    setIsLoading(true);
    try {
      const data = await getClients();
      setClients(data);
      setIsLoading(false);
    } catch (error) {
      // Handle the error if needed
    }
  };

  const handleClientAddition = (newClient) => {
    setClients([...clients, newClient]);
  };

  const saveChosenClientId = (id) => {
    setChosenClientId(id);
  };

  const deleteClientHandler = (clientId) => {
    // dispatch(deleteOneClient(clientId));
    const updatedClients = clients.filter((client) => client._id !== clientId);
    setClients(updatedClients);
    deleteClient(clientId);
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
    saveChosenClientId(id);
  };

  const closeDeleteModalHandler = () => {
    dispatch(modalActions.deleteModalClose());
  };

  // Calculate the index of the last client on the current page
  const indexOfLastClient = currentPage * clientsPerPage;

  // Calculate the index of the first client on the current page
  const indexOfFirstClient = indexOfLastClient - clientsPerPage;

  // Get the clients to display on the current page
  const currentClients = clients.slice(indexOfFirstClient, indexOfLastClient);

  // Calculate the total number of pages based on the total number of clients
  const totalPages = Math.ceil(clients.length / clientsPerPage);

  // Calculate the page numbers to display in the pagination
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  // Determine whether the previous button should be disabled
  const isPrevDisabled = currentPage === 1;

  // Determine whether the next button should be disabled
  const isNextDisabled = currentPage === totalPages;

  // Handles clicking on a page number
  const handleClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Handles clicking on the "Previous" button
  const handlePrevPage = () => {
    setCurrentPage((prev) => prev - 1);
  };

  // Handles clicking on the "Next" button
  const handleNextPage = () => {
    setCurrentPage((prev) => prev + 1);
  };

  return (
    <div
      className={`${styles.clientsBody} d-flex flex-column align-items-center `}
    >
      <Card className={`${styles.clientCard} mt-5`}>
        <Card.Header
          className={`${styles.cardHeader} d-flex flex-column align-items-center`}
        >
          <Button
            className={`${styles.addButton} mb-1`}
            onClick={openAddModalHandler}
          >
            <FontAwesomeIcon icon={faPlus} />
          </Button>
          Clients
        </Card.Header>
        {!isLoading ? (
          <ListGroup>
            {clients
              ? currentClients.map((client) => {
                  return (
                    <ListGroup.Item
                      key={client._id}
                      className="d-flex flex-column align-items-center"
                    >
                      <Container
                        className="d-flex justify-content-center"
                        as={Link}
                        href={`/clients/${client._id}`}
                      >
                        {client.fullName}
                      </Container>

                      <FontAwesomeIcon
                        className={styles.deleteIcon}
                        icon={faTrashCan}
                        onClick={() => openDeleteModalHandler(client._id)}
                      />
                      <DeleteModal
                        isOpen={deleteModal}
                        onClose={closeDeleteModalHandler}
                        onNoClick={closeDeleteModalHandler}
                        onYesClick={() => deleteClientHandler(chosenClientId)}
                      />
                    </ListGroup.Item>
                  );
                })
              : null}
          </ListGroup>
        ) : (
          <Skeleton count={5} />
        )}
      </Card>
      <AddClient
        isOpen={addModal}
        onClose={closeAddModalHandler}
        addClient={handleClientAddition}
      />
      <div className="d-flex justify-content-center my-3">
        <Pagination>
          <Pagination.Prev onClick={handlePrevPage} disabled={isPrevDisabled} />
          {pageNumbers.map((number) => {
            if (number === currentPage) {
              return (
                <Pagination.Item key={number} active>
                  {number}
                </Pagination.Item>
              );
            } else if (number >= currentPage - 1 && number <= currentPage + 1) {
              return (
                <Pagination.Item
                  key={number}
                  onClick={() => handleClick(number)}
                >
                  {number}
                </Pagination.Item>
              );
            } else {
              return null;
            }
          })}
          <Pagination.Next onClick={handleNextPage} disabled={isNextDisabled} />
        </Pagination>
      </div>
    </div>
  );
};

export default Clients;
