import React from 'react';
import Navbar from './components/Navbar'
import MainContainer from './containers/MainContainer';
import NewLeadContainer from './containers/NewLeadContainer';

import {Switch, Route, withRouter } from "react-router-dom";
import LeadActivityContainer from './containers/LeadActivityContainer';
import SignupForm from './components/SignupForm';
import LoginForm from './components/LoginForm'

const api = 'http://localhost:3000/api/v1/users'

class App extends React.Component {

  state = { 
    // users: [],
    currentUser: null,
    leads: [],
    appointments: [],
    calls: [],
    clickedLead: [],
    clickedLeadCalls: [],
    clickedLeadAppointments: [],
    loading: true
 }

 setCurrentUser = (user) => {
   this.setState(
     { 
       currentUser: user,
       leads: user.leads,
       calls: user.calls,
       appointments: user.appointments

      });
 }

 findLeadName = (id) => {
   let name
   let lead = this.state.leads.find(lead => lead.id === id)
   name = `${lead.first_name} ${lead.last_name}`
   return name
 }

 //triggered by new lead form
 addNewLead = (newLead) => {
    this.setState (
      {
        ...this.state, 
        leads:  [...this.state.leads, newLead]
        
      }) 
 }

 addNewCall = (newCall) => {
   this.setState(
     {
       ...this.state,
       calls: [...this.state.calls, newCall],
       clickedLeadCalls: [...this.state.clickedLeadCalls, newCall]  
    });
 }

 addNewAppointment = (newAppointment) => {
  this.setState(
    {
      ...this.state,
      appointments: [...this.state.appointments, newAppointment],
      clickedLeadAppointments: [...this.state.clickedLeadAppointments, newAppointment]  
   });
 }

 //written for the cancel button on appointment form
 editCallNoApp = (call) => {
   this.setState(
     { 
        ...this.state,
        calls: [...this.state.calls.map(stateCall => {
            if (stateCall.id === call.id) {
              return call
            } else {
              return stateCall
            }
        })],  
        clickedLeadCalls: [...this.state.clickedLeadCalls.map(stateCall => {
          if (stateCall.id === call.id) {
            return call
          } else {
            return stateCall
          }
      })]
    });
 }

 componentDidMount() {
  if (!this.state.currentUser) {
    this.props.history.push('/login')
  }
     return fetch(api).then(res => res.json()).then(res => this.setState(
         { 
            // users: res.users,
            // currentUser: res.users[0], //will have to implement some logic to get the current user  
             //leads: currentUser.leads,
            // appointments: res.users[0].appointments,
            // calls: res.users[0].calls,
            //leads: this.state.currentUser ? this.state.currentUser.leads : [],
            //appointments: this.state.currentUser ? this.state.currentUser.appointments : null,
            //calls: this.state.currentUser ? this.state.currentUser.calls : null,
            clickedLead: [],
            clickedLeadCalls: [],
            clickedLeadAppointments: [],
            loading: false //added for purpose of establishing dynamic routes
        }))    
 }

 //to point us to the lead show page
 onLeadClick = (leadData) => {
  //  console.log("i am the clicked lead", leadData.lead)
   this.setState(
     { 
       clickedLead: leadData.lead,
       clickedLeadCalls: this.state.calls.filter(calls => calls.lead_id === leadData.lead.id), 
       clickedLeadAppointments: this.state.appointments.filter(appointments => appointments.lead_id === leadData.lead.id)
      }, () => {
     this.props.history.push(`/leads/${leadData.lead.id}`)
   }) 
 }

  render() {
    // console.log("i am clicked lead calls",this.state.clickedLeadCalls)
    //console.log(this.state.currentUser)
    // console.log(this.state.currentUser.leads)
    console.log(this.state.appointments)

    
      // <Redirect from='/' to='/login'/>
    

    if (this.state.loading) {
      return <h1>Loading...</h1>
    }

    return (
      <div className="main-page-container">
          <div>
              <Navbar />
              <Switch>
              
  }
                <Route path="/leads/:id" render={(routerProps) => <LeadActivityContainer 
                currentUser={this.state.currentUser}
                lead={this.state.clickedLead}
                calls={this.state.clickedLeadCalls}
                clickedLeadAppointments={this.state.clickedLeadAppointments}
                addNewCall={this.addNewCall}
                addNewAppointment={this.addNewAppointment}
                editCallNoApp={this.editCallNoApp}
                {...routerProps}/> }></Route>

                <Route path="/new" render={(routerProps) => <NewLeadContainer
                currentUser={this.state.currentUser} 
                addNewLead={this.addNewLead} 
                {...routerProps}/>}></Route> 

                <Route path="/signup" render={(routerProps) => <SignupForm {...routerProps} setCurrentUser={this.setCurrentUser}/>}></Route>

                <Route path="/login" render={(routerProps) => <LoginForm {...routerProps} setCurrentUser={this.setCurrentUser}/>}></Route>

                <Route exact path="/" render={(routerProps) =>  <MainContainer 
                leads={this.state.leads} onLeadClick={this.onLeadClick} currentUser={this.state.currentUser}
                appointments={this.state.appointments} findLeadName={this.findLeadName}
                {...routerProps}/>}></Route>

              </Switch>
            </div>
        </div>
    );
  }
}

export default withRouter(App);
