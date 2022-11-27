import './Dashboard.css';
import Box from '@mui/material/Box';
import DashboardSidebar from '../DashboardSidebar/DashboardSidebar';
import Navbar from '../Navbar/Navbar';

function Dashboard() {
  return (
    <>
      <Navbar />
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' } }}>
        <Box sx={{ display: { xs: 'none', md: 'contents' } }}>
          <DashboardSidebar className={'dashboard-left'} anchor={'left'} />
        </Box>
        <Box sx={{ display: { xs: 'contents', md: 'none' } }}>
          <DashboardSidebar anchor={'top'} />
        </Box>
        <div>
          <div>dashboard content goes here</div>
        </div>
      </Box>
    </>
  );
}

export default Dashboard;
