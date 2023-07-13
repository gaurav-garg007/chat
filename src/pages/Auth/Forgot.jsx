import React, { useState } from 'react'
import './AuthCss/Login.css'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useAuthContextHook } from "../../Context/AuthContext";
import styled from 'styled-components';
const Heading = styled.h3`
    font-size: 2rem;
    text-align: center;
    font-weight: bolder;
`

const Container = styled.div`
  background: white;
  border-radius: 14px;
  max-width: 500px;
`

const initialValues = {
    email: ''
}

export default function Forgot({ startLoader, stopLoader }) {
    const [isLoading, setIsLoading] = useState(false);
    const { handleForgotPassword } = useAuthContextHook();

    const handleSubmit = async (values) => {
        try {
            setIsLoading(true)
            await handleForgotPassword(values.email);
            setIsLoading(false)
        } catch (error) {
            setIsLoading(false)
        }
    }

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: Yup.object({
            email: Yup.string().required('Required'),
        }),
        onSubmit: values => {
            console.log("gg");
            handleSubmit(values)
        },
    });

    return (
        <div className='ForgotBg w-full'>
            <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
                <Container className='card col-12 col-md-6 col-xl-4 py-4'>
                    <div className='card-head mt-4 d-flex flex-column'>
                        <Heading className="pt-3">Forgot Password</Heading>
                    </div>
                    <div className='card-body'>
                        <form onSubmit={formik.handleSubmit}>
                            <div className='FormDiv d-flex m-0 mt-3 flex-column'>
                                {/* <Label htmlFor="email" className='mb-0'>Your Phone or Email<span className='text-danger'> *</span></Label> */}
                                <input
                                    className='px-2 py-2'
                                    id="email"
                                    name="email"
                                    placeholder='Enter your Phone or Email'
                                    type="text"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.email}
                                />
                                <small className='text-end text-danger'>
                                    {formik.touched.email && formik.errors.email ? (
                                        <div className='text-danger text-start auth-error'>{formik.errors.email}</div>
                                    ) : null}
                                </small>
                            </div>
                            <div className='d-flex justify-content-center mt-3'>
                                <button className='Button d-flex justify-content-center' type="submit">
                                    {
                                        isLoading ?
                                            'wait...' : 'Submit'
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
