import { Box, Typography } from "@mui/material";
import React, { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import FormComponet from "../components/FormComponet";
import { userContext } from "../Context/context";
import { LoginValidation } from "../validation/LoginValidation";
import ConnectedImage from "../assets/Connected world-rafiki.png";

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

const LogIn = () => {
  const person = {
    userName: "",
    password: "",
  };
  const navigate = useNavigate();
  const [user, setUser] = useState(person);
  const [warning, setWarning] = useState(false);

  const [errors, setErrors] = useState({});
  const { validtion, users } = useContext(userContext);

  const handleChange = (e) => {
    setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    validtion(LoginValidation, user).then((result) => {
      if (result !== undefined) {
        setErrors(result);
      } else {
        let checkUser = users.filter(
          (ele) =>
            ele.userName === user.userName && ele.password === user.password
        );
        if (checkUser.length > 0) {
          setUser(person);
          navigate("/chatPage");
        } else {
          setWarning(true);
        }
      }
    });
  };

  // this func for creating input elements in the form
  const inputEleFunc = (name, value, placeholder, errorMsg) => ({
    name,
    value,
    placeholder,
    errorMsg,
  });

  const inputEleArray = [
    inputEleFunc("userName", user.userName, "Enter User Name", errors.userName),
    inputEleFunc("password", user.password, "Enter Password", errors.password),
  ];

  return (
    <Box sx={signup_main_wrapper}>
      <Box sx={signup_wrapper}>
        {warning && (
          <Typography color="error">Invalid User Name or Password</Typography>
        )}
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
