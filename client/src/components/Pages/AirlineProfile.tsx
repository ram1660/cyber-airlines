import { Avatar, CssBaseline, Divider, Skeleton, Typography } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2';
import AirlinesIcon from '@mui/icons-material/Airlines';
import { Container } from '@mui/system';
import { getAirlineProfile } from '../../apiCommunicator';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';

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
