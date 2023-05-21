"use client";

import { Card, Button, Table, Pagination } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllProducts,
  selectAllProducts,
  deleteOneProduct,
  reset,
} from "../_utils/store/products";
import { modalActions } from "../_utils/store/modal";
import { useState, useEffect } from "react";
import DeleteModal from "../_components/deleteModal";
import AddProduct from "../_components/addProducts";
import styles from "../_styles/products.module.css";

const Products = () => {
  const dispatch = useDispatch();
  const addModal = useSelector((state) => state.modal.addModalOpen);
  const deleteModal = useSelector((state) => state.modal.deleteModalOpen);

  const [chosenProductId, setChosenProductId] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(10);

  useEffect(() => {
    dispatch(getAllProducts());
    return () => {
      dispatch(reset());
    };
  }, [dispatch]);

  const products = useSelector(selectAllProducts);

  const tableHeadings = [
    "Product Name",
    "Manufacturer",
    "Product Type",
    "Product Group",
    "Price (ILS)",
    "",
  ];

  const saveProductId = (id) => {
    setChosenProductId(id);
  };

  const closeAddModalHandler = () => {
    dispatch(modalActions.addModalClose());
  };

  const openAddModalHandler = () => {
    dispatch(modalActions.addModalOpen());
  };

  const openDeleteModalHandler = (id) => {
    dispatch(modalActions.deleteModalOpen());
    saveProductId(id);
  };

  const closeDeleteModalHandler = () => {
    dispatch(modalActions.deleteModalClose());
  };

  // Calculate the index of the last client on the current page
  const indexOfLastClient = currentPage * productsPerPage;

  // Calculate the index of the first client on the current page
  const indexOfFirstClient = indexOfLastClient - productsPerPage;

  // Get the clients to display on the current page
  const currentProducts = products.slice(indexOfFirstClient, indexOfLastClient);

  // Calculate the total number of pages based on the total number of clients
  const totalPages = Math.ceil(products.length / productsPerPage);

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
    <div className="d-flex flex-column align-items-center">
      <Card className="mt-5">
        <Card.Header
          className={`${styles.cardHeader} d-flex flex-column align-items-center`}
        >
          <Button
            className={`${styles.addButton} mb-1`}
            onClick={openAddModalHandler}
          >
            <FontAwesomeIcon icon={faPlus} />
          </Button>
          Products
        </Card.Header>
        <Card.Body>
          <Table responsive="sm">
            <thead>
              <tr>
                {tableHeadings.map((heading, index) => {
                  return <th key={index}>{heading}</th>;
                })}
              </tr>
            </thead>
            <tbody>
              {currentProducts.map((product) => {
                return (
                  <tr key={product._id}>
                    <td>{product.productName}</td>
                    <td>{product.manufacturer}</td>
                    <td>{product.productType}</td>
                    <td>{product.productGroup}</td>
                    <td>{product.price}</td>
                    <td>
                      <FontAwesomeIcon
                        className={styles.deleteIcon}
                        icon={faTrashCan}
                        onClick={() => openDeleteModalHandler(product._id)}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
      <AddProduct isOpen={addModal} onClose={closeAddModalHandler} />
      <DeleteModal
        isOpen={deleteModal}
        onClose={closeDeleteModalHandler}
        onNoClick={closeDeleteModalHandler}
        onYesClick={() => {
          dispatch(deleteOneProduct(chosenProductId));
          dispatch(modalActions.deleteModalClose());
        }}
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

export default Products;
