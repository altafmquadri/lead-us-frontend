import React from 'react';
import './Navbar.css'
import { Link , Redirect} from 'react-router-dom'

const Navbar = (props) => {
    // console.log(props)
    return (
        <div className="navbar">
            {props.currentUser === null || localStorage.user_id === null ? <Link to="/login">Login</Link> : null}
            {props.currentUser ? <Link to="/">{props.currentUser.first_name}</Link>: <Redirect to='/login' />}
            {props.currentUser ? <Link to="/new">New Lead</Link>: null}
            {props.currentUser ? <Link to="/profile">Profile</Link>: null}
            {props.currentUser ? <Link to="/metrics">Metrics</Link>: null}
            {props.currentUser === null ? <Link to="/signup">Sign Up</Link> : null}
            {props.currentUser ? <Link onClick={props.logoutUser} to="/signout">Sign Out</Link>: null}
        </div>
    )
}

export default Navbar;