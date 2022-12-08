import { Box, Typography } from "@mui/material";
import React, { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import FormComponet from "../components/FormComponet";
import { userContext } from "../Context/context";
import {authContext} from '../Context/AuthContext'
import { LoginValidation } from "../validation/LoginValidation";
import ConnectedImage from "../assets/Connected world-rafiki.png";
import ErrorMsg from "../components/ErrorMsg";

const { signup_main_wrapper, signup_wrapper, CreateNewAccWrapper, LogInLogo } =
  {
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
      borderRadius: "10px",
      p: 5,
      backgroundColor: "#fff",
    },
    CreateNewAccWrapper: {
      display: "flex",
      justifyContent: "space-between",
      fontSize: "14px",
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

  const BASE_URL = "http://192.168.15.124:3080/chat/login"

const LogIn = () => {
  const person = {
    userName: "",
    password: "",
  };
  const [data, setData] = useState(person);
  const [errors, setErrors] = useState({});
  const { validtion,inputEleFunc} = useContext(userContext);
  const { getCall,errMsg,logIn } = useContext(authContext);

  const handleChange = (e) => {
    setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
  };

  const handleSubmit =  (e) => {
    e.preventDefault();
    validtion(LoginValidation, data).then(async(result) => {
      if (result !== undefined) {
        setErrors(result);
      } else {
        let login= await getCall(data,BASE_URL);
        setData(person)
        logIn(

        )
      }
    });
  };

  // this func for creating input elements in the form

  const inputEleArray = [
    inputEleFunc("userName", data.userName, "Enter User Name", errors.userName,'text'),
    inputEleFunc("password", data.password, "Enter Password", errors.password,'text'),
  ];

  return (
    <Box sx={signup_main_wrapper}>
      <Box sx={signup_wrapper}>
        {errMsg!==null ? <ErrorMsg msg={errMsg}/>:null}
        <FormComponet
          button="Log In"
          inputArray={inputEleArray}
          handleSubmit={handleSubmit}
          handleChange={handleChange}
        />
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
      <Box sx={LogInLogo}>
        <img style={{ width: "100%" }} src={ConnectedImage} alt="log in logo" />
      </Box>
    </Box>
  );
};

export default LogIn;
