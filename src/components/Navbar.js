import React from 'react';
import './Navbar.css'

const Navbar = (props) => {
    return (
        
        <div className="navbar">
            {/* eslint-disable-next-line */}
            <a href="#">New Lead</a>
            {/* eslint-disable-next-line */}
            <a href="#">Profile</a>
            {/* eslint-disable-next-line */}
            <a href="#">Metrics</a>
            {/* eslint-disable-next-line */}
            <a href="#">Sign out</a>
        </div>
    )
}

export default Navbar;