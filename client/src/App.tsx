import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import './styles/App.css';
import NavBar from './components/ui/NavBar';
import { LoggedIn } from './globals';


/**
 * Performs a check if the user is logged in by looking at the local storage of the browser.
 * 
 * @returns True if the user is already logged in
 */
function checkLogin() {
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
      </LoggedIn.Provider>
      </BrowserRouter>

    </>
  );
}

export default App;
