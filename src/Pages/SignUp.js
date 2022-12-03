import { Typography,Snackbak } from "@mui/material";
import { Box } from "@mui/system";
import React, { useContext, useState } from "react";
import { NavLink,useNavigate } from "react-router-dom";
import FormComponet from "../components/FormComponet";
import { signupValidation } from "../validation/SignupValidation";
import { userContext } from "../Context/context";
import signupConnet from "../assets/signupConnet.jpeg";


//styling
const { signup_main_wrapper, signup_wrapper, LogInLogo } = {
  signup_main_wrapper: {
    display: "flex",
    flexDirction: "row",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "90.9vh",
    backgroundColor: "#F7F7F7",
    gap: "10%",
  },
  signup_wrapper: {
    width: "400px",
    minHeight: "400px",
    borderRadius: "10px",
    p: 5,
    backgroundColor: "#fff",
  },
  LogInLogo: {
    width: "550px",
    display: {
      xs: "none",
      sm: "block",
      md: "block",
      lg: "block",
      xl: "block",
    },
  },
};

const BASE_URL = "http://192.168.15.124:3080/chat/registration"

const SignUp = () => {
  const person = {
    fullName: "",
    email: "",
    userName: "",
    password: "",
    confirmPassword: "",
  };
  const navigate = useNavigate();
  const [data, setData] = useState(person);
  const [errors, setErrors] = useState({});
  const { validtion,inputEleFunc,axiosCall,sucssesMsg,setSucssesMsg } = useContext(userContext);

  // this func for creating input elements in the form




  //input Fileds generators
  const inputEleArray = [
    inputEleFunc(
      "fullName",
      data.fullName,
      "Enter Your Full Name",
      errors.fullName,
      'text'
    ),
    inputEleFunc("email", data.email, "Enter Your Email Address", errors.email,
    'text'),
    inputEleFunc(
      "userName",
      data.userName,
      "Enter Your User Name",
      errors.userName,
      'text'
    ),
    inputEleFunc("password", data.password, "Enter Password", errors.password,'password'),
    inputEleFunc(
      "confirmPassword",
      data.confirmPassword,
      "Confirm Password",
      errors.confirmPassword,
      'text'
    ),
  ];

  const handleChange = (e) => {
      setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
      setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
  };


  const handleSubmit =  (e) => {
    e.preventDefault();
    validtion(signupValidation, data).then(async(result) => {
      if (result !== undefined) {
        setErrors(result);
      } else {
        await axiosCall(data,BASE_URL,'post')
        setData(person);
      }
    });
  };

  return (
    <Box sx={signup_main_wrapper}>
      <Box sx={signup_wrapper}>
        {sucssesMsg.message!=='' && <Snackbak open={sucssesMsg.openSnackBar} autoHideDuration={6000} onClose={()=>setSucssesMsg({message:'',
        openSnackBar:false})} message={sucssesMsg.message} action={action}/>}
        <FormComponet
          button="Sign Up"
          inputArray={inputEleArray}
          handleSubmit={handleSubmit}
          handleChange={handleChange}
        />
        <NavLink to="/">
          <Typography color="primary" textAlign="right">
            Log in Instead
          </Typography>
        </NavLink>
      </Box>
      <Box sx={LogInLogo}>
        <img style={{ width: "100%" }} src={signupConnet} alt="log in logo" />
      </Box>
    </Box>
  );
};

export default SignUp;
