import React from 'react';
import { useQuery } from 'react-query';
import { findFlights } from '../../apiCommunicator';
import { FlightDetailsResponse } from '../../interfaces/AvailableFlights';

interface PlanningData {
  origin: string, 
  destination: string,
  startingDate: Date, 
  returnDate: Date
}
export default function FlightsList(planningData: PlanningData) {

  const fetchFlights = async () => {
    return await findFlights(planningData.origin, planningData.destination, planningData.startingDate.toISOString(), planningData.returnDate.toISOString())
  }
  const {data, isSuccess, isError} = useQuery(['matchedFlights', planningData], fetchFlights);

  return (
    <></>
    // <Grid>

    // </Grid>
  )
}
