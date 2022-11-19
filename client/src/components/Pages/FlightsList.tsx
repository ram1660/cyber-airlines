import React from 'react';
import { useQuery } from 'react-query';
import { FlightDetailsResponse } from '../../interfaces/AvailableFlights';


export default function FlightsList(dates: {departureDate: string, arrivalDate: string}) {

  const fetchFlights = () => {

  }
  const flightsQuery = useQuery(['matchedFlights', dates], fetchFlights);

  return (
    <></>
    // <Grid>

    // </Grid>
  )
}
