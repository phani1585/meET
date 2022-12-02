import { Box, Typography } from "@mui/material";
import React, { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import FormComponet from "../components/FormComponet";
import { userContext } from "../Context/context";
import { ResetPasswordValidation } from "../validation/ResetPasswordValidation";

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
  const pswobjj = {
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  };
  const { validtion, inputEleFunc } = useContext(userContext);
  const [errors, setErrors] = useState({});
  const [data, setData] = useState(pswobjj);

  const handleChange = (e) => {
    setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    validtion(ResetPasswordValidation, data).then((result) => {
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
      errors.oldPassword
    ),
    inputEleFunc(
      "newPassword",
      data.newPassword,
      "Please Enter New Password",
      errors.newPassword
    ),
    inputEleFunc(
      "confirmPassword",
      data.confirmPassword,
      "Please Confirm Password",
      errors.confirmPassword
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
    </Box>
  );
};

export default ResetPassword;
