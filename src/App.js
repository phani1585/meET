import React, { useState } from "react";
import NavBar from "./components/NavBar";
import SignUp from "./Pages/SignUp";
import { userContext } from "./context";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LogIn from "./Pages/LogIn";
import ResetPassword from "./Pages/ResetPassword";

const App = () => {
  const [users, setUsers] = useState([]);

  const validtion = async(schema,data) => {
    const checkErrors = await schema.validate(data, { abortEarly: false }).catch((err) => err)
    
    if (checkErrors.inner !== undefined) {
      const errorMsg = [...checkErrors.inner].reduce((a, b) => {
        a[b.path] = b.message;
        return a;
      }, {});
      return errorMsg
    }

  }

  return (
    <userContext.Provider value={{ setUsers,validtion }}>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/resetPassword" element={<ResetPassword/>}/>
        </Routes>
        {console.log(users)}
      </BrowserRouter>
    </userContext.Provider>
  );
};

export default App;

