import React from 'react';

class Profile extends React.Component {

    state = { 
        currentUser: '',
        archived: [],
        pastClients: []
    }

    componentDidMount() {
        this.setState(
            { 
                currentUser: this.props.currentUser,
                archived: this.props.archived,
                pastClients: this.props.pastClients
            })
    }

    renderArchived = () => {
        if (this.state.archived === undefined) return
        return this.state.archived.map(lead => <li key={lead.id}>{`${lead.first_name} ${lead.last_name}`}</li>)
    }

    renderPC = () => {
        if (this.state.pastClients === undefined) return
        return this.state.pastClients.map(lead => <li key={lead.id}>{`${lead.first_name} ${lead.last_name}`}</li>)
    }
    
    render() { 
        console.log(this.props)
        const { company_name, username, id, first_name, last_name} = this.state.currentUser
        return ( 
            <div className="profile-card">
                <h1>{company_name}</h1>
                <hr></hr>
                <div className="profile-container">
                    
                    <div className="profile">
                        <h4>Username: {username}</h4>
                        <p>Sales ID: {id}</p>
                        <p>Name: {`${first_name} ${last_name}`}</p>
                    </div>

                    <div className="past-clients-container">
                        <h1>past clients</h1>
                        <hr></hr>
                        <ol>
                            {this.renderPC()}
                        </ol>
                    </div>

                    <div className="archived-clients-container">
                        <h1>archived leads</h1>
                        <hr></hr>
                        <ol>
                            {this.renderArchived()}
                        </ol>
                    </div>


                </div>
            </div>
        );
    }
}

export default Profile;