"use client";

// import { modalActions } from "../_utils/store/modal";
import { useEffect, useState } from "react";
import Link from "next/link";
import { getClients, deleteClient } from "../_utils/requests/clients";
import Card from "../_components/card";
import Image from "next/image";
import trashIcon from "@/public/trashIcon.svg";
import Pagination from "../_components/pagination";
import AddClient from "../_components/addClient";

const Clients = () => {
  const [chosenClientId, setChosenClientId] = useState("");
  const [clients, setClients] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [isOpen, setIsOpen] = useState(false);

  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

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

  // const deleteClientHandler = (clientId) => {
  //   // dispatch(deleteOneClient(clientId));
  //   const updatedClients = clients.filter((client) => client._id !== clientId);
  //   setClients(updatedClients);
  //   deleteClient(clientId);
  //   dispatch(modalActions.deleteModalClose());
  // };

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

  // Handles clicking on a page number
  const handleClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="flex flex-col items-center justify-center mt-10">
      <Card heading="Clients" onClick={handleOpenModal}>
        {currentClients.map((client) => {
          return (
            <div key={client._id} className="flex justify-between">
              <Link className="m-auto" href={`/clients/${client._id}`}>
                {client.fullName}
              </Link>
              <Image
                className="mr-4"
                src={trashIcon}
                height={30}
                alt="trash icon"
              />
            </div>
          );
        })}
      </Card>
      <Pagination
        currentPage={currentPage}
        onPageChange={handleClick}
        totalPages={totalPages}
      />
      <AddClient isOpen={isOpen} />
    </div>
  );

  // return (
  //   <div
  //     className={`${styles.clientsBody} d-flex flex-column align-items-center `}
  //   >
  //     <Card className={`${styles.clientCard} mt-5`}>
  //       <Card.Header
  //         className={`${styles.cardHeader} d-flex flex-column align-items-center`}
  //       >
  //         <Button
  //           className={`${styles.addButton} mb-1`}
  //           onClick={openAddModalHandler}
  //         >
  //           <FontAwesomeIcon icon={faPlus} />
  //         </Button>
  //         Clients
  //       </Card.Header>
  //       {!isLoading ? (
  //         <ListGroup>
  //           {clients
  //             ? currentClients.map((client) => {
  //                 return (
  //                   <ListGroup.Item
  //                     key={client._id}
  //                     className="d-flex flex-column align-items-center"
  //                   >
  //                     <Container
  //                       className="d-flex justify-content-center"
  //                       as={Link}
  //                       href={`/clients/${client._id}`}
  //                     >
  //                       {client.fullName}
  //                     </Container>

  //                     <FontAwesomeIcon
  //                       className={styles.deleteIcon}
  //                       icon={faTrashCan}
  //                       onClick={() => openDeleteModalHandler(client._id)}
  //                     />
  //                     <DeleteModal
  //                       isOpen={deleteModal}
  //                       onClose={closeDeleteModalHandler}
  //                       onNoClick={closeDeleteModalHandler}
  //                       onYesClick={() => deleteClientHandler(chosenClientId)}
  //                     />
  //                   </ListGroup.Item>
  //                 );
  //               })
  //             : null}
  //         </ListGroup>
  //       ) : (
  //         <Skeleton count={5} />
  //       )}
  //     </Card>
  //     <AddClient
  //       isOpen={addModal}
  //       onClose={closeAddModalHandler}
  //       addClient={handleClientAddition}
  //     />
  //     <div className="d-flex justify-content-center my-3">
  //       <Pagination>
  //         <Pagination.Prev onClick={handlePrevPage} disabled={isPrevDisabled} />
  //         {pageNumbers.map((number) => {
  //           if (number === currentPage) {
  //             return (
  //               <Pagination.Item key={number} active>
  //                 {number}
  //               </Pagination.Item>
  //             );
  //           } else if (number >= currentPage - 1 && number <= currentPage + 1) {
  //             return (
  //               <Pagination.Item
  //                 key={number}
  //                 onClick={() => handleClick(number)}
  //               >
  //                 {number}
  //               </Pagination.Item>
  //             );
  //           } else {
  //             return null;
  //           }
  //         })}
  //         <Pagination.Next onClick={handleNextPage} disabled={isNextDisabled} />
  //       </Pagination>
  //     </div>
  //   </div>
  // );
};

export default Clients;
