import axios from "axios";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;
//addition of new product
export const addNewProduct = async (product) => {
  try {
    const res = await axios.post(`${apiUrl}/api/products/newProduct`, product, {
      headers: { "Cache-Control": "no-store" },
    });
    return res.data;
  } catch (err) {
    console.error(err);
  }
};

//display all products
export const getProducts = async (page) => {
  try {
    const res = await axios.get(
      `${apiUrl}/api/products/getProducts?page=${page}`,
      {
        headers: { "Cache-Control": "no-store" },
      }
    );

    return res.data;
  } catch (err) {
    console.error(err);
  }
};
//delete product
export const deleteProduct = async (productId) => {
  try {
    const res = await axios.delete(
      `${apiUrl}/api/products/deleteProduct?productId=${productId}`,
      {
        headers: { "Cache-Control": "no-store" },
      }
    );
    return res.data;
  } catch (err) {
    console.error(err);
  }
};
