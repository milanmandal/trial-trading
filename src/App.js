import React, { Component } from 'react'
import Navbar from './components/nav'
import CreateStock from './components/addstock'
import trade from './components/trade'
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route} from "react-router-dom";

function App()
{


  
  return(
    
    <Router>
      
      <Navbar/>
      
      <div>
       
      
       <Route path="/" exact component={trade} />
       <Route path="/admin" component={CreateStock} />
       
      </div>
      
    </Router>
  )
    

 
}

export default App
