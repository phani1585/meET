import { Fragment, useState } from "react";
import * as Tesseract from "tesseract.js";
import ImageIcon from "@mui/icons-material/Image";
import CloseIcon from "@mui/icons-material/Close";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  IconButton,
  LinearProgress,
  Snackbar,
  Typography,
} from "@mui/material";
import { saveAs } from "file-saver";
import { Container } from "@mui/system";

const { root, title, content, cardItems, actions } = {
  root: {
    flexGrow: 1,
    minWidth: 250,
    maxWidth: 350,
  },
  title: {
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
    margin: 10,
  },
  content: {
    marginTop: 10,
  },
  cardItems: {
    marginBottom: 10,
  },
  actions: {
    display: "flex",
    justifyContent: "center",
  },
};

export function ImageToText(props) {
  const [uploads, setUploads] = useState([]);
  const [fileName, setFileName] = useState("");
  const [resultText, setResultText] = useState("");
  const [loading, setLoading] = useState(false);
  const [openSnackBar, setOpenSnackBar] = useState(false);

  const handleInputChange = (event) => {
    setResultText("");
    console.log(event.target.files)
    if (event.target.files[0]) {
      var uploads = [];
      for (var key in event.target.files) {
        if (!event.target.files.hasOwnProperty(key)) continue;
        let upload = event.target.files[key];
        setFileName(event.target.files[key].name);
        uploads.push(URL.createObjectURL(upload));
      }
      setUploads(uploads);
    } else {
      setUploads([]);
      setFileName("");
    }
  };

  const generateText = () => {
    let images = uploads;
    console.log(images,'selected image')
    for (var i = 0; i < images.length; i++) {
      setLoading(true);
      Tesseract.recognize(images[i])
        .catch((err) => {
          console.error(err);
          setFileName("");
          setLoading(false);
          setResultText("");
          setOpenSnackBar(true);
        })  
        .then((result) => {
          setFileName("");
          let text = result;
          setResultText(text.data.text);
          setLoading(false);
        });
    }
  };
  const handleExportTxt = () => {
    const data = new Blob([resultText], { type: "text/plain" });
    saveAs(data, "ImageToText.txt");
  };

  const handleCloseSnackBar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackBar(false);
  };

  return (
    <Container sx={{display:'flex',justifyContent:'center'}}>
    <Fragment>
      <Card sx={root}>
        <CardContent>
          <Typography sx={title} color="inherit" gutterBottom>
            Convert Image to Text
          </Typography>
          <Divider />
          <Typography align="center">
            <Button
              sx={content}
              variant="contained"
              color="primary"
              component="label"
              size="small"
              startIcon={<ImageIcon />}
            >
              Upload File
              <input type="file" hidden onChange={handleInputChange} />
            </Button>
          </Typography>
          <Typography paragraph align="center">
            {fileName}
          </Typography>
          <Typography align="center">
            <Button
              sx={cardItems}
              variant="contained"
              size="small"
              color="primary"
              onClick={generateText}
            >
              Generate Text
            </Button>
          </Typography>
          {loading && <LinearProgress sx={cardItems} />}
        </CardContent>
        {resultText.length > 0 && (
          <CardActions sx={actions} disableSpacing>
            <Button
              size="small"
              color="primary"
              onClick={() => {
                navigator.clipboard.writeText(resultText);
              }}
            >
              Copy to clipboard
            </Button>
            <Button size="small" color="primary" onClick={handleExportTxt}>
              Download
            </Button>
          </CardActions>
        )}
      </Card>
      <Snackbar
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={openSnackBar}
        autoHideDuration={2500}
        onClose={handleCloseSnackBar}
        message="Error while retriving data"
        action={
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handleCloseSnackBar}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        }
      />
    </Fragment>
    </Container>
  );
}
