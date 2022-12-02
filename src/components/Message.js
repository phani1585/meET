import { CardContent } from "@mui/material";
import React from "react";

const { MsgOnwer } = {
  MsgOnwer: {
    bgcolor: "black",
    width: "60%",
    color: "pink",
    whiteSpace: "wrap",
    inlineSize: "150px",
    overflowWrap: "break-word",
    borderRadius: '10px 0px 10px 10px'
  },
};

const Message = () => {
  return (
    <CardContent sx={MsgOnwer}>
      ldkfjkasdjflkajsdflkasjfdlkjalks;dfjlkasdjflk;ajdsfklasdasdasdasdadsasdadasdasdasdasdasdasdadasdadsadsajsdflkajsdflkajsdflkjadlskfjalksdfjaksldfa
    </CardContent>
  );
};

export default Message;
