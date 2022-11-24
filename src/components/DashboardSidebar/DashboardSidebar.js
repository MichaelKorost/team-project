import {useNavigate, useLocation} from "react-router-dom";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { AddCardOutlined, SubjectOutlined } from "@mui/icons-material";



function DashboardSidebar({sx, anchor}) {

	const drawerDimensions = {width: {xs: "100%", sm: 300}, position: {xs: "initial", sm: "fixed"}, height: {sm: "100%"}};

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
		<Drawer variant="permanent" anchor={anchor} sx={{
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
		</Drawer>
	);
}

export default DashboardSidebar;