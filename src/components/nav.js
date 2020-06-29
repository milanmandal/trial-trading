import React, { Component } from 'react';
import {Link} from 'react-router-dom';


//var user = prompt('Enter 0000 for trading \n Enter Pin for Admin purpose')

export default class Navbar extends Component {
    render() {
      
     
            return (
                <div >
                    <nav className="navbar navbar-dark bg-dark navbar-expand-lg ">
                        <Link to="nil" className="navbar-brand ">TEC CLUB</Link>
                        <div className="collpase navbar-collapse">
                        <ul className="navbar-nav ">
                        <li className="navbar-item">
                        <Link to="/" className="nav-link right">Stock Trade</Link>
                        </li>
                        <li className="navbar-item">
                        <Link to="/admin" className="nav-link right">Admin</Link>
                        </li>
                       
                        </ul>
                      
                        </div>
                    </nav>
                </div>                
            )
        
    }
}


