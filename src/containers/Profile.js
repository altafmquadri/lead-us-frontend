import React from 'react';

class Profile extends React.Component {

    state = { 
        currentUser: ''
    }

    componentDidMount() {
        this.setState({ currentUser: this.props.currentUser });
    }
    
    render() { 
        const { company_name, username, id, first_name, last_name} = this.state.currentUser
        return ( 
            <div className="profile-card">
                <h1>{company_name}</h1>
                <hr></hr>
                <h4>Username: {username}</h4>
                <p>Sales ID: {id}</p>
                <p>Name: {`${first_name} ${last_name}`} </p>

            </div>
        );
    }
}

export default Profile;