import { Autocomplete, Box, Button, CssBaseline, Grid, TextField, Typography } from '@mui/material';
import { Container } from '@mui/system';
import React, { useRef, useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import SearchIcon from '@mui/icons-material/Search';
import { useQuery } from '@tanstack/react-query';
import { findAirports } from '../../apiCommunicator';
import { WEBSITE_NAME } from '../../globals'
import useDebounce from '../../hooks/useDebounce';
import FlightsList from '../matchedFlights/FlightsList';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { WidthFull } from '@mui/icons-material';
import AirportSearchBar from '../AirportSearchBar';

const INITIAL_SEARCH_MESSAGE = 'Start typing to find an airport!';
const NO_AIRPORTS_FOUND = 'No airports found has been found with this name.';

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

  const onStartChange = (newDate: any) => {
    setStartingDate(dayjs(newDate));
  }

  const getAirports = async (term: string) => {
    if (term === '') {
      return [INITIAL_SEARCH_MESSAGE];
    }
    const foundAirports = await findAirports(term);

    return foundAirports.matchedAirports.length === 0 ? [NO_AIRPORTS_FOUND] : foundAirports.matchedAirports.map((matchedAirport) => `${matchedAirport.name}, ${matchedAirport.city} ${matchedAirport.country}`);
  };


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
            {/* <Autocomplete
              onInputChange={handleSearch}
              freeSolo
              getOptionDisabled={(option) => option === INITIAL_SEARCH_MESSAGE || option === NO_AIRPORTS_FOUND}
              options={originSearchQuery.data === undefined ? [INITIAL_SEARCH_MESSAGE] : originSearchQuery.data}
              getOptionLabel={(option) => option}
              renderInput={(params) => <TextField {...params} label='Origin airport' />}
              id='origin-search'
              filterOptions={(x) => x} /> */}
          </Grid>
          <Grid item xs={6}>
            {/* <Autocomplete onInputChange={handleSearch}
              freeSolo
              options={destinationSearchQuery.data === undefined ? [INITIAL_SEARCH_MESSAGE] : destinationSearchQuery.data}
              getOptionDisabled={(option) => option === INITIAL_SEARCH_MESSAGE}
              renderInput={(params) => <TextField {...params} label='Destination airport' />}
              id='destination-search'
              filterOptions={(x) => x} /> */}
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
