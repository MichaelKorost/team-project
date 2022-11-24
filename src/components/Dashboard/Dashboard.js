import Box from "@mui/material/Box";
import DashboardSidebar from "../DashboardSidebar/DashboardSidebar";

function Dashboard() {
	return (
		<Box sx={{ display: 'flex', flexDirection: {xs: "column", sm: "row"}}}>
			<Box sx={{display: {xs: "none", sm: "contents"}}}>
				<DashboardSidebar anchor={"left"} />
			</Box>
			<Box sx={{display: {xs: "contents", sm: "none"}}}>
				<DashboardSidebar anchor={"top"} />
			</Box>
			<div>
				<div>dashboard content goes here</div>
			</div>
		</Box>
	);
}

export default Dashboard;