import { Autocomplete, CssBaseline, TextField, Typography } from '@mui/material'
import { Container } from '@mui/system'
import React, { useEffect, useMemo, useState } from 'react'
import { useQuery } from 'react-query';
import { findAirports } from '../../apiCommunicator';
import { WEBSITE_NAME } from '../../globals'
import useDebounce from '../../hooks/useDebounce';

const INITIAL_SEARCH_MESSAGE = 'Start typing to find an airport!';

export default function Home() {
  // Used for the list UI.
  const [originAirports, setOriginAirports] = useState([INITIAL_SEARCH_MESSAGE]);
  const [destinationAirports, setDestinationAirports] = useState([INITIAL_SEARCH_MESSAGE]);

  // Used for debouncing the search.
  const [originAirportInput, setOriginAirportInput] = useState('');
  const originDebounce = useDebounce(originAirportInput);

  const [destinationAirportInput, setDestinationAirportInput] = useState('');
  const destinationDebounce = useDebounce(destinationAirportInput);


  const getAirports = async (term: string) => {
    if (term === '') {
      return;
    }
    const foundAirports = await findAirports(term);
    console.log(foundAirports);
    
    return foundAirports.matchedAirports.map((matchedAirport) => `${matchedAirport.name}, ${matchedAirport.city} ${matchedAirport.country}`);
  };

  const originSearchQuery = useQuery(['originSearch', originDebounce], () => getAirports(originDebounce));
  const destinationSearchQuery = useQuery(['destinationSearch', destinationDebounce], () => getAirports(destinationDebounce));
  
  // const originFoundAirports = useMemo(() => originSearchQuery.data?.matchedAirports.map((matchedAirport) => {
  //   return `${matchedAirport.name}, ${matchedAirport.city} ${matchedAirport.country}`
  // }), [originSearchQuery.data]);
  // const destinationFoundAirports = useMemo(() => destinationSearchQuery.data?.matchedAirports.map((matchedAirport) => {
  //   return `${matchedAirport.name}, ${matchedAirport.city} ${matchedAirport.country}`
  // }), [originSearchQuery.data]);
  // if (originSearchQuery.isSuccess) {
  //   const originAirportsInfo = originSearchQuery.data?.matchedAirports.map((matchedAirport) => {
  //     return `${matchedAirport.name}, ${matchedAirport.city} ${matchedAirport.country}`
  //   });
  //   setOriginAirports(originAirportsInfo!);
  // }
// if (originSearchQuery.isSuccess) {
//   setOriginAirports(originAirports!); 
// }
// if (destinationSearchQuery.isSuccess) {
//   setDestinationAirports(destinationAirports!);
// }
  // if (destinationSearchQuery.isSuccess) {
  //   const destinationAirportsInfo = destinationSearchQuery.data?.matchedAirports.map((matchedAirport) => {
  //     return `${matchedAirport.name}, ${matchedAirport.city} ${matchedAirport.country}`
  //   });
  //   setDestinationAirports(destinationAirportsInfo!);
  // }

  // Listening for a change in either the origin input or the destination input and updating the internal value before debouncing it.
  const handleSearch = (event: React.SyntheticEvent, value: string, reason: string) => {
    if (event.currentTarget.id === 'origin-search') {
      if (value === '') {
        setOriginAirports([INITIAL_SEARCH_MESSAGE]);
        return;
      }
      setOriginAirportInput(value);
    } else {
      if (value === '') {
        setDestinationAirports([INITIAL_SEARCH_MESSAGE]);
        return;
      }
      setDestinationAirportInput(value);
    }
  };

  return (
    <>
      <CssBaseline />
      <Container sx={{ justifyContent: 'center' }} component='main' maxWidth='xl'>
        <Typography variant='h3' component='h2'>Welcome to {WEBSITE_NAME}! Where do you want to fly?</Typography>

        <Autocomplete
          onInputChange={handleSearch}
          options={originSearchQuery.data === undefined ? [] : originSearchQuery.data}
          getOptionLabel={(option) => option}
          renderInput={(params) => <TextField {...params} label='Origin airport' />}
          id='origin-search'
          filterOptions={(x) => x} />
        <Autocomplete onInputChange={handleSearch}
          options={destinationSearchQuery.data === undefined ? [] : destinationSearchQuery.data}
          renderInput={(params) => <TextField {...params} label='Destination airport' />}
          id='destination-search'
          filterOptions={(x) => x} />
      </Container>
    </>
  )
}
