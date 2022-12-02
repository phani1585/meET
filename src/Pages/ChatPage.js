import { TextField } from "@mui/material";
import { Container } from "@mui/system";
import React from "react";

const { mainChatContainer, chatInput } = {
  mainChatContainer: {
    bgcolor: "red",
    minHeight: "90.9vh",
    position: "relative",
  },
  chatInput: {
    position: "absolute",
    bottom: 0,
  },
};

const ChatPage = () => {
  return (
    <Container sx={mainChatContainer} maxWidth="md">
      <TextField
        sx={chatInput}
        variant="outlined"
        placeholder="Type your message here"
        fullWidth
      />
    </Container>
  );
};

export default ChatPage;
