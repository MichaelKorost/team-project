import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import {
  collection,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { db } from "../../firebase/firebaseConfig";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const DashboardChart = () => {
  const [bloodTypeAmount, setBloodTypeAmount] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      let bloodTypesAmount = [];
      let aPlus = [];
      let aMinus = [];
      let bPlus = [];
      let bMinus = [];
      let oPlus = [];
      let oMinus = [];
      let abPlus = [];
      let abMinus = [];

      const usersQuery = query(
        collection(db, "users"),
        where("bloodType", "!=", null)
      );

      const usersData = await getDocs(usersQuery);
      usersData.docs.forEach((doc) => {
        if (doc.data().bloodType === "A+") {
          aPlus.push({ ...doc.data() });
        } else if (doc.data().bloodType === "A-") {
          aMinus.push({ ...doc.data() });
        } else if (doc.data().bloodType === "B+") {
          bPlus.push({ ...doc.data() });
        } else if (doc.data().bloodType === "B-") {
          bMinus.push({ ...doc.data() });
        } else if (doc.data().bloodType === "O+") {
          oPlus.push({ ...doc.data() });
        } else if (doc.data().bloodType === "O-") {
          oMinus.push({ ...doc.data() });
        } else if (doc.data().bloodType === "AB+") {
          abPlus.push({ ...doc.data() });
        } else if (doc.data().bloodType === "AB-") {
          abMinus.push({ ...doc.data() });
        } else return;
      });
      bloodTypesAmount.push(
        aPlus.length,
        aMinus.length,
        bPlus.length,
        bMinus.length,
        oPlus.length,
        oMinus.length,
        abPlus.length,
        abMinus.length
      );
      setBloodTypeAmount(bloodTypesAmount);
    };
    fetchData();
  }, []);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false, // this is added to remove dataset icon
        position: "top",
      },
      title: {
        display: true,
        color: "#ff4756c9",
        font: {
          size: 24,
        },
        text: `Registered users blood types  `,
      },
    },
  };

  const labels = ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"];

  const data = {
    labels,
    datasets: [
      {
        label: "Amount",
        data: bloodTypeAmount,
        backgroundColor: [
          "#f3a683",
          "#786fa6",
          "#f7d794",
          "#f8a5c2",
          "#778beb",
          "#63cdda",
          "#ea8685",
          "#cf6a87",
        ],
      },
    ],
  };

  return <Bar options={options} data={data} />;
};

export default DashboardChart;
