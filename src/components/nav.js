import React, { Component } from 'react';
import {Link} from 'react-router-dom';

export default class Navbar extends Component {
    render() {
        return (
            <div>
                <nav className="navbar navbar-dark bg-dark navbar-expand-lg ">
                    <Link to="/" className="navbar-brand">TEC LOGO</Link>
                    <div className="collpase navbar-collapse">
                    
                    <ul className="navbar-nav ">

                    <li className="navbar-item">
                    <Link to="/" className="nav-link">Home</Link>
                    </li>

                    <li className="navbar-item">
                    <Link to="/about" className="nav-link">About</Link>
                    </li>


                    <li className="navbar-item">
                    <Link to="/schedule" className="nav-link right">Schedule</Link>
                    </li>

                    <li className="navbar-item">
                    <Link to="/contact" className="nav-link right">Contact</Link>
                    </li>

                    <li className="navbar-item">
                    <Link to="/trade" className="nav-link right">StockTrade</Link>
                    </li>

                    </ul>
                  
                    </div>
                </nav>
            </div>
        )
    }
}


