import React, { useState } from "react";
import NavBar from "./components/NavBar";
import SignUp from "./Pages/SignUp";
import { userContext } from "./context";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LogIn from "./Pages/LogIn";

const App = () => {
  const [users, setUsers] = useState([]);
  return (
    <userContext.Provider value={{ setUsers }}>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<LogIn />} />
        </Routes>
      </BrowserRouter>
    </userContext.Provider>
  );
};

export default App;

