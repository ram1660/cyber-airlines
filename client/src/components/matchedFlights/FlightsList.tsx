import { useInfiniteQuery } from '@tanstack/react-query';
import { findFlights } from '../../apiCommunication/apiCommunicator';
import { FlightDetails } from '../../interfaces/AvailableFlights';
import dayjs from 'dayjs';
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';

interface PlanningData {
  origin: string,
  destination: string,
  startingDate: dayjs.Dayjs,
  returnDate: dayjs.Dayjs
}

// When the api is ready for pulling flights from the server test this component to make sure data is getting orginized correctly.
export default function FlightsList(planningData: PlanningData) {
  const fetchFlights = async ({ pageParam = 1 }) => {
    return await findFlights(planningData.origin, planningData.destination, planningData.startingDate.toISOString(),
      planningData.returnDate.toISOString(), pageParam);
  }

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isError,
  } = useInfiniteQuery({
    queryKey: ['matchedFlights'],
    getNextPageParam: (lastPage) => lastPage.nextPage,
    queryFn: fetchFlights
  });

  const handleLoadMore = () => {
    if (isFetchingNextPage)
      return <Typography variant='h3' component={'h3'}>Loading more flights! Please hold on!</Typography>;
    if (isError) 
      return <Typography variant='h3' component={'h3'}>Oops! It seems like there is an error!</Typography>;
    if (hasNextPage)
      return <Button onClick={() => fetchNextPage()} variant="contained">Load more flights</Button>
    return null;
  }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Company</TableCell>
            <TableCell align="right">Origin&nbsp;(g)</TableCell>
            <TableCell align="right">Destination&nbsp;(g)</TableCell>
            <TableCell align="right">Departure time&nbsp;(g)</TableCell>
            <TableCell align="right">Arrival time&nbsp;(g)</TableCell>
            <TableCell align="right">Purchase now!&nbsp;(g)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.pages.map((row, i: number) => row.flights.map((singleFlight: FlightDetails) => {
            <TableRow
              key={singleFlight.operator + i}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell>{singleFlight.operator}</TableCell>
              <TableCell>{singleFlight.origin}</TableCell>
              <TableCell>{singleFlight.destination}</TableCell>
              <TableCell>{singleFlight.departureTime}</TableCell>
              <TableCell>{singleFlight.arrivalTime}</TableCell>
            </TableRow>
          }))}
          {handleLoadMore()}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
