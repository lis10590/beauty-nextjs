import { Modal, Dropdown, Button } from "react-bootstrap";
import styles from "../_styles/modals.module.css";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectAllProducts, getAllProducts } from "../_utils/store/products";
import {
  purchasedProductsUpdate,
  getClientById,
} from "../_utils/store/clients";

import { updateClient, getClient } from "../_utils/requests/clients";
import { getProducts } from "../_utils/requests/products";

const AddPurchasedProducts = (props) => {
  const dispatch = useDispatch();
  useEffect(() => {
    // dispatch(getAllProducts());
    getAllProducts();
  }, []);

  const [drop, setDrop] = useState("Products");
  const [products, setProducts] = useState([]);

  // const products = useSelector(selectAllProducts);

  const getAllProducts = async () => {
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (error) {
      // Handle the error if needed
    }
  };

  const onSelectDrop = (event) => {
    setDrop(event);
  };

  const onSaveClick = async () => {
    const obj = {
      phoneNumber: props.client.phoneNumber,
      productName: drop,
    };

    // dispatch(purchasedProductsUpdate(obj));
    await updateClient(obj);
    const id = await getClient(props.client._id);
    console.log(id);
    props.onClose();
    props.updateClient(id);
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
