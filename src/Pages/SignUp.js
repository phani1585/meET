import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import FormComponet from "../components/FormComponet";
import { userContext } from "../Context/context";
import { signupValidation } from "../validation/SignupValidation";
//validation schema

//styling
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
    minHeight: "400px",
    borderRadius: "10px",
    p: 5,
    backgroundColor: "#fff",
  },
};

const SignUp = () => {
  const person = {
    fullName: "",
    email: "",
    userName: "",
    password: "",
    confirmPassword: "",
  };

  const [data, setData] = useState(person);
  const [errors, setErrors] = useState({});
  const { setUsers, validtion, inputEleFunc } = useContext(userContext);

  //input Fileds generators
  const inputEleArray = [
    inputEleFunc(
      "fullName",
      data.fullName,
      "Enter Your Full Name",
      errors.fullName
    ),
    inputEleFunc("email", data.email, "Enter Your Email Address", errors.email),
    inputEleFunc(
      "userName",
      data.userName,
      "Enter Your User Name",
      errors.userName
    ),
    inputEleFunc("password", data.password, "Enter Password", errors.password),
    inputEleFunc(
      "confirmPassword",
      data.confirmPassword,
      "Confirm Password",
      errors.confirmPassword
    ),
  ];

  const handleChange = (e) => {
    setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    validtion(signupValidation, data).then((result) => {
      if (result !== undefined) {
        setErrors(result);
      } else {
        setUsers((prev) => [...prev, data]);
        setData(person);
      }
    });
  };

  return (
    <Box sx={signup_main_wrapper}>
      <Box sx={signup_wrapper}>
        <FormComponet
          button="Sign Up"
          inputArray={inputEleArray}
          handleSubmit={handleSubmit}
          handleChange={handleChange}
        />
        <NavLink to="/login">
          <Typography color="primary" textAlign="right">
            Log in Instead
          </Typography>
        </NavLink>
      </Box>
    </Box>
  );
};

export default SignUp;
