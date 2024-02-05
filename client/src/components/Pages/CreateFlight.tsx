import { Box, Button, Container, CssBaseline, Grid, TextField, ThemeProvider, Typography, createTheme } from '@mui/material'
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

    const handleNewFlight = (event: React.FormEvent<HTMLFormElement>) => {
        const postFlightRequest = {

        }
    }
    const onSourceAirportInput = (event: React.SyntheticEvent<Element, Event>, value: string, reason: string): void => {
        
    }

    const onDestinationAirportInput = (event: React.SyntheticEvent<Element, Event>, value: string, reason: string): void => {

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
                    <Box component="form" onSubmit={handleNewFlight} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid container spacing={2}>
                                <Grid item xs={4}>
                                    <Typography variant='h6'>From where?</Typography>
                                    <AirportSearchBar searchId={''} searchLabel={''} searchAirportInput={airportSource} onSearchInput={(_e, value, _reason) => setAirportSource(value)} />
                                </Grid>
                                <Grid item xs={4}>
                                    <Typography variant='h6'>To where?</Typography>
                                    <AirportSearchBar searchId='destinationAirport' searchLabel='' searchAirportInput={airportDestination} onSearchInput={(_e, value, _reason) => setAirportDestination(value)} />
                                </Grid>
                                <Grid item xs={4}>
                                    <Typography variant='h6'>How many tickets do you want to sell?</Typography>
                                    <TextField type='number' value={amountOfTickets} onChange={(event) => setAmountOfTickets(parseInt(event.target.value))} />
                                </Grid>
                                <Grid item xs={4}>
                                    <Typography variant='h6'>When will be the flight?</Typography>
                                    <DatePicker minDate={dayjs()}
                                        onChange={onDateChange} />
                                </Grid>
                            </Grid>
                            <Grid container>
                                <Grid item xs={12}>
                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        sx={{ mt: 3, mb: 2 }}
                                    >
                                        Post new flight
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    )
}
