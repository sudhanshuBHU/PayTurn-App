import './App.css';
import './style.css';
import SignUp from './Components/SignUp';
import LogIn from './Components/LogIn';
import React from 'react';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import './index.css';
import './style.css';
import NavbarHead from './Components/NavbarHead';
import { Provider } from 'react-redux';
import { store } from './Redux/Store';
import Dashboard from './Components/Dashboard';
import SectionContainer from './Components/SectionContainer';
import Individual from './Components/Individual';
import Footer from './Components/Footer';
import TermAndConditions from './Components/utils/TermsAndConditions';
import PrivacyAndPolicies from './Components/utils/PrivacyAndPolicies';
import AdminPanel from './Components/Admin/AdminPanel';

function App() {
  const [isAuth, setIsAuth] = React.useState(false);
  const navigate = useNavigate();

  React.useEffect(() => {
    if (localStorage.getItem('payTurnIsAuth') === 'true') {
      setIsAuth(true);
      // navigate('/dashboard');
    } else {
      setIsAuth(false);
    }

  }, [isAuth, navigate]);

  return (
    <>
      <Provider store={store}>
        <NavbarHead />
        {/* <AdminPanel/> */}
        <Routes>
          <Route path="/" element={isAuth ? <Navigate to='/dashboard' /> : <SectionContainer />} />
          <Route path='/login' element={isAuth ? <Navigate to='/dashboard' /> : <LogIn />} />
          <Route path='/signup' element={isAuth ? <Navigate to='/dashboard' /> : <SignUp />} />
          <Route path='/dashboard' element={isAuth ? <Dashboard /> : <Navigate to='/login' />} />
          <Route path='/lend/individual' element={isAuth ? <Individual /> : <Navigate to={'/login'} />} />
          <Route path='/terms' element={<TermAndConditions />} />
          <Route path='/privacy' element={<PrivacyAndPolicies />} />
          <Route path='/admin' element={isAuth && localStorage.getItem('payTurnRole') === 'admin'? <AdminPanel /> : <Navigate to='/login' />} />
          <Route path='*' element={<Navigate to='/' />} />
        </Routes>
        <Footer />
      </Provider>
    </>
  );
}

export default App;
