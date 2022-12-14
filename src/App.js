import "./App.css";
import LoginForm from "./components/Login/LoginForm";
import HomePage from "./components/HomePage/HomePage";
import ProfilePage from "./components/ProfilePage/ProfilePage";
import DonatePage from "./components/DonatePage/DonatePage";
import Dashboard from "./components/Dashboard/Dashboard";
import PageNotFound from "./components/PageNotFound/PageNotFound";
import { Route, Routes } from "react-router-dom";
import RequireAuth from "./components/RequireAuth/RequireAuth";
import LoggedInWrapper from "./components/LoggedWrapper/LoggedWrapper";
import LoadingPage from "./components/LoadingPage/LoadingPage";
import RequireProfile from "./components/RequireAuth/requireProfile";
import Users from "./components/Users/Users";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route
          path="/login"
          element={
            <LoggedInWrapper>
              <LoginForm />
            </LoggedInWrapper>
          }
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
              <RequireProfile>
                <DonatePage />
              </RequireProfile>
            </RequireAuth>
          }
        />
        <Route path="/admin">
          <Route
            index
            element={
              <RequireAuth>
                <Dashboard />
              </RequireAuth>
            }
          />

          <Route
            path="/admin/users"
            element={
              <RequireAuth>
                <Users />
              </RequireAuth>
            }
          />
        </Route>

        <Route path="*" element={<PageNotFound />} />
        {/* <Route path='*' element={<LoadingPage />} /> */}
      </Routes>
    </div>
  );
}

export default App;
