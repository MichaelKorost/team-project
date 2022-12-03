import {Link} from "react-router-dom";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";


function NavbarButtons({setMenuState}) {
  const links = [
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
  return (
    <List onClick={() => setMenuState(false)}>
      <ListItem disablePadding sx={{backgroundColor: "#ccc", color: "#666"}}>
        <ListItemButton disablePadding>
          <ListItemText primary={"Close"} />
        </ListItemButton>
      </ListItem>
      {
        links.map(({text, to}, i) => {
          return (
            <ListItem disablePadding key={i}>
              <ListItemButton disablePadding component={Link} to={to}>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          );
        })
      }
    </List>
  );
}
export default NavbarButtons;