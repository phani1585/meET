import { Box, Typography } from "@mui/material";
import React, { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import FormComponet from "../components/FormComponet";
import { userContext } from "../Context/context";
import { ResetPasswordValidation } from "../validation/ResetPasswordValidation";
import resetPasswordImage from "../assets/resetPassword.jpeg";


const { signup_main_wrapper, signup_wrapper,LogInLogo } = {
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

const ResetPassword = () => {
  const pswobjj = {
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  };
  const { validtion,inputEleFunc} = useContext(userContext);
  const [errors, setErrors] = useState({});
  const [data, setData] = useState(pswobjj);

  const handleChange = (e) => {
    setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
     validtion(ResetPasswordValidation, data).then(async(result) => {
      if (result !== undefined) {
        setErrors(result);
      } else {
        setData(pswobjj);
      }
    });
  };


  const inputEleArray = [
    inputEleFunc(
      "oldPassword",
      data.oldPassword,
      "Please Enter Old Password",
      errors.oldPassword,'text'
    ),
    inputEleFunc(
      "newPassword",
      data.newPassword,
      "Please Enter New Password",
      errors.newPassword,'password'
    ),
    inputEleFunc(
      "confirmPassword",
      data.confirmPassword,
      "Please Confirm Password",
      errors.confirmPassword,'text'
    ),
  ];

  return (
    <Box sx={signup_main_wrapper}>
      <Box sx={signup_wrapper}>
        <FormComponet
          button="Change Password"
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
        <img style={{ width: "100%",borderRadius:'20px' }} src={resetPasswordImage} alt="log in logo" />
      </Box>
    </Box>
  );
};

export default ResetPassword;
