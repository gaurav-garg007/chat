import React from 'react'
import { useFormik } from 'formik';
import * as Yup from 'yup'
import Img from '../../images/download.jpg'
import styled from 'styled-components';
import {BsPencil} from 'react-icons/bs'
import {AiTwotoneDelete} from 'react-icons/ai'
const Div = styled.div`
margin: 15px 8px;
display: flex;
justify-content: center;
gap: 10px
`
const Input = styled.input`
width: 100%;
padding: 5px;
border: none;
border-bottom: 2px solid black;
outline: none;
&::placeholder{
    color: grey;
}
`
const Button = styled.button`
border: none;
outline: none;
padding: 8px 13px;
font-size: 15px;
border-radius: 20px;
width: 12rem;
&:hover{
    background: darkgrey;

}
`
export default function Index(){
    const formik = useFormik({
        initialValues: {name: '', mobileNo: '', country: '', state: '', city: ''},
        validationSchema: Yup.object({
            name: Yup.string().required("Required"),
            mobileNo: Yup.string().required("Required"),
            country: Yup.string().required("Required"),
            state: Yup.string().required("Required"),
            city: Yup.string().required("Required")
        }),
        onSubmit: values => {
            console.log(values)
        }
    })
    return(
        <div className='mt-5'>
            <p className='my-5 fs-2 fw-bold text-center'><u>My Profile</u></p>
            <div className="row m-0 d-flex justify-content-center align-items-center">
                <div className='col-md-2 d-flex justify-content-center align-items-center'>
                    <div className='d-flex flex-column justify-content-center align-items-center'>
                        <img src={Img} alt='' width='70%'/>
                        <div className='mt-4 gap-3 d-flex justify-content-center'>
                            <BsPencil size={20} color='blue'>

                            </BsPencil>
                            <AiTwotoneDelete size={20} color='red'/>
                        </div>

                    </div>
                </div>
                <div className='col-md-5 '>
                    <form onSubmit={formik.handleSubmit}>
                        <Div>
                            <Input
                            name='name'
                            id='name'
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            placeholder='Enter Your Name'
                            />
                        </Div>
                        <Div>
                            <Input
                            name='name'
                            id='name'
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            placeholder='Enter Your Name'
                            />
                            <Input
                            name='name'
                            id='name'
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            placeholder='Enter Your Name'
                            />
                        </Div>
                        <Div>
                            <Input
                            name='country'
                            id='country'
                            value={formik.values.country}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            placeholder='Enter Your Country'
                            />
                        </Div>
                        <Div>
                            <Input
                            name='state'
                            id='state'
                            value={formik.values.state}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            placeholder='Enter Your State'
                            />
                        </Div>
                        <Div>
                            <Input
                            name='city'
                            id='city'
                            value={formik.values.city}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            placeholder='Enter Your City'
                            />
                        </Div>
                        <Div>
                            <Button type='submit'>
                                Save Profile
                            </Button>
                        </Div>
                    </form>
                </div>

            </div>
        </div>
    );
}