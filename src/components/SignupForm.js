import React from 'react';
import './Forms.css'

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
                if (user.errors) {
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
            maximumAge: 0
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
            <div className="signup-form-div">
                <form
                    className="signup-form"
                    onSubmit={this.signupFormSubmission}>

                    <div className="label-input">
                        <label>Username:</label>
                            <input type="text" className="form-input" 
                                name="username"
                                value={this.state.username}
                                onChange={this.formHandler}/>
                    </div>

                    <div className="label-input">
                        <label>First Name:</label>
                            <input type="text" className="form-input" 
                                name="first_name"
                                value={this.state.first_name}
                                onChange={this.formHandler}/>
                    </div>

                    <div className="label-input">
                        <label>Last Name:</label>
                            <input type="text" className="form-input" 
                                value={this.state.last_name}
                                onChange={this.formHandler}
                                name="last_name"/>
                    </div>

                    <div className="label-input">
                        <label>Company Name:</label>
                            <input type="text" className="form-input" 
                                value={this.state.company_name}
                                onChange={this.formHandler}
                                name="company_name"/>
                    </div>
                    
                    <div className="label-input">
                        <label>Password:</label>
                            <input type="password" className="form-input" 
                                value={this.state.password}
                                onChange={this.formHandler}
                                name="password" />
                    </div>

                        <div className="label-input">
                            <label>Password Confirmation:</label>
                                <input type="password" className="form-input" 
                                    value={this.state.password_confirmation}
                                    onChange={this.formHandler}
                                    name="password_confirmation" />
                        </div>

                        <div className="submit">
                            <input className="submit-btn" type="submit" value="Submit" />  
                        </div>
                </form>
            </div>
                );
            }
        }

export default SignupForm;