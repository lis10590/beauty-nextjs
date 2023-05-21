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
import { getTreatmentsSales } from "../../_utils/store/analysis";
import { chartData, chartOptions } from "../../_utils/chartFunctions";
import styles from "../../_styles/analysis.module.css";

const TreatmentsPurchases = () => {
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
    dispatch(getTreatmentsSales());
  }, [dispatch]);

  const treatmentSales = useSelector(
    (state) => state.analysis.treatmentHistory
  );

  const title = "Revenue by Treatments";
  const labels = treatmentSales.map((treatment) => treatment.treatmentName);
  const options = chartOptions(title);
  const chartDataObject = treatmentSales.map((item) => item.revenue);
  const data = chartData(labels, chartDataObject);

  return (
    <div className="d-flex flex-column align-items-center mt-3">
      <div className={` ${styles.bar}`}>
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default TreatmentsPurchases;
