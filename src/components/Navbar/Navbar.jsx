import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Grid from "@mui/material/Grid";
import NavbarButtons from "../NavbarButtons/NavbarButtons";
import "./Navbar.css";

import {useState} from "react";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";



function Navbar() {
  const [menuState, setMenuState] = useState(false);
  return (
    <Router>
      <AppBar position="static">
        <Toolbar>
          <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{mr: 2}}  onClick={() => setMenuState(true)}>
            <MenuIcon />
          </IconButton>
          <Drawer anchor="top" open={menuState} onClose={() => setMenuState(false)}>
            <NavbarButtons setMenuState={setMenuState} />
          </Drawer>
        </Toolbar>
      </AppBar>
      {/* <Box>
        <AppBar position="static">
          <Grid container direction={"row"} justifyContent="space-between" alignItems="center">
            <img src="" alt="Blood Buddy" />
            <Routes>
              <Route path="/" element={<NavbarButtons />} />
              <Route path="/:urlPath" element={<NavbarButtons />} />
            </Routes>
          </Grid>
        </AppBar>
      </Box> */}
    </Router>
  );
}

export default Navbar;