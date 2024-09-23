import { Route, Routes, BrowserRouter} from 'react-router-dom';
import LoginForm from './LoginForm';
import DashBoard from './DashBoard';
// import ResizableWindow from './PopUpEdit';

import EmployeeTaskDashboard from './components/EmployeeTaskDashboard';
import Admin from './components/Admin';

function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route exact path="/login" element={<LoginForm />} />
      {/* <Route exact path='/EditEmployeeTask' element={<ResizableWindow />} /> */}
    
      <Route path="/admin" element={<Admin />} />
      <Route path="/" element={<EmployeeTaskDashboard />} />

    </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
