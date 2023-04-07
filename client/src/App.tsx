import { Route, Routes } from 'react-router-dom';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import NavBar from './components/ui/NavBar';
import CustomerSignIn from './components/Pages/registersAndLogins/CustomerSignIn';
import CustomerSignUp from './components/Pages/registersAndLogins/CustomerSignUp';
import Home from './components/Pages/Home';
import PageNotFound from './components/Pages/PageNotFound';
import AirlineProfile from './components/Pages/AirlineProfile';
import AirLineSignUp from './components/Pages/registersAndLogins/AirlineSignUp';
import AirlinesSignIn from './components/Pages/registersAndLogins/AirlineSignIn';
import { ReactQueryDevtools } from 'react-query/devtools';
import { useQuery } from 'react-query';
import { validateToken } from './apiCommunicator';
import { useDispatch } from 'react-redux';
import { signedIn } from './features/authenticateSlice';
import { ValidateCredentials } from './interfaces/loginForm';
import { setAirlineUser, setCustomerUser } from './features/userSlice';
import LogoutScreen from './components/Pages/registersAndLogins/LogoutScreen';
import { useEffect } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers';

function App() {

  const dispatch = useDispatch();
  const checkLogin = async () => {
    if (window.localStorage.getItem('token') !== null) {
      const token = JSON.parse(window.localStorage.getItem('token')!);
      const userIdentity: ValidateCredentials = {
        token: token['accessToken'],
        type: token['type'],
        username: token['username']
      };
      userIdentity.type === 'CUSTOMER' ? dispatch(setCustomerUser()) : dispatch(setAirlineUser());
      return await validateToken(userIdentity);

    }
    return false;
  }
  const { isSuccess, data } = useQuery(['auth'], () => checkLogin());
  useEffect(() => {
    if (isSuccess) {
      if ((data as boolean) === true) {
        dispatch(signedIn());
      }
    }
  }, [isSuccess]);


  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <NavBar />
        <Routes>
          <Route path='/login'>
            <Route index element={<CustomerSignIn />} />
            <Route path='airline' element={<AirlinesSignIn />} />
          </Route>
          <Route path='/register'>
            <Route index element={<CustomerSignUp />} />
            <Route path='airline' element={<AirLineSignUp />} />
          </Route>
          <Route path='/' element={<Home />} />
          <Route path='/home' element={<Home />} />
          <Route path='/airline/profile/:airlineName' element={<AirlineProfile />} />
          <Route path='/logout' element={<LogoutScreen />} />
          <Route path='*' element={<PageNotFound />} />
        </Routes>
        <ReactQueryDevtools initialIsOpen={false} />
      </LocalizationProvider>
    </>
  );
}

export default App;
