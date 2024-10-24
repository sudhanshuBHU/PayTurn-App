import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import App from './App';
import Lend from './Components/Lend';
import NavbarHead from './Components/NavbarHead';
import Section1 from './Components/Section1';
import Individual from './Components/Individual';
import { Provider } from 'react-redux';
import { store } from './Redux/Store';
import LogIn from './Components/LogIn';
import SignUp from './Components/SignUp';
// import { PrimeReactProvider } from "primereact/api";
// import "primereact/resources/themes/lara-light-cyan/theme.css";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    // <PrimeReactProvider>
        <BrowserRouter>
            <Provider store={store}>
                <NavbarHead />
                {/* <Section1 /> */}
                <Routes>
                    <Route path="/" element={<App />} />
                    <Route path="/lend" element={<Lend />} />
                    <Route path='/lend/individual' element={<Individual />} />
                    <Route path='/login' element={<LogIn/>} />
                    <Route path='/signup' element={<SignUp/>} />
                    {/* <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} /> */}
                </Routes>
            </Provider>
        </BrowserRouter>
    // </PrimeReactProvider>

);
