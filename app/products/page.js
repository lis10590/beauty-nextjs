import Card from "../_components/card";
import Pagination from "../_components/pagination";
import DeleteButton from "../_components/deleteButton";
import { getProducts } from "../_utils/requests/products";

const Products = async (context) => {
  const page = context.searchParams.page ? context.searchParams.page : "1";

  const { products, totalPages } = await getProducts(page);

  const tableHeadings = [
    "Product Name",
    "Manufacturer",
    "Product Type",
    "Product Group",
    "Price (ILS)",
    "",
  ];

  return (
    <>
      <div>
        <div className="flex flex-col items-center justify-center mt-10">
          <Card heading="Products" modal="product">
            <table className="m-4">
              <thead>
                <tr>
                  {tableHeadings.map((heading, index) => {
                    return <th key={index}>{heading}</th>;
                  })}
                </tr>
              </thead>
              <tbody>
                {products.map((product) => {
                  return (
                    <tr key={product._id}>
                      <td>{product.productName}</td>
                      <td>{product.manufacturer}</td>
                      <td>{product.productType}</td>
                      <td>{product.productGroup}</td>
                      <td>{product.price}</td>
                      <td>
                        <DeleteButton id={product._id} modal="product" />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </Card>
          <Pagination
            type="products"
            totalPages={totalPages}
            currentPage={page}
          />
        </div>
      </div>
    </>
  );
};

export default Products;

// import { Card, Button, Table, Pagination } from "react-bootstrap";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faPlus, faTrashCan } from "@fortawesome/free-solid-svg-icons";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   getAllProducts,
//   selectAllProducts,
//   deleteOneProduct,
//   reset,
// } from "../_utils/store/products";
// import { modalActions } from "../_utils/store/modal";
// import { useState, useEffect } from "react";
// import DeleteModal from "../_components/deleteModal";
// import AddProduct from "../_components/addProduct";
// import styles from "../_styles/products.module.css";
// import { getProducts, deleteProduct } from "../_utils/requests/products";
// import Skeleton from "react-loading-skeleton";

// const Products = () => {
//   const dispatch = useDispatch();
//   const addModal = useSelector((state) => state.modal.addModalOpen);
//   const deleteModal = useSelector((state) => state.modal.deleteModalOpen);

//   const [chosenProductId, setChosenProductId] = useState("");
//   const [isLoading, setIsLoading] = useState(false);

//   const [currentPage, setCurrentPage] = useState(1);
//   const [productsPerPage] = useState(4);

//   useEffect(() => {
//     getAllProducts();
//     // dispatch(getAllProducts());
//     // return () => {
//     //   dispatch(reset());
//     // };
//   }, []);

//   // const products = useSelector(selectAllProducts);
//   const [products, setProducts] = useState([]);

//   const getAllProducts = async () => {
//     setIsLoading(true);
//     try {
//       const data = await getProducts();
//       setProducts(data);
//       setIsLoading(false);
//     } catch (error) {
//       // Handle the error if needed
//     }
//   };

//   const handleProductAddition = (newProduct) => {
//     setProducts([...products, newProduct]);
//   };

//   const tableHeadings = [
//     "Product Name",
//     "Manufacturer",
//     "Product Type",
//     "Product Group",
//     "Price (ILS)",
//     "",
//   ];

//   const saveProductId = (id) => {
//     setChosenProductId(id);
//   };

//   const closeAddModalHandler = () => {
//     dispatch(modalActions.addModalClose());
//   };

//   const openAddModalHandler = () => {
//     dispatch(modalActions.addModalOpen());
//   };

//   const openDeleteModalHandler = (id) => {
//     dispatch(modalActions.deleteModalOpen());
//     saveProductId(id);
//   };

//   const closeDeleteModalHandler = () => {
//     dispatch(modalActions.deleteModalClose());
//   };

//   // Calculate the index of the last client on the current page
//   const indexOfLastClient = currentPage * productsPerPage;

//   // Calculate the index of the first client on the current page
//   const indexOfFirstClient = indexOfLastClient - productsPerPage;

//   // Get the clients to display on the current page
//   const currentProducts = products.slice(indexOfFirstClient, indexOfLastClient);

//   // Calculate the total number of pages based on the total number of clients
//   const totalPages = Math.ceil(products.length / productsPerPage);

//   // Calculate the page numbers to display in the pagination
//   const pageNumbers = [];
//   for (let i = 1; i <= totalPages; i++) {
//     pageNumbers.push(i);
//   }

//   // Determine whether the previous button should be disabled
//   const isPrevDisabled = currentPage === 1;

//   // Determine whether the next button should be disabled
//   const isNextDisabled = currentPage === totalPages;

//   // Handles clicking on a page number
//   const handleClick = (pageNumber) => {
//     setCurrentPage(pageNumber);
//   };

//   // Handles clicking on the "Previous" button
//   const handlePrevPage = () => {
//     setCurrentPage((prev) => prev - 1);
//   };

//   // Handles clicking on the "Next" button
//   const handleNextPage = () => {
//     setCurrentPage((prev) => prev + 1);
//   };

//   const deleteProductHandler = () => {
//     const updatedProducts = products.filter(
//       (product) => product._id !== chosenProductId
//     );
//     setProducts(updatedProducts);
//     deleteProduct(chosenProductId);
//     dispatch(modalActions.deleteModalClose());
//   };

//   return (
//     <div className="d-flex flex-column align-items-center">
//       <Card className={`${styles.productsCard} mt-3`}>
//         <Card.Header
//           className={`${styles.cardHeader} d-flex flex-column align-items-center`}
//         >
//           <Button
//             className={`${styles.addButton} mb-1`}
//             onClick={openAddModalHandler}
//           >
//             <FontAwesomeIcon icon={faPlus} />
//           </Button>
//           Products
//         </Card.Header>
//         <Card.Body>
//           {!isLoading ? (
//             <Table responsive="sm">
//               <thead>
//                 <tr>
//                   {tableHeadings.map((heading, index) => {
//                     return <th key={index}>{heading}</th>;
//                   })}
//                 </tr>
//               </thead>
//               <tbody>
//                 {currentProducts.map((product) => {
//                   return (
//                     <tr key={product._id}>
//                       <td>{product.productName}</td>
//                       <td>{product.manufacturer}</td>
//                       <td>{product.productType}</td>
//                       <td>{product.productGroup}</td>
//                       <td>{product.price}</td>
//                       <td>
//                         <FontAwesomeIcon
//                           className={styles.deleteIcon}
//                           icon={faTrashCan}
//                           onClick={() => openDeleteModalHandler(product._id)}
//                         />
//                       </td>
//                     </tr>
//                   );
//                 })}
//               </tbody>
//             </Table>
//           ) : (
//             <Skeleton count={10} />
//           )}
//         </Card.Body>
//       </Card>
//       <AddProduct
//         isOpen={addModal}
//         onClose={closeAddModalHandler}
//         addProduct={handleProductAddition}
//       />
//       <DeleteModal
//         isOpen={deleteModal}
//         onClose={closeDeleteModalHandler}
//         onNoClick={closeDeleteModalHandler}
//         onYesClick={deleteProductHandler}
//       />
//       <div className="d-flex justify-content-center my-3">
//         <Pagination>
//           <Pagination.Prev onClick={handlePrevPage} disabled={isPrevDisabled} />
//           {pageNumbers.map((number) => {
//             if (number === currentPage) {
//               return (
//                 <Pagination.Item key={number} active>
//                   {number}
//                 </Pagination.Item>
//               );
//             } else if (number >= currentPage - 1 && number <= currentPage + 1) {
//               return (
//                 <Pagination.Item
//                   key={number}
//                   onClick={() => handleClick(number)}
//                 >
//                   {number}
//                 </Pagination.Item>
//               );
//             } else {
//               return null;
//             }
//           })}
//           <Pagination.Next onClick={handleNextPage} disabled={isNextDisabled} />
//         </Pagination>
//       </div>
//     </div>
//   );
// };

// export default Products;
