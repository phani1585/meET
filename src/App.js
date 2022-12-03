import React from "react";
import NavBar from "./components/NavBar";
import SignUp from "./Pages/SignUp";
import { UserContextProvider } from "./Context/context";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LogIn from "./Pages/LogIn";
import ResetPassword from "./Pages/ResetPassword";
import ChatPage from "./Pages/ChatPage";

const App = () => {
  // const [users, setUsers] = useState([]);

  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/" element={<LogIn />} />
        <Route path="/resetPassword" element={<ResetPassword />} />
        <Route path="/chatPage" element={<ChatPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
