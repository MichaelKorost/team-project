import "./DashboardWidget.css";
const DashboardWidget = () => {
  let data;

  return (
    <div className="widget">
      <div className="left">
        <span className="widget__title">Registered Users</span>
        <span className="widget__amount">8</span>
        <span className="widget__link">see users link</span>
      </div>
      <div className="right">
        <div className="widget__percent">400</div>
        {"icon"}
      </div>
    </div>
  );
};

export default DashboardWidget;
