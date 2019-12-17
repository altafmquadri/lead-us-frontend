import React from 'react';
import './Navbar.css'
import { Link } from 'react-router-dom'

const Navbar = (props) => {
    return (
        <div className="navbar">
            {<Link to="/">Home</Link>}
            {<Link to="/new">New Lead</Link>}
            {<Link to="/profile">Profile</Link>}
            {<Link to="/metrics">Metrics</Link>}
            {<Link to="/signout">Sign Out</Link>}
            {<Link to="/signup">Sign Up</Link>}
        </div>
    )
}

export default Navbar;