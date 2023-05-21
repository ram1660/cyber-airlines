import { Box, Container, CssBaseline, Grid, TextField, ThemeProvider, Typography, createTheme } from '@mui/material'
import React, { useEffect } from 'react'
import AirportSearchBar from '../AirportSearchBar';
const theme = createTheme();
export default function CreateFlight() {

    useEffect(() => {

    }, []);


    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {

    }
    return (
        <ThemeProvider theme={theme}>
            <Container component='main' maxWidth='lg'>
                <CssBaseline />
                <Box sx={{
                    marginTop: 8,
                    display: 'flex',
                    alignItems: 'center',
                    flexDirection: 'column',
                }}>
                    <Typography component='h1' variant='h5'>Post a new flight</Typography>
                    <Box component="form" onSubmit={handleSubmit} sx={{mt: 3}}>
                        <Grid container spacing={2}>
                            <Grid item xs={2}>
                                <AirportSearchBar onSearchInput={}/>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    )
}
