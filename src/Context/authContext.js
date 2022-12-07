import axios from 'axios'
import React, { createContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export const authContext = createContext(null)



export const AuthContexProvider = ({children}) => {
    const [user,setUser]=useState(null)
    const [dataFromApi,setDataFromApi]=useState(null)
    const [errMsg,setErrMsg]=useState(null)
    const navigate = useNavigate();

    console.log(user,'user');

    const logIn = () => {
        setUser(dataFromApi)
        setErrMsg(null)
        navigate("/chatPage");
    }

    const logOut = () => {
        setUser(null)
        setErrMsg(null)
        // navigate("/");
    }


    const getCall = (data,BASE_URL) => {
        let formdata = new FormData();
        formdata.append("fullName", '');
        formdata.append("email", '');
        formdata.append("userName", data.userName);
        formdata.append("password", data.password);
        formdata.append("id", "");
            axios
            .post(BASE_URL, formdata)
            .then((res) => {
              console.log(res);
              if(res.data.data){
                setDataFromApi(res.data.data)
              }
               setErrMsg(res.data.msg)
              })
            .catch((err) => alert(err));
      }


  return (
    <authContext.Provider value={{getCall,logIn,logOut,errMsg}}>
      {children}
    </authContext.Provider>
  )
}
