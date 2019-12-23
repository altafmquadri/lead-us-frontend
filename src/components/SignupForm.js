import React from 'react';

const api = 'http://localhost:3000/api/v1/users'

class SignupForm extends React.Component {

    state = { 
        username: "",
        first_name: "",
        last_name: "",
        company_name: "",
        password: "",
        password_confirmation: "",
        latitude: 0,
        longitude: 0
    }

    formHandler = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    signupFormSubmission = (e) => {
        e.preventDefault()
        if (this.state.password === this.state.password_confirmation) {

            fetch(api, {
                method: 'POST',
                headers: {
                    "Content-type": "application/json",
                    Accepts: "application/json",
                },
                body: JSON.stringify(this.state)
            }).then(res => res.json()).then(user => {
                if(user.errors) {
                    alert(user.errors)
                } else {
                    this.props.setCurrentUser(user)
                }
            })
        } else {
            alert("Passwords do not match")
        }
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
        // console.log(this.props)
        return ( 
            <div className="signup-form-div">
                <form
                onSubmit={this.signupFormSubmission} 
                className="signup-form">

                    <label>Username:
                    <input type="text" 
                    name="username"
                    value={this.state.username}
                    onChange={this.formHandler}
                    /></label><br/><br/>
                    
                    
                    <label>First Name:
                    <input type="text" 
                    name="first_name"
                    value={this.state.first_name}
                    onChange={this.formHandler}
                    /></label><br/><br/>

                <label>Last Name:           
                    <input type="text"
                    value={this.state.last_name}
                    onChange={this.formHandler}
                    name="last_name" /></label><br/><br/>

                <label>Company Name:              
                    <input type="text"
                    value={this.state.company_name}
                    onChange={this.formHandler}
                    name="company_name" /></label><br/><br/>

                <label>Password:                
                    <input type="password"
                    value={this.state.password}
                    onChange={this.formHandler}
                    name="password" /></label><br/><br/>


                <label>Password Confirmation:                
                    <input type="password"
                    value={this.state.password_confirmation}
                    onChange={this.formHandler}
                    name="password_confirmation" /></label><br/><br/>

                <input type="submit" value="Submit" />  
            </form>
            </div>
        );
    }
}

export default SignupForm;