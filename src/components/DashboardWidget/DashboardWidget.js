import { useEffect, useState } from "react";
import "./DashboardWidget.css";
import PeopleIcon from "@mui/icons-material/People";
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { collection, db } from "../../firebase/firebaseConfig";
import { getDocs, onSnapshot, query, where } from "firebase/firestore";
import { Link } from "react-router-dom";

const DashboardWidget = ({ type }) => {
  const [amount, setAmount] = useState(null);
  const [diff, setDiff] = useState(null);
  const [appointments, setAppointments] = useState(null);
  let data;

  switch (type) {
    case "user":
      data = {
        title: "Monthly registers",
        link: "see all users",
        query: "users", //collection
        icon: <PeopleIcon />,
        amount: amount,
        diff: diff,
      };
      break;
    case "appointments":
      data = {
        title: "appointments set", //appointments set
        link: "see all users",
        query: "users",
        icon: <VolunteerActivismIcon />,
        amount: appointments,
      };
    default:
      break;
  }

  useEffect(() => {
    const fetchData = async () => {
      const today = new Date();
      const lastMonth = new Date(new Date().setMonth(today.getMonth() - 1));
      const prevMonth = new Date(new Date().setMonth(today.getMonth() - 2));

      const lastMonthQuery = query(
        collection(db, data.query),
        where("timeStamp", "<=", today),
        where("timeStamp", ">", lastMonth)
      );

      const prevMonthQuery = query(
        collection(db, data.query),
        where("timeStamp", "<=", lastMonth),
        where("timeStamp", ">", prevMonth)
      );

      const lastMonthData = await getDocs(lastMonthQuery);
      const prevMonthData = await getDocs(prevMonthQuery);

      setAmount(lastMonthData.docs.length);
      setDiff(
        ((lastMonthData.docs.length - prevMonthData.docs.length) /
          prevMonthData.docs.length) *
          100
      );
    };
    fetchData();
  }, []);

  //collection ref
  const colRef = collection(db, "users");
  const q = query(colRef, where("appointment", "!=", null));

  onSnapshot(q, (snapshot) => {
    let users = [];
    snapshot.docs.forEach((doc) => {
      users.push({ ...doc.data() });
    });
    setAppointments(users.length);
    // console.log(users);
  });

  return (
    <div className="widget">
      <div className="left">
        <span className="widget__title">{data.title}</span>
        <span className="widget__amount">{data.amount}</span>
        <Link className="widget__link" to={"/admin/users"}>
          {data.link}
        </Link>
      </div>
      <div className="right">
        <div
          className={`widget__percent ${
            data?.diff < 0 ? "negative" : "positive"
          } ${data?.diff ? "" : "hide"}`}
        >
          {data?.diff < 0 ? <KeyboardArrowDownIcon /> : <KeyboardArrowUpIcon />}
          {data?.diff?.toFixed(0)} %
        </div>
        {data.icon}
      </div>
    </div>
  );
};

export default DashboardWidget;
