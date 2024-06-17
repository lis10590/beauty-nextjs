import Modal from "./modal";
import Form from "./form";

const AddProduct = ({ isOpen, onClose, onAdd }) => {
  let inputRegex = new RegExp("[A-Za-z]{2,}");
  let priceRegex = new RegExp("[0-9]");

  const productFields = [
    {
      name: "productName",
      type: "text",
      placeholder: "Product Name",
      defaultValue: "",
      validation: (productName) => inputRegex.test(productName),
    },
    {
      name: "manufacturer",
      type: "text",
      placeholder: "Manufacturer",
      defaultValue: "",
      validation: (manufacturer) => inputRegex.test(manufacturer),
    },
    {
      name: "productType",
      type: "text",
      placeholder: "Product Type",
      defaultValue: "",
      validation: (productType) => inputRegex.test(productType),
    },
    {
      name: "productGroup",
      type: "text",
      placeholder: "Product Group",
      defaultValue: "",
      validation: (productGroup) => inputRegex.test(productGroup),
    },
    {
      name: "price",
      type: "text",
      placeholder: "Price",
      defaultValue: "",
      validation: (price) => priceRegex.test(price),
    },
  ];

  const addNewProductHandler = (formData) => {
    onAdd(formData);
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose} heading="Add Product">
      <Form
        fields={productFields}
        onClose={onClose}
        onSubmit={addNewProductHandler}
      />
    </Modal>
  );
};

export default AddProduct;

// "use client";

// import { Modal, Button } from "react-bootstrap";
// import InputComponent from "./inputComponent";
// import { useDispatch } from "react-redux";
// import { productAddition } from "../_utils/store/products";
// import { addNewProduct } from "../_utils/requests/products";
// import useInput from "../_hooks/useInput";
// import styles from "../_styles/modals.module.css";
// import {
//   faShoppingBag,
//   faTruck,
//   faUserGroup,
//   faShekelSign,
//   faT,
// } from "@fortawesome/free-solid-svg-icons";

// const AddProduct = (props) => {
//   let inputRegex = new RegExp("[A-Za-z]{2,}");
//   let priceRegex = new RegExp("[0-9]");

//   const {
//     value: productName,
//     hasError: productNameInputHasError,
//     valueChangeHandler: productNameChangeHandler,
//     inputBlurHandler: productNameBlurHandler,
//     reset: resetProductName,
//   } = useInput((value) => inputRegex.test(value));

//   const {
//     value: manufacturer,
//     hasError: manufacturerInputHasError,
//     valueChangeHandler: manufacturerChangeHandler,
//     inputBlurHandler: manufacturerBlurHandler,
//     reset: resetManufacturer,
//   } = useInput((value) => inputRegex.test(value));
//   const {
//     value: productGroup,
//     hasError: productGroupInputHasError,
//     valueChangeHandler: productGroupChangeHandler,
//     inputBlurHandler: productGroupBlurHandler,
//     reset: resetProductGroup,
//   } = useInput((value) => inputRegex.test(value));

//   const {
//     value: productType,
//     hasError: productTypeInputHasError,
//     valueChangeHandler: productTypeChangeHandler,
//     inputBlurHandler: productTypeBlurHandler,
//     reset: resetProductType,
//   } = useInput((value) => inputRegex.test(value));

//   const {
//     value: price,
//     hasError: priceInputHasError,
//     valueChangeHandler: priceChangeHandler,
//     inputBlurHandler: priceBlurHandler,
//     reset: resetPrice,
//   } = useInput((value) => priceRegex.test(value));

//   const dispatch = useDispatch();

//   const addNewProductHandler = async (event) => {
//     event.preventDefault();
//     if (
//       !productNameInputHasError &&
//       !manufacturerInputHasError &&
//       !productTypeInputHasError &&
//       !productGroupInputHasError &&
//       !priceInputHasError
//     ) {
//       const product = {
//         productName,
//         manufacturer,
//         productType,
//         productGroup,
//         price,
//       };
//       // dispatch(productAddition(product));
//       props.addProduct(product);
//       await addNewProduct(product);

//       props.onClose();
//       resetProductName();
//       resetManufacturer();
//       resetProductType();
//       resetProductGroup();
//       resetPrice();
//     }
//   };

//   return (
//     <Modal show={props.isOpen} onHide={props.onClose}>
//       <Modal.Header className={styles.modalHeader} closeButton>
//         <Modal.Title className={styles.modalTitle}>Add Product</Modal.Title>
//       </Modal.Header>
//       <Modal.Body>
//         <InputComponent
//           inputTextClass="mt-3 ms-4"
//           name="productName"
//           placeholder="Product Name"
//           type="text"
//           formControlClass="mt-3 me-4"
//           value={productName}
//           onChange={productNameChangeHandler}
//           onBlur={productNameBlurHandler}
//           icon={faShoppingBag}
//         />
//         {productNameInputHasError && (
//           <p className={`${styles.alert} text-danger text-center`}>
//             Product Name is invalid!
//           </p>
//         )}
//         <InputComponent
//           inputTextClass="mt-3 ms-4"
//           name="manufacturer"
//           placeholder="Manufacturer"
//           type="text"
//           formControlClass="mt-3 me-4"
//           value={manufacturer}
//           onChange={manufacturerChangeHandler}
//           onBlur={manufacturerBlurHandler}
//           icon={faTruck}
//         />
//         {manufacturerInputHasError && (
//           <p className={`${styles.alert} text-danger text-center`}>
//             Manufacturer is invalid!
//           </p>
//         )}
//         <InputComponent
//           inputTextClass="mt-3 ms-4"
//           name="productType"
//           placeholder="Product Type"
//           type="text"
//           formControlClass="mt-3 me-4"
//           value={productType}
//           onChange={productTypeChangeHandler}
//           onBlur={productTypeBlurHandler}
//           icon={faT}
//         />
//         {productTypeInputHasError && (
//           <p className={`${styles.alert} text-danger text-center`}>
//             Product Type is invalid!
//           </p>
//         )}
//         <InputComponent
//           inputTextClass="mt-3 ms-4"
//           name="productGroup"
//           placeholder="Product Group"
//           type="text"
//           formControlClass="mt-3 me-4"
//           value={productGroup}
//           onChange={productGroupChangeHandler}
//           onBlur={productGroupBlurHandler}
//           icon={faUserGroup}
//         />
//         {productGroupInputHasError && (
//           <p className={`${styles.alert} text-danger text-center`}>
//             Product Group is invalid!
//           </p>
//         )}
//         <InputComponent
//           inputTextClass="mb-5 mt-3 ms-4"
//           name="price"
//           placeholder="Price (ILS)"
//           type="text"
//           formControlClass="mb-5 mt-3 me-4"
//           value={price}
//           onChange={priceChangeHandler}
//           onBlur={priceBlurHandler}
//           icon={faShekelSign}
//         />
//         {priceInputHasError && (
//           <p className={`${styles.alert} text-danger text-center`}>
//             Price is invalid!
//           </p>
//         )}
//       </Modal.Body>
//       <Modal.Footer>
//         <Button variant="secondary" onClick={props.onClose}>
//           Close
//         </Button>
//         <Button className={styles.saveButton} onClick={addNewProductHandler}>
//           Save
//         </Button>
//       </Modal.Footer>
//     </Modal>
//   );
// };

// export default AddProduct;
