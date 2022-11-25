import "./App.css";
import LoginForm from "./components/Login/LoginForm";
import Navbar from "./components/Navbar/Navbar";
import HomePage from "./components/HomePage/HomePage";
import ProfilePage from "./components/ProfilePage/ProfilePage";
import DonatePage from "./components/DonatePage/DonatePage";
import AppointmentModal from "./components/Modals/AppointmentModal/AppointmentModal";
import DonateDetailsModal from "./components/Modals/DonateDetailsModal/DonateDetailsModal";
import ProfileForm from "./components/profileForm/ProfileForm";
import ProfileEditModal from "./components/Modals/ProfileEditModal/ProfileEditModal";
import Dashboard from "./components/Dashboard/Dashboard";
import PageNotFound from "./components/PageNotFound/PageNotFound";
import { Route, Routes } from "react-router-dom";
import { Home } from "@mui/icons-material";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/donate" element={<DonatePage />} />
        <Route path="/admin" element={<Dashboard />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export default App;
