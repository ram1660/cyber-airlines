import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import './styles/App.css';
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

function App() {

  const dispatch = useDispatch();
  const checkLogin = async () => {
    if (window.localStorage.getItem('token') !== undefined) {
      const token = JSON.parse(window.localStorage.getItem('token')!);
      return await validateToken(token['accessToken']);

    }
    return false;
  }
  // const {isSuccess, data} = useQuery(['auth'], () => checkLogin());

  // if (isSuccess) {
  //   if ((data as boolean) === true){
  //     dispatch(signedIn);
  //   }
  // }

  return (
    <>
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
        <Route path='*' element={<PageNotFound />} />
      </Routes>
      <ReactQueryDevtools initialIsOpen={false} />
    </>
  );
}

export default App;
