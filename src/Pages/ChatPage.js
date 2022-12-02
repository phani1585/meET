import { Box, Button, TextField} from "@mui/material";
import { Container } from "@mui/system";
import React, { useState } from "react";
import SendIcon from '@mui/icons-material/Send';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import SelectionFile from '../components/SelectionFile'
import Message from "../components/Message";

const { mainChatContainer, chatInputwrapper } = {
  mainChatContainer: {
    minHeight: "90.9vh",
    position: "relative",
  },
  chatInputwrapper: {
    padding:1,
    width:'100%',
    position: "absolute",
    bottom: 0,
    left:0
  },
};

const ChatPage = () => {
  const [chatInput,setChatInput]=useState('')
  const [fileName,setFileName]=useState('')
  
  const handleChage = (e) => {
    setChatInput(e.target.value)
  }

  const handleFileChange = (e)=>{
    setFileName(e.target.files[0].name)
  }

  const handleClearFile = () => {
    setFileName('')
  }

  const handleSubmit = (e) => {
    e.preventDefult()
  }

  return (
    
    <Container sx={mainChatContainer} maxWidth="md">
      <Message/>
      <Box sx={chatInputwrapper}>
      {fileName.length>0 && <SelectionFile fileName={fileName} handleClearFile={handleClearFile}/>}
        <form autoComplete="off" noValidate style={{display:'flex',gap:'20px'}} onSubmit={handleSubmit}>
      <TextField
        variant="outlined"
        value={chatInput}
        onChange={handleChage}
        placeholder="Type your message here"
        fullWidth
        />
        <Button>
          <input type='file' id='fileinput' onChange={handleFileChange} style={{display:'none'}}/>
          <label htmlFor="fileinput">
          <AttachFileIcon fontSize="large"/>
          </label>
        </Button>
        <Button type="submit" variant="contained" sx={{width:'100px'}} color="primary"><SendIcon/></Button>
        </form>      
      </Box>
    </Container>
  );
};

export default ChatPage;
