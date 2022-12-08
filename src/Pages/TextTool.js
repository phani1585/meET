import { Button, TextField } from "@mui/material";
import { Box, Container } from "@mui/system";
import React, { useRef, useState } from "react";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

const TextTool = () => {
    const textref=useRef()
  const [text, setText] = useState("");
  const [output, setOutput] = useState("");
  const [copySuccess, setCopySuccess] = useState(false);
  const [isDisable, setIsDisable] = useState(true);

  const handleChange = (e) => {
    setText(e.target.value);
  };

  String.prototype.toTitleCase = function () {
    let i, j, str, lowers, uppers;
    str = this.replace(/([^\W_]+[^\s-]*) */g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });

    // Certain minor words should be left lowercase unless
    // they are the first or last words in the string
    lowers = [
      "A",
      "An",
      "The",
      "And",
      "But",
      "Or",
      "For",
      "Nor",
      "As",
      "At",
      "Is",
      "If",
      "I",
      "By",
      "For",
      "From",
      "In",
      "Into",
      "Near",
      "Of",
      "On",
      "Onto",
      "To",
      "With",
      "Also",
      "Are",
    ];
    for (i = 0, j = lowers.length; i < j; i++)
      str = str.replace(
        new RegExp("\\s" + lowers[i] + "\\s", "g"),
        function (txt) {
          return txt.toLowerCase();
        }
      );

    // Certain words such as initialisms or acronyms should be left uppercase

    uppers = ["Id", "Tv"];
    for (i = 0, j = uppers.length; i < j; i++)
      str = str.replace(
        new RegExp("\\b" + uppers[i] + "\\b", "g"),
        uppers[i].toUpperCase()
      );

    return str;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let convertedText = text.toTitleCase();
    setOutput(convertedText);
    setIsDisable(false)
  };

  const copyToClipBoard = async copyMe => {
    try {
      await navigator.clipboard.writeText(copyMe);
      setCopySuccess(true);
    } catch (err) {
      setCopySuccess(false);
    }
  };

 


  return (
    <Container>
      <form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <TextField
        onFocus={()=>setCopySuccess(false)}
          sx={{ mt: 5, mb: 4 }}
          id="outlined-multiline-static"
          multiline
          rows={5}
          ref={textref}
          fullWidth
          onChange={handleChange}
          placeholder="Type Your Text Here"
        />
        <Container
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Button type="submit" variant="contained" size="large">
            Convert to Title Case
          </Button>
        </Container>
      </form>

      <Box sx={{ mt: 5,width:'100%',display:'flex',justifyContent:'flex-end'}}>
        <Button disabled={isDisable} onClick={()=>copyToClipBoard(output)} type="submit" variant="contained" size="large" startIcon={<ContentCopyIcon/>}>
            {copySuccess?'Copied':'Copy'}
        </Button>
      </Box>
     <Box sx={{border:'1px solid rgba(0,0,0,0.2)',borderRadius:'10px',mt: 5,p:2}}>
        {output}
     </Box>
    </Container>
  );
};

export default TextTool;
