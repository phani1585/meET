import { Box, Typography } from "@mui/material";
import React, { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import FormComponet from "../components/FormComponet";
import { userContext } from "../Context/context";
import { LoginValidation } from "../validation/LoginValidation";

const { signup_main_wrapper, signup_wrapper, CreateNewAccWrapper } = {
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
  CreateNewAccWrapper: {
    display: "flex",
    justifyContent: "space-between",
    fontSize: "14px",
  },
};

const LogIn = () => {
  const person = {
    userName: "",
    password: "",
  };
  const [user, setUser] = useState(person);

  const [errors, setErrors] = useState({});
  const { validtion, inputEleFunc } = useContext(userContext);

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
        setUser(person);
      }
    });
  };

  const inputEleArray = [
    inputEleFunc("userName", user.userName, "Enter User Name", errors.userName),
    inputEleFunc("password", user.password, "Enter Password", errors.password),
  ];

  return (
    <div>
      <Box sx={signup_main_wrapper}>
        <Box sx={signup_wrapper}>
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
      </Box>
    </div>
  );
};

export default LogIn;
