import { createContext, useState } from "react";
import axios from "axios";

export const userContext = createContext({});

export const UserContextProvider = ({ children }) => {
    const [sucssesMsg,setSucssesMsg] = useState({
        message:'',
        openSnackBar:false
    })

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

  const inputEleFunc = (name, value, placeholder, errorMsg,type) => ({
    name,
    value,
    placeholder,
    errorMsg,
    type
  });

  const axiosCall = (data,BASE_URL,Request_type) => {
    let formdata = new FormData();
    console.log(data,'from axios',BASE_URL,'url')
    if(Request_type==='post'){
        formdata.append("fullName", data.fullName);
        formdata.append("email", data.email);
        formdata.append("password", data.password);
        formdata.append("userName", data.userName);
        formdata.append("id", "");
        axios
          .post(BASE_URL, formdata)
          .then((res) => setSucssesMsg({openSnackBar:true,message:res.data.msg,}))
          .catch((err) => alert(err));
    }else{
        axios
        .post(BASE_URL, formdata)
        .then((res) => setSucssesMsg(res.data.data.msg))
        .catch((err) => alert(err));
    }

  }

  return (
    <userContext.Provider value={{ validtion,axiosCall,inputEleFunc,sucssesMsg,setSucssesMsg }}>
      {children}
    </userContext.Provider>
  );
};
