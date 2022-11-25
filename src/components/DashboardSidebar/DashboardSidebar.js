import {useNavigate, useLocation} from "react-router-dom";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { AddCardOutlined, SubjectOutlined } from "@mui/icons-material";
import { Box } from "@mui/material";
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import DashboardIcon from '@mui/icons-material/Dashboard';

function DashboardSidebar({sx, anchor}) {

	const drawerDimensions = {width: {sm: "100%", md: 250}, height: {md: "100vh"}};

	const navigate = useNavigate();
	const location = useLocation();

	const menuItems = [
		{
			text: "Admin Dashboard",
			to: "/admin",
			icon: DashboardIcon
		},
		{
			text: "Manage Users",
			to: "/admin/users",
			icon: SupervisedUserCircleIcon
		}
	];

	return (
		<Box variant="permanent" anchor={anchor} sx={{
			backgroundColor: "background.default",
			borderStyle: "solid",
			borderWidth: {xs: "0 0 1px 0", md: "0 1px 0 0"},
			borderColor: "#ccc",
			height: "100%",
			...sx,
			...drawerDimensions,
			flexShrink: 0,
			'& .MuiDrawer-paper': {
				...drawerDimensions,
				boxSizing: 'border-box'
			}
		}}>
			<List sx={{p: 0}}>
				{menuItems.map(({text, to, icon: Icon}, i) => (
					<ListItem button sx={{backgroundImage: location.pathname === to ? {xs: "linear-gradient(to right, #ff475688 10px, #ff475600 10px), linear-gradient(to left, #ff475622 30%, #ff475600 80%)", md: "linear-gradient(to right, #ff475688 10px, #ff475600 10px)"} : ""}} onClick={() => to && navigate(to)} key={i}>
						<ListItemIcon><Icon color="primary" /></ListItemIcon>
						<ListItemText primary={text} />
					</ListItem>
				))}
			</List>
		</Box>
	);
}

export default DashboardSidebar;