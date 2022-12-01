import { Box,Typography } from "@mui/material";
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import FormComponet from "../components/FormComponet";
import {LoginValidation} from '../validation/LoginValidation'

const { signup_main_wrapper, signup_wrapper,CreateNewAccWrapper } = {
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
  CreateNewAccWrapper:{
    display: "flex",
    justifyContent: "space-between",
    fontSize: "14px",
  }
};

const LogIn = () => {
  const [user, setUser] = useState({
    userName: "",
    password: "",
  });

  const [errors,setErrors]=useState({})

  const handleChange = (e) => {
    setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    const checkErrors = await LoginValidation.validate(user,{abortEarly:false}).catch(err=>err)
    if(checkErrors!==undefined){
      const errorMsgs = [...checkErrors.inner].reduce((a,b)=>{
        a[b.path]=b.message
        return a
      },{})
      setErrors(errorMsgs)
    }
  };

  const inputEleArray = [
    {value:user.userName,name:'userName',placeholder:'Enter User Name',errorMsg:errors.userName},
    {value:user.password,name:'password',placeholder:'Enter Password',errorMsg:errors.password}
  ]

  return (
    <div>
      <Box sx={signup_main_wrapper}>
        <Box sx={signup_wrapper}>
        <FormComponet button='Log In' inputArray={inputEleArray} handleSubmit={handleSubmit} handleChange={handleChange}/>
          <Box sx={CreateNewAccWrapper}>
            <NavLink to="/signup">
              <Typography textAlign="left" color="primary">
                Create New Account
              </Typography>
            </NavLink>
            <NavLink to="/resetPassword">
              <Typography textAlign="right" color="primary">
                Forgot Your Password ?
              </Typography>
            </NavLink>
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default LogIn;
