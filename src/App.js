import LoginForm from "./components/Login/LoginForm";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import HomePage from "./components/HomePage/HomePage";
import ProfilePage from "./components/ProfilePage/ProfilePage";
import DonatePage from "./components/DonatePage/DonatePage";
import AppointmentModal from "./components/Modals/AppointmentModal/AppointmentModal";

function App() {
  return (
    <div className="App">
      {/* <Navbar /> */}
      {/* <LoginForm /> */}
      {/* <HomePage /> */}
      {/* <ProfilePage /> */}
      <DonatePage />
      {/* <AppointmentModal /> */}
    </div>
  );
}

export default App;
