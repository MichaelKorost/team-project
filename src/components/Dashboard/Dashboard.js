import "./Dashboard.css";
import Box from "@mui/material/Box";
import DashboardSidebar from "../DashboardSidebar/DashboardSidebar";
import Navbar from "../Navbar/Navbar";
import DashboardWidget from "../DashboardWidget/DashboardWidget";
import DashboardChart from "../DashboardChart/DashboardChart";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
import { useEffect, useState } from "react";

function Dashboard() {
  return (
    <>
      <Navbar />
      <Box
        sx={{
          display: "flex",
          maxHeight: "calc(100vh - 68.5px)",

          flexDirection: { xs: "column", md: "row" },
        }}
      >
        <Box sx={{ display: { xs: "none", md: "contents" } }}>
          <DashboardSidebar className={"dashboard-left"} anchor={"left"} />
        </Box>
        <Box sx={{ display: { xs: "contents", md: "none" } }}>
          <DashboardSidebar anchor={"top"} />
        </Box>
        <div className="dashboard__content">
          <div className="dashboard__widgets">
            <DashboardWidget type={"user"} />
            <DashboardWidget type={"appointments"} />
          </div>
          <div className="dashboard__chart">
            <DashboardChart />
          </div>
        </div>
      </Box>
    </>
  );
}

export default Dashboard;
