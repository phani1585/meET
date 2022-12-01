import { Box, Typography } from '@mui/material';
import React, { useState } from 'react'
import { NavLink } from 'react-router-dom';
import FormComponet from '../components/FormComponet';
import { ResetPasswordValidation } from '../validation/ResetPasswordValidation';

const { signup_main_wrapper, signup_wrapper } = {
    signup_main_wrapper: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "90.9vh",
      backgroundColor: "#F7F7F7",
    },
    signup_wrapper: {
      width: "400px",
      borderRadius: "10px",
      p: 5,
      backgroundColor: "#fff",
    },
  };



const ResetPassword = () => {
    const [errors,setErrors]=useState({})
    const [data,setData]=useState({
        oldPassword:'',
        newPassword:'',
        confirmPassword:''
    })

    const handleChange = (e) => {
        setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
        setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
      };

    const handleSubmit = async(e) => {
        e.preventDefault()
        const checkErrors = await ResetPasswordValidation.validate(data,{abortEarly:false})
        if(checkErrors.inner!==undefined){
            const errorMsgs = [...checkErrors.inner].reduce((a,b)=>{
                a[b.path]=b.message 
                return a
            },{})
           setErrors(errorMsgs)
        }
    }

    const inputEleArray = [
        {value:data.oldPassword,name:'oldPassword',placeholder:'Please Enter Old Password',errorMsg:errors.oldPassword},
        {value:data.newPassword,name:'newPassword',placeholder:'Please Enter New Password',errorMsg:errors.newPassword},
        {value:data.confirmPassword,name:'confirmPassword',placeholder:'Please Confirm Password',errorMsg:errors.confirmPassword},
      ]
      
  return (
    <Box sx={signup_main_wrapper}>
    <Box sx={signup_wrapper}>
      <FormComponet button='Change Password' inputArray={inputEleArray} handleSubmit={handleSubmit} handleChange={handleChange}/>
      <NavLink to="/login">
        <Typography color="primary" textAlign="right">
          Log in Instead
        </Typography>
      </NavLink>
    </Box>
  </Box>
  )
}

export default ResetPassword
