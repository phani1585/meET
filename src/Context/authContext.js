import axios from 'axios'
import React, { createContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export const authContext = createContext(null)



export const AuthContexProvider = ({children}) => {
    const [user,setUser]=useState({})
    const [dataFromApi,setDataFromApi]=useState({})
    const [errMsg,setErrMsg]=useState(null)
    const navigate = useNavigate();

    console.log(user,'user');

    const logIn = () => {
        // setUser(dataFromApi)
        setErrMsg(null);
        navigate('/chatPage');
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
            .then(async(res) => {
              console.log(res);
              // return res;
             if(res.data.data){
               await  setUser(res.data.data)
              }
              else{
                setErrMsg(res.data.msg)
              } 
               
              })
            .catch((err) => alert(err));
      }


  return (
    <authContext.Provider value={{getCall,logIn,logOut,errMsg,user}}>
      {children}
    </authContext.Provider>
  )
}
