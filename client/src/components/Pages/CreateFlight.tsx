import { Box, Container, CssBaseline, Grid, TextField, ThemeProvider, Typography, createTheme } from '@mui/material'
import React, { ChangeEvent, ChangeEventHandler, useEffect, useState } from 'react'
import AirportSearchBar from '../AirportSearchBar';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs, { Dayjs } from 'dayjs';
const theme = createTheme();
export default function CreateFlight() {
    const [airportSource, setAirportSource] = useState('');
    const [airportDestination, setAirportDestination] = useState('');
    const [amountOfTickets, setAmountOfTickets] = useState(0);
    const [depatureDate, setDepatureDate] = useState<Dayjs | null>(null);
    useEffect(() => {

    }, []);

    const onDateChange = (date: Dayjs | null) => {
        setDepatureDate(date);
    }

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
                               <Typography variant='h3'>From where?</Typography>
                                <AirportSearchBar searchId={''} searchLabel={''} searchAirportInput={airportSource}/>
                            </Grid>
                            <Grid item xs={2}>
                                <Typography variant='h3'>To where?</Typography>
                                <AirportSearchBar searchId='destinationAirport' searchLabel='' searchAirportInput={airportDestination}/>
                            </Grid>
                            <Grid item xs={2}>
                                <Typography variant='h3'>How many tickets do you want to sell?</Typography>
                                <TextField type='number' value={amountOfTickets} onChange={(event) => setAmountOfTickets(parseInt(event.target.value))}/>
                            </Grid>
                            <Grid item xs={2}>
                                <Typography variant='h3'>When will be the flight?</Typography>
                                <DatePicker minDate={dayjs()}
                                onChange={}
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    )
}
