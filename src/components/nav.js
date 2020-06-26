import React, { Component } from 'react';
import {Link} from 'react-router-dom';


var user = prompt('Enter 0000 for trading \n Enter Pin for Admin purpose')

export default class Navbar extends Component {
    render() {
        if(user=='1234')
        {
        return (
            <div >
                <nav className="navbar navbar-dark bg-dark navbar-expand-lg ">
                    <Link to="/" className="navbar-brand">TEC LOGO</Link>
                    <div className="collpase navbar-collapse">
                    
                    <ul className="navbar-nav ">

                    <li className="navbar-item">
                    <Link to="/" className="nav-link">Home</Link>
                    </li>
                  

                    <li className="navbar-item">
                    <Link to="/stock" className="nav-link right">StockTrade</Link>
                    </li>

                    </ul>
                  
                    </div>
                </nav>
            </div>
        )
        }
        if(user=='0000')
        {
            return (
                <div >
                    <nav className="navbar navbar-dark bg-dark navbar-expand-lg ">
                        <Link to="nil" className="navbar-brand">TEC LOGO</Link>
                        <div className="collpase navbar-collapse">
                        <ul className="navbar-nav ">
                        <li className="navbar-item">
                        <Link to="/stock" className="nav-link right"></Link>
                        </li>
                        <h4 className="text-white m-2 font-weight-bold">Welcome to Stock Trade</h4>
                        </ul>
                      
                        </div>
                    </nav>
                </div>                
            )
        }
    }
}


