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
import { getRevenueByMonth } from "../../_utils/store/analysis";
import {
  chartData,
  chartOptions,
  dataArrange,
} from "../../_utils/chartFunctions";
import styles from "../../_styles/analysis.module.css";

const MonthlyRevenue = () => {
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
    dispatch(getRevenueByMonth());
  }, [dispatch]);

  const monthSales = useSelector((state) => state.analysis.monthSales);
  const sortedSales = Array.from(monthSales).sort((a, b) => a.month - b.month);

  const salesData = dataArrange(sortedSales);
  const labels = salesData.map((item) => item.month + item.year);
  const title = "Revenue by Month 2023";
  const options = chartOptions(title);
  const chartDataObject = salesData.map((item) => item.revenue);
  const data = chartData(labels, chartDataObject);

  return (
    <div className="d-flex flex-column align-items-center mt-3">
      <div className={` ${styles.bar}`}>
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default MonthlyRevenue;
