import { CssBaseline, TextField, Typography } from '@mui/material'
import React from 'react'
import { WEBSITE_NAME } from '../../globals'

export default function Home() {
  return (
    <>
      <CssBaseline />
      <Typography variant='h3' component='h2'>Welcome to {WEBSITE_NAME}! Please search for your airport</Typography>
      <TextField id='destination-search' label='Destination Search' variant='outlined' />
    </>
  )
}
