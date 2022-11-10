import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Grid from "@mui/material/Grid";
import NavbarButtons from "../NavbarButtons/NavbarButtons";
import "./Navbar.css";

function Navbar() {
  return (
    <Router>
      <Box>
        <AppBar position="static">
          <Grid container direction={"row"} justifyContent="space-between" alignItems="center">
            <img src="" alt="Blood Buddy" />
            <Routes>
              <Route path="/" element={<NavbarButtons />} />
              <Route path="/:urlPath" element={<NavbarButtons />} />
            </Routes>
          </Grid>
        </AppBar>
      </Box>
    </Router>
  );
}

export default Navbar;