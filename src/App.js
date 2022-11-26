import "./App.css";
import LoginForm from "./components/Login/LoginForm";
import HomePage from "./components/HomePage/HomePage";
import ProfilePage from "./components/ProfilePage/ProfilePage";
import DonatePage from "./components/DonatePage/DonatePage";
import Dashboard from "./components/Dashboard/Dashboard";
import PageNotFound from "./components/PageNotFound/PageNotFound";
import { Navigate, Route, Routes } from "react-router-dom";
import RequireAuth from "./components/RequireAuth/RequireAuth";
import LoadingPage from "./components/LoadingPage/LoadingPage";
import { useContext } from "react";
import { AuthContext } from "./AuthContext";

function App() {
  // this is handled in RequireAuth component...
  const { user } = useContext(AuthContext);
  // const RequireAuth = ({ children }) => {
  //   return user ? children : <Navigate to='/login' />;
  //     checking for user takes time
  // suddenly works
  // };

  return (
    <div className="App">
      <Routes>
        <Route
          path="/login"
          element={user ? <Navigate to="/" /> : <LoginForm />}
        />
        <Route path="/" element={<RequireAuth>{<HomePage />}</RequireAuth>} />
        <Route
          path="/profile"
          element={
            <RequireAuth>
              <ProfilePage />
            </RequireAuth>
          }
        />
        <Route
          path="/donate"
          element={
            <RequireAuth>
              <DonatePage />
            </RequireAuth>
          }
        />
        <Route
          path="/admin"
          element={
            <RequireAuth>
              <Dashboard />
            </RequireAuth>
          }
        />
        {/* <Route path='*' element={<PageNotFound />} /> */}
        <Route path="*" element={<LoadingPage />} />
      </Routes>

      {/* <Routes>
        <Route path='/login' element={<LoginForm />} />
        <Route path='/' element={<HomePage />} />
        <Route path='/profile' element={<ProfilePage />} />
        <Route path='/donate' element={<DonatePage />} />
        <Route path='/admin' element={<Dashboard />} />
        <Route path='*' element={<PageNotFound />} />
      </Routes> */}
    </div>
  );
}

export default App;
