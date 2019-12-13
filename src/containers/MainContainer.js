import React from 'react';
import LeadsContainer from './LeadsContainer';
import AppointmentsContainer from './AppointmentsContainer';
import './MainContainer.css'

const api = 'http://localhost:3000/api/v1/users'

class MainContainer extends React.Component {


    state = { 
        users: [],
        currentUser: [],
        leads: [],
        appointments: []
     }

     componentDidMount() {
         return fetch(api).then(res => res.json()).then(res => this.setState(
             { 
                users: res.users,
                currentUser: res.users[0], //will have to implement some logic to get the current user  
                leads: res.users[0].leads,
                appointments: res.users[0].appointments
            }))
            
     }

    

    render() { 
        
        console.log("i am from ",this.state.users)
        return ( 
           <div className="main-container">
               <LeadsContainer leads={this.state.leads}/>
               <AppointmentsContainer appointments={this.state.appointments}/>
           </div> 
         );
    }
}
 
export default MainContainer;