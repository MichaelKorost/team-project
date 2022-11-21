import {useState} from "react";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import {BrowserRouter as Router, Link} from "react-router-dom";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Drawer from "@mui/material/Drawer";

  const pages = [
    {
      text: "Admin Dashboard",
      to: "/admin"
    },
    {
      text: "Find Donors",
      to: "/donors"
    },
    {
      text: "Homepage",
      to: "/"
    },
    {
      text: "Profile",
      to: "/profile"
    },
    {
      text: "LogOut",
      to: "/logout"
    }
  ];

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [menuState, setMenuState] = useState(false);

  return (
	<Router>
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>

		  {/* mobile */}
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton size="large" onClick={() => setMenuState(true)} color="inherit">
              <MenuIcon />
            </IconButton>
			<Drawer
				anchor="top"
				open={menuState}
				onClose={() => setMenuState(false)}
			>
				<List onClick={() => setMenuState(false)}>
				<ListItem disablePadding sx={{backgroundColor: "#ccc", color: "#666"}}>
					<ListItemButton>
					<ListItemText primary={"Cloaaaaaaaase"} />
					</ListItemButton>
				</ListItem>
				{
					pages.map(({text, to}, i) => {
					return (
						<ListItem disablePadding key={i}>
						<ListItemButton component={Link} to={to}>
							<ListItemText primary={text} />
						</ListItemButton>
						</ListItem>
					);
					})
				}
				</List>
			</Drawer>
          </Box>
          <Typography sx={{ display: { md: 'none', xs: 'flex' }, mr: 1, p: 1, backgroundColor: "#fff", borderRadius: 2, color: "primary.main", fontWeight: "bold"}}>
			BloodBuddy
		  </Typography>

		  {/* desktop */}
          <Typography sx={{ display: { xs: 'none', md: 'flex' }, mr: 1, p: 1, backgroundColor: "#fff", borderRadius: 2, color: "primary.main", fontWeight: "bold"}}>
			BloodBuddy
		  </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map(({text, to}, index) => (
              <Button key={index} sx={{ my: 2, color: 'white', display: 'block' }} component={Link} to={to}>
                {text}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
	</Router>
  );
}
export default ResponsiveAppBar;