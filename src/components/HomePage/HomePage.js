import Navbar from "../Navbar/Navbar";
import "./HomePage.css";

const HomePage = () => {
  return (
    <>
      <Navbar />
      <div className="homepage-page">
        <div className="about">
          <h1 className="about__title">About us</h1>
          <p className="about__desc">
            <span className="about__desc-bold">Blood Buddy</span> is an App that
            makes donating blood effortless. <br /> Pick a date and we'll handle
            the rest
          </p>
        </div>

        <div className="button-container">
          <button className="donate-button">I want to donate!</button>
        </div>
      </div>
    </>
  );
};

export default HomePage;
