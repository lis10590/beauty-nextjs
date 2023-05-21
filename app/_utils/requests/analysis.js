import axios from "axios";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const revenueByMonth = async () => {
  try {
    const res = await axios.get(`${apiUrl}/api/analysis/revenueByMonth`);

    return res.data;
  } catch (err) {
    console.error(err);
  }
};

export const productSales = async () => {
  try {
    const res = await axios.get(`${apiUrl}/api/analysis/productSales`);

    return res.data;
  } catch (err) {
    console.error(err);
  }
};

export const treatmentsSales = async () => {
  try {
    const res = await axios.get(`${apiUrl}/api/analysis/treatmentsSales`);

    return res.data;
  } catch (err) {
    console.error(err);
  }
};
