import { Modal, Dropdown, Button } from "react-bootstrap";
import styles from "../_styles/modals.module.css";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectAllProducts, getAllProducts } from "../_utils/store/products";
import {
  purchasedProductsUpdate,
  getClientById,
} from "../_utils/store/clients";

const AddPurchasedProducts = (props) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  const [drop, setDrop] = useState("Products");
  const products = useSelector(selectAllProducts);

  const onSelectDrop = (event) => {
    setDrop(event);
  };

  const onSaveClick = () => {
    const obj = {
      phoneNumber: props.client.phoneNumber,
      productName: drop,
    };

    dispatch(purchasedProductsUpdate(obj));
    props.onClose();
  };

  return (
    <Modal show={props.isOpen} onHide={props.onClose}>
      <Modal.Header className={styles.modalHeader} closeButton>
        <Modal.Title className={styles.modalTitle}>Add Product</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Dropdown
          onSelect={onSelectDrop}
          className="d-flex justify-content-center"
        >
          <Dropdown.Toggle id="dropdown-basic" className={styles.dropdown}>
            {drop}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            {products.map((product) => {
              return (
                <Dropdown.Item key={product._id} eventKey={product.productName}>
                  {" "}
                  {product.productName}
                </Dropdown.Item>
              );
            })}
          </Dropdown.Menu>
        </Dropdown>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.onClose}>
          Close
        </Button>
        <Button className={styles.saveButton} onClick={onSaveClick}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddPurchasedProducts;
