import { Box, Button, CssBaseline, Grid, Typography } from '@mui/material';
import { Container } from '@mui/system';
import React, { useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import SearchIcon from '@mui/icons-material/Search';
import { WEBSITE_NAME } from '../../globals'
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import AirportSearchBar from '../AirportSearchBar';

export default function Home() {

  // Used for debouncing the search.
  const [originAirportInput, setOriginAirportInput] = useState('');

  const [destinationAirportInput, setDestinationAirportInput] = useState('');

  const [isValidData, setIsValidData] = useState(false);
  const [startingDate, setStartingDate] = useState<Dayjs | null>(null);
  const [returnDate, setReturnDate] = useState<Dayjs | null>(null);

  // Will becomming soon.
  // const onReturnChange = (newDate: any) => {
  //   if (startingDate === null) {
  //     // If the return date isn't set we can set to any date we would like but, after today's date.
  //     if (dayjs().add(1, 'day').isBefore(dayjs(newDate)))
  //       setReturnDate(newDate);
  //   } else {
  //     if (startingDate.isAfter(newDate))
  //       return;
  //     setReturnDate(dayjs(newDate));
  //   }
  // }

  const onStartChange = (newDate: Dayjs | null) => {
    setStartingDate(newDate);
  }

  // Listening for a change in either the origin input or the destination input and updating the internal value before debouncing it.
  const handleSearch = (event: React.SyntheticEvent, value: string, reason: string) => {
    if (event.currentTarget.id === 'origin-search') {
      if (value !== '') {
        setOriginAirportInput(value);
      }
    } else {
      if (value !== '') {
        setDestinationAirportInput(value);
      }
    }
  };

  const handleSearchClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    // 1. Get all the data from the fields.
    // 2. Make an API call to get all matched flights.    
    // 3. If there are no matched flights set the matchedFlights state (Haven't created yet),
    // In which result of producing to the user a "No flights have been found.".
    // 4. If there are pass to the FlightsList component to list from the API call through the state.
  };
  return (
    <>
      <CssBaseline />
      <Container component='main'>
        <Grid container spacing={5}>
          <Grid item xs={12} mb={5} mt={5}>
            <Typography variant='h3' component='h2'>Welcome to {WEBSITE_NAME}! Where do you want to fly?</Typography>
          </Grid>
          <Grid item xs={6}>
            <AirportSearchBar onSearchInput={handleSearch} searchAirportInput={originAirportInput} searchId='origin-search' searchLabel='Origin airport' />
          </Grid>
          <Grid item xs={6}>
            <AirportSearchBar onSearchInput={handleSearch} searchAirportInput={destinationAirportInput} searchId='destination-search' searchLabel='Destination airport' />

          </Grid>
          <Grid item xs={6}>
            <DatePicker label="Starting date" value={startingDate} format='DD/MM/YYYY'
              minDate={dayjs()}
              onChange={onStartChange}
              sx={{ width: '100%' }}
            />
          </Grid>
          {/* Support for two way flights will be comming soon */}
          {/* <Grid item xs={6}>
            <DatePicker label="Return date"
              sx={{ width: '100%' }}
              value={returnDate}
              format='DD/MM/YYYY'
              minDate={startingDate !== null ? startingDate.add(1, 'day') : undefined}
              onChange={onReturnChange} />
          </Grid> */}
          <Grid item xs={12} textAlign='center'>
            <Button variant='contained' size='large' endIcon={<SearchIcon />} onClick={handleSearchClick}>Find flights</Button>
          </Grid>
        </Grid>
        <Box>
          {/* {isValidData ? <FlightsList origin={originDebounce} destination={destinationDebounce}
            returnDate={returnDate!} startingDate={startingDate!} /> : null} */}
        </Box>
      </Container>
    </>
  )
}
