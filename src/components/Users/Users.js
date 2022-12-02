import Navbar from "../Navbar/Navbar";
import { Box } from "@mui/system";
import "./Users.css";
import DashboardSidebar from "../DashboardSidebar/DashboardSidebar";
import UsersTable from "../UsersTable/UsersTable";

const Users = () => {
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
        <div className="users__content">
          <div className="table-container">
            <h1 className="table__title">Table of all registered users</h1>
            <UsersTable />
          </div>
        </div>
      </Box>
    </>
  );
};

export default Users;
