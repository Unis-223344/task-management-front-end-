import { Route, Routes, BrowserRouter} from 'react-router-dom';
import LoginForm from './LoginForm';
import DashBoard from './DashBoard';
// import ResizableWindow from './PopUpEdit';

import EmployeeTaskDashboard from './components/EmployeeTaskDashboard';
import AdminTaskDashboardWrapper from './components/Admin';
import SuperAdminLogin from './AdminLoginPage';

function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
    <Route exact path="/Admin-Login" element={<SuperAdminLogin />} />
      <Route exact path="/login" element={<LoginForm />} />
      {/* <Route exact path='/EditEmployeeTask' element={<ResizableWindow />} /> */}
    
      <Route path="/admin" element={<AdminTaskDashboardWrapper />} />
      <Route path="/" element={<EmployeeTaskDashboard />} />

    </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
