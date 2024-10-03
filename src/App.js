import { Route, Routes, BrowserRouter} from 'react-router-dom';
import LoginForm from './LoginForm';
import AllTasksDashboard from './AdminAllTasksDashboard';
import EmployeeTaskDashboard from './components/EmployeeTaskDashboard';
import AdminTaskDashboardWrapper from './components/Admin';
import SuperAdminLogin from './AdminLoginPage';
import TaskManagementPage from './HomePage';

function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
    <Route exact path="/" element={<TaskManagementPage />} />
    <Route exact path="/Admin-Login" element={<SuperAdminLogin />} />
      <Route exact path="/login" element={<LoginForm />} />
      {/* <Route exact path='/EditEmployeeTask' element={<ResizableWindow />} /> */}
      <Route path="/admin-all-tasks" element={<AllTasksDashboard />} />
      <Route path="/admin" element={<AdminTaskDashboardWrapper />} />
      <Route path="/employee" element={<EmployeeTaskDashboard />} />

    </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
