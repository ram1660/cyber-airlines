import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './styles/App.css';
import NavBar from './components/ui/NavBar';
import { LoggedIn } from './globals';
import CustomerSignIn from './components/Pages/registersAndLogins/CustomerSignIn';
import CustomerSignUp from './components/Pages/registersAndLogins/CustomerSignUp';
import Home from './components/Pages/Home';
import PageNotFound from './components/Pages/PageNotFound';
import AirlineProfile from './components/Pages/AirlineProfile';
import AirLineSignUp from './components/Pages/registersAndLogins/AirlineSignUp';
import AirlinesSignIn from './components/Pages/registersAndLogins/AirlineSignIn';


/**
 * Performs a check if the user is logged in by looking at the local storage of the browser.
 * 
 * @returns True if the user is already logged in
 */
function checkLogin() {
  // Perform a server JWT validation.
  if (!window.localStorage.getItem('token')) {
    window.localStorage.setItem('token', '');
  }
  return window.localStorage.getItem('token') === '' ? false : true;
}

function App() {
  return (
    <>
      <BrowserRouter>
        <LoggedIn.Provider value={checkLogin()}>
          <NavBar />
          <Routes>
            <Route path='/login'>
              <Route index element={<CustomerSignIn />} />
              <Route path='airline' element={<AirlinesSignIn/>}/>
            </Route>
            <Route path='/register'>
              <Route index element={<CustomerSignUp />} />
              <Route path='airline' element={<AirLineSignUp />} />
            </Route>
            <Route path='/' element={<Home />} />
            <Route path='/home' element={<Home />} />
            <Route path='/airline/profile/:airlineId' element={<AirlineProfile />} />
            <Route path='*' element={<PageNotFound />} />
          </Routes>

        </LoggedIn.Provider>
      </BrowserRouter>

    </>
  );
}

export default App;
