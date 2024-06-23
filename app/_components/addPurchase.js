import Modal from "./modal";
import Form from "./form";
import { addPurchase } from "../actions";

const AddPurchase = ({ isOpen, onClose, onAdd, products, customerId }) => {
  const handleAddPurchase = (formaData) => {
    formaData.append("customerId", customerId);
    const [product] = products.filter(
      (product) => product.productId.productName == formaData.get("products")
    );
    formaData.append("productId", product.productId._id);

    addPurchase(formaData);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} heading="Add Purchase">
      <form
        action={handleAddPurchase}
        className="flex flex-col justify-center items-center"
      >
        <label className="mt-4" htmlFor="products">
          Select The Purchase
        </label>
        <select className="mt-4" name="products" id="products">
          {products.map((product) => {
            return (
              <option key={product._id} value={product.productId.productName}>
                {product.productId.productName}
              </option>
            );
          })}
        </select>
        <label className="mt-4" htmlFor="quantity">
          Quantity
        </label>
        <input
          id="quantity"
          className="mt-4 text-center text-gray-700 rounded-md bg-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          type="number"
          name="quantity"
        />
        <button
          type="submit"
          className="bg-red-300 rounded-md px-3 py-2 mt-5 mb-5"
        >
          Add
        </button>
      </form>
    </Modal>
  );
};

export default AddPurchase;
