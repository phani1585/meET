import React from "react";
import NavBar from "./components/NavBar";
import SignUp from "./Pages/SignUp";
import { UserContextProvider } from "./Context/context";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LogIn from "./Pages/LogIn";
import ResetPassword from "./Pages/ResetPassword";
import ChatPage from "./Pages/ChatPage";
import { AuthContexProvider } from "./Context/AuthContext";
import RequireAuth from "./components/RequireAuth";
import TextTool from "./Pages/TextTool";
import { ImageToText } from "./Pages/imageToText";

const App = () => {

  return (
    <BrowserRouter>
    <UserContextProvider>
      <AuthContexProvider>
        <NavBar />
        <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/Login" element={<LogIn />} />
          <Route path="/" element={<ImageToText />} />
          <Route path="/resetPassword" element={<ResetPassword />} />
          <Route path="/textTool" element={<TextTool />} />
          <Route path='/chatPage' element={<RequireAuth><ChatPage/></RequireAuth>}/>
          <Route path='/chatPage' element={<RequireAuth><ChatPage/></RequireAuth>}/>
          {/* <Route path="/chatPage" element={<ChatPage />} > */}

          
        </Routes>
      </AuthContexProvider>
      </UserContextProvider>
    </BrowserRouter>
  );
};

export default App;
