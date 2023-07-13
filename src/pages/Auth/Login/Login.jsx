import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from "formik";
import '../AuthCss/Login.css'
import * as Yup from "yup";
import { useAuthContextHook } from "../../../Context/AuthContext";
import { FaEye } from 'react-icons/fa'
import { FaEyeSlash } from 'react-icons/fa'
import styled from 'styled-components';
const Container = styled.div`
  background: white;
  border-radius: 14px;
  max-width: 430px;
`
const Label = styled.label`
font-family: Poppins;
font-style: normal;
font-weight: 500;
font-size: 15px;
margin-bottom: 5px;
`
const Span = styled.span`
  margin-left: -35px;
`
const P = styled.p`
font-size: 13px;
font-weight: 500;
`
export default function Login() {
  const [isclicked, setisclicked] = useState(false);
  const [seePassword, SetseePassword] = useState(false);
  const { handleLogin, IsLogedIn} = useAuthContextHook();
  const navigate = useNavigate();

  useEffect(() => {
    if (IsLogedIn) {
      navigate('/profile')
    }
  }, [IsLogedIn, navigate])

  const handleSignIn = async (values) => {
    localStorage.setItem('email', values.email);
    localStorage.setItem('password', values.password);
    setisclicked(true);
    await handleLogin(values.email, values.password);
    setisclicked(false);
  }

  const formik = useFormik({
    initialValues: { email: "", password: "", otp: "" },
    validationSchema: Yup.object({
      email: Yup.string().required("Required"),
      password: Yup.string()
        .min(8).max(16)
        .matches(/[A-Z]/, 'atleast 1 uppercase letter required')
        .matches(/[a-z]/, 'atleast 1 lowercase letter required')
        .matches(/[1-9]/, 'atleast 1 number required')
        .matches(/[!@#$%^&*]/, 'atleast 1 special character required')
        .required('Required'),
    }),
    onSubmit: (values) => {
      handleSignIn(values)
    }
  });

  return (
    <div className="LoginBg w-full row m-0 d-flex justify-content-center align-items-center">
      <div className="d-flex align-items-center justify-content-center">
        <Container className="card col-12 pt-4 col-md-6 col-xl-4 px-2">
          <div className='card-head mt-4 d-flex flex-column'>
            <p className="card-heading text-center pt-3 mb-1 fs-2 fw-bolder">Welcome Back</p>
            <P className='text-center px-1'>Lorem ipsum dolor sit amet consectetur adipiscing elit sedol do eiusmod tempor consectur.</P>
          </div>

          <div className="card-body">

            <form onSubmit={formik.handleSubmit}>

              <div className="FormDiv d-flex flex-column">
                <input
                  id="email"
                  placeholder="Email address"
                  type="text"

                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={
                    formik.errors.email && formik.touched.email
                      ? "text-input error px-3 py-2"
                      : "text-input px-3 py-2"
                  }
                />
                <small>
                  {formik.errors.email && formik.touched.email && (
                    <div className="input-feedback text-danger auth-error text-start">{formik.errors.email}</div>
                  )}
                </small>
              </div>
              <div className="FormDiv d-flex m-0 mt-3 flex-column">
                <div className='FormDiv'>
                  <input
                    id="password"
                    placeholder="Password"
                    type={seePassword ? 'text' : 'password'}
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={
                      formik.errors.password && formik.touched.password
                        ? "text-input px-3 py-2 error"
                        : "text-input px-3 py-2"
                    }
                  />
                  {seePassword ? <Span role='button' onClick={() => SetseePassword(false)}><FaEyeSlash /></Span> :
                    <Span type='button' onClick={() => SetseePassword(true)}><FaEye /></Span>}
                </div>
                {formik.errors.password && formik.touched.password && (
                  <div className="input-feedback text-danger text-start auth-error">{formik.errors.password}</div>
                )}
              </div>
              <div>
                <button className='Button d-flex justify-content-center gap-2 align-items-center' type="submit" disabled={isclicked}>
                  Login
                </button>
              </div>
              <div className='my-3 d-flex justify-content-between align-items-center'>
                <div className='d-flex text-start align-items-center gap-1'>
                  <input type='checkbox' onChange={() => {
                    localStorage.setItem('emailID', formik.values.email)
                    localStorage.setItem('password', formik.values.password)
                  }} />
                  <P className='mb-0'>Remember Account</P>
                </div>
                <P as={Link} className='Forgot text-end' to='/forgot-password'>Forgot your password?</P>
              </div>
              <div className='pt-3 pb-2 text-center'>
                <P>Don’t have an account? <Link to='/register'>Create an account</Link></P>
              </div>
            </form>

          </div>
        </Container>
      </div>
    </div>
  );
}