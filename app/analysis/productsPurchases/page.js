"use client";

import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
} from "chart.js";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getProductSales } from "../../_utils/store/analysis";
import { chartData, chartOptions } from "../../_utils/chartFunctions";
import styles from "../../_styles/analysis.module.css";

const ProductsPurchases = () => {
  const dispatch = useDispatch();

  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    PointElement,
    LineElement
  );

  useEffect(() => {
    dispatch(getProductSales());
  }, [dispatch]);

  const productSales = useSelector((state) => state.analysis.purchasedProducts);
  const labels = productSales.map((product) => product.productName);
  const title = "Revenue by Products Purchased";
  const options = chartOptions(title);
  const chartDataObject = productSales.map((item) => item.revenue);
  const data = chartData(labels, chartDataObject);

  return (
    <div className="d-flex flex-column align-items-center mt-3">
      <div className={` ${styles.productsBar}`}>
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default ProductsPurchases;
