import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import './styles/App.css';
import NavBar from './NavBar';

function App() {
  return (
    <>
      <BrowserRouter>
      <Route/>
      <Route/>
      <Route/>
        <NavBar />
      </BrowserRouter>

    </>
  );
}

export default App;
