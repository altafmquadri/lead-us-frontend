import React from 'react';

const api = 'http://localhost:3000/api/v1/login'

class LoginForm extends React.Component {

    state = { 
        username: "",
        password: "",
     }

    formHandler = (e) => {
        this.setState({ [e.target.name]: e.target.value });
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
                console.log(user.leads)
                this.props.setCurrentUser(user)
            }
        })
        this.props.history.push('/')
    }
    
    
    render() { 
        // console.log(this.props)
        return ( 
            <div className="login-form-div">
                <form
                onSubmit={this.loginFormSubmission} 
                className="login-form">

                    <label>Username:
                        <input type="text" 
                        name="username"
                        value={this.state.username}
                        onChange={this.formHandler}
                        /></label><br/><br/>
                        

                    <label>Password:                
                        <input type="password"
                        value={this.state.password}
                        onChange={this.formHandler}
                        name="password" /></label><br/><br/>


                <input type="submit" value="Submit" />  
                </form>
            </div>
         );
    }
}
 
export default LoginForm;