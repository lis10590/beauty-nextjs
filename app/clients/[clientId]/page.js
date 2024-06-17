const ClientCard = () => {
  return <div>Client</div>;
};

export default ClientCard;

// "use client";
// import { useParams } from "next/navigation";
// import { getClientById, selectAllClients } from "../../_utils/store/clients";
// import { useEffect, useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { Card, Button, ListGroup } from "react-bootstrap";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faPlus } from "@fortawesome/free-solid-svg-icons";
// import styles from "../../_styles/clients.module.css";
// import { modalActions } from "../../_utils/store/modal";
// import AddPurchasedProducts from "../../_components/addPurchasedProducts";
// import { getClient, getClients } from "../../_utils/requests/clients";
// const ClientDetails = () => {
//   const dispatch = useDispatch();
//   const params = useParams();
//   const clientId = params.clientId;
//   console.log(clientId);

//   // const client = useSelector((state) => state.clients.client);
//   const addModal = useSelector((state) => state.modal.addModalOpen);
//   // const clients = useSelector(selectAllClients);
//   const [client, setClient] = useState({});
//   const [clients, setClients] = useState([]);
//   useEffect(() => {
//     if (clientId) {
//       // dispatch(getClientById(clientId));
//       getAllClients();
//       getClientById(clientId);
//     }
//   }, []);

//   const getAllClients = async () => {
//     try {
//       const data = await getClients();
//       setClients(data);
//     } catch (error) {
//       // Handle the error if needed
//     }
//   };

//   const getClientById = async (id) => {
//     try {
//       const data = await getClient(id);
//       setClient(data);
//       console.log(client);
//     } catch (error) {
//       // Handle the error if needed
//     }
//   };

//   const handleUpdateClient = (update) => {
//     setClient(update);
//   };

//   const closeAddModalHandler = () => {
//     dispatch(modalActions.addModalClose());
//   };

//   const openAddModalHandler = () => {
//     dispatch(modalActions.addModalOpen());
//   };

//   return (
//     <div className={`${styles.clientsBody} d-flex justify-content-center `}>
//       <Card className={`${styles.clientCard} mt-5`}>
//         <Card.Header
//           className={`${styles.cardHeader} d-flex flex-column align-items-center`}
//         >
//           {client.fullName}
//         </Card.Header>
//         <Card.Body>
//           <p>Phone Number: {client.phoneNumber}</p>
//           <div>
//             <p>Treatment History:</p>
//             <ListGroup>
//               {client.treatmentHistory && client.treatmentHistory.length !== 0
//                 ? client.treatmentHistory.map((treatment, index) => {
//                     const treatmentDate = new Date(
//                       treatment.date
//                     ).toLocaleDateString("en-GB");
//                     return (
//                       <ListGroup.Item key={index}>
//                         {treatment.treatmentName} on {treatmentDate}
//                       </ListGroup.Item>
//                     );
//                   })
//                 : null}
//             </ListGroup>
//           </div>

//           <div>
//             <Button
//               className={`${styles.addButton} mb-1`}
//               onClick={openAddModalHandler}
//             >
//               <FontAwesomeIcon icon={faPlus} />
//             </Button>
//             <p>Purchased Products</p>
//             <ListGroup>
//               {client.productsPurchased && client.productsPurchased.length !== 0
//                 ? client.productsPurchased.map((item, index) => {
//                     const purchaseDate = new Date(item.date).toLocaleDateString(
//                       "en-GB"
//                     );
//                     return (
//                       <ListGroup.Item key={index}>
//                         {item.productName} on {purchaseDate}
//                       </ListGroup.Item>
//                     );
//                   })
//                 : null}
//             </ListGroup>
//           </div>
//         </Card.Body>
//       </Card>
//       <AddPurchasedProducts
//         isOpen={addModal}
//         onClose={closeAddModalHandler}
//         client={client ? client : null}
//         updateClient={handleUpdateClient}
//       />
//     </div>
//   );
// };

// export default ClientDetails;
