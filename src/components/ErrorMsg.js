import { Typography } from '@mui/material'
import React from 'react'

const ErrorMsg = ({msg}) => {
  return (
    <Typography variant="h5" fontWeight='bold' color='error' align="center">{msg}</Typography>
  )
}

export default ErrorMsg
