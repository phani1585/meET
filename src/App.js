import React, { useState } from "react";
import NavBar from "./components/NavBar";
import SignUp from "./Pages/SignUp";
import { userContext } from "./Context/context";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LogIn from "./Pages/LogIn";
import ResetPassword from "./Pages/ResetPassword";
import ChatPage from "./Pages/ChatPage";

const App = () => {
  const [users, setUsers] = useState([]);
  console.log(users);

  const validtion = async (schema, data) => {
    const checkErrors = await schema
      .validate(data, { abortEarly: false })
      .catch((err) => err);

    if (checkErrors.inner !== undefined) {
      const errorMsg = [...checkErrors.inner].reduce((a, b) => {
        a[b.path] = b.message;
        return a;
      }, {});
      return errorMsg;
    }
  };
  // this func for creating input elements in the form
  const inputEleFunc = (name, value, placeholder, errorMsg) => ({
    name,
    value,
    placeholder,
    errorMsg,
  });

  return (
    <userContext.Provider value={{ setUsers, validtion, inputEleFunc, users }}>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/chatPage" element={<LogIn />} />
          <Route path="/resetPassword" element={<ResetPassword />} />
          <Route path="/" element={<ChatPage />} />
        </Routes>
      </BrowserRouter>
    </userContext.Provider>
  );
};

export default App;
