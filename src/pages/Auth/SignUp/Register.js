import React,{useState} from "react";
import { useFormik } from "formik";
import * as Yup from 'yup'
import '../AuthCss/Login.css'
import { Oval } from "react-loader-spinner";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useAuthContextHook } from "../../../Context/AuthContext";
const Container = styled.div`
  background: white;
  border-radius: 14px;
  max-width: 430px;
`
const Span = styled.span`
  margin-left: -35px;
`
const P = styled.p`
font-size: 13px;
font-weight: 500;
`
export default function Register(){
    const {handleSignUp} = useAuthContextHook();
    const[isclicked, setisclicked]=useState(false);
    const formik = useFormik({
        initialValues: {email:'', password:'', username:''},
        validationSchema: Yup.object({
            email: Yup.string().required('Required'),
            password: Yup.string().required('Required'),
            username: Yup.string().required('Required')
        }),
        onSubmit: async (values)=>{
            console.log(values)
            setisclicked(true);
            await handleSignUp(values.email, values.password, values.username);

        }
    })
    return(
        <div className="LoginBg w-full row m-0 d-flex justify-content-center align-items-center">
            <div className="d-flex align-items-center justify-content-center">
                <Container className="card col-12 col-md-6 col-xl-4 px-2">
                    <div className='card-head  d-flex flex-column'>
                        <p className="card-heading text-center pt-3 mb-1 fs-2 fw-bolder">Create Account</p>
                    </div>
                    <div className="card-body">
                        <form onSubmit={formik.handleSubmit}>
                            <div className='FormDiv d-flex m-0 mt-3 flex-column'>
                                <input
                                    className='px-3 py-2'
                                    id='email'
                                    placeholder='Enter your Email ID'
                                    name='email'
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.email}
                                />
                                {formik.touched.email && formik.errors.email ? (<div className='text-start auth-error text-danger'>{formik.errors.email}</div>) : null}
                            </div>
                            <div className='FormDiv d-flex m-0 mt-3 flex-column'>
                                <input
                                    className='px-3 py-2'
                                    id='password'
                                    placeholder='Enter your Password'
                                    name='password'
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.password}
                                />
                                {formik.touched.password && formik.errors.password ? (<div className='text-start auth-error text-danger'>{formik.errors.password}</div>) : null}
                            </div>
                            <div className='FormDiv d-flex m-0 mt-3 flex-column'>
                                <input
                                    className='px-3 py-2'
                                    id='username'
                                    placeholder='Enter username'
                                    name='username'
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.username}
                                />
                                {formik.touched.username && formik.errors.username ? (<div className='text-start auth-error text-danger'>{formik.errors.username}</div>) : null}
                            </div>
                            <div className='d-flex justify-content-center mt-2'>
                                <button className='Button mt-0 d-flex justify-content-center' disabled={isclicked} type='submit'>
                                {
                                    isclicked? 
                                    <Oval
                                        height={15}
                                        width={15}
                                        color="#1476FF"
                                    />:'Register'
                                }
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
                            </div>
                            <div className='pt-3 pb-2 text-center'>
                                <P>Already have an account? <Link to='/login'>Login</Link></P>
                            </div>
                        </form>
                    </div>
                </Container>
            </div>
        </div>
    );
}