import React, { useState } from 'react'
import { useLocation } from 'react-router';
import './AuthCss/Login.css'
import * as Yup from 'yup';
import { useFormik } from 'formik';
import styled from 'styled-components';
import { FaEye } from 'react-icons/fa'
import { FaEyeSlash } from 'react-icons/fa'
import { useAuthContextHook } from "../../Context/AuthContext";
const Heading = styled.h3`
    font-size: 2rem;
    text-align: center;
    font-weight: bolder;
`

const Span = styled.span`
  margin-left: -35px;
`
const initialValues = {
    password: '',
    cpassword: '',
}

const Container = styled.div`
  background: white;
  border-radius: 14px;
  max-width: 500px;
`

export default function ResetPassword() {
    const { handleResetPassword } = useAuthContextHook();
    const [loader, setLoader] = useState(false);
    const [seePassword, SetseePassword] = useState(false);
    const [seeCPassword, SetseeCPassword] = useState(false);

    const location = useLocation();
    let token = location.search?.split('?')[1]?.split('=')[1];

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: Yup.object({
            password: Yup.string().required('Required').min(8).max(16)
                .matches(/[A-Z]/, 'atleast 1 uppercase letter required')
                .matches(/[a-z]/, 'atleast 1 lowercase letter required')
                .matches(/[1-9]/, 'atleast 1 number required')
                .matches(/[!@#$%^&*]/, 'atleast 1 special character required'),
            cpassword: Yup.string().oneOf([Yup.ref('password'), null], 'Confirm password should be same as New  password').required("Required")
        }),
        onSubmit: async (values) => {
            try {
                setLoader(true)
                await handleResetPassword(values.password, token);
                setLoader(false)
            } catch (error) {
                setLoader(false)
                console.log(error);
            }
        },
    });




    return (
        <div className='ResetBg w-full'>
            <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
                <Container className='card col-12 col-md-6 col-xl-4 px-1 py-3'>
                    <div className='card-head mt-4 d-flex flex-column'>
                        <Heading className="pt-2">Reset Password</Heading>
                    </div>
                    <div className='card-body'>
                        <form onSubmit={formik.handleSubmit}>
                            <div className='d-flex m-0 mt-3 flex-column'>
                                {/* <Label className='mb-0' htmlFor='password'>Enter New Password<span className='text-danger'> *</span></Label> */}
                                <div className='FormDiv'>
                                    <input
                                        placeholder='Enter New Password'
                                        name='password'
                                        id='password'
                                        className='p-2'
                                        type={seePassword ? 'text' : 'password'}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.password}
                                    />
                                    {seePassword ? <Span type='button' onClick={() => SetseePassword(false)}><FaEyeSlash /></Span>
                                        : <Span type='button' onClick={() => SetseePassword(true)}><FaEye /></Span>}
                                </div>
                                {
                                    formik.errors.password && formik.touched.password ? (<div className='text-danger auth-error text-start'>{formik.errors.password}</div>) : null
                                }
                            </div>
                            <div className='d-flex m-0 mt-3 flex-column'>
                                {/* <Label className='mb-0' htmlFor='cpassword'>Re-Enter New Password<span className='text-danger'> *</span></Label> */}
                                <div className='FormDiv'>
                                    <input
                                        placeholder='Re Enter New Password'
                                        name='cpassword'
                                        id='cpassword'
                                        type={seeCPassword ? 'text' : 'password'}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.cpassword}
                                        className={
                                            formik.errors.cpassword && formik.touched.cpassword
                                                ? "text-input p-2 error"
                                                : "text-input p-2"
                                        }
                                    />
                                    {seeCPassword ? <Span type='button' onClick={() => SetseeCPassword(false)}><FaEyeSlash /></Span>
                                        : <Span type='button' onClick={() => SetseeCPassword(true)}><FaEye /></Span>}
                                </div>

                                {
                                    formik.errors.cpassword && formik.touched.cpassword ? (<div className='text-danger text-start auth-error'>{formik.errors.cpassword}</div>) : null
                                }
                            </div>

                            <div className='d-flex justify-content-center mt-2'>
                                <button className='Button d-flex justify-content-center' type="submit" disabled={loader}>
                                    {
                                        loader ?'wait...': 'Submit'
                                    }
                                </button>
                            </div>
                        </form>
                    </div>
                </Container>
            </div>
        </div>
    )
}
