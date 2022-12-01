import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { NavLink } from "react-router-dom";

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

const LogIn = () => {
  const [user, setUser] = useState({
    userName: "",
    password: "",
  });

  const handleChange = (e) => {
    setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <div>
      <Box sx={signup_main_wrapper}>
        <Box sx={signup_wrapper}>
          <form autoComplete="off" noValidate onSubmit={handleSubmit}>
            <TextField
              sx={{ mb: 1, mt: 1 }}
              variant="outlined"
              value={user.userName}
              name="userName"
              placeholder="Enter User Name"
              onChange={handleChange}
              fullWidth
            />
            <TextField
              sx={{ mb: 1, mt: 1 }}
              variant="outlined"
              value={user.password}
              name="password"
              placeholder="Enter User Password"
              onChange={handleChange}
              fullWidth
            />
            <Button
              type="submit"
              sx={{ mt: 1, mb: 2 }}
              variant="contained"
              fullWidth
            >
              Log In
            </Button>
          </form>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: "14px",
            }}
          >
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
