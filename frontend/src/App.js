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
        <Routes>
          <Route path="/" element={<SectionContainer />} />
          <Route path='/login' element={isAuth ? <Navigate to='/dashboard' /> : <LogIn />} />
          <Route path='/signup' element={isAuth ? <Navigate to='/dashboard' /> : <SignUp />} />
          <Route path='/dashboard' element={isAuth ? <Dashboard /> : <Navigate to='/login' />} />
          <Route path='/lend/individual' element={isAuth ? <Individual /> : <Navigate to={'/login'}/>} />
          <Route path='*' element={<Navigate to='/' />} />
        </Routes>
      </Provider>
    </>
  );
}

export default App;
