import {useNavigate, useLocation} from "react-router-dom";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { AddCardOutlined, SubjectOutlined } from "@mui/icons-material";
import { Box } from "@mui/material";



function DashboardSidebar({sx, anchor}) {

	// const drawerDimensions = {width: {xs: "100%", sm: 300}, position: {xs: "initial", sm: "fixed"}, height: {sm: "100%"}};
	const drawerDimensions = {width: {sm: "100%", md: 250}, height: {md: "100vh"}};

	const navigate = useNavigate();
	const location = useLocation();

	const menuItems = [
		{
			text: "Admin Dashboard",
			to: "/admin",
			icon: SubjectOutlined
		},
		{
			text: "Manage Users",
			to: "/admin/users",
			icon: AddCardOutlined
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
			<List>
				{menuItems.map(({text, to, icon: Icon}, i) => (
					<ListItem button className={location.pathname === to ? "active" : ""} onClick={() => to && navigate(to)} key={i}>
						<ListItemIcon><Icon color="secondary" /></ListItemIcon>
						<ListItemText primary={text} />
					</ListItem>
				))}
			</List>
		</Box>
	);
}

export default DashboardSidebar;