import React from 'react';
import { useInfiniteQuery } from 'react-query';
import { FlightDetailsResponse } from '../../interfaces/AvailableFlights';


export default function FlightsList(flights: FlightDetailsResponse) {

  const fetchFlights = () => {
    
  }
  const flightsQuery = useInfiniteQuery('flights');

    return (
      <></>
        // <Grid>

        // </Grid>
  )
}
