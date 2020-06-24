/*import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
*/


import React, { Component } from 'react'
import Navbar from './components/nav'
import addstock from './components/addstock'
import trade from './components/trade'
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route} from "react-router-dom";
import Calculation from './components/calc';

function App()
{
  return(
    
    <Router>
      <Navbar/>
      <div>
       
       <Route path="/" exact component={addstock} />
       <Route path="/trade/" component={trade} />
       


       

      </div>
      
    </Router>
    

  );
}

export default App
