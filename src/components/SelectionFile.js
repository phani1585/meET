import { Box, IconButton, Typography } from '@mui/material'
import React from 'react'
import ClearIcon from '@mui/icons-material/Clear';
const {fileWrapper,fileNameWrapper } = {
    fileWrapper:{
      width:'35%',
      display:'flex',
      alignItems:'center',
      backgroundColor:'#F7F7F7',
      borderRadius:'30px',
      mb:'10px'
    },
    fileNameWrapper:{
      flexGrow:1,
      pl:'20px',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    }
  };

const SelectionFile = ({fileName,handleClearFile}) => {
  return (
    <Box sx={fileWrapper}>
      <Typography sx={fileNameWrapper} color="success.dark">{fileName}</Typography>
      <IconButton onClick={handleClearFile}><ClearIcon/></IconButton>
    </Box>
  )
}

export default SelectionFile
