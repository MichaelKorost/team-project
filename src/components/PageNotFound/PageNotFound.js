import { Typography } from "@mui/material";
import { Box, Container } from "@mui/system";
import { Link } from "react-router-dom";
import NotFoundV1 from "../../images/404_v1.svg";
import "./PageNotFound.css";
const PageNotFound = () => {
  return (
    <Box sx={{display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh"}}>
      <Box sx={{backgroundColor: "#f1f2f6"}}>
        <Typography variant="h1">
          Page Not Found 🧛
        </Typography>
        <Typography variant="h3">
          Sorry, we couldn't find the page you were looking for :(
        </Typography>
        <Box>
          <img src={NotFoundV1} width="40%" alt="page not found" aria-hidden="true" />
        </Box>
        <Typography variant="h2">
          <Link to="/">Back to homepage</Link>
        </Typography>
      </Box>
    </Box>
  );
};

export default PageNotFound;
