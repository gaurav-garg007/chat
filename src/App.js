import React, { lazy } from 'react'
import {Route, Routes } from 'react-router-dom';
import './App.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify';
//context, loader and theme
import AuthContext from './Context/AuthContext';
const Login = lazy(() => import('./pages/Auth/Login/Login'))
const Register = lazy(()=> import('./pages/Auth/SignUp/Register'))
const ResetPassword = lazy(()=> import('./pages/Auth/ResetPassword'))
const Forgot = lazy(()=> import('./pages/Auth/Forgot')) 
const Profile = lazy(()=> import('./pages/Profile/Index'))
const Dashboard = lazy(()=> import('./pages/Dashboard/Index'))
function App() {
  return (
    <>
      <AuthContext>
        <Routes>
            <Route path='' element={<Login />} />
            <Route path='login' element={<Login />} />
            <Route path='register' element={<Register/>}/>
            <Route path='reset-password' element={<ResetPassword/>}/>
            <Route path='forgot-password' element={<Forgot/>}/>
            <Route path='profile' element={<Profile />} />
            <Route path='dashboard' element={<Dashboard />} />
        </Routes >
      </AuthContext >
      <ToastContainer />
    </>
  );
}

export default App;