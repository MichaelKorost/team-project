import {Link} from "react-router-dom";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import HomeIcon from '@mui/icons-material/Home';


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
      to: "/",
      icon: HomeIcon
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
    <List sx={{bgcolor: "background.paper"}} onClick={() => setMenuState(false)}>
            <ListItemButton>
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary="Chelsea Otakan" />
        </ListItemButton>
      {
        links.map(({text, to, icon}, i) => {
          const Icon = icon;
          return (
            <ListItem disablePadding key={i}>
              <ListItemButton component={Link} to={to}>
                {
                  icon && <ListItemIcon>
                    <Icon />
                  </ListItemIcon>
                }
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          );
        })
      }
      {/* <ListItem disablePadding>
        <ListItemButton component={Link} to="/admin">
          <ListItemText primary="Admin" />
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding>
        <ListItemButton component={Link} to="/donors">
          <ListItemText primary="Donors" />
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding>
        <ListItemButton component={Link} to="/">
          <ListItemText primary="Homepage" />
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding>
        <ListItemButton component={Link} to="/profile">
          <ListItemText primary="Profile" />
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding>
        <ListItemButton component={Link} to="/logout">
          <ListItemText primary="LogOut" />
        </ListItemButton>
      </ListItem> */}
    </List>
  );
}

export default NavbarButtons;




// import {Link, useParams} from "react-router-dom";
// import ButtonGroup from "@mui/material/ButtonGroup";
// import Button from "@mui/material/Button";
// import "./NavbarButtons.css";

// function NavbarButtons() {

//   // temporary consts START, get it using context
//   const userIsLoggedIn = true;
//   const userIsAdmin = true;
//   const userIsMedicalCenterManager = true;
//   // temporary consts END

//   const params = useParams();
//   const path = params && params.urlPath;
//   const isOnUserPage = path && /^profile(?:\/|\?|#|$)/.test(path);
//   const isOnDonorsPage = path && /^donors(?:\/|\?|#|$)/.test(path);
//   const isOnAdminPage = path && /^admin(?:\/|\?|#|$)/.test(path);

//   return (
//       userIsLoggedIn &&
//       <ButtonGroup variant="contained">
//         {
//           userIsAdmin && !isOnAdminPage && <Link to="/admin">
//             <Button>Admin</Button>
//           </Link>
//         }
//         {
//           (userIsMedicalCenterManager || userIsAdmin) && !isOnDonorsPage && <Link to="/donors">
//             <Button>Find Donors</Button>
//           </Link>
//         }
//         {
//           path && <Link to="/">
//             <Button>Homepage</Button>
//           </Link>
//         }
//         {
//           !isOnUserPage && <Link to="/profile">
//             <Button>Profile</Button>
//           </Link>
//         }
//         <Link to="/logout">
//           <Button>LogOut</Button>
//         </Link>
//       </ButtonGroup>
//   );
// }

// export default NavbarButtons;