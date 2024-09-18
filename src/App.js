import { Route, Routes, BrowserRouter} from 'react-router-dom';
import LoginForm from './LoginForm';
import DashBoard from './DashBoard';

function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route exact path="/login" element={<LoginForm />} />
      <Route exact path='/' element={<DashBoard />} />
    </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
