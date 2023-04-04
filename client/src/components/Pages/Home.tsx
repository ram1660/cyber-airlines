import { Autocomplete, Box, Button, CssBaseline, Grid, TextField, Typography } from '@mui/material';
import { Container } from '@mui/system';
import React, { useRef, useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { useQuery } from 'react-query';
import { findAirports } from '../../apiCommunicator';
import { WEBSITE_NAME } from '../../globals'
import useDebounce from '../../hooks/useDebounce';
import FlightsList from './FlightsList';

const INITIAL_SEARCH_MESSAGE = 'Start typing to find an airport!';
const NO_AIRPORTS_FOUND = 'No airports found has been found with this name.';

export default function Home() {

  // Used for debouncing the search.
  const [originAirportInput, setOriginAirportInput] = useState('');
  const originDebounce = useDebounce(originAirportInput);

  const [destinationAirportInput, setDestinationAirportInput] = useState('');
  const destinationDebounce = useDebounce(destinationAirportInput);

  const [isValidData, setIsValidData] = useState(false);
  const [startingDate, setStartingDate] = useState<Date | null>(null);
  const [returnDate, setReturnDate] = useState<Date | null>(null);

  const onDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.id === 'starting-date') {
      if (returnDate === null) {
        setStartingDate(event.target.valueAsDate);
      } else {
        const startingDate = event.target.valueAsDate;
        if (startingDate!.getTime() > returnDate.getTime()) {
          return;
        }
        setStartingDate(startingDate);
      }
    } else {
      if (startingDate === null) {
        setReturnDate(event.target.valueAsDate);
      } else {
        const returningDate = event.target.valueAsDate;
        if (returningDate!.getTime() > startingDate.getTime()) {
          return;
        }
        setReturnDate(returningDate);
      }
    }
  }

  const getAirports = async (term: string) => {
    if (term === '') {
      return [INITIAL_SEARCH_MESSAGE];
    }
    const foundAirports = await findAirports(term);

    return foundAirports.matchedAirports.length === 0 ? [NO_AIRPORTS_FOUND] : foundAirports.matchedAirports.map((matchedAirport) => `${matchedAirport.name}, ${matchedAirport.city} ${matchedAirport.country}`);
  };

  const originSearchQuery = useQuery(['originSearch', originDebounce], () => getAirports(originDebounce));
  const destinationSearchQuery = useQuery(['destinationSearch', destinationDebounce], () => getAirports(destinationDebounce));

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
          <Grid item xs={12} mb={5}>
            <Typography variant='h3' component='h2'>Welcome to {WEBSITE_NAME}! Where do you want to fly?</Typography>
          </Grid>
          <Grid item xs={6}>
            <Autocomplete
              onInputChange={handleSearch}
              freeSolo
              getOptionDisabled={(option) => option === INITIAL_SEARCH_MESSAGE || option === NO_AIRPORTS_FOUND}
              options={originSearchQuery.data === undefined ? [INITIAL_SEARCH_MESSAGE] : originSearchQuery.data}
              getOptionLabel={(option) => option}
              renderInput={(params) => <TextField {...params} label='Origin airport' />}
              id='origin-search'
              filterOptions={(x) => x} />
          </Grid>
          <Grid item xs={6}>
            <Autocomplete onInputChange={handleSearch}
              freeSolo
              options={destinationSearchQuery.data === undefined ? [INITIAL_SEARCH_MESSAGE] : destinationSearchQuery.data}
              getOptionDisabled={(option) => option === INITIAL_SEARCH_MESSAGE}
              renderInput={(params) => <TextField {...params} label='Destination airport' />}
              id='destination-search'
              filterOptions={(x) => x} />
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="starting-date"
              label="Starting date"
              type="date"
              value={startingDate === null ? Date.now() : startingDate}
              onChange={onDateChange}
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="return-date"
              label="Return date"
              type="date"
              onChange={onDateChange}
              value={returnDate === null ? Date.now() : returnDate}
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={12} textAlign='center'>
            <Button variant='contained' size='large' endIcon={<SearchIcon />} onClick={handleSearchClick}>Find flights</Button>
          </Grid>
        </Grid>
        <Box>
          {isValidData ? <FlightsList origin={originDebounce} destination={destinationDebounce}
            returnDate={returnDate!} startingDate={startingDate!} /> : null}
        </Box>
      </Container>
    </>
  )
}
