import { Container, CssBaseline, Icon, SvgIcon, Typography } from '@mui/material'
import Grid2 from '@mui/material/Unstable_Grid2/Grid2'
import { useQuery } from '@tanstack/react-query'
import IProfile from '../../interfaces/Profile'
import { getCustomerProfile } from '../../apiCommunicator'
import AccountBoxIcon from '@mui/icons-material/AccountBox';
interface ProfileData extends IProfile {

};

export default function CustomerProfile() {
  const getData = async (): Promise<ProfileData> => {
    const token = JSON.parse(localStorage.getItem('token')!) as any;
    const customerProfileData = (await getCustomerProfile(token.username, token.accessToken)).message as any
    const profile: ProfileData = {
      profileName: customerProfileData.firstName + ' ' + customerProfileData.lastName
    }
    return profile;
  }

  const customerData = useQuery({ queryKey: ['customerProfile'], queryFn: getData });
  console.log(customerData.data);

  return (
    <>
      <CssBaseline />
      <Container component='main'>
        <Grid2 container ml='50px' mt="50px">
          <Grid2 xs={4}>
            <SvgIcon component={AccountBoxIcon} fontSize='large'/>
            <Typography variant='h3' component='p'>{customerData.data?.profileName}</Typography>
          </Grid2>
        </Grid2>
      </Container>
    </>
  )
}
