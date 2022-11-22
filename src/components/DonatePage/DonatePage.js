import "./DonatePage.css";
import ResponsiveAppBar from "../Navbar/Navbar";

const DonatePage = () => {
  return (
    <>
      <ResponsiveAppBar />
      <div className="donate-page-page">
        <section className="donate-left-pane"></section>
        <section className="donate-right-pane"></section>
      </div>
    </>
  );
};

export default DonatePage;
