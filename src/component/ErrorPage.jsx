import { Box } from '@mui/material'
import React from 'react'
const ErrorPage = ({error}) => {
  return (
   <>
   <Box>
    <h1>{error}</h1>
    <img src="/assets/no-data.avif" alt='not-found' height={300} width={500}/>
   </Box>
   </>
  )
}

export default ErrorPage