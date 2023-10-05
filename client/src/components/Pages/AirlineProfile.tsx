import AirlinesIcon from '@mui/icons-material/Airlines';
import { Avatar, CssBaseline, Skeleton, Typography } from '@mui/material';
import { Container } from '@mui/system';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { getAirlineProfile } from '../../apiCommunication/airlineAPI';

export interface AirlineData {
  airlineName: string;
  availableFlights: number;
}

export default function AirlineProfile() {
  const navigator = useNavigate();
  const getProfile = async () => {
    const airlineName = window.location.href.split('/').at(-1)!;
    console.log(airlineName);

    return await getAirlineProfile(airlineName);
  };
  const { isLoading, isError, data } = useQuery(['profile'], getProfile);
  if (isError === true) {
    navigator('/');
  }
  return (
    <>
      <CssBaseline />
      <Container component='main'>
        <Avatar sx={{ m: 1 }}>
          <AirlinesIcon fontSize='large' />
        </Avatar>
        <Typography variant='h3' >
          {isLoading === true ? <Skeleton /> : data?.airlineName}
        </Typography>
        <Typography variant='body1' mt={2}>
          {isLoading === true ? <Skeleton /> : `Currently available tickets: ${data?.availableFlights}`}
        </Typography>
      </Container>
    </>
  )
}
