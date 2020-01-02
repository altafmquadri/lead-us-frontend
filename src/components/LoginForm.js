import React from 'react';
import './Forms.css'

const api = 'http://localhost:3000/api/v1/login'

class LoginForm extends React.Component {

    state = { 
        username: "",
        password: "",
        latitude: 0.0,
        longitude: 0.0
    }

    formHandler = (e) => {
        this.setState({ [e.target.name]: e.target.value }, () => this.getMyLocation)
    }

    loginFormSubmission = (e) => {
        e.preventDefault()
        
        fetch(api, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                Accepts: 'application/json'
            },
            body: JSON.stringify(this.state)
        }).then(res => res.json()).then(user => {
            if (user.errors) {
                alert(user.errors)
            } else {
                this.props.setCurrentUser(user)
            }
        })   
    }

    componentDidMount() {
        this.getMyLocation()
    }

    getMyLocation = () => {
        const options = {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge:0
        }
        const success = (position) => {
            const coordinateObj = position.coords
            this.setState(
                { 
                    latitude: coordinateObj.latitude,  
                    longitude: coordinateObj.longitude
                })
        }
        const error = (err) => {
            console.warn(`ERROR'(${err.code})): ${err.message}`)
        }

        navigator.geolocation.getCurrentPosition(success, error, options)
    }
    
    
    render() { 
        return ( 
            <div className="login-form-div">
                <form
                onSubmit={this.loginFormSubmission} 
                className="login-form">

                <div className="label-input"> 
                    <label>Username:</label>
                        <input className="form-input" type="text" 
                        name="username"
                        value={this.state.username}
                        onChange={this.formHandler}
                        />
                </div> 
                
                <div className="label-input"> 
                    <label>Password:</label>             
                        <input className="form-input" type="password"
                        value={this.state.password}
                        onChange={this.formHandler}
                        name="password" />
                </div>

                <div className="submit">
                    <input className="submit-btn" type="submit" value="Submit" />  
                </div>
                </form>
            </div>
        );
    }
}

export default LoginForm;