import { Button, TextField, Typography } from "@mui/material";
import React from "react";

const FormComponet = (props) => {
  return (
    <form autoComplete="off" noValidate onSubmit={props.handleSubmit}>
      {props.inputArray.map((ele, i) => (
        <div key={i}>
          <TextField
            type={props.type || "text"}
            autoFocus={i === 0}
            sx={{ m: 1 }}
            variant="outlined"
            value={ele.value}
            name={ele.name}
            placeholder={ele.placeholder}
            onChange={props.handleChange}
            fullWidth
          />
          {ele.errorMsg && (
            <Typography sx={{ fontSize: "13px" }} color="error">
              {ele.errorMsg}
            </Typography>
          )}
        </div>
      ))}
      <Button type="submit" sx={{ m: 1 }} variant="contained" fullWidth>
        {props.button}
      </Button>
    </form>
  );
};

export default FormComponet;
