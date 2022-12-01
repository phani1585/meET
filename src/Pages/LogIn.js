import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {LoginValidation} from '../validation/LoginValidation'

const { signup_main_wrapper, signup_wrapper,TextFieldMargin,CreateNewAccWrapper } = {
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
  TextFieldMargin:{
    mb: 1, mt: 1
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
  
  return (
    <div>
      <Box sx={signup_main_wrapper}>
        <Box sx={signup_wrapper}>
          <form autoComplete="off" noValidate onSubmit={handleSubmit}>
            <TextField
              sx={TextFieldMargin}
              variant="outlined"
              value={user.userName}
              name="userName"
              placeholder="Enter User Name"
              onChange={handleChange}
              fullWidth
            />
            {errors.userName && <Typography sx={{fontSize:'13px'}} color="error">{errors.userName}</Typography>}
            <TextField
              sx={TextFieldMargin}
              variant="outlined"
              value={user.password}
              name="password"
              placeholder="Enter Password"
              onChange={handleChange}
              fullWidth
            />
            {errors.password && <Typography sx={{fontSize:'13px'}} color="error">{errors.password}</Typography>}
            <Button
              type="submit"
              sx={TextFieldMargin}
              variant="contained"
              fullWidth
            >
              Log In
            </Button>
          </form>
          <Box sx={CreateNewAccWrapper}>
            <NavLink to="/signup">
              <Typography textAlign="left" color="primary">
                Create New Account
              </Typography>
            </NavLink>
            <NavLink to="/signup">
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
