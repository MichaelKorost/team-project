import {Link, useParams} from "react-router-dom";
import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@mui/material/Button";
import "./NavbarButtons.css";

function NavbarButtons() {

  // temporary consts START, get it using context
  const userIsLoggedIn = true;
  const userIsAdmin = true;
  // temporary consts END

  const params = useParams();
  const path = params && params.urlPath;
  const isOnUserPage = path && /^profile(?:\/|\?|#|$)/.test(path);
  const isOnAdminPage = path && /^admin(?:\/|\?|#|$)/.test(path);

  return (
      userIsLoggedIn &&
      <ButtonGroup variant="contained">
        {
          userIsAdmin && !isOnAdminPage && <Link to="/admin">
            <Button>Admin</Button>
          </Link>
        }
        {
          path && <Link to="/">
            <Button>Homepage</Button>
          </Link>
        }
        {
          !isOnUserPage && <Link to="/profile">
            <Button>Profile</Button>
          </Link>
        }
        <Link to="/logout">
          <Button>LogOut</Button>
        </Link>
      </ButtonGroup>
  );
}

export default NavbarButtons;