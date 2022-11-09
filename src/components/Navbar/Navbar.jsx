import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";

function Navbar() {

  // temporary consts START, get it using context
  const userIsLoggedIn = true;
  const userIsAdmin = true;
  // temporary consts END



  return (
    <nav className="navbar">
      <div className="navbar__logo">
        [Logo]
      </div>
      <menu className="navbar__buttons">
        <Router>
          <Routes>
            <Route path="/" element={
              <>
                {userIsAdmin && <Link to="/admin">Admin page</Link>}
                <Link to="/">Homepage</Link>
                <Link to="/profile">Profile</Link>
                <Link to="/logout">LogOut</Link>
              </>
            } />
            <Route path="/donate" element={
              <>
                <Link to="/">Homepage</Link>
                <Link to="/profile">Profile</Link>
                <Link to="/logout">LogOut</Link>
              </>
            } />
            <Route path="/profile" element={
              <>
                <Link to="/">Homepage</Link>
                <Link to="/logout">LogOut</Link>
              </>
            } />
            <Route path="/admin" element={
              <>
                <Link to="/admin">Admin page</Link>
                <Link to="/">Homepage</Link>
                <Link to="/profile">Profile</Link>
                <Link to="/logout">LogOut</Link>
              </>
            } />
            <Route path="/admin/users" element={
              <>
                <Link to="/admin">Admin page</Link>
                <Link to="/">Homepage</Link>
                <Link to="/profile">Profile</Link>
                <Link to="/logout">LogOut</Link>
              </>
            } />
          </Routes>
        </Router>
      </menu>
    </nav>
  );
}

export default Navbar;