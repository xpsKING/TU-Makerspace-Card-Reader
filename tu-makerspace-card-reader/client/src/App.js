// import './App.css';
import mill from './mill.png';
import bandsaw from './bandsaw.jpeg';
import tempimage from './tempimage.png';
import axios from 'axios';
import SwitchUnstyled from '@mui/base/SwitchUnstyled';
import React from 'react';
import { getUser, disableMachine, toggleMachine, getAllMachines } from './APIRoutes';
import Root from './switchtheme.js'
import MachineView from './MachineView.js';
import { Routes, Route, Link } from "react-router-dom";


function Home(){
  return(
    <>
      <main>
        <h2>Welcome to the homepage!</h2>
        <p>You can do this, I believe in you.</p>
      </main>
      <nav> 
        <Link to="/about">About</Link>
      </nav>
    </>
  )
}


function App() {
  return (
    <div className="App">
    <h1>Welcome to React Router!</h1>
    <Routes>
      <Route path= "/" element = {<Home />} />
      <Route path= "metalShop1" element = {<MachineView machineGroup="metalShop1" />} />
    {/* Maddie add a path for add user when u wanna start working on that and you now have a new page for that function! */}
    </Routes>
    </div>
  );
}

export default App;


