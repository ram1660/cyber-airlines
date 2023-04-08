import React from 'react';
import { isError, useInfiniteQuery } from '@tanstack/react-query';
import { findFlights } from '../../apiCommunicator';
import { FlightDetails, FlightDetailsResponse } from '../../interfaces/AvailableFlights';
import dayjs from 'dayjs';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';

interface PlanningData {
  origin: string,
  destination: string,
  startingDate: dayjs.Dayjs,
  returnDate: dayjs.Dayjs
}

export default function FlightsList(planningData: PlanningData) {

  const [matchedFlights, setMatchedFlights] = React.useState<FlightDetails[]>([]);

  const fetchFlights = async ({ pageParams = 0 }) => {
    const data: FlightDetailsResponse = await findFlights(planningData.origin, planningData.destination, planningData.startingDate.toISOString(),
      planningData.returnDate.toISOString(), pageParams);

    matchedFlights.concat(data.flights);
    setMatchedFlights(matchedFlights);
    return data;
  }

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isLoading,
    error,
  } = useInfiniteQuery('matchedFlights', fetchFlights, {
    getNextPageParam: (lastPage) => lastPage.nextPage,
    
  });

  return (
    <TableContainer component={Paper} onScroll={ }>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Company</TableCell>
            <TableCell align="right">Calories</TableCell>
            <TableCell align="right">Origin&nbsp;(g)</TableCell>
            <TableCell align="right">Destination&nbsp;(g)</TableCell>
            <TableCell align="right">Departure time&nbsp;(g)</TableCell>
            <TableCell align="right">Arrival time&nbsp;(g)</TableCell>
            <TableCell align="right">Purchase now!&nbsp;(g)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.pages.map((row, i: number) => (
            <TableRow
              key={row}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
            </TableRow>
          ))}
          {isLoading ? <Typography variant='h3' component={'h3'}>Loading more flights! Please hold on!</Typography> : null}
          {isError ? <Typography variant='h3' component={'h3'}>Oops! It seems like there is an error!</Typography> : null}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
