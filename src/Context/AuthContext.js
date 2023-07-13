import React, { createContext, useContext, useState } from 'react'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify'
import { API_URLs } from '../Utils/ApiUrls';
import { useCallback } from 'react';

export const AuthContextHook = createContext();

export const useAuthContextHook = () => {
    return useContext(AuthContextHook);
}

export default function AuthContext({ children }) {
    const navigate = useNavigate();

    const [IsLogedIn, setIsLogedIn] = useState(false);
    const [userDetails, setUserDetails] = useState({});
    const [loading, setLoading] = useState(true);
    const [isAuth, setisAuth] = useState(true);

    const [apiLoader, setApiLoader] = useState(false);

    const changeIsOnLogin = (data) => {
        setIsLogedIn(data);
    }

    //logout Api
    // const handleLogout = useCallback(async () => {
    //     setApiLoader(true)
    //     try {

    //         let res1 = await axios.delete(API_URLs.FcmToken, {
    //             headers: {
    //                 "Authorization": `Bearer ${localStorage.getItem('jwt')}`
    //             },
    //             data: {
    //                 fcmDeviceToken: localStorage.getItem('fcmToken')
    //             }
    //         })

    //         console.log(res1, "res111");

    //         let res = await axios.post(API_URLs.logout, {
    //             refreshToken: localStorage.getItem('jwtOut')
    //         })
    //         console.log(res);
    //         setIsLogedIn(false);
    //         changeIsOnLogin(false);
    //         localStorage.removeItem('jwt');
    //         localStorage.removeItem('otpToken');
    //         localStorage.removeItem('jwtOut');
    //         localStorage.removeItem('userToken');
    //         localStorage.removeItem('userName');
    //         localStorage.removeItem('email');
    //         localStorage.removeItem('password');
    //         localStorage.removeItem('fcmToken')
    //         toast.success('User has been Logged Out Successfully')
    //         setApiLoader(false)
    //         setisAuth(false);
    //         navigate('/login')
    //         // navigate('/home')
    //     } catch (error) {
    //         setApiLoader(false)
    //         console.log(error);
    //     }

    // }, [navigate])

    const handleSignUp = async (email, password, name) => {
        try {
            let res = await axios.post(API_URLs.register, {
                email: email,
                password: password,
                name: name
            })
                console.log(res)
                // toast.success("Register Successfully!")
                navigate('/login');
        } catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.message ? error.response?.data?.message : "Some Error occured")
        }
    }
    
    const handleLogin = async (email, password) => {
        try {
            let res = await axios.post(API_URLs.login, {
                email: email,
                password: password,
            })
                console.log(res)
                localStorage.setItem('jwt', res.data?.token);
                toast.success("Login Successfully!")
                navigate('/dashboard');
        } catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.message ? error.response?.data?.message : "Some Error occured")
        }
    }

    const handleForgotPassword = async (email) => {
        try {
            let res = await axios.post(API_URLs.forgot, {
                email: email
            })
            console.log(res);
            toast.success("Please check your mail to Reset password")
            navigate('/login');
        } catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.message ? error?.response?.data?.message : "No users found with this email")
        }
    }

    //reset Api
    const handleResetPassword = async (password, token) => {
        try {
            console.log(token);
            let res = await axios.post(API_URLs.reset + '?token=' + token, {
                password: password,
            })
            console.log(res);
            toast.success('Password Changed Successfully!!')
            navigate('/login');
        } catch (error) {
            console.log(error)
            toast.error(error?.response?.data?.message ? error.response.data.message : "Some Error Occured")
        }


    }
    const exportableData = {
        // handleLogout,
        handleSignUp,
        handleLogin,
        handleForgotPassword,
        handleResetPassword,
        changeIsOnLogin,
        IsLogedIn,
        isAuth,
        userDetails,
        loading,
        apiLoader
    }

    return (
        <AuthContextHook.Provider value={{ ...exportableData }} >
            {children}
        </AuthContextHook.Provider>
    )
}