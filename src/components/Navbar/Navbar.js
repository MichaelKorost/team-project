import { useContext, useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import { Link, useNavigate } from "react-router-dom";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Drawer from "@mui/material/Drawer";
import Logo from "../../images/Logo.png";
import { AuthContext } from "../../AuthContext";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
import MissingProfileModal from "../Modals/MissingProfileModal/MissingProfileModal";
import { AppointmentContext } from "../../contexts/AppointmentContext";
// import Typography from '@mui/material/Typography';
// import Menu from '@mui/material/Menu';
// import Avatar from '@mui/material/Avatar';
// import MenuItem from '@mui/material/MenuItem';
// import Tooltip from '@mui/material/Tooltip';
// import AdbIcon from '@mui/icons-material/Adb';
// these are never used

const pages = [
  {
    text: "Home",
    to: "/",
  },
  {
    text: "Admin",
    to: "/admin",
  },

  {
    text: "Profile",
    to: "/profile",
  },
];

function ResponsiveAppBar() {
  // const [anchorElNav, setAnchorElNav] = useState(null);
  // const [anchorElUser, setAnchorElUser] = useState(null);
  // these are never used
  const [menuState, setMenuState] = useState(false);
  const [userInfo, setUserInfo] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user, logout } = useContext(AuthContext);
  const { isEditOpen, setIsEditOpen } = useContext(AppointmentContext);
  const navigate = useNavigate();

  const logoutHandler = async () => {
    await logout();
  };

  const onOpenModal = () => {
    setIsModalOpen(true);
  };

  const onCloseModal = () => {
    setIsModalOpen(false);
  };

  const donateHandler = () => {
    if (userInfo.bloodType) {
      navigate("/donate");
      return;
    }
    onOpenModal();
  };

  useEffect(() => {
    const get = async () => {
      const docRef = doc(db, "users", user.uid);
      const docUser = await getDoc(docRef);
      setUserInfo(docUser.data());
    };
    get();
  }, [isEditOpen]);

  return (
    <>
      <AppBar position="sticky">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            {/* mobile */}
            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                onClick={() => setMenuState(true)}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Drawer
                anchor="top"
                open={menuState}
                onClose={() => setMenuState(false)}
              >
                <List onClick={() => setMenuState(false)}>
                  <ListItem
                    disablePadding
                    sx={{ backgroundColor: "#ccc", color: "#666" }}
                  >
                    <ListItemButton>
                      <ListItemText primary={"Close"} />
                    </ListItemButton>
                  </ListItem>
                  {pages.map(({ text, to }, i) => {
                    return (
                      <ListItem disablePadding key={i}>
                        <ListItemButton component={Link} to={to}>
                          <ListItemText primary={text} />
                        </ListItemButton>
                      </ListItem>
                    );
                  })}
                  <ListItem disablePadding key={"Donate"}>
                    <ListItemButton component={"a"}>
                      <ListItemText
                        primary={"Donate"}
                        onClick={donateHandler}
                      />
                    </ListItemButton>
                  </ListItem>
                  <ListItem disablePadding key={"logout"}>
                    <ListItemButton component={Link} to={"/login"}>
                      <ListItemText
                        primary={"Logout"}
                        onClick={logoutHandler}
                      />
                    </ListItemButton>
                  </ListItem>
                </List>
              </Drawer>
            </Box>

            {/* desktop */}
            <Link to={"/"}>
              <Box
                component="img"
                sx={{
                  height: 40,
                  width: 40,
                  mr: 1,
                  p: 1,
                }}
                alt="BloodyBuddy"
                src={Logo}
              />
            </Link>

            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {pages.map(({ text, to }, index) => (
                <Button
                  key={index}
                  sx={{ my: 2, color: "white", display: "block" }}
                  component={Link}
                  to={to}
                >
                  {text}
                </Button>
              ))}
              <Button
                // key={index}
                sx={{ my: 2, color: "white", display: "block" }}
                onClick={donateHandler}
                component={"a"}
              >
                {"Donate"}
              </Button>
              <Button
                // key={index}
                sx={{ my: 2, color: "white", display: "block" }}
                onClick={logoutHandler}
                component={Link}
                to={"/login"}
              >
                {"Logout"}
              </Button>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <MissingProfileModal
        onOpenModal={onOpenModal}
        onCloseModal={onCloseModal}
        isModalOpen={isModalOpen}
      />
    </>
  );
}
export default ResponsiveAppBar;
