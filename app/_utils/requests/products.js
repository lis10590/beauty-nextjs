import axios from "axios";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;
//addition of new product
export const addNewProduct = async (product) => {
  try {
    const res = await axios.post(`${apiUrl}/api/products/newProduct`, product);
    return res.data;
  } catch (err) {
    console.error(err);
  }
};

//display all products
export const getProducts = async () => {
  try {
    const res = await axios.get(`${apiUrl}/api/products/getProducts`);

    return res.data;
  } catch (err) {
    console.error(err);
  }
};
//delete product
export const deleteProduct = async (productId) => {
  try {
    const res = await axios.delete(`${apiUrl}/api/products/deleteProduct`, {
      data: { productId },
    });
    return res.data;
  } catch (err) {
    console.error(err);
  }
};
